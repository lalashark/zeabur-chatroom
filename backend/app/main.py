from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
from .redis_utils import save_message, get_messages

app = FastAPI()

# 若前端在不同網域，如 localhost:5173 或 Zeabur 上分開部署，需允許 CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 可設為前端 URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatMessage(BaseModel):
    user: str
    message: str

@app.get("/chat")
async def fetch_messages():
    return await get_messages()

@app.post("/chat")
async def post_message(msg: ChatMessage):
    new_msg = {
        "user": msg.user,
        "message": msg.message,
        "timestamp": datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"),
    }
    await save_message(new_msg)
    return {"status": "ok", "message": new_msg}
