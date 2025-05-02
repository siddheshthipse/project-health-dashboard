import React, { useState, Fragment } from 'react';
import { Dialog, Transition, Listbox } from '@headlessui/react';
import { XMarkIcon, SparklesIcon, ArrowsPointingInIcon, ArrowsPointingOutIcon, ChevronDownIcon, ChevronRightIcon, CheckIcon } from '@heroicons/react/20/solid';
import ReactECharts from 'echarts-for-react';

const BaselineVersionDropdown = ({
    selectedBaselineVersion,
    setSelectedBaselineVersion,
    baselineVersions,
    comparisonMode
}) => {
    const showDropdown = comparisonMode === 'planned-baseline' ||
        comparisonMode === 'actual-baseline' ||
        comparisonMode === 'planned-actual-baseline';

    if (!showDropdown) return null;

    const selectedVersion = baselineVersions.find(v => v.id === selectedBaselineVersion) || baselineVersions[0];

    return (
        <div className="flex items-center w-56">
            <span className="text-xs text-gray-500 mr-2">Baseline Version:</span>
            <Listbox value={selectedBaselineVersion} onChange={setSelectedBaselineVersion}>
                <div className="relative flex-1">
                    <Listbox.Button className="relative w-full flex items-center justify-between text-xs border border-gray-300 rounded py-1.5 px-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white shadow-sm">
                        <span className="block truncate">{selectedVersion.name}</span>
                        <ChevronDownIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-xs shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {baselineVersions.map((version) => (
                                <Listbox.Option
                                    key={version.id}
                                    value={version.id}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 px-3 ${active ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700'
                                        }`
                                    }
                                >
                                    {({ selected, active }) => (
                                        <>
                                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                {version.name}
                                            </span>
                                            {selected && (
                                                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-indigo-600">
                                                    <CheckIcon className="h-4 w-4" aria-hidden="true" />
                                                </span>
                                            )}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
}

const TaskTableModal = ({
    dataPointModalOpen,
    setDataPointModalOpen,
    selectedMonth,
    selectedTaskView,
    taskData
}) => {
    const [activeTab, setActiveTab] = useState(selectedTaskView);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [expandedNodes, setExpandedNodes] = useState({});

    // Get all tasks for the tree structure
    const getTasksForMonth = () => {
        return taskData;
    };

    const tasks = getTasksForMonth();

    // Calculate planned and actual completion percentages
    const calculateCompletionPercentages = () => {
        let totalPlanned = 0;
        let totalActual = 0;
        let taskCount = 0;

        const calculatePercentages = (taskList) => {
            taskList.forEach(task => {
                totalPlanned += task.plannedMilestonePercent || 0;
                totalActual += task.actualMilestonePercent || 0;
                taskCount++;

                if (task.children && task.children.length > 0) {
                    calculatePercentages(task.children);
                }
            });
        };

        calculatePercentages(tasks);

        return {
            planned: taskCount > 0 ? Math.round(totalPlanned / taskCount) : 0,
            actual: taskCount > 0 ? Math.round(totalActual / taskCount) : 0
        };
    };

    const completionPercentages = calculateCompletionPercentages();

    // Toggle node expansion
    const toggleNodeExpansion = (nodeId) => {
        setExpandedNodes(prev => ({
            ...prev,
            [nodeId]: !prev[nodeId]
        }));
    };

    // Render table rows recursively to create a tree structure
    const renderTreeRows = (tasks, level = 0) => {
        return tasks.map(task => {
            // Check if this node has children
            const hasChildren = task.children && task.children.length > 0;
            // Check if this node is expanded
            const isExpanded = expandedNodes[task.id];

            return (
                <Fragment key={task.id}>
                    <tr className={`hover:bg-gray-50 ${level > 0 ? 'bg-gray-50' : ''}`}>
                        <td className="p-3 text-center whitespace-nowrap text-xs text-gray-600">
                            {task.wbs}
                        </td>
                        <td className="p-3">
                            <div className="flex items-center" style={{ paddingLeft: `${level * 20}px` }}>
                                {hasChildren && (
                                    <button
                                        onClick={() => toggleNodeExpansion(task.id)}
                                        className="mr-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                    >
                                        {isExpanded ?
                                            <ChevronDownIcon className="h-4 w-4 text-gray-500" /> :
                                            <ChevronRightIcon className="h-4 w-4 text-gray-500" />
                                        }
                                    </button>
                                )}
                                <span className="font-medium text-xs text-gray-700">{task.title}</span>
                            </div>
                        </td>
                        <td className="p-3 text-center whitespace-nowrap text-xs text-gray-600">
                            {task.type}
                        </td>
                        <td className="p-3 text-center whitespace-nowrap text-xs text-gray-600">
                            {task.baselineEnd}
                        </td>
                        <td className="p-3 text-center whitespace-nowrap text-xs text-gray-600">
                            {task.plannedEnd}
                        </td>
                        <td className="p-3 text-center whitespace-nowrap text-xs text-gray-600">
                            {task.plannedMilestonePercent}%
                        </td>
                        <td className="p-3 text-center whitespace-nowrap text-xs text-gray-600">
                            {task.actualMilestonePercent}%
                        </td>
                        <td className="p-3 text-center whitespace-nowrap text-xs text-gray-600">
                            {task.slackDays}
                        </td>
                        <td className="p-3 text-center whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${task.baseline ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                {task.baseline ? 'Yes' : 'No'}
                            </span>
                        </td>
                        <td className="p-3 text-center whitespace-nowrap text-xs text-gray-600">
                            {task.overdueDays}
                        </td>
                        <td className="p-3 text-center whitespace-nowrap text-xs text-gray-600">
                            {task.delayLog}
                        </td>
                    </tr>
                    {/* Render children recursively if expanded */}
                    {hasChildren && isExpanded && renderTreeRows(task.children, level + 1)}
                </Fragment>
            );
        });
    };

    if (!selectedMonth) return null;

    return (
        <Transition appear show={dataPointModalOpen} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-50"
                onClose={() => {
                    setDataPointModalOpen(false);
                    // Reset full screen state when closing
                    setIsFullScreen(false);
                }}
            >
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
                    <div className={`flex min-h-full items-center justify-center ${isFullScreen ? 'p-0' : 'p-4'}`}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel
                                className={`${isFullScreen ? 'w-screen h-screen m-0 rounded-none' : 'w-full max-w-4xl rounded-lg'} transform overflow-hidden bg-white p-6 shadow-xl transition-all`}
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <Dialog.Title as="h3" className="text-md font-semibold text-gray-900">
                                        Planned vs Actual Tasks as of {selectedMonth} 2025
                                    </Dialog.Title>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            type="button"
                                            onClick={() => setIsFullScreen(!isFullScreen)}
                                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        >
                                            {isFullScreen ?
                                                <ArrowsPointingInIcon className="h-4 w-6" aria-hidden="true" /> :
                                                <ArrowsPointingOutIcon className="h-4 w-6" aria-hidden="true" />
                                            }
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setDataPointModalOpen(false);
                                                setIsFullScreen(false);
                                            }}
                                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        >
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>

                                {/* Card filters at the top */}
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div
                                        className={`cursor-pointer rounded-lg p-4 border ${activeTab === 'planned' ? 'bg-blue-50 border-blue-300' : 'bg-gray-50 border-gray-200'}`}
                                        onClick={() => setActiveTab('planned')}
                                    >
                                        <div className="text-xl font-bold text-gray-700">{completionPercentages.planned}%</div>
                                        <div className="text-xs text-gray-500">Planned Completion %</div>
                                    </div>
                                    <div
                                        className={`cursor-pointer rounded-lg p-4 border ${activeTab === 'actual' ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-200'}`}
                                        onClick={() => setActiveTab('actual')}
                                    >
                                        <div className="text-xl font-bold text-gray-700">{completionPercentages.actual}%</div>
                                        <div className="text-xs text-gray-500">Actual Completion %</div>
                                    </div>
                                </div>

                                {/* Tab content */}
                                <div className={`border rounded-lg overflow-hidden ${isFullScreen ? 'h-[calc(100vh-200px)]' : 'max-h-[50vh]'} overflow-y-auto`}>
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50 sticky top-0">
                                            <tr>
                                                <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    WBS
                                                </th>
                                                <th scope="col" className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Title
                                                </th>
                                                <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Type
                                                </th>
                                                <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Baseline End
                                                </th>
                                                <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Planned End
                                                </th>
                                                <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Planned %
                                                </th>
                                                <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Actual %
                                                </th>
                                                <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Slack Days
                                                </th>
                                                <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Baseline
                                                </th>
                                                <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Overdue Days
                                                </th>
                                                <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Delay Log
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {renderTreeRows(tasks)}
                                        </tbody>
                                    </table>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

const TimelineComparisonChart = () => {
    const [comparisonMode, setComparisonMode] = useState('planned-actual-baseline');
    const [showForecast, setShowForecast] = useState(false);
    const [dataPointModalOpen, setDataPointModalOpen] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedTaskView, setSelectedTaskView] = useState('planned');

    // Selected baseline version 
    const [selectedBaselineVersion, setSelectedBaselineVersion] = useState('baseline-1');

    // Sample baseline versions
    const baselineVersions = [
        { id: 'baseline-1', name: 'Baseline 1', data: [10, 22, 35, 50, 65, 80, 90, 100, null] },
        { id: 'baseline-2', name: 'Baseline 2', data: [8, 20, 32, 48, 62, 78, 88, 98, null] },
        { id: 'baseline-3', name: 'Baseline 3', data: [12, 25, 38, 52, 68, 82, 92, 102, null] }
    ];

    // Sample project progress data (percentages)
    const projectData = {
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        planned: [5, 15, 30, 45, 60, 75, 85, 95, 100],
        actual: [5, 13, 25, 38, 48, 60, null, null, null], // null for future months
        forecast: [5, 13, 25, 38, 48, 60, 69, 80, 92] // AI-generated forecast
    };

    // Enhanced task data with hierarchical structure
    const taskData = [
        {
            id: 'phase-1',
            wbs: '1',
            title: 'Project Initiation',
            type: 'Phase',
            baselineEnd: 'Jan 15, 2025',
            plannedEnd: 'Jan 20, 2025',
            plannedMilestonePercent: 100,
            actualMilestonePercent: 100,
            slackDays: 0,
            baseline: true,
            overdueDays: 0,
            delayLog: 'None',
            children: [
                {
                    id: 'milestone-1',
                    wbs: '1.1',
                    title: 'Requirements Gathering',
                    type: 'Milestone',
                    baselineEnd: 'Jan 8, 2025',
                    plannedEnd: 'Jan 10, 2025',
                    plannedMilestonePercent: 100,
                    actualMilestonePercent: 100,
                    slackDays: 2,
                    baseline: true,
                    overdueDays: 0,
                    delayLog: 'None',
                    children: [
                        {
                            id: 'deliv-group-1',
                            wbs: '1.1.1',
                            title: 'Business Requirements',
                            type: 'Deliverable Group',
                            baselineEnd: 'Jan 3, 2025',
                            plannedEnd: 'Jan 5, 2025',
                            plannedMilestonePercent: 100,
                            actualMilestonePercent: 100,
                            slackDays: 1,
                            baseline: true,
                            overdueDays: 0,
                            delayLog: 'None',
                            children: []
                        }
                    ]
                }
            ]
        },
        {
            id: 'phase-2',
            wbs: '2',
            title: 'Design & Planning',
            type: 'Phase',
            baselineEnd: 'Feb 5, 2025',
            plannedEnd: 'Feb 10, 2025',
            plannedMilestonePercent: 100,
            actualMilestonePercent: 95,
            slackDays: 0,
            baseline: true,
            overdueDays: 5,
            delayLog: 'Resource constraints',
            children: [
                {
                    id: 'milestone-2',
                    wbs: '2.1',
                    title: 'System Architecture',
                    type: 'Milestone',
                    baselineEnd: 'Feb 1, 2025',
                    plannedEnd: 'Feb 5, 2025',
                    plannedMilestonePercent: 100,
                    actualMilestonePercent: 95,
                    slackDays: 0,
                    baseline: true,
                    overdueDays: 3,
                    delayLog: 'Technical challenges',
                    children: []
                }
            ]
        },
        {
            id: 'phase-3',
            wbs: '3',
            title: 'Development',
            type: 'Phase',
            baselineEnd: 'May 10, 2025',
            plannedEnd: 'May 15, 2025',
            plannedMilestonePercent: 60,
            actualMilestonePercent: 45,
            slackDays: 5,
            baseline: true,
            overdueDays: 0,
            delayLog: 'In progress',
            children: [
                {
                    id: 'milestone-3',
                    wbs: '3.1',
                    title: 'Backend Development',
                    type: 'Milestone',
                    baselineEnd: 'Apr 15, 2025',
                    plannedEnd: 'Apr 20, 2025',
                    plannedMilestonePercent: 70,
                    actualMilestonePercent: 60,
                    slackDays: 3,
                    baseline: true,
                    overdueDays: 0,
                    delayLog: 'In progress',
                    children: []
                },
                {
                    id: 'milestone-4',
                    wbs: '3.2',
                    title: 'Frontend Development',
                    type: 'Milestone',
                    baselineEnd: 'Apr 30, 2025',
                    plannedEnd: 'May 5, 2025',
                    plannedMilestonePercent: 50,
                    actualMilestonePercent: 35,
                    slackDays: 2,
                    baseline: true,
                    overdueDays: 0,
                    delayLog: 'In progress',
                    children: []
                }
            ]
        }
    ];

    // Generate chart options based on selected comparison mode
    const getChartOptions = () => {
        // Base series for the selected comparison mode
        let series = [];

        // Add planned line
        if (comparisonMode === 'planned-actual' || comparisonMode === 'planned-baseline' || comparisonMode === 'planned-actual-baseline') {
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
                symbolSize: 6
                // Milestone markPoints removed as requested
            });
        }

        // Add actual line
        if (comparisonMode === 'planned-actual' || comparisonMode === 'actual-baseline' || comparisonMode === 'planned-actual-baseline') {
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
                symbolSize: 6
                // Milestone markPoints removed as requested
            });
        }

        // Get selected baseline data
        const selectedBaseline = baselineVersions.find(b => b.id === selectedBaselineVersion);
        const baselineData = selectedBaseline ? selectedBaseline.data : baselineVersions[0].data;

        // Add baseline line
        if (comparisonMode === 'planned-baseline' || comparisonMode === 'actual-baseline' || comparisonMode === 'planned-actual-baseline') {
            const baselineName = selectedBaseline ? selectedBaseline.name : 'Baseline 1';
            series.push({
                name: baselineName,
                type: 'line',
                data: baselineData,
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
                symbolSize: 4
                // Milestone markPoints removed as requested
            });
        }

        // Prepare and return the chart options
        return {
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
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

    // Handle chart click
    const handleChartClick = (params) => {
        // Handle clicks on line data points
        if (params.seriesType === 'line') {
            const monthIndex = params.dataIndex; // 0 for Jan, 1 for Feb, etc.
            const seriesName = params.seriesName; // 'Planned' or 'Actual'

            if (seriesName === 'Planned' || seriesName === 'Actual') {
                setSelectedMonth(projectData.months[monthIndex]);
                setSelectedTaskView(seriesName.toLowerCase());
                setDataPointModalOpen(true);
            }
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-5">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <h3 className="font-medium text-gray-800">Project Progress Timeline</h3>
                    <span className="text-xs text-gray-500">Track project progress against plan, baseline and forecasts</span>
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setComparisonMode('planned-actual-baseline')}
                        className={`px-2 py-1 text-xs rounded ${comparisonMode === 'planned-actual-baseline' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700'
                            }`}
                    >
                        Planned vs Actual vs Baseline
                    </button>
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

            {/* Baseline version selection for baseline comparisons */}
            <div className="mb-4 flex justify-between items-center">
                {/* Left-aligned forecast button */}
                <div>
                    <button
                        onClick={() => setShowForecast(!showForecast)}
                        className={`flex items-center px-3 py-1.5 text-sm rounded-md ${showForecast
                            ? 'bg-orange-100 text-orange-700 border border-orange-200'
                            : 'bg-gray-100 text-gray-700 border border-gray-200'
                            }`}
                    >
                        <SparklesIcon className="h-4 w-4 mr-1" />
                        {showForecast ? 'Hide AI Forecast' : 'Generate KTern.AI Forecast'}
                    </button>
                </div>

                {/* Right-aligned baseline dropdown */}
                <BaselineVersionDropdown
                    selectedBaselineVersion={selectedBaselineVersion}
                    setSelectedBaselineVersion={setSelectedBaselineVersion}
                    baselineVersions={baselineVersions}
                    comparisonMode={comparisonMode}
                />
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

            {/* Milestone legend section removed as requested */}
            {/* <div className="mt-4 pt-3 border-t flex justify-end items-center text-xs text-gray-500">
            </div> */}

            {/* Task Table Modal */}
            <TaskTableModal
                dataPointModalOpen={dataPointModalOpen}
                setDataPointModalOpen={setDataPointModalOpen}
                selectedMonth={selectedMonth}
                selectedTaskView={selectedTaskView}
                taskData={taskData}
            />
        </div>
    );
};

export default TimelineComparisonChart;