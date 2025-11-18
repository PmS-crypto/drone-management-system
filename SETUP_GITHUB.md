# Setting up GitHub Repository

Your code has been committed locally. To push to GitHub, follow these steps:

## Option 1: Using GitHub Web Interface (Easiest)

1. Go to https://github.com/new
2. Repository name: `drone-management-system`
3. Description: "Mission-critical security dashboard for art museum with drone management"
4. Choose Public or Private
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

Then run these commands:
```bash
git remote add origin https://github.com/YOUR_USERNAME/drone-management-system.git
git branch -M main
git push -u origin main
```

## Option 2: Using GitHub CLI (if installed)

```bash
gh repo create drone-management-system --public --source=. --remote=origin --push
```

## Option 3: Using GitHub API

If you have a GitHub Personal Access Token:
```bash
curl -X POST \
  -H "Authorization: token YOUR_GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/user/repos \
  -d '{"name":"drone-management-system","description":"Mission-critical security dashboard for art museum with drone management","private":false}'

git remote add origin https://github.com/YOUR_USERNAME/drone-management-system.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username and `YOUR_GITHUB_TOKEN` with your personal access token.



