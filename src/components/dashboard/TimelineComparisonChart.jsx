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
                                className={`${isFullScreen ? 'w-screen h-screen m-0 rounded-none' : 'w-full max-w-4xl rounded-lg'} transform overflow-hidden bg-white p-4 shadow-xl transition-all`}
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
                                        <div className="text-xl font-bold text-gray-700">61.1%</div>
                                        <div className="text-xs text-gray-500">Planned Completion %</div>
                                    </div>
                                    <div
                                        className={`cursor-pointer rounded-lg p-4 border ${activeTab === 'actual' ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-200'}`}
                                        onClick={() => setActiveTab('actual')}
                                    >
                                        <div className="text-xl font-bold text-gray-700">30.02%</div>
                                        <div className="text-xs text-gray-500">Actual Completion %</div>
                                    </div>
                                </div>

                                {/* Tab content */}
                                <div className="border rounded-lg overflow-hidden" style={{ minHeight: '300px' }}>
                                    <div style={{
                                        height: isFullScreen ? 'calc(100vh - 200px)' : '50vh',
                                        minHeight: '300px',
                                        maxHeight: isFullScreen ? 'calc(100vh - 200px)' : '50vh',
                                        overflowY: 'auto',
                                        overflowX: 'auto'
                                    }}>
                                        <table className="min-w-full divide-y divide-gray-200" style={{ minWidth: '1200px' }}>
                                            <thead className="bg-gray-50 sticky top-0 z-10">
                                                <tr>
                                                    <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap" style={{ minWidth: '80px', width: '80px' }}>
                                                        WBS
                                                    </th>
                                                    <th scope="col" className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap" style={{ minWidth: '400px', width: '200px' }}>
                                                        Title
                                                    </th>
                                                    <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap" style={{ minWidth: '80px', width: '80px' }}>
                                                        Type
                                                    </th>
                                                    <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap" style={{ minWidth: '120px', width: '120px' }}>
                                                        Baseline End
                                                    </th>
                                                    <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap" style={{ minWidth: '120px', width: '120px' }}>
                                                        Planned End
                                                    </th>
                                                    <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap" style={{ minWidth: '100px', width: '100px' }}>
                                                        Planned %
                                                    </th>
                                                    <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap" style={{ minWidth: '100px', width: '100px' }}>
                                                        Actual %
                                                    </th>
                                                    <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap" style={{ minWidth: '100px', width: '100px' }}>
                                                        Slack Days
                                                    </th>
                                                    <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap" style={{ minWidth: '100px', width: '100px' }}>
                                                        Baseline
                                                    </th>
                                                    <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap" style={{ minWidth: '120px', width: '120px' }}>
                                                        Overdue Days
                                                    </th>
                                                    <th scope="col" className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ minWidth: '150px', width: 'auto' }}>
                                                        Delay Log
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {renderTreeRows(tasks)}
                                            </tbody>
                                        </table>
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
        { id: 'baseline-1', name: 'Baseline 1', data: [0.26, 4.55, 9.59, 14.32, 18.87, 24.05, 28.78, 33.56, 37.95, 42.81, 47.85, 52.62, 57.19, 61.87, 66.77, 71.3, 75.98, 81.05, 85.62, 90.52, 95.23, 100] },
        { id: 'baseline-2', name: 'Baseline 2', data: [0.12, 1.11, 2.75, 5.63, 8.46, 11.6, 15.21, 19.26, 23.42, 28.19, 32.65, 38.07, 43.15, 48.72, 54.56, 60.23, 66.54, 73.07, 79.17, 86.17, 92.83, 98] },
        { id: 'baseline-3', name: 'Baseline 3', data: [0.28, 11.94, 19.5, 25.63, 31.39, 36.58, 41.79, 46.14, 50.66, 55.46, 59.49, 63.52, 67.42, 71.47, 75.12, 79.05, 82.47, 86.24, 89.58, 93.22, 96.74, 102] }
    ];

    // Sample project progress data (percentages)
    const projectData = {
        months: ["May 24", "Jun 24", "Jul 24", "Aug 24", "Sep 24", "Oct 24", "Nov 24", "Dec 24", "Jan 25", "Feb 25", "Mar 25", "Apr 25", "May 25", "Jun 25", "Jul 25", "Aug 25", "Sep 25", "Oct 25", "Nov 25", "Dec 25", "Jan 26", "Feb 26"],
        baseline: [0.08, 0.6, 2.64, 3.02, 3.39, 3.98, 4.14, 15.68, 21.38, 24.87, 31.64, 48.7, 58.88, 76.94, 86.08, 89.4, 92.73, 94.55, 96.36, 98.18, 99.09, 100],
        actual: [0.08, 1.71, 3.55, 9.24, 10.65, 12.9, 16.14, 18.98, 25.23, 27.15, 28.35, 29.77, 30.02, null, null, null, null, null, null, null, null, null],
        planned: [0.08, 0.59, 2.58, 2.87, 3.49, 3.87, 4.24, 15.53, 20.85, 24.25, 30.94, 50.04, 61.1, 80.04, 92.07, 93.52, 96.32, 97.6, 98.32, 98.74, 102.5, 100.71],
        forecast: [0.08, 1.71, 3.55, 9.24, 10.65, 12.9, 16.14, 18.98, 25.23, 27.15, 28.35, 29.77, 30.02, 75.44, 82.99, 86.09, 89.12, 90.56, 92.9, 94.79, 96.09, 97.28]
    };

    // Enhanced task data with hierarchical structure

    const taskData = [
        {
            id: 'phase-1',
            wbs: '1',
            title: 'Program Setup & Integration',
            type: 'Phase',
            baselineEnd: 'Aug 24, 2024',
            plannedEnd: 'Sep 10, 2024',
            plannedMilestonePercent: 100,
            actualMilestonePercent: 100,
            slackDays: 0,
            baseline: true,
            overdueDays: 0,
            delayLog: 'Completed',
            children: [
                {
                    id: 'milestone-1-1',
                    wbs: '1.1',
                    title: 'Program Charter & Governance',
                    type: 'Milestone',
                    baselineEnd: 'Jun 20, 2024',
                    plannedEnd: 'Jun 25, 2024',
                    plannedMilestonePercent: 100,
                    actualMilestonePercent: 100,
                    slackDays: 0,
                    baseline: true,
                    overdueDays: 0,
                    delayLog: 'Completed on time',
                    children: []
                },
                {
                    id: 'milestone-1-2',
                    wbs: '1.2',
                    title: 'Team Onboarding',
                    type: 'Milestone',
                    baselineEnd: 'Jul 15, 2024',
                    plannedEnd: 'Jul 20, 2024',
                    plannedMilestonePercent: 100,
                    actualMilestonePercent: 100,
                    slackDays: 0,
                    baseline: true,
                    overdueDays: 0,
                    delayLog: 'Completed with minor delays',
                    children: []
                }
            ]
        },
        {
            id: 'phase-2',
            wbs: '2',
            title: 'Discovery & Requirements',
            type: 'Phase',
            baselineEnd: 'Dec 15, 2024',
            plannedEnd: 'Dec 20, 2024',
            plannedMilestonePercent: 100,
            actualMilestonePercent: 80,
            slackDays: 5,
            baseline: true,
            overdueDays: 0,
            delayLog: 'On track with adjustments',
            children: [
                {
                    id: 'milestone-2-1',
                    wbs: '2.1',
                    title: 'Business Process Analysis',
                    type: 'Milestone',
                    baselineEnd: 'Oct 10, 2024',
                    plannedEnd: 'Oct 15, 2024',
                    plannedMilestonePercent: 100,
                    actualMilestonePercent: 100,
                    slackDays: 0,
                    baseline: true,
                    overdueDays: 0,
                    delayLog: 'Completed',
                    children: []
                },
                {
                    id: 'milestone-2-2',
                    wbs: '2.2',
                    title: 'System Requirements',
                    type: 'Milestone',
                    baselineEnd: 'Nov 25, 2024',
                    plannedEnd: 'Dec 05, 2024',
                    plannedMilestonePercent: 100,
                    actualMilestonePercent: 90,
                    slackDays: 3,
                    baseline: true,
                    overdueDays: 0,
                    delayLog: 'Minor scope adjustments',
                    children: []
                },
                {
                    id: 'milestone-2-3',
                    wbs: '2.3',
                    title: 'Data Migration Strategy',
                    type: 'Milestone',
                    baselineEnd: 'Dec 10, 2024',
                    plannedEnd: 'Dec 15, 2024',
                    plannedMilestonePercent: 100,
                    actualMilestonePercent: 60,
                    slackDays: 5,
                    baseline: true,
                    overdueDays: 0,
                    delayLog: 'In progress',
                    children: []
                }
            ]
        },
        {
            id: 'phase-3',
            wbs: '3',
            title: 'Design & Configuration',
            type: 'Phase',
            baselineEnd: 'Apr 30, 2025',
            plannedEnd: 'May 15, 2025',
            plannedMilestonePercent: 100,
            actualMilestonePercent: 30,
            slackDays: 0,
            baseline: true,
            overdueDays: 0,
            delayLog: 'In progress',
            children: [
                {
                    id: 'milestone-3-1',
                    wbs: '3.1',
                    title: 'System Architecture',
                    type: 'Milestone',
                    baselineEnd: 'Jan 25, 2025',
                    plannedEnd: 'Feb 05, 2025',
                    plannedMilestonePercent: 100,
                    actualMilestonePercent: 95,
                    slackDays: 0,
                    baseline: true,
                    overdueDays: 2,
                    delayLog: 'Minor technical issues',
                    children: []
                },
                {
                    id: 'milestone-3-2',
                    wbs: '3.2',
                    title: 'Application Configuration',
                    type: 'Milestone',
                    baselineEnd: 'Mar 20, 2025',
                    plannedEnd: 'Mar 30, 2025',
                    plannedMilestonePercent: 100,
                    actualMilestonePercent: 25,
                    slackDays: 0,
                    baseline: true,
                    overdueDays: 0,
                    delayLog: 'Early stages',
                    children: []
                },
                {
                    id: 'milestone-3-3',
                    wbs: '3.3',
                    title: 'Integration Design',
                    type: 'Milestone',
                    baselineEnd: 'Apr 15, 2025',
                    plannedEnd: 'Apr 20, 2025',
                    plannedMilestonePercent: 100,
                    actualMilestonePercent: 0,
                    slackDays: 0,
                    baseline: true,
                    overdueDays: 0,
                    delayLog: 'Not started',
                    children: []
                }
            ]
        },
        {
            id: 'phase-4',
            wbs: '4',
            title: 'Development & Integration',
            type: 'Phase',
            baselineEnd: 'Sep 30, 2025',
            plannedEnd: 'Oct 15, 2025',
            plannedMilestonePercent: 100,
            actualMilestonePercent: 0,
            slackDays: 0,
            baseline: true,
            overdueDays: 0,
            delayLog: 'Not started',
            children: [
                {
                    id: 'milestone-4-1',
                    wbs: '4.1',
                    title: 'Core Development',
                    type: 'Milestone',
                    baselineEnd: 'Jul 15, 2025',
                    plannedEnd: 'Jul 30, 2025',
                    plannedMilestonePercent: 100,
                    actualMilestonePercent: 0,
                    slackDays: 0,
                    baseline: true,
                    overdueDays: 0,
                    delayLog: 'Not started',
                    children: []
                },
                {
                    id: 'milestone-4-2',
                    wbs: '4.2',
                    title: 'System Integration',
                    type: 'Milestone',
                    baselineEnd: 'Sep 15, 2025',
                    plannedEnd: 'Sep 30, 2025',
                    plannedMilestonePercent: 100,
                    actualMilestonePercent: 0,
                    slackDays: 0,
                    baseline: true,
                    overdueDays: 0,
                    delayLog: 'Not started',
                    children: []
                }
            ]
        },
        {
            id: 'phase-5',
            wbs: '5',
            title: 'Testing & Validation',
            type: 'Phase',
            baselineEnd: 'Dec 20, 2025',
            plannedEnd: 'Dec 31, 2025',
            plannedMilestonePercent: 100,
            actualMilestonePercent: 0,
            slackDays: 0,
            baseline: true,
            overdueDays: 0,
            delayLog: 'Not started',
            children: [
                {
                    id: 'milestone-5-1',
                    wbs: '5.1',
                    title: 'Unit Testing',
                    type: 'Milestone',
                    baselineEnd: 'Oct 30, 2025',
                    plannedEnd: 'Nov 10, 2025',
                    plannedMilestonePercent: 100,
                    actualMilestonePercent: 0,
                    slackDays: 0,
                    baseline: true,
                    overdueDays: 0,
                    delayLog: 'Not started',
                    children: []
                },
                {
                    id: 'milestone-5-2',
                    wbs: '5.2',
                    title: 'Integration Testing',
                    type: 'Milestone',
                    baselineEnd: 'Nov 30, 2025',
                    plannedEnd: 'Dec 10, 2025',
                    plannedMilestonePercent: 100,
                    actualMilestonePercent: 0,
                    slackDays: 0,
                    baseline: true,
                    overdueDays: 0,
                    delayLog: 'Not started',
                    children: []
                },
                {
                    id: 'milestone-5-3',
                    wbs: '5.3',
                    title: 'User Acceptance Testing',
                    type: 'Milestone',
                    baselineEnd: 'Dec 15, 2025',
                    plannedEnd: 'Dec 25, 2025',
                    plannedMilestonePercent: 100,
                    actualMilestonePercent: 0,
                    slackDays: 0,
                    baseline: true,
                    overdueDays: 0,
                    delayLog: 'Not started',
                    children: []
                }
            ]
        },
        {
            id: 'phase-6',
            wbs: '6',
            title: 'Deployment & Go-Live',
            type: 'Phase',
            baselineEnd: 'Feb 26, 2026',
            plannedEnd: 'Feb 26, 2026',
            plannedMilestonePercent: 100,
            actualMilestonePercent: 0,
            slackDays: 0,
            baseline: true,
            overdueDays: 0,
            delayLog: 'Not started',
            children: [
                {
                    id: 'milestone-6-1',
                    wbs: '6.1',
                    title: 'Training',
                    type: 'Milestone',
                    baselineEnd: 'Jan 15, 2026',
                    plannedEnd: 'Jan 20, 2026',
                    plannedMilestonePercent: 100,
                    actualMilestonePercent: 0,
                    slackDays: 0,
                    baseline: true,
                    overdueDays: 0,
                    delayLog: 'Not started',
                    children: []
                },
                {
                    id: 'milestone-6-2',
                    wbs: '6.2',
                    title: 'Production Deployment',
                    type: 'Milestone',
                    baselineEnd: 'Feb 10, 2026',
                    plannedEnd: 'Feb 15, 2026',
                    plannedMilestonePercent: 100,
                    actualMilestonePercent: 0,
                    slackDays: 0,
                    baseline: true,
                    overdueDays: 0,
                    delayLog: 'Not started',
                    children: []
                },
                {
                    id: 'milestone-6-3',
                    wbs: '6.3',
                    title: 'Post-Implementation Support',
                    type: 'Milestone',
                    baselineEnd: 'Feb 26, 2026',
                    plannedEnd: 'Feb 26, 2026',
                    plannedMilestonePercent: 100,
                    actualMilestonePercent: 0,
                    slackDays: 0,
                    baseline: true,
                    overdueDays: 0,
                    delayLog: 'Not started',
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
        <div className="bg-white rounded-lg shadow p-5 border-1">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <h3 className="font-medium text-gray-800">Project Progress Timeline</h3>
                    {/* <span className="text-xs text-gray-500">Track project progress against plan, baseline and forecasts</span> */}
                </div>
                <div className="flex bg-gray-100 rounded-md p-0.5 space-x-0.5">
                    <button
                        onClick={() => setComparisonMode('planned-actual-baseline')}
                        className={`text-xs py-1 px-2 rounded-md transition-all ${comparisonMode === 'planned-actual-baseline' ? 'bg-white shadow-sm' : 'text-gray-700'
                            }`}
                    >
                        Planned vs Actual vs Baseline
                    </button>
                    <button
                        onClick={() => setComparisonMode('planned-actual')}
                        className={`text-xs py-1 px-2 rounded-md transition-all ${comparisonMode === 'planned-actual' ? 'bg-white shadow-sm' : 'text-gray-700'
                            }`}
                    >
                        Planned vs Actual
                    </button>
                    <button
                        onClick={() => setComparisonMode('planned-baseline')}
                        className={`text-xs py-1 px-2 rounded-md transition-all ${comparisonMode === 'planned-baseline' ? 'bg-white shadow-sm' : 'text-gray-700'
                            }`}
                    >
                        Planned vs Baseline
                    </button>
                    <button
                        onClick={() => setComparisonMode('actual-baseline')}
                        className={`text-xs py-1 px-2 rounded-md transition-all ${comparisonMode === 'actual-baseline' ? 'bg-white shadow-sm' : 'text-gray-700'
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