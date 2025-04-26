import React, { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/20/solid';

const GoLiveImpactDrilldownModal = ({ isOpen, closeModal }) => {
    // State for expanded rows
    const [expandedRows, setExpandedRows] = useState({
        'CP-1': true,
    });

    // Function to toggle row expansion
    const toggleRowExpansion = (id) => {
        setExpandedRows({
            ...expandedRows,
            [id]: !expandedRows[id]
        });
    };

    // Sample critical path task data
    const criticalPathData = [
        {
            id: 'CP-1',
            name: 'Data Migration Completion',
            level: 'Milestone',
            plannedEnd: 'May 5, 2025',
            progress: '35%',
            delay: '12 days',
            impact: 'High',
            dependencies: 2,
            children: [
                {
                    id: 'CP-1-1',
                    name: 'Data Cleansing',
                    level: 'Activity',
                    plannedEnd: 'Apr 20, 2025',
                    progress: '60%',
                    delay: '5 days',
                    impact: 'Medium',
                    dependencies: 0
                },
                {
                    id: 'CP-1-2',
                    name: 'Data Transformation Scripts',
                    level: 'Activity',
                    plannedEnd: 'Apr 25, 2025',
                    progress: '25%',
                    delay: '7 days',
                    impact: 'High',
                    dependencies: 1
                }
            ]
        },
        {
            id: 'CP-2',
            name: 'UAT Completion',
            level: 'Milestone',
            plannedEnd: 'May 15, 2025',
            progress: '20%',
            delay: '8 days',
            impact: 'High',
            dependencies: 3,
            children: [
                {
                    id: 'CP-2-1',
                    name: 'Test Script Preparation',
                    level: 'Activity',
                    plannedEnd: 'Apr 30, 2025',
                    progress: '45%',
                    delay: '3 days',
                    impact: 'Medium',
                    dependencies: 0
                },
                {
                    id: 'CP-2-2',
                    name: 'User Training for UAT',
                    level: 'Activity',
                    plannedEnd: 'May 5, 2025',
                    progress: '15%',
                    delay: '5 days',
                    impact: 'High',
                    dependencies: 1
                }
            ]
        },
        {
            id: 'CP-3',
            name: 'Security Compliance Sign-off',
            level: 'Milestone',
            plannedEnd: 'May 10, 2025',
            progress: '10%',
            delay: '6 days',
            impact: 'Medium',
            dependencies: 1,
            children: []
        },
        {
            id: 'CP-4',
            name: 'Production Environment Setup',
            level: 'Phase',
            plannedEnd: 'May 20, 2025',
            progress: '50%',
            delay: '0 days',
            impact: 'None',
            dependencies: 2,
            children: []
        }
    ];

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
        const hasDelay = task.delay !== '0 days';

        return (
            <React.Fragment key={task.id}>
                <tr className={`border-b ${hasDelay ? 'bg-red-50' : ''}`}>
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
                        <span className="px-2 py-1 rounded-full bg-gray-100 text-xs text-gray-700">{task.level}</span>
                    </td>
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
                        <span className={`font-medium ${hasDelay ? 'text-red-600' : 'text-green-600'}`}>{task.delay}</span>
                    </td>
                    <td className="p-3 text-center whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs ${getImpactColor(task.impact)}`}>
                            {task.impact}
                        </span>
                    </td>
                    <td className="p-3 text-center whitespace-nowrap">
                        {task.dependencies > 0 ? (
                            <span className="text-gray-700 text-sm">{task.dependencies}</span>
                        ) : (
                            <span className="text-gray-400 text-sm">None</span>
                        )}
                    </td>
                </tr>
                {hasChildren && isExpanded && task.children.map(child => renderTaskRow(child, depth + 1))}
            </React.Fragment>
        );
    };

    // Helper function to get impact color
    const getImpactColor = (impact) => {
        switch (impact) {
            case 'High':
                return 'bg-red-100 text-red-800';
            case 'Medium':
                return 'bg-yellow-100 text-yellow-800';
            case 'Low':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
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
                                        Go-Live Impact Analysis
                                    </Dialog.Title>
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                <div className="mb-6">
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
                                        <div className="flex-shrink-0 bg-red-100 rounded-full p-2 mr-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-md font-medium text-red-800">
                                                Based on the critical path analysis done by KTern.AI, the go-live date of Sept 23, 2025 is at risk
                                            </h3>
                                            <p className="text-sm text-red-700 mt-1">
                                                The project is currently delayed by {calculateProjectDelay()}. The following tasks are primary contributors to the delay:
                                            </p>
                                            <ul className="text-sm text-red-700 mt-2 list-disc list-inside ml-1">
                                                <li>Data Migration Completion (12 days delay)</li>
                                                <li>UAT Completion (8 days delay)</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="border rounded-lg overflow-hidden max-h-[50vh] overflow-y-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50 sticky top-0">
                                            <tr>
                                                <th scope="col" className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Task Name
                                                </th>
                                                <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Level
                                                </th>
                                                <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Planned End
                                                </th>
                                                <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Progress
                                                </th>
                                                <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Delay
                                                </th>
                                                <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Impact
                                                </th>
                                                <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Dependencies
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {criticalPathData.map(task => renderTaskRow(task))}
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
                                        <span>High Impact</span>
                                    </div>
                                    <div className="flex items-center text-xs text-gray-500">
                                        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
                                        <span>Medium Impact</span>
                                    </div>
                                    <div className="flex items-center text-xs text-gray-500">
                                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                                        <span>Low Impact</span>
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
                    <h3 className="font-medium text-gray-700">Go-Live Impact Index</h3>
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