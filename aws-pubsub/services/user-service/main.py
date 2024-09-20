from typing import Optional

import grpc
import json

from dapr.clients import DaprClient
from fastapi import FastAPI, HTTPException
import logging
import os
from models.user_model import UserModel, UserModelList

user_db = os.getenv('DAPR_USERS_TABLE', '')

app = FastAPI()

USERS_LIST_ID = "ad09eca0-a1ef-4824-bcd0-d5f9fd7aa8b5"

logging.basicConfig(level=logging.INFO)


@app.get('/')
def health_check():
    return {"Health Ok"}


@app.post('/users')
def create_user_account(user_model: UserModel):
    with DaprClient() as d:
        logging.info(f"User={user_model.model_dump()}")

        # USERS_LIST_ID
        try:
            # get User List Data
            user_kv = d.get_state(store_name=user_db, key=USERS_LIST_ID)

            logging.info(f"User retrieved data={user_kv.data}")
            if user_kv.data == b'':

                user_list = UserModelList()
                user_list.add_user(user_model)
                logging.info(f" user list is {user_list}")

                d.save_state(store_name=user_db,
                             key=USERS_LIST_ID,
                             value=user_list.model_dump_json(),
                             state_metadata={"contentType": "application/json"})
                return user_model

            else:
                user_list = UserModelList(**json.loads(user_kv.data))
                user_list.add_user(user_model)

                d.save_state(store_name=user_db,
                             key=USERS_LIST_ID,
                             value=user_list.model_dump_json(),
                             state_metadata={"contentType": "application/json"})
                return user_model


        except grpc.RpcError as err:
            logging.info(f"Error={err.details()}")
            raise HTTPException(status_code=500, detail=err.details())


@app.get('/users/{user_id}')
def get_user_account(user_id: str):
    with DaprClient() as d:

        try:
            kv = d.get_state(user_db, USERS_LIST_ID)
            user_list = UserModelList(**json.loads(kv.data))

            user = user_list.get_user_by_id(user_id)

            return user

        except grpc.RpcError as err:
            logging.info(f"Error={err.details()}")
            raise HTTPException(status_code=500, detail=err.details())


@app.get('/users')
def get_all_users():
    with DaprClient() as d:
        try:

            kv = d.get_state(user_db, USERS_LIST_ID)
            if kv.data == b'':
                return []
            else:

                user_list = UserModelList(**json.loads(kv.data))
                return user_list
        except grpc.RpcError as err:
            print(f"Error={err.details()}")
            raise HTTPException(status_code=500, detail=err.details())


'''

@app.get('/users')
def get_groups(token: Optional[str] = None, limit: int = 10):
    with DaprClient() as d:
        try:
            users = []
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

            user_kv = d.query_state(
                store_name=user_db,
                query=query_filter_json
            )
            for item in user_kv.results:
                user_model = UserModel(**json.loads(item.value))
                users.append(user_model)
                logging.info(f"message{user_model.model_dump()}")

            return users
        except grpc.RpcError as err:
            print(f"Error={err.details()}")
            raise HTTPException(status_code=500, detail=err.details())
'''
