# SQL QUERIES

## Create users table

```sql
{
    "database": "group_db",
  "operation": "query",
  "metadata": {

  
"sql": "CREATE TABLE users (id VARCHAR(255) PRIMARY KEY, email VARCHAR(255) NOT NULL UNIQUE, username VARCHAR(255) NOT NULL UNIQUE, profile_pic_url TEXT, created_at BIGINT NOT NULL, updated_at BIGINT);"
  }
 
}


```
## Create messages table

```sql


{
    "database": "group_db",
  "operation": "query",
  "metadata": {

 "sql": "CREATE TABLE messages (id VARCHAR(255) PRIMARY KEY, user_id VARCHAR(255) NOT NULL, group_id VARCHAR(255) NOT NULL, message_type VARCHAR(50) NOT NULL CHECK (message_type IN ('TEXT', 'IMAGE', 'VIDEO')), message_content TEXT, image_url TEXT, video_url TEXT, created_at BIGINT NOT NULL, updated_at BIGINT);"
  }
 
}

```

## Create user group table

```sql


{
    "database": "group_db",
  "operation": "query",
  "metadata": {

"sql": "CREATE TABLE user_group (id VARCHAR(255) PRIMARY KEY, user_id VARCHAR(255) NOT NULL, group_id VARCHAR(255) NOT NULL, role VARCHAR(50) NOT NULL CHECK (role IN ('ADMIN', 'MEMBER')), last_read_msg_id VARCHAR(255), last_read_timestamp BIGINT);"
  }
 
}

```

## Create typing_indicator table

```sql


{
    "database": "group_db",
  "operation": "query",
  "metadata": {

"sql": "CREATE TABLE typing_indicator(id VARCHAR(255) PRIMARY KEY, user_id VARCHAR(255) NOT NULL, group_id VARCHAR(255) NOT NULL, typing BOOLEAN NOT NULL);"
  }
 
}

```

## Create Group Table 

```sql


{
    "database": "group_db",
  "operation": "query",
  "metadata": {

"sql": "CREATE TABLE groups (id VARCHAR(255) PRIMARY KEY, group_name VARCHAR(255) NOT NULL, creator_id VARCHAR(255) NOT NULL, group_description TEXT NOT NULL, group_url VARCHAR(255) NOT NULL, created_at BIGINT NOT NULL, updated_at BIGINT, last_message_id VARCHAR(255), FOREIGN KEY (last_message_id) REFERENCES messages(id));"
  }
 
}

```