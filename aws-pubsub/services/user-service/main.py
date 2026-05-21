from typing import Optional

import grpc
import json

from dapr.clients import DaprClient
from fastapi import FastAPI, HTTPException
import logging
import os
from models.user_model import UserModel, UserModelList

user_db = os.getenv('DAPR_USERS_TABLE', '')

aurora_db_binding = os.getenv('DAPR_GROUP_BINDING', '')

app = FastAPI()


logging.basicConfig(level=logging.INFO)


@app.get('/')
def health_check():
    return {"Health Ok"}


@app.post('/users')
def create_user_account(user_model: UserModel):
    with DaprClient() as d:
        logging.info(f"User={user_model.model_dump()}")
        user_id = user_model.id
        email = user_model.email
        profile_pic_url = user_model.profile_pic_url
        created_at = user_model.created_at
        updated_at = user_model.updated_at

        insert_user_json = {
                "sql": f"INSERT INTO users (id, email, username, profile_pic_url, created_at, updated_at) "
                       f"VALUES ('{user_id}', '{email}', '{user_model.username}', '{profile_pic_url}', {created_at}, {updated_at if updated_at else 'NULL'});"

        }

        try:
            resp = d.invoke_binding(binding_name=aurora_db_binding, operation="query",
                                    binding_metadata=insert_user_json)
            print(resp.data)
            return user_model
        except grpc.RpcError as err:
            logging.info(f"Error={err.details()}")
            raise HTTPException(status_code=500, detail=err.details())


@app.get('/users/{user_id}')
def get_user_account(user_id: str):
    with DaprClient() as d:
        get_user_sql = {
            "sql": f"SELECT * FROM users WHERE id='{user_id}';"

                        }

        try:
            resp = d.invoke_binding(binding_name=aurora_db_binding, operation="query",
                                    binding_metadata=get_user_sql)
            print(f"user data is {resp.data}")
            data_list = json.loads(resp.data)

            # Now, convert the list into a dictionary using the Pydantic model
            user_data = [UserModel(id=item[0], email=item[1], username=item[2], profile_pic_url=item[3], created_at=item[4],
                              updated_at=item[5]) for item in data_list]

            user_dicts = [user.model_dump() for user in user_data]

            return user_dicts[0]


        except grpc.RpcError as err:
            logging.info(f"Error={err.details()}")
            raise HTTPException(status_code=500, detail=err.details())


@app.get('/users')
def get_all_users():
    with DaprClient() as d:
        get_user_sql = {
            "sql": f"SELECT * FROM users;"
                        }

        try:
            resp = d.invoke_binding(binding_name=aurora_db_binding, operation="query",
                                    binding_metadata=get_user_sql)
            print(f"user data is {resp.data}")
            data_list = json.loads(resp.data)

            # Now, convert the list into a dictionary using the Pydantic model
            user_data = [UserModel(id=item[0], email=item[1], username=item[2], profile_pic_url=item[3], created_at=item[4],
                              updated_at=item[5]) for item in data_list]

            user_dicts = [user.model_dump() for user in user_data]

            return user_dicts


        except grpc.RpcError as err:
            logging.info(f"Error={err.details()}")
            raise HTTPException(status_code=500, detail=err.details())

