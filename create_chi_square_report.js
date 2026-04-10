const fs = require('fs');

const chiSquareResults = {
  tests: [
    {
      name: '类型 vs 技能修改程度',
      chiSquare: 34.960,
      df: 12,
      pValue: 0.0005,
      cramersV: 0.341,
      observed: [
        [6, 16, 4, 9, 5],
        [6, 9, 5, 4, 1],
        [12, 7, 1, 0, 0],
        [2, 2, 1, 9, 1]
      ]
    },
    {
      name: '类型 vs 机制创新',
      chiSquare: 30.869,
      df: 12,
      pValue: 0.002,
      cramersV: 0.321,
      observed: [
        [4, 7, 17, 9, 3],
        [1, 10, 8, 4, 2],
        [6, 9, 2, 2, 1],
        [1, 1, 3, 5, 5]
      ]
    },
    {
      name: '类型 vs 视觉创新',
      chiSquare: 35.226,
      df: 12,
      pValue: 0.0004,
      cramersV: 0.343,
      observed: [
        [8, 10, 14, 8, 0],
        [12, 7, 3, 3, 0],
        [6, 11, 1, 2, 0],
        [0, 4, 7, 2, 2]
      ]
    },
    {
      name: '类型 vs 叙事创新',
      chiSquare: 44.787,
      df: 12,
      pValue: 0.00002,
      cramersV: 0.386,
      observed: [
        [8, 6, 8, 9, 9],
        [13, 3, 4, 3, 2],
        [17, 0, 1, 1, 1],
        [1, 0, 1, 5, 8]
      ]
    },
    {
      name: '类型 vs 地图物件来源',
      chiSquare: 33.045,
      df: 12,
      pValue: 0.001,
      cramersV: 0.332,
      observed: [
        [11, 12, 11, 5, 1],
        [12, 8, 4, 1, 0],
        [16, 4, 0, 0, 0],
        [1, 4, 6, 2, 2]
      ]
    }
  ]
};

const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>卡方检验报告</title>
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
            grid-template-columns: repeat(5, 1fr);
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
            font-size: 20px;
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
            font-size: 10.5pt;
        }
        th, td {
            padding: 10px 8px;
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
        .test-card {
            background: #f9f9f9;
            padding: 20px;
            border-radius: 6px;
            margin: 20px 0;
            border-left: 4px solid #4472C4;
        }
        .test-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }
        .test-title {
            font-size: 14px;
            font-weight: bold;
            color: #2c3e50;
        }
        .test-stats {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 15px;
            margin-top: 15px;
        }
        .stat-box {
            background: white;
            padding: 10px;
            border-radius: 4px;
            text-align: center;
        }
        .stat-value {
            font-size: 18px;
            font-weight: bold;
            color: #4472C4;
        }
        .stat-label {
            font-size: 9pt;
            color: #666;
            margin-top: 3px;
        }
        .contingency-table {
            margin-top: 15px;
            font-size: 10pt;
        }
        .contingency-table th {
            background: #f5f5f5;
        }
        .effect-size {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 9pt;
            font-weight: bold;
        }
        .effect-small { background: #fdebd0; color: #d35400; }
        .effect-medium { background: #f9e79f; color: #f39c12; }
        .effect-large { background: #d5f5e3; color: #27ae60; }
        
        .charts-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
            margin: 30px 0;
        }
        .chart-container {
            background: #f9f9f9;
            padding: 20px;
            border-radius: 6px;
        }
        .chart-title {
            text-align: center;
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 15px;
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
        <h1>守望先锋地图工坊模组数据 - 卡方检验报告</h1>
        <p class="subtitle">Chi-Square Test Report for Overwatch Map Workshop Mods</p>
        
        <div class="summary-box">
            <div style="font-size: 14px; font-weight: bold; margin-bottom: 15px;">📊 检验结果汇总</div>
            <div class="summary-grid">
                <div class="summary-item">
                    <div class="summary-value">5</div>
                    <div class="summary-label">检验总数</div>
                </div>
                <div class="summary-item">
                    <div class="summary-value significant">5</div>
                    <div class="summary-label">显著结果 (p < 0.05)</div>
                </div>
                <div class="summary-item">
                    <div class="summary-value significant">3</div>
                    <div class="summary-label">极显著 (p < 0.001)</div>
                </div>
                <div class="summary-item">
                    <div class="summary-value">0.345</div>
                    <div class="summary-label">平均 Cramer's V</div>
                </div>
                <div class="summary-item">
                    <div class="summary-value significant">中等效应</div>
                    <div class="summary-label">平均效应量</div>
                </div>
            </div>
        </div>
        
        <h2>一、卡方检验结果总表</h2>
        
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th class="variable-name">检验变量</th>
                        <th>χ²</th>
                        <th>df</th>
                        <th>p 值</th>
                        <th>Cramer's V</th>
                        <th>效应量</th>
                        <th>显著性</th>
                    </tr>
                </thead>
                <tbody>
                    ${chiSquareResults.tests.map(test => {
                        const effectSize = test.cramersV > 0.35 ? '较大' : test.cramersV > 0.25 ? '中等' : '较小';
                        const effectClass = test.cramersV > 0.35 ? 'effect-large' : test.cramersV > 0.25 ? 'effect-medium' : 'effect-small';
                        const pSign = test.pValue < 0.001 ? '< 0.001***' : test.pValue < 0.01 ? '< 0.01**' : test.pValue < 0.05 ? '< 0.05*' : '>= 0.05';
                        const isSignificant = test.pValue < 0.05;
                        
                        return `
                    <tr class="${isSignificant ? 'significant-cell' : ''}">
                        <td class="variable-name">${test.name}</td>
                        <td>${test.chiSquare.toFixed(3)}</td>
                        <td>${test.df}</td>
                        <td>${pSign}</td>
                        <td>${test.cramersV.toFixed(3)}</td>
                        <td><span class="effect-size ${effectClass}">${effectSize}</span></td>
                        <td>${isSignificant ? '✅ 显著' : '❌ 不显著'}</td>
                    </tr>`;
                    }).join('')}
                </tbody>
            </table>
            <div class="note">
                注：*** p < 0.001, ** p < 0.01, * p < 0.05；效应量判断标准：Cramer's V > 0.35 为较大效应，0.25-0.35 为中等效应，< 0.25 为较小效应
            </div>
        </div>
        
        <h2>二、详细检验结果</h2>
        
        ${chiSquareResults.tests.map((test, idx) => {
            const effectSize = test.cramersV > 0.35 ? '较大' : test.cramersV > 0.25 ? '中等' : '较小';
            const effectClass = test.cramersV > 0.35 ? 'effect-large' : test.cramersV > 0.25 ? 'effect-medium' : 'effect-small';
            const pSign = test.pValue < 0.001 ? '< 0.001***' : test.pValue < 0.01 ? '< 0.01**' : test.pValue < 0.05 ? '< 0.05*' : '>= 0.05';
            
            return `
        <div class="test-card">
            <div class="test-header">
                <div class="test-title">检验${idx + 1}: ${test.name}</div>
                <span class="effect-size ${effectClass}">效应量：${effectSize} (V = ${test.cramersV.toFixed(3)})</span>
            </div>
            
            <div class="test-stats">
                <div class="stat-box">
                    <div class="stat-value">${test.chiSquare.toFixed(3)}</div>
                    <div class="stat-label">卡方值 (χ²)</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value">${test.df}</div>
                    <div class="stat-label">自由度 (df)</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" style="color: ${test.pValue < 0.05 ? '#27ae60' : '#666'}">${pSign}</div>
                    <div class="stat-label">p 值</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value">${test.cramersV.toFixed(3)}</div>
                    <div class="stat-label">Cramer's V</div>
                </div>
            </div>
            
            <div class="table-container">
                <table class="contingency-table">
                    <thead>
                        <tr>
                            <th rowspan="2" style="width: 15%;">类型</th>
                            <th colspan="5">创新评分</th>
                            <th rowspan="2">合计</th>
                        </tr>
                        <tr>
                            <th>1</th>
                            <th>2</th>
                            <th>3</th>
                            <th>4</th>
                            <th>5</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${['娱乐', '竞技', '技能', '叙事'].map((type, i) => {
                            const rowSum = test.observed[i].reduce((a, b) => a + b, 0);
                            return `
                        <tr>
                            <td class="variable-name">${type}</td>
                            ${test.observed[i].map(val => `<td>${val}</td>`).join('')}
                            <td><strong>${rowSum}</strong></td>
                        </tr>`;
                        }).join('')}
                        <tr style="font-weight: bold; background: #f5f5f5;">
                            <td class="variable-name">合计</td>
                            ${[0,1,2,3,4].map(j => {
                                const colSum = test.observed.reduce((sum, row) => sum + row[j], 0);
                                return `<td>${colSum}</td>`;
                            }).join('')}
                            <td>100</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>`;
        }).join('')}
        
        <h2>三、效应量可视化</h2>
        
        <div class="charts-grid">
            <div class="chart-container">
                <div class="chart-title">图 1. 各检验 Cramer's V 效应量对比</div>
                <canvas id="effectSizeChart"></canvas>
            </div>
            <div class="chart-container">
                <div class="chart-title">图 2. 卡方值对比</div>
                <canvas id="chiSquareChart"></canvas>
            </div>
        </div>
        
        <h2>四、主要发现与解释</h2>
        
        <div style="background: #e8f6f3; padding: 25px; border-left: 4px solid #1abc9c; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #2c3e50;">📌 核心发现</h3>
            
            <div style="margin: 15px 0;">
                <strong>1. 所有检验均达到显著水平:</strong>
                <ul>
                    <li>5 个卡方检验的 p 值均 < 0.05，表明模组类型与各创新维度之间存在显著关联</li>
                    <li>3 个检验达到 p < 0.001 的极显著水平</li>
                    <li>所有效应量均为中等到较大 (Cramer's V = 0.32-0.39)</li>
                </ul>
            </div>
            
            <div style="margin: 15px 0;">
                <strong>2. 最强的关联：类型 vs 叙事创新 (χ² = 44.79, p < 0.001, V = 0.386)</strong>
                <ul>
                    <li>叙事类模组在叙事创新上得分明显更高 (5 分占比 53.3%)</li>
                    <li>技能类模组在叙事创新上得分最低 (1 分占比 85%)</li>
                    <li>娱乐类模组叙事创新分布较为均匀</li>
                </ul>
            </div>
            
            <div style="margin: 15px 0;">
                <strong>3. 类型 vs 视觉创新 (χ² = 35.23, p < 0.001, V = 0.343)</strong>
                <ul>
                    <li>竞技类模组视觉创新得分偏低 (1-2 分占比 76%)</li>
                    <li>娱乐类模组视觉创新集中在中等水平 (2-3 分占比 60%)</li>
                    <li>叙事类模组视觉创新分布较分散</li>
                </ul>
            </div>
            
            <div style="margin: 15px 0;">
                <strong>4. 类型 vs 技能修改程度 (χ² = 34.96, p < 0.001, V = 0.341)</strong>
                <ul>
                    <li>技能类模组技能修改程度得分最低 (1-2 分占比 95%)</li>
                    <li>娱乐类模组技能修改程度分布最广 (1-5 分均有)</li>
                    <li>叙事类模组在技能修改上呈现两极分化</li>
                </ul>
            </div>
            
            <div style="margin: 15px 0;">
                <strong>5. 类型 vs 机制创新 (χ² = 30.87, p < 0.01, V = 0.321)</strong>
                <ul>
                    <li>娱乐类模组机制创新得分最高 (3-5 分占比 72.5%)</li>
                    <li>技能类模组机制创新得分偏低 (1-2 分占比 75%)</li>
                </ul>
            </div>
            
            <div style="margin: 15px 0;">
                <strong>6. 类型 vs 地图物件来源 (χ² = 33.05, p < 0.01, V = 0.332)</strong>
                <ul>
                    <li>技能类模组主要使用官方素材 (1 分占比 80%)</li>
                    <li>叙事类模组在物件来源上更加多样化</li>
                    <li>娱乐类模组物件来源分布较为均匀</li>
                </ul>
            </div>
        </div>
        
        <div style="background: #fef9e7; padding: 25px; border-left: 4px solid #f39c12; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #2c3e50;">📊 统计结论</h3>
            <p style="margin: 10px 0;">
                <strong>研究假设验证：</strong> 数据分析结果支持研究假设——不同类型的守望先锋地图工坊模组在文化盗猎行为的各个维度上存在显著差异。
                娱乐类和叙事类模组在多个创新维度上表现更为活跃，而技能类模组则更倾向于使用官方素材和保持原有游戏机制。
                这一发现为理解游戏模组社区的文化生产模式提供了实证支持。
            </p>
        </div>
    </div>
    
    <script>
        // 效应量对比图
        const ctx1 = document.getElementById('effectSizeChart').getContext('2d');
        new Chart(ctx1, {
            type: 'bar',
            data: {
                labels: ${JSON.stringify(chiSquareResults.tests.map(t => t.name.split(' vs ')[1]))},
                datasets: [{
                    label: 'Cramer\\'s V',
                    data: ${JSON.stringify(chiSquareResults.tests.map(t => t.cramersV))},
                    backgroundColor: ['#4472C4', '#ED7D31', '#A5A5A5', '#FFC000', '#5B9BD5']
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: true, max: 0.5, title: { display: true, text: '效应量' } }
                },
                plugins: {
                    legend: { display: false },
                    annotation: {
                        annotations: {
                            line1: { type: 'line', yMin: 0.25, yMax: 0.25, borderColor: 'rgba(243, 156, 18, 0.8)', borderWidth: 2, borderDash: [5, 5] },
                            line2: { type: 'line', yMin: 0.35, yMax: 0.35, borderColor: 'rgba(39, 174, 96, 0.8)', borderWidth: 2, borderDash: [5, 5] }
                        }
                    }
                }
            }
        });
        
        // 卡方值对比图
        const ctx2 = document.getElementById('chiSquareChart').getContext('2d');
        new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: ${JSON.stringify(chiSquareResults.tests.map(t => t.name.split(' vs ')[1]))},
                datasets: [{
                    label: '卡方值',
                    data: ${JSON.stringify(chiSquareResults.tests.map(t => t.chiSquare))},
                    backgroundColor: ['#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#3498db']
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: true, title: { display: true, text: 'χ²值' } }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    </script>
</body>
</html>`;

fs.writeFileSync('C:/Users/shenyue05/lobsterai/project/chi_square_report.html', html, 'utf-8');
console.log('✓ 卡方检验报告已生成：chi_square_report.html');
console.log('✓ 包含：5 个检验结果、列联表、效应量分析、可视化图表');
