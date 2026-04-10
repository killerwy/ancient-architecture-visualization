import pandas as pd
import json
import os

# ===================== 1. 基础配置 =====================
# Excel文件路径（与py程序同目录）
EXCEL_PATH = "../data/architecture-data.xlsx"
# 输出JSON文件名称
OUTPUT_FILES = {
    "achievement": "../data/achievement-data.json",
    "scientist": "../data/scientist-data.json",
    "works": "../data/works-data.json",
    "culture": "../data/culture-data.json"
}

# ===================== 2. 读取Excel所有工作表 =====================
def read_excel_data(excel_path):
    """读取Excel中所有数据表，返回字典格式"""
    excel_file = pd.ExcelFile(excel_path)
    data = {}
    for sheet_name in excel_file.sheet_names:
        df = pd.read_excel(excel_path, sheet_name=sheet_name)
        # 空值处理
        df = df.fillna("")
        data[sheet_name] = df.to_dict(orient="records")
    return data

# ===================== 3. 数据处理：建筑成就模块 =====================
def process_achievement(data):
    """处理建筑成就数据：朝代折线图、省份热力图、核心建筑"""
    achievement = {
        # 朝代-建筑数量折线图数据
        "dynasty_architecture_line": data["各类建筑数量数据表"],
        # 省份建筑热力图数据
        "province_heatmap": data["省份建筑热力图数据"],
        # 核心建筑标注点（经纬度+详情）
        "core_buildings": data["核心建筑标注点数据"]
    }
    return achievement

# ===================== 4. 数据处理：科学家模块 =====================
def process_scientist(data):
    """处理建筑科学家数据：时间轴、详情卡片"""
    scientist = {
        # 科学家时间轴数据（生卒年+地域）
        "scientist_timeline": [
            {
                "name": item["姓名"],
                "birth": int(item["出生年份"]) if item["出生年份"] else "",
                "death": int(item["逝世年份"]) if item["逝世年份"] else "",
                "region": item["地域"]
            } for item in data["中国古代建筑科学家数据表"]
        ],
        # 科学家详细介绍卡片
        "scientist_detail": data["中国古代建筑科学家数据表"]
    }
    return scientist

# ===================== 5. 数据处理：建筑著作模块 =====================
def process_works(data):
    """处理建筑著作数据：雷达图、树状图、摘要卡片"""
    works = {
        # 著作核心内容雷达图数据
        "work_radar": data["著作核心内容雷达图数据"],
        # 著作核心知识点径向树状图数据
        "work_tree": data["著作核心知识点径向树状图数据"],
        # 著作摘要卡片
        "work_card": data["著作摘要卡片"]
    }
    return works

# ===================== 6. 数据处理：文化传承模块 =====================
def process_culture(data):
    """处理建筑文化数据：饼图、词云、关联网络"""
    culture = {
        # 地域-建筑文化饼图数据
        "region_culture_pie": data["地域 - 建筑文化饼图数据"],
        # 建筑文化元素词云数据
        "culture_wordcloud": data["建筑文化元素词云图数据"],
        # 文化元素关联网络图数据
        "culture_network": data["建筑文化元素关联网络图数据"]
    }
    return culture

# ===================== 7. 导出JSON文件 =====================
def save_to_json(data, filename):
    """将数据保存为JSON文件，格式化输出"""
    with open(filename, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
    print(f"✅ 已生成：{filename}")

# ===================== 主程序执行 =====================
if __name__ == "__main__":
    # 1. 读取Excel数据
    print("🔍 正在读取Excel数据...")
    excel_data = read_excel_data(EXCEL_PATH)
    
    # 2. 分模块处理数据
    achievement_data = process_achievement(excel_data)
    scientist_data = process_scientist(excel_data)
    works_data = process_works(excel_data)
    culture_data = process_culture(excel_data)
    
    # 3. 导出4个JSON文件
    save_to_json(achievement_data, OUTPUT_FILES["achievement"])
    save_to_json(scientist_data, OUTPUT_FILES["scientist"])
    save_to_json(works_data, OUTPUT_FILES["works"])
    save_to_json(culture_data, OUTPUT_FILES["culture"])
    
    print("\n🎉 所有数据处理完成，4个JSON文件已生成！")
