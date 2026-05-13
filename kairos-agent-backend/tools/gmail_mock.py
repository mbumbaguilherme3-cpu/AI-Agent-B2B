from .base import BaseTool, ToolResult


class GmailMockTool(BaseTool):
    name = "gmail"

    async def run(self, params):
        # Simula leitura de emails e gera resumo
        emails = [
            {"from": "alice@example.com", "subject": "Relatório", "snippet": "Segue relatório..."},
            {"from": "bob@example.com", "subject": "Reunião", "snippet": "Vamos agendar..."},
            {"from": "ceo@example.com", "subject": "OK", "snippet": "Tudo certo."},
        ]
        summary = " | ".join([f"{e['from']}: {e['subject']}" for e in emails])
        return ToolResult(status="success", output={"summary": f"Resumo de {len(emails)} emails", "details": summary}, meta={"count": len(emails)})
