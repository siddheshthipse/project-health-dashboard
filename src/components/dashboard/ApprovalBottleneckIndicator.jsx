import React from 'react';
import { Menu, Transition, MenuButton, MenuItem, MenuItems, Dialog } from '@headlessui/react';
import { XMarkIcon, CalendarIcon, FunnelIcon, ChevronRightIcon, ChevronDownIcon, ChevronUpIcon, ArrowsPointingOutIcon, ArrowsPointingInIcon } from '@heroicons/react/20/solid';
import { useState, Fragment, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';

const ApprovalBottleneckIndicator = () => {
    // Mock data - would come from your MongoDB data in a real application
    const bottleneckData = {
        stakeholders: ['John Smith', 'Sarah Williams', 'Michael Chen', 'Priya Sharma', 'Robert Taylor'],
        level1Delays: [1.2, 0.5, 0.8, 4.2, 2.1],
        level2Delays: [0.7, 1.8, 5.2, 2.6, 0.3],
        level3Delays: [0.4, 3.2, 1.5, 0, 1.9]
    };

    // Calculate total delays for each stakeholder
    const totalDelays = bottleneckData.stakeholders.map((_, index) => {
        return (
            bottleneckData.level1Delays[index] +
            bottleneckData.level2Delays[index] +
            bottleneckData.level3Delays[index]
        );
    });

    // Find maximum total delay for sorting
    const maxDelay = Math.max(...totalDelays);
    const criticalThreshold = 10;
    const warningThreshold = 5;

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
                data: bottleneckData.level1Delays
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
                data: bottleneckData.level2Delays
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
                data: bottleneckData.level3Delays
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
                        formatter: 'Warning (5 days)',
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
                        formatter: 'Critical (10 days)',
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
                    <div className="text-xs text-gray-500 flex items-center">
                        <span>MEDIUM PRIORITY</span>
                    </div>
                </div>
                <div className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded flex items-center">
                    Warning
                </div>
            </div>

            <div className="mb-4">
                <div className="flex justify-between items-end">
                    <div className="text-sm text-gray-700">
                        Stakeholder approval delays by level
                    </div>
                    <div className="text-sm font-medium text-gray-700">
                        3 bottlenecks identified
                    </div>
                </div>
                {/* <div className="text-sm text-gray-500 mt-1">
                    Formula: Number of days signoff is delayed by stakeholder
                </div> */}
            </div>

            <div className="h-64">
                <ReactECharts
                    option={option}
                    style={{ height: '100%', width: '100%' }}
                    opts={{ renderer: 'canvas' }}
                />
            </div>

            <div className="mt-3 pt-3 border-t flex justify-between items-center text-xs">
                <div className="flex flex-wrap gap-4">
                    <div className="flex items-center text-gray-500">
                        <div className="w-2 h-2 rounded-full bg-yellow-500 mr-1"></div>
                        <span>Warning &gt;5 days</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                        <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
                        <span>Critical &gt;10 days</span>
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