import json
import logging
import os
from typing import Optional

import grpc
from dapr.clients import DaprClient
from fastapi import FastAPI, HTTPException

from models.group_model import GroupModel, MessageModel, Member
from models.add_group_participant_model import AddGroupParticipantModel
from models.cloud_events import CloudEvent

group_db = os.getenv('DAPR_GROUPS_TABLE', '')
pubsub_name = os.getenv('DAPR_AWS_PUB_SUB_BROKER', '')
group_subscription_topic = os.getenv('DAPR_GROUP_SUBSCRIPTION_TOPIC', '')

app = FastAPI()

logging.basicConfig(level=logging.INFO)


@app.get('/')
def health_check():
    return {"Health is Ok"}


@app.post('/groups')
def create_group(group_model: GroupModel):
    with DaprClient() as d:
        logging.info(f"Group={group_model.model_dump()}")
        try:
            user_group_details = {
                "user_group_model": json.dumps({
                    "id": f'{group_model.creator_id}-{group_model.id}',
                    "group_id": group_model.id,
                    "user_id": group_model.creator_id,
                    "role": "ADMIN"
                }),
                "event_type": "add-group-participant"
            }

            member_data = {"user_id": group_model.creator_id, "role": "ADMIN"}

            member = Member(**member_data)

            # update group
            group_model.members.append(member)

            d.save_state(store_name=group_db,
                         key=str(group_model.id),
                         value=group_model.model_dump_json(),
                         state_metadata={"contentType": "application/json"})

            # publish add_group_participant
            d.publish_event(
                pubsub_name=pubsub_name,
                topic_name=group_subscription_topic,
                data=json.dumps(user_group_details),
                data_content_type='application/json',
            )

            return group_model

        except grpc.RpcError as err:
            logging.info(f"Error={err.details()}")
            raise HTTPException(status_code=500, detail=err.details())


@app.post('/groups/message')
def subscribe_group_messages(cloud_event: CloudEvent):
    with DaprClient() as d:
        try:
            logging.info(f'Received event: %s:' % {cloud_event.model_dump_json()})
            logging.info(f'Received message model event: %s:' % {cloud_event.data['message_model']})

            message_model = json.loads(cloud_event.data['message_model'])

            # get Group Data
            group_data = d.get_state(group_db, message_model['group_id'])
            group_model = GroupModel(**json.loads(group_data.data))

            # Update last message attribute
            group_model.last_message = message_model
            group_model.messages.append(message_model)

            # save group data
            d.save_state(store_name=group_db,
                         key=str(group_model.id),
                         value=group_model.model_dump_json(),
                         state_metadata={"contentType": "application/json"})

            logging.info("Group Info saved successfully")
        except grpc.RpcError as err:
            logging.info(f"Error={err.details()}")
            raise HTTPException(status_code=500, detail=err.details())


@app.get('/groups/{group_id}/messages')
def get_messages_per_group(group_id: str):
    with DaprClient() as d:
        try:
            kv = d.get_state(group_db, group_id)
            group = GroupModel(**json.loads(kv.data))

            return group.messages
        except grpc.RpcError as err:
            logging.info(f"Error={err.details()}")
            raise HTTPException(status_code=500, detail=err.details())

@app.get('/groups/{group_id}')
def get_group(group_id: str):
    with DaprClient() as d:
        try:
            kv = d.get_state(group_db, group_id)
            group = GroupModel(**json.loads(kv.data))

            return group.model_dump()
        except grpc.RpcError as err:
            logging.info(f"Error={err.details()}")
            raise HTTPException(status_code=500, detail=err.details())


@app.post('/groups/{group_id}/participant')
def add_user_to_group(group_id: str, participants: AddGroupParticipantModel):
    with DaprClient() as d:
        try:
            user_group_details = {
                "user_group_model": json.dumps({
                    "id": f'{participants.user_id}-{group_id}',
                    "group_id": group_id,
                    "user_id": participants.user_id,
                    "role": participants.role
                }),
                "event_type": "add-group-participant"
            }

            # get group
            group_data = d.get_state(group_db, group_id)

            group_model = GroupModel(**json.loads(group_data.data))
            member_data = {"user_id": participants.user_id, "role": participants.role}

            member = Member(**member_data)

            # update group
            group_model.members.append(member)

            d.save_state(store_name=group_db,
                         key=str(group_model.id),
                         value=group_model.model_dump_json(),
                         state_metadata={"contentType": "application/json"})

            # publish add_group_participant
            d.publish_event(
                pubsub_name=pubsub_name,
                topic_name=group_subscription_topic,
                data=json.dumps(user_group_details),
                data_content_type='application/json',
            )
            return {"message": "successful"}

        except grpc.RpcError as err:
            logging.error(f"Failed to terminate workflow: {err}")
            raise HTTPException(status_code=500, detail=str(err))
'''
@app.get('/groups')
def get_groups( token: Optional[str] = None, limit: int = 10):
    with DaprClient() as d:
        try:
            groups = []
            query_filter = {

                "sort": [
                    {
                        "key": "created_at",
                        "order": "DESC"
                    }
                ],
                "page": {
                    "limit": limit

                }
            }
            # Add the token only if it is not None
            if token:
                query_filter["page"]["token"] = token

            query_filter_json = json.dumps(query_filter)
            logging.info(f'query filter: {query_filter_json}')

            groups_kv = d.query_state(
                store_name=group_db,
                query=query_filter_json
            )
            for item in groups_kv.results:
                group_model = GroupModel(**json.loads(item.value))
                groups.append(group_model)
                logging.info(f"message{group_model.model_dump()}")

            return groups
        except grpc.RpcError as err:
            print(f"Error={err.details()}")
            raise HTTPException(status_code=500, detail=err.details())
'''