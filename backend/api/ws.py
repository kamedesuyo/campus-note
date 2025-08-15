from fastapi import WebSocket,WebSocketDisconnect
from service.post_store import add_post,get_posts

class ConnectionManager:
    # コネクション管理用list
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    # 投げられたwsを許可して通信開始。管理用listに追加
    async def connect(self, websocket:WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)        
        print("connected new client.")

    # こっちからws閉じることはないのでdisconnectきた時の処理だけ。普通にi/oないから非同期。管理用listから削除
    def disconnect(self, websocket:WebSocket):
        self.active_connections.remove(websocket)
        print("disconnected client.")

    # wsのコネクション内にポストをブロードキャスト
    async def broadcast_post(self,psot_data:dict[str,dict[str,str]]):
        for connection in self.active_connections:
            await connection.send_json(psot_data)
        print("Broadcast message to connections.")

manager = ConnectionManager()

async def websocket_endpoint(websocket: WebSocket):
    # 投げられたwsと通信開始
    await manager.connect(websocket)
    # 過去の投稿を送信
    for past_post in get_posts():
        await websocket.send_json(past_post)
        
    try:
        while True:
            post_data = await websocket.receive_json()
            add_post(post_data)
            await manager.broadcast_post(post_data)
            
    except WebSocketDisconnect:
        manager.disconnect(websocket)