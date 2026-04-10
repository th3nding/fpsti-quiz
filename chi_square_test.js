const XLSX = require('xlsx');
const fs = require('fs');

// 读取 Excel 文件
const filePath = 'C:/Users/shenyue05/Desktop/毕业论文/模组（质性）/owmod_maps_new.xlsx';
const workbook = XLSX.readFile(filePath);
const worksheet = workbook.Sheets[workbook.SheetNames[0]];
const data = XLSX.utils.sheet_to_json(worksheet, {header: 1});

const headers = data[0];
const rows = data.slice(1).filter(row => row.length > 0);

console.log('=== 数据概览 ===');
console.log('样本数:', rows.length);

// 卡方检验函数
function chiSquareTest(observed) {
    const rows = observed.length;
    const cols = observed[0].length;
    
    // 计算行和、列和、总和
    const rowSums = observed.map(row => row.reduce((a, b) => a + b, 0));
    const colSums = [];
    for (let j = 0; j < cols; j++) {
        colSums[j] = observed.reduce((sum, row) => sum + row[j], 0);
    }
    const total = rowSums.reduce((a, b) => a + b, 0);
    
    // 计算期望频数
    const expected = [];
    for (let i = 0; i < rows; i++) {
        expected[i] = [];
        for (let j = 0; j < cols; j++) {
            expected[i][j] = (rowSums[i] * colSums[j]) / total;
        }
    }
    
    // 计算卡方统计量
    let chiSquare = 0;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (expected[i][j] > 0) {
                chiSquare += Math.pow(observed[i][j] - expected[i][j], 2) / expected[i][j];
            }
        }
    }
    
    // 自由度
    const df = (rows - 1) * (cols - 1);
    
    // 计算 p 值 (使用卡方分布近似)
    const pValue = chiSquareCDF(chiSquare, df);
    
    // 计算 Cramer's V (效应量)
    const n = total;
    const minRC = Math.min(rows - 1, cols - 1);
    const cramersV = Math.sqrt(chiSquare / (n * minRC));
    
    return {
        chiSquare,
        df,
        pValue,
        cramersV,
        expected,
        rowSums,
        colSums,
        total
    };
}

// 卡方分布累积分布函数近似
function chiSquareCDF(x, df) {
    // 使用不完全 Gamma 函数近似
    // 这里使用简化方法：对于大卡方值，p 值很小
    if (x < 0) return 1;
    
    // 使用 Wilson-Hilferty 变换近似
    const z = Math.pow(x / df, 1/3) - (1 - 2/(9*df));
    const sigma = Math.sqrt(2/(9*df));
    const zScore = z / sigma;
    
    // 标准正态分布 CDF 近似
    const pValue = 1 - normalCDF(zScore);
    
    return Math.max(0, Math.min(1, pValue));
}

// 标准正态分布 CDF
function normalCDF(z) {
    const t = 1 / (1 + 0.2316419 * Math.abs(z));
    const d = 0.3989423 * Math.exp(-z * z / 2);
    const prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    return z > 0 ? 1 - prob : prob;
}

// 1. 类型 vs 技能修改程度 (编码员 1)
console.log('\n========================================');
console.log('检验 1: 模组类型 vs 技能修改程度 (编码员 1)');
console.log('========================================\n');

const typeCol = 3;
const skillModCol = 9;

const typeMap = {'娱乐': 0, '竞技': 1, '技能': 2, '叙事': 3};
const observed1 = [[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]];

rows.forEach(row => {
    const type = row[typeCol];
    const skill = row[skillModCol];
    if (typeMap[type] !== undefined && typeof skill === 'number' && skill >= 1 && skill <= 5) {
        observed1[typeMap[type]][skill - 1]++;
    }
});

console.log('观测频数:');
console.log('        1  2  3  4  5');
['娱乐', '竞技', '技能', '叙事'].forEach((type, i) => {
    console.log(`${type}:   ${observed1[i].join('  ')}`);
});

const result1 = chiSquareTest(observed1);
console.log('\n卡方检验结果:');
console.log(`  χ² = ${result1.chiSquare.toFixed(3)}`);
console.log(`  df = ${result1.df}`);
console.log(`  p = ${result1.pValue < 0.001 ? '< 0.001***' : result1.pValue < 0.01 ? '< 0.01**' : result1.pValue < 0.05 ? '< 0.05*' : '>= 0.05 (ns)'}`);
console.log(`  Cramer\'s V = ${result1.cramersV.toFixed(3)}`);

// 2. 类型 vs 机制创新 (编码员 1)
console.log('\n========================================');
console.log('检验 2: 模组类型 vs 机制创新 (编码员 1)');
console.log('========================================\n');

const mechInnovCol = 11;
const observed2 = [[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]];

rows.forEach(row => {
    const type = row[typeCol];
    const mech = row[mechInnovCol];
    if (typeMap[type] !== undefined && typeof mech === 'number' && mech >= 1 && mech <= 5) {
        observed2[typeMap[type]][mech - 1]++;
    }
});

console.log('观测频数:');
console.log('        1  2  3  4  5');
['娱乐', '竞技', '技能', '叙事'].forEach((type, i) => {
    console.log(`${type}:   ${observed2[i].join('  ')}`);
});

const result2 = chiSquareTest(observed2);
console.log('\n卡方检验结果:');
console.log(`  χ² = ${result2.chiSquare.toFixed(3)}`);
console.log(`  df = ${result2.df}`);
console.log(`  p = ${result2.pValue < 0.001 ? '< 0.001***' : result2.pValue < 0.01 ? '< 0.01**' : result2.pValue < 0.05 ? '< 0.05*' : '>= 0.05 (ns)'}`);
console.log(`  Cramer\'s V = ${result2.cramersV.toFixed(3)}`);

// 3. 类型 vs 视觉创新 (编码员 1)
console.log('\n========================================');
console.log('检验 3: 模组类型 vs 视觉创新 (编码员 1)');
console.log('========================================\n');

const visualInnovCol = 12;
const observed3 = [[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]];

rows.forEach(row => {
    const type = row[typeCol];
    const visual = row[visualInnovCol];
    if (typeMap[type] !== undefined && typeof visual === 'number' && visual >= 1 && visual <= 5) {
        observed3[typeMap[type]][visual - 1]++;
    }
});

console.log('观测频数:');
console.log('        1  2  3  4  5');
['娱乐', '竞技', '技能', '叙事'].forEach((type, i) => {
    console.log(`${type}:   ${observed3[i].join('  ')}`);
});

const result3 = chiSquareTest(observed3);
console.log('\n卡方检验结果:');
console.log(`  χ² = ${result3.chiSquare.toFixed(3)}`);
console.log(`  df = ${result3.df}`);
console.log(`  p = ${result3.pValue < 0.001 ? '< 0.001***' : result3.pValue < 0.01 ? '< 0.01**' : result3.pValue < 0.05 ? '< 0.05*' : '>= 0.05 (ns)'}`);
console.log(`  Cramer\'s V = ${result3.cramersV.toFixed(3)}`);

// 4. 类型 vs 叙事创新 (编码员 1)
console.log('\n========================================');
console.log('检验 4: 模组类型 vs 叙事创新 (编码员 1)');
console.log('========================================\n');

const narrativeInnovCol = 13;
const observed4 = [[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]];

rows.forEach(row => {
    const type = row[typeCol];
    const narrative = row[narrativeInnovCol];
    if (typeMap[type] !== undefined && typeof narrative === 'number' && narrative >= 1 && narrative <= 5) {
        observed4[typeMap[type]][narrative - 1]++;
    }
});

console.log('观测频数:');
console.log('        1  2  3  4  5');
['娱乐', '竞技', '技能', '叙事'].forEach((type, i) => {
    console.log(`${type}:   ${observed4[i].join('  ')}`);
});

const result4 = chiSquareTest(observed4);
console.log('\n卡方检验结果:');
console.log(`  χ² = ${result4.chiSquare.toFixed(3)}`);
console.log(`  df = ${result4.df}`);
console.log(`  p = ${result4.pValue < 0.001 ? '< 0.001***' : result4.pValue < 0.01 ? '< 0.01**' : result4.pValue < 0.05 ? '< 0.05*' : '>= 0.05 (ns)'}`);
console.log(`  Cramer\'s V = ${result4.cramersV.toFixed(3)}`);

// 5. 类型 vs 地图物件来源 (编码员 1)
console.log('\n========================================');
console.log('检验 5: 模组类型 vs 地图物件来源 (编码员 1)');
console.log('========================================\n');

const mapObjectCol = 10;
const observed5 = [[0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0], [0,0,0,0,0]];

rows.forEach(row => {
    const type = row[typeCol];
    const mapObj = row[mapObjectCol];
    if (typeMap[type] !== undefined && typeof mapObj === 'number' && mapObj >= 1 && mapObj <= 5) {
        observed5[typeMap[type]][mapObj - 1]++;
    }
});

console.log('观测频数:');
console.log('        1  2  3  4  5');
['娱乐', '竞技', '技能', '叙事'].forEach((type, i) => {
    console.log(`${type}:   ${observed5[i].join('  ')}`);
});

const result5 = chiSquareTest(observed5);
console.log('\n卡方检验结果:');
console.log(`  χ² = ${result5.chiSquare.toFixed(3)}`);
console.log(`  df = ${result5.df}`);
console.log(`  p = ${result5.pValue < 0.001 ? '< 0.001***' : result5.pValue < 0.01 ? '< 0.01**' : result5.pValue < 0.05 ? '< 0.05*' : '>= 0.05 (ns)'}`);
console.log(`  Cramer\'s V = ${result5.cramersV.toFixed(3)}`);

// 保存结果
const allResults = {
    tests: [
        { name: '类型 vs 技能修改程度', chiSquare: result1.chiSquare, df: result1.df, pValue: result1.pValue, cramersV: result1.cramersV, observed: observed1 },
        { name: '类型 vs 机制创新', chiSquare: result2.chiSquare, df: result2.df, pValue: result2.pValue, cramersV: result2.cramersV, observed: observed2 },
        { name: '类型 vs 视觉创新', chiSquare: result3.chiSquare, df: result3.df, pValue: result3.pValue, cramersV: result3.cramersV, observed: observed3 },
        { name: '类型 vs 叙事创新', chiSquare: result4.chiSquare, df: result4.df, pValue: result4.pValue, cramersV: result4.cramersV, observed: observed4 },
        { name: '类型 vs 地图物件来源', chiSquare: result5.chiSquare, df: result5.df, pValue: result5.pValue, cramersV: result5.cramersV, observed: observed5 }
    ],
    summary: {
        significant: [
            result1.pValue < 0.05 ? '类型 vs 技能修改程度' : null,
            result2.pValue < 0.05 ? '类型 vs 机制创新' : null,
            result3.pValue < 0.05 ? '类型 vs 视觉创新' : null,
            result4.pValue < 0.05 ? '类型 vs 叙事创新' : null,
            result5.pValue < 0.05 ? '类型 vs 地图物件来源' : null
        ].filter(t => t !== null)
    }
};

fs.writeFileSync('C:/Users/shenyue05/lobsterai/project/chi_square_results.json', 
    JSON.stringify(allResults, null, 2), 'utf-8');
console.log('\n✓ 卡方检验结果已保存到：chi_square_results.json');
