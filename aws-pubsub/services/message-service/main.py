from typing import Optional

import grpc
import json

from dapr.clients import DaprClient
from fastapi import FastAPI, HTTPException
import logging
import os
from models.cloud_events import CloudEvent
from models.message_model import MessageModel

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
        try:
            group_message_details = {
                "message_model": message_model.model_dump_json(),
                "event_type": "send-message"
            }
            d.save_state(store_name=messages_db,
                         key=message_model.id,
                         value=message_model.model_dump_json(),
                         state_metadata={"contentType": "application/json"})

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



'''
@app.get('/groups/{group_id}/messages')
def get_messages_per_group(group_id: str, token: Optional[str] = None, limit: int = 10):
    with DaprClient() as d:
        try:
            messages = []
            query_filter = {
                "filter": {

                    "EQ": {"group_id": group_id}

                },
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

            messages_kv = d.query_state(
                store_name=messages_db,
                query=query_filter_json
            )
            for item in messages_kv.results:
                message_model = MessageModel(**json.loads(item.value))
                messages.append(message_model)
                logging.info(f"message{message_model.model_dump()}")

            return messages
        except grpc.RpcError as err:
            print(f"Error={err.details()}")
            raise HTTPException(status_code=500, detail=err.details())
'''