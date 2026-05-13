from .base import BaseTool, ToolResult


class GoogleSheetsMockTool(BaseTool):
    name = "sheets"

    async def run(self, params):
        # Simula operações básicas em Sheets
        data = [["Nome", "Valor"], ["Alice", "100"], ["Bob", "200"]]
        return ToolResult(status="success", output={"rows": data, "note": "dados fictícios"}, meta={"rows": len(data)-1})
