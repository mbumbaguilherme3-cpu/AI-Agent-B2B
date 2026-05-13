"""Kairos Agent Backend - FastAPI skeleton

Endpoints:
- POST /api/agent/run
- GET /api/agent/history
- POST /api/integrations/connect
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from dotenv import load_dotenv
import db

load_dotenv()

from agent_core import AgentTask, AgentResult, run_agent_task

app = FastAPI(title="Kairos Agent Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class RunRequest(BaseModel):
    task_description: str
    tools_available: Optional[List[str]] = None
    context: Optional[dict] = None


@app.on_event("startup")
async def startup():
    try:
        db.init_db()
    except Exception:
        pass


@app.post("/api/agent/run", response_model=AgentResult)
async def api_agent_run(req: RunRequest):
    task = AgentTask(
        task_description=req.task_description,
        tools_available=req.tools_available or [],
        context=req.context or {},
    )
    result = await run_agent_task(task)
    try:
        db.save_task_history(task.task_description, result.chosen_tools, result.output, result.status)
    except Exception:
        # salvar histórico é não-crítico para execução; não falha a rota
        pass
    return result


@app.get("/api/agent/history")
async def api_agent_history(limit: int = 50):
    try:
        import sqlite3

        db_path = db.get_db_path()
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        cursor.execute(
            "SELECT id, task_description, chosen_tools, output, status, created_at FROM task_history ORDER BY id DESC LIMIT ?",
            (limit,),
        )
        rows = cursor.fetchall()
        conn.close()
        history = []
        for r in rows:
            history.append(
                {
                    "id": r[0],
                    "task_description": r[1],
                    "chosen_tools": (r[2].split(",") if r[2] else []),
                    "output": r[3],
                    "status": r[4],
                    "created_at": r[5],
                }
            )
        return {"history": history}
    except Exception:
        return {"history": []}


@app.post("/api/auth/register")
async def auth_register():
    return {"message": "not implemented"}


@app.post("/api/auth/login")
async def auth_login():
    return {"message": "not implemented"}


@app.get("/api/integrations")
async def api_integrations():
    return {"integrations": ["gmail", "sheets", "notion", "slack"]}


@app.post("/api/integrations/connect")
async def api_integrations_connect(provider: str):
    return {"message": f"connect {provider} not implemented"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
