const XLSX = require('xlsx');
const fs = require('fs');

// 读取 Excel 文件
const filePath = 'C:/Users/shenyue05/Desktop/毕业论文/模组（质性）/owmod_maps_new.xlsx';
const workbook = XLSX.readFile(filePath);

// 获取第一个工作表
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// 转换为 JSON (保留原始数据)
const data = XLSX.utils.sheet_to_json(worksheet, {header: 1});

// 提取列名
const headers = data[0];
const rows = data.slice(1);

console.log('=== 数据概览 ===');
console.log('列名:', headers);
console.log('有效数据行数:', rows.length);

// 找到编码相关的列 (1 和 2 分别代表两人的编码)
// 根据数据：技能修改程度 1, 地图物件来源 1, 机制创新 1, 视觉创新 1, 叙事创新 1
//          技能修改程度 2, 地图物件来源 2, 机制创新 2, 视觉创新 2, 叙事创新 2

const codingCols = {
  '技能修改程度': {col1: 9, col2: 14},  // 技能修改程度 1, 技能修改程度 2
  '地图物件来源': {col1: 10, col2: 15},  // 地图物件来源 1, 地图物件来源 2
  '机制创新': {col1: 11, col2: 16},      // 机制创新 1, 机制创新 2
  '视觉创新': {col1: 12, col2: 17},      // 视觉创新 1, 视觉创新 2
  '叙事创新': {col1: 13, col2: 18}       // 叙事创新 1, 叙事创新 2
};

console.log('\n=== 编码列索引 ===');
Object.entries(codingCols).forEach(([dim, cols]) => {
  console.log(`${dim}: 编码员 1=列${cols.col1}, 编码员 2=列${cols.col2}`);
});

// 计算每个维度的一致性
const results = {};
let totalAgreement = 0;
let totalSamples = 0;

Object.entries(codingCols).forEach(([dimension, cols]) => {
  if (cols.col1 === -1 || cols.col2 === -1) {
    console.log(`\n警告：${dimension} 的列未找到`);
    return;
  }
  
  let agreements = 0;
  const disagreements = [];
  const valueCounts = {};
  
  rows.forEach((row, idx) => {
    const coder1 = row[cols.col1];
    const coder2 = row[cols.col2];
    
    // 统计取值分布
    if (coder1 !== undefined) {
      valueCounts[coder1] = (valueCounts[coder1] || 0) + 1;
    }
    if (coder2 !== undefined && coder1 !== coder2) {
      valueCounts[coder2] = (valueCounts[coder2] || 0) + 1;
    }
    
    // 检查一致性
    if (coder1 === coder2) {
      agreements++;
    } else {
      disagreements.push({
        row: idx + 1,
        work: row[0], // 作品名称
        coder1: coder1,
        coder2: coder2
      });
    }
  });
  
  const agreementRate = (agreements / rows.length * 100).toFixed(2);
  results[dimension] = {
    agreements,
    disagreements: disagreements.length,
    agreementRate: parseFloat(agreementRate),
    valueCounts,
    disagreementDetails: disagreements
  };
  
  totalAgreement += agreements;
  totalSamples += rows.length;
  
  console.log(`\n=== ${dimension} 一致性分析 ===`);
  console.log(`总样本数：${rows.length}`);
  console.log(`一致数：${agreements}`);
  console.log(`不一致数：${disagreements.length}`);
  console.log(`一致率：${agreementRate}%`);
  console.log(`取值分布:`, JSON.stringify(valueCounts));
  
  if (disagreements.length > 0 && disagreements.length <= 10) {
    console.log('不一致详情:');
    disagreements.forEach(d => {
      console.log(`  行${d.row} [${d.work}]: 编码员 1=${d.coder1}, 编码员 2=${d.coder2}`);
    });
  }
});

// 计算整体一致率
const overallAgreementRate = (totalAgreement / totalSamples * 100).toFixed(2);
console.log('\n=== 整体一致性 ===');
console.log(`总编码数：${totalSamples}`);
console.log(`总一致数：${totalAgreement}`);
console.log(`整体一致率：${overallAgreementRate}%`);

// 计算 Cohen's Kappa (简化版)
// Kappa = (Po - Pe) / (1 - Pe)
// Po = 观察一致性，Pe = 期望一致性
console.log('\n=== Cohen\'s Kappa 系数 ===');
Object.entries(codingCols).forEach(([dimension, cols]) => {
  if (cols.col1 === -1 || cols.col2 === -1) return;
  
  const Po = results[dimension].agreementRate / 100;
  
  // 计算 Pe (期望一致性)
  const valueCounts = results[dimension].valueCounts;
  const totalValues = Object.values(valueCounts).reduce((a, b) => a + b, 0);
  
  let Pe = 0;
  Object.values(valueCounts).forEach(count => {
    const prop = count / totalValues;
    Pe += prop * prop;
  });
  
  const kappa = Po === 1 ? 1 : (Po - Pe) / (1 - Pe);
  
  console.log(`${dimension}:`);
  console.log(`  Po (观察一致性) = ${Po.toFixed(4)}`);
  console.log(`  Pe (期望一致性) = ${Pe.toFixed(4)}`);
  console.log(`  Kappa = ${kappa.toFixed(4)}`);
  
  // Kappa 解释
  let interpretation;
  if (kappa < 0) interpretation = '无一致性';
  else if (kappa < 0.2) interpretation = '极低一致性';
  else if (kappa < 0.4) interpretation = '一般一致性';
  else if (kappa < 0.6) interpretation = '中等一致性';
  else if (kappa < 0.8) interpretation = '较强一致性';
  else interpretation = '几乎完全一致';
  
  console.log(`  解释：${interpretation}`);
});

// 保存分析结果到 JSON
const outputData = {
  summary: {
    totalSamples: rows.length,
    overallAgreementRate: parseFloat(overallAgreementRate),
    dimensions: Object.keys(codingCols).length
  },
  results: Object.fromEntries(
    Object.entries(results).map(([k, v]) => [k, {
      agreements: v.agreements,
      disagreements: v.disagreements.length,
      agreementRate: v.agreementRate,
      kappa: (() => {
        const Po = v.agreementRate / 100;
        const totalValues = Object.values(v.valueCounts).reduce((a, b) => a + b, 0);
        let Pe = 0;
        Object.values(v.valueCounts).forEach(count => {
          const prop = count / totalValues;
          Pe += prop * prop;
        });
        return v.agreementRate === 100 ? 1 : (Po - Pe) / (1 - Pe);
      })()
    }])
  ),
  disagreementDetails: Object.fromEntries(
    Object.entries(results).map(([k, v]) => [k, v.disagreementDetails])
  )
};

fs.writeFileSync('C:/Users/shenyue05/lobsterai/project/codereliability_analysis.json', 
  JSON.stringify(outputData, null, 2), 'utf-8');
console.log('\n✓ 分析结果已保存到：codereliability_analysis.json');

// 生成图表数据
const chartData = {
  agreementRates: Object.entries(results).map(([dim, data]) => ({
    dimension: dim,
    agreementRate: data.agreementRate,
    agreements: data.agreements,
    disagreements: data.disagreements
  })),
  kappaValues: Object.entries(results).map(([dim, data]) => {
    const Po = data.agreementRate / 100;
    const totalValues = Object.values(data.valueCounts).reduce((a, b) => a + b, 0);
    let Pe = 0;
    Object.values(data.valueCounts).forEach(count => {
      const prop = count / totalValues;
      Pe += prop * prop;
    });
    const kappa = data.agreementRate === 100 ? 1 : (Po - Pe) / (1 - Pe);
    return {
      dimension: dim,
      kappa: parseFloat(kappa.toFixed(4))
    };
  })
};

fs.writeFileSync('C:/Users/shenyue05/lobsterai/project/chart_data.json', 
  JSON.stringify(chartData, null, 2), 'utf-8');
console.log('✓ 图表数据已保存到：chart_data.json');
