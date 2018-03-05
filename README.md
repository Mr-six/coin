# bricks-web

> bricks 的前端展示项目

## 依赖
- node > 8
- mongodb > 3
- bricks 数据

## 环境安装

``` bash
# 环境安装 -----------------------------------
brew install node

# 推荐使用 nvm 管理 node
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
nvm install 8
nvm alias default 8

# 项目依赖安装 -----------------------------------
npm install --production

# [本地node后端调试] 确保本地 mongodb 服务开启 连接配置： config/config.default.js
npm run dev
# [本地前端调试] 启动项目 确保本地 已经开启 npm run dev
npm run local


# [服务端部署] 如果有依赖更新 在开启前 请执行一遍 npm install --production 以确保依赖为最新
npm run server # 启动服务（当前项目根目录）
npm run stop  # 停止服务（当前项目根目录）
```

## 使用框架
- [前端 vue](https://cn.vuejs.org/index.html)
- [node 后端 egg](https://eggjs.org/)

