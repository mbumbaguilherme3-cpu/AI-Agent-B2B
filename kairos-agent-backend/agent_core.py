"""Agent core: orquestração simples usando tools locais e wrapper Anthropic.

Implementação inicial segura para desenvolvimento:
- usa mocks das tools (`tools/*.py`)
- usa `anthropic_client.call_anthropic` mas aceita fallback mock
"""
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import asyncio
import traceback

from tools.gmail_mock import GmailMockTool
from tools.sheets_mock import GoogleSheetsMockTool
import anthropic_client


class AgentTask(BaseModel):
    task_description: str
    tools_available: List[str] = []
    context: Dict[str, Any] = {}


class AgentResult(BaseModel):
    status: str
    output: Optional[str] = None
    steps_taken: List[str] = []
    tokens_used: int = 0
    chosen_tools: List[str] = []


async def run_agent_task(task: AgentTask) -> AgentResult:
    steps: List[str] = []
    steps.append("received task")
    chosen_tools: List[str] = []

    # Obter plano / raciocínio do Anthropic (ou mock)
    plan = {}
    try:
        plan = await anthropic_client.call_anthropic(f"Planear passos para: {task.task_description}")
        steps.append("obtained plan from Anthropic")
        # append short preview
        if isinstance(plan, dict):
            steps.append((plan.get("text") or "")[:200])
        tokens = plan.get("tokens_used", 0) if isinstance(plan, dict) else 0
    except Exception as e:
        steps.append("anthropic call failed")
        steps.append(str(e))
        tokens = 0

    text = task.task_description.lower()
    # heurística simples ou uso explícito de tools_available
    if task.tools_available:
        for t in task.tools_available:
            if t in ["gmail", "sheets"]:
                chosen_tools.append(t)
    else:
        if "email" in text or "mail" in text or "gmail" in text:
            chosen_tools.append("gmail")
        if "sheet" in text or "sheets" in text or "planilha" in text:
            chosen_tools.append("sheets")

    steps.append(f"selected tools: {chosen_tools or 'none'}")

    outputs: Dict[str, Any] = {}
    for t in chosen_tools:
        try:
            if t == "gmail":
                tool = GmailMockTool()
            elif t == "sheets":
                tool = GoogleSheetsMockTool()
            else:
                steps.append(f"unknown tool {t}")
                continue
            res = await tool.run(task.context)
            outputs[t] = res.output
            steps.append(f"{t} -> {res.status}")
            # soma tokens se tool reportar
            meta = getattr(res, "meta", {}) or {}
            tokens += meta.get("tokens", 0)
        except Exception as e:
            steps.append(f"{t} failed: {str(e)}")
            steps.append(traceback.format_exc())

    final_output = {"plan": plan.get("text") if isinstance(plan, dict) else str(plan), "tool_outputs": outputs}
    return AgentResult(status="success", output=str(final_output), steps_taken=steps, tokens_used=tokens, chosen_tools=chosen_tools)
