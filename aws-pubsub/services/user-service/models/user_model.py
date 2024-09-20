from datetime import datetime
from enum import Enum
from typing import Optional, List, Union

from pydantic import BaseModel


class UserModel(BaseModel):
    id: str
    email: str
    username: str
    profile_pic_url: Optional[str] = None
    created_at: int
    updated_at: Optional[int] = None


class UserModelList(BaseModel):
    users: List[UserModel] = []

  # Method to add a new user
    def add_user(self, user: UserModel):
        self.users.append(user)

    # Method to get a user by id
    def get_user_by_id(self, user_id: str) -> Union[UserModel, None]:
        for user in self.users:
            if user.id == user_id:
                return user
        return None  # Return None if user with the given id is not found
