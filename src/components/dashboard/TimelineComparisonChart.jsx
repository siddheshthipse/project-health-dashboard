import React, { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, SparklesIcon } from '@heroicons/react/20/solid';
import ReactECharts from 'echarts-for-react';

const TimelineComparisonChart = () => {
    const [comparisonMode, setComparisonMode] = useState('planned-actual');
    const [showForecast, setShowForecast] = useState(false);
    const [selectedMilestone, setSelectedMilestone] = useState(null);
    const [milestoneModalOpen, setMilestoneModalOpen] = useState(false);

    // Sample project progress data (percentages)
    const projectData = {
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        planned: [5, 15, 30, 45, 60, 75, 85, 95, 100],
        actual: [5, 13, 25, 38, 48, 60, null, null, null], // null for future months
        baseline: [10, 22, 35, 50, 65, 80, 90, 100, null],
        forecast: [5, 13, 25, 38, 48, 60, 69, 80, 92] // AI-generated forecast
    };

    // Sample milestone data
    const milestoneData = [
        {
            id: 'ms-1',
            name: 'Requirements Finalized',
            date: 'Feb 15, 2025',
            status: 'on-time', // on-time, delayed, ahead, at-risk
            planned: 15,
            actual: 15,
            xAxis: 1.5, // Position on the x-axis (between Jan and Feb)
            plannedStart: 'Jan 15, 2025',
            plannedEnd: 'Feb 15, 2025',
            actualStart: 'Jan 15, 2025',
            actualEnd: 'Feb 15, 2025',
            baselineStart: 'Jan 10, 2025',
            baselineEnd: 'Feb 10, 2025',
            forecastStart: 'Jan 15, 2025',
            forecastEnd: 'Feb 15, 2025',
            forecastInsights: {
                delayRiskScore: 'high', // 'low', 'medium', 'high', 'critical'
                delayDays: 5, // number of days delayed
                reasons: [
                    {
                        reason: 'Frontend implementation behind schedule',
                        impact: 3,
                        recommendation: 'Consider adding 1-2 additional developers to the frontend team',
                        trend: 'worsening' // 'improving', 'stable', 'worsening'
                    },
                    {
                        reason: 'API integration taking longer than expected',
                        impact: 2,
                        recommendation: 'Schedule daily sync meetings between frontend and backend teams',
                        trend: 'stable'
                    }
                ],
                dependencies: [
                    'Backend API readiness from Team Alpha',
                    'Third-party integration approval'
                ],
                resourceBottlenecks: ['Frontend Development']
            },
            tasks: []
        },
        {
            id: 'ms-2',
            name: 'Design Approval',
            date: 'Mar 25, 2025',
            status: 'delayed',
            planned: 28,
            actual: 24,
            xAxis: 2.8, // Position on the x-axis (near end of March)
            plannedStart: 'Feb 25, 2025',
            plannedEnd: 'Mar 20, 2025',
            actualStart: 'Feb 25, 2025',
            actualEnd: 'Mar 25, 2025',
            baselineStart: 'Feb 20, 2025',
            baselineEnd: 'Mar 15, 2025',
            forecastStart: 'Feb 25, 2025',
            forecastEnd: 'Mar 25, 2025',
            forecastInsights: {
                delayRiskScore: 'high', // 'low', 'medium', 'high', 'critical'
                delayDays: 5, // number of days delayed
                reasons: [
                    {
                        reason: 'Frontend implementation behind schedule',
                        impact: 3,
                        recommendation: 'Consider adding 1-2 additional developers to the frontend team',
                        trend: 'worsening' // 'improving', 'stable', 'worsening'
                    },
                    {
                        reason: 'API integration taking longer than expected',
                        impact: 2,
                        recommendation: 'Schedule daily sync meetings between frontend and backend teams',
                        trend: 'stable'
                    }
                ],
                dependencies: [
                    'Backend API readiness from Team Alpha',
                    'Third-party integration approval'
                ],
                resourceBottlenecks: ['Frontend Development']
            },
            tasks: [
                // Add these properties to your task objects
                {
                    id: 'task-1',
                    title: 'UI Design Review',
                    status: 'Delayed',
                    plannedStart: 'Mar 1, 2025',
                    plannedEnd: 'Mar 10, 2025',
                    actualStart: 'Mar 15, 2025',
                    actualEnd: 'Mar 25, 2025',
                    delayContribution: 3,
                    // Add these two new properties:
                    forecastDelay: 2,
                    forecastDelayReason: 'Resource availability issue with design team and dependency on marketing approval'
                },
                {
                    id: 'task-2',
                    title: 'Architecture Review',
                    status: 'Delayed',
                    plannedStart: 'Mar 1, 2025',
                    plannedEnd: 'Mar 10, 2025',
                    actualStart: 'Mar 10, 2025',
                    actualEnd: 'Mar 22, 2025',
                    delayContribution: 2,
                    forecastDelay: 2,
                    forecastDelayReason: 'Resource availability issue with design team and dependency on marketing approval'
                },
                {
                    id: 'task-3',
                    title: 'Integration Design',
                    status: 'On Track',
                    plannedStart: 'Mar 1, 2025',
                    plannedEnd: 'Mar 15, 2025',
                    actualStart: 'Mar 5, 2025',
                    actualEnd: 'Mar 18, 2025',
                    delayContribution: 0,
                    forecastDelay: 2,
                    forecastDelayReason: 'Resource availability issue with design team and dependency on marketing approval'
                }
            ]
        },
        {
            id: 'ms-3',
            name: 'Development Complete',
            date: 'May 20, 2025',
            status: 'at-risk',
            planned: 58,
            actual: 48,
            xAxis: 4.7, // Position on the x-axis (near end of May)
            plannedStart: 'Apr 1, 2025',
            plannedEnd: 'May 20, 2025',
            actualStart: 'Apr 5, 2025',
            actualEnd: null,
            baselineStart: 'Mar 25, 2025',
            baselineEnd: 'May 15, 2025',
            forecastStart: 'Apr 5, 2025',
            forecastEnd: 'May 25, 2025',
            forecastInsights: {
                delayRiskScore: 'high', // 'low', 'medium', 'high', 'critical'
                delayDays: 5, // number of days delayed
                reasons: [
                    {
                        reason: 'Frontend implementation behind schedule',
                        impact: 3,
                        recommendation: 'Consider adding 1-2 additional developers to the frontend team',
                        trend: 'worsening' // 'improving', 'stable', 'worsening'
                    },
                    {
                        reason: 'API integration taking longer than expected',
                        impact: 2,
                        recommendation: 'Schedule daily sync meetings between frontend and backend teams',
                        trend: 'stable'
                    }
                ],
                dependencies: [
                    'Backend API readiness from Team Alpha',
                    'Third-party integration approval'
                ],
                resourceBottlenecks: ['Frontend Development']
            },
            tasks: []
        },
        {
            id: 'ms-4',
            name: 'UAT Complete',
            date: 'Jul 10, 2025',
            status: 'at-risk',
            planned: 82,
            forecast: 69,
            xAxis: 6.3, // Position on the x-axis (early July)
            plannedStart: 'Jun 1, 2025',
            plannedEnd: 'Jul 10, 2025',
            actualStart: null,
            actualEnd: null,
            baselineStart: 'May 25, 2025',
            baselineEnd: 'Jul 5, 2025',
            forecastStart: 'Jun 5, 2025',
            forecastEnd: 'Jul 15, 2025',
            forecastInsights: {
                delayRiskScore: 'high', // 'low', 'medium', 'high', 'critical'
                delayDays: 5, // number of days delayed
                reasons: [
                    {
                        reason: 'Frontend implementation behind schedule',
                        impact: 3,
                        recommendation: 'Consider adding 1-2 additional developers to the frontend team',
                        trend: 'worsening' // 'improving', 'stable', 'worsening'
                    },
                    {
                        reason: 'API integration taking longer than expected',
                        impact: 2,
                        recommendation: 'Schedule daily sync meetings between frontend and backend teams',
                        trend: 'stable'
                    }
                ],
                dependencies: [
                    'Backend API readiness from Team Alpha',
                    'Third-party integration approval'
                ],
                resourceBottlenecks: ['Frontend Development']
            },
            tasks: []
        },
        {
            id: 'ms-5',
            name: 'Go-Live',
            date: 'Aug 25, 2025',
            status: 'at-risk',
            planned: 98,
            forecast: 82,
            xAxis: 7.8, // Position on the x-axis (late August)
            plannedStart: 'Jul 20, 2025',
            plannedEnd: 'Aug 25, 2025',
            actualStart: null,
            actualEnd: null,
            baselineStart: 'Jul 15, 2025',
            baselineEnd: 'Aug 20, 2025',
            forecastStart: 'Jul 25, 2025',
            forecastEnd: 'Aug 30, 2025',
            forecastInsights: {
                delayRiskScore: 'high', // 'low', 'medium', 'high', 'critical'
                delayDays: 5, // number of days delayed
                reasons: [
                    {
                        reason: 'Frontend implementation behind schedule',
                        impact: 3,
                        recommendation: 'Consider adding 1-2 additional developers to the frontend team',
                        trend: 'worsening' // 'improving', 'stable', 'worsening'
                    },
                    {
                        reason: 'API integration taking longer than expected',
                        impact: 2,
                        recommendation: 'Schedule daily sync meetings between frontend and backend teams',
                        trend: 'stable'
                    }
                ],
                dependencies: [
                    'Backend API readiness from Team Alpha',
                    'Third-party integration approval'
                ],
                resourceBottlenecks: ['Frontend Development']
            },
            tasks: []
        }
    ];

    // Helper function to get milestone symbol based on status
    const getMilestoneSymbol = (status) => {
        return 'circle';
    };

    // Helper function to get milestone color based on status
    const getMilestoneColor = (status) => {
        switch (status) {
            case 'ahead': return '#10b981'; // green
            case 'on-time': return '#3b82f6'; // blue
            case 'at-risk': return '#f59e0b'; // amber
            case 'delayed': return '#ef4444'; // red
            default: return '#3b82f6'; // blue
        }
    };

    // Generate chart options based on selected comparison mode
    const getChartOptions = () => {
        // Base series for the selected comparison mode
        let series = [];

        // Track which milestones have been already added to avoid duplicates
        const addedMilestones = new Set();

        // Add planned line
        if (comparisonMode === 'planned-actual' || comparisonMode === 'planned-baseline') {
            // Only add milestones for planned line when comparing planned-actual
            // We'll only show labels on hover
            const milestonePoints = milestoneData
                .filter(ms => ms.planned !== undefined)
                .map(ms => {
                    addedMilestones.add(ms.id);
                    return {
                        name: ms.name,
                        coord: [ms.xAxis, ms.planned],
                        value: '',  // Empty value to prevent labels from showing always
                        symbol: getMilestoneSymbol(ms.status),
                        symbolOffset: [0, 0], // Ensure it's on the line
                        itemStyle: {
                            color: getMilestoneColor(ms.status),
                            borderColor: '#fff',
                            borderWidth: 2,
                            shadowBlur: 4,
                            shadowColor: 'rgba(0, 0, 0, 0.2)'
                        }
                    };
                });

            series.push({
                name: 'Planned',
                type: 'line',
                data: projectData.planned,
                smooth: true,
                lineStyle: {
                    width: 3,
                    color: '#3b82f6' // blue
                },
                itemStyle: {
                    color: '#3b82f6'
                },
                symbol: 'circle',
                symbolSize: 6,
                markPoint: {
                    symbolSize: 14,
                    label: {
                        show: false // Hide labels by default, only show on hover
                    },
                    data: milestonePoints
                }
            });
        }

        // Add actual line
        if (comparisonMode === 'planned-actual' || comparisonMode === 'actual-baseline') {
            // Only add milestones that haven't been added to the planned line
            const milestonePoints = milestoneData
                .filter(ms => ms.actual !== undefined && (comparisonMode === 'actual-baseline' || !addedMilestones.has(ms.id)))
                .map(ms => {
                    addedMilestones.add(ms.id);
                    return {
                        name: ms.name,
                        coord: [ms.xAxis, ms.actual],
                        value: '',  // Empty value to prevent labels from showing always
                        symbol: getMilestoneSymbol(ms.status),
                        symbolOffset: [0, 0], // Ensure it's on the line
                        itemStyle: {
                            color: getMilestoneColor(ms.status),
                            borderColor: '#fff',
                            borderWidth: 2,
                            shadowBlur: 4,
                            shadowColor: 'rgba(0, 0, 0, 0.2)'
                        }
                    };
                });

            series.push({
                name: 'Actual',
                type: 'line',
                data: projectData.actual,
                smooth: true,
                lineStyle: {
                    width: 3,
                    color: '#10b981' // green
                },
                itemStyle: {
                    color: '#10b981'
                },
                symbol: 'circle',
                symbolSize: 6,
                markPoint: {
                    symbolSize: 14,
                    label: {
                        show: false // Hide labels by default, only show on hover
                    },
                    data: milestonePoints
                }
            });
        }

        // Add baseline line
        if (comparisonMode === 'planned-baseline' || comparisonMode === 'actual-baseline') {
            series.push({
                name: 'Baseline',
                type: 'line',
                data: projectData.baseline,
                smooth: true,
                lineStyle: {
                    width: 3,
                    type: 'dashed',
                    color: '#8b5cf6' // purple
                },
                itemStyle: {
                    color: '#8b5cf6'
                },
                symbol: 'circle',
                symbolSize: 6
            });
        }

        // Add forecast line if enabled
        if (showForecast) {
            // Only add milestones that haven't been added to other lines
            const milestonePoints = milestoneData
                .filter(ms => ms.forecast !== undefined && !addedMilestones.has(ms.id))
                .map(ms => {
                    addedMilestones.add(ms.id);
                    return {
                        name: ms.name,
                        coord: [ms.xAxis, ms.forecast],
                        value: '',  // Empty value to prevent labels from showing always
                        symbol: getMilestoneSymbol(ms.status),
                        symbolOffset: [0, 0], // Ensure it's on the line
                        itemStyle: {
                            color: getMilestoneColor(ms.status),
                            borderColor: '#fff',
                            borderWidth: 2,
                            shadowBlur: 4,
                            shadowColor: 'rgba(0, 0, 0, 0.2)'
                        }
                    };
                });

            series.push({
                name: 'KTern.AI Forecast',
                type: 'line',
                data: projectData.forecast,
                smooth: true,
                lineStyle: {
                    width: 2,
                    type: 'dashed',
                    color: '#f97316' // orange
                },
                itemStyle: {
                    color: '#f97316'
                },
                symbol: 'circle',
                symbolSize: 4,
                markPoint: {
                    symbolSize: 14,
                    label: {
                        show: false // Hide labels by default, only show on hover
                    },
                    data: milestonePoints
                }
            });
        }

        // Prepare and return the chart options
        return {
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    // For milestone points
                    if (params.componentSubType === 'markPoint') {
                        const milestone = milestoneData.find(ms => ms.name === params.name);
                        if (milestone) {
                            return `<div style="font-weight:bold">${milestone.name}</div>` +
                                `<div>Date: ${milestone.date}</div>` +
                                `<div>Status: ${milestone.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</div>` +
                                `<div style="font-size:10px;margin-top:5px;color:#666">Click for details</div>`;
                        }
                        return params.name;
                    }

                    // For regular data points
                    if (params.seriesType === 'line') {
                        if (params.value === null) return params.name + ': N/A';
                        return params.seriesName + ': ' + params.value + '%';
                    }

                    return params.name;
                }
            },
            legend: {
                data: series.map(s => s.name),
                bottom: 0,
                icon: 'circle',
                itemWidth: 10,
                itemHeight: 10,
                textStyle: {
                    fontSize: 12
                },
                selectedMode: false // Prevent toggling series visibility
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '15%',
                top: '8%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: projectData.months,
                axisLine: {
                    lineStyle: {
                        color: '#d1d5db'
                    }
                },
                axisLabel: {
                    color: '#6b7280'
                }
            },
            yAxis: {
                type: 'value',
                min: 0,
                max: 100,
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
            series: series
        };
    };

    // Handle milestone click
    const handleChartClick = (params) => {
        // Handle clicks on milestone points
        if (params.componentType === 'markPoint') {
            const milestone = milestoneData.find(ms => ms.name === params.name);
            if (milestone) {
                setSelectedMilestone(milestone);
                setMilestoneModalOpen(true);
            }
        }
    };

    // Milestone Drilldown Modal
    const MilestoneModal = () => {

        if (!selectedMilestone) return null;

        // Helper function to get status color for tasks
        const getTaskStatusColor = (status) => {
            switch (status.toLowerCase()) {
                case 'on track': return 'bg-green-100 text-green-800';
                case 'at risk': return 'bg-amber-100 text-amber-800';
                case 'delayed': return 'bg-red-100 text-red-800';
                default: return 'bg-gray-100 text-gray-800';
            }
        };

        return (
            <Transition appear show={milestoneModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setMilestoneModalOpen(false)}>
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
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all">
                                    <div className="flex justify-between items-center mb-4">
                                        <Dialog.Title as="h3" className="text-lg font-semibold text-gray-900">
                                            {selectedMilestone.name} Details
                                        </Dialog.Title>
                                        <button
                                            type="button"
                                            onClick={() => setMilestoneModalOpen(false)}
                                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        >
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>

                                    {/* Milestone Dates Summary */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                                            <div className="text-xs text-blue-700 font-medium mb-1">Planned</div>
                                            <div className="text-sm text-gray-700">
                                                <div>Start: {selectedMilestone.plannedStart || "N/A"}</div>
                                                <div>End: {selectedMilestone.plannedEnd || "N/A"}</div>
                                            </div>
                                        </div>

                                        <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                                            <div className="text-xs text-green-700 font-medium mb-1">Actual</div>
                                            <div className="text-sm text-gray-700">
                                                <div>Start: {selectedMilestone.actualStart || "N/A"}</div>
                                                <div>End: {selectedMilestone.actualEnd || "N/A"}</div>
                                            </div>
                                        </div>

                                        <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                                            <div className="text-xs text-purple-700 font-medium mb-1">Baseline</div>
                                            <div className="text-sm text-gray-700">
                                                <div>Start: {selectedMilestone.baselineStart || "N/A"}</div>
                                                <div>End: {selectedMilestone.baselineEnd || "N/A"}</div>
                                            </div>
                                        </div>

                                        <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
                                            <div className="text-xs text-orange-700 font-medium mb-1">Forecast</div>
                                            <div className="text-sm text-gray-700">
                                                <div>Start: {selectedMilestone.forecastStart || "N/A"}</div>
                                                <div>End: {selectedMilestone.forecastEnd || "N/A"}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t border-b py-3 mb-4">
                                        <div className="flex items-center">
                                            <div className={`py-1 px-3 rounded-full text-sm font-medium ${selectedMilestone.status === 'delayed' ? 'bg-red-100 text-red-800' :
                                                selectedMilestone.status === 'at-risk' ? 'bg-amber-100 text-amber-800' :
                                                    selectedMilestone.status === 'on-time' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-green-100 text-green-800'
                                                }`}>
                                                Status: {selectedMilestone.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                            </div>
                                            {selectedMilestone.status === 'delayed' && selectedMilestone.tasks && selectedMilestone.tasks.length > 0 && (
                                                <span className="ml-3 text-sm text-red-600 font-medium">
                                                    Total delay: {selectedMilestone.tasks.reduce((total, task) => total + (task.delayContribution || 0), 0)} days
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {selectedMilestone.tasks && selectedMilestone.tasks.length > 0 ? (
                                        <div className="border rounded-lg overflow-hidden max-h-[50vh] overflow-y-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50 sticky top-0">
                                                    <tr>
                                                        <th scope="col" className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Task
                                                        </th>
                                                        <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Status
                                                        </th>
                                                        <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Planned Start
                                                        </th>
                                                        <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Planned End
                                                        </th>
                                                        {/* <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Actual Start
                                                        </th>
                                                        <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Actual End
                                                        </th> */}
                                                        <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Delay Contribution
                                                        </th>
                                                        <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            <div className="flex items-center justify-center">
                                                                <SparklesIcon className="h-3.5 w-3.5 mr-1 text-orange-500" />
                                                                Forecasted Delay
                                                            </div>
                                                        </th>
                                                        <th scope="col" className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            <div className="flex items-center">
                                                                <SparklesIcon className="h-3.5 w-3.5 mr-1 text-orange-500" />
                                                                Reason for Forecast Delay
                                                            </div>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {selectedMilestone.tasks.map(task => (
                                                        <tr key={task.id} className={`border-b hover:bg-gray-50 ${task.status.toLowerCase() === 'delayed' ? 'bg-red-50' : ''}`}>
                                                            <td className="p-3">
                                                                <div className="flex items-center">
                                                                    <span className="font-medium text-gray-700">{task.title}</span>
                                                                </div>
                                                            </td>
                                                            <td className="p-3 text-center whitespace-nowrap">
                                                                <span className={`px-2 py-1 text-xs rounded-full ${getTaskStatusColor(task.status)}`}>
                                                                    {task.status}
                                                                </span>
                                                            </td>
                                                            <td className="p-3 text-center whitespace-nowrap text-sm text-gray-600">
                                                                {task.plannedStart}
                                                            </td>
                                                            <td className="p-3 text-center whitespace-nowrap text-sm text-gray-600">
                                                                {task.plannedEnd}
                                                            </td>
                                                            {/* <td className="p-3 text-center whitespace-nowrap text-sm text-gray-600">
                                                                {task.actualStart || "-"}
                                                            </td>
                                                            <td className="p-3 text-center whitespace-nowrap text-sm text-gray-600">
                                                                {task.actualEnd || "-"}
                                                            </td> */}
                                                            <td className="p-3 text-center whitespace-nowrap">
                                                                {task.delayContribution > 0 ? (
                                                                    <span className="text-sm font-medium text-red-600">+{task.delayContribution} days</span>
                                                                ) : (
                                                                    <span className="text-sm text-gray-500">0 days</span>
                                                                )}
                                                            </td>
                                                            <td className="p-3 text-center whitespace-nowrap">
                                                                {task.forecastDelay > 0 ? (
                                                                    <span className="text-sm font-medium text-orange-600">+{task.forecastDelay} days</span>
                                                                ) : (
                                                                    <span className="text-sm text-gray-500">0 days</span>
                                                                )}
                                                            </td>
                                                            <td className="p-3 text-sm text-gray-600">
                                                                {task.forecastDelayReason || "-"}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <div className="text-center py-6 text-gray-500">
                                            No tasks associated with this milestone.
                                        </div>
                                    )}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        );
    };

    return (
        <div className="bg-white rounded-lg shadow p-5">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-medium text-gray-800">Milestone Timeline & Project Progress</h3>
                    <p className="text-xs text-gray-500">Track project progress against plan, baseline and forecasts</p>
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setComparisonMode('planned-actual')}
                        className={`px-2 py-1 text-xs rounded ${comparisonMode === 'planned-actual' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700'
                            }`}
                    >
                        Planned vs Actual
                    </button>
                    <button
                        onClick={() => setComparisonMode('planned-baseline')}
                        className={`px-2 py-1 text-xs rounded ${comparisonMode === 'planned-baseline' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700'
                            }`}
                    >
                        Planned vs Baseline
                    </button>
                    <button
                        onClick={() => setComparisonMode('actual-baseline')}
                        className={`px-2 py-1 text-xs rounded ${comparisonMode === 'actual-baseline' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700'
                            }`}
                    >
                        Actual vs Baseline
                    </button>
                </div>
            </div>

            <div className="mb-4">
                <button
                    onClick={() => setShowForecast(!showForecast)}
                    className={`flex items-center px-3 py-1.5 text-sm rounded-md ${showForecast ? 'bg-orange-100 text-orange-700 border border-orange-200' : 'bg-gray-100 text-gray-700 border border-gray-200'
                        }`}
                >
                    <SparklesIcon className="h-4 w-4 mr-1" />
                    {showForecast ? 'Hide AI Forecast' : 'Generate KTern.AI Forecast'}
                </button>
            </div>

            <div className="h-80">
                <ReactECharts
                    option={getChartOptions()}
                    style={{ height: '100%', width: '100%' }}
                    onEvents={{
                        click: handleChartClick
                    }}
                    onChartReady={(chart) => {
                        setTimeout(() => {
                            chart.resize();
                        }, 100);
                    }}
                />
            </div>

            <div className="mt-4 pt-3 border-t flex flex-wrap gap-4">
                <div className="flex items-center text-xs text-gray-500">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                    <span>Ahead</span>
                </div>
                <div className="flex items-center text-xs text-gray-500">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                    <span>On Track</span>
                </div>
                <div className="flex items-center text-xs text-gray-500">
                    <div className="w-3 h-3 rounded-full bg-amber-500 mr-1"></div>
                    <span>At Risk</span>
                </div>
                <div className="flex items-center text-xs text-gray-500">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                    <span>Delayed</span>
                </div>
            </div>

            <MilestoneModal />
        </div>
    );
};

export default TimelineComparisonChart;