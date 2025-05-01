import React from 'react';
import { Menu, Transition, MenuButton, MenuItem, MenuItems, Dialog } from '@headlessui/react';
import { XMarkIcon, CalendarIcon, FunnelIcon, ChevronRightIcon, ChevronDownIcon, ChevronUpIcon, ArrowsPointingOutIcon, ArrowsPointingInIcon } from '@heroicons/react/20/solid';
import { useState, Fragment, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';

const ApprovalCycleEfficiency = () => {
    // Mock data - would come from your MongoDB data in a real application
    const approvalData = {
        levels: ['Level 1 Approval', 'Level 2 Approval', 'Level 3 Approval', 'Level 4 Approval'],
        times: [2.5, 3.8, 2.1, 1.2],
        total: 9.6
    };

    // Determine status based on thresholds
    let status = 'bg-green-100 text-green-800';
    let statusText = 'On Track';

    if (approvalData.total > 7) {
        status = 'bg-red-100 text-red-800';
        statusText = 'Critical';
    } else if (approvalData.total > 3) {
        status = 'bg-yellow-100 text-yellow-800';
        statusText = 'Warning';
    }

    // ECharts option configuration
    const option = {
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} days'
        },
        color: ['#93c5fd', '#a78bfa', '#f9a8d4', '#8e44ad'],
        series: [
            {
                name: 'Approval Time',
                type: 'funnel',
                sort: 'none',
                left: '10%',
                top: 0,
                bottom: 0,
                width: '80%',
                min: 0,
                max: 10,
                minSize: '20%',
                maxSize: '100%',
                gap: 2,
                label: {
                    show: true,
                    position: 'right',
                    formatter: function (param) {
                        return `${param.name}: ${param.value} days`;
                    }
                },
                labelLine: {
                    length: 20,
                    lineStyle: {
                        width: 1,
                        type: 'solid'
                    }
                },
                itemStyle: {
                    borderColor: '#fff',
                    borderWidth: 1
                },
                emphasis: {
                    label: {
                        fontSize: 14
                    }
                },
                data: [
                    { value: approvalData.times[0], name: approvalData.levels[0] },
                    { value: approvalData.times[1], name: approvalData.levels[1] },
                    { value: approvalData.times[2], name: approvalData.levels[2] },
                    { value: approvalData.times[3], name: approvalData.levels[3] }
                ]
            }
        ]
    };

    return (
        <div className="bg-white rounded-lg shadow p-5 border-t-4 border-purple-500">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-medium text-gray-700">Signoff Approval Efficiency</h3>
                    {/* <div className="text-xs text-gray-500 flex items-center">
                        <span>MEDIUM PRIORITY</span>
                    </div> */}
                </div>
                <div className={`${status} text-xs px-2 py-1 rounded flex items-center`}>
                    {statusText}
                </div>
            </div>

            <div className="mb-4">
                <div className="flex justify-between items-end">
                    <div className="text-xl text-gray-800">{approvalData.total} days</div>
                    <div className="text-sm text-gray-500">
                        Avg. approval cycle
                    </div>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                    Average days from submission to final approval
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
                        <span>Warning &gt;3 days</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                        <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
                        <span>Critical &gt;7 days</span>
                    </div>
                </div>
                <a href="#" className="text-blue-600 flex items-center">
                    Details
                </a>
            </div>
        </div>
    );
};

export default ApprovalCycleEfficiency;