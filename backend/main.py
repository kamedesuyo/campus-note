
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import post,ws

FRONT_ADDR = "http://localhost:5173"

app = FastAPI()

app.add_middleware(CORSMiddleware,
                   allow_origins=["*"],
                   allow_credentials=True,
                   allow_methods=["*"],
                   allow_headers=["*"]
                   )

@app.get("/")
def root():
    return {"It's something wrong.":"you should check out this API's docs."}

app.include_router(post.router,prefix="/api") # apiのルーティング登録
app.add_websocket_route("/ws",ws.websocket_endpoint) # websocketのルーティング登録