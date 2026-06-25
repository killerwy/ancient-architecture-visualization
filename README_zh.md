# 中国古代建筑可视化平台

> 一款交互式数据可视化平台，探索中国古代建筑的成就与发展历史。

[English](./README.md) | [中文](./README_zh.md)

![GitHub stars](https://img.shields.io/github/stars/killerwy/ancient-architecture-visualization?style=for-the-badge&logo=github)
![GitHub forks](https://img.shields.io/github/forks/killerwy/ancient-architecture-visualization?style=for-the-badge&logo=github)
![GitHub issues](https://img.shields.io/github/issues/killerwy/ancient-architecture-visualization?style=for-the-badge&logo=github)
![Last commit](https://img.shields.io/github/last-commit/killerwy/ancient-architecture-visualization?style=for-the-badge&logo=github)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/css-%23663399.svg?style=for-the-badge&logo=css&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB.svg?style=for-the-badge&logo=python&logoColor=white)

## 📑 目录

- [项目介绍](#-项目介绍)
- [核心功能](#-核心功能)
- [适用场景](#-适用场景)
- [技术栈](#-技术栈)
- [快速开始](#-快速开始)
- [数据处理](#-数据处理)
- [项目结构](#-项目结构)
- [许可证](#-许可证)

## 📝 项目介绍

本项目是一个基于Web的中国古代建筑数据可视化平台，致力于展现中国古代建筑的结构特色与文化价值。通过将历史建筑数据转化为直观的可视化形式，帮助学生、研究人员和历史爱好者理解中国古代建筑技艺的发展脉络、工程成就及文化内涵。

## ✨ 核心功能

- **🏛️ 多维度专题页面** — 打造专属专题页面，覆盖建筑工程成就、文化背景、重要匠师、经典建筑著作等多个维度。
- **📊 结构化数据存储** — 依托专属数据目录，将结构化数据集直接对接可视化层，保障数据流转高效可控。
- **🐍 Python 驱动的数据处理流程** — 内置Python脚本目录，提供数据清洗、格式转换、加工处理能力，满足前端可视化的数据需求。
- **🎨 静态网页呈现** — 基于原生HTML、CSS、JavaScript开发，支持静态部署，可在任意浏览器中高效加载运行。

## 🎯 适用场景

- 制作关于中国工程技术史、建筑史的交互式教学展项或学术演示文稿；
- 作为轻量化静态数据可视化项目的模板，快速搭建本地化的可视化应用；
- 为研究古代建筑形制、著名匠师的人员提供自主学习工具。

## 🔧 技术栈

- 编程语言：C、C++
- 库：ECharts、Pandas
- 数据库：Excel

## ⚡ 快速开始

### 1. 克隆代码仓库

```bash
git clone https://github.com/killerwy/ancient-architecture-visualization.git
cd ancient-architecture-visualization
```

### 2. 启动本地静态服务器

在项目根目录下选择以下任一方式启动：

#### 方式A：Python 内置服务器
```bash
# Python 3 版本
python -m http.server 8080

# Python 2 版本
python -m SimpleHTTPServer 8080
```

#### 方式B：VS Code Live Server 插件
安装 Live Server 插件后，右键点击 `index.html` 文件 → 选择「Open with Live Server」。

#### 方式C：Node.js 服务器
```bash
npm install -g http-server
http-server -p 8080
```

### 3. 访问项目

打开浏览器，访问地址：http://localhost:8080

## 💻 数据处理

### 1. 安装依赖包

```bash
pip install pandas openpyxl
```

### 2. 运行数据处理脚本

```bash
python py/data-processing.py
```

脚本运行成功后会输出提示信息，表明 JSON 格式的数据文件已更新完成。

## 📁 项目结构

```
architecture-visualization/
├── index.html              # 项目首页
├── achievement.html        # 建筑成就可视化页面
├── scientist.html          # 古代著名匠师与学者可视化页面
├── works.html              # 建筑著作可视化页面
├── culture.html            # 建筑文化传承可视化页面
├── css/
│   └── style.css           # 全局统一样式（包含响应式布局规则）
├── js/
│   ├── achievement.js      # 成就页面图表渲染与交互逻辑
│   ├── scientist.js        # 匠师页面图表渲染与交互逻辑
│   ├── works.js            # 著作页面图表渲染与交互逻辑
│   └── culture.js          # 文化页面图表渲染与交互逻辑
├── data/
│   ├── architecture-data.xlsx  # 原始主数据表（多工作表结构化存储）
│   ├── achievement-data.json   # 建筑成就模块格式化数据
│   ├── scientist-data.json     # 匠师模块格式化数据
│   ├── works-data.json         # 建筑著作模块格式化数据
│   └── culture-data.json       # 文化传承模块格式化数据
├── py/
│   ├── data-processing.py      # 自动化数据解析与转换Python脚本
│   └── requirements.txt        # Python运行环境依赖清单
├── image/                      # 静态图片资源
│   ├── gugong.jpg
│   ├── changcheng.jpg
│   └── suzhouyuanlin.jpg
├── README.md                    # 英文项目说明文档
├── README_zh.md                 # 中文项目说明文档
├── LICENSE                      # 项目开源许可证文件
└── .gitignore                   # Git 版本控制忽略文件配置
```

## 📜 许可证

本项目基于 **MIT** 许可证开源。

---
*本README由 [ReadmeBuddy](https://readmebuddy.com) 倾情生成 ❤️*
