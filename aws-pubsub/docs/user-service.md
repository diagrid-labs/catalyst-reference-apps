## User Service

This service is responsible for all User functionality. User State will be saved
inside the `user-table` DynamoDB table.

At the time of creating this application, Catalyst API's do not support
`Querying` with DynamoDB.

So currently it's not possible to query a list of anything unless the data is
structured in a different kind of way.

We'll structure the user data in a way that'll make it easy for retrieval.

We'll save each created user to a list and then easily retrieve them when
needed.

Here's how the datastructure looks like.

```json
[
{
    "id":"1",
    "username":"test",
    "email":"test@gmail.com",
    .....
    .....
},
{
    "id":"2",
    "username":"test2",
    "email":"test2@gmail.com",
    .....
    .....
},
{
    "id":"3",
    "username":"test3",
    "email":"test3@gmail.com",
    .....
    .....
},
.....,
.....,
......
]

```

Assuming the project is open up in your IDE, navigate to `services/user-service`
directory and click `main.py` file.

### Create User Account Endpoint

This endpoint grabs user input and creates a new user account by saving to
state.

As mentioned earlier, we'll save each user to a list. Same List.

We have the list Id as

```
USERS_LIST_ID = "ad09eca0-a1ef-4824-bcd0-d5f9fd7aa8b5"
```

Before saving a new user, we need to grab the list and find out if it's empty or
it already contains user records.

```py
  # get User List Data
            user_kv = d.get_state(store_name=user_db, key=USERS_LIST_ID)

            logging.info(f"User retrieved data={user_kv.data}")
```

If it's empty, we'll add new user model and then save.

```py
  if user_kv.data == b'':

                user_list = UserModelList()
                user_list.add_user(user_model)
                logging.info(f" user list is {user_list}")

                d.save_state(store_name=user_db,
                             key=USERS_LIST_ID,
                             value=user_list.model_dump_json(),
                             state_metadata={"contentType": "application/json"})
```

But if the list already contains user records, then we'll append this user model
to the list of users.

```py
 user_list = UserModelList(**json.loads(user_kv.data))
                user_list.add_user(user_model)

                d.save_state(store_name=user_db,
                             key=USERS_LIST_ID,
                             value=user_list.model_dump_json(),
                             state_metadata={"contentType": "application/json"})
```

### Get User Account

A User account can be retrieved using the `user_id`.

```py
        kv = d.get_state(user_db, USERS_LIST_ID)
            user_list = UserModelList(**json.loads(kv.data))

            user = user_list.get_user_by_id(user_id)
```

The `get_user_by_id` function loops through the user list and returns the user
with matching ID as the supplied `user_id`.

```py
    def get_user_by_id(self, user_id: str) -> Union[UserModel, None]:
        for user in self.users:
            if user.id == user_id:
                return user
        return None  # Return None if user with the given id is not found

```

### Get User List

This endpoint simply returns the list of users. We use the `get_state` method to
get the user list, based on the `USERS_LIST_ID` and `user_db`.

```py
      kv = d.get_state(user_db, USERS_LIST_ID)
            if kv.data == b'':
                return []
            else:

                user_list = UserModelList(**json.loads(kv.data))
                return user_list
```
