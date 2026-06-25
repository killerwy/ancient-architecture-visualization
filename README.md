# ancient-architecture-visualization

> An interactive data visualization platform exploring ancient Chinese architectural achievements and history.

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

## 📑 Table of Contents

- [Description](#-description)
- [Key Features](#-key-features)
- [Use Cases](#-use-cases)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Data Processing](#-data-processing)
- [Project Structure](#-project-structure)
- [License](#-license)

## 📝 Description

ancient-architecture-visualization is a web-based data visualization project dedicated to showcasing the structural and cultural achievements of ancient Chinese architecture. By organizing historical data into intuitive visual formats, the project helps students, researchers, and history enthusiasts comprehend the development, engineering feats, and cultural significance of historical Chinese building techniques.

## ✨ Key Features

- **🏛️ Multi-Dimensional Topic Pages** — Features dedicated web pages focusing on distinct aspects of history, including specific engineering achievements, cultural contexts, key scientists, and architectural works.
- **📊 Structured Data Storage** — Utilizes a dedicated data directory to organize and feed structured datasets directly into the visualization layers.
- **🐍 Python-Driven Data Pipeline** — Includes a python directory containing scripts designed to process, format, or clean historical architectural data for frontend consumption.
- **🎨 Static Web Presentation** — Built using vanilla HTML, CSS, and JavaScript, allowing the application to be hosted statically and load efficiently in any web browser.

## 🎯 Use Cases

- Developing interactive educational exhibits or academic presentations on the history of Chinese engineering and science.
- Using the codebase as a template for building localized, static data visualization projects with lightweight assets.
- Providing self-directed learning tools for individuals researching ancient architectural structures and notable historical builders.

## 🔧 Tech Stack

- Programming Languages: HTML, CSS, JavaScript, Python
- Libraries: ECharts, Pandas
- Database: Excel

## ⚡ Quick Start

1. Clone the repository

```bash

git clone https://github.com/killerwy/ancient-architecture-visualization.git
cd ancient-architecture-visualizatio

```

2. Start Local Static Server

Choose one solution below in the project root directory:
  
Option A: Python Built-in Server

```bash

# Python 3
python -m http.server 8080

# Python 2
python -m SimpleHTTPServer 8080

```

Option B: VS Code Live Server

Install the Live Server plugin, right-click index.html> Open with Live Server.

Option C: Node.js Server

```bash

npm install -g http-server
http-server -p 8080

```

3. Access Project

Open your browser and visit: http://localhost:8080

## 💻 Data Processing

1. Install Dependencies

```bash

pip install pandas openpyxl

```

2. Run

```bash

python data-processing.py

```

The success message means JSON data files are updated.

## 📁 Project Structure

```
architecture-visualization/
├── index.html              # Project Homepage
├── achievement.html        # Architectural Achievements Visualization Page
├── scientist.html          # Eminent Ancient Architects & Scholars Visualization Page
├── works.html              # Architectural Literature Visualization Page
├── culture.html            # Architectural Culture Inheritance Visualization Page
├── css/
│   └── style.css           # Global unified styles (including responsive layout rules)
├── js/
│   ├── achievement.js      # Chart rendering & interaction logic for Achievements page
│   ├── scientist.js        # Chart rendering & interaction logic for Scholars page
│   ├── works.js            # Chart rendering & interaction logic for Literature page
│   └── culture.js          # Chart rendering & interaction logic for Culture page
├── data/
│   ├── architecture-data.xlsx  # Raw master data table (structured with multiple worksheets)
│   ├── achievement-data.json   # Formatted data for Architectural Achievements module
│   ├── scientist-data.json     # Formatted data for Scholars module
│   ├── works-data.json         # Formatted data for Architectural Literature module
│   └── culture-data.json       # Formatted data for Culture Inheritance module
├── py/
│   └── data-processing.py      # Automated Python script for data parsing & conversion
├── image/                      # Static image assets
│   ├── gugong.jpg
│   ├── changcheng.jpg
│   └── suzhouyuanlin.jpg
├── README.md                    # English project documentation
├── README_zh.md                 # Chinese project documentation
├── LICENSE                      # Open-source license file for the project
└── .gitignore                   # Git version control ignore configuration file
```

## 📜 License

This project is licensed under the **MIT** License.

---
*This README was generated with ❤️ by [ReadmeBuddy](https://readmebuddy.com)*
