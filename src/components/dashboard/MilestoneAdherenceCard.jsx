import React, { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/20/solid';

const MilestoneAdherenceDrilldownModal = ({ isOpen, closeModal }) => {
    // Mock data for the milestone table
    const [expandedRows, setExpandedRows] = useState({});

    // Function to toggle row expansion
    const toggleRowExpansion = (id) => {
        setExpandedRows({
            ...expandedRows,
            [id]: !expandedRows[id]
        });
    };

    // Sample milestone data
    const milestoneData = [
        {
            id: 'MS58',
            name: 'Completion of UAT',
            plannedEnd: 'Apr 20, 2025',
            progress: '20%',
            status: 'AT RISK',
            daysLeft: 4,
            remainingWork: '80%',
            overdueTasks: 25,
            waveImpact: '3%',
            children: [
                {
                    id: 'task-101',
                    name: 'Complete regression testing',
                    plannedEnd: 'Apr 16, 2025',
                    progress: '30%',
                    assignedTo: 'Sarah Williams',
                    daysOverdue: 2
                },
                {
                    id: 'task-102',
                    name: 'Sign-off on UAT scenarios',
                    plannedEnd: 'Apr 14, 2025',
                    progress: '50%',
                    assignedTo: 'Michael Chen',
                    daysOverdue: 4
                },
                {
                    id: 'task-103',
                    name: 'Fix critical defects',
                    plannedEnd: 'Apr 17, 2025',
                    progress: '15%',
                    assignedTo: 'Priya Sharma',
                    daysOverdue: 1
                }
            ]
        },
        {
            id: 'MS62',
            name: 'Security Compliance Approval',
            plannedEnd: 'May 5, 2025',
            progress: '15%',
            status: 'AT RISK',
            daysLeft: 17,
            remainingWork: '85%',
            overdueTasks: 12,
            waveImpact: '2%',
            children: [
                {
                    id: 'task-201',
                    name: 'Complete security assessment',
                    plannedEnd: 'Apr 25, 2025',
                    progress: '10%',
                    assignedTo: 'Robert Taylor',
                    daysOverdue: 3
                }
            ]
        },
        {
            id: 'MS65',
            name: 'Data Migration Go-Live',
            plannedEnd: 'May 15, 2025',
            progress: '42%',
            status: 'ON TRACK',
            daysLeft: 27,
            remainingWork: '58%',
            overdueTasks: 0,
            waveImpact: '0%',
            children: []
        }
    ];

    // Recursive function to render milestone rows
    const renderMilestoneRow = (milestone, isChild = false) => {
        const hasChildren = milestone.children && milestone.children.length > 0;
        const isExpanded = expandedRows[milestone.id];
        const isOverdue = milestone.status === 'AT RISK' || milestone.status === 'DELAYED';

        return (
            <React.Fragment key={milestone.id}>
                <tr className={`border-b ${isOverdue ? 'bg-red-50' : ''}`}>
                    <td className="p-3 whitespace-nowrap">
                        <div className="flex items-center">
                            {hasChildren ? (
                                <button
                                    onClick={() => toggleRowExpansion(milestone.id)}
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
                            <span className={`ml-1 font-medium text-sm ${isChild ? 'text-gray-600' : 'text-gray-800'}`}>
                                {isChild ? milestone.name : `${milestone.id} - ${milestone.name}`}
                            </span>
                        </div>
                    </td>
                    <td className="p-3 text-center whitespace-nowrap text-sm">{milestone.plannedEnd}</td>
                    <td className="p-3 text-center whitespace-nowrap">
                        <div className="flex justify-center items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2.5 mr-2">
                                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: milestone.progress }}></div>
                            </div>
                            <span className='text-sm'>{milestone.progress}</span>
                        </div>
                    </td>
                    <td className="p-3 whitespace-nowrap">
                        {isChild ? (
                            <span className="text-gray-600 text-sm">Assigned to {milestone.assignedTo}</span>
                        ) : (
                            <div className="flex flex-col">
                                <span className={`font-medium ${getStatusColor(milestone.status)}`}>{milestone.status}</span>
                                <span className="text-xs text-gray-500">{milestone.daysLeft} days left, {milestone.remainingWork} to complete</span>
                            </div>
                        )}
                    </td>
                    <td className="p-3 text-center whitespace-nowrap">
                        {isChild ? (
                            <span className="text-red-600 font-small text-sm">{milestone.daysOverdue} days</span>
                        ) : (
                            <span className="font-small text-sm">{milestone.overdueTasks} tasks</span>
                        )}
                    </td>
                    <td className="p-3 text-center whitespace-nowrap">
                        {!isChild && (
                            <span className={`font-medium text-sm ${milestone.waveImpact !== '0%' ? 'text-red-600' : 'text-gray-500'}`}>
                                {milestone.waveImpact}
                            </span>
                        )}
                    </td>
                </tr>
                {hasChildren && isExpanded && milestone.children.map(child => renderMilestoneRow(child, true))}
            </React.Fragment>
        );
    };

    // Helper function to get status color
    const getStatusColor = (status) => {
        switch (status) {
            case 'DELAYED':
                return 'text-red-700';
            case 'AT RISK':
                return 'text-amber-600';
            case 'ON TRACK':
                return 'text-green-600';
            default:
                return 'text-gray-600';
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
                                        Milestone Adherence Details
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
                                        Milestone status and impact analysis as of April 18, 2025. Current adherence rate: <span className="font-medium text-orange-600">68%</span>
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        (Milestones completed on time / Total milestones due to date) × 100%
                                    </p>
                                </div>

                                <div className="mb-4 grid grid-cols-3 gap-4">
                                    <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                                        <div className="text-2xl font-bold text-green-600 mb-1">17</div>
                                        <div className="text-xs text-gray-700">Completed Milestones</div>
                                    </div>
                                    <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
                                        <div className="text-2xl font-bold text-amber-600 mb-1">5</div>
                                        <div className="text-xs text-gray-700">At Risk Milestones</div>
                                    </div>
                                    <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                                        <div className="text-2xl font-bold text-red-600 mb-1">3</div>
                                        <div className="text-xs text-gray-700">Delayed Milestones</div>
                                    </div>
                                </div>

                                <div className="border rounded-lg overflow-hidden max-h-[50vh] overflow-y-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50 sticky top-0">
                                            <tr>
                                                <th scope="col" className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Milestone
                                                </th>
                                                <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Planned End
                                                </th>
                                                <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Progress
                                                </th>
                                                <th scope="col" className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Ktern.AI Estimation
                                                </th>
                                                <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Overdue
                                                </th>
                                                <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Impact in Wave
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {milestoneData.map(milestone => renderMilestoneRow(milestone))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="mt-4 flex flex-wrap gap-3">
                                    <div className="flex items-center text-xs text-gray-500">
                                        <div className="w-3 h-3 bg-red-50 rounded mr-1 border border-gray-200"></div>
                                        <span>At Risk Milestones</span>
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
                                        <span>Delayed</span>
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

// Usage in your Milestone Adherence Rate Card
const MilestoneAdherenceCard = () => {
    const [showDrilldown, setShowDrilldown] = useState(false);

    return (
        <div className="bg-white rounded-lg shadow p-5 border-t-4 border-orange-500">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-medium text-gray-700">Milestone Adherence Rate</h3>
                    <div className="text-xs text-gray-500 flex items-center">
                        <span>HIGH PRIORITY</span>
                    </div>
                </div>
                <div className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded flex items-center">
                    At Risk
                </div>
            </div>

            {/* Simplified progress circle */}
            <div className="flex justify-center mb-2">
                <div className="w-32 h-32 rounded-full border-8 border-orange-500 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-gray-800">68%</span>
                    <span className="text-sm text-gray-500">On-time</span>
                </div>
            </div>

            <div className="flex justify-between text-xs text-gray-500">
                <span>Threshold: 80%</span>
            </div>

            <div className="mt-4 text-sm">
                <div className="flex justify-between items-center text-gray-600">
                    <span>Completed Milestones</span>
                    <span className="font-medium">17/25</span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                    <span>Next Milestone</span>
                    <span className="font-medium text-orange-600">UAT Completion</span>
                </div>
            </div>

            <div className="mt-3 pt-3 border-t flex justify-between items-center text-xs">
                <div className="flex items-center text-gray-500">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mr-1"></div>
                    <span>3 Milestones at risk</span>
                </div>
                <button
                    onClick={() => setShowDrilldown(true)}
                    className="text-blue-600 hover:underline focus:outline-none"
                >
                    Details
                </button>
            </div>

            {/* Drilldown Modal */}
            <MilestoneAdherenceDrilldownModal
                isOpen={showDrilldown}
                closeModal={() => setShowDrilldown(false)}
            />
        </div>
    );
};

export default MilestoneAdherenceCard;