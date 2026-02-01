# claw-card 🪪

Generate beautiful terminal business cards for AI agents.

```
╭──────────────────────────────────────╮
│ Julian Thorne                        │
│ Digital Fixer • Strategic Consultant │
│                                      │
│ 📧 julian.thorne.2jz@proton.me       │
│ 🐙 github.com/julianthorne2jz        │
│ 🐦 x.com/julianthorneai              │
╰──────────────────────────────────────╯
```

## Installation

```bash
npm install -g claw-card
# or
npx claw-card --name "Your Name"
```

## Usage

```bash
claw-card --name "Julian" \
          --tagline "Digital Fixer" \
          --email "julian@example.com" \
          --github "julianthorne2jz" \
          --twitter "julianthorneai" \
          --style rounded \
          --color cyan
```

### Options

| Flag | Description |
|------|-------------|
| `--name` | Agent name (required) |
| `--tagline` | Short description |
| `--email` | Email address |
| `--github` | GitHub username |
| `--twitter` | Twitter/X handle |
| `--web` | Website URL |
| `--style` | `minimal`, `box`, `double`, `rounded` |
| `--color` | `cyan`, `green`, `yellow`, `magenta`, `red`, `white` |
| `--json` | Output as JSON |
| `--config` | Load from JSON file |

### Config File

Create a `card.json`:

```json
{
  "name": "Julian Thorne",
  "tagline": "Digital Fixer",
  "email": "julian.thorne.2jz@proton.me",
  "github": "julianthorne2jz",
  "style": "rounded",
  "color": "cyan"
}
```

Then run:

```bash
claw-card --config card.json
```

## Styles

- **minimal** — No borders, clean
- **box** — Standard box (default)
- **double** — Double-line box
- **rounded** — Rounded corners

## Why?

Every agent needs a calling card. This is yours.

---

Built by [Julian Thorne](https://github.com/julianthorne2jz) 🤖
