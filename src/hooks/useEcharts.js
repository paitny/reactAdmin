import {useEffect, useRef} from 'react';
import $ from  'jquery'
import {url} from "../api/AxiosURL";
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
    TransformComponent,
    VisualMapComponent
} from 'echarts/components';
// 标签自动布局，全局过渡动画等特性
import {LabelLayout, UniversalTransition} from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import {CanvasRenderer} from 'echarts/renderers';
import { LegendComponent,PolarComponent } from 'echarts/components';
import { Scatter3DChart,Lines3DChart } from 'echarts-gl/charts';
import { GlobeComponent } from 'echarts-gl/components';
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
    PieChart,
    PolarComponent,
    LegendComponent,
    GlobeComponent,
    Scatter3DChart,
    VisualMapComponent,
    Lines3DChart
]);


export function useCylinder() {
    const domRef = useRef()
    useEffect(() => {
        let myChart = echarts.init(domRef.current);
        // 绘制图表
        myChart.setOption({
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {},
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: 'Direct',
                    type: 'bar',
                    emphasis: {
                        focus: 'series'
                    },
                    data: [320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name: 'Email',
                    type: 'bar',
                    stack: 'Ad',
                    emphasis: {
                        focus: 'series'
                    },
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: 'Union Ads',
                    type: 'bar',
                    stack: 'Ad',
                    emphasis: {
                        focus: 'series'
                    },
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: 'Video Ads',
                    type: 'bar',
                    stack: 'Ad',
                    emphasis: {
                        focus: 'series'
                    },
                    data: [150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name: 'Search Engine',
                    type: 'bar',
                    data: [862, 1018, 964, 1026, 1679, 1600, 1570],
                    emphasis: {
                        focus: 'series'
                    },
                    markLine: {
                        lineStyle: {
                            type: 'dashed'
                        },
                        data: [[{ type: 'min' }, { type: 'max' }]]
                    }
                },
                {
                    name: 'Baidu',
                    type: 'bar',
                    barWidth: 5,
                    stack: 'Search Engine',
                    emphasis: {
                        focus: 'series'
                    },
                    data: [620, 732, 701, 734, 1090, 1130, 1120]
                },
                {
                    name: 'Google',
                    type: 'bar',
                    stack: 'Search Engine',
                    emphasis: {
                        focus: 'series'
                    },
                    data: [120, 132, 101, 134, 290, 230, 220]
                },
                {
                    name: 'Bing',
                    type: 'bar',
                    stack: 'Search Engine',
                    emphasis: {
                        focus: 'series'
                    },
                    data: [60, 72, 71, 74, 190, 130, 110]
                },
                {
                    name: 'Others',
                    type: 'bar',
                    stack: 'Search Engine',
                    emphasis: {
                        focus: 'series'
                    },
                    data: [62, 82, 91, 84, 109, 110, 120]
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

export function usePolar() {
    const domRef = useRef()
    useEffect(() => {

        let myChart = echarts.init(domRef.current);
        $.getJSON(url + '/get/paity/json', function (data) {
            var airports = data.airports.map(function (item) {
                return {
                    coord: [item[3], item[4]]
                };
            });
            function getAirportCoord(idx) {
                return [data.airports[idx][3], data.airports[idx][4]];
            }
            // Route: [airlineIndex, sourceAirportIndex, destinationAirportIndex]
            var routesGroupByAirline = {};
            data.routes.forEach(function (route) {
                var airline = data.airlines[route[0]];
                var airlineName = airline[0];
                if (!routesGroupByAirline[airlineName]) {
                    routesGroupByAirline[airlineName] = [];
                }
                routesGroupByAirline[airlineName].push(route);
            });
            var pointsData = [];
            data.routes.forEach(function (airline) {
                pointsData.push(getAirportCoord(airline[1]));
                pointsData.push(getAirportCoord(airline[2]));
            });
            var series = data.airlines
                .map(function (airline) {
                    var airlineName = airline[0];
                    var routes = routesGroupByAirline[airlineName];
                    if (!routes) {
                        return null;
                    }
                    return {
                        type: 'lines3D',
                        name: airlineName,
                        effect: {
                            show: true,
                            trailWidth: 2,
                            trailLength: 0.15,
                            trailOpacity: 1,
                            trailColor: 'rgb(30, 30, 60)'
                        },
                        lineStyle: {
                            width: 1,
                            color: 'rgb(50, 50, 150)',
                            // color: 'rgb(118, 233, 241)',
                            opacity: 0.1
                        },
                        blendMode: 'lighter',
                        data: routes.map(function (item) {
                            return [airports[item[1]].coord, airports[item[2]].coord];
                        })
                    };
                })
                .filter(function (series) {
                    return !!series;
                });
            series.push({
                type: 'scatter3D',
                coordinateSystem: 'globe',
                blendMode: 'lighter',
                symbolSize: 2,
                itemStyle: {
                    color: 'rgb(50, 50, 150)',
                    opacity: 0.2
                },
                data: pointsData
            });
            myChart.setOption({
                legend: {
                    selectedMode: 'single',
                    left: 'left',
                    data: Object.keys(routesGroupByAirline),
                    orient: 'vertical',
                    textStyle: {
                        color: '#fff'
                    }
                },
                globe: {
                    environment: url + '/echartsImg/starfield.jpg',
                    heightTexture: url + '/echartsImg/bathymetry_bw_composite_4k.jpg',
                    displacementScale: 0.1,
                    displacementQuality: 'high',
                    baseColor: '#000',
                    shading: 'realistic',
                    realisticMaterial: {
                        roughness: 0.2,
                        metalness: 0
                    },
                    postEffect: {
                        enable: true,
                        depthOfField: {
                            enable: false,
                            focalDistance: 150
                        }
                    },
                    temporalSuperSampling: {
                        enable: true
                    },
                    light: {
                        ambient: {
                            intensity: 0
                        },
                        main: {
                            intensity: 0.1,
                            shadow: false
                        },
                        ambientCubemap: {
                            texture: url + '/get/paity/hdr/lake.hdr',
                            exposure: 1,
                            diffuseIntensity: 0.5,
                            specularIntensity: 2
                        }
                    },
                    viewControl: {
                        autoRotate: false
                    },
                    silent: true
                },
                series: series
            });
            window.addEventListener('keydown', function () {
                series.forEach(function (series, idx) {
                    myChart.dispatchAction({
                        type: 'lines3DToggleEffect',
                        seriesIndex: idx
                    });
                });
            });
        });
    }, [])

    return [domRef]
}


