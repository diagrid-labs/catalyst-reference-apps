import grpc
import json

from dapr.clients import DaprClient
from fastapi import FastAPI, HTTPException
import logging
import os


read_receipts_db = os.getenv('DAPR_READ_RECEIPTS_TABLE', '')
pubsub_name = os.getenv('DAPR_AWS_PUB_SUB_BROKER', '')
group_subscription_topic = os.getenv('DAPR_GROUP_SUBSCRIPTION_TOPIC', '')

from models.read_receipt_model  import ReadReceiptModel
app = FastAPI()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.get('/')
def health_check():
    return {"Health is Ok"}
@app.post('/read-receipts/group/messages')
def add_read_receipts(message: ReadReceiptModel ):
    return