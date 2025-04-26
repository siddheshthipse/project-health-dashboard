import React from 'react';
import { useState } from 'react';
import ReactECharts from 'echarts-for-react';

const ApprovalBottleneckIndicator = () => {
    // Add state for view mode (total or average)
    const [viewMode, setViewMode] = useState('total');
    
    // Mock data - would come from your MongoDB data in a real application
    const bottleneckData = {
        stakeholders: ['John Smith', 'Sarah Williams', 'Michael Chen', 'Priya Sharma', 'Robert Taylor'],
        level1Delays: [1.2, 0.5, 0.8, 4.2, 2.1],
        level2Delays: [0.7, 1.8, 5.2, 2.6, 0.3],
        level3Delays: [0.4, 3.2, 1.5, 0, 1.9],
        // Mock data for counts (to calculate averages)
        level1Counts: [3, 2, 1, 5, 4],
        level2Counts: [2, 3, 4, 3, 1],
        level3Counts: [1, 4, 2, 0, 2]
    };

    // Calculate average delays
    const avgLevel1Delays = bottleneckData.level1Delays.map((delay, index) => 
        bottleneckData.level1Counts[index] > 0 ? 
        +(delay / bottleneckData.level1Counts[index]).toFixed(1) : 0
    );
    
    const avgLevel2Delays = bottleneckData.level2Delays.map((delay, index) => 
        bottleneckData.level2Counts[index] > 0 ? 
        +(delay / bottleneckData.level2Counts[index]).toFixed(1) : 0
    );
    
    const avgLevel3Delays = bottleneckData.level3Delays.map((delay, index) => 
        bottleneckData.level3Counts[index] > 0 ? 
        +(delay / bottleneckData.level3Counts[index]).toFixed(1) : 0
    );

    // Get the appropriate data based on view mode
    const getDelayData = () => {
        if (viewMode === 'total') {
            return {
                level1: bottleneckData.level1Delays,
                level2: bottleneckData.level2Delays,
                level3: bottleneckData.level3Delays
            };
        } else {
            return {
                level1: avgLevel1Delays,
                level2: avgLevel2Delays,
                level3: avgLevel3Delays
            };
        }
    };

    const delayData = getDelayData();

    // Calculate total delays for each stakeholder based on current view
    const totalDelays = bottleneckData.stakeholders.map((_, index) => {
        if (viewMode === 'total') {
            return (
                bottleneckData.level1Delays[index] +
                bottleneckData.level2Delays[index] +
                bottleneckData.level3Delays[index]
            );
        } else {
            // For average view, sum up the averages
            return (
                avgLevel1Delays[index] +
                avgLevel2Delays[index] +
                avgLevel3Delays[index]
            );
        }
    });

    // Find maximum total delay for sorting
    const maxDelay = Math.max(...totalDelays);
    const criticalThreshold = viewMode === 'total' ? 10 : 3; // Adjust threshold for average view
    const warningThreshold = viewMode === 'total' ? 5 : 1.5; // Adjust threshold for average view

    // ECharts option configuration
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function (params) {
                const stakeholder = params[0].name;
                let total = 0;
                let result = `<div>${stakeholder}</div>`;

                params.forEach(param => {
                    total += param.value;
                    result += `<div style="display:flex;justify-content:space-between;margin-top:4px;">
                      <div>
                        <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${param.color};"></span>
                        ${param.seriesName}:
                      </div>
                      <div style="font-weight:bold;margin-left:20px;">${param.value} days</div>
                    </div>`;
                });

                result += `<div style="margin-top:6px;border-top:1px solid rgba(0,0,0,0.1);padding-top:4px;">
                    <div style="display:flex;justify-content:space-between;">
                      <div>Total:</div>
                      <div style="font-weight:bold;">${total.toFixed(1)} days</div>
                    </div>
                  </div>`;

                return result;
            }
        },
        legend: {
            data: ['Level 1', 'Level 2', 'Level 3'],
            bottom: 0
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '15%',
            top: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            name: 'Days',
            axisLabel: {
                color: '#6b7280'
            },
            splitLine: {
                lineStyle: {
                    color: '#e5e7eb',
                    type: 'dashed'
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#e5e7eb'
                }
            }
        },
        yAxis: {
            type: 'category',
            data: bottleneckData.stakeholders,
            axisLabel: {
                color: '#6b7280'
            },
            axisLine: {
                lineStyle: {
                    color: '#e5e7eb'
                }
            },
            splitLine: {
                show: false
            }
        },
        series: [
            {
                name: 'Level 1',
                type: 'bar',
                stack: 'total',
                itemStyle: {
                    color: '#93c5fd' // Blue
                },
                emphasis: {
                    focus: 'series'
                },
                data: delayData.level1
            },
            {
                name: 'Level 2',
                type: 'bar',
                stack: 'total',
                itemStyle: {
                    color: '#a78bfa' // Purple
                },
                emphasis: {
                    focus: 'series'
                },
                data: delayData.level2
            },
            {
                name: 'Level 3',
                type: 'bar',
                stack: 'total',
                itemStyle: {
                    color: '#f9a8d4' // Pink
                },
                emphasis: {
                    focus: 'series'
                },
                data: delayData.level3
            }
        ],
        markLine: {
            symbol: 'none',
            silent: true,
            data: [
                {
                    xAxis: warningThreshold,
                    lineStyle: {
                        color: '#fbbf24',
                        type: 'dashed'
                    },
                    label: {
                        formatter: `Warning (${warningThreshold} days)`,
                        position: 'insideEndTop',
                        color: '#fbbf24'
                    }
                },
                {
                    xAxis: criticalThreshold,
                    lineStyle: {
                        color: '#ef4444',
                        type: 'dashed'
                    },
                    label: {
                        formatter: `Critical (${criticalThreshold} days)`,
                        position: 'insideEndTop',
                        color: '#ef4444'
                    }
                }
            ]
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-5 border-t-4 border-purple-500">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-medium text-gray-700">Approval Bottleneck Indicator</h3>
                    {/* <div className="text-xs text-gray-500 flex items-center">
                        <span>MEDIUM PRIORITY</span>
                    </div> */}
                </div>
                <div className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded flex items-center">
                    Warning
                </div>
            </div>

            <div className="mb-4">
                <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-700">
                        Stakeholder approval delays by level
                    </div>
                    <div className="flex bg-gray-100 rounded-md p-0.5">
                        <button 
                            className={`text-xs py-1 px-2 rounded-md ${viewMode === 'total' ? 'bg-white shadow-sm' : ''}`}
                            onClick={() => setViewMode('total')}
                        >
                            Total Delay
                        </button>
                        <button 
                            className={`text-xs py-1 px-2 rounded-md ${viewMode === 'average' ? 'bg-white shadow-sm' : ''}`}
                            onClick={() => setViewMode('average')}
                        >
                            Average Delay
                        </button>
                    </div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                    Formula: {viewMode === 'total' ? 
                        "Sum of approval delay days per stakeholder across all levels" : 
                        "Average days of delay per approval at each level"}
                </div>
            </div>

            <div className="h-64">
                <ReactECharts
                    option={option}
                    style={{ height: '100%', width: '100%' }}
                    opts={{ renderer: 'canvas' }}
                    onChartReady={(chart) => {
                        setTimeout(() => {
                            chart.resize();
                        }, 100);
                    }}
                />
            </div>

            <div className="mt-3 pt-3 border-t flex justify-between items-center text-xs">
                <div className="flex flex-wrap gap-4">
                    <div className="flex items-center text-gray-500">
                        <div className="w-2 h-2 rounded-full bg-yellow-500 mr-1"></div>
                        <span>Warning &gt;{warningThreshold} days</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                        <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
                        <span>Critical &gt;{criticalThreshold} days</span>
                    </div>
                </div>
                <a href="#" className="text-blue-600 flex items-center">
                    Details
                </a>
            </div>
        </div>
    );
};

export default ApprovalBottleneckIndicator;