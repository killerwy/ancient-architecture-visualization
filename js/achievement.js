// 初始化图表实例（折线图、地图）
const lineChart = echarts.init(document.getElementById('lineChart'));
const mapChart = echarts.init(document.getElementById('mapChart'));

// 加载建筑成就JSON数据（带容错处理）
fetch('data/achievement-data.json')
  .then(res => res.json())
  .then(data => {
    renderLineChart(data.dynasty_architecture_line || []); // 渲染折线图
    renderMapChart(data.province_heatmap || []); // 渲染地图热力图
    renderCoreBuilding(data.core_buildings || []); // 渲染核心建筑卡片
  })
  .catch(err => {
    console.error('建筑数据加载失败：', err);
    // 数据加载失败时显示提示
    document.getElementById('coreBuildingCard').innerHTML = '<p style="width:100%;text-align:center;">数据加载异常</p>';
  });

// 渲染折线图：各朝代建筑数量趋势
function renderLineChart(dynastyData) {
  if (!dynastyData.length) return;
  
  const option = {
    title: { text: '各朝代四类建筑数量变化趋势', left: 'center' },
    tooltip: { trigger: 'axis' }, // 坐标轴触发提示
    legend: { data: ['民居', '官府', '皇宫', '桥梁'], bottom: 0 },
    grid: { left: '3%', right: '4%', bottom: '10%', containLabel: true },
    xAxis: { // X轴：朝代
      type: 'category',
      data: dynastyData.map(item => item['朝代 / 时期'])
    },
    yAxis: { type: 'value' }, // Y轴：建筑数量
    series: [ // 四类建筑折线数据
      { name: '民居', type: 'line', data: dynastyData.map(i => i.民居), itemStyle: { color: '#9c2c1a' } },
      { name: '官府', type: 'line', data: dynastyData.map(i => i.官府), itemStyle: { color: '#b3422a' } },
      { name: '皇宫', type: 'line', data: dynastyData.map(i => i.皇宫), itemStyle: { color: '#d46b4f' } },
      { name: '桥梁', type: 'line', data: dynastyData.map(i => i.桥梁), itemStyle: { color: '#e89976' } }
    ]
  };
  lineChart.setOption(option);
}

// 渲染中国地图热力图（兼容新版地图，修复regions报错）
function renderMapChart(provinceData) {
  if (!provinceData.length) return;

  // 格式化地图数据
  const mapData = provinceData.map(item => ({
    name: item.省份名称,
    value: item.建筑数量 || 0
  }));

  const option = {
    title: { text: '全国古建筑数量热力分布', left: 'center' },
    tooltip: { trigger: 'item' },
    visualMap: { // 视觉映射（热力颜色）
      min: 0,
      max: 80,
      left: 'left',
      bottom: '5%',
      text: ['高', '低'],
      calculable: true,
      inRange: { color: ['#f2c8b8', '#d46b4f', '#9c2c1a'] }
    },
    geo: { // 地理坐标系（中国地图）
      map: 'china',
      roam: false,
      itemStyle: { borderColor: '#fff', borderWidth: 1 },
      emphasis: { itemStyle: { color: '#ffcc00' } }
    },
    series: [{ // 地图系列数据
      type: 'map',
      geoIndex: 0,
      data: mapData,
      label: { show: true }
    }]
  };
  
  // 安全设置地图配置（捕获可能的报错）
  try {
    mapChart.setOption(option);
  } catch (e) {
    console.error('地图渲染失败：', e);
  }
}

// 渲染核心建筑卡片（独立运行，不依赖地图）
function renderCoreBuilding(buildings) {
  const box = document.getElementById('coreBuildingCard');
  if (!box || !buildings.length) {
    box.innerHTML = '<p style="width:100%;text-align:center;color:#666;">暂无核心建筑数据</p>';
    return;
  }

  // 遍历生成核心建筑卡片
  buildings.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${item.建筑名称}</h3>
      <p>省份：${item.省份}</p>
      <p>类型：${item.建筑类型}</p>
      <p>建成：${item.建成年份}</p>
      <p>详情：${(item.详情描述 || '暂无描述').slice(0, 50)}...</p>
    `;
    box.appendChild(card);
  });
}

// 窗口自适应：折线图、地图调整大小
window.addEventListener('resize', () => {
  lineChart.resize();
  mapChart.resize();
});