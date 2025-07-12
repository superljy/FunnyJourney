#!/usr/bin/env node

/**
 * 修复域名URL脚本
 * 将所有错误的域名URL修复为正确的 https://www.funnyjourney.com/
 */

const fs = require('fs');
const path = require('path');

console.log('🚨 开始修复域名URL错误...\n');

// 错误的域名列表
const WRONG_DOMAINS = [
  'https://funnyjourneys.github.io',
  'https://www.funnyjourneys.com'
];

// 正确的域名
const CORRECT_DOMAIN = 'https://www.funnyjourney.com';

// 需要修复的文件列表
const FILES_TO_FIX = [
  'sitemap.xml',
  'robots.txt',
  'src/utils/seo.js',
  'src/views/AboutView.vue'
];

/**
 * 修复文件中的域名URL
 */
function fixFileUrls(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  文件不存在: ${filePath}`);
      return;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;

    // 替换所有错误的域名
    WRONG_DOMAINS.forEach(wrongDomain => {
      const regex = new RegExp(wrongDomain.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      if (content.includes(wrongDomain)) {
        content = content.replace(regex, CORRECT_DOMAIN);
        hasChanges = true;
        console.log(`✅ 修复 ${filePath}: ${wrongDomain} → ${CORRECT_DOMAIN}`);
      }
    });

    if (hasChanges) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`💾 已更新文件: ${filePath}\n`);
    } else {
      console.log(`✓ 文件无需修复: ${filePath}\n`);
    }

  } catch (error) {
    console.error(`❌ 修复文件失败 ${filePath}:`, error.message);
  }
}

/**
 * 批量修复所有文件
 */
function fixAllFiles() {
  console.log(`🎯 正确域名: ${CORRECT_DOMAIN}`);
  console.log(`❌ 错误域名: ${WRONG_DOMAINS.join(', ')}\n`);

  FILES_TO_FIX.forEach(file => {
    console.log(`🔧 修复文件: ${file}`);
    fixFileUrls(file);
  });

  console.log('✨ 域名URL修复完成！');
  console.log('\n📋 修复摘要:');
  console.log('1. sitemap.xml - 修复所有游戏和页面URL');
  console.log('2. robots.txt - 修复sitemap URL');
  console.log('3. src/utils/seo.js - 修复结构化数据URL');
  console.log('4. src/views/AboutView.vue - 修复页面URL');
  console.log(`\n🎉 所有URL现在都指向正确域名: ${CORRECT_DOMAIN}`);
}

// 执行修复
fixAllFiles(); 