import React, { useState, Fragment } from 'react';
import { Dialog, Transition, Menu } from '@headlessui/react';
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

const SPIDrilldownModal = ({ isOpen, closeModal }) => {
    // State for expanded rows
    const [expandedRows, setExpandedRows] = useState({
        'wave-1': true,
        'phase-1': true,
    });

    // State for fullscreen and slicers
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [showSlicers, setShowSlicers] = useState(true);
    const [filters, setFilters] = useState({
        type: [],
        baselineEnd: [],
        plannedEnd: [],
        plannedPercentage: [],
        actualPercentage: [],
        spi: []
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

    // Sample task data with hierarchy and updated columns including WBS and delay logs
    const taskData = [
        {
            "id": "36612a40d6beb0d53071c129",
            "wbs": "1.5",
            "name": "Wave 3 - S/4 Core",
            "type": "Wave",
            "baselineEnd": "27 Feb 2026",
            "plannedEnd": "26 Feb 2026",
            "planned": "100.00000",
            "actual": "30.02101",
            "spi": 3.33,
            "delayLog": "",
            "status": "Active",
            "isOverdue": false,
            "children": [
                {
                    "id": "3661f560d6beb0d53071c12a",
                    "wbs": "1.5.1",
                    "name": "Wave 3 - Prepare",
                    "type": "Phase",
                    "baselineEnd": "25 Jul 2024",
                    "plannedEnd": "25 Jul 2024",
                    "planned": "2.63999",
                    "actual": "2.63999",
                    "spi": 1,
                    "delayLog": "",
                    "status": "Completed",
                    "isOverdue": false,
                    "children": []
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

        const uniqueValues = [...new Set(getAllValues(taskData))];
        return uniqueValues.filter(value => value).sort();
    };

    // Create filter options
    const filterOptions = {
        type: getUniqueOptions('type'),
        baselineEnd: ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025'],
        plannedEnd: ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025'],
        plannedPercentage: ['0-25%', '26-50%', '51-75%', '76-100%'],
        actualPercentage: ['0-25%', '26-50%', '51-75%', '76-100%'],
        spi: ['<0.7 (Critical)', '0.7-0.9 (At Risk)', '0.9-1.0 (Near Target)', '>1.0 (Ahead)']
    };

    // Filter the tasks based on selected filters
    const filterTasks = (tasks) => {
        const isTaskFiltered = (task) => {
            // Check if task passes all filters
            for (const [category, values] of Object.entries(filters)) {
                if (values.length === 0) continue; // Skip if no filter for this category

                if (category === 'plannedPercentage') {
                    const progressValue = parseInt(task.planned);
                    let matchesAny = false;

                    for (const range of values) {
                        if (range === '0-25%' && progressValue <= 25) matchesAny = true;
                        else if (range === '26-50%' && progressValue > 25 && progressValue <= 50) matchesAny = true;
                        else if (range === '51-75%' && progressValue > 50 && progressValue <= 75) matchesAny = true;
                        else if (range === '76-100%' && progressValue > 75) matchesAny = true;
                    }

                    if (!matchesAny) return false;
                }
                else if (category === 'actualPercentage') {
                    const progressValue = parseInt(task.actual);
                    let matchesAny = false;

                    for (const range of values) {
                        if (range === '0-25%' && progressValue <= 25) matchesAny = true;
                        else if (range === '26-50%' && progressValue > 25 && progressValue <= 50) matchesAny = true;
                        else if (range === '51-75%' && progressValue > 50 && progressValue <= 75) matchesAny = true;
                        else if (range === '76-100%' && progressValue > 75) matchesAny = true;
                    }

                    if (!matchesAny) return false;
                }
                else if (category === 'spi') {
                    const spiValue = task.spi;
                    let matchesAny = false;

                    for (const range of values) {
                        if (range === '<0.7 (Critical)' && spiValue < 0.7) matchesAny = true;
                        else if (range === '0.7-0.9 (At Risk)' && spiValue >= 0.7 && spiValue < 0.9) matchesAny = true;
                        else if (range === '0.9-1.0 (Near Target)' && spiValue >= 0.9 && spiValue < 1.0) matchesAny = true;
                        else if (range === '>1.0 (Ahead)' && spiValue >= 1.0) matchesAny = true;
                    }

                    if (!matchesAny) return false;
                }
                else if (category === 'type' && !values.includes(task[category])) {
                    return false;
                }
                // Quarter-based filtering for dates would require date parsing in a real application
                // This is a simplified approach
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
    const filteredData = filterTasks(taskData);

    // Recursive function to render task rows
    const renderTaskRow = (task, depth = 0) => {
        const hasChildren = task.children && task.children.length > 0;
        const isExpanded = expandedRows[task.id];
        const indentPadding = depth * 12; // 12px per level of depth

        return (
            <React.Fragment key={task.id}>
                <tr className={`border-b ${task.isOverdue ? 'bg-red-50' : ''}`}>
                    <td className="p-2 text-center whitespace-nowrap text-xs text-gray-600">
                        {task.wbs}
                    </td>
                    <td className="p-2 whitespace-nowrap">
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
                            <span className="ml-1 font-medium text-gray-700 text-xs">{task.name}</span>
                        </div>
                    </td>
                    <td className="p-2 text-center whitespace-nowrap">
                        <span className="px-2 py-1 rounded-full bg-gray-100 text-xs text-gray-700">{task.type}</span>
                    </td>
                    <td className="p-2 text-center whitespace-nowrap text-xs text-gray-600">{task.baselineEnd}</td>
                    <td className="p-2 text-center whitespace-nowrap text-xs text-gray-600">{task.plannedEnd}</td>
                    <td className="p-2 text-center whitespace-nowrap text-xs text-gray-600">{task.planned}</td>
                    <td className="p-2 text-center whitespace-nowrap text-xs text-gray-600">{task.actual}</td>
                    <td className="p-2 text-center whitespace-nowrap text-xs">
                        <span className={`font-medium ${getSPIColor(task.spi)}`}>{task.spi.toFixed(2)}</span>
                    </td>
                    <td className="p-2 text-xs text-gray-600">
                        {task.delayLog}
                    </td>
                </tr>
                {hasChildren && isExpanded && task.children.map(child => renderTaskRow(child, depth + 1))}
            </React.Fragment>
        );
    };

    // Helper function to get color based on SPI value
    const getSPIColor = (spi) => {
        if (spi < 0.7) return 'text-red-600';
        if (spi < 0.9) return 'text-yellow-600';
        if (spi < 1.0) return 'text-blue-600';
        return 'text-green-600';
    };

    // Helper function to get status color
    const getStatusColor = (status) => {
        switch (status) {
            case 'Delayed':
            case 'Critical':
                return 'bg-red-100 text-red-800';
            case 'At Risk':
                return 'bg-yellow-100 text-yellow-800';
            case 'On Track':
                return 'bg-green-100 text-green-800';
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
                                        Schedule Performance Index Details
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
                                    <div className="mb-4">
                                        <p className="text-sm text-gray-600">
                                            The Schedule Performance Index (SPI) helps measure how efficiently the project is progressing compared to the plan.
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            SPI = (Actual Completion % ÷ Planned Completion %)
                                        </p>
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
                                                            baselineEnd: [],
                                                            plannedEnd: [],
                                                            plannedPercentage: [],
                                                            actualPercentage: [],
                                                            spi: []
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
                                                    category="baselineEnd"
                                                    label="Baseline End"
                                                    options={filterOptions.baselineEnd}
                                                />
                                                <ExpandedFilterPanel
                                                    category="plannedEnd"
                                                    label="Planned End"
                                                    options={filterOptions.plannedEnd}
                                                />
                                                <ExpandedFilterPanel
                                                    category="spi"
                                                    label="SPI"
                                                    options={filterOptions.spi}
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
                                                    category="baselineEnd"
                                                    label="Baseline End"
                                                    options={filterOptions.baselineEnd}
                                                />
                                                <CompactFilterDropdown
                                                    category="plannedEnd"
                                                    label="Planned End"
                                                    options={filterOptions.plannedEnd}
                                                />
                                                <CompactFilterDropdown
                                                    category="spi"
                                                    label="SPI"
                                                    options={filterOptions.spi}
                                                />
                                            </div>
                                        )
                                    )}
                                    {/* Results count */}
                                    <div className="mb-2 text-xs text-gray-500">
                                        Showing {filteredData.length} of {taskData.length} tasks
                                    </div>

                                    <div className="border rounded-lg overflow-hidden" style={{ minHeight: '300px' }}>
                                        <div style={{
                                            height: isFullScreen ? 'calc(100vh - 280px)' : '60vh',
                                            minHeight: '300px',
                                            maxHeight: isFullScreen ? 'calc(100vh - 280px)' : '60vh',
                                            overflowY: 'auto',
                                            overflowX: 'auto'
                                        }}>
                                            <table className="min-w-full divide-y divide-gray-200" style={{ minWidth: '1200px' }}>
                                                <thead className="bg-gray-50 sticky top-0 z-10">
                                                    <tr>
                                                        <th scope="col" className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap" style={{ minWidth: '80px', width: '80px' }}>
                                                            WBS
                                                        </th>
                                                        <th scope="col" className="p-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap" style={{ minWidth: '400px', width: '400px' }}>
                                                            Title
                                                        </th>
                                                        <th scope="col" className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap" style={{ minWidth: '80px', width: '80px' }}>
                                                            Type
                                                        </th>
                                                        <th scope="col" className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap" style={{ minWidth: '120px', width: '120px' }}>
                                                            Baseline End
                                                        </th>
                                                        <th scope="col" className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap" style={{ minWidth: '120px', width: '120px' }}>
                                                            Planned End
                                                        </th>
                                                        <th scope="col" className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap" style={{ minWidth: '100px', width: '100px' }}>
                                                            Planned %
                                                        </th>
                                                        <th scope="col" className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap" style={{ minWidth: '100px', width: '100px' }}>
                                                            Actual %
                                                        </th>
                                                        <th scope="col" className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap" style={{ minWidth: '80px', width: '80px' }}>
                                                            SPI
                                                        </th>
                                                        <th scope="col" className="p-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ minWidth: '150px', width: 'auto' }}>
                                                            Delay Log
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {filteredData.length > 0 ? (
                                                        filteredData.map(task => renderTaskRow(task))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="9" className="p-6 text-center text-gray-500">
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
                                            <span>Overdue Tasks</span>
                                        </div>
                                        <div className="flex items-center text-xs text-gray-500">
                                            <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                                            <span>SPI &lt; 0.7 (Critical)</span>
                                        </div>
                                        <div className="flex items-center text-xs text-gray-500">
                                            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
                                            <span>SPI 0.7-0.9 (At Risk)</span>
                                        </div>
                                        <div className="flex items-center text-xs text-gray-500">
                                            <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                                            <span>SPI 0.9-1.0 (Near Target)</span>
                                        </div>
                                        <div className="flex items-center text-xs text-gray-500">
                                            <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                                            <span>SPI &gt; 1.0 (Ahead)</span>
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

// Usage in your SPI Card
const SPICard = () => {
    const [showDrilldown, setShowDrilldown] = useState(false);

    return (
        <div className="bg-white rounded-lg shadow p-5 border-t-4 border-yellow-500">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-medium text-gray-700">Schedule Performance Index</h3>
                    {/* <div className="text-xs text-gray-500 flex items-center">
                        <span>HIGH PRIORITY</span>
                    </div> */}
                </div>
                <div className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded flex items-center">
                    Warning
                </div>
            </div>

            {/* Simplified gauge */}
            <div className="flex justify-center mb-2">
                <div className="w-32 h-32 rounded-full border-8 border-yellow-500 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-gray-800">0.99</span>
                    <span className="text-xs text-gray-500">Behind Schedule</span>
                </div>
            </div>

            <div className="flex justify-center mb-3 text-xs">
                <div className="flex items-center mx-2">
                    <div className="w-2 h-2 rounded-full bg-green-600 mr-1"></div>
                    <span className="text-gray-600">&gt;1.00</span>
                </div>
                <div className="flex items-center mx-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-500 mr-1"></div>
                    <span className="text-gray-600">0.75-0.99</span>
                </div>
                <div className="flex items-center mx-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
                    <span className="text-gray-600">&lt;0.75</span>
                </div>
            </div>

            {/* <div className="flex justify-between text-xs text-gray-500">
                <span>&lt;0.8</span>
                <span>1.0</span>
                <span>&gt;1.2</span>
            </div> */}

            <div className="mt-4 text-sm">
                <div className="flex justify-between items-center text-gray-600">
                    <span>Last 30 days as on March 25th</span>
                    <span className="font-medium">1.00</span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                    <span>Change</span>
                    <span className="text-red-600 font-medium">-0.01</span>
                </div>
            </div>

            <div className="mt-3 pt-3 border-t flex justify-between items-center text-xs">
                <div className="flex items-center text-gray-500">
                    <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
                    <span>18 tasks overdue</span>
                </div>
                <button
                    onClick={() => setShowDrilldown(true)}
                    className="text-blue-600 flex items-center"
                >
                    Details
                </button>
            </div>

            {/* Drilldown Modal */}
            <SPIDrilldownModal
                isOpen={showDrilldown}
                closeModal={() => setShowDrilldown(false)}
            />
        </div>
    );
}

export default SPICard;