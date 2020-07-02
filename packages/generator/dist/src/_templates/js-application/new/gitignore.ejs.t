---
to: <%= outDir  %>/<%= name %>/.gitignore
unless_exists: true
---
*.log
*.db
**/node_modules
.idea
npm-debug.log
coverage