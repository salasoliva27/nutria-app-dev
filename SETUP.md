# nutrIA Setup Guide

## One-time Supabase Setup

### 1. Run the database schema
Go to Supabase dashboard → SQL Editor → paste and run `database/schema.sql`.

### 2. Enable Google OAuth
Supabase dashboard → Authentication → Providers → Google → toggle ON.
Add your Google OAuth credentials (Client ID + Secret from Google Cloud Console).
Authorized redirect URI: `https://[your-supabase-project].supabase.co/auth/v1/callback`

### 3. Get your Supabase anon key
Dashboard → Project Settings → API → `anon public` key.
Add to dotfiles as `SUPABASE_ANON_KEY`.

---

## Netlify Token (for future MCP deployment)
1. Go to app.netlify.com → User settings → Applications → Personal access tokens
2. Create token, add to dotfiles as `NETLIFY_AUTH_TOKEN`

---

## Local Development

```bash
# One-time: populate .env.local files from your dotfiles env vars
cd /workspaces/nutria-app
bash scripts/setup-env.sh

# Terminal 1 — PWA app (localhost:5173)
cd app && npm run dev

# Terminal 2 — Widget build + preview
cd widget && npm run build && npm run preview
```

---

## Embed widget on longevite-therapeutics

Add before the closing `</body>` tag:

```html
<script>
  window.NUTRIA_CONFIG = {
    apiKey: 'your_anthropic_key',
    language: 'es'
  }
</script>
<script src="https://[your-netlify-url]/widget.js"></script>
```

After Netlify deploy, the URL will be `https://nutria-app.netlify.app/widget.js`.

---

## Project Structure

```
nutria-app/
├── shared/          ← written once, used by both targets
│   ├── lib/         ← claude.js (streaming API), supabase.js
│   ├── hooks/       ← useChat.js, useVoice.js
│   └── components/Chat/  ← ChatPanel, ChatFull, ChatBubble, VoiceButton, GlowEffect
├── app/             ← BUILD TARGET 1: React PWA
├── widget/          ← BUILD TARGET 2: embeddable widget.js
├── database/        ← Supabase SQL schema
├── scripts/         ← setup-env.sh
└── netlify.toml
```
