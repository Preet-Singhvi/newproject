from fastapi import HTTPException
import logging
import re
from typing import TypeVar, Optional
from pydantic import BaseModel, validator
from sqlalchemy import false

T = TypeVar('T')

logger = logging.getLogger(__name__)

class RegisterSchema(BaseModel):
    firstname: str
    lastname: str
    email: str
    password: str
    # profile: str = "base64"

class LoginSchema(BaseModel):
    email: str
    password: str

class DetailSchema(BaseModel):
    status: str
    message: str
    result: Optional[T] = None

class ResponseSchema(BaseModel):
    detail: str
    result: Optional[T] = None
