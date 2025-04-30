import React, { useState, Fragment } from 'react';
import { Dialog, Transition, Menu, Tab } from '@headlessui/react';
import {
    XMarkIcon,
    ChevronRightIcon,
    ChevronDownIcon,
    ArrowsPointingOutIcon,
    ArrowsPointingInIcon,
    EyeIcon,
    EyeSlashIcon,
    FunnelIcon,
    CheckIcon,
    XMarkIcon as XCircleIcon
} from '@heroicons/react/20/solid';

const GoLiveImpactDrilldownModal = ({ isOpen, closeModal }) => {
    // State for expanded rows
    const [expandedRows, setExpandedRows] = useState({
        'CP-1': true,
    });

    // State for fullscreen and slicers
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [showSlicers, setShowSlicers] = useState(true);
    const [filters, setFilters] = useState({
        type: [],
        progress: [],
        slackDays: [],
        baselineVariance: [],
        overdueDays: []
    });

    // Function to toggle row expansion
    const toggleRowExpansion = (id) => {
        setExpandedRows({
            ...expandedRows,
            [id]: !expandedRows[id]
        });
    };

    // Function to toggle fullscreen
    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
    };

    // Toggle a filter value
    const toggleFilter = (category, value) => {
        setFilters(prev => {
            const updated = { ...prev };
            if (updated[category].includes(value)) {
                updated[category] = updated[category].filter(v => v !== value);
            } else {
                updated[category] = [...updated[category], value];
            }
            return updated;
        });
    };

    // Clear filters for a category
    const clearFilters = (category) => {
        setFilters(prev => ({
            ...prev,
            [category]: []
        }));
    };

    // Sample critical path task data with new columns
    const criticalPathData = [
        {
            id: 'CP-1',
            name: 'Data Migration Completion',
            type: 'Milestone',
            baselineEnd: 'Apr 25, 2025',
            plannedEnd: 'May 5, 2025',
            progress: '35%',
            slackDays: '-2',
            baselineVariance: '10 days',
            overdueDays: '12',
            children: [
                {
                    id: 'CP-1-1',
                    name: 'Data Cleansing',
                    type: 'Activity',
                    baselineEnd: 'Apr 15, 2025',
                    plannedEnd: 'Apr 20, 2025',
                    progress: '60%',
                    slackDays: '0',
                    baselineVariance: '5 days',
                    overdueDays: '5',
                },
                {
                    id: 'CP-1-2',
                    name: 'Data Transformation Scripts',
                    type: 'Activity',
                    baselineEnd: 'Apr 20, 2025',
                    plannedEnd: 'Apr 25, 2025',
                    progress: '25%',
                    slackDays: '-1',
                    baselineVariance: '5 days',
                    overdueDays: '7',
                }
            ]
        },
        {
            id: 'CP-2',
            name: 'UAT Completion',
            type: 'Milestone',
            baselineEnd: 'May 10, 2025',
            plannedEnd: 'May 15, 2025',
            progress: '20%',
            slackDays: '0',
            baselineVariance: '5 days',
            overdueDays: '8',
            children: [
                {
                    id: 'CP-2-1',
                    name: 'Test Script Preparation',
                    type: 'Activity',
                    baselineEnd: 'Apr 25, 2025',
                    plannedEnd: 'Apr 30, 2025',
                    progress: '45%',
                    slackDays: '1',
                    baselineVariance: '5 days',
                    overdueDays: '3',
                },
                {
                    id: 'CP-2-2',
                    name: 'User Training for UAT',
                    type: 'Activity',
                    baselineEnd: 'May 1, 2025',
                    plannedEnd: 'May 5, 2025',
                    progress: '15%',
                    slackDays: '-1',
                    baselineVariance: '4 days',
                    overdueDays: '5',
                }
            ]
        },
        {
            id: 'CP-3',
            name: 'Security Compliance Sign-off',
            type: 'Milestone',
            baselineEnd: 'May 5, 2025',
            plannedEnd: 'May 10, 2025',
            progress: '10%',
            slackDays: '0',
            baselineVariance: '5 days',
            overdueDays: '6',
            children: []
        },
        {
            id: 'CP-4',
            name: 'Production Environment Setup',
            type: 'Phase',
            baselineEnd: 'May 20, 2025',
            plannedEnd: 'May 20, 2025',
            progress: '50%',
            slackDays: '3',
            baselineVariance: '0 days',
            overdueDays: '0',
            children: []
        }
    ];

    // Extract unique filter options
    const getUniqueOptions = (field) => {
        const getAllValues = (tasks) => {
            let values = [];
            tasks.forEach(task => {
                values.push(task[field]);
                if (task.children && task.children.length > 0) {
                    values = [...values, ...getAllValues(task.children)];
                }
            });
            return values;
        };

        const uniqueValues = [...new Set(getAllValues(criticalPathData))];
        return uniqueValues.filter(value => value).sort();
    };

    // Filter options
    const filterOptions = {
        type: getUniqueOptions('type'),
        progress: ['0-25%', '26-50%', '51-75%', '76-100%'],
        slackDays: ['Negative', 'Zero', 'Positive'],
        baselineVariance: ['None', '1-5 days', '6-10 days', '10+ days'],
        overdueDays: ['None', '1-5 days', '6-10 days', '10+ days']
    };

    // Filter the tasks based on selected filters
    const filterTasks = (tasks) => {
        const isTaskFiltered = (task) => {
            // Check if task passes all filters
            for (const [category, values] of Object.entries(filters)) {
                if (values.length === 0) continue; // Skip if no filter for this category

                if (category === 'progress') {
                    const progressValue = parseInt(task.progress);
                    let matchesAny = false;

                    for (const range of values) {
                        if (range === '0-25%' && progressValue <= 25) matchesAny = true;
                        else if (range === '26-50%' && progressValue > 25 && progressValue <= 50) matchesAny = true;
                        else if (range === '51-75%' && progressValue > 50 && progressValue <= 75) matchesAny = true;
                        else if (range === '76-100%' && progressValue > 75) matchesAny = true;
                    }

                    if (!matchesAny) return false;
                }
                else if (category === 'slackDays') {
                    const slackValue = parseInt(task.slackDays);
                    let matchesAny = false;

                    for (const range of values) {
                        if (range === 'Negative' && slackValue < 0) matchesAny = true;
                        else if (range === 'Zero' && slackValue === 0) matchesAny = true;
                        else if (range === 'Positive' && slackValue > 0) matchesAny = true;
                    }

                    if (!matchesAny) return false;
                }
                else if (category === 'baselineVariance') {
                    const varianceValue = parseInt(task.baselineVariance);
                    let matchesAny = false;

                    for (const range of values) {
                        if (range === 'None' && varianceValue === 0) matchesAny = true;
                        else if (range === '1-5 days' && varianceValue > 0 && varianceValue <= 5) matchesAny = true;
                        else if (range === '6-10 days' && varianceValue > 5 && varianceValue <= 10) matchesAny = true;
                        else if (range === '10+ days' && varianceValue > 10) matchesAny = true;
                    }

                    if (!matchesAny) return false;
                }
                else if (category === 'overdueDays') {
                    const overdueValue = parseInt(task.overdueDays);
                    let matchesAny = false;

                    for (const range of values) {
                        if (range === 'None' && overdueValue === 0) matchesAny = true;
                        else if (range === '1-5 days' && overdueValue > 0 && overdueValue <= 5) matchesAny = true;
                        else if (range === '6-10 days' && overdueValue > 5 && overdueValue <= 10) matchesAny = true;
                        else if (range === '10+ days' && overdueValue > 10) matchesAny = true;
                    }

                    if (!matchesAny) return false;
                }
                else if (!values.includes(task[category])) {
                    return false;
                }
            }

            return true;
        };

        // Apply filters to each task and its children
        return tasks.map(task => {
            const passes = isTaskFiltered(task);

            // If task has children, filter them too
            let filteredChildren = [];
            if (task.children && task.children.length > 0) {
                filteredChildren = task.children.filter(isTaskFiltered);
            }

            // Include the task if it passes filters or if any children pass
            return {
                ...task,
                visible: passes || filteredChildren.length > 0,
                children: filteredChildren
            };
        }).filter(task => task.visible);
    };

    // Apply filters to the data
    const filteredData = filterTasks(criticalPathData);

    // Calculate total project delay
    const calculateProjectDelay = () => {
        // In a real implementation, this would use a critical path algorithm
        // For this demo, we'll use the maximum delay of critical path tasks
        return '12 days';
    };

    // Recursive function to render task rows
    const renderTaskRow = (task, depth = 0) => {
        const hasChildren = task.children && task.children.length > 0;
        const isExpanded = expandedRows[task.id];
        const indentPadding = depth * 12; // 12px per level of depth
        const hasOverdue = parseInt(task.overdueDays) > 0;
        const slackStatus = parseInt(task.slackDays) < 0 ? 'negative' :
            parseInt(task.slackDays) === 0 ? 'zero' : 'positive';

        return (
            <React.Fragment key={task.id}>
                <tr className={`border-b ${hasOverdue ? 'bg-red-50' : ''}`}>
                    <td className="p-3 whitespace-nowrap">
                        <div className="flex items-center" style={{ paddingLeft: `${indentPadding}px` }}>
                            {hasChildren ? (
                                <button
                                    onClick={() => toggleRowExpansion(task.id)}
                                    className="mr-1 p-0.5 rounded hover:bg-gray-200"
                                >
                                    {isExpanded ?
                                        <ChevronDownIcon className="h-4 w-4 text-gray-500" /> :
                                        <ChevronRightIcon className="h-4 w-4 text-gray-500" />
                                    }
                                </button>
                            ) : (
                                <span className="w-5"></span>
                            )}
                            <span className="ml-1 font-medium text-gray-700 text-sm">{task.name}</span>
                        </div>
                    </td>
                    <td className="p-3 text-center whitespace-nowrap">
                        <span className="px-2 py-1 rounded-full bg-gray-100 text-xs text-gray-700">{task.type}</span>
                    </td>
                    <td className="p-3 text-center whitespace-nowrap text-sm">{task.baselineEnd}</td>
                    <td className="p-3 text-center whitespace-nowrap text-sm">{task.plannedEnd}</td>
                    <td className="p-3 text-center whitespace-nowrap text-sm">
                        <div className="flex justify-center items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
                                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: task.progress }}></div>
                            </div>
                            <span>{task.progress}</span>
                        </div>
                    </td>
                    <td className="p-3 text-center whitespace-nowrap text-sm">
                        <span className={`font-medium ${slackStatus === 'negative' ? 'text-red-600' :
                                slackStatus === 'zero' ? 'text-yellow-600' : 'text-green-600'
                            }`}>{task.slackDays}</span>
                    </td>
                    <td className="p-3 text-center whitespace-nowrap text-sm">{task.baselineVariance}</td>
                    <td className="p-3 text-center whitespace-nowrap text-sm">
                        <span className={`font-medium ${parseInt(task.overdueDays) > 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {task.overdueDays}
                        </span>
                    </td>
                </tr>
                {hasChildren && isExpanded && task.children.map(child => renderTaskRow(child, depth + 1))}
            </React.Fragment>
        );
    };

    // Expanded Filter Panel for fullscreen mode
    const ExpandedFilterPanel = ({ category, label, options }) => {
        const hasFilters = filters[category].length > 0;

        return (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm w-40">
                <div className="bg-gray-50 px-1.5 py-0.5 border-b flex justify-between items-center">
                    <div className="font-medium text-xs text-gray-700 flex items-center truncate">
                        <FunnelIcon className={`h-2.5 w-2.5 mr-0.5 flex-shrink-0 ${hasFilters ? 'text-blue-500' : 'text-gray-400'}`} />
                        <span className="truncate">{label}</span>
                        {hasFilters && (
                            <span className="ml-1 bg-blue-100 text-blue-800 rounded-full px-1 text-xs font-medium flex-shrink-0">
                                {filters[category].length}
                            </span>
                        )}
                    </div>
                    {hasFilters && (
                        <button
                            className="text-xs text-blue-600 hover:text-blue-800 ml-1 flex-shrink-0"
                            onClick={(e) => {
                                e.stopPropagation();
                                clearFilters(category);
                            }}
                        >
                            ×
                        </button>
                    )}
                </div>
                <div className="max-h-36 overflow-y-auto">
                    {options.length > 0 ? (
                        options.map(option => (
                            <div
                                key={option}
                                className={`flex items-center px-1.5 py-0.5 text-xs cursor-pointer hover:bg-gray-100 border-b border-gray-100 last:border-b-0 ${filters[category].includes(option) ? 'bg-blue-50' : ''
                                    }`}
                                onClick={() => toggleFilter(category, option)}
                            >
                                <div className={`w-2.5 h-2.5 mr-1 border rounded flex items-center justify-center flex-shrink-0 ${filters[category].includes(option) ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                                    }`}>
                                    {filters[category].includes(option) && (
                                        <CheckIcon className="h-1.5 w-1.5 text-white" />
                                    )}
                                </div>
                                <span className="truncate text-[10px]">{option}</span>
                            </div>
                        ))
                    ) : (
                        <div className="px-1.5 py-1 text-[10px] text-gray-500 text-center">No options</div>
                    )}
                </div>
            </div>
        );
    };

    // Compact Filter Dropdown for normal mode
    const CompactFilterDropdown = ({ category, label, options }) => {
        const hasFilters = filters[category].length > 0;

        return (
            <Menu as="div" className="relative inline-block text-left">
                <Menu.Button
                    className={`flex items-center justify-between px-3 py-2 text-xs rounded-md border ${hasFilters ? 'bg-blue-50 border-blue-300 text-blue-700' : 'bg-white border-gray-300 text-gray-700'
                        }`}
                >
                    <div className="flex items-center">
                        <FunnelIcon className={`h-3.5 w-3.5 mr-1.5 ${hasFilters ? 'text-blue-500' : 'text-gray-400'}`} />
                        <span>{label}</span>
                        {hasFilters && (
                            <span className="ml-1.5 bg-blue-100 text-blue-800 rounded-full px-1.5 py-0.5 text-xs font-medium">
                                {filters[category].length}
                            </span>
                        )}
                    </div>
                </Menu.Button>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute left-0 z-50 mt-1 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1 border-b flex justify-between items-center px-3">
                            <div className="text-xs font-medium text-gray-700">Filter by {label}</div>
                            {hasFilters && (
                                <button
                                    className="text-xs text-blue-600 hover:text-blue-800"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        clearFilters(category);
                                    }}
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                        <div className="max-h-60 overflow-y-auto p-1">
                            {options.map(option => (
                                <Menu.Item key={option}>
                                    {() => (
                                        <div
                                            className={`flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${filters[category].includes(option) ? 'bg-blue-50' : ''
                                                }`}
                                            onClick={() => toggleFilter(category, option)}
                                        >
                                            <div className={`w-4 h-4 mr-2 border rounded flex items-center justify-center ${filters[category].includes(option) ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                                                }`}>
                                                {filters[category].includes(option) && (
                                                    <CheckIcon className="h-3 w-3 text-white" />
                                                )}
                                            </div>
                                            <span className="truncate">{option}</span>
                                        </div>
                                    )}
                                </Menu.Item>
                            ))}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        );
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
                    <div className={`flex min-h-full ${isFullScreen ? 'p-0' : 'p-4'} items-start justify-center`}>
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
                                className={`transform overflow-hidden bg-white shadow-xl transition-all ${isFullScreen
                                    ? 'fixed inset-0 rounded-none'
                                    : 'w-full max-w-5xl rounded-lg p-6'
                                    }`}
                            >
                                <div className={`flex justify-between items-center ${isFullScreen ? 'p-4' : 'mb-4'}`}>
                                    <Dialog.Title as="h3" className="text-md font-semibold text-gray-900">
                                        Go-Live Impact Analysis
                                    </Dialog.Title>

                                    <div className="flex items-center space-x-2">
                                        <button
                                            type="button"
                                            onClick={toggleFullScreen}
                                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            title={isFullScreen ? "Exit full screen" : "Full screen"}
                                        >
                                            {isFullScreen ? (
                                                <ArrowsPointingInIcon className="h-4 w-6" aria-hidden="true" />
                                            ) : (
                                                <ArrowsPointingOutIcon className="h-4 w-6" aria-hidden="true" />
                                            )}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            title="Close"
                                        >
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>

                                <div className={`${isFullScreen ? 'p-6' : ''}`}>
                                    <div className="mb-6">
                                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
                                            <div className="flex-shrink-0 bg-red-100 rounded-full p-2 mr-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="text-md font-medium text-red-800">
                                                    Delay is assessed based on current progress against planned end dates for critical items in the project plan
                                                </h3>
                                                <p className="text-sm text-red-700 mt-1">
                                                    The project is currently delayed by {calculateProjectDelay()} based on critical path analysis. Delays in the following high-impact tasks are the primary contributors:
                                                </p>
                                                <ul className="text-sm text-red-700 mt-2 list-disc list-inside ml-1">
                                                    <li>Data Migration Completion (12 days delay)</li>
                                                    <li>UAT Completion (8 days delay)</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-4 flex justify-between">
                                        <div></div> {/* Empty div to maintain flex spacing */}

                                        <div className="flex items-center space-x-2">
                                            {Object.values(filters).some(arr => arr.length > 0) && (
                                                <button
                                                    className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
                                                    onClick={() => {
                                                        setFilters({
                                                            type: [],
                                                            progress: [],
                                                            slackDays: [],
                                                            baselineVariance: [],
                                                            overdueDays: []
                                                        });
                                                    }}
                                                >
                                                    <XCircleIcon className="h-4 w-4 mr-1" />
                                                    Clear All Filters
                                                </button>
                                            )}

                                            <button
                                                className="ml-3 text-xs text-gray-600 hover:text-gray-800 flex items-center border border-gray-300 rounded-md px-3 py-1.5"
                                                onClick={() => setShowSlicers(!showSlicers)}
                                            >
                                                {showSlicers ? (
                                                    <>
                                                        <EyeSlashIcon className="h-4 w-4 mr-1.5" />
                                                        Hide Filters
                                                    </>
                                                ) : (
                                                    <>
                                                        <EyeIcon className="h-4 w-4 mr-1.5" />
                                                        Show Filters
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Filter UI - Changes based on screen mode */}
                                    {showSlicers && (
                                        isFullScreen ? (
                                            // Expanded filter panels for full screen mode
                                            <div className="flex flex-wrap gap-3 mb-3">
                                                <ExpandedFilterPanel
                                                    category="type"
                                                    label="Type"
                                                    options={filterOptions.type}
                                                />
                                                <ExpandedFilterPanel
                                                    category="progress"
                                                    label="Progress"
                                                    options={filterOptions.progress}
                                                />
                                                <ExpandedFilterPanel
                                                    category="slackDays"
                                                    label="Slack Days"
                                                    options={filterOptions.slackDays}
                                                />
                                                <ExpandedFilterPanel
                                                    category="baselineVariance"
                                                    label="Baseline Variance"
                                                    options={filterOptions.baselineVariance}
                                                />
                                                <ExpandedFilterPanel
                                                    category="overdueDays"
                                                    label="Overdue Days"
                                                    options={filterOptions.overdueDays}
                                                />
                                            </div>
                                        ) : (
                                            // Compact dropdowns for normal mode
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                <CompactFilterDropdown
                                                    category="type"
                                                    label="Type"
                                                    options={filterOptions.type}
                                                />
                                                <CompactFilterDropdown
                                                    category="progress"
                                                    label="Progress"
                                                    options={filterOptions.progress}
                                                />
                                                <CompactFilterDropdown
                                                    category="slackDays"
                                                    label="Slack Days"
                                                    options={filterOptions.slackDays}
                                                />
                                                <CompactFilterDropdown
                                                    category="baselineVariance"
                                                    label="Baseline Variance"
                                                    options={filterOptions.baselineVariance}
                                                />
                                                <CompactFilterDropdown
                                                    category="overdueDays"
                                                    label="Overdue Days"
                                                    options={filterOptions.overdueDays}
                                                />
                                            </div>
                                        ))
                                    }

                                    {/* Results count */}
                                    <div className="mb-2 text-xs text-gray-500">
                                        Showing {filteredData.length} of {criticalPathData.length} critical path items
                                    </div>

                                    <div className={`border rounded-lg overflow-hidden overflow-y-auto ${isFullScreen ? 'max-h-[calc(100vh-280px)]' : 'max-h-[50vh]'}`}>
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50 sticky top-0 z-10">
                                                <tr>
                                                    <th scope="col" className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Task Title
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
                                                        Progress
                                                    </th>
                                                    <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Slack Days
                                                    </th>
                                                    <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Baseline Variance
                                                    </th>
                                                    <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Overdue Days
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {filteredData.length > 0 ? (
                                                    filteredData.map(task => renderTaskRow(task))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="8" className="p-6 text-center text-gray-500">
                                                            No tasks match the current filters. Try adjusting your filters.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="mt-4 flex flex-wrap gap-3">
                                        <div className="flex items-center text-xs text-gray-500">
                                            <div className="w-3 h-3 bg-red-50 rounded mr-1 border border-gray-200"></div>
                                            <span>Delayed Tasks</span>
                                        </div>
                                        <div className="flex items-center text-xs text-gray-500">
                                            <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                                            <span>Negative Slack</span>
                                        </div>
                                        <div className="flex items-center text-xs text-gray-500">
                                            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
                                            <span>Zero Slack</span>
                                        </div>
                                        <div className="flex items-center text-xs text-gray-500">
                                            <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                                            <span>Positive Slack</span>
                                        </div>
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

// Usage in your Go-Live Risk Index Card
const GoLiveRiskCard = () => {
    const [showDrilldown, setShowDrilldown] = useState(false);

    return (
        <div className="bg-white rounded-lg shadow p-5 border-t-4 border-red-500">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-medium text-gray-700">Go-Live Probability</h3>
                    {/* <div className="text-xs text-gray-500 flex items-center">
                        <span>HIGH PRIORITY</span>
                    </div> */}
                </div>
                <div className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded flex items-center">
                    At Risk
                </div>
            </div>

            {/* Simplified gauge */}
            <div className="flex justify-center mb-2">
                <div className="w-32 h-32 rounded-full border-8 border-red-500 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-gray-800">45%</span>
                    <span className="text-xs text-gray-500">Chance of</span>
                    <span className="text-xs text-gray-500">On-time Go-live</span>
                </div>
            </div>

            {/* <div className="flex justify-between text-xs text-gray-500">
                <span>Critical (0%)</span>
                <span>Good (100%)</span>
            </div> */}

            <div className="mt-4 text-sm">
                <div className="flex justify-between items-center text-gray-600">
                    <span>Last 30 days as on March 25th</span>
                    <span className="font-medium">62%</span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                    <span>Change</span>
                    <span className="text-red-600 font-medium">-17%</span>
                </div>
            </div>

            <div className="mt-3 pt-3 border-t flex justify-between items-center text-xs">
                <div className="flex items-center text-gray-500">
                    <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
                    <span>5 Critical Path Tasks Delayed</span>
                </div>
                <button
                    onClick={() => setShowDrilldown(true)}
                    className="text-blue-600 hover:underline focus:outline-none"
                >
                    Details
                </button>
            </div>

            {/* Drilldown Modal */}
            <GoLiveImpactDrilldownModal
                isOpen={showDrilldown}
                closeModal={() => setShowDrilldown(false)}
            />
        </div>
    );
};

export default GoLiveRiskCard;