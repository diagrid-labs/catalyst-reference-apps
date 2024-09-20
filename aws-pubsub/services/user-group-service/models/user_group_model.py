from enum import Enum
from typing import Optional

from pydantic import BaseModel


class Role(str, Enum):
    ADMIN = "ADMIN"
    MEMBER = "MEMBER"


class UserGroupModel(BaseModel):
    id: str
    user_id: str
    group_id: str
    role: Role
    last_read_msg_id: Optional[str]=None
    last_read_timestamp: Optional[str]=None
