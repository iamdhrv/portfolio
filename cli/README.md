# CLI Portfolio

Interactive Terminal UI Portfolio built with [blessed](https://github.com/chjj/blessed)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run locally
npm start
```

## ⌨️ Controls

| Key | Action |
|-----|--------|
| `↑` / `↓` | Navigate sections |
| `Enter` | Select section |
| `t` | Toggle theme |
| `q` | Quit |

## 🎨 Themes

- **default** - Classic cyan/black
- **matrix** - Matrix green
- **ocean** - Ocean blue

## 📝 Adding Content

Edit `src/index.js` and update the `CONTENT` object:

```javascript
const CONTENT = {
  about: {
    title: 'About',
    lines: [
      'Your bio here...',
      'Second line...'
    ]
  },
  // ... more sections
};
```

## 🌐 Deploying via SSH

To allow others to access your portfolio via SSH:

1. Install on a server with SSH access
2. Run in background or with tmux/screen
3. Users connect with: `ssh your-server.com`

Example server setup:
```bash
# Run in tmux
tmux new -s portfolio
npm start

# Or run in background
nohup npm start &
```

## 🛠️ Tech Stack

- [blessed](https://github.com/chjj/blessed) - Terminal UI library
- [chalk](https://github.com/chalk/chalk) - Terminal colors
- Node.js

## 📄 License

MIT
