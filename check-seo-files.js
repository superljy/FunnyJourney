// SEO Files Status Checker
// 这个脚本可以用来检查robots.txt和sitemap.xml文件的状态

class SEOFileChecker {
    constructor(domain) {
        this.domain = domain;
        this.robotsUrl = `${domain}/robots.txt`;
        this.sitemapUrl = `${domain}/sitemap.xml`;
    }

    // 检查robots.txt文件
    async checkRobotsTxt() {
        try {
            const response = await fetch(this.robotsUrl);
            if (response.ok) {
                const content = await response.text();
                console.log('✅ robots.txt 文件可访问');
                console.log('📄 文件内容预览:', content.substring(0, 200) + '...');
                
                // 检查关键内容
                if (content.includes('Sitemap:')) {
                    console.log('✅ 包含sitemap地址');
                }
                if (content.includes('User-agent:')) {
                    console.log('✅ 包含爬虫规则');
                }
                
                return true;
            } else {
                console.log('❌ robots.txt 文件无法访问，状态码:', response.status);
                return false;
            }
        } catch (error) {
            console.log('❌ robots.txt 检查失败:', error.message);
            return false;
        }
    }

    // 检查sitemap.xml文件
    async checkSitemapXml() {
        try {
            const response = await fetch(this.sitemapUrl);
            if (response.ok) {
                const content = await response.text();
                console.log('✅ sitemap.xml 文件可访问');
                
                // 解析XML并统计页面数量
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(content, "text/xml");
                const urls = xmlDoc.getElementsByTagName('url');
                
                console.log(`📊 sitemap包含 ${urls.length} 个页面`);
                
                // 检查页面优先级分布
                const priorities = Array.from(urls).map(url => {
                    const priority = url.getElementsByTagName('priority')[0];
                    return priority ? parseFloat(priority.textContent) : 0;
                });
                
                console.log('📈 优先级分布:', {
                    '最高(1.0)': priorities.filter(p => p === 1.0).length,
                    '高(0.8-0.9)': priorities.filter(p => p >= 0.8 && p < 1.0).length,
                    '中(0.6-0.7)': priorities.filter(p => p >= 0.6 && p < 0.8).length,
                    '低(<0.6)': priorities.filter(p => p < 0.6).length
                });
                
                return true;
            } else {
                console.log('❌ sitemap.xml 文件无法访问，状态码:', response.status);
                return false;
            }
        } catch (error) {
            console.log('❌ sitemap.xml 检查失败:', error.message);
            return false;
        }
    }

    // 检查搜索引擎抓取状态
    async checkIndexingStatus() {
        console.log('🔍 检查Google索引状态...');
        
        // 检查主页是否被Google索引
        const searchQuery = `site:${this.domain.replace('https://', '')}`;
        console.log(`📋 使用以下查询检查索引状态: ${searchQuery}`);
        console.log('💡 在Google搜索框中输入上述查询来查看索引页面数量');
        
        // 提供Google Search Console链接
        console.log('🔗 Google Search Console:', 'https://search.google.com/search-console');
        console.log('🔗 Bing Webmaster Tools:', 'https://www.bing.com/webmasters');
    }

    // 运行完整检查
    async runFullCheck() {
        console.log(`🚀 开始检查 ${this.domain} 的SEO文件状态...\n`);
        
        const robotsOk = await this.checkRobotsTxt();
        console.log('');
        
        const sitemapOk = await this.checkSitemapXml();
        console.log('');
        
        await this.checkIndexingStatus();
        console.log('');
        
        // 生成报告
        console.log('📊 检查结果总结:');
        console.log(`robots.txt: ${robotsOk ? '✅ 正常' : '❌ 异常'}`);
        console.log(`sitemap.xml: ${sitemapOk ? '✅ 正常' : '❌ 异常'}`);
        
        if (robotsOk && sitemapOk) {
            console.log('🎉 恭喜！SEO基础文件配置完善！');
            console.log('📝 下一步建议:');
            console.log('   1. 提交sitemap到Google Search Console');
            console.log('   2. 监控Google Analytics流量变化');
            console.log('   3. 定期更新sitemap中的lastmod日期');
        } else {
            console.log('⚠️  需要修复上述问题以确保SEO效果');
        }
    }
}

// 使用示例
// const checker = new SEOFileChecker('https://funnyjourney.com');
// checker.runFullCheck();

// 如果在Node.js环境中使用，需要安装node-fetch
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SEOFileChecker;
}

/* 
使用方法：
1. 在浏览器控制台中运行：
   const checker = new SEOFileChecker('https://funnyjourney.com');
   checker.runFullCheck();

2. 在Node.js中运行：
   const SEOFileChecker = require('./check-seo-files.js');
   const checker = new SEOFileChecker('https://funnyjourney.com');
   checker.runFullCheck();
*/ 