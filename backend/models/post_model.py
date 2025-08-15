from pydantic import BaseModel
# やりとりするjson
class PostedData(BaseModel):
    post_uuid:str
    post_user:str
    post_user_icon_url: str
    message:str