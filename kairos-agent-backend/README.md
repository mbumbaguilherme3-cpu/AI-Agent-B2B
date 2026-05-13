# Kairos Agent Backend — MVP inicial

Estrutura inicial do backend para o projeto Kairos Agent (skeleton).

Pré-requisitos
- Python 3.11+
- Credenciais Google (OAuth2) para Gmail/Sheets quando for conectar integrações
- Chave Anthropic para API (variável de ambiente `ANTHROPIC_API_KEY`)

Instalação (PowerShell)

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Executar (desenvolvimento)

```powershell
uvicorn main:app --reload
```

Endpoints principais (skeleton)
- `POST /api/agent/run` — executa uma tarefa via `agent_core.run_agent_task`
- `GET /api/agent/history` — histórico (placeholder)
- `POST /api/integrations/connect` — ligar integrações (placeholder)

Próximos passos
- Implementar `agent_core.run_agent_task` usando LangGraph + Anthropic
- Implementar auth JWT e persistência (SQLite -> PostgreSQL)
- Implementar `GmailTool` e `GoogleSheetsTool`
