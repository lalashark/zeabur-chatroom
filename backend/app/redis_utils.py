import os
import redis.asyncio as redis

# 從環境變數中取得 Redis 連線資訊
redis_url = os.getenv("REDIS_URL", "redis://localhost:6379")

r = redis.from_url(redis_url, decode_responses=True)

CHAT_KEY = "chat:messages"
MAX_MESSAGES = 50

async def save_message(message: dict):
    await r.lpush(CHAT_KEY, str(message))
    await r.ltrim(CHAT_KEY, 0, MAX_MESSAGES - 1)

async def get_messages() -> list[dict]:
    raw = await r.lrange(CHAT_KEY, 0, MAX_MESSAGES - 1)
    return [eval(x) for x in raw if isinstance(x, str)]
