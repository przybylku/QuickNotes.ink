# 🖋️ QuickNote.ink

> The ultra-fast, minimalist note-taking desktop app with AI. 100% open-source, local-first, privacy-respecting. Built to make thinking *feel* better.

---

![QuickNote.ink logo](https://gist.githack.com/przybylku/536f255b6e58031c7685cf416c7b9688/raw/5d7f40b9dee84af0f5f50e4429af69b97c4283ab/quicknotes.ink)

[![Build Status](https://img.shields.io/github/actions/workflow/status/przybylku/quicknote.ink/ci.yml?branch=main)](https://github.com/przybylku/quicknote.ink/actions)
[![License](https://img.shields.io/github/license/przybylku/quicknote.ink)](LICENSE)
[![Twitter Follow](https://img.shields.io/twitter/follow/quicknoteink?style=social)](https://twitter.com/quicknoteink)

---

## ✨ Features

* ⚡ **Ultra-fast launch & usage** (Rust-powered Tauri shell)
* 🎨 **Minimalist, clean UI** (React + Vite + Tailwind)
* 🧠 **AI-powered enhancements** (summarize, rewrite, assist)
* 🧘 **Distraction-free writing mode**
* 🔒 **100% local-first** – your notes never leave your machine
* 🌐 Optional API and sync (self-hosted if needed)
* 🧩 Extensible – planned plugin architecture

---

## 🧠 Why QuickNote.ink?

Most note apps are bloated, slow, or just not fun to use. We built QuickNote.ink because:

* Writing should feel as fast as thinking
* AI can help, not distract
* Notes are personal – they should stay yours
* Good design = less friction

---

## 🛠️ Tech Stack

| Layer     | Tech                                                       |
| --------- | ---------------------------------------------------------- |
| Shell     | [Tauri](https://tauri.app/) (Rust)                         |
| Frontend  | [React](https://reactjs.org/), [Vite](https://vitejs.dev/) |
| UI/UX     | TailwindCSS, custom component lib                          |
| Monorepo  | Turborepo                                                  |
| AI module | OpenAI API, local AI (planned)                             |
| CI/CD     | GitHub Actions                                             |
| Packaging | Docker (optional API)                                      |

---

## 📁 Project Structure

```bash
/apps
  desktop/       # Tauri + Vite + React app
  api/           # Optional API for sync (self-hosted)
/packages
  core/          # Note-taking logic, parsers, storage
  ui/            # Shared UI components
  ai/            # Prompt logic, AI integrations
/tests           # E2E & integration tests
```

---

## 🚀 Getting Started

```bash
pnpm install
pnpm dev --filter=desktop
```

> You'll need [Rust](https://rust-lang.org), [PNPM](https://pnpm.io), and [Node.js](https://nodejs.org) installed.

---

## 📦 Planned Roadmap

* [x] Base editor & local storage
* [x] Dark/light minimalist themes
* [ ] AI actions (summarize, rewrite)
* [ ] Quick command palette
* [ ] Plugin system for power-users
* [ ] Markdown export / sync
* [ ] Offline-first mobile version?

---

## 🤝 Contributing

We’re building this in public. Help us make it better:

* Check [issues](https://github.com/przybylku/quicknotes.ink/issues)
* Create a PR (small, scoped changes are welcome!)
* Share feedback in [Discussions](https://github.com/przybylku/quicknotes.ink/discussions)

> All contributors are listed in `CONTRIBUTORS.md` ❤️

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

…we’d love your help!

> Sponsor us on [GitHub Sponsors](https://github.com/sponsors/przybylku) or reach out via X (soon)

---

## 📄 License

Licensed under the [MIT License](LICENSE)

---

## ✍️ Built with love by the community

QuickNote.ink is built by people who love writing, thinking, and clean code.

Pull requests welcome. The keyboard is your sword. 🖋️

---

Made with ☕ and ⚡ by [@przybylk](https://github.com/przybylku)
