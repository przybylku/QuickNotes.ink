# 🖋️ QuickNotes.ink

> The ultra-fast, minimalist note-taking desktop app with AI. 100% open-source, local-first, privacy-respecting. Built to make thinking *feel* better.

---
<div align=center>
<img width="500px" src="./assets/svgs/quicknotes_logo.svg" alt="QuickNotes.ink logo svg">
</div>

[![Build Status](https://img.shields.io/github/actions/workflow/status/przybylku/quicknote.ink/ci.yml?branch=main)](https://github.com/przybylku/quicknote.ink/actions)
[![License](https://img.shields.io/github/license/przybylku/quicknote.ink)](LICENSE)
[![Twitter Follow](https://img.shields.io/twitter/follow/quicknoteink?style=social)](https://twitter.com/quicknoteink)

---

## ✨ Features

* ⚡ **Ultra-fast launch & usage** (Rust-powered Tauri shell)
* 🎨 **Minimalist, clean UI** (React + Vite + Tailwind)
* 🔄 **Real-time sync** (Go API with SQLite)
* 🔍 **Powerful search** (Full-text search across all notes)
* 🏷️ **Smart tagging** (Organize with comma-separated tags)
* 🧘 **Distraction-free writing mode**
* 🔒 **100% local-first** – your notes never leave your machine
* 🧩 Extensible – planned plugin architecture

---

## 🧠 Why QuickNotes.ink?

Most note apps are bloated, slow, or just not fun to use. We built QuickNotes.ink because:

* Writing should feel as fast as thinking
* AI can help, not distract (coming soon)
* Notes are personal – they should stay yours
* Good design = less friction

---

## 🛠️ Tech Stack

| Layer     | Tech                                                       |
| --------- | ---------------------------------------------------------- |
| Shell     | [Tauri](https://tauri.app/) (Rust)                         |
| Frontend  | [React](https://reactjs.org/), [Vite](https://vitejs.dev/) |
| API       | [Go](https://golang.org/), [Gin](https://gin-gonic.com/)  |
| Database  | SQLite with [GORM](https://gorm.io/)                      |
| Monorepo  | Turborepo with pnpm workspaces                            |
| Types     | TypeScript, Zod validation                                |

---

## 📁 Project Structure

```bash
/apps
  desktop/       # Tauri + Vite + React app
  api/           # Go API server for note management
/packages
  core/          # Shared types, API client, business logic
  ui/            # Shared UI components
  ai/            # AI integrations (planned)
  eslint-config/ # Shared ESLint configuration
  typescript-config/ # Shared TypeScript configuration
```

---

## 🚀 Getting Started

### Prerequisites

You'll need the following installed:
- [Node.js](https://nodejs.org) (>=18)
- [pnpm](https://pnpm.io) (>=9.0.0)
- [Rust](https://rust-lang.org) (for Tauri)
- [Go](https://golang.org) (>=1.21, for API server)

### Installation

```bash
# Clone the repository
git clone https://github.com/przybylku/quicknotes.ink.git
cd quicknotes.ink

# Install dependencies
pnpm install
```

### Development

To run the full application, you need to start both the API server and the desktop app:

#### Option 1: Start both services at once (Recommended)

```bash
# Start both API and desktop app
pnpm dev
```

#### Option 2: Start services individually

In one terminal, start the API server:
```bash
pnpm dev --filter=api
```

In another terminal, start the desktop app:
```bash
pnpm dev --filter=desktop
```

The API server will run on `http://localhost:8080` and the desktop app will automatically connect to it.

### Building for Production

```bash
# Build all packages
pnpm build

# Build specific apps
pnpm build --filter=desktop
pnpm build --filter=api
```

---

## 🎯 API Endpoints

The Go API provides the following endpoints:

- `GET /api/v1/health` - Health check
- `GET /api/v1/notes` - List all notes (with search & pagination)
- `GET /api/v1/notes/:id` - Get specific note
- `POST /api/v1/notes` - Create new note
- `PUT /api/v1/notes/:id` - Update note
- `DELETE /api/v1/notes/:id` - Delete note

### Note Schema

```json
{
  "id": "uuid",
  "title": "string",
  "content": "string",
  "tags": "string (comma-separated)",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

---

## 🧪 Development Workflow

### Adding New Features

1. **Shared types/logic**: Add to `packages/core/`
2. **UI components**: Add to `packages/ui/`
3. **API endpoints**: Add to `apps/api/main.go`
4. **Frontend features**: Update `apps/desktop/src/`

### Code Quality

```bash
# Run linting
pnpm lint

# Run type checking
pnpm check-types

# Format code
pnpm format
```

---

## 📦 Planned Roadmap

* [x] Base editor & local storage
* [x] Go API with SQLite
* [x] Real-time note management
* [x] Search functionality
* [x] Tag system
* [ ] AI actions (summarize, rewrite)
* [ ] Quick command palette
* [ ] Plugin system for power-users
* [ ] Markdown export / sync
* [ ] Offline-first mobile version?

---

## 🤝 Contributing

We're building this in public. Help us make it better:

* Check [issues](https://github.com/przybylku/quicknotes.ink/issues)
* Create a PR (small, scoped changes are welcome!)
* Share feedback in [Discussions](https://github.com/przybylku/quicknotes.ink/discussions)

> All contributors are listed in `CONTRIBUTORS.md` ❤️

---

## 🐛 Troubleshooting

### API Connection Issues

If the desktop app shows "API Connection Required":

1. Ensure the Go API is running: `pnpm dev --filter=api`
2. Check that port 8080 is available
3. Verify the API health endpoint: `curl http://localhost:8080/api/v1/health`

### Tauri Build Issues

If you encounter Tauri build errors:

1. Ensure Rust is installed: `rustup update`
2. Install Tauri prerequisites for your OS: [Tauri Prerequisites](https://tauri.app/v1/guides/getting-started/prerequisites)
3. Clear cache: `pnpm clean` (if available)

---

## 💬 Join the Community

* Twitter → [@quicknoteink](https://twitter.com/quicknoteink) (soon)
* GitHub Discussions → Ask questions, suggest features
* Stars & shares keep this project alive ⭐

---

## 💖 Sponsors & Backers

*We're looking for open-source sponsors and contributors to support development!*

If you're a company or individual who cares about:

* Fast productivity tools
* Privacy-first software
* Supporting open-source

…we'd love your help!

> Sponsor us on [GitHub Sponsors](https://github.com/sponsors/przybylku) or reach out via X (soon)

---

## 📄 License

Licensed under the [MIT License](LICENSE)

---

## ✍️ Built with love by the community

Made with ❤️ for developers, writers, and thinkers who value speed, privacy, and beautiful design.
