@echo off
echo Setting up your project submission...

REM Stage all changes
git add .

REM Commit with your name
git commit -m "Added my project folder - Shikha_cse_049"

REM Push to GitHub
git push origin main

echo Done! Now create a Pull Request on GitHub.
pause
. 