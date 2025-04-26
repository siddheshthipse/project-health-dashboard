import React, { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, FunnelIcon } from '@heroicons/react/20/solid';
import ReactECharts from 'echarts-for-react';

const OnTimeDeliveryDrilldownModal = ({ isOpen, closeModal }) => {
    // State for filtering
    const [showLateOnly, setShowLateOnly] = useState(false);

    // Sample task completion data
    const taskCompletionData = [
        {
            id: 'task-001',
            name: 'Requirements Documentation',
            assignedTo: {
                initials: 'MC',
                color: 'bg-blue-500',
                name: 'Michael Chen'
            },
            plannedStart: 'Mar 15, 2025',
            plannedEnd: 'Mar 25, 2025',
            actualStart: 'Mar 15, 2025',
            actualEnd: 'Mar 28, 2025',
            variance: 'Delayed (3 days)',
            status: 'late',
            impactedMilestone: 'Blueprint Sign-off'
        },
        {
            id: 'task-002',
            name: 'Data Model Design',
            assignedTo: {
                initials: 'SW',
                color: 'bg-purple-500',
                name: 'Sarah Williams'
            },
            plannedStart: 'Mar 20, 2025',
            plannedEnd: 'Mar 30, 2025',
            actualStart: 'Mar 20, 2025',
            actualEnd: 'Mar 27, 2025',
            variance: 'Ahead (3 days)',
            status: 'early',
            impactedMilestone: 'None'
        },
        {
            id: 'task-003',
            name: 'Interface Prototype',
            assignedTo: {
                initials: 'PS',
                color: 'bg-green-500',
                name: 'Priya Sharma'
            },
            plannedStart: 'Mar 25, 2025',
            plannedEnd: 'Apr 5, 2025',
            actualStart: 'Mar 27, 2025',
            actualEnd: 'Apr 10, 2025',
            variance: 'Delayed (5 days)',
            status: 'late',
            impactedMilestone: 'UX Review'
        },
        {
            id: 'task-004',
            name: 'Test Plan Creation',
            assignedTo: {
                initials: 'RT',
                color: 'bg-orange-500',
                name: 'Robert Taylor'
            },
            plannedStart: 'Mar 28, 2025',
            plannedEnd: 'Apr 8, 2025',
            actualStart: 'Mar 30, 2025',
            actualEnd: 'Apr 12, 2025',
            variance: 'Delayed (4 days)',
            status: 'late',
            impactedMilestone: 'Testing Kickoff'
        },
        {
            id: 'task-005',
            name: 'Security Review',
            assignedTo: {
                initials: 'JS',
                color: 'bg-pink-500',
                name: 'John Smith'
            },
            plannedStart: 'Apr 1, 2025',
            plannedEnd: 'Apr 10, 2025',
            actualStart: 'Apr 1, 2025',
            actualEnd: 'Apr 8, 2025',
            variance: 'Ahead (2 days)',
            status: 'early',
            impactedMilestone: 'None'
        },
        {
            id: 'task-006',
            name: 'Documentation Update',
            assignedTo: {
                initials: 'MC',
                color: 'bg-blue-500',
                name: 'Michael Chen'
            },
            plannedStart: 'Apr 5, 2025',
            plannedEnd: 'Apr 15, 2025',
            actualStart: 'Apr 7, 2025',
            actualEnd: 'Apr 19, 2025',
            variance: 'Delayed (4 days)',
            status: 'late',
            impactedMilestone: 'Documentation Review'
        },
        {
            id: 'task-007',
            name: 'Performance Testing',
            assignedTo: {
                initials: 'RT',
                color: 'bg-orange-500',
                name: 'Robert Taylor'
            },
            plannedStart: 'Apr 10, 2025',
            plannedEnd: 'Apr 20, 2025',
            actualStart: 'Apr 12, 2025',
            actualEnd: 'Apr 25, 2025',
            variance: 'Delayed (5 days)',
            status: 'late',
            impactedMilestone: 'Performance Sign-off'
        },
        {
            id: 'task-008',
            name: 'Bug Fixes',
            assignedTo: {
                initials: 'PS',
                color: 'bg-green-500',
                name: 'Priya Sharma'
            },
            plannedStart: 'Apr 15, 2025',
            plannedEnd: 'Apr 25, 2025',
            actualStart: 'Apr 15, 2025',
            actualEnd: 'Apr 23, 2025',
            variance: 'Ahead (2 days)',
            status: 'early',
            impactedMilestone: 'None'
        },
        {
            id: 'task-009',
            name: 'User Training Materials',
            assignedTo: {
                initials: 'SW',
                color: 'bg-purple-500',
                name: 'Sarah Williams'
            },
            plannedStart: 'Apr 20, 2025',
            plannedEnd: 'Apr 30, 2025',
            actualStart: 'Apr 22, 2025',
            actualEnd: 'May 5, 2025',
            variance: 'Delayed (5 days)',
            status: 'late',
            impactedMilestone: 'Training Kickoff'
        },
        {
            id: 'task-010',
            name: 'Deployment Planning',
            assignedTo: {
                initials: 'JS',
                color: 'bg-pink-500',
                name: 'John Smith'
            },
            plannedStart: 'Apr 25, 2025',
            plannedEnd: 'May 5, 2025',
            actualStart: 'Apr 27, 2025',
            actualEnd: 'May 10, 2025',
            variance: 'Delayed (5 days)',
            status: 'late',
            impactedMilestone: 'Deployment Readiness'
        }
    ];

    // Filter the tasks based on current setting
    const filteredTasks = showLateOnly
        ? taskCompletionData.filter(task => task.status === 'late')
        : taskCompletionData;

    // Helper function to get variance color
    const getVarianceColor = (status) => {
        return status === 'late' ? 'text-red-600' : 'text-green-600';
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all">
                                <div className="flex justify-between items-center mb-4">
                                    <Dialog.Title as="h3" className="text-lg font-semibold text-gray-900">
                                        On-Time Delivery Analysis
                                    </Dialog.Title>
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                <div className="mb-4 flex justify-between items-center">
                                    <div className="flex gap-5">
                                        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                                            <div className="text-lg font-bold text-blue-600">82%</div>
                                            <div className="text-xs text-gray-700">On-Time Delivery Rate</div>
                                        </div>
                                        <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                                            <div className="text-lg font-bold text-red-600">7</div>
                                            <div className="text-xs text-gray-700">Tasks Completed Late</div>
                                        </div>
                                        <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                                            <div className="text-lg font-bold text-green-600">3</div>
                                            <div className="text-xs text-gray-700">Tasks Completed Early</div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setShowLateOnly(!showLateOnly)}
                                        className={`flex items-center px-3 py-2 text-sm border rounded ${showLateOnly ? 'bg-blue-50 border-blue-300 text-blue-700' : 'bg-gray-50 border-gray-300 text-gray-700'
                                            }`}
                                    >
                                        <FunnelIcon className="h-4 w-4 mr-2" />
                                        <span className='text-xs'>{showLateOnly ? 'Show All Tasks' : 'Show Late Tasks Only'}</span>
                                    </button>
                                </div>

                                <div className="border rounded-lg overflow-hidden max-h-[50vh] overflow-y-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50 sticky top-0">
                                            <tr>
                                                <th scope="col" className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Task Name
                                                </th>
                                                <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Assigned To
                                                </th>
                                                <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Planned Start
                                                </th>
                                                <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Planned End
                                                </th>
                                                <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Actual Start
                                                </th>
                                                <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Actual End
                                                </th>
                                                <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Variance
                                                </th>
                                                <th scope="col" className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Impacted Milestone
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {filteredTasks.map((task) => (
                                                <tr key={task.id} className={task.status === 'late' ? 'bg-red-50' : ''}>
                                                    <td className="p-3 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">{task.name}</div>
                                                    </td>
                                                    <td className="p-3 text-center whitespace-nowrap">
                                                        <div className="flex justify-center">
                                                            <div
                                                                className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-white ${task.assignedTo.color}`}
                                                                title={task.assignedTo.name}
                                                            >
                                                                {task.assignedTo.initials}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-3 text-center whitespace-nowrap text-xs text-gray-600">
                                                        {task.plannedStart}
                                                    </td>
                                                    <td className="p-3 text-center whitespace-nowrap text-xs text-gray-600">
                                                        {task.plannedEnd}
                                                    </td>
                                                    <td className="p-3 text-center whitespace-nowrap text-xs text-gray-600">
                                                        {task.actualStart}
                                                    </td>
                                                    <td className="p-3 text-center whitespace-nowrap text-xs text-gray-600">
                                                        {task.actualEnd}
                                                    </td>
                                                    <td className="p-3 text-center whitespace-nowrap">
                                                        <span className={`text-xs font-medium ${getVarianceColor(task.status)}`}>
                                                            {task.variance}
                                                        </span>
                                                    </td>
                                                    <td className="p-3 whitespace-nowrap">
                                                        {task.impactedMilestone === 'None' ? (
                                                            <span className="text-xs text-gray-500">None</span>
                                                        ) : (
                                                            <span className="text-xs font-medium text-amber-700">{task.impactedMilestone}</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="mt-4 flex flex-wrap gap-3">
                                    <div className="flex items-center text-xs text-gray-500">
                                        <div className="w-3 h-3 bg-red-50 rounded mr-1"></div>
                                        <span>Late Tasks</span>
                                    </div>
                                    <div className="flex items-center text-xs text-gray-500">
                                        <span className="text-red-600 font-medium mr-1">Delayed</span>
                                        <span>Tasks completed after planned end date</span>
                                    </div>
                                    <div className="flex items-center text-xs text-gray-500">
                                        <span className="text-green-600 font-medium mr-1">Ahead</span>
                                        <span>Tasks completed before planned end date</span>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};


const OnTimeDeliveryRate = () => {
    const [showDrilldown, setShowDrilldown] = useState(false);
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

    const handleDetailsClick = () => {
        setShowDrilldown(true);
    };

    return (
        <div className="bg-white rounded-lg shadow p-5 border-t-4 border-blue-500">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-medium text-gray-700">On-Time Delivery Rate</h3>
                    {/* <div className="text-xs text-gray-500 flex items-center">
                        <span>HIGH PRIORITY</span>
                    </div> */}
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
                    onChartReady={(chart) => {
                        setTimeout(() => {
                            chart.resize();
                        }, 100);
                    }}
                />
            </div>

            <div className="mt-3 pt-3 border-t flex justify-between items-center text-xs">
                <div className="flex items-center text-gray-500">
                    <div className="w-2 h-2 rounded-full bg-yellow-500 mr-1"></div>
                    <span>10 tasks completed late this month</span>
                </div>
                <button
                    onClick={handleDetailsClick}
                    className="text-blue-600 hover:underline focus:outline-none"
                >
                    Details
                </button>
            </div>

            <OnTimeDeliveryDrilldownModal
                isOpen={showDrilldown}
                closeModal={() => setShowDrilldown(false)}
            />
        </div>
    );
};

export default OnTimeDeliveryRate;