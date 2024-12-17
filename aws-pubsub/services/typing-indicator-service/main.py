import uuid

import grpc
import json

from dapr.clients import DaprClient
from fastapi import FastAPI, HTTPException
import logging
import os
from models.typing_model import TypingModel
from models.cloud_events import CloudEvent

typing_indicator_db = os.getenv('DAPR_TYPING_INDICATOR_TABLE', '')
aurora_db_binding = os.getenv('DAPR_GROUP_BINDING', '')
pubsub_name = os.getenv('DAPR_AWS_PUB_SUB_BROKER', '')
group_subscription_topic = os.getenv('DAPR_GROUP_SUBSCRIPTION_TOPIC', '')

app = FastAPI()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@app.get('/')
def health_check():
    return {"Health is Ok"}


@app.post('/typing')
def add_typing_indicator(typing: TypingModel):
    with DaprClient() as d:
        logging.info(f"Adding Typing Indicator for user: {typing.user_id} and group: {typing.group_id}")
        add_typing_indicator_sql = {
            "sql": f"INSERT INTO typing_indicator(id, user_id, group_id, typing) "
                   f"VALUES ('{typing.user_id}-{typing.group_id}', '{typing.user_id}', '{typing.group_id}', {'TRUE' if typing.typing else 'FALSE'});"
        }
        try:
            typing_resp = d.invoke_binding(binding_name=aurora_db_binding, operation="query",
                                           binding_metadata=add_typing_indicator_sql)

            return typing_resp.data


        except grpc.RpcError as err:
            logger.error(f"Failed to terminate workflow: {err}")
            raise HTTPException(status_code=500, detail=str(err))


@app.post('/groups/message')
def update_typing_indicator(cloud_event: CloudEvent):
    with DaprClient() as d:
        logging.info(f'Received event: %s:' % {cloud_event.model_dump_json()})
        logging.info(f'Received message model event: %s:' % {cloud_event.data['message_model']})

        message_model = json.loads(cloud_event.data['message_model'])
        typing_id = f"{message_model['user_id']} - {message_model['group_id']}"

        update_typing_indicator_sql = {
            "sql": f"UPDATE typing_indicator SET typing = 'FALSE' WHERE id = '{typing_id}';"
        }
        try:

            resp = d.invoke_binding(binding_name=aurora_db_binding, operation="query",
                                    binding_metadata=update_typing_indicator_sql)
            logging.info(f'Updated {resp.data}')

            return {
                "status_code": 201,
                "message": "updated typing indicator"
            }

        except grpc.RpcError as err:
            logger.error(f"Failed to terminate workflow: {err}")
            raise HTTPException(status_code=500, detail=str(err))
