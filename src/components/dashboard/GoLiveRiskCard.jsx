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
        baselineEnd: { start: null, end: null },
        plannedEnd: { start: null, end: null },
        slackDays: [],
        baselineOverdueDays: [],
        status: [],
        hasDelayLog: []
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
        if (category === 'baselineEnd' || category === 'plannedEnd') {
            setFilters(prev => ({
                ...prev,
                [category]: value
            }));
        } else {
            setFilters(prev => {
                const updated = { ...prev };
                if (updated[category].includes(value)) {
                    updated[category] = updated[category].filter(v => v !== value);
                } else {
                    updated[category] = [...updated[category], value];
                }
                return updated;
            });
        }
    };

    // Clear filters for a category
    const clearFilters = (category) => {
        if (category === 'baselineEnd' || category === 'plannedEnd') {
            setFilters(prev => ({
                ...prev,
                [category]: { start: null, end: null }
            }));
        } else {
            setFilters(prev => ({
                ...prev,
                [category]: []
            }));
        }
    };

    // Sample critical path task data with updated columns
    const criticalPathData = [
        {
            "id": "CP-1",
            "wbs": "1.5.5",
            "title": "Wave 3 - Hypercare",
            "type": "Phase",
            "baselineEnd": "Feb 27, 2025",
            "plannedEnd": "Feb 27, 2026",
            "plannedPercent": "0.909%",
            "actualPercent": "0%",
            "slackDays": "0",
            "baselineOverdueDays": "0",
            "delayLog": "",
            "status": "ON TRACK",
            "children": [
                {
                    "id": "CP-1-1",
                    "wbs": "1.5.5.6",
                    "title": "MS69: Completion of Month 6",
                    "type": "Milestone",
                    "baselineEnd": "Feb 27, 2025",
                    "plannedEnd": "Feb 27, 2026",
                    "plannedPercent": "0.909%",
                    "actualPercent": "0%",
                    "slackDays": "0",
                    "baselineOverdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK",
                    "children": [
                        {
                            "id": "CP-1-1",
                            "wbs": "1.5.5.6.1",
                            "title": "W3_MS69_Completion of Month 6",
                            "type": "Deliverable Group",
                            "baselineEnd": "Feb 27, 2025",
                            "plannedEnd": "Feb 27, 2026",
                            "plannedPercent": "0.909%",
                            "actualPercent": "0%",
                            "slackDays": "0",
                            "baselineOverdueDays": "0",
                            "delayLog": "Initial delay due to resource constraints",
                            "status": "AT RISK",
                            "children": [
                                {
                                    "id": "CP-1-1",
                                    "wbs": "1.5.5.6.1.1",
                                    "title": "W3_MS69_Completion of Month 6",
                                    "type": "Deliverable",
                                    "baselineEnd": "Feb 27, 2025",
                                    "plannedEnd": "Feb 27, 2026",
                                    "plannedPercent": "0.909%",
                                    "actualPercent": "0%",
                                    "slackDays": "0",
                                    "baselineOverdueDays": "0",
                                    "delayLog": "",
                                    "status": "ON TRACK"
                                }
                            ]
                        }
                    ]
                }
            ]
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
        status: ['COMPLETED', 'ON TRACK', 'AT RISK', 'DELAYED', 'CRITICAL'],
        slackDays: ['Negative', 'Zero', 'Positive'],
        baselineOverdueDays: ['more than 7 days', 'more than 14 days', 'more than 21 days', 'more than 35 days'],
        hasDelayLog: ['Yes', 'No']
    };

    // Filter the tasks based on selected filters
    const filterTasks = (tasks) => {
        const isTaskFiltered = (task) => {
            // Check if task passes all filters
            for (const [category, values] of Object.entries(filters)) {
                if (category === 'baselineEnd' || category === 'plannedEnd') {
                    if (!values.start && !values.end) continue; // Skip if no date range set

                    // Parse task date (simplified for demonstration)
                    const taskDate = new Date(task[category]);

                    // Check if the date falls in the selected range
                    if (values.start && new Date(values.start) > taskDate) return false;
                    if (values.end && new Date(values.end) < taskDate) return false;

                    continue;
                }

                if (values.length === 0) continue; // Skip if no filter for this category

                if (category === 'slackDays') {
                    const slackValue = parseInt(task.slackDays);
                    let matchesAny = false;

                    for (const range of values) {
                        if (range === 'Negative' && slackValue < 0) matchesAny = true;
                        else if (range === 'Zero' && slackValue === 0) matchesAny = true;
                        else if (range === 'Positive' && slackValue > 0) matchesAny = true;
                    }

                    if (!matchesAny) return false;
                }
                else if (category === 'baselineOverdueDays') {
                    const overdueValue = parseInt(task.baselineOverdueDays);
                    let matchesAny = false;

                    for (const range of values) {
                        if (range === 'more than 7 days' && overdueValue > 7) matchesAny = true;
                        else if (range === 'more than 14 days' && overdueValue > 14) matchesAny = true;
                        else if (range === 'more than 21 days' && overdueValue > 21) matchesAny = true;
                        else if (range === 'more than 35 days' && overdueValue > 35) matchesAny = true;
                    }

                    if (!matchesAny) return false;
                }
                else if (category === 'hasDelayLog') {
                    const hasDelay = task.delayLog && task.delayLog.trim() !== '';
                    let matchesAny = false;

                    for (const option of values) {
                        if (option === 'Yes' && hasDelay) matchesAny = true;
                        else if (option === 'No' && !hasDelay) matchesAny = true;
                    }

                    if (!matchesAny) return false;
                }
                else if ((category === 'type' || category === 'status') && !values.includes(task[category])) {
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

    // Date Range Filter Component
    const DateRangeFilter = ({ category, label }) => {
        const [isOpen, setIsOpen] = useState(false);
        const hasFilters = filters[category].start || filters[category].end;

        return (
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`flex items-center justify-between px-3 py-2 text-xs rounded-md border ${hasFilters ? 'bg-blue-50 border-blue-300 text-blue-700' : 'bg-white border-gray-300 text-gray-700'}`}
                >
                    <div className="flex items-center">
                        <FunnelIcon className={`h-3.5 w-3.5 mr-1.5 ${hasFilters ? 'text-blue-500' : 'text-gray-400'}`} />
                        <span>{label}</span>
                        {hasFilters && (
                            <span className="ml-1.5 bg-blue-100 text-blue-800 rounded-full px-1.5 py-0.5 text-xs font-medium">
                                Active
                            </span>
                        )}
                    </div>
                </button>

                {isOpen && (
                    <div className="absolute z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-lg p-3 min-w-[260px]">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-xs font-medium">{label} Range</h3>
                            {hasFilters && (
                                <button
                                    className="text-xs text-blue-600"
                                    onClick={() => clearFilters(category)}
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                        <div className="space-y-2">
                            <div>
                                <label className="block text-xs text-gray-700 mb-1">From</label>
                                <input
                                    type="date"
                                    className="w-full text-xs border border-gray-300 rounded p-1.5"
                                    value={filters[category].start || ''}
                                    onChange={(e) => toggleFilter(category, { ...filters[category], start: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-700 mb-1">To</label>
                                <input
                                    type="date"
                                    className="w-full text-xs border border-gray-300 rounded p-1.5"
                                    value={filters[category].end || ''}
                                    onChange={(e) => toggleFilter(category, { ...filters[category], end: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    // Recursive function to render task rows
    const renderTaskRow = (task, depth = 0) => {
        const hasChildren = task.children && task.children.length > 0;
        const isExpanded = expandedRows[task.id];
        const indentPadding = depth * 12; // 12px per level of depth
        const hasOverdue = parseInt(task.baselineOverdueDays) > 0;
        const slackStatus = parseInt(task.slackDays) < 0 ? 'negative' :
            parseInt(task.slackDays) === 0 ? 'zero' : 'positive';

        return (
            <React.Fragment key={task.id}>
                <tr className={`border-b ${hasOverdue ? 'bg-red-50' : ''}`}>
                    <td className="p-3 text-center whitespace-nowrap text-xs text-gray-600">
                        {task.wbs}
                    </td>
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
                            <span className="ml-1 font-medium text-gray-700 text-xs">{task.title}</span>
                        </div>
                    </td>
                    <td className="p-3 text-center whitespace-nowrap">
                        <span className="px-2 py-1 rounded-full bg-gray-100 text-xs text-gray-700">{task.type}</span>
                    </td>
                    <td className="p-3 text-center whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(task.status)}`}>
                            {task.status}
                        </span>
                    </td>
                    <td className="p-3 text-center whitespace-nowrap text-xs text-gray-600">{task.baselineEnd}</td>
                    <td className="p-3 text-center whitespace-nowrap text-xs text-gray-600">{task.plannedEnd}</td>
                    <td className="p-3 text-center whitespace-nowrap text-xs text-gray-600">{task.plannedPercent}</td>
                    <td className="p-3 text-center whitespace-nowrap text-xs text-gray-600">{task.actualPercent}</td>
                    <td className="p-3 text-center whitespace-nowrap text-xs">
                        <span className={`font-medium ${slackStatus === 'negative' ? 'text-red-600' :
                            slackStatus === 'zero' ? 'text-yellow-600' : 'text-green-600'
                            }`}>{task.slackDays}</span>
                    </td>
                    <td className="p-3 text-center whitespace-nowrap text-xs">
                        <span className={`font-medium ${parseInt(task.baselineOverdueDays) > 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {task.baselineOverdueDays}
                        </span>
                    </td>
                    <td className="p-2 whitespace-normal text-xs">
                        <span className="text-gray-600">{task.delayLog}</span>
                    </td>
                </tr>
                {hasChildren && isExpanded && task.children.map(child => renderTaskRow(child, depth + 1))}
            </React.Fragment>
        );
    };

    // Helper function to get status color
    const getStatusColor = (status) => {
        switch (status) {
            case 'DELAYED':
            case 'CRITICAL':
                return 'bg-red-100 text-red-800';
            case 'AT RISK':
                return 'bg-amber-100 text-amber-800';
            case 'ON TRACK':
                return 'bg-green-100 text-green-800';
            case 'COMPLETED':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
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
                                    : 'w-full max-w-5xl rounded-lg p-4'
                                    }`}
                            >
                                <div className={`flex justify-between items-center ${isFullScreen ? 'p-4' : 'mb-4'}`}>
                                    <Dialog.Title as="h3" className="text-md font-semibold text-gray-900">
                                        Go-Live Probability
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
                                                    Delay is assessed based on progress against planned end dates for critical path tasks
                                                </h3>
                                                <p className="text-sm text-red-700 mt-1">
                                                    The project is currently delayed by {calculateProjectDelay()} based on critical path analysis. Delays in the following high-impact tasks are the primary contributors:
                                                </p>
                                                <ul className="text-sm text-red-700 mt-2 list-disc list-inside ml-1">
                                                    <li>W3_MS69_Completion of Month 6 (12 days delay)</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-4 flex justify-between">
                                        <div></div> {/* Empty div to maintain flex spacing */}

                                        <div className="flex items-center space-x-2">
                                            {(Object.values(filters).some(arr => Array.isArray(arr) ? arr.length > 0 : (arr.start || arr.end))) && (
                                                <button
                                                    className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
                                                    onClick={() => {
                                                        setFilters({
                                                            type: [],
                                                            baselineEnd: { start: null, end: null },
                                                            plannedEnd: { start: null, end: null },
                                                            slackDays: [],
                                                            baselineOverdueDays: [],
                                                            status: [],
                                                            hasDelayLog: []
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
                                                    category="status"
                                                    label="Status"
                                                    options={filterOptions.status}
                                                />
                                                <ExpandedFilterPanel
                                                    category="slackDays"
                                                    label="Slack Days"
                                                    options={filterOptions.slackDays}
                                                />
                                                <ExpandedFilterPanel
                                                    category="baselineOverdueDays"
                                                    label="Baseline Overdue Days"
                                                    options={filterOptions.baselineOverdueDays}
                                                />
                                                <ExpandedFilterPanel
                                                    category="hasDelayLog"
                                                    label="Has Delay Log"
                                                    options={filterOptions.hasDelayLog}
                                                />

                                                {/* Date Range filters */}
                                                <div className="flex flex-col gap-3">
                                                    <DateRangeFilter
                                                        category="baselineEnd"
                                                        label="Baseline End"
                                                    />
                                                    <DateRangeFilter
                                                        category="plannedEnd"
                                                        label="Planned End"
                                                    />
                                                </div>
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
                                                    category="status"
                                                    label="Status"
                                                    options={filterOptions.status}
                                                />
                                                <DateRangeFilter
                                                    category="baselineEnd"
                                                    label="Baseline End"
                                                />
                                                <DateRangeFilter
                                                    category="plannedEnd"
                                                    label="Planned End"
                                                />
                                                <CompactFilterDropdown
                                                    category="slackDays"
                                                    label="Slack Days"
                                                    options={filterOptions.slackDays}
                                                />
                                                <CompactFilterDropdown
                                                    category="baselineOverdueDays"
                                                    label="Baseline Overdue Days"
                                                    options={filterOptions.baselineOverdueDays}
                                                />
                                                <CompactFilterDropdown
                                                    category="hasDelayLog"
                                                    label="Has Delay Log"
                                                    options={filterOptions.hasDelayLog}
                                                />
                                            </div>
                                        ))
                                    }

                                    {/* Results count */}
                                    <div className="mb-2 text-xs text-gray-500">
                                        Showing {filteredData.length} of {criticalPathData.length} critical path items
                                    </div>

                                    <div className="border rounded-lg overflow-hidden" style={{ minHeight: '300px' }}>
                                        <div style={{
                                            height: isFullScreen ? 'calc(100vh - 380px)' : '50vh',
                                            minHeight: '300px',
                                            maxHeight: isFullScreen ? 'calc(100vh - 380px)' : '50vh',
                                            overflowY: 'auto',
                                            overflowX: 'auto'
                                        }}>
                                            <table className="min-w-full divide-y divide-gray-200" style={{ width: '100%', tableLayout: 'fixed' }}>
                                                <thead className="bg-gray-50 sticky top-0 z-10">
                                                    <tr>
                                                        <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '80px' }}>
                                                            WBS
                                                        </th>
                                                        <th scope="col" className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '300px' }}>
                                                            Title
                                                        </th>
                                                        <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '100px' }}>
                                                            Type
                                                        </th>
                                                        <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '100px' }}>
                                                            Status
                                                        </th>
                                                        <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '120px' }}>
                                                            Baseline End
                                                        </th>
                                                        <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '120px' }}>
                                                            Planned End
                                                        </th>
                                                        <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '100px' }}>
                                                            Planned %
                                                        </th>
                                                        <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '100px' }}>
                                                            Actual %
                                                        </th>
                                                        <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '100px' }}>
                                                            Slack Days
                                                        </th>
                                                        <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '150px' }}>
                                                            Baseline Overdue Days
                                                        </th>
                                                        <th scope="col" className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ width: '150px' }}>
                                                            Delay Log
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {filteredData.length > 0 ? (
                                                        filteredData.map(task => renderTaskRow(task))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="11" className="p-6 text-center text-gray-500">
                                                                No tasks match the current filters. Try adjusting your filters.
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex flex-wrap gap-3">
                                        <div className="flex items-center text-xs text-gray-500">
                                            <div className="w-3 h-3 bg-red-50 rounded mr-1 border border-gray-200"></div>
                                            <span>Delayed Tasks</span>
                                        </div>
                                        <div className="flex items-center text-xs text-gray-500">
                                            <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                                            <span>Completed</span>
                                        </div>
                                        <div className="flex items-center text-xs text-gray-500">
                                            <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                                            <span>On Track</span>
                                        </div>
                                        <div className="flex items-center text-xs text-gray-500">
                                            <div className="w-3 h-3 rounded-full bg-amber-500 mr-1"></div>
                                            <span>At Risk</span>
                                        </div>
                                        <div className="flex items-center text-xs text-gray-500">
                                            <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                                            <span>Delayed/Critical</span>
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
        <div className="bg-white rounded-lg shadow p-5 border-t-4 border-green-600">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-medium text-gray-700">Go-Live Probability</h3>
                </div>
                <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded flex items-center">
                    On Track
                </div>
            </div>

            {/* Simplified gauge */}
            <div className="flex justify-center mb-2">
                <div className="w-32 h-32 rounded-full border-8 border-green-600 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-gray-800">100%</span>
                    <span className="text-xs text-gray-500">Chance of</span>
                    <span className="text-xs text-gray-500">On-time Go-live</span>
                </div>
            </div>

            <div className="flex justify-center mb-3 text-xs">
                <div className="flex items-center mx-2">
                    <div className="w-2 h-2 rounded-full bg-green-600 mr-1"></div>
                    <span className="text-gray-600">100%</span>
                </div>
                <div className="flex items-center mx-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-500 mr-1"></div>
                    <span className="text-gray-600">75-99%</span>
                </div>
                <div className="flex items-center mx-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
                    <span className="text-gray-600">&lt;75%</span>
                </div>
            </div>

            <div className="mt-4 text-sm">
                <div className="flex justify-between items-center text-gray-600">
                    <span>Last 30 days as on April 8th</span>
                    <span className="font-medium">95%</span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                    <span>Change</span>
                    <span className="text-green-600 font-medium">+5%</span>
                </div>
            </div>

            <div className="mt-3 pt-3 border-t flex justify-between items-center text-xs">
                <div className="flex items-center text-gray-500">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                    <span>0/1 Critical Path Tasks Delayed</span>
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