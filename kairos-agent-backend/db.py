import os
import sqlite3
import datetime


def get_db_path():
    url = os.getenv("DATABASE_URL", "sqlite:///./kairos.db")
    if url.startswith("sqlite:///"):
        return url.replace("sqlite:///", "")
    return url


def init_db():
    path = get_db_path()
    conn = sqlite3.connect(path)
    cursor = conn.cursor()
    cursor.execute(
        """
    CREATE TABLE IF NOT EXISTS task_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task_description TEXT,
        chosen_tools TEXT,
        output TEXT,
        status TEXT,
        created_at TEXT
    )
    """
    )
    conn.commit()
    conn.close()


def save_task_history(task_description, chosen_tools, output, status):
    path = get_db_path()
    conn = sqlite3.connect(path)
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO task_history (task_description, chosen_tools, output, status, created_at) VALUES (?, ?, ?, ?, ?)",
        (
            task_description,
            ",".join(chosen_tools) if isinstance(chosen_tools, (list, tuple)) else str(chosen_tools),
            str(output),
            status,
            datetime.datetime.utcnow().isoformat(),
        ),
    )
    conn.commit()
    last_id = cursor.lastrowid
    conn.close()
    return last_id
