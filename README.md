# 漂流邮局

一个代理发送最后的留言的服务。

## 本地运行

克隆主分支（main）到本地。

1. 配置

根目录 `.env` 文件设置后端请求链接端口和路径，进入 `server` 目录下的 `.env`，配置 `PORT` 属性，设置后端服务器使用端口（默认 9000），配置 `WEB` 属性为前端根地址，以允许跨域。

根目录中文 `vite.config.ts` 可以设置前端根路径，默认为 `/`。

```ts
export default defineConfig({
  base: '/',
  ...
})
```

2. 启动服务器

```bash
cd server
yarn install    # 安装依赖
yarn sequelize db:migrate   # 初始化数据库
yarn start
```

3. 启动前端

```bash
npm run dev
```
