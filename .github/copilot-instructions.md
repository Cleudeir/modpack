# Copilot workflow for this modpack

Use this loop for normal work:

1. Orchestrator decides the objective and the required proof.
2. Planner breaks the work into small, testable tasks.
3. Coder completes one small task at a time and keeps changes minimal.
4. Reviewer checks correctness, risks, and missing verification.
5. Orchestrator summarizes status and next step.

Rules:
- Prefer small, reversible changes.
- Do not combine unrelated fixes in one commit or patch.
- Every task should be verifiable with a specific check.
- If a task is unclear, ask for the missing fact before coding.
- Keep changes focused on the modpack, config, scripts, or logs that are actually relevant.
