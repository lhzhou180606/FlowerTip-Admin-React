import * as echarts from 'echarts';
import { useEffect } from 'react';
import { generateUUID } from "@/utils/tool";
import { settingStore } from '@/store/index';
import { useSnapshot } from 'valtio'
const BarChart = (props: {
  chartOption: {
    xAxisData: string[];
    unit?: string;
    data: number[];
  }
}) => {
  const uuid = generateUUID() + "PieChart";

  const xAxisData = props.chartOption.xAxisData;
  const unit = props.chartOption.unit;
  const data = props.chartOption.data;

  let myChart: echarts.ECharts;

  let sidebarMenuNode: HTMLDivElement;

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: "item",
      formatter: "{b}：{c}人",
    },
    xAxis: {
      type: "category",
      data: xAxisData || [],
    },
    yAxis: {
      name: unit ? `单位(${unit})` : "",
      type: "value",
    },
    series: [
      {
        type: "bar",
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
        },
        label: {
          show: false,
          position: "center",
        },
        labelLine: {
          show: false,
        },
        data: data || [],
      },
    ],
  };
  const sStore = useSnapshot(settingStore);
  const theme = sStore.globalSet.modelAlgorithm == 'dark' ? 'dark' : 'default';
  useEffect(() => {
    console.log(theme, 'cehishhsh');
    // 销毁当前图表实例
    if (myChart != null && myChart.dispose) {
      myChart.dispose();
    }
    myChart = echarts.init(document.getElementById(uuid), theme);
    myChart.setOption(option);
    window.addEventListener("resize", () => {
      myChart.resize()
    });
    sidebarMenuNode = document.getElementsByClassName(
      "sidebar"
    )[0] as HTMLDivElement;
    sidebarMenuNode &&
      sidebarMenuNode.addEventListener("transitionend", () => {
        myChart.resize()
      });
  }, [theme])

  return (
    <div id={uuid} style={{ width: '100%', height: '100%' }}></div>
  )
}

export default BarChart;