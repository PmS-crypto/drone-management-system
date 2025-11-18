#!/bin/bash

# Script to push drone-management-system to GitHub
# First, create the repository on GitHub at https://github.com/new
# Repository name: drone-management-system

echo "🚀 Setting up GitHub repository..."

# Get GitHub username
read -p "Enter your GitHub username: " GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
  echo "❌ GitHub username is required"
  exit 1
fi

# Add remote
echo "📡 Adding remote origin..."
git remote remove origin 2>/dev/null
git remote add origin "https://github.com/${GITHUB_USERNAME}/drone-management-system.git"

# Set main branch
git branch -M main

# Push to GitHub
echo "⬆️  Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
  echo "✅ Successfully pushed to GitHub!"
  echo "🌐 Repository URL: https://github.com/${GITHUB_USERNAME}/drone-management-system"
else
  echo "❌ Failed to push. Make sure:"
  echo "   1. You've created the repository at https://github.com/new"
  echo "   2. Repository name is: drone-management-system"
  echo "   3. You have push access to the repository"
fi



