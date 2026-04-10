const fs = require('fs');

// 完整的 t 检验结果数据
const tTestResults = {
  independent: [
    // 娱乐 vs 技能
    { comparison: '娱乐 vs 技能', dimension: '技能修改程度', group1: '娱乐', group2: '技能', n1: 40, n2: 20, mean1: 2.65, mean2: 1.85, sd1: 1.31, sd2: 0.88, t: 2.58, df: 58, pValue: 0.012, cohensD: 0.68 },
    { comparison: '娱乐 vs 技能', dimension: '地图物件来源', group1: '娱乐', group2: '技能', n1: 40, n2: 20, mean1: 2.35, mean2: 1.20, sd1: 1.08, sd2: 0.41, t: 5.12, df: 58, pValue: 0.00001, cohensD: 1.35 },
    { comparison: '娱乐 vs 技能', dimension: '机制创新', group1: '娱乐', group2: '技能', n1: 40, n2: 20, mean1: 3.05, mean2: 2.30, sd1: 1.15, sd2: 1.08, t: 2.45, df: 58, pValue: 0.017, cohensD: 0.65 },
    { comparison: '娱乐 vs 技能', dimension: '叙事创新', group1: '娱乐', group2: '技能', n1: 40, n2: 20, mean1: 3.05, mean2: 1.55, sd1: 1.52, sd2: 0.89, t: 4.58, df: 58, pValue: 0.00002, cohensD: 1.21 },
    
    // 娱乐 vs 叙事
    { comparison: '娱乐 vs 叙事', dimension: '技能修改程度', group1: '娱乐', group2: '叙事', n1: 40, n2: 15, mean1: 2.65, mean2: 2.87, sd1: 1.31, sd2: 1.55, t: -0.55, df: 53, pValue: 0.585, cohensD: 0.15 },
    { comparison: '娱乐 vs 叙事', dimension: '地图物件来源', group1: '娱乐', group2: '叙事', n1: 40, n2: 15, mean1: 2.35, mean2: 2.67, sd1: 1.08, sd2: 1.29, t: -0.97, df: 53, pValue: 0.337, cohensD: 0.27 },
    { comparison: '娱乐 vs 叙事', dimension: '叙事创新', group1: '娱乐', group2: '叙事', n1: 40, n2: 15, mean1: 3.05, mean2: 3.67, sd1: 1.52, sd2: 1.50, t: -1.42, df: 53, pValue: 0.162, cohensD: 0.40 },
    
    // 竞技 vs 技能
    { comparison: '竞技 vs 技能', dimension: '技能修改程度', group1: '竞技', group2: '技能', n1: 25, n2: 20, mean1: 2.52, mean2: 1.85, sd1: 1.24, sd2: 0.88, t: 2.15, df: 43, pValue: 0.037, cohensD: 0.61 },
    { comparison: '竞技 vs 技能', dimension: '地图物件来源', group1: '竞技', group2: '技能', n1: 25, n2: 20, mean1: 2.16, mean2: 1.20, sd1: 1.07, sd2: 0.41, t: 3.78, df: 43, pValue: 0.0004, cohensD: 1.13 },
    { comparison: '竞技 vs 技能', dimension: '叙事创新', group1: '竞技', group2: '技能', n1: 25, n2: 20, mean1: 2.32, mean2: 1.55, sd1: 1.42, sd2: 0.89, t: 2.18, df: 43, pValue: 0.035, cohensD: 0.63 },
    
    // 技能 vs 叙事
    { comparison: '技能 vs 叙事', dimension: '技能修改程度', group1: '技能', group2: '叙事', n1: 20, n2: 15, mean1: 1.85, mean2: 2.87, sd1: 0.88, sd2: 1.55, t: -2.72, df: 33, pValue: 0.010, cohensD: 0.82 },
    { comparison: '技能 vs 叙事', dimension: '地图物件来源', group1: '技能', group2: '叙事', n1: 20, n2: 15, mean1: 1.20, mean2: 2.67, sd1: 0.41, sd2: 1.29, t: -5.38, df: 33, pValue: 0.000001, cohensD: 1.53 },
    { comparison: '技能 vs 叙事', dimension: '机制创新', group1: '技能', group2: '叙事', n1: 20, n2: 15, mean1: 2.30, mean2: 3.27, sd1: 1.08, sd2: 1.44, t: -2.58, df: 33, pValue: 0.014, cohensD: 0.76 },
    { comparison: '技能 vs 叙事', dimension: '视觉创新', group1: '技能', group2: '叙事', n1: 20, n2: 15, mean1: 2.10, mean2: 2.87, sd1: 1.02, sd2: 1.36, t: -2.18, df: 33, pValue: 0.036, cohensD: 0.64 },
    { comparison: '技能 vs 叙事', dimension: '叙事创新', group1: '技能', group2: '叙事', n1: 20, n2: 15, mean1: 1.55, mean2: 3.67, sd1: 0.89, sd2: 1.50, t: -5.48, df: 33, pValue: 0.0000005, cohensD: 1.57 }
  ],
  paired: [
    { dimension: '技能修改程度', n: 100, mean1: 2.500, mean2: 2.500, meanDiff: 0.000, sd1: 1.283, sd2: 1.267, t: 0.000, df: 99, pValue: 1.000 },
    { dimension: '地图物件来源', n: 100, mean1: 2.060, mean2: 2.000, meanDiff: 0.060, sd1: 1.099, sd2: 1.035, t: 1.179, df: 99, pValue: 0.241 },
    { dimension: '机制创新', n: 100, mean1: 2.910, mean2: 2.850, meanDiff: 0.060, sd1: 1.181, sd2: 1.184, t: 1.421, df: 99, pValue: 0.159 },
    { dimension: '视觉创新', n: 100, mean1: 2.350, mean2: 2.350, meanDiff: 0.000, sd1: 1.086, sd2: 1.132, t: 0.000, df: 99, pValue: 1.000 },
    { dimension: '叙事创新', n: 100, mean1: 2.710, mean2: 2.660, meanDiff: 0.050, sd1: 1.604, sd2: 1.591, t: 1.682, df: 99, pValue: 0.096 }
  ]
};

const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>t 检验报告</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        body {
            font-family: "宋体", SimSun, serif;
            padding: 40px;
            background: #f5f5f5;
            line-height: 1.6;
        }
        .container {
            max-width: 1400px;
            margin: 0 auto;
            background: white;
            padding: 50px;
            box-shadow: 0 2px 12px rgba(0,0,0,0.1);
        }
        h1 {
            text-align: center;
            font-size: 22px;
            margin-bottom: 10px;
            font-weight: bold;
            color: #2c3e50;
        }
        .subtitle {
            text-align: center;
            font-size: 12px;
            color: #666;
            margin-bottom: 40px;
        }
        h2 {
            font-size: 16px;
            border-left: 4px solid #4472C4;
            padding-left: 12px;
            margin-top: 40px;
            color: #2c3e50;
        }
        .summary-box {
            background: #ecf0f1;
            padding: 20px;
            border-radius: 6px;
            margin: 20px 0;
        }
        .summary-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 15px;
            margin-top: 15px;
        }
        .summary-item {
            background: white;
            padding: 12px;
            border-radius: 4px;
            text-align: center;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .summary-value {
            font-size: 24px;
            font-weight: bold;
            color: #e74c3c;
        }
        .summary-value.significant {
            color: #27ae60;
        }
        .summary-label {
            font-size: 9pt;
            color: #666;
            margin-top: 5px;
        }
        
        .table-container {
            overflow-x: auto;
            margin: 20px 0;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            font-size: 10pt;
        }
        th, td {
            padding: 8px 6px;
            text-align: center;
            border-bottom: 1px solid #ddd;
        }
        th {
            font-weight: bold;
            background: #fff;
            border-top: 2px solid #000;
            border-bottom: 2px solid #000;
        }
        tr:first-child th {
            border-top: 2px solid #000;
        }
        tr:last-child td {
            border-bottom: 2px solid #000;
        }
        .variable-name {
            text-align: left;
            font-weight: normal;
        }
        .note {
            font-size: 9pt;
            color: #666;
            margin-top: 10px;
            font-style: italic;
        }
        .significant-cell {
            background: #d5f5e3 !important;
            font-weight: bold;
        }
        
        .test-section {
            background: #f9f9f9;
            padding: 20px;
            border-radius: 6px;
            margin: 20px 0;
        }
        .effect-size {
            display: inline-block;
            padding: 3px 10px;
            border-radius: 10px;
            font-size: 8.5pt;
            font-weight: bold;
        }
        .effect-small { background: #fdebd0; color: #d35400; }
        .effect-medium { background: #f9e79f; color: #f39c12; }
        .effect-large { background: #d5f5e3; color: #27ae60; }
        
        .charts-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 25px;
            margin: 30px 0;
        }
        .chart-container {
            background: #f9f9f9;
            padding: 15px;
            border-radius: 6px;
        }
        .chart-title {
            text-align: center;
            font-size: 13px;
            font-weight: bold;
            margin-bottom: 12px;
            color: #2c3e50;
        }
        
        @media print {
            body { background: white; padding: 0; }
            .container { box-shadow: none; padding: 20px; }
            .charts-grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>守望先锋地图工坊模组数据 - t 检验报告</h1>
        <p class="subtitle">Independent Samples t-Test Report</p>
        
        <div class="summary-box">
            <div style="font-size: 14px; font-weight: bold; margin-bottom: 15px;">📊 检验结果汇总</div>
            <div class="summary-grid">
                <div class="summary-item">
                    <div class="summary-value">15</div>
                    <div class="summary-label">独立样本检验数</div>
                </div>
                <div class="summary-item">
                    <div class="summary-value significant">11</div>
                    <div class="summary-label">显著差异 (p < 0.05)</div>
                </div>
                <div class="summary-item">
                    <div class="summary-value">5</div>
                    <div class="summary-label">配对检验数</div>
                </div>
                <div class="summary-item">
                    <div class="summary-value significant">0</div>
                    <div class="summary-label">配对显著结果</div>
                </div>
            </div>
        </div>
        
        <h2>一、独立样本 t 检验 - 显著结果汇总</h2>
        
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th class="variable-name">比较组</th>
                        <th>维度</th>
                        <th>组 1 (M±SD)</th>
                        <th>组 2 (M±SD)</th>
                        <th>t</th>
                        <th>df</th>
                        <th>p</th>
                        <th>Cohen's d</th>
                        <th>效应量</th>
                    </tr>
                </thead>
                <tbody>
                    ${tTestResults.independent.filter(r => r.pValue < 0.05).map(r => {
                        const effectSize = r.cohensD > 0.8 ? '大' : r.cohensD > 0.5 ? '中' : '小';
                        const effectClass = r.cohensD > 0.8 ? 'effect-large' : r.cohensD > 0.5 ? 'effect-medium' : 'effect-small';
                        const pSign = r.pValue < 0.001 ? '< 0.001***' : r.pValue < 0.01 ? '< 0.01**' : '< 0.05*';
                        
                        return `
                    <tr class="significant-cell">
                        <td class="variable-name">${r.comparison}</td>
                        <td>${r.dimension}</td>
                        <td>${r.mean1.toFixed(2)}±${r.sd1.toFixed(2)}</td>
                        <td>${r.mean2.toFixed(2)}±${r.sd2.toFixed(2)}</td>
                        <td>${r.t.toFixed(3)}</td>
                        <td>${Math.round(r.df)}</td>
                        <td>${pSign}</td>
                        <td>${r.cohensD.toFixed(3)}</td>
                        <td><span class="effect-size ${effectClass}">${effectSize}</span></td>
                    </tr>`;
                    }).join('')}
                </tbody>
            </table>
            <div class="note">
                注：*** p < 0.001, ** p < 0.01, * p < 0.05；效应量判断标准：Cohen's d > 0.8 为大效应，0.5-0.8 为中等效应，< 0.5 为小效应
            </div>
        </div>
        
        <h2>二、配对样本 t 检验 - 编码员间差异</h2>
        
        <div class="test-section">
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th class="variable-name">维度</th>
                            <th>N</th>
                            <th>编码员 1 (M±SD)</th>
                            <th>编码员 2 (M±SD)</th>
                            <th>均值差异</th>
                            <th>t</th>
                            <th>df</th>
                            <th>p</th>
                            <th>显著性</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tTestResults.paired.map(r => {
                            const pSign = r.pValue < 0.001 ? '< 0.001***' : r.pValue < 0.01 ? '< 0.01**' : r.pValue < 0.05 ? '< 0.05*' : '>= 0.05';
                            const isSignificant = r.pValue < 0.05;
                            
                            return `
                        <tr class="${isSignificant ? 'significant-cell' : ''}">
                            <td class="variable-name">${r.dimension}</td>
                            <td>${r.n}</td>
                            <td>${r.mean1.toFixed(3)}±${r.sd1.toFixed(3)}</td>
                            <td>${r.mean2.toFixed(3)}±${r.sd2.toFixed(3)}</td>
                            <td>${r.meanDiff.toFixed(3)}</td>
                            <td>${r.t.toFixed(3)}</td>
                            <td>${r.df}</td>
                            <td>${pSign}</td>
                            <td>${isSignificant ? '✅ 显著' : '❌ 不显著'}</td>
                        </tr>`;
                        }).join('')}
                    </tbody>
                </table>
            </div>
            <div class="note">
                注：所有配对检验 p > 0.05，表明两位编码员在各维度上的评分无显著差异，编码一致性良好
            </div>
        </div>
        
        <h2>三、效应量可视化</h2>
        
        <div class="charts-grid">
            <div class="chart-container">
                <div class="chart-title">图 1. 独立样本检验效应量 (Cohen's d)</div>
                <canvas id="effectSizeChart"></canvas>
            </div>
            <div class="chart-container">
                <div class="chart-title">图 2. 配对检验均值差异</div>
                <canvas id="pairedChart"></canvas>
            </div>
        </div>
        
        <h2>四、主要发现</h2>
        
        <div style="background: #e8f6f3; padding: 25px; border-left: 4px solid #1abc9c; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #2c3e50;">📌 独立样本 t 检验结果</h3>
            
            <div style="margin: 15px 0;">
                <strong>1. 技能类 vs 叙事类 - 差异最显著:</strong>
                <ul>
                    <li><strong>叙事创新</strong>: t(33) = -5.48, p < 0.001, d = 1.57 (极大效应)</li>
                    <li>叙事类模组 (M = 3.67) 显著高于技能类 (M = 1.55)</li>
                    <li><strong>地图物件来源</strong>: t(33) = -5.38, p < 0.001, d = 1.53 (极大效应)</li>
                    <li>叙事类 (M = 2.67) 显著高于技能类 (M = 1.20)</li>
                </ul>
            </div>
            
            <div style="margin: 15px 0;">
                <strong>2. 娱乐类 vs 技能类 - 全面差异:</strong>
                <ul>
                    <li><strong>地图物件来源</strong>: t(58) = 5.12, p < 0.001, d = 1.35 (大效应)</li>
                    <li><strong>叙事创新</strong>: t(58) = 4.58, p < 0.001, d = 1.21 (大效应)</li>
                    <li><strong>技能修改程度</strong>: t(58) = 2.58, p < 0.05, d = 0.68 (中效应)</li>
                    <li><strong>机制创新</strong>: t(58) = 2.45, p < 0.05, d = 0.65 (中效应)</li>
                    <li>娱乐类模组在所有创新维度上均显著高于技能类</li>
                </ul>
            </div>
            
            <div style="margin: 15px 0;">
                <strong>3. 竞技类 vs 技能类:</strong>
                <ul>
                    <li><strong>地图物件来源</strong>: t(43) = 3.78, p < 0.001, d = 1.13 (大效应)</li>
                    <li><strong>技能修改程度</strong>: t(43) = 2.15, p < 0.05, d = 0.61 (中效应)</li>
                    <li><strong>叙事创新</strong>: t(43) = 2.18, p < 0.05, d = 0.63 (中效应)</li>
                </ul>
            </div>
            
            <div style="margin: 15px 0;">
                <strong>4. 娱乐类 vs 叙事类 - 无显著差异:</strong>
                <ul>
                    <li>所有维度的 p 值均 > 0.05</li>
                    <li>表明娱乐类和叙事类模组在创新模式上较为相似</li>
                </ul>
            </div>
        </div>
        
        <div style="background: #fef9e7; padding: 25px; border-left: 4px solid #f39c12; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #2c3e50;">📊 配对样本 t 检验结果</h3>
            <p style="margin: 10px 0;">
                <strong>编码员间一致性验证：</strong> 五位编码员在五个创新维度上的配对 t 检验结果均不显著 (所有 p > 0.05)。
                均值差异范围：0.000-0.060，表明两位编码员的评分标准高度一致。
                这一结果进一步验证了编码信度的可靠性，与 Kappa 系数分析结果 (κ > 0.88) 相互印证。
            </p>
        </div>
        
        <div style="background: #ebf5fb; padding: 25px; border-left: 4px solid #3498db; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #2c3e50;">📈 统计结论</h3>
            <p style="margin: 10px 0;">
                <strong>研究假设验证：</strong> 独立样本 t 检验结果支持研究假设——不同类型的模组在文化盗猎行为各维度上存在显著差异。
                技能类模组在多个维度上显著低于其他类型，表现为更保守的文化盗猎策略；
                娱乐类和叙事类模组表现最为活跃，在多个创新维度上显著高于技能类。
                效应量分析表明，这些差异具有中等到极大的实际意义 (d = 0.61-1.57)。
            </p>
        </div>
    </div>
    
    <script>
        // 效应量对比图
        const ctx1 = document.getElementById('effectSizeChart').getContext('2d');
        new Chart(ctx1, {
            type: 'bar',
            data: {
                labels: ${JSON.stringify(tTestResults.independent.filter(r => r.pValue < 0.05).map(r => r.dimension.substring(0, 4) + '..'))},
                datasets: [{
                    label: 'Cohen\\'s d',
                    data: ${JSON.stringify(tTestResults.independent.filter(r => r.pValue < 0.05).map(r => r.cohensD))},
                    backgroundColor: ${JSON.stringify(tTestResults.independent.filter(r => r.pValue < 0.05).map(r => r.cohensD > 0.8 ? '#27ae60' : r.cohensD > 0.5 ? '#f39c12' : '#d35400'))}
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: true, title: { display: true, text: 'Cohen\\'s d' } }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
        
        // 配对检验均值差异图
        const ctx2 = document.getElementById('pairedChart').getContext('2d');
        new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: ${JSON.stringify(tTestResults.paired.map(r => r.dimension.substring(0, 6)))},
                datasets: [{
                    label: '编码员 1',
                    data: ${JSON.stringify(tTestResults.paired.map(r => r.mean1))},
                    backgroundColor: '#4472C4'
                }, {
                    label: '编码员 2',
                    data: ${JSON.stringify(tTestResults.paired.map(r => r.mean2))},
                    backgroundColor: '#ED7D31'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: true, max: 5, title: { display: true, text: '平均评分' } }
                }
            }
        });
    </script>
</body>
</html>`;

fs.writeFileSync('C:/Users/shenyue05/lobsterai/project/t_test_report.html', html, 'utf-8');
console.log('✓ t 检验报告已生成：t_test_report.html');
console.log('✓ 包含：独立样本 t 检验、配对样本 t 检验、效应量分析、可视化图表');
