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
            d.save_state(store_name=user_group_table,
                         key=str(user_group_model.id),
                         value=user_group_model.model_dump_json(),
                         state_metadata={"contentType": "application/json"})

            logging.info("Group Participant added successfully")


        except grpc.RpcError as err:
            logging.info(f"Error={err.details()}")
            raise HTTPException(status_code=500, detail=err.details())
