#!/bin/bash

# 重启所有test项目的脚本
# 先杀死占用端口的进程，然后重新启动所有项目

echo "=== 重启Test项目 ==="
echo

# 1. 杀死占用端口的进程
echo "步骤1: 清理端口占用..."
PORTS="5171,5172,5173"
PIDS=$(lsof -ti:$PORTS 2>/dev/null)

if [ -n "$PIDS" ]; then
    echo "发现占用端口的进程: $PIDS"
    echo $PIDS | xargs kill -9
    echo "✅ 已杀死所有占用端口的进程"
else
    echo "✅ 没有发现占用指定端口的进程"
fi

echo
echo "步骤2: 等待端口释放..."
sleep 2

echo
echo "步骤3: 启动所有test项目..."
echo "正在启动: Vue3(5173), Vue2(5172), React(5171)"
echo

# 2. 启动所有test项目
pnpm run test:dev