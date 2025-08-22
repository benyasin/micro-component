#!/bin/bash

# 杀死test项目可能占用的端口进程
# 端口列表：5173(Vue3), 5175(Vue2), 5176(React)

echo "正在检查并杀死占用端口的进程..."

# 获取占用指定端口的进程ID并杀死
PORTS="5171,5172,5173"
PIDS=$(lsof -ti:$PORTS 2>/dev/null)

if [ -n "$PIDS" ]; then
    echo "发现占用端口的进程: $PIDS"
    echo $PIDS | xargs kill -9
    echo "已杀死所有占用端口的进程"
else
    echo "没有发现占用指定端口的进程"
fi

echo "端口清理完成"