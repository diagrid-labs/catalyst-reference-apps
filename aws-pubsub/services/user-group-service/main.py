import json
import logging
import os
from models.cloud_events import CloudEvent
from dapr.clients import DaprClient, grpc
from fastapi import FastAPI, HTTPException
from models.user_group_model import UserGroupModel

user_group_table = os.getenv('DAPR_USER_GROUPS_TABLE', '')
pubsub_name = os.getenv('DAPR_AWS_PUB_SUB_BROKER', '')
group_subscription_topic = os.getenv('DAPR_GROUP_SUBSCRIPTION_TOPIC', '')
aurora_db_binding = os.getenv('DAPR_GROUP_BINDING', '')
app = FastAPI()

logging.basicConfig(level=logging.INFO)


@app.get('/')
def health_check():
    return {"Health is Ok"}


# subscribe to add group participant event
@app.post('/group/add-user')
def add_group_participant(cloud_event: CloudEvent):
    logging.info(f'Received event: %s:' % {cloud_event.model_dump_json()})

    logging.info(f'Received User Group model event: %s:' % {cloud_event.data['user_group_model']})
    user_group_data = cloud_event.data['user_group_model']
    user_group_model = UserGroupModel(**json.loads(user_group_data))
    with DaprClient() as d:
        try:

            last_read_msg_id = None
            last_read_timestamp = None
            user_group_sql = {
                "sql": f"INSERT INTO user_group(id, user_id, group_id, role,last_read_msg_id, last_read_timestamp)"
                       f"VALUES ('{user_group_model.user_id}-{user_group_model.group_id}', '{user_group_model.user_id}', '{user_group_model.group_id}', '{user_group_model.role.name}',{last_read_msg_id if last_read_msg_id else 'NULL'},{last_read_timestamp if last_read_timestamp else 'NULL'});"

            }

            user_group_resp = d.invoke_binding(binding_name=aurora_db_binding, operation="query",
                                               binding_metadata=user_group_sql)

            print(f"user_group_resp: {user_group_resp.data}")
            logging.info("Group Participant added successfully")


        except grpc.RpcError as err:
            logging.info(f"Error={err.details()}")
            raise HTTPException(status_code=500, detail=err.details())
