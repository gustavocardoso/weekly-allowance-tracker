#!/bin/bash

echo "🚀 Starting Weekly Allowance Tracker..."
echo ""
echo "📋 Checking setup..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
fi

echo "✅ Setup complete!"
echo ""
echo "🌐 Starting development server..."
echo "📍 Open http://localhost:3000 in your browser"
echo ""

npm run dev
