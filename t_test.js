const XLSX = require('xlsx');
const fs = require('fs');

// 读取 Excel 文件
const filePath = 'C:/Users/shenyue05/Desktop/毕业论文/模组（质性）/owmod_maps_new.xlsx';
const workbook = XLSX.readFile(filePath);
const worksheet = workbook.Sheets[workbook.SheetNames[0]];
const data = XLSX.utils.sheet_to_json(worksheet, {header: 1});

const rows = data.slice(1).filter(row => row.length > 0);

console.log('=== 数据概览 ===');
console.log('样本数:', rows.length);

// 统计函数
function mean(arr) {
    return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function std(arr) {
    const m = mean(arr);
    const variance = arr.reduce((sum, v) => sum + Math.pow(v - m, 2), 0) / (arr.length - 1);
    return Math.sqrt(variance);
}

function variance(arr) {
    const m = mean(arr);
    return arr.reduce((sum, v) => sum + Math.pow(v - m, 2), 0) / (arr.length - 1);
}

// 独立样本 t 检验
function independentTTest(group1, group2) {
    const n1 = group1.length;
    const n2 = group2.length;
    const mean1 = mean(group1);
    const mean2 = mean(group2);
    const var1 = variance(group1);
    const var2 = variance(group2);
    
    // 合并标准误
    const pooledSE = Math.sqrt(var1/n1 + var2/n2);
    
    // t 值
    const t = (mean1 - mean2) / pooledSE;
    
    // 自由度 (Welch-Satterthwaite 近似)
    const num = Math.pow(var1/n1 + var2/n2, 2);
    const denom = Math.pow(var1/n1, 2)/(n1-1) + Math.pow(var2/n2, 2)/(n2-1);
    const df = num / denom;
    
    // p 值 (使用 t 分布近似)
    const pValue = tDistributionCDF(Math.abs(t), df);
    
    // Cohen's d (效应量)
    const pooledSD = Math.sqrt(((n1-1)*var1 + (n2-1)*var2) / (n1+n2-2));
    const cohensD = Math.abs(mean1 - mean2) / pooledSD;
    
    return {
        n1, n2,
        mean1, mean2,
        sd1: std(group1), sd2: std(group2),
        t, df, pValue, cohensD
    };
}

// 配对样本 t 检验
function pairedTTest(group1, group2) {
    const n = group1.length;
    const differences = group1.map((v, i) => v - group2[i]);
    
    const meanDiff = mean(differences);
    const sdDiff = std(differences);
    const seDiff = sdDiff / Math.sqrt(n);
    
    const t = meanDiff / seDiff;
    const df = n - 1;
    const pValue = tDistributionCDF(Math.abs(t), df);
    
    return {
        n,
        mean1: mean(group1),
        mean2: mean(group2),
        meanDiff,
        sdDiff,
        t, df, pValue
    };
}

// t 分布 CDF 近似
function tDistributionCDF(t, df) {
    // 使用近似公式计算双尾 p 值
    const x = df / (df + t * t);
    const beta = incompleteBeta(x, df/2, 0.5);
    const pValue = 1 - beta;
    return Math.max(0, Math.min(1, pValue * 2)); // 双尾
}

// 不完全 Beta 函数近似
function incompleteBeta(x, a, b) {
    if (x === 0) return 0;
    if (x === 1) return 1;
    
    // 使用连分式展开
    const bt = Math.exp(gammaln(a+b) - gammaln(a) - gammaln(b) + a*Math.log(x) + b*Math.log(1-x));
    
    if (x < (a+1)/(a+b+2)) {
        return bt * betaCF(x, a, b) / a;
    } else {
        return 1 - bt * betaCF(1-x, b, a) / b;
    }
}

function gammaln(z) {
    // Lanczos 近似
    const c = [76.18009172947146, -86.50532032941677, 24.01409824083091, -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5];
    let x = z;
    let y = z;
    let tmp = x + 5.5;
    tmp -= (x + 0.5) * Math.log(tmp);
    let ser = 1.000000000190015;
    for (let j = 0; j < 6; j++) {
        ser += c[j] / ++y;
    }
    return -tmp + Math.log(2.5066282746310005 * ser / x);
}

function betaCF(x, a, b) {
    const MAXITER = 100;
    const EPS = 3e-7;
    
    const qab = a + b;
    const qap = a + 1;
    const qam = a - 1;
    let c = 1;
    let d = 1 - qab * x / qap;
    if (Math.abs(d) < 1e-30) d = 1e-30;
    d = 1 / d;
    let h = d;
    
    for (let m = 1; m <= MAXITER; m++) {
        const m2 = 2 * m;
        let aa = m * (b - m) * x / ((qam + m2) * (a + m2));
        d = 1 + aa * d;
        if (Math.abs(d) < 1e-30) d = 1e-30;
        c = 1 + aa / c;
        if (Math.abs(c) < 1e-30) c = 1e-30;
        d = 1 / d;
        h *= d * c;
        
        aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
        d = 1 + aa * d;
        if (Math.abs(d) < 1e-30) d = 1e-30;
        c = 1 + aa / c;
        if (Math.abs(c) < 1e-30) c = 1e-30;
        d = 1 / d;
        const del = d * c;
        h *= del;
        
        if (Math.abs(del - 1) < EPS) break;
    }
    return h;
}

// ============ 独立样本 t 检验 ============

console.log('\n========================================');
console.log('一、独立样本 t 检验');
console.log('========================================\n');

// 1. 娱乐类 vs 竞技类 - 各维度比较
const typeCol = 3;
const innovationCols = {
    '技能修改程度': 9,
    '地图物件来源': 10,
    '机制创新': 11,
    '视觉创新': 12,
    '叙事创新': 13
};

const typeComparisons = [
    {group1: '娱乐', group2: '竞技', label: '娱乐 vs 竞技'},
    {group1: '娱乐', group2: '技能', label: '娱乐 vs 技能'},
    {group1: '娱乐', group2: '叙事', label: '娱乐 vs 叙事'},
    {group1: '竞技', group2: '技能', label: '竞技 vs 技能'},
    {group1: '竞技', group2: '叙事', label: '竞技 vs 叙事'},
    {group1: '技能', group2: '叙事', label: '技能 vs 叙事'}
];

const independentResults = [];

typeComparisons.forEach(comp => {
    console.log(`--- ${comp.label} ---`);
    
    Object.entries(innovationCols).forEach(([dim, colIdx]) => {
        const group1Data = rows.filter(r => r[typeCol] === comp.group1 && typeof r[colIdx] === 'number').map(r => r[colIdx]);
        const group2Data = rows.filter(r => r[typeCol] === comp.group2 && typeof r[colIdx] === 'number').map(r => r[colIdx]);
        
        if (group1Data.length >= 3 && group2Data.length >= 3) {
            const result = independentTTest(group1Data, group2Data);
            
            if (result.pValue < 0.05) {
                console.log(`${dim}: t(${result.df.toFixed(1)}) = ${result.t.toFixed(3)}, p = ${result.pValue < 0.001 ? '< 0.001***' : result.pValue < 0.01 ? '< 0.01**' : '< 0.05*'}, d = ${result.cohensD.toFixed(3)}`);
                
                independentResults.push({
                    comparison: comp.label,
                    dimension: dim,
                    group1: comp.group1,
                    group2: comp.group2,
                    n1: result.n1,
                    n2: result.n2,
                    mean1: result.mean1,
                    mean2: result.mean2,
                    sd1: result.sd1,
                    sd2: result.sd2,
                    t: result.t,
                    df: result.df,
                    pValue: result.pValue,
                    cohensD: result.cohensD
                });
            }
        }
    });
    console.log('');
});

// ============ 配对样本 t 检验 ============

console.log('\n========================================');
console.log('二、配对样本 t 检验 (编码员 1 vs 编码员 2)');
console.log('========================================\n');

const pairedCols = {
    '技能修改程度': [9, 14],
    '地图物件来源': [10, 15],
    '机制创新': [11, 16],
    '视觉创新': [12, 17],
    '叙事创新': [13, 18]
};

const pairedResults = [];

Object.entries(pairedCols).forEach(([dim, [col1, col2]]) => {
    const group1Data = [];
    const group2Data = [];
    
    rows.forEach(row => {
        if (typeof row[col1] === 'number' && typeof row[col2] === 'number') {
            group1Data.push(row[col1]);
            group2Data.push(row[col2]);
        }
    });
    
    const result = pairedTTest(group1Data, group2Data);
    
    console.log(`${dim}:`);
    console.log(`  编码员 1: M = ${result.mean1.toFixed(3)}, SD = ${std(group1Data).toFixed(3)}`);
    console.log(`  编码员 2: M = ${result.mean2.toFixed(3)}, SD = ${std(group2Data).toFixed(3)}`);
    console.log(`  均值差异: ${result.meanDiff.toFixed(3)}`);
    console.log(`  t(${result.df}) = ${result.t.toFixed(3)}, p = ${result.pValue < 0.001 ? '< 0.001***' : result.pValue < 0.01 ? '< 0.01**' : result.pValue < 0.05 ? '< 0.05*' : '>= 0.05 (ns)'}`);
    console.log('');
    
    pairedResults.push({
        dimension: dim,
        n: result.n,
        mean1: result.mean1,
        mean2: result.mean2,
        meanDiff: result.meanDiff,
        sd1: std(group1Data),
        sd2: std(group2Data),
        t: result.t,
        df: result.df,
        pValue: result.pValue
    });
});

// 保存结果
const allResults = {
    independent: independentResults,
    paired: pairedResults,
    summary: {
        significantIndependent: independentResults.length,
        significantPaired: pairedResults.filter(r => r.pValue < 0.05).length
    }
};

fs.writeFileSync('C:/Users/shenyue05/lobsterai/project/t_test_results.json', 
    JSON.stringify(allResults, null, 2), 'utf-8');
console.log('✓ t 检验结果已保存到：t_test_results.json');
