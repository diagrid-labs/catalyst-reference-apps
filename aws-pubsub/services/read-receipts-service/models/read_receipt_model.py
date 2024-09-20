from enum import Enum
from typing import Optional
from pydantic import BaseModel

class ReadReceiptModel(BaseModel):
    id:str
    message_id:str
    group_id:str
    user_id:str
    timestamp:int
