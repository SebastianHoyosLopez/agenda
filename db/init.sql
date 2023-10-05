SELECT 'CREATE DATABASE agendadb'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'agendadb')\gexec