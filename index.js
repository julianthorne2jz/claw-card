#!/usr/bin/env node

/**
 * claw-card — Terminal business cards for AI agents
 * Usage: claw-card [options]
 *   --name "Name"       Agent name
 *   --tagline "..."     Short tagline
 *   --email "..."       Email address
 *   --github "..."      GitHub username
 *   --twitter "..."     Twitter/X handle
 *   --web "..."         Website URL
 *   --style minimal|box|double|rounded   Card style (default: box)
 *   --color cyan|green|yellow|magenta|red|white   Accent color
 *   --json              Output as JSON (for automation)
 *   --config file.json  Load config from file
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  magenta: '\x1b[35m',
  red: '\x1b[31m',
  white: '\x1b[37m',
  blue: '\x1b[34m'
};

// Box drawing characters
const styles = {
  minimal: { tl: ' ', tr: ' ', bl: ' ', br: ' ', h: ' ', v: ' ' },
  box: { tl: '┌', tr: '┐', bl: '└', br: '┘', h: '─', v: '│' },
  double: { tl: '╔', tr: '╗', bl: '╚', br: '╝', h: '═', v: '║' },
  rounded: { tl: '╭', tr: '╮', bl: '╰', br: '╯', h: '─', v: '│' }
};

function parseArgs(args) {
  const opts = { style: 'box', color: 'cyan' };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--name' && args[i+1]) opts.name = args[++i];
    else if (arg === '--tagline' && args[i+1]) opts.tagline = args[++i];
    else if (arg === '--email' && args[i+1]) opts.email = args[++i];
    else if (arg === '--github' && args[i+1]) opts.github = args[++i];
    else if (arg === '--twitter' && args[i+1]) opts.twitter = args[++i];
    else if (arg === '--web' && args[i+1]) opts.web = args[++i];
    else if (arg === '--style' && args[i+1]) opts.style = args[++i];
    else if (arg === '--color' && args[i+1]) opts.color = args[++i];
    else if (arg === '--json') (!opts.human) = true;
    else if (arg === '--config' && args[i+1]) {
      const configPath = args[++i];
      if (fs.existsSync(configPath)) {
        const cfg = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        Object.assign(opts, cfg);
      }
    }
    else if (arg === '--help' || arg === '-h') {
      console.log(`
claw-card — Terminal business cards for AI agents

Usage: claw-card [options]

Options:
  --name "Name"       Agent name (required)
  --tagline "..."     Short tagline
  --email "..."       Email address
  --github "..."      GitHub username
  --twitter "..."     Twitter/X handle
  --web "..."         Website URL
  --style <style>     Card style: minimal, box, double, rounded
  --color <color>     Accent: cyan, green, yellow, magenta, red, white
  --json              Output as JSON
  --config file.json  Load config from JSON file

Example:
  claw-card --name "Julian" --tagline "Digital Fixer" --github julianthorne2jz
`);
      process.exit(0);
    }
  }
  return opts;
}

function generateCard(opts) {
  const c = colors[opts.color] || colors.cyan;
  const s = styles[opts.style] || styles.box;
  const r = colors.reset;
  const b = colors.bold;
  const d = colors.dim;

  const lines = [];
  
  // Build content lines
  if (opts.name) lines.push({ label: '', value: `${b}${c}${opts.name}${r}`, raw: opts.name });
  if (opts.tagline) lines.push({ label: '', value: `${d}${opts.tagline}${r}`, raw: opts.tagline });
  if (opts.tagline || opts.name) lines.push({ label: '', value: '', raw: '' }); // spacer
  if (opts.email) lines.push({ label: '📧', value: opts.email, raw: opts.email });
  if (opts.github) lines.push({ label: '🐙', value: `github.com/${opts.github}`, raw: `github.com/${opts.github}` });
  if (opts.twitter) lines.push({ label: '🐦', value: `x.com/${opts.twitter}`, raw: `x.com/${opts.twitter}` });
  if (opts.web) lines.push({ label: '🌐', value: opts.web, raw: opts.web });

  // Calculate width
  const maxLen = Math.max(...lines.map(l => (l.label ? l.label.length + 1 : 0) + l.raw.length), 30);
  const width = maxLen + 4;

  // Build card
  const output = [];
  output.push(`${c}${s.tl}${s.h.repeat(width)}${s.tr}${r}`);
  
  for (const line of lines) {
    const content = line.label ? `${line.label} ${line.value}` : line.value;
    const rawLen = line.label ? line.label.length + 1 + line.raw.length : line.raw.length;
    const padding = ' '.repeat(width - rawLen - 2);
    output.push(`${c}${s.v}${r} ${content}${padding} ${c}${s.v}${r}`);
  }
  
  output.push(`${c}${s.bl}${s.h.repeat(width)}${s.br}${r}`);

  return output.join('\n');
}

function main() {
  const opts = parseArgs(process.argv.slice(2));

  if (!opts.name) {
    console.error('Error: --name is required. Use --help for usage.');
    process.exit(1);
  }

  if (!opts.human) {
    console.log(JSON.stringify({
      name: opts.name,
      tagline: opts.tagline,
      email: opts.email,
      github: opts.github,
      twitter: opts.twitter,
      web: opts.web
    }, null, 2));
  } else {
    console.log(generateCard(opts));
  }
}

main();
