import React, { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/20/solid';

// Dependency Coverage Card with Drilldown
const DependencyCoverageCard = () => {
    const [showDrilldown, setShowDrilldown] = useState(false);
    
    return (
        <div className="bg-white rounded-lg shadow p-5 h-full flex flex-col justify-between">
            {/* Title Section */}
            <div>
                <h3 className="font-medium text-gray-700 mb-3">Dependency Coverage Rate</h3>
                
                {/* Progress Bar */}
                <div className="mb-3 bg-gray-200 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-yellow-500 h-full rounded-full" style={{ width: '76%' }}></div>
                </div>
                
                {/* Coverage Info */}
                <div className="flex justify-between text-xs mb-5">
                    <span className="text-gray-500">76% coverage</span>
                    <span className="text-yellow-700">6 milestones need dependencies</span>
                </div>
            </div>
            
            {/* Additional Content to Fill Space */}
            <div className="flex-grow my-4">
                {/* You can add additional content here if needed */}
            </div>
            
            {/* Action Button */}
            <div className="border-t pt-3 flex justify-end mt-auto">
                <button
                    onClick={() => setShowDrilldown(true)}
                    className="text-blue-600 text-xs hover:underline focus:outline-none"
                >
                    View Tasks without Dependencies
                </button>
            </div>
            
            {/* Drilldown Modal */}
            <DependencyCoverageDrilldownModal
                isOpen={showDrilldown}
                closeModal={() => setShowDrilldown(false)}
            />
        </div>
    );
};

// Dependency Coverage Drilldown Modal
const DependencyCoverageDrilldownModal = ({ isOpen, closeModal }) => {
    // State for expanded rows
    const [expandedRows, setExpandedRows] = useState({
        'wave-1': true,
    });

    // Function to toggle row expansion
    const toggleRowExpansion = (id) => {
        setExpandedRows({
            ...expandedRows,
            [id]: !expandedRows[id]
        });
    };

    // Sample data for tasks without dependencies
    const tasksWithoutDependencies = [
        {
            id: 'wave-1',
            level: 1,
            title: 'Wave 1 - PTP 1/2',
            plannedStart: 'Apr 1, 2025',
            plannedEnd: 'Jun 30, 2025',
            owner: 'Michael Chen',
            isAutoScheduled: false,
            children: [
                {
                    id: 'phase-1',
                    level: 2,
                    title: 'Explore Phase',
                    plannedStart: 'Apr 1, 2025',
                    plannedEnd: 'Apr 30, 2025',
                    owner: 'Sarah Williams',
                    isAutoScheduled: true,
                    children: [
                        {
                            id: 'milestone-1',
                            level: 3,
                            title: 'Requirement Gathering',
                            plannedStart: 'Apr 5, 2025',
                            plannedEnd: 'Apr 15, 2025',
                            owner: 'Priya Sharma',
                            isAutoScheduled: false,
                            children: []
                        },
                        {
                            id: 'milestone-2',
                            level: 3,
                            title: 'Blueprint Sign-off',
                            plannedStart: 'Apr 20, 2025',
                            plannedEnd: 'Apr 25, 2025',
                            owner: 'John Smith',
                            isAutoScheduled: false,
                            children: []
                        }
                    ]
                }
            ]
        },
        {
            id: 'wave-2',
            level: 1,
            title: 'Wave 2 - HSSE 1/2',
            plannedStart: 'Jun 1, 2025',
            plannedEnd: 'Aug 30, 2025',
            owner: 'Robert Taylor',
            isAutoScheduled: false,
            children: [
                {
                    id: 'phase-2',
                    level: 2,
                    title: 'Build Phase',
                    plannedStart: 'Jun 1, 2025',
                    plannedEnd: 'Jul 15, 2025',
                    owner: 'Michael Chen',
                    isAutoScheduled: true,
                    children: []
                }
            ]
        },
        {
            id: 'milestone-3',
            level: 3,
            title: 'Integration Testing',
            plannedStart: 'Aug 10, 2025',
            plannedEnd: 'Aug 20, 2025',
            owner: 'Sarah Williams',
            isAutoScheduled: false,
            children: []
        }
    ];

    // Recursive function to render task rows
    const renderTaskRow = (task, depth = 0) => {
        const hasChildren = task.children && task.children.length > 0;
        const isExpanded = expandedRows[task.id];
        const indentPadding = depth * 12; // 12px per level of depth

        // Convert numeric level to text representation
        const getLevelText = (level) => {
            switch (level) {
                case 1: return 'Wave';
                case 2: return 'Phase';
                case 3: return 'Milestone';
                case 4: return 'Deliverable';
                case 5: return 'Activity';
                default: return 'Task';
            }
        };

        return (
            <React.Fragment key={task.id}>
                <tr className="border-b hover:bg-gray-50">
                    <td className="p-3">
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
                            <span className="ml-1 font-medium text-gray-700 text-sm">{task.title}</span>
                        </div>
                    </td>
                    <td className="p-3 text-center whitespace-nowrap">
                        <span className="px-2 py-1 rounded-full bg-gray-100 text-xs text-gray-700">
                            {getLevelText(task.level)}
                        </span>
                    </td>
                    <td className="p-3 text-center whitespace-nowrap text-gray-600 text-sm">
                        {task.plannedStart}
                    </td>
                    <td className="p-3 text-center whitespace-nowrap text-gray-600 text-sm">
                        {task.plannedEnd}
                    </td>
                    <td className="p-3 whitespace-nowrap text-gray-600 text-sm">
                        {task.owner}
                    </td>
                    <td className="p-3 text-center whitespace-nowrap">
                        <div className="flex justify-center items-center">
                            <input
                                type="checkbox"
                                checked={task.isAutoScheduled}
                                readOnly
                                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                            />
                        </div>
                    </td>
                </tr>
                {hasChildren && isExpanded && task.children.map(child => renderTaskRow(child, depth + 1))}
            </React.Fragment>
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
                                        Tasks Missing Dependencies
                                    </Dialog.Title>
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                <div className="mb-4">
                                    <p className="text-sm text-gray-600">
                                        The following tasks need dependencies set up to ensure proper project sequencing and scheduling.
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Current dependency coverage: <span className="font-medium text-yellow-600">76%</span>
                                    </p>
                                </div>

                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="text-sm text-yellow-800 font-medium">Missing dependencies impact project scheduling</h3>
                                            <div className="mt-1 text-xs text-yellow-700">
                                                <p>Tasks without dependencies cannot be automatically scheduled and may lead to inaccurate timeline projections.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border rounded-lg overflow-hidden max-h-[50vh] overflow-y-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50 sticky top-0">
                                            <tr>
                                                <th scope="col" className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Title
                                                </th>
                                                <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Level
                                                </th>
                                                <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Planned Start
                                                </th>
                                                <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Planned End
                                                </th>
                                                <th scope="col" className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Owner
                                                </th>
                                                <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Is Auto Scheduled
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {tasksWithoutDependencies.map(task => renderTaskRow(task))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="mt-4 flex flex-wrap gap-3">
                                    <div className="flex items-center text-xs text-gray-500">
                                        <div className="w-4 h-4 text-blue-600 border border-gray-300 rounded mr-1 flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span>Auto Scheduled</span>
                                    </div>
                                    <div className="flex items-center text-xs text-gray-500">
                                        <div className="w-4 h-4 border border-gray-300 rounded mr-1"></div>
                                        <span>Manually Scheduled</span>
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

export default DependencyCoverageCard;