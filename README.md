# 司机互助圈 Web Demo

根据《司机圈方案》产品需求文档制作的网页演示版本。

## 在线预览

👉 [点击预览](https://高爽.github.io/driver-circle-demo/)

## 包含页面

- **首页** (`index.html`)：滴滴司机端首页，入口“附近司机圈”
- **互助圈首页** (`circle.html`)：附近拼车 / 找接驳车 Tab 切换
- **发布拼车需求** (`publish.html`)：填写起点、目的地、时间、车辆情况
- **拼车需求详情** (`detail.html`)：查看需求详情并响应
- **响应者列表** (`responders.html`)：发布者选择同行司机
- **拼车成功** (`success.html`)：展示同行人信息与联系方式
- **接驳车预约** (`booking.html`)：选择班次、确认信息、支付
- **预约成功** (`booking-success.html`)：展示预约凭证

## 顺风捎带演示

在互助圈首页底部，点击“模拟车主视角”或“模拟乘客视角”即可体验系统自动匹配的弹窗流程。

## 本地运行

```bash
cd driver-circle-demo
npx http-server -p 8080
```

然后在浏览器访问 `http://localhost:8080`。

## 说明

这是一个产品演示原型，用于展示需求中的核心页面与交互流程，数据均为模拟数据。
