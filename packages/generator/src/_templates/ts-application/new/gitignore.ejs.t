---
to: <%= outDir  %>/<%= name %>/.gitignore
unless_exists: true
---
*.log
*.db
**/node_modules
.idea
lerna-debug.log
npm-debug.log
coverage