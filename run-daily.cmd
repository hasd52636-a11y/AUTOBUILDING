@echo off
chcp 65001 >nul
echo ========================================
echo   Auto-Building 每日采集发布流程
echo ========================================
echo.

echo [1/4] 安装依赖...
call npm install

echo.
echo [2/4] 采集资源...
call npx tsx scripts/scrape-all.ts

echo.
echo [3/4] LLM智能分类...
call npx tsx scripts/classify.ts

echo.
echo ========================================
echo   采集完成!
echo.
echo   请在浏览器中打开:
echo   http://localhost:3000/review
echo.
echo   进行审核
echo.
echo   审核完成后，运行 publish.cmd
echo   来发布到网站
echo ========================================
echo.

pause
