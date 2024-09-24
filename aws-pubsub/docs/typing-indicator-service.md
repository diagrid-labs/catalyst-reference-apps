## Typing Indicator Service

Handles functionality for the user's typing indicator.

When a user starts typing a message, the `typing` attribute is set to `true` and
set to `false` when they stop typing or send the message.

This service also subscribes and listens to the `send-message` event published
by the `message service`.

So we're making an assumption that, when a `send-message` event is received, it
means the user stopped typing and so the `typing` attribute be set to `false`.

```py

 message_model = json.loads(cloud_event.data['message_model'])

        typing_indicator = {
            "id": f"{message_model['user_id']} - {message_model['group_id']}",
            "user_id": message_model['user_id'],
            "group_id": message_model['group_id'],
            "typing": False
        }

           d.save_state(store_name=typing_indicator_db,
                         key=typing_indicator["id"],
                         value=json.dumps(typing_indicator),
                         state_metadata={"contentType": "application/json"})

```

Then we have a regular endpoint to set the `typing` attribute to `true`.

```py

       d.save_state(store_name=typing_indicator_db,
                         key=f'{typing.user_id}-{typing.group_id}',
                         value=typing.model_dump_json(),
                         state_metadata={"contentType": "application/json"})

            return typing
```
