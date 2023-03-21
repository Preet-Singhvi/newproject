
from sqlalchemy.future import select
from app.model import Users, Person
from app.config import db

class UserService:

    @staticmethod
    async def get_user_profile(username:str):
        query = select(
                        Users.email, 
                        Person.firstname, 
                        Person.lastname,
                        Person.profile).join_from(Users,Person).where(Users.email == username)
        return(await db.execute(query)).mappings().one()
