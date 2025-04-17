import React from 'react';
import { Menu, Transition, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { CalendarIcon, FunnelIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import { useState, Fragment } from 'react';
import ReactECharts from 'echarts-for-react';

// On-Time Delivery Rate component
const OnTimeDeliveryRate = () => {
    // Mock data - in a real application, this would come from your MongoDB data
    const deliveryRateData = {
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        onTimeRate: [88, 92, 87, 84, 77, 82],
        totalTasks: [45, 52, 48, 56, 62, 58],
        completedOnTime: [40, 48, 42, 47, 48, 48]
    };

    // Calculate current on-time rate
    const currentRate = deliveryRateData.onTimeRate[deliveryRateData.onTimeRate.length - 1];

    // Determine status based on thresholds
    let status = 'bg-green-100 text-green-800';
    let statusText = 'On Track';

    if (currentRate < 70) {
        status = 'bg-red-100 text-red-800';
        statusText = 'Critical';
    } else if (currentRate < 85) {
        status = 'bg-yellow-100 text-yellow-800';
        statusText = 'Warning';
    }

    // ECharts option configuration
    const option = {
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                const onTimeRate = params[0].value;
                const totalTasks = deliveryRateData.totalTasks[params[0].dataIndex];
                const completedOnTime = deliveryRateData.completedOnTime[params[0].dataIndex];

                return `${params[0].axisValue}<br/>
          <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#3b82f6;"></span>
          On-Time Rate: ${onTimeRate}%<br/>
          <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#10b981;"></span>
          Completed On-Time: ${completedOnTime}<br/>
          <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#6b7280;"></span>
          Total Tasks: ${totalTasks}`;
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: '15%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: deliveryRateData.months,
            axisLine: {
                lineStyle: {
                    color: '#e5e7eb'
                }
            },
            axisLabel: {
                color: '#6b7280'
            }
        },
        yAxis: [
            {
                type: 'value',
                name: 'Rate (%)',
                min: 50,
                max: 100,
                interval: 10,
                axisLine: {
                    show: false
                },
                axisLabel: {
                    color: '#6b7280',
                    formatter: '{value}%'
                },
                splitLine: {
                    lineStyle: {
                        color: '#e5e7eb',
                        type: 'dashed'
                    }
                }
            },
            {
                type: 'value',
                name: 'Tasks',
                show: false
            }
        ],
        series: [
            {
                name: 'On-Time Rate',
                type: 'line',
                smooth: true,
                lineStyle: {
                    width: 3,
                    color: '#3b82f6'
                },
                symbol: 'circle',
                symbolSize: 6,
                itemStyle: {
                    color: '#3b82f6'
                },
                data: deliveryRateData.onTimeRate
            },
            {
                name: 'Tasks',
                type: 'bar',
                yAxisIndex: 1,
                stack: 'Tasks',
                barWidth: '30%',
                itemStyle: {
                    color: '#10b981'
                },
                z: 2,
                data: deliveryRateData.completedOnTime
            },
            {
                name: 'Delayed Tasks',
                type: 'bar',
                yAxisIndex: 1,
                stack: 'Tasks',
                barWidth: '30%',
                itemStyle: {
                    color: '#d1d5db'
                },
                data: deliveryRateData.totalTasks.map((total, index) =>
                    total - deliveryRateData.completedOnTime[index]
                )
            }
        ],
        // Add warning threshold line
        markLine: {
            silent: true,
            lineStyle: {
                color: '#fbbf24'
            },
            data: [
                {
                    yAxis: 85,
                    name: 'Warning',
                    label: {
                        formatter: 'Warning (85%)',
                        position: 'middle',
                        color: '#fbbf24'
                    }
                }
            ]
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-5 border-t-4 border-blue-500">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-medium text-gray-700">On-Time Delivery Rate</h3>
                    <div className="text-xs text-gray-500 flex items-center">
                        <span>HIGH PRIORITY</span>
                    </div>
                </div>
                <div className={`${status} text-xs px-2 py-1 rounded flex items-center`}>
                    {statusText}
                </div>
            </div>

            <div className="mb-4">
                <div className="flex justify-between items-end">
                    <div className="text-3xl font-bold text-gray-800">{currentRate}%</div>
                    <div className="text-sm text-gray-500">
                        {deliveryRateData.completedOnTime[deliveryRateData.completedOnTime.length - 1]} /
                        {deliveryRateData.totalTasks[deliveryRateData.totalTasks.length - 1]} tasks on time
                    </div>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                    (Tasks completed by planned end date / Total completed tasks) × 100
                </div>
            </div>

            <div className="h-64">
                <ReactECharts
                    option={option}
                    style={{ height: '100%', width: '100%' }}
                    opts={{ renderer: 'canvas' }}
                />
            </div>

            <div className="mt-3 pt-3 border-t flex justify-between items-center text-xs">
                <div className="flex items-center text-gray-500">
                    <div className="w-2 h-2 rounded-full bg-yellow-500 mr-1"></div>
                    <span>10 tasks completed late this month</span>
                </div>
                <a href="#" className="text-blue-600 flex items-center">
                    Details
                </a>
            </div>
        </div>
    );
};

// Approval Cycle Efficiency component
const ApprovalCycleEfficiency = () => {
    // Mock data - would come from your MongoDB data in a real application
    const approvalData = {
        levels: ['Level 1 Approval', 'Level 2 Approval', 'Level 3 Approval', 'Final Approval'],
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
        color: ['#60a5fa', '#818cf8', '#a78bfa', '#c084fc'],
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
                    <div className="text-xs text-gray-500 flex items-center">
                        <span>MEDIUM PRIORITY</span>
                    </div>
                </div>
                <div className={`${status} text-xs px-2 py-1 rounded flex items-center`}>
                    {statusText}
                </div>
            </div>

            <div className="mb-4">
                <div className="flex justify-between items-end">
                    <div className="text-3xl font-bold text-gray-800">{approvalData.total} days</div>
                    <div className="text-sm text-gray-500">
                        Avg. approval cycle
                    </div>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                    Formula: Average days from submission to final approval
                </div>
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


const ProjectHealthDashboard = () => {
    const [headerExpanded, setHeaderExpanded] = useState(true);

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            {/* Header */}
            {headerExpanded && (
                <header className="bg-indigo-700 text-white p-4 shadow-md">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            {/* <img
                                src="https://planner.ktern.com/assets/images/ktern.PNG"
                                alt="KTERN Logo"
                                className="h-8"
                            /> */}
                            <h3 className="text-xl font-semibold ml-3">Project Health Navigator</h3>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <button className="flex items-center space-x-2 bg-indigo-800 px-3 py-1 rounded">
                                    <span>GNXD84</span>
                                </button>
                            </div>
                            <div className="inline-flex overflow-hidden relative justify-center items-center w-8 h-8 bg-indigo-600 rounded-full ring-2 ring-white">
                                <span className="font-medium text-xs text-white">CS</span>
                            </div>
                        </div>
                    </div>
                </header>
            )}

            {/* Project Info Banner */}
            <div className="bg-white border-b p-4 flex justify-between items-center">
                <div className="flex items-center space-x-6">
                    <div>
                        <span className="text-gray-500 text-sm">Project</span>
                        <h2 className="font-semibold">Motiva Quantum Leap</h2>
                    </div>
                    <div>
                        <span className="text-gray-500 text-sm block">Current Phase</span>
                        <Menu as="div" className="relative inline-block text-left mt-1">
                            <div>
                                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded bg-blue-100 px-3 py-1.5 text-sm font-medium text-blue-800 hover:bg-blue-200">
                                    Wave 2 - HSSE 1/2
                                    <ChevronDownIcon className="-mr-1 h-5 w-5 text-blue-700" aria-hidden="true" />
                                </Menu.Button>
                            </div>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                                    <div className="py-1">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a href="#" className={`${active ? 'bg-blue-50 text-blue-900' : 'text-gray-700'} block px-4 py-2 text-sm`}>
                                                    Wave 0 - Global Prepare
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a href="#" className={`${active ? 'bg-blue-50 text-blue-900' : 'text-gray-700'} block px-4 py-2 text-sm`}>
                                                    Wave 1 - PTP 1/2
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a href="#" className={`${active ? 'bg-blue-50 text-blue-900' : 'text-gray-700'} block px-4 py-2 text-sm font-medium`}>
                                                    Wave 2 - HSSE 1/2
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a href="#" className={`${active ? 'bg-blue-50 text-blue-900' : 'text-gray-700'} block px-4 py-2 text-sm`}>
                                                    Wave 3 - S/4 Core
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a href="#" className={`${active ? 'bg-blue-50 text-blue-900' : 'text-gray-700'} block px-4 py-2 text-sm`}>
                                                    Wave 4 - SAC Planning
                                                </a>
                                            )}
                                        </Menu.Item>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                    <div>
                        <span className="text-gray-500 text-sm">Next Milestone in</span>
                        <div className="font-semibold flex items-center space-x-1">
                            <span>16 days</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    {/* <div className="flex items-center space-x-2 border px-3 py-1 rounded">
                        <CalendarIcon className="h-4 w-4" />
                        <span>Last 30 Days</span>
                        <ChevronDownIcon className="h-4 w-4" />
                    </div>
                    <button className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded">
                        <FunnelIcon className="h-4 w-4" />
                        <span>Filters</span>
                    </button> */}
                    <button
                        className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded"
                        onClick={() => setHeaderExpanded(!headerExpanded)}
                    >
                        {headerExpanded ? (
                            <>
                                <ChevronUpIcon className="h-4 w-4" />
                                <span>Collapse</span>
                            </>
                        ) : (
                            <>
                                <ChevronDownIcon className="h-4 w-4" />
                                <span>Expand</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 overflow-auto">
                {/* Executive Overview Section */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700 flex items-center">
                        Executive Overview
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Go-Live Risk Index */}
                        <div className="bg-white rounded-lg shadow p-5 border-t-4 border-red-500">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-medium text-gray-700">Go-Live Risk Index</h3>
                                    <div className="text-xs text-gray-500 flex items-center">
                                        <span>HIGH PRIORITY</span>
                                    </div>
                                </div>
                                <div className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded flex items-center">
                                    At Risk
                                </div>
                            </div>

                            {/* Simplified gauge */}
                            <div className="flex justify-center mb-2">
                                <div className="w-32 h-32 rounded-full border-8 border-red-500 flex items-center justify-center">
                                    <span className="text-3xl font-bold text-gray-800">45%</span>
                                </div>
                            </div>

                            <div className="flex justify-between text-xs text-gray-500">
                                <span>Critical (0%)</span>
                                <span>Good (100%)</span>
                            </div>

                            <div className="mt-4 text-sm">
                                <div className="flex justify-between items-center text-gray-600">
                                    <span>Previous Period</span>
                                    <span className="font-medium">62%</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-600">
                                    <span>Change</span>
                                    <span className="text-red-600 font-medium">-17%</span>
                                </div>
                            </div>

                            <div className="mt-3 pt-3 border-t flex justify-between items-center text-xs">
                                <div className="flex items-center text-gray-500">
                                    <span>5 Critical Path Tasks Delayed</span>
                                </div>
                                <a href="#" className="text-blue-600 flex items-center">
                                    Details
                                </a>
                            </div>
                        </div>

                        {/* Schedule Performance Index */}
                        <div className="bg-white rounded-lg shadow p-5 border-t-4 border-yellow-500">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-medium text-gray-700">Schedule Performance Index</h3>
                                    <div className="text-xs text-gray-500 flex items-center">
                                        <span>HIGH PRIORITY</span>
                                    </div>
                                </div>
                                <div className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded flex items-center">
                                    Warning
                                </div>
                            </div>

                            {/* Simplified gauge */}
                            <div className="flex justify-center mb-2">
                                <div className="w-32 h-32 rounded-full border-8 border-yellow-500 flex items-center justify-center">
                                    <span className="text-3xl font-bold text-gray-800">0.89</span>
                                </div>
                            </div>

                            <div className="flex justify-between text-xs text-gray-500">
                                <span>&lt;0.8</span>
                                <span>1.0</span>
                                <span>&gt;1.2</span>
                            </div>

                            <div className="mt-4 text-sm">
                                <div className="flex justify-between items-center text-gray-600">
                                    <span>Previous Period</span>
                                    <span className="font-medium">0.92</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-600">
                                    <span>Change</span>
                                    <span className="text-red-600 font-medium">-0.03</span>
                                </div>
                            </div>

                            <div className="mt-3 pt-3 border-t flex justify-between items-center text-xs">
                                <div className="flex items-center text-gray-500">
                                    <span>18 tasks behind schedule</span>
                                </div>
                                <a href="#" className="text-blue-600 flex items-center">
                                    Details
                                </a>
                            </div>
                        </div>

                        {/* Milestone Adherence Rate */}
                        <div className="bg-white rounded-lg shadow p-5 border-t-4 border-orange-500">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-medium text-gray-700">Milestone Adherence Rate</h3>
                                    <div className="text-xs text-gray-500 flex items-center">
                                        <span>HIGH PRIORITY</span>
                                    </div>
                                </div>
                                <div className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded flex items-center">
                                    At Risk
                                </div>
                            </div>

                            {/* Simplified progress circle */}
                            <div className="flex justify-center mb-2">
                                <div className="w-32 h-32 rounded-full border-8 border-orange-500 flex flex-col items-center justify-center">
                                    <span className="text-3xl font-bold text-gray-800">68%</span>
                                    <span className="text-sm text-gray-500">On-time</span>
                                </div>
                            </div>

                            <div className="flex justify-between text-xs text-gray-500">
                                <span>Threshold: 80%</span>
                            </div>

                            <div className="mt-4 text-sm">
                                <div className="flex justify-between items-center text-gray-600">
                                    <span>Completed Milestones</span>
                                    <span className="font-medium">17/25</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-600">
                                    <span>Next Milestone</span>
                                    <span className="font-medium text-orange-600">UAT Completion</span>
                                </div>
                            </div>

                            <div className="mt-3 pt-3 border-t flex justify-between items-center text-xs">
                                <div className="flex items-center text-gray-500">
                                    <span>3 Milestones at risk</span>
                                </div>
                                <a href="#" className="text-blue-600 flex items-center">
                                    Details
                                </a>
                            </div>
                        </div>

                        {/* Resource Capacity Gap */}
                        <div className="bg-white rounded-lg shadow p-5 border-t-4 border-purple-500">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-medium text-gray-700">Resource Capacity Gap</h3>
                                    <div className="text-xs text-gray-500 flex items-center">
                                        <span>MEDIUM PRIORITY</span>
                                    </div>
                                </div>
                                <div className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded flex items-center">
                                    Critical
                                </div>
                            </div>

                            {/* Heat Map Visualization (simplified) */}
                            <div className="flex flex-col space-y-2 mb-2">
                                <div className="flex items-center">
                                    <span className="text-xs w-24 truncate">Ashok M.</span>
                                    <div className="flex-1 flex space-x-0.5">
                                        <div className="h-6 w-full bg-red-600 rounded-sm"></div>
                                        <div className="h-6 w-full bg-red-500 rounded-sm"></div>
                                        <div className="h-6 w-full bg-red-400 rounded-sm"></div>
                                        <div className="h-6 w-full bg-yellow-400 rounded-sm"></div>
                                    </div>
                                    <span className="text-xs w-10 text-right font-medium text-red-600">142%</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-xs w-24 truncate">Gotham A.</span>
                                    <div className="flex-1 flex space-x-0.5">
                                        <div className="h-6 w-full bg-red-500 rounded-sm"></div>
                                        <div className="h-6 w-full bg-orange-400 rounded-sm"></div>
                                        <div className="h-6 w-full bg-yellow-400 rounded-sm"></div>
                                        <div className="h-6 w-full bg-green-400 rounded-sm"></div>
                                    </div>
                                    <span className="text-xs w-10 text-right font-medium text-orange-600">118%</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-xs w-24 truncate">Nivedha V.</span>
                                    <div className="flex-1 flex space-x-0.5">
                                        <div className="h-6 w-full bg-orange-400 rounded-sm"></div>
                                        <div className="h-6 w-full bg-yellow-400 rounded-sm"></div>
                                        <div className="h-6 w-full bg-green-400 rounded-sm"></div>
                                        <div className="h-6 w-full bg-green-400 rounded-sm"></div>
                                    </div>
                                    <span className="text-xs w-10 text-right font-medium text-yellow-600">96%</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-xs w-24 truncate">Hrithik S.</span>
                                    <div className="flex-1 flex space-x-0.5">
                                        <div className="h-6 w-full bg-yellow-400 rounded-sm"></div>
                                        <div className="h-6 w-full bg-green-400 rounded-sm"></div>
                                        <div className="h-6 w-full bg-green-400 rounded-sm"></div>
                                        <div className="h-6 w-full bg-green-400 rounded-sm"></div>
                                    </div>
                                    <span className="text-xs w-10 text-right font-medium text-green-600">84%</span>
                                </div>
                            </div>

                            <div className="flex justify-between text-xs text-gray-500 mt-2">
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-green-400 mr-1"></div>
                                    <span>&lt;85%</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-yellow-400 mr-1"></div>
                                    <span>85-100%</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-orange-400 mr-1"></div>
                                    <span>100-120%</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-red-500 mr-1"></div>
                                    <span>&gt;120%</span>
                                </div>
                            </div>

                            <div className="mt-3 pt-3 border-t flex justify-between items-center text-xs">
                                <div className="flex items-center text-gray-500">
                                    <span>4 overallocated resources</span>
                                </div>
                                <a href="#" className="text-blue-600 flex items-center">
                                    Details
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Timeline & Critical Path Section */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700">
                        Timeline & Critical Path
                    </h2>
                    <div className="bg-white rounded-lg shadow p-5">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-medium text-gray-700">Milestone Timeline & Critical Path Status</h3>
                                <div className="text-xs text-gray-500">Schedule visualization with critical path tasks highlighted</div>
                            </div>
                            <div className="flex space-x-2">
                                <button className="text-xs px-2 py-1 rounded border border-gray-300 bg-white">Week</button>
                                <button className="text-xs px-2 py-1 rounded border border-gray-300 bg-gray-100">Month</button>
                                <button className="text-xs px-2 py-1 rounded border border-gray-300 bg-white">Quarter</button>
                            </div>
                        </div>

                        {/* Simplified Timeline Visualization */}
                        <div className="border rounded-lg p-4 my-4">
                            <div className="flex border-b pb-2 mb-4">
                                <div className="w-1/6 text-xs text-gray-500">Task</div>
                                <div className="w-5/6 flex">
                                    <div className="flex-1 text-xs text-center">Apr</div>
                                    <div className="flex-1 text-xs text-center">May</div>
                                    <div className="flex-1 text-xs text-center">Jun</div>
                                    <div className="flex-1 text-xs text-center">Jul</div>
                                    <div className="flex-1 text-xs text-center">Aug</div>
                                    <div className="flex-1 text-xs text-center">Sep</div>
                                </div>
                            </div>

                            <div className="flex items-center mb-4">
                                <div className="w-1/6 text-xs">Wave 2 Go-Live</div>
                                <div className="w-5/6 relative h-6">
                                    <div className="absolute left-[60%] top-0 h-6 w-1 bg-blue-500"></div>
                                    <div className="absolute left-[75%] top-0 h-6 w-1 bg-red-500"></div>
                                    <div className="absolute top-3 left-[60%] w-[15%] h-0.5 bg-red-500"></div>
                                    <div className="absolute top-6 left-[65%] text-xs text-red-600">+15 days</div>
                                </div>
                            </div>

                            <div className="flex items-center mb-4">
                                <div className="w-1/6 text-xs">UAT Completion</div>
                                <div className="w-5/6 relative h-6">
                                    <div className="absolute left-[45%] top-0 w-[25%] h-6 bg-orange-400"></div>
                                    <div className="absolute left-[45%] top-0 w-[10%] h-6 bg-green-500"></div>
                                </div>
                            </div>

                            <div className="flex items-center mb-4">
                                <div className="w-1/6 text-xs">Data Migration</div>
                                <div className="w-5/6 relative h-6">
                                    <div className="absolute left-[50%] top-0 w-[30%] h-6 bg-yellow-400"></div>
                                    <div className="absolute left-[50%] top-0 w-[10%] h-6 bg-green-500"></div>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div className="w-1/6 text-xs">Infrastructure</div>
                                <div className="w-5/6 relative h-6">
                                    <div className="absolute left-[35%] top-0 w-[20%] h-6 bg-green-500"></div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-green-500 rounded-sm mr-1"></div>
                                <span>On Track</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-yellow-400 rounded-sm mr-1"></div>
                                <span>At Risk</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-red-500 rounded-sm mr-1"></div>
                                <span>Delayed</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                                <span>Original Milestone</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 border-2 border-red-500 bg-white rounded-full mr-1"></div>
                                <span>Projected Milestone</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Project Management Metrics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Left Column */}
                    <div>
                        <h2 className="text-lg font-semibold mb-4 text-gray-700">
                            Project Management Discipline
                        </h2>
                        <div className="mb-6">
                            <OnTimeDeliveryRate />
                        </div>
                        <div className="bg-white rounded-lg shadow p-5 mb-6">
                            <h3 className="font-medium text-gray-700 mb-2">Dependency Coverage Rate</h3>
                            <div className="mb-4 bg-gray-200 h-4 rounded-full overflow-hidden">
                                <div className="bg-yellow-500 h-full rounded-full" style={{ width: '76%' }}></div>
                            </div>
                            <div className="flex justify-between text-sm mb-4">
                                <span className="text-gray-500">76% coverage</span>
                                <span className="text-yellow-700">6 milestones need dependencies</span>
                            </div>
                            <div className="border-t pt-3">
                                <a href="#" className="text-blue-600 text-sm">View Details</a>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white rounded-lg shadow p-5">
                                <h3 className="font-medium text-gray-700 mb-2">Plan Recency</h3>
                                <div className="flex justify-center">
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-red-600">12</div>
                                        <div className="text-sm text-gray-500">days since last update</div>
                                    </div>
                                </div>
                                <div className="text-xs text-gray-500 mt-3 text-center">
                                    Last updated: Apr 5, 2024
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow p-5">
                                <h3 className="font-medium text-gray-700 mb-2">Baseline Changes</h3>
                                <div className="flex justify-center">
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-amber-600">3</div>
                                        <div className="text-sm text-gray-500">revisions in baseline</div>
                                    </div>
                                </div>
                                <div className="text-xs text-gray-500 mt-3 text-center">
                                    Last change: Mar 28, 2024
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div>
                        <h2 className="text-lg font-semibold mb-4 text-gray-700">
                            Risk & Issue Management
                        </h2>
                        <div className="bg-white rounded-lg shadow p-5 mb-6">
                            {/* <h3 className="font-medium text-gray-700 mb-4">Risk Management</h3> */}

                            {/* Risk Exposure */}
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="rounded bg-red-100 p-3 text-center">
                                    <div className="text-2xl font-bold text-red-700">5</div>
                                    <div className="text-xs text-gray-700">High Risks</div>
                                </div>
                                <div className="rounded bg-yellow-100 p-3 text-center">
                                    <div className="text-2xl font-bold text-yellow-700">8</div>
                                    <div className="text-xs text-gray-700">Medium Risks</div>
                                </div>
                            </div>

                            {/* Risk Mitigation Rate */}
                            <div className="mb-4 mt-5">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm font-medium text-gray-700">Risk Mitigation Rate</span>
                                    <span className="text-sm font-medium text-yellow-600">68%</span>
                                </div>
                                <div className="text-xs text-gray-500 mb-2">
                                    (Mitigated risks / Identified risks) × 100%
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '68%' }}></div>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>0%</span>
                                    <div>
                                        <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full mr-1"></span>
                                        <span>Warning &lt;75%</span>
                                    </div>
                                    <div>
                                        <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-1"></span>
                                        <span>Critical &lt;50%</span>
                                    </div>
                                    <span>100%</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mt-4">
                                <div className="flex items-center space-x-4">
                                    <div className="text-sm">
                                        <div className="font-medium">17/25</div>
                                        <div className="text-xs text-gray-500">Risks Mitigated</div>
                                    </div>
                                    <div className="text-sm">
                                        <div className="font-medium">8</div>
                                        <div className="text-xs text-gray-500">Pending Mitigation</div>
                                    </div>
                                </div>
                                <a href="#" className="text-blue-600 text-sm">View All Risks</a>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-5">
                            <h3 className="font-medium text-gray-700 mb-2">Issue Resolution Efficiency</h3>
                            <div className="flex justify-between mb-2">
                                <span className="text-sm text-gray-600">Average Resolution Time</span>
                                <span className="text-sm font-medium text-orange-600">6.2 days</span>
                            </div>
                            <div className="mb-4 bg-gray-200 h-1.5 rounded-full">
                                <div className="bg-orange-500 h-full rounded-full" style={{ width: '62%' }}></div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-700">12</div>
                                    <div className="text-xs text-gray-500">Open Issues</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600">87%</div>
                                    <div className="text-xs text-gray-500">Resolution Rate</div>
                                </div>
                            </div>
                            <div className="border-t pt-3">
                                <a href="#" className="text-blue-600 text-sm">View Open Issues</a>
                            </div>
                        </div>
                    </div>
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold mb-4 text-gray-700">
                            Approval & Governance
                        </h2>
                        <ApprovalCycleEfficiency />
                    </div>
                </div>

                {/* AI Insights Section */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700">
                        AI-Powered Insights
                    </h2>
                    <div className="bg-white rounded-lg shadow p-5">
                        <div className="mb-4">
                            <h3 className="font-medium text-gray-700 mb-2">What's causing project delays?</h3>
                            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                <p className="text-sm text-gray-700">
                                    Based on analysis of current project data, the <b>primary factors causing delays</b> are:
                                </p>
                                <ul className="list-disc ml-5 mt-2 text-sm text-gray-700 space-y-1">
                                    <li>Resource overallocation in the development team (142% capacity)</li>
                                    <li>Delayed approval cycles (averaging 5.3 days per approval)</li>
                                    <li>Incomplete dependency mapping for UAT activities</li>
                                </ul>
                                <div className="mt-3 text-sm text-blue-700">
                                    <a href="#">View detailed analysis</a>
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <h3 className="font-medium text-gray-700 mb-2">Recommended Actions</h3>
                            <div className="space-y-2">
                                <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-700">Rebalance workload for development team</p>
                                        <p className="text-xs text-gray-500">High impact on schedule recovery</p>
                                    </div>
                                    <button className="px-3 py-1 bg-green-600 text-white rounded text-xs">Assign</button>
                                </div>
                                <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-700">Create missing dependencies for UAT tasks</p>
                                        <p className="text-xs text-gray-500">Medium impact on risk reduction</p>
                                    </div>
                                    <button className="px-3 py-1 bg-green-600 text-white rounded text-xs">Assign</button>
                                </div>
                                <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-700">Update project plan with current status</p>
                                        <p className="text-xs text-gray-500">Required for accurate forecasting</p>
                                    </div>
                                    <button className="px-3 py-1 bg-green-600 text-white rounded text-xs">Assign</button>
                                </div>
                            </div>
                        </div>

                        <div className="border-t pt-4">
                            <div className="flex">
                                <input type="text" placeholder="Ask a question this project..." className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg">Ask</button>
                            </div>
                            <div className="mt-2 text-xs text-gray-500">
                                Try: "What milestones are at risk?" or "How can we improve resource utilization?"
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectHealthDashboard;