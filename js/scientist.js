// 初始化时间轴图表实例（绑定HTML容器）
const timelineChart = echarts.init(document.getElementById('timelineChart'));

// 中国古代朝代时间轴数据（标准公元纪年，负数=公元前）
const DYNASTY_PERIODS = [
  { name: '春秋', start: -770, end: -476, color: 'rgba(255, 248, 225, 0.3)' },
  { name: '战国', start: -475, end: -221, color: 'rgba(255, 242, 204, 0.3)' },
  { name: '秦朝', start: -221, end: -207, color: 'rgba(255, 224, 153, 0.3)' },
  { name: '西汉', start: -202, end: 8, color: 'rgba(230, 240, 255, 0.3)' },
  { name: '新朝', start: 8, end: 23, color: 'rgba(210, 230, 255, 0.3)' },
  { name: '东汉', start: 25, end: 220, color: 'rgba(190, 220, 255, 0.3)' },
  { name: '三国', start: 220, end: 280, color: 'rgba(204, 255, 226, 0.3)' },
  { name: '西晋', start: 266, end: 316, color: 'rgba(179, 255, 209, 0.3)' },
  { name: '东晋', start: 317, end: 420, color: 'rgba(153, 255, 191, 0.3)' },
  { name: '南北朝', start: 420, end: 589, color: 'rgba(255, 204, 221, 0.3)' },
  { name: '隋朝', start: 581, end: 618, color: 'rgba(204, 255, 255, 0.3)' },
  { name: '唐朝', start: 618, end: 907, color: 'rgba(255, 214, 204, 0.3)' },
  { name: '五代', start: 907, end: 979, color: 'rgba(255, 191, 179, 0.3)' },
  { name: '北宋', start: 960, end: 1127, color: 'rgba(221, 204, 255, 0.3)' },
  { name: '南宋', start: 1127, end: 1279, color: 'rgba(204, 189, 255, 0.3)' },
  { name: '元朝', start: 1271, end: 1368, color: 'rgba(255, 249, 204, 0.3)' },
  { name: '明朝', start: 1368, end: 1644, color: 'rgba(204, 251, 255, 0.3)' },
  { name: '清朝', start: 1636, end: 1912, color: 'rgba(236, 230, 255, 0.3)' }
];

// 加载科学家JSON数据，成功后渲染图表和卡片
fetch('data/scientist-data.json')
  .then(res => res.json())
  .then(data => {
    renderBoxPlot(data.scientist_timeline || []); // 渲染盒须图
    renderScientistCards(data.scientist_detail || []); // 渲染科学家卡片
  })
  .catch(err => console.error('科学家数据加载失败：', err));

// 渲染盒须图（科学家生卒年份分布）+ 朝代背景
function renderBoxPlot(timelineData) {
  if (!timelineData.length) return;

  // 格式化盒须图数据：[min, Q1, median, Q3, max]
  const boxData = timelineData.map(item => {
    const birth = Number(item.birth);
    const death = Number(item.death);
    const median = Math.round((birth + death) / 2);
    return [birth, birth, median, death, death];
  });

  // 格式化朝代背景数据（文字垂直居中左侧，避免重叠）
  const markAreaData = DYNASTY_PERIODS.map(dynasty => [
    { yAxis: dynasty.start },
    { 
      yAxis: dynasty.end,
      itemStyle: { color: dynasty.color },
      label: {
        position: 'inside', // 文字在背景块内
        formatter: dynasty.name,
        fontSize: 9,
        color: '#333',
        padding: [0, 5, 0, 5]
      }
    }
  ]);

  // 盒须图配置项
  const option = {
    title: {
      text: '古代建筑科学家 生卒年份分布（盒须图）',
      left: 'center',
      textStyle: { color: '#9c2c1a', fontSize: 18 }
    },
    tooltip: { // 提示框：显示科学家详细信息
      trigger: 'item',
      padding: 10,
      formatter: (params) => {
        const scientist = timelineData[params.dataIndex];
        const formatYear = (year) => year < 0 ? `公元前${Math.abs(year)}年` : `${year}年`;
        return `
          <strong>${scientist.name}</strong><br/>
          出生：${formatYear(scientist.birth)}<br/>
          逝世：${formatYear(scientist.death)}<br/>
          寿命：${scientist.death - scientist.birth} 年
        `;
      }
    },
    grid: { left: '12%', right: '5%', bottom: '18%', top: '10%' }, // 左侧加宽容纳朝代文字
    xAxis: { // X轴：科学家姓名
      type: 'category',
      data: timelineData.map(item => item.name),
      axisLabel: { rotate: 45, color: '#333', fontSize: 11 }
    },
    yAxis: { // Y轴：年份
      type: 'value',
      name: '年份',
      min: -202,
      max: 2000,
      nameTextStyle: { color: '#333' },
      axisLabel: {
        formatter: (year) => year < 0 ? `前${Math.abs(year)}` : year,
        color: '#333'
      }
    },
    series: [ // 盒须图系列
      {
        type: 'boxplot',
        data: boxData,
        boxWidth: 22,
        itemStyle: { color: '#9c2c1a', borderColor: '#b3422a' },
        emphasis: { itemStyle: { color: '#7a1e0f' } },
        markArea: { data: markAreaData } // 朝代背景
      }
    ]
  };

  timelineChart.setOption(option);
}

// 渲染科学家信息卡片
function renderScientistCards(detailData) {
  const box = document.getElementById('scientistCard');
  if (!box || !detailData.length) {
    box.innerHTML = '<p style="width:100%;text-align:center;color:#9c2c1a;">暂无科学家数据</p>';
    return;
  }

  // 遍历数据生成卡片
  detailData.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${item.姓名}</h3>
      <p>生卒：${item.出生年份} - ${item.逝世年份}</p>
      <p>地域：${item.地域}</p>
      <p>成就：${(item.完整介绍 || '暂无介绍').slice(0, 60)}...</p>
    `;
    box.appendChild(card);
  });
}

// 窗口大小变化时，图表自适应
window.addEventListener('resize', () => timelineChart.resize());