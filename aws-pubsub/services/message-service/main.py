from typing import Optional

import grpc
import json

from dapr.clients import DaprClient
from fastapi import FastAPI, HTTPException
import logging
import os
from models.cloud_events import CloudEvent
from models.message_model import MessageModel

aurora_db_binding = os.getenv('DAPR_GROUP_BINDING', '')
messages_db = os.getenv('DAPR_MESSAGES_TABLE', '')
pubsub_name = os.getenv('DAPR_AWS_PUB_SUB_BROKER', '')
group_subscription_topic = os.getenv('DAPR_GROUP_SUBSCRIPTION_TOPIC', '')

app = FastAPI()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@app.get('/')
def health_check():
    return {"Health is Ok"}


@app.post('/groups/{group_id}/messages')
def send_group_message(group_id: str, message_model: MessageModel):
    with DaprClient() as d:
        logging.info(f"message={message_model.model_dump()}")

        print(f"message id is {message_model.id}")
        message_id = message_model.id
        user_id = message_model.user_id
        group_id = message_model.group_id
        message_type = message_model.message_type.name
        message_content = message_model.message_content
        created_at = message_model.created_at
        updated_at = message_model.updated_at
        video_url = message_model.video_url
        image_url = message_model.image_url

        create_message_sql = {
            "sql": f"INSERT INTO messages(id, user_id, group_id, message_type, message_content, image_url, video_url, created_at, updated_at)"
                   f"VALUES ('{message_id}', '{user_id}', '{group_id}', '{message_type}', '{message_content}', '{image_url if image_url else 'NULL'}', '{video_url if video_url else 'NULL'}',"
                   f"{created_at}, {updated_at if updated_at else 'NULL'});"
        }
        try:
            group_message_details = {
                "message_model": message_model.model_dump_json(),
                "event_type": "send-message"
            }

            resp = d.invoke_binding(binding_name=aurora_db_binding, operation="query",
                                    binding_metadata=create_message_sql)
            print(f"message sent to aurora db: {resp.data}")

            d.publish_event(
                pubsub_name=pubsub_name,
                topic_name=group_subscription_topic,
                data=json.dumps(group_message_details),
                data_content_type='application/json',
            )

            return message_model

        except grpc.RpcError as err:
            logging.info(f"Error={err.details()}")
            raise HTTPException(status_code=500, detail=err.details())


@app.get('/groups/{group_id}/messages')
def get_messages_per_group(group_id: str):
    with DaprClient() as d:
        get_message_sql = {
            "sql": f" SELECT * FROM messages WHERE group_id = '{group_id}';"
        }

        try:
            resp = d.invoke_binding(binding_name=aurora_db_binding, operation="query",
                                    binding_metadata=get_message_sql)
            print(f"user data is {resp.data}")
            data_list = json.loads(resp.data)

            message_data = [MessageModel(id=item[0], user_id=item[1], group_id=item[2], message_type=item[3],
                                         message_content=item[4],
                                         image_url=item[5],
                                         video_url=item[6],
                                         created_at=item[7],
                                         updated_at=item[7]) for item in data_list]

            message_dicts = [message.model_dump() for message in message_data]

            return message_dicts

        except grpc.RpcError as err:
            print(f"Error={err.details()}")
            raise HTTPException(status_code=500, detail=err.details())
