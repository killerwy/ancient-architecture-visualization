// 初始化图表实例（雷达图、树状图，ID与HTML严格对应）
const radarChart = echarts.init(document.getElementById('radarChart'));
const treeChart = echarts.init(document.getElementById('treeChart'));

// 加载建筑著作JSON数据
fetch('data/works-data.json')
  .then(res => res.json())
  .then(data => {
    renderRadarChart(data.work_radar); // 渲染雷达图
    renderTreeChart(data.work_tree); // 渲染树状图
    renderWorksCard(data.work_card); // 渲染著作卡片
  })
  .catch(err => console.error('著作数据加载失败：', err));

// 渲染建筑著作核心内容雷达图
function renderRadarChart(radarData) {
  const option = {
    title: { text: '古代建筑著作核心内容雷达图', left: 'center' },
    tooltip: { trigger: 'item' },
    legend: { bottom: 0 },
    radar: { // 雷达图维度
      indicator: [
        { name: '建筑规范', max: 10 },
        { name: '工艺技术', max: 10 },
        { name: '美学设计', max: 10 },
        { name: '地域建筑', max: 10 },
        { name: '材料运用', max: 10 }
      ]
    },
    series: [{ // 雷达图数据
      type: 'radar',
      data: radarData.map(item => ({
        name: item.著作名称,
        value: [item.建筑规范, item.工艺技术, item.美学设计, item.地域建筑, item.材料运用]
      }))
    }]
  };
  radarChart.setOption(option);
}

// 渲染建筑著作知识点树状图
function renderTreeChart(treeData) {
  const option = {
    title: { text: '建筑著作知识点树状图', left: 'center' },
    tooltip: { trigger: 'item' },
    series: [{
      type: 'tree', // 树状图类型
      data: [{ name: '建筑著作', children: formatTree(treeData) }],
      layout: 'radial', // 径向布局
      symbolSize: 8 // 节点大小
    }]
  };
  treeChart.setOption(option);
}

// 树状图数据格式化（一级/二级知识点分层）
function formatTree(treeData) {
  const map = {};
  treeData.forEach(item => {
    if (!map[item.一级知识点]) map[item.一级知识点] = { name: item.一级知识点, children: [] };
    map[item.一级知识点].children.push({ name: item.二级知识点 });
  });
  return Object.values(map);
}

// 渲染建筑著作卡片
function renderWorksCard(worksList) {
  const box = document.getElementById('worksCard');
  // 遍历生成卡片
  worksList.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${item.著作名称}</h3>
      <p>作者：${item.作者}</p>
      <p>年代：${item.成书年代}</p>
      <p>摘要：${item.著作摘要.slice(0,50)}...</p>
    `;
    box.appendChild(card);
  });
}

// 窗口自适应：雷达图、树状图调整大小
window.addEventListener('resize', () => {
  radarChart.resize();
  treeChart.resize();
});