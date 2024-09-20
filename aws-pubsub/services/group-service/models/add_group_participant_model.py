from datetime import datetime
from enum import Enum
from typing import Optional

from pydantic import BaseModel


class AddGroupParticipantModel(BaseModel):
    user_id:str
    role:str