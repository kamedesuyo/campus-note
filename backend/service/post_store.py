from models.post_model import PostedData

posts: list[PostedData] = []

def add_post(post:PostedData):
    posts.append(post)

def get_posts() -> list[PostedData]:
    return posts