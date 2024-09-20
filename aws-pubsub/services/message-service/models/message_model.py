from enum import Enum
from typing import Optional
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
    message_content: Optional[str]=None
    image_url: Optional[str]=None
    video_url: Optional[str]=None
    created_at: int
    updated_at: Optional[int]=None
