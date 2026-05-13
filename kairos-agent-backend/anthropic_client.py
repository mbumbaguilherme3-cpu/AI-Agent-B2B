import os
try:
    import anthropic
except Exception:
    anthropic = None


async def call_anthropic(prompt: str):
    """Wrapper mínimo: usa `anthropic` se disponível e `ANTHROPIC_API_KEY` estiver definida.
    Caso contrário, devolve resposta mock para permitir desenvolvimento offline.
    """
    key = os.getenv("ANTHROPIC_API_KEY")
    if not key or not anthropic:
        return {"text": f"[mock] resposta para: {prompt}", "tokens_used": 1}
    try:
        client = anthropic.Client(api_key=key)
        # NOTE: Ajuste conforme versão do SDK Anthropic instalada.
        res = client.completions.create(model="claude-sonnet-4-20250514", prompt=prompt, max_tokens=300)
        # A forma de extrair texto/usage depende do SDK; fazemos um acesso conservador
        text = getattr(res, "completion", None) or getattr(res, "text", None) or str(res)
        usage = getattr(res, "usage", {}) or {}
        return {"text": text, "tokens_used": usage.get("total_tokens", 0)}
    except Exception as e:
        return {"text": f"[error] {str(e)}", "tokens_used": 0}
