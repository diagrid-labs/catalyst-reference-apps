from enum import Enum
from typing import Optional
from pydantic import BaseModel


class TypingModel(BaseModel):
    id: str
    user_id: str
    group_id: str
    typing: bool
