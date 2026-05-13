from abc import ABC, abstractmethod
from typing import Any, Dict
from pydantic import BaseModel


class ToolResult(BaseModel):
    status: str
    output: Any = None
    meta: Dict[str, Any] = {}


class BaseTool(ABC):
    name: str = "base"

    @abstractmethod
    async def run(self, params: Dict[str, Any]) -> ToolResult:
        raise NotImplementedError()
