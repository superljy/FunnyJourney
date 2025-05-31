# FunnyJourney Games Website

一个免费的在线游戏网站，提供多种浏览器游戏。

## 🎮 游戏列表

- **Monster Survivors** - 生存冒险游戏
- **Pyramid Solitaire** - 金字塔纸牌游戏
- **Classic Solitaire** - 经典纸牌游戏
- **Fast Food Rush** - 快餐店经营游戏
- **Egg Helix** - 弹球arcade游戏
- **Poop Clicker** - 点击器游戏

## 🚀 Git自动同步配置

### 首次设置

1. **创建GitHub仓库**（如果还没有）
   - 在GitHub上创建新仓库
   - 复制仓库URL（例如：`https://github.com/username/repo-name.git`）

2. **配置远程仓库**
   ```powershell
   .\setup-github.ps1 "https://github.com/username/repo-name.git"
   ```

### 日常使用

#### 方式1：自动同步（推荐）
```powershell
# 带自定义提交信息
.\auto-sync.ps1 "添加新游戏功能"

# 使用默认时间戳提交信息
.\auto-sync.ps1
```

#### 方式2：快速同步
```powershell
# 快速提交并推送（使用时间戳作为提交信息）
.\quick-sync.ps1
```

### 脚本功能说明

- **`setup-github.ps1`** - 一次性配置GitHub仓库
- **`auto-sync.ps1`** - 完整的自动同步（拉取→提交→推送）
- **`quick-sync.ps1`** - 快速同步（适合频繁的小更改）
- **`fix-encoding.ps1`** - 修复PowerShell中文显示乱码问题

### 自动同步流程

1. 📥 **拉取远程更改** - 确保本地代码是最新的
2. 📝 **添加本地更改** - 暂存所有修改的文件
3. 💾 **提交更改** - 创建带描述的提交
4. 📤 **推送到远程** - 同步到GitHub仓库

### 手动Git命令（高级用户）

如果你熟悉Git命令，也可以手动执行：

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

## 🛠️ 开发环境

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
├── games/              # 游戏页面
├── img/                # 图片资源
├── about/              # 关于页面
├── auto-sync.ps1       # 自动同步脚本
├── quick-sync.ps1      # 快速同步脚本
├── setup-github.ps1    # GitHub配置脚本
└── fix-encoding.ps1    # 编码修复脚本
```

## 📝 提交规范建议

为了保持清晰的项目历史，建议使用以下提交信息格式：

- `feat: 添加新功能`
- `fix: 修复bug`
- `style: 样式更新`
- `docs: 文档更新`
- `refactor: 代码重构`

## 🔧 故障排除

### PowerShell权限问题
如果PowerShell脚本无法执行，运行：
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### 中文乱码问题解决方案

#### 方案1：运行编码修复脚本
```powershell
.\fix-encoding.ps1
```

#### 方案2：手动设置编码
在运行脚本前执行：
```powershell
chcp 65001
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
```

#### 方案3：使用Windows Terminal（推荐）
1. 安装 Windows Terminal（从Microsoft Store）
2. 在Windows Terminal中运行PowerShell
3. Windows Terminal对UTF-8支持更好

#### 方案4：修改PowerShell配置文件
创建或编辑PowerShell配置文件：
```powershell
# 检查配置文件路径
$PROFILE

# 创建配置文件（如果不存在）
if (!(Test-Path -Path $PROFILE)) {
    New-Item -ItemType File -Path $PROFILE -Force
}

# 编辑配置文件，添加以下内容：
# chcp 65001 | Out-Null
# [Console]::OutputEncoding = [System.Text.Encoding]::UTF8
# $OutputEncoding = [Console]::OutputEncoding
```

#### 方案5：使用英文版脚本
如果中文显示问题仍然存在，可以创建英文版本的脚本避免乱码。

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