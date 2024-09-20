## Group Service

This service is responsible for all Group related functionality. Group Service
State will be saved inside the `group-table` DynamoDB table.

From the IDE, navigate the directory `services/group-service`.

### Create Group endpoint

Responsible for creating a new Group, and then publishing an event called
`add-group-participant` to the `user-group-service` through the pubsub.

The `user-group-service` subscribes to `add-group-participant` event and then
saves users as members to the `user-group-table`.

This will later on give us the possibility to grab members for a particular
group.

We haven't created the `user-group-service` yet.

Here's how we save group details to the `group-db`

```py

            d.save_state(store_name=group_db,
                         key=str(group_model.id),
                         value=group_model.model_dump_json(),
                         state_metadata={"contentType": "application/json"})

```

And then we publish an event with `event_type`

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

            member_data = {"user_id": group_model.creator_id, "role": "ADMIN"}

       # publish add_group_participant
            d.publish_event(
                pubsub_name=pubsub_name,
                topic_name=group_subscription_topic,
                data=json.dumps(user_group_details),
                data_content_type='application/json',
            )
```

### Add Participant to group

`/groups/{group_id}/participant`

Adding a participant to a group involves data duplication. The user will be
added to the `user-group-table` and also added to a `members` list for each
group inside the `group-table`.

First, we need to know what group we want to add the participant to. Using the
`group_id` from the query path, we'll retrieve the group.

```py
 # get group
            group_data = d.get_state(group_db, group_id)
```

And then, we'll create a `Member` model and append it to the group members list.

```py
group_model = GroupModel(**json.loads(group_data.data))
           member_data = {"user_id": participants.user_id, "role": participants.role}

           member = Member(**member_data)

           # update group member list
           group_model.members.append(member)
```

Finally, we'll save the updated group information.

```py
     d.save_state(store_name=group_db,
                         key=str(group_model.id),
                         value=group_model.model_dump_json(),
                         state_metadata={"contentType": "application/json"})
```

Remember we have to also save this member inside the `user-group-service`.

So we'll publish an event(`add-group-participant`), which will be picked up by
the `user-group-service`.

```py
   user_group_details = {
                "user_group_model": json.dumps({
                    "id": f'{participants.user_id}-{group_id}',
                    "group_id": group_id,
                    "user_id": participants.user_id,
                    "role": participants.role
                }),
                "event_type": "add-group-participant"
            }

              # publish add_group_participant
            d.publish_event(
                pubsub_name=pubsub_name,
                topic_name=group_subscription_topic,
                data=json.dumps(user_group_details),
                data_content_type='application/json',
            )
```

### Get Group

`/groups/{group_id}`

This endpoint retrieves a group's information based on the `group_id`.

```py
            kv = d.get_state(group_db, group_id)
            group = GroupModel(**json.loads(kv.data))
```

### Save Group Messages Endpoint

This endpoint subscribes to the `send-message` event and saves new messages to
the particular group inside the `group-table`.

The published event has this format

```py
 group_message_details = {
                "message_model": message_model.model_dump_json(),
                "event_type": "send-message"
            }
```

So when the event has been received, this section is extracted
`"message_model": message_model.model_dump_json()`, and appended to the groups
messages list.

Also, the `last_message_attribute` is also updated.

```py

   message_model = json.loads(cloud_event.data['message_model'])

            # get Group Data
            group_data = d.get_state(group_db, message_model['group_id'])
            group_model = GroupModel(**json.loads(group_data.data))

            # Update last message attribute
            group_model.last_message = message_model
            group_model.messages.append(message_model)

            # save group data
            d.save_state(store_name=group_db,
                         key=str(group_model.id),
                         value=group_model.model_dump_json(),
                         state_metadata={"contentType": "application/json"})

```

### Get Messages Per Group Endpoint

`/groups/{group_id}/messages`

Remember each group has a messages list object within it. So here's how we get
the list of messages per group.

```py

  kv = d.get_state(group_db, group_id)
            group = GroupModel(**json.loads(kv.data))

            return group.messages
```
