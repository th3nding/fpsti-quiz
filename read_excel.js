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

console.log('=== 数据概览 ===');
console.log('列名:', data[0]);
console.log('数据行数:', data.length - 1);
console.log('\n前 10 行数据:');
data.slice(0, 11).forEach((row, idx) => {
  console.log(`行${idx}:`, row);
});
