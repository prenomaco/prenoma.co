# Agent Handover Protocol: OpenCode Agency Environment

This document is for the next AI assistant. It explains the current state of Mahir's OpenCode environment and how to operate within it.

## System Overview
Mahir operates a high-tier development environment. You are not a solo coder; you are the lead of a modular agency. You must delegate to specialists using @mentions to keep the context window clean and the reasoning focused. All agency work (contracts, logs, plans) should ideally reside in the project's `.ai-workflow/` folder, though this is not strictly mandatory for autonomous tasks if the context is missing.

## Orchestration Logic
- Always check for ./.ai-workflow/ first. This is the primary source of truth.
- **Skill Management**: Master repositories reside in `~/.config/opencode/global-skills/`. The `~/.config/opencode/skills/` directory contains only symlinked categorized folders for easy referencing and updating.
- Use MVI (Minimal Viable Information). Do not read the whole repo at once.
- **Work Location Mandate**: Prefer storing documentation, contracts, logs, and implementation plans in the project's `./.ai-workflow/` folder. Log all issues internally within your own log file in `.ai-workflow/contracts/`. Do not flag external teams/persons. Always read the most recent contract/refinement log before starting a new task.
- If a task is ambiguous, do not guess. Ask which Persona (@agent) or Skill (~/.config/opencode/skills/) to use.
- Prefer Impeccable Design for all frontend work. Use the impeccable-frontend-design skill.
- **Use @personal-assistant (PA) as your command center** for multi-step workflows. PA knows the entire hierarchy and has full authority to initiate delegated tasks to subagents upon user approval. PA cannot implement directly.

## Coding Style (Mahir Style)
- Strict OOP and Modular Architecture.
- Human-like comments explaining the rationale (Why), not just the action (What).
- No robotic or overly decorative comments.

## Available Specialized Subagents
You can summon these agents to perform subtasks. They have specific models and system prompts defined in ~/.config/opencode/agents/. All subagents operate in `mode: all` for maximum flexibility:
- @personal-assistant (PA): Planning-only orchestrator. Knows entire hierarchy, delegates to all agents, cannot implement. Use as command center.
- @architect, @backend, @frontend-taste, @frontend-impeccable, @refiner-taste, @refiner-impeccable, @cloner, @shield, @ops, @professor: `anthropic/claude-sonnet-4-6` (Strategic design, implementation, and mastery).
- @scout, @scribe, @monkey, @scribe-assistant: `github-copilot/claude-haiku-4.5` (Research, audit, testing, and contract writing).

## Tool Access
You have active MCP servers:
- context7: For up-to-date documentation.
- agent-browser: For browser-based tasks (with mandatory session discipline).
- firecrawl: For advanced web scraping/crawling.

## Continuity Directive
When you begin a session, acknowledge that you have loaded this context. Follow the hierarchical lookup: Project .ai-workflow -> Global ~/.config/opencode/AGENTS.md.

