import React, { useState, Fragment, useRef, useCallback } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import ReactECharts from 'echarts-for-react';

const OverdueTasksByStakeholder = () => {
    const [showAllDrilldown, setShowAllDrilldown] = useState(false);
    const [selectedStakeholder, setSelectedStakeholder] = useState(null);
    const [stakeholderDrilldownOpen, setStakeholderDrilldownOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'replanning', 'late'
    const chartRef = useRef(null);

    // Mock data for overdue tasks by stakeholder and status
    const overdueData = {
        stakeholders: [
            'Michael Chen', 'Sarah Williams', 'Robert Taylor', 'Priya Sharma', 'John Smith'
        ],
        // Tasks that are not started yet but are overdue
        newTasks: [4, 2, 1, 3, 0],
        // Tasks that are in progress but will miss the deadline
        activeTasks: [3, 5, 2, 1, 2],
        // Tasks that were completed late
        completedLateTasks: [5, 2, 3, 2, 3]
    };

    // Calculate totals for each stakeholder
    const totalOverdueTasks = overdueData.stakeholders.map((_, index) => {
        return (
            overdueData.newTasks[index] +
            overdueData.activeTasks[index] +
            overdueData.completedLateTasks[index]
        );
    });

    // Find the stakeholder with most overdue tasks
    const maxOverdueTasks = Math.max(...totalOverdueTasks);
    const worstPerformerIndex = totalOverdueTasks.indexOf(maxOverdueTasks);

    // Calculate total overdue tasks
    const totalOverdue = totalOverdueTasks.reduce((sum, count) => sum + count, 0);
    const requiresReplanningTotal = overdueData.newTasks.reduce((sum, count) => sum + count, 0) +
        overdueData.activeTasks.reduce((sum, count) => sum + count, 0);
    const completedLateTotal = overdueData.completedLateTasks.reduce((sum, count) => sum + count, 0);

    // Sample task data for drilldown
    const taskData = {
        'Michael Chen': {
            new: [
                { id: 'task-1', title: 'Database Schema Design', status: 'New', plannedStart: 'Apr 10, 2025', plannedEnd: 'Apr 15, 2025', actualStart: null, actualEnd: null, variance: '5 days', impactedMilestone: 'Data Design' },
                { id: 'task-2', title: 'API Integration', status: 'New', plannedStart: 'Apr 5, 2025', plannedEnd: 'Apr 12, 2025', actualStart: null, actualEnd: null, variance: '8 days', impactedMilestone: 'Integration' }
            ],
            active: [
                { id: 'task-3', title: 'Performance Testing', status: 'Active', plannedStart: 'Apr 1, 2025', plannedEnd: 'Apr 8, 2025', actualStart: 'Apr 3, 2025', actualEnd: null, variance: '10 days', impactedMilestone: 'Testing Complete' }
            ],
            completedLate: [
                { id: 'task-4', title: 'Code Reviews', status: 'Completed', plannedStart: 'Mar 25, 2025', plannedEnd: 'Apr 1, 2025', actualStart: 'Mar 26, 2025', actualEnd: 'Apr 5, 2025', variance: '4 days', impactedMilestone: 'Development Complete' }
            ]
        },
        'Sarah Williams': {
            new: [
                { id: 'task-5', title: 'User Training Materials', status: 'New', plannedStart: 'Apr 12, 2025', plannedEnd: 'Apr 18, 2025', actualStart: null, actualEnd: null, variance: '2 days', impactedMilestone: 'Training' }
            ],
            active: [
                { id: 'task-6', title: 'UI Component Library', status: 'Active', plannedStart: 'Apr 3, 2025', plannedEnd: 'Apr 9, 2025', actualStart: 'Apr 4, 2025', actualEnd: null, variance: '6 days', impactedMilestone: 'Design System' },
                { id: 'task-7', title: 'User Documentation', status: 'Active', plannedStart: 'Apr 5, 2025', plannedEnd: 'Apr 10, 2025', actualStart: 'Apr 6, 2025', actualEnd: null, variance: '5 days', impactedMilestone: 'Documentation' }
            ],
            completedLate: [
                { id: 'task-8', title: 'Wireframes', status: 'Completed', plannedStart: 'Mar 28, 2025', plannedEnd: 'Apr 3, 2025', actualStart: 'Mar 29, 2025', actualEnd: 'Apr 6, 2025', variance: '3 days', impactedMilestone: 'Design Complete' }
            ]
        }
    };

    // Fill in mock data for remaining stakeholders
    overdueData.stakeholders.forEach(stakeholder => {
        if (!taskData[stakeholder]) {
            taskData[stakeholder] = {
                new: [],
                active: [],
                completedLate: []
            };
        }
    });

    // Get all tasks for drilldown
    const getAllTasks = () => {
        const allTasks = {
            new: [],
            active: [],
            completedLate: []
        };

        Object.values(taskData).forEach(stakeholderTasks => {
            allTasks.new = [...allTasks.new, ...stakeholderTasks.new];
            allTasks.active = [...allTasks.active, ...stakeholderTasks.active];
            allTasks.completedLate = [...allTasks.completedLate, ...stakeholderTasks.completedLate];
        });

        return allTasks;
    };

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
                let result = `<div><strong>${stakeholder}</strong></div>`;

                params.forEach(param => {
                    total += param.value;
                    let statusText = '';
                    if (param.seriesName === 'New') statusText = 'Not Started & Overdue';
                    else if (param.seriesName === 'Active') statusText = 'In Progress & At Risk';
                    else statusText = 'Completed Late';

                    result += `<div style="display:flex;justify-content:space-between;margin-top:4px;">
                        <div>
                            <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${param.color};"></span>
                            ${statusText}:
                        </div>
                        <div style="font-weight:bold;margin-left:20px;">${param.value} tasks</div>
                    </div>`;
                });

                result += `<div style="margin-top:6px;border-top:1px solid rgba(0,0,0,0.1);padding-top:4px;">
                    <div style="display:flex;justify-content:space-between;">
                        <div>Total:</div>
                        <div style="font-weight:bold;">${total} tasks</div>
                    </div>
                </div>`;

                return result;
            }
        },
        legend: {
            data: ['New', 'Active', 'Completed Late'],
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
            name: 'Tasks',
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
            data: overdueData.stakeholders,
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
                name: 'New',
                type: 'bar',
                stack: 'total',
                itemStyle: {
                    color: '#6C8893' // Gray
                },
                emphasis: {
                    focus: 'series'
                },
                data: overdueData.newTasks
            },
            {
                name: 'Active',
                type: 'bar',
                stack: 'total',
                itemStyle: {
                    color: '#5899DA' // Blue
                },
                emphasis: {
                    focus: 'series'
                },
                data: overdueData.activeTasks
            },
            {
                name: 'Completed Late',
                type: 'bar',
                stack: 'total',
                itemStyle: {
                    color: '#E60017' // Red
                },
                emphasis: {
                    focus: 'series'
                },
                data: overdueData.completedLateTasks
            }
        ]
    };

    // Handle chart events
    const onChartClick = (params) => {
        if (params.componentType === 'series') {
            const stakeholder = params.name;
            setSelectedStakeholder(stakeholder);
            setStakeholderDrilldownOpen(true);
        }
    };

    // Helper function to get status color
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'new': return 'bg-gray-100 text-gray-800';
            case 'active': return 'bg-blue-100 text-blue-800';
            case 'completed': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    // Helper function to get variance color
    const getVarianceColor = (variance) => {
        if (!variance) return '';
        return 'text-red-600';
    };

    // Get filtered tasks based on selected filter
    const getFilteredTasks = (tasksObj) => {
        if (activeFilter === 'all') {
            return [...tasksObj.new, ...tasksObj.active, ...tasksObj.completedLate];
        } else if (activeFilter === 'replanning') {
            return [...tasksObj.new, ...tasksObj.active];
        } else if (activeFilter === 'late') {
            return [...tasksObj.completedLate];
        }
        return [];
    };

    // Create separate handler functions that update the filter without closing modals
    // Using useCallback to prevent unnecessary re-renders
    const handleFilterChange = useCallback((filter) => {
        setActiveFilter(filter);
    }, []);

    // Task table for the drilldown
    const renderTasksTable = (tasks) => {
        return (
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Task
                        </th>
                        <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Planned Start
                        </th>
                        <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Planned End
                        </th>
                        <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actual Start
                        </th>
                        <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actual End
                        </th>
                        <th scope="col" className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Variance
                        </th>
                        <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Impacted Milestone
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {tasks.map((task) => (
                        <tr key={task.id} className="hover:bg-gray-50">
                            <td className="px-3 py-3 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{task.title}</div>
                            </td>
                            <td className="px-3 py-3 text-center whitespace-nowrap">
                                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(task.status)}`}>
                                    {task.status}
                                </span>
                            </td>
                            <td className="px-3 py-3 text-center whitespace-nowrap text-sm text-gray-600">
                                {task.plannedStart}
                            </td>
                            <td className="px-3 py-3 text-center whitespace-nowrap text-sm text-gray-600">
                                {task.plannedEnd}
                            </td>
                            <td className="px-3 py-3 text-center whitespace-nowrap text-sm text-gray-600">
                                {task.actualStart || "-"}
                            </td>
                            <td className="px-3 py-3 text-center whitespace-nowrap text-sm text-gray-600">
                                {task.actualEnd || "-"}
                            </td>
                            <td className="px-3 py-3 text-center whitespace-nowrap">
                                <span className={`text-sm font-medium ${getVarianceColor(task.variance)}`}>
                                    {task.variance}
                                </span>
                            </td>
                            <td className="px-3 py-3 whitespace-nowrap text-sm">
                                {task.impactedMilestone ? (
                                    <span className="text-amber-700 font-medium">{task.impactedMilestone}</span>
                                ) : (
                                    <span className="text-gray-500">None</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    // Stakeholder-specific drilldown modal
    const StakeholderDrilldownModal = () => {
        if (!selectedStakeholder) return null;
        const stakeholderTasks = taskData[selectedStakeholder];
        const filteredTasks = getFilteredTasks(stakeholderTasks);

        // Function to render the tasks table with the new columns
        const renderTasksTable = (tasks) => (
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            S No
                        </th>
                        <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Title
                        </th>
                        <th scope="col" className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th scope="col" className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Baseline End
                        </th>
                        <th scope="col" className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Planned End
                        </th>
                        <th scope="col" className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actual End
                        </th>
                        <th scope="col" className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Overdue Days
                        </th>
                        <th scope="col" className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Impacted Deliverable Group
                        </th>
                        <th scope="col" className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Variance
                        </th>
                        <th scope="col" className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Impacted Milestone
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {tasks.map((task, index) => (
                        <tr key={task.id} className="hover:bg-gray-50">
                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">
                                {index + 1}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="text-xs font-medium text-gray-900">{task.title}</div>
                                </div>
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-center">
                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                    ${task.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                        task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                                            'bg-gray-100 text-gray-800'}`}>
                                    {task.status}
                                </span>
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500 text-center">
                                {task.baselineEnd}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500 text-center">
                                {task.plannedEnd}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500 text-center">
                                {task.actualEnd || '-'}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500 text-center">
                                {task.overdueDays > 0 ? (
                                    <span className="text-red-500 font-medium">{task.overdueDays}</span>
                                ) : (
                                    task.overdueDays || '0'
                                )}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500 text-center">
                                {task.impactedDeliverableGroup || '-'}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500 text-center">
                                {task.variance ? (
                                    <span className={task.variance > 0 ? 'text-red-500' : 'text-green-500'}>
                                        {task.variance > 0 ? `+${task.variance}` : task.variance}
                                    </span>
                                ) : '0'}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500 text-center">
                                {task.impactedMilestone || '-'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );

        return (
            <Transition appear show={stakeholderDrilldownOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setStakeholderDrilldownOpen(false)}>
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
                                <Dialog.Panel className="w-full max-w-6xl transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all">
                                    <div className="flex justify-between items-center mb-4">
                                        <Dialog.Title as="h3" className="text-md font-semibold text-gray-900">
                                            Overdue Tasks: {selectedStakeholder}
                                        </Dialog.Title>
                                        <button
                                            type="button"
                                            onClick={() => setStakeholderDrilldownOpen(false)}
                                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        >
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>

                                    <div className="mb-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div
                                                className="bg-blue-50 border border-blue-200 rounded-lg p-3"
                                                onClick={() => handleFilterChange('replanning')}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <div className="font-medium text-sm text-blue-900 mb-1">May Require Replanning</div>
                                                <div className="flex items-center justify-between">
                                                    <div className="text-2xl font-bold text-blue-800">
                                                        {stakeholderTasks.new.length + stakeholderTasks.active.length}
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <div className="flex items-center">
                                                            <div className="w-3 h-3 rounded-full bg-gray-500 mr-1"></div>
                                                            <span className="text-xs text-gray-700">{stakeholderTasks.new.length} Not Started</span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                                                            <span className="text-xs text-gray-700">{stakeholderTasks.active.length} In Progress</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className="bg-red-50 border border-red-200 rounded-lg p-3"
                                                onClick={() => handleFilterChange('late')}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <div className="font-medium text-sm text-red-900 mb-1">Completed Late</div>
                                                <div className="flex items-center justify-between">
                                                    <div className="text-2xl font-bold text-red-800">
                                                        {stakeholderTasks.completedLate.length}
                                                    </div>
                                                    <div className="text-xs text-gray-700">
                                                        Tasks completed past deadline
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border rounded-lg overflow-hidden mb-3">
                                        <div className="flex bg-gray-50 p-2 border-b">
                                            <button
                                                className={`px-4 py-1 text-sm rounded ${activeFilter === 'all' ? 'bg-white shadow-sm font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
                                                onClick={() => handleFilterChange('all')}
                                            >
                                                All Tasks
                                            </button>
                                            <button
                                                className={`px-4 py-1 text-sm rounded ${activeFilter === 'replanning' ? 'bg-white shadow-sm font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
                                                onClick={() => handleFilterChange('replanning')}
                                            >
                                                Requires Replanning
                                            </button>
                                            <button
                                                className={`px-4 py-1 text-sm rounded ${activeFilter === 'late' ? 'bg-white shadow-sm font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
                                                onClick={() => handleFilterChange('late')}
                                            >
                                                Completed Late
                                            </button>
                                        </div>

                                        <div className="max-h-[40vh] overflow-y-auto">
                                            {filteredTasks.length > 0 ? (
                                                renderTasksTable(filteredTasks)
                                            ) : (
                                                <div className="p-4 text-sm text-gray-500">No tasks match the selected filter</div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="text-xs text-gray-500">
                                        Note: Click on the section cards above to filter tasks
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        );
    };

    // All tasks drilldown modal
    const AllTasksDrilldownModal = () => {
        const allTasks = getAllTasks();
        const filteredTasks = getFilteredTasks(allTasks);

        // Function to render the tasks table with the new columns
        const renderTasksTable = (tasks) => (
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            S No
                        </th>
                        <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Title
                        </th>
                        <th scope="col" className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th scope="col" className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Baseline End
                        </th>
                        <th scope="col" className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Planned End
                        </th>
                        <th scope="col" className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actual End
                        </th>
                        <th scope="col" className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Overdue Days
                        </th>
                        <th scope="col" className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Impacted Deliverable Group
                        </th>
                        <th scope="col" className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Variance
                        </th>
                        <th scope="col" className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Impacted Milestone
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {tasks.map((task, index) => (
                        <tr key={task.id} className="hover:bg-gray-50">
                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">
                                {index + 1}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="text-sm font-medium text-gray-900">{task.title}</div>
                                </div>
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-center">
                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                    ${task.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                        task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                                            'bg-gray-100 text-gray-800'}`}>
                                    {task.status}
                                </span>
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500 text-center">
                                {task.baselineEnd}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500 text-center">
                                {task.plannedEnd}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500 text-center">
                                {task.actualEnd || '-'}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500 text-center">
                                {task.overdueDays > 0 ? (
                                    <span className="text-red-500 font-medium">{task.overdueDays}</span>
                                ) : (
                                    task.overdueDays || '0'
                                )}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500 text-center">
                                {task.impactedDeliverableGroup || '-'}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500 text-center">
                                {task.variance ? (
                                    <span className={task.variance > 0 ? 'text-red-500' : 'text-green-500'}>
                                        {task.variance > 0 ? `+${task.variance}` : task.variance}
                                    </span>
                                ) : '0'}
                            </td>
                            <td className="px-3 py-2 whitespace-nowrap text-xs text-gray-500 text-center">
                                {task.impactedMilestone || '-'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );

        return (
            <Transition appear show={showAllDrilldown} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setShowAllDrilldown(false)}>
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
                                <Dialog.Panel className="w-full max-w-6xl transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all">
                                    <div className="flex justify-between items-center mb-4">
                                        <Dialog.Title as="h3" className="text-md font-semibold text-gray-900">
                                            All Overdue Tasks
                                        </Dialog.Title>
                                        <button
                                            type="button"
                                            onClick={() => setShowAllDrilldown(false)}
                                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        >
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>

                                    <div className="mb-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div
                                                className="bg-blue-50 border border-blue-200 rounded-lg p-3"
                                                onClick={() => handleFilterChange('replanning')}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <div className="font-medium text-sm text-blue-900 mb-1">May Require Replanning</div>
                                                <div className="flex items-center justify-between">
                                                    <div className="text-2xl font-bold text-blue-800">
                                                        {allTasks.new.length + allTasks.active.length}
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <div className="flex items-center">
                                                            <div className="w-3 h-3 rounded-full bg-gray-500 mr-1"></div>
                                                            <span className="text-xs text-gray-700">{allTasks.new.length} Not Started</span>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                                                            <span className="text-xs text-gray-700">{allTasks.active.length} In Progress</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className="bg-red-50 border border-red-200 rounded-lg p-3"
                                                onClick={() => handleFilterChange('late')}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <div className="font-medium text-sm text-red-900 mb-1">Completed Late</div>
                                                <div className="flex items-center justify-between">
                                                    <div className="text-2xl font-bold text-red-800">
                                                        {allTasks.completedLate.length}
                                                    </div>
                                                    <div className="text-xs text-gray-700">
                                                        Tasks completed past deadline
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border rounded-lg overflow-hidden mb-3">
                                        <div className="flex bg-gray-50 p-2 border-b">
                                            <button
                                                className={`px-4 py-1 text-sm rounded ${activeFilter === 'all' ? 'bg-white shadow-sm font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
                                                onClick={() => handleFilterChange('all')}
                                            >
                                                All Tasks
                                            </button>
                                            <button
                                                className={`px-4 py-1 text-sm rounded ${activeFilter === 'replanning' ? 'bg-white shadow-sm font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
                                                onClick={() => handleFilterChange('replanning')}
                                            >
                                                Requires Replanning
                                            </button>
                                            <button
                                                className={`px-4 py-1 text-sm rounded ${activeFilter === 'late' ? 'bg-white shadow-sm font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
                                                onClick={() => handleFilterChange('late')}
                                            >
                                                Completed Late
                                            </button>
                                        </div>

                                        <div className="max-h-[40vh] overflow-y-auto">
                                            {filteredTasks.length > 0 ? (
                                                renderTasksTable(filteredTasks)
                                            ) : (
                                                <div className="p-4 text-sm text-gray-500">No tasks match the selected filter</div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="text-xs text-gray-500">
                                        Note: Click on the section cards above to filter tasks
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        );
    };

    return (
        <div className="bg-white rounded-lg shadow p-5 border-t-4 border-red-500">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-medium text-gray-700">Overdue Tasks by Stakeholder</h3>
                    <div className="text-xs text-gray-500">
                        Tasks that require attention or were completed past deadline
                    </div>
                </div>
                <div className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded flex items-center">
                    {totalOverdue} Overdue Tasks
                </div>
            </div>

            <div className="mb-4">
                <div className="flex justify-between items-end">
                    <div className="text-sm text-gray-700">
                        <span className="font-medium">{requiresReplanningTotal} tasks</span> require replanning
                    </div>
                    <div className="text-sm text-gray-700">
                        <span className="font-medium">{completedLateTotal} tasks</span> completed late
                    </div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                    Most overdue: <span className="font-medium text-red-600">{overdueData.stakeholders[worstPerformerIndex]}</span> ({maxOverdueTasks} tasks)
                </div>
            </div>

            <div className="h-64">
                <ReactECharts
                    ref={chartRef}
                    option={option}
                    style={{ height: '100%', width: '100%' }}
                    opts={{ renderer: 'canvas' }}
                    onEvents={{
                        'click': onChartClick
                    }}
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
                        <div className="w-2 h-2 rounded-full bg-gray-500 mr-1"></div>
                        <span>Not Started</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div>
                        <span>In Progress</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                        <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
                        <span>Completed Late</span>
                    </div>
                </div>
                <button
                    onClick={() => {
                        handleFilterChange('all');
                        setShowAllDrilldown(true);
                    }}
                    className="text-blue-600 hover:underline focus:outline-none"
                >
                    Details
                </button>
            </div>

            {/* Stakeholder-specific drilldown modal */}
            <StakeholderDrilldownModal />

            {/* All tasks drilldown modal */}
            <AllTasksDrilldownModal />
        </div>
    );
};

export default OverdueTasksByStakeholder;