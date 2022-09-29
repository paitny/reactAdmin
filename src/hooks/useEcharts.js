import {useEffect, useRef} from 'react';

// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
// 引入柱状图图表，图表后缀都为 Chart
import {BarChart,LineChart,PieChart } from 'echarts/charts';
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent
} from 'echarts/components';
// 标签自动布局，全局过渡动画等特性
import {LabelLayout, UniversalTransition} from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import {CanvasRenderer} from 'echarts/renderers';

// 注册必须的组件
echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    BarChart,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer,
    LineChart,
    PieChart
]);

export function useCylinder() {
    const domRef = useRef()
    useEffect(() => {
        let myChart = echarts.init(domRef.current);
        // 绘制图表
        myChart.setOption({
            title: {
                text: '信息展示'
            },
            tooltip: {},
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            // eslint-disable-next-line
            series: [
                {
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                },
                ,
                {
                    type: 'bar',
                    data: [26, 24, 18, 22, 23, 20]
                }
            ]
        });
    }, [])
    return [domRef]
}

export function useLine() {
    const domRef = useRef()
    useEffect(() => {
        let myChart = echarts.init(domRef.current);
        // 绘制图表
        myChart.setOption({
            xAxis: {
                data: ['A', 'B', 'C', 'D', 'E']
            },
            yAxis: {},
            series: [
                {
                    data: [10, 22, 28, 23, 19],
                    type: 'line',
                    areaStyle: {}
                },
                {
                    data: [25, 14, 23, 35, 10],
                    type: 'line',
                    areaStyle: {
                        color: '#ff0',
                        opacity: 0.5
                    }
                }
            ]
        });
    }, [])
    return [domRef]
}
export function useCake() {
    const domRef = useRef()
    useEffect(() => {
        let myChart = echarts.init(domRef.current);
        // 绘制图表
        myChart.setOption({
            series: [
                {
                    type: 'pie',
                    data: [
                        {
                            value: 100,
                            name: 'A'
                        },
                        {
                            value: 200,
                            name: 'B'
                        },
                        {
                            value: 300,
                            name: 'C'
                        },
                        {
                            value: 400,
                            name: 'D'
                        },
                        {
                            value: 500,
                            name: 'E'
                        }
                    ],
                    roseType: 'area'
                }
            ]
        });
    }, [])
    return [domRef]
}
