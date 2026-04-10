const XLSX = require('xlsx');
const fs = require('fs');

// 读取 Excel 文件
const filePath = 'C:/Users/shenyue05/Desktop/毕业论文/模组（质性）/owmod_maps_new.xlsx';
const workbook = XLSX.readFile(filePath);

// 获取第一个工作表
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// 转换为 JSON
const data = XLSX.utils.sheet_to_json(worksheet, {header: 1});

const headers = data[0];
const rows = data.slice(1).filter(row => row.length > 0);

console.log('=== 数据概览 ===');
console.log('列名:', headers);
console.log('有效样本数:', rows.length);

// 数值型列的统计
const numericCols = [4, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]; // 热度、技能修改程度等
const numericColNames = [
    '热度', '技能修改程度 1', '地图物件来源 1', '机制创新 1', '视觉创新 1', '叙事创新 1',
    '技能修改程度 2', '地图物件来源 2', '机制创新 2', '视觉创新 2', '叙事创新 2'
];

console.log('\n=== 数值变量描述性统计 ===\n');

numericCols.forEach((colIdx, i) => {
    const values = rows.map(row => row[colIdx]).filter(v => typeof v === 'number');
    
    if (values.length === 0) return;
    
    const n = values.length;
    const mean = values.reduce((a, b) => a + b, 0) / n;
    const sorted = [...values].sort((a, b) => a - b);
    const min = sorted[0];
    const max = sorted[n - 1];
    
    // 中位数
    const median = n % 2 === 0 
        ? (sorted[n/2 - 1] + sorted[n/2]) / 2 
        : sorted[Math.floor(n/2)];
    
    // 标准差
    const variance = values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / (n - 1);
    const sd = Math.sqrt(variance);
    
    // 四分位数
    const q1 = sorted[Math.floor(n * 0.25)];
    const q3 = sorted[Math.floor(n * 0.75)];
    
    console.log(`${numericColNames[i]} (N=${n})`);
    console.log(`  均值 (Mean): ${mean.toFixed(2)}`);
    console.log(`  标准差 (SD): ${sd.toFixed(2)}`);
    console.log(`  最小值 (Min): ${min}`);
    console.log(`  中位数 (Median): ${median}`);
    console.log(`  最大值 (Max): ${max}`);
    console.log(`  Q1: ${q1}, Q3: ${q3}`);
    console.log('');
});

// 分类型列的频数统计
const categoricalCols = [
    {idx: 3, name: '类型'},
    {idx: 6, name: '页面'}
];

console.log('\n=== 分类变量频数统计 ===\n');

categoricalCols.forEach(col => {
    const values = rows.map(row => row[col.idx]).filter(v => v !== undefined && v !== null);
    const freq = {};
    values.forEach(v => {
        freq[v] = (freq[v] || 0) + 1;
    });
    
    console.log(`${col.name} (N=${values.length})`);
    Object.entries(freq)
        .sort((a, b) => b[1] - a[1])
        .forEach(([val, count]) => {
            const pct = (count / values.length * 100).toFixed(1);
            console.log(`  ${val}: ${count} (${pct}%)`);
        });
    console.log('');
});

// 保存统计结果到 JSON
const statsResults = {
    sampleSize: rows.length,
    numericStats: numericCols.map((colIdx, i) => {
        const values = rows.map(row => row[colIdx]).filter(v => typeof v === 'number');
        if (values.length === 0) return null;
        
        const n = values.length;
        const mean = values.reduce((a, b) => a + b, 0) / n;
        const sorted = [...values].sort((a, b) => a - b);
        const variance = values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / (n - 1);
        
        return {
            variable: numericColNames[i],
            N: n,
            Mean: mean,
            SD: Math.sqrt(variance),
            Min: sorted[0],
            Median: n % 2 === 0 ? (sorted[n/2 - 1] + sorted[n/2]) / 2 : sorted[Math.floor(n/2)],
            Max: sorted[n - 1],
            Q1: sorted[Math.floor(n * 0.25)],
            Q3: sorted[Math.floor(n * 0.75)]
        };
    }).filter(s => s !== null),
    categoricalStats: categoricalCols.map(col => {
        const values = rows.map(row => row[col.idx]).filter(v => v !== undefined && v !== null);
        const freq = {};
        values.forEach(v => { freq[v] = (freq[v] || 0) + 1; });
        
        return {
            variable: col.name,
            N: values.length,
            frequencies: freq
        };
    })
};

fs.writeFileSync('C:/Users/shenyue05/lobsterai/project/descriptive_stats.json', 
    JSON.stringify(statsResults, null, 2), 'utf-8');
console.log('✓ 统计结果已保存到：descriptive_stats.json');
