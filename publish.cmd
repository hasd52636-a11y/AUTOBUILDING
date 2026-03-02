@echo off
chcp 65001 >nul
echo.
echo [4/4] 发布审核通过的资源...
echo.

call npx tsx scripts/publish.ts

echo.
echo.
echo ========================================
echo   ✅ 全部完成!
echo.
echo   网站将自动更新
echo   (Vercel 自动部署约需 1-2 分钟)
echo ========================================
echo.

pause
