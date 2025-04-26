import React from 'react';
import { Transition, Dialog } from '@headlessui/react';
import { XMarkIcon, ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { useState, Fragment } from 'react';

const SPIDrilldownModal = ({ isOpen, closeModal }) => {
    // Mock data for the tree table
    const [expandedRows, setExpandedRows] = useState({
        'wave-1': true,
        'phase-1': true,
    });

    // Function to toggle row expansion
    const toggleRowExpansion = (id) => {
        setExpandedRows({
            ...expandedRows,
            [id]: !expandedRows[id]
        });
    };

    // Sample task data with hierarchy
    const taskData = [
        {
            id: 'wave-1',
            level: 1,
            name: 'Wave 1 - PTP 1/2',
            planned: '45%',
            actual: '32%',
            variance: '-13%',
            spi: 0.71,
            status: 'At Risk',
            isOverdue: true,
            children: [
                {
                    id: 'phase-1',
                    level: 2,
                    name: 'Explore Phase',
                    planned: '75%',
                    actual: '65%',
                    variance: '-10%',
                    spi: 0.87,
                    status: 'At Risk',
                    isOverdue: true,
                    children: [
                        {
                            id: 'milestone-1',
                            level: 3,
                            name: 'Blueprint Completion',
                            planned: '100%',
                            actual: '85%',
                            variance: '-15%',
                            spi: 0.85,
                            status: 'Delayed',
                            isOverdue: true,
                            children: [
                                {
                                    id: 'deliverable-1',
                                    level: 4,
                                    name: 'Process Design Documents',
                                    planned: '100%',
                                    actual: '80%',
                                    variance: '-20%',
                                    spi: 0.80,
                                    status: 'Delayed',
                                    isOverdue: true,
                                },
                                {
                                    id: 'deliverable-2',
                                    level: 4,
                                    name: 'Technical Specifications',
                                    planned: '100%',
                                    actual: '90%',
                                    variance: '-10%',
                                    spi: 0.90,
                                    status: 'At Risk',
                                    isOverdue: true,
                                },
                            ]
                        },
                    ]
                },
                {
                    id: 'phase-2',
                    level: 2,
                    name: 'Build Phase',
                    planned: '25%',
                    actual: '10%',
                    variance: '-15%',
                    spi: 0.40,
                    status: 'Critical',
                    isOverdue: true,
                }
            ]
        },
        {
            id: 'wave-2',
            level: 1,
            name: 'Wave 2 - HSSE 1/2',
            planned: '15%',
            actual: '12%',
            variance: '-3%',
            spi: 0.80,
            status: 'At Risk',
            isOverdue: false,
        },
    ];

    // Recursive function to render task rows
    const renderTaskRow = (task, depth = 0) => {
        const hasChildren = task.children && task.children.length > 0;
        const isExpanded = expandedRows[task.id];
        const indentPadding = depth * 12; // 12px per level of depth

        return (
            <React.Fragment key={task.id}>
                <tr className={`border-b ${task.isOverdue ? 'bg-red-50' : ''}`}>
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
                            <span className="ml-1 font-medium text-gray-700 text-sm">{task.name}</span>
                        </div>
                    </td>
                    <td className="p-2 text-center whitespace-nowrap text-sm">{task.planned}</td>
                    <td className="p-2 text-center whitespace-nowrap text-sm">{task.actual}</td>
                    <td className="p-2 text-center whitespace-nowrap text-red-500 text-sm">{task.variance}</td>
                    <td className="p-2 text-center whitespace-nowrap text-sm">
                        <span className={`font-medium ${getSPIColor(task.spi)}`}>{task.spi.toFixed(2)}</span>
                    </td>
                    <td className="p-2 text-center whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(task.status)}`}>
                            {task.status}
                        </span>
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
                                        Schedule Performance Index Details
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
                                        Tasks impacting the SPI calculation. Current overall SPI as of April 18, 2025: <span className="font-medium text-yellow-600">0.89</span>
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        (Completion Percentage / Planned Percentage) × 100
                                    </p>
                                </div>

                                <div className="border rounded-lg overflow-hidden max-h-[60vh] overflow-y-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50 sticky top-0">
                                            <tr>
                                                <th scope="col" className="p-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Task Name
                                                </th>
                                                <th scope="col" className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Planned %
                                                </th>
                                                <th scope="col" className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Actual %
                                                </th>
                                                <th scope="col" className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Variance
                                                </th>
                                                <th scope="col" className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    SPI
                                                </th>
                                                <th scope="col" className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Status
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {taskData.map(task => renderTaskRow(task))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="mt-4 flex gap-2">
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
                                        <span>SPI 0.7-0.9 (Warning)</span>
                                    </div>
                                    <div className="flex items-center text-xs text-gray-500">
                                        <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                                        <span>SPI &gt; 0.9 (Good)</span>
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
                    <span className="text-2xl font-bold text-gray-800">0.89</span>
                <span className="text-xs text-gray-500">Behind Schedule</span>
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
                    <span className="font-medium">0.92</span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                    <span>Change</span>
                    <span className="text-red-600 font-medium">-0.03</span>
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