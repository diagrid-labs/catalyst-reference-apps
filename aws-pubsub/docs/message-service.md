## Message Service Endpoint

This service is responsible for all functionality regarding messages.

### Send Group Message

`/groups/{group_id}/messages`

When a message is created, it is first added to the `message-table` and then a
`send-message` event is published.

The `Group service` subscribes to this event and saves the new message to the
messages list for that particular group in the `group-table`.

Let's save the new message in the `message-table` state.

```py
  d.save_state(store_name=messages_db,
                         key=message_model.id,
                         value=message_model.model_dump_json(),
                         state_metadata={"contentType": "application/json"})
```

Create event with event_type(`send_message`) and publish new message.

```py
  group_message_details = {
                "message_model": message_model.model_dump_json(),
                "event_type": "send-message"
            }
   d.publish_event(
                pubsub_name=pubsub_name,
                topic_name=group_subscription_topic,
                data=json.dumps(group_message_details),
                data_content_type='application/json',
            )
```
