#!/bin/bash
set -e

echo "Setting up nutrIA environment files..."

# App .env.local
cat > app/.env.local << EOF
VITE_SUPABASE_URL=${SUPABASE_URL}
VITE_SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}
VITE_ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
EOF

# Widget .env.local
cat > widget/.env.local << EOF
VITE_ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
VITE_SUPABASE_URL=${SUPABASE_URL}
EOF

echo "Both .env.local files populated"
