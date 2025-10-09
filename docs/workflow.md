# Project Workflow

```mermaid
flowchart LR
  A[User Browser]
  B[Frontend (React, Vite)]
  C[Auth Service (Spring Boot) - 8081]
  D[CRM Service (Spring Boot) - 8082]
  DB[MySQL]
  T[Twilio (SMS Provider)]
  DC[Docker Compose]

  A -->|HTTP (UI)| B
  B -->|POST /api/auth/send-otp| C
  C -->|store otp| DB
  C -->|send SMS| T
  A -->|POST /api/auth/verify-otp| B
  B -->|POST /api/auth/verify-otp| C
  C -->|issue JWT| B
  B -->|Authorization: Bearer <token>| D
  D -->|read/write| DB

  subgraph infra
    DB
    T
  end

  subgraph services
    C
    D
  end

  subgraph orchestration
    DC
  end

  DC --- DB
  DC --- C
  DC --- D
  DC --- B
```

Save this file as docs/workflow.md. You can render the Mermaid diagram in editors that support Mermaid (e.g., GitHub, VSCode Mermaid Preview) or convert to SVG using mermaid-cli.
