# FunnyJourney 游戏页面模板和统一Analytics系统

## 🎯 概述

这个系统提供了统一的Google Analytics集成和游戏页面模板，让您能够快速创建新的游戏页面而无需重复编写Analytics代码。

## 📁 文件结构

```
├── js/
│   ├── analytics.js          # 统一的Google Analytics脚本
│   └── common-head.js        # 通用的头部模板和游戏功能
├── templates/
│   ├── game-template.html    # 游戏页面模板
│   └── README.md            # 本说明文件
└── games/
    ├── your-game.html       # 你的游戏页面
    └── ...
```

## 🚀 快速开始

### 1. 使用现有页面的Analytics

所有现有页面都已经更新为使用统一的Analytics系统。无需额外操作。

### 2. 创建新游戏页面

1. 复制 `templates/game-template.html` 到 `games/` 目录
2. 重命名为你的游戏名称，例如 `games/my-new-game.html`
3. 替换模板中的占位符：

```html
{{GAME_TITLE}} - 游戏的完整标题
{{GAME_DESCRIPTION}} - 游戏描述（用于SEO）
{{GAME_KEYWORDS}} - 游戏关键词（逗号分隔）
{{GAME_EMOJI}} - 游戏表情符号
{{GAME_NAME}} - 游戏名称
{{GAME_LONG_DESCRIPTION}} - 游戏的详细描述
{{GAME_URL}} - 游戏的iframe源地址
{{FEATURE_CARDS}} - 游戏特性卡片HTML
{{CONTROL_INSTRUCTIONS}} - 控制说明HTML列表项
{{OBJECTIVE_INSTRUCTIONS}} - 游戏目标HTML列表项
```

### 3. 示例替换

```html
<!-- 原模板 -->
<title>{{GAME_TITLE}} | FunnyJourney</title>

<!-- 替换后 -->
<title>🎮 Super Mario Run - Platform Adventure | FunnyJourney</title>
```

## 🎮 特性卡片模板

```html
<div class="feature-card p-6 rounded-xl">
    <div class="text-3xl mb-3">🎯</div>
    <h3 class="text-white font-semibold mb-2">特性标题</h3>
    <p class="text-gray-400 text-sm">特性描述</p>
</div>
```

## 📊 Analytics 功能

### 自动跟踪的事件：
- ✅ 页面浏览
- ✅ 游戏开始
- ✅ 游戏会话时长
- ✅ 全屏使用
- ✅ 页面停留时间

### 手动跟踪函数：
```javascript
// 跟踪游戏开始
trackGameStart('游戏名称');

// 跟踪游戏会话
trackGameSession('游戏名称', 持续时间);

// 跟踪全屏使用
trackGameFullscreen('游戏名称');
```

## 🔧 自定义配置

### 修改Analytics ID

编辑 `js/analytics.js` 文件中的ID（当前为 `G-TGVJVCTQBE`）：

```javascript
script.src = 'https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID';
gtag('config', 'YOUR-GA-ID');
```

### 添加新的跟踪事件

在 `js/analytics.js` 文件中添加新函数：

```javascript
window.trackCustomEvent = function(eventName, parameters) {
    gtag('event', eventName, parameters);
};
```

## 📋 创建新页面的步骤清单

- [ ] 复制模板文件
- [ ] 重命名文件
- [ ] 替换所有 `{{}}` 占位符
- [ ] 添加特性卡片HTML
- [ ] 添加控制说明
- [ ] 添加游戏目标
- [ ] 测试页面功能
- [ ] 验证Analytics跟踪

## 💡 最佳实践

1. **保持一致性**：所有游戏页面应使用相同的模板结构
2. **SEO优化**：确保每个页面都有独特的title、description和keywords
3. **响应式设计**：模板已包含响应式设计，无需额外修改
4. **性能优化**：Analytics脚本异步加载，不会影响页面性能

## 🔍 故障排除

### Analytics不工作？
1. 检查控制台是否有JavaScript错误
2. 确认 `js/analytics.js` 文件路径正确
3. 验证Google Analytics ID是否正确

### 页面样式问题？
1. 确认Tailwind CSS正常加载
2. 检查CSS路径是否正确
3. 验证自定义样式没有冲突

### 游戏iframe不显示？
1. 检查游戏URL是否正确
2. 确认iframe允许跨域访问
3. 验证网络连接

## 📞 支持

如果遇到问题，请检查：
1. 浏览器开发者工具的控制台
2. 网络请求是否成功
3. Analytics事件是否正确发送

---

**提示**：这个系统设计为一次设置，终身使用。新增游戏页面时只需复制模板并替换内容即可！ 