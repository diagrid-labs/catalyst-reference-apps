## User Group Service

This service subscribes to the `add-group-participant` event and saves users and
their roles per group.

The published event has this format

```py
  user_group_details = {
                "user_group_model": json.dumps({
                    "id": f'{group_model.creator_id}-{group_model.id}',
                    "group_id": group_model.id,
                    "user_id": group_model.creator_id,
                    "role": "ADMIN"
                }),
                "event_type": "add-group-participant"
            }
```

When the event is received, the `user-group-model` is extracted and saved into
the `user-group-table`.

```py

   user_group_data = cloud_event.data['user_group_model']
    user_group_model = UserGroupModel(**json.loads(user_group_data))

         d.save_state(store_name=user_group_table,
                         key=str(user_group_model.id),
                         value=user_group_model.model_dump_json(),
                         state_metadata={"contentType": "application/json"})
```
