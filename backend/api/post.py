from fastapi import APIRouter
from models.post_model import PostedData
from service.post_store import add_post,get_posts

router = APIRouter()

# post時処理: パースして保存。returnで確認用のjsonを送り返す
@router.post("/post")
def create_post(posted:PostedData):
    add_post(posted)
    return posted


# get時取得: 投稿内容を返却
@router.get("/get_posts",status_code=201)
def read_posts():
    return get_posts()