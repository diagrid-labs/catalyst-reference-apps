from enum import Enum
from typing import Optional, List
from pydantic import BaseModel


class MessageType(str, Enum):
    TEXT = "TEXT"
    IMAGE = "IMAGE"
    VIDEO = "VIDEO"


class MessageModel(BaseModel):
    id: str
    user_id: str
    group_id: str
    message_type: MessageType
    message_content: Optional[str]
    image_url: Optional[str]
    video_url: Optional[str]
    created_at: int
    updated_at: Optional[int]


class Member(BaseModel):
    user_id: str
    role: str


class GroupModel(BaseModel):
    id: str
    group_name: str
    creator_id: str
    group_description: str
    last_message: Optional[MessageModel]=None
    messages: Optional[List[MessageModel]]=[]
    group_url: str
    created_at: int
    members: Optional[List[Member]]= []
    updated_at: Optional[int]=None
