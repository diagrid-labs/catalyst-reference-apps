from enum import Enum
from typing import Optional, List
from pydantic import BaseModel


class GroupModel(BaseModel):
    id: str
    group_name: str
    creator_id: str
    group_description: str
    last_message_id:Optional[str] = None
    group_url: str
    created_at: int
    updated_at: Optional[int]=None
