// 初始化图表实例（词云、网络、饼图）
const wordCloudChart = echarts.init(document.getElementById('wordCloudChart'));
const networkChart = echarts.init(document.getElementById('networkChart'));
const regionPieCharts = []; // 存储5个地域饼图实例

// 加载文化传承JSON数据
fetch('data/culture-data.json')
  .then(res => res.json())
  .then(data => {
    renderRegionPies(data.region_culture_pie || []); // 渲染地域饼图
    renderWordCloud(data.culture_wordcloud || []); // 渲染词云图
    renderNetwork(data.culture_network || []); // 渲染网络图
    renderConclusion(); // 渲染传承结语
  })
  .catch(err => console.error('数据加载失败：', err));

// 渲染5个地域建筑类型饼图（防文字省略、防遮挡）
function renderRegionPies(pieData) {
  if (!pieData.length) return;
  const container = document.getElementById('pieChartsContainer');
  container.innerHTML = ''; // 清空容器

  const top5Regions = pieData.slice(0, 5); // 取前5个地域
  
  // 遍历生成每个地域的饼图
  top5Regions.forEach((regionItem, index) => {
    const chartDiv = document.createElement('div');
    chartDiv.className = 'region-pie-chart';
    chartDiv.id = `regionPie${index}`;
    container.appendChild(chartDiv);

    const pieChart = echarts.init(chartDiv);
    regionPieCharts.push(pieChart); // 存入数组，用于自适应

    // 格式化建筑类型数据（过滤值为0的项）
    const buildingTypeData = [
      { name: '宫殿建筑', value: regionItem.宫殿建筑占比 || 0 },
      { name: '民居建筑', value: regionItem.民居建筑占比 || 0 },
      { name: '桥梁建筑', value: regionItem.桥梁建筑占比 || 0 },
      { name: '园林建筑', value: regionItem.园林建筑占比 || 0 }
    ].filter(item => item.value > 0);

    // 饼图配置项（修复文字省略、防遮挡）
    const option = {
      title: { 
        text: `${regionItem.地域}建筑类型占比`, 
        left: 'center', 
        textStyle: { fontSize: 15 } 
      },
      tooltip: { trigger: 'item', formatter: '{b}：{d}%' },
      series: [{
        name: '占比',
        type: 'pie',
        radius: ['20%', '60%'],
        avoidLabelOverlap: true,
        label: { // 文字配置：换行、固定宽度
          show: true,
          fontSize: 12,
          overflow: 'break',
          width: 50,
          lineHeight: 13,
          position: 'outer'
        },
        labelLine: { show: true, length: 10, length2: 5 },
        data: buildingTypeData
      }]
    };
    pieChart.setOption(option);
  });
}

// 渲染建筑文化元素词云图
function renderWordCloud(wordData) {
  if (!wordData.length) return;
  const option = {
    title: { text: '建筑文化元素词云', left: 'center' },
    series: [{
      type: 'wordCloud', // 词云类型
      shape: 'circle', // 词云形状
      sizeRange: [12, 50], // 文字大小范围
      rotationRange: [0, 0], // 文字无旋转
      data: wordData.map(item => ({ name: item.文化元素关键词, value: item.出现频率 }))
    }]
  };
  wordCloudChart.setOption(option);
}

// 渲染建筑文化元素关联网络图
function renderNetwork(networkData) {
  if (!networkData.length) return;
  const nodes = []; // 节点数组
  const links = []; // 连线数组
  const nodeSet = new Set(); // 去重节点

  // 格式化节点和连线数据
  networkData.forEach(item => {
    const source = item.源节点;
    const target = item.目标节点;
    if (source && target) {
      links.push({ source, target });
      nodeSet.add(source);
      nodeSet.add(target);
    }
  });

  // 转换为节点数组
  nodeSet.forEach(name => nodes.push({ name }));

  // 网络图配置项
  const option = {
    title: { text: '建筑文化元素关联网络', left: 'center' },
    tooltip: {},
    series: [{
      type: 'graph', // 网络/关系图类型
      layout: 'force', // 力导向布局
      symbolSize: 30, // 节点大小
      roam: true, // 允许拖拽/缩放
      label: { show: true, fontSize: 12 },
      force: { repulsion: 200 }, // 节点排斥力
      nodes: nodes,
      links: links
    }]
  };
  networkChart.setOption(option);
}

// 渲染文化传承结语
function renderConclusion() {
  const box = document.getElementById('cultureConclusion');
  if (!box) return;
  const conclusion = `中国古建筑文化历经千年积淀，榫卯、斗拱等工艺凝结先人的智慧，天人合一的理念融入每一方砖瓦。从北方恢弘宫殿到江南精巧园林，各地建筑形制虽异，却同载中庸和谐的文化内核，成为中华民族薪火相传的珍贵遗产。`;
  box.innerHTML = `<p class="conclusion-text">${conclusion.trim()}</p>`;
}

// 窗口自适应：所有图表随窗口大小调整
window.addEventListener('resize', () => {
  regionPieCharts.forEach(chart => chart.resize());
  wordCloudChart.resize();
  networkChart.resize();
});