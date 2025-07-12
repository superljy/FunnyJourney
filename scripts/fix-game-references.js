#!/usr/bin/env node

/**
 * 修复games目录下HTML文件中的broken references
 * 移除对不存在的../js/analytics.js和../css/styles.css的引用
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const GAMES_DIR = path.join(__dirname, '../games')
const BACKUP_DIR = path.join(__dirname, '../.old/games-backup')

// 确保备份目录存在
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true })
}

// 需要移除的引用
const BROKEN_REFERENCES = [
  '<script src="../js/analytics.js"></script>',
  '<link rel="stylesheet" href="../css/styles.css">',
  '<link rel="stylesheet" href="../css/light-theme.css">',
]

// 需要保留的引用（这些是有效的）
const VALID_REFERENCES = [
  'https://www.googletagmanager.com/gtag/js',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome',
  'https://cdn.tailwindcss.com',
]

/**
 * 检查引用是否有效
 */
function isValidReference(line) {
  // 检查是否是需要移除的broken reference
  for (const brokenRef of BROKEN_REFERENCES) {
    if (line.includes(brokenRef)) {
      return false
    }
  }
  
  // 检查是否是有效的外部引用
  for (const validRef of VALID_REFERENCES) {
    if (line.includes(validRef)) {
      return true
    }
  }
  
  // 如果不是js或css引用，保留
  if (!line.includes('<script') && !line.includes('<link')) {
    return true
  }
  
  // 检查是否是相对路径引用
  if (line.includes('src="../') || line.includes('href="../')) {
    // 检查文件是否存在
    const match = line.match(/(?:src|href)="\.\.\/([^"]+)"/)
    if (match) {
      const filePath = path.join(__dirname, '..', match[1])
      return fs.existsSync(filePath)
    }
  }
  
  return true
}

/**
 * 修复单个HTML文件
 */
function fixHtmlFile(filePath) {
  const fileName = path.basename(filePath)
  const backupPath = path.join(BACKUP_DIR, fileName)
  
  // 读取原文件
  const content = fs.readFileSync(filePath, 'utf8')
  
  // 创建备份
  fs.writeFileSync(backupPath, content)
  
  // 处理每一行
  const lines = content.split('\n')
  const fixedLines = []
  let removedReferences = []
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    
    if (isValidReference(line)) {
      fixedLines.push(line)
    } else {
      // 记录移除的引用
      const trimmedLine = line.trim()
      if (trimmedLine) {
        removedReferences.push(trimmedLine)
      }
      // 不添加到fixedLines中，相当于删除这一行
    }
  }
  
  // 写入修复后的文件
  const fixedContent = fixedLines.join('\n')
  fs.writeFileSync(filePath, fixedContent)
  
  return {
    fileName,
    removedReferences,
    linesBefore: lines.length,
    linesAfter: fixedLines.length
  }
}

/**
 * 主函数
 */
function main() {
  console.log('🔧 开始修复games目录下的HTML文件...\n')
  
  // 获取所有HTML文件
  const files = fs.readdirSync(GAMES_DIR)
    .filter(file => file.endsWith('.html'))
    .map(file => path.join(GAMES_DIR, file))
  
  if (files.length === 0) {
    console.log('❌ 没有找到需要修复的HTML文件')
    return
  }
  
  const results = []
  
  for (const file of files) {
    try {
      const result = fixHtmlFile(file)
      results.push(result)
      
      console.log(`✅ ${result.fileName}`)
      console.log(`   - 行数: ${result.linesBefore} → ${result.linesAfter}`)
      if (result.removedReferences.length > 0) {
        console.log(`   - 移除的引用:`)
        result.removedReferences.forEach(ref => {
          console.log(`     • ${ref}`)
        })
      }
      console.log()
    } catch (error) {
      console.error(`❌ 修复文件失败: ${path.basename(file)}`)
      console.error(`   错误: ${error.message}\n`)
    }
  }
  
  // 总结
  const totalFiles = results.length
  const totalRemovedRefs = results.reduce((sum, r) => sum + r.removedReferences.length, 0)
  
  console.log('📊 修复总结:')
  console.log(`   - 处理文件: ${totalFiles}`)
  console.log(`   - 移除的broken references: ${totalRemovedRefs}`)
  console.log(`   - 备份位置: ${BACKUP_DIR}`)
  console.log('\n✨ 修复完成!')
}

// 运行脚本
main() 