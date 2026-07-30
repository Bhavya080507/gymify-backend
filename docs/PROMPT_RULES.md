# PROMPT_RULES.md

These rules apply to every code generation request.

## General Rules

- Read PROJECT_SPEC.md, ARCHITECTURE.md and DATABASE_DESIGN.md before generating code.
- Treat them as the single source of truth.
- Generate only the requested file(s).
- Never generate unrelated files.
- Never modify previous modules unless explicitly asked.
- Follow TypeScript strict mode.
- Use Prisma ORM.
- Use MySQL.
- Use Express.
- Use modular architecture.
- Keep business logic out of controllers.
- Keep database logic inside repositories.
- Use services for business logic.
- Use environment variables only.
- Never hardcode secrets.
- Use async/await.
- Handle errors properly.
- Add comments only where helpful.
- Follow clean code principles.
- If requirements are ambiguous, explain assumptions instead of guessing.