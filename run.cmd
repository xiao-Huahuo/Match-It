#用于直接启动前端后后端端口,使用./run.cmd即可运行
@echo off
echo 正在启动前端和模拟后端服务...

REM 启动前端开发服务器 (Vite)
REM /k 参数表示执行命令后保留窗口
start cmd /k "cd frontend && npm run dev"

REM 启动模拟后端服务器 (Node.js Express)
REM /k 参数表示执行命令后保留窗口
start cmd /k "cd simu-backend && node server.js"

echo 两个服务已在单独的窗口中启动。
echo 您可以关闭此窗口。
