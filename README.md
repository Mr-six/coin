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

# 依赖安装 -----------------------------------
npm install --production

# 启动项目 确保本地 mongodb 服务开启 连接配置： config/config.default.js
npm run dev
```

## 使用框架
- [前端 vue](https://cn.vuejs.org/index.html)
- [node 后端 egg](https://eggjs.org/)

