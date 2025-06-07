# FunnyJourney Games Website

一个免费的在线游戏网站，提供多种浏览器游戏。

## 🎮 游戏列表

- **Monster Survivors** - 生存冒险游戏
- **Pyramid Solitaire** - 金字塔纸牌游戏
- **Classic Solitaire** - 经典纸牌游戏
- **Fast Food Rush** - 快餐店经营游戏
- **Egg Helix** - 弹球arcade游戏
- **Poop Clicker** - 点击器游戏
- **Highway Traffic** - 高速公路交通游戏
- **Drift King** - 漂移赛车游戏
- **Mini Cars Racing** - 迷你赛车游戏
- **Apocalypse Truck** - 末日卡车游戏
- **Stack Fire Ball** - 堆叠火球游戏
- **Love Tester** - 爱情测试游戏

## 🚀 开发和部署

### Git管理

项目使用Git进行版本控制，基本工作流程：

```bash
# 拉取最新更改
git pull origin main

# 添加所有更改
git add .

# 提交更改
git commit -m "你的提交信息"

# 推送到远程仓库
git push origin main
```

### 提交规范建议

为了保持清晰的项目历史，建议使用以下提交信息格式：

- `feat: 添加新功能`
- `fix: 修复bug`
- `style: 样式更新`
- `docs: 文档更新`
- `refactor: 代码重构`

## 🛠️ 技术栈

- HTML5
- CSS3
- JavaScript (Vanilla)
- 响应式设计

## 📁 项目结构

```
.
├── index.html          # 主页
├── css/
│   └── styles.css      # 样式文件
├── js/
│   └── main.js         # 主要JavaScript
├── games/              # 游戏页面目录
│   ├── monster-survivors.html
│   ├── pyramid-solitaire.html
│   ├── solitaire.html
│   ├── fast-food-rush.html
│   ├── egg-helix.html
│   ├── poop-clicker.html
│   ├── highway-traffic.html
│   ├── drift-king.html
│   ├── mini-cars-racing.html
│   ├── apocalypse-truck.html
│   ├── stack-fire-ball.html
│   └── love-tester.html
├── img/                # 图片资源
├── about/              # 关于页面
│   └── index.html
└── ads.txt             # 广告配置文件
```

## 🔧 故障排除

### 合并冲突
如果出现合并冲突：
1. 手动解决冲突文件
2. 运行 `git add .`
3. 运行 `git commit`
4. 运行 `git push origin main`

### Git认证问题
如果推送时要求认证：
1. 使用GitHub Personal Access Token
2. 或配置SSH密钥
3. 详见GitHub官方文档

## 📄 许可证

MIT License - 详见LICENSE文件 