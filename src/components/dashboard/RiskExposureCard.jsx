import React, { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, FunnelIcon } from '@heroicons/react/20/solid';
import RiskModal from './RiskModal';

const RiskDrilldownModal = ({ isOpen, closeModal }) => {
    // State for filtering
    const [showPendingOnly, setShowPendingOnly] = useState(false);

    // Sample risk data
    const riskData = [
        {
            id: 'R-001',
            title: 'Integration with legacy systems might fail',
            status: 'Mitigated',
            impactScore: 'High (3)',
            responsiblePerson: 'Michael Chen',
            createdBy: 'Robert Taylor',
            plannedTo: 'Apr 10, 2025'
        },
        {
            id: 'R-002',
            title: 'Inadequate user training may lead to adoption issues',
            status: 'Pending',
            impactScore: 'Medium (2)',
            responsiblePerson: 'Sarah Williams',
            createdBy: 'John Smith',
            plannedTo: 'Apr 25, 2025'
        },
        {
            id: 'R-003',
            title: 'Data migration quality issues',
            status: 'Pending',
            impactScore: 'High (3)',
            responsiblePerson: 'Priya Sharma',
            createdBy: 'Michael Chen',
            plannedTo: 'Apr 15, 2025'
        },
        {
            id: 'R-004',
            title: 'Vendor software delivery delays',
            status: 'Mitigated',
            impactScore: 'Medium (2)',
            responsiblePerson: 'Robert Taylor',
            createdBy: 'Priya Sharma',
            plannedTo: 'Mar 30, 2025'
        },
        {
            id: 'R-005',
            title: 'Compliance requirements not fully understood',
            status: 'Pending',
            impactScore: 'High (3)',
            responsiblePerson: 'John Smith',
            createdBy: 'Sarah Williams',
            plannedTo: 'Apr 18, 2025'
        },
        {
            id: 'R-006',
            title: 'Performance issues during peak load',
            status: 'Mitigated',
            impactScore: 'Medium (2)',
            responsiblePerson: 'Michael Chen',
            createdBy: 'Robert Taylor',
            plannedTo: 'Apr 5, 2025'
        },
        {
            id: 'R-007',
            title: 'Security vulnerabilities in third-party API',
            status: 'Pending',
            impactScore: 'Critical (4)',
            responsiblePerson: 'Robert Taylor',
            createdBy: 'John Smith',
            plannedTo: 'Apr 20, 2025'
        },
        {
            id: 'R-008',
            title: 'Resource allocation conflicts with other projects',
            status: 'Pending',
            impactScore: 'Medium (2)',
            responsiblePerson: 'Sarah Williams',
            createdBy: 'Priya Sharma',
            plannedTo: 'Apr 28, 2025'
        }
    ];

    // Filter the risks based on current setting
    const filteredRisks = showPendingOnly
        ? riskData.filter(risk => risk.status === 'Pending')
        : riskData;

    // Helper function to get impact color
    const getImpactColor = (impact) => {
        if (impact.includes('Critical')) return 'bg-red-100 text-red-800';
        if (impact.includes('High')) return 'bg-orange-100 text-orange-800';
        if (impact.includes('Medium')) return 'bg-yellow-100 text-yellow-800';
        return 'bg-blue-100 text-blue-800'; // Low
    };

    // Helper function to get status color
    const getStatusColor = (status) => {
        return status === 'Mitigated'
            ? 'bg-green-100 text-green-800'
            : 'bg-amber-100 text-amber-800';
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
                            <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-lg bg-white p-4 shadow-xl transition-all">
                                <div className="flex justify-between items-center mb-4">
                                    <Dialog.Title as="h3" className="text-lg font-semibold text-gray-900">
                                        Project Risks
                                    </Dialog.Title>
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                <div className="mb-4 flex justify-between items-center">
                                    <div className="flex gap-5">
                                        <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                                            <div className="text-lg font-bold text-green-600">17/25</div>
                                            <div className="text-xs text-gray-700">Risks Mitigated</div>
                                        </div>
                                        <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
                                            <div className="text-lg font-bold text-amber-600">8</div>
                                            <div className="text-xs text-gray-700">Pending Mitigation</div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setShowPendingOnly(!showPendingOnly)}
                                        className={`flex items-center px-3 py-2 text-xs border rounded ${showPendingOnly ? 'bg-blue-50 border-blue-300 text-blue-700' : 'bg-gray-50 border-gray-300 text-gray-700'
                                            }`}
                                    >
                                        <FunnelIcon className="h-4 w-4 mr-2" />
                                        {showPendingOnly ? 'Show All Risks' : 'Show Pending Only'}
                                    </button>
                                </div>

                                <div className="border rounded-lg overflow-hidden max-h-[50vh] overflow-y-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50 sticky top-0">
                                            <tr>
                                                <th scope="col" className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Title
                                                </th>
                                                <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Impact Score
                                                </th>
                                                <th scope="col" className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Responsible Person
                                                </th>
                                                <th scope="col" className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Created By
                                                </th>
                                                <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Planned To
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {filteredRisks.map(risk => (
                                                <tr key={risk.id} className={risk.status === 'Pending' ? 'bg-amber-50' : ''}>
                                                    <td className="p-3 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <span className="text-gray-900 font-medium text-sm">{risk.title}</span>
                                                        </div>
                                                    </td>
                                                    <td className="p-3 text-center whitespace-nowrap">
                                                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(risk.status)}`}>
                                                            {risk.status}
                                                        </span>
                                                    </td>
                                                    <td className="p-3 text-center whitespace-nowrap">
                                                        <span className={`px-2 py-1 rounded-full text-xs ${getImpactColor(risk.impactScore)}`}>
                                                            {risk.impactScore}
                                                        </span>
                                                    </td>
                                                    <td className="p-3 whitespace-nowrap text-gray-700 text-sm">
                                                        {risk.responsiblePerson}
                                                    </td>
                                                    <td className="p-3 whitespace-nowrap text-gray-700 text-sm">
                                                        {risk.createdBy}
                                                    </td>
                                                    <td className="p-3 text-center whitespace-nowrap text-gray-700 text-sm">
                                                        {risk.plannedTo}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="mt-4 flex flex-wrap gap-3">
                                    <div className="flex items-center text-xs text-gray-500">
                                        <div className="w-3 h-3 bg-amber-50 rounded mr-1"></div>
                                        <span>Pending Mitigation</span>
                                    </div>
                                    <div className="flex items-center text-xs text-gray-500">
                                        <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                                        <span>Critical Impact</span>
                                    </div>
                                    <div className="flex items-center text-xs text-gray-500">
                                        <div className="w-3 h-3 rounded-full bg-orange-500 mr-1"></div>
                                        <span>High Impact</span>
                                    </div>
                                    <div className="flex items-center text-xs text-gray-500">
                                        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
                                        <span>Medium Impact</span>
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

const RiskExposureCard = () => {
    // const [showDrilldown, setShowDrilldown] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRisks, setSelectedRisks] = useState([]);
    const [modalTitle, setModalTitle] = useState('');

    return (
        <div className="bg-white rounded-lg shadow p-5 h-full flex flex-col">
            {/* Risk counts */}
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="rounded bg-red-100 p-3 text-center">
                    <div className="text-2xl font-bold text-red-700">10</div>
                    <div className="text-xs text-gray-700">High Risks</div>
                </div>
                <div className="rounded bg-yellow-100 p-3 text-center">
                    <div className="text-2xl font-bold text-yellow-700">1</div>
                    <div className="text-xs text-gray-700">Medium Risks</div>
                </div>
            </div>

            {/* Risk mitigation section - flex-grow will help fill available space */}
            <div className="mb-4 mt-5">
                <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">Risk Mitigation Rate</span>
                    <span className="text-sm font-medium text-yellow-600">70%</span>
                </div>
                <div className="text-xs text-gray-500 mb-2">
                    (Mitigated risks / Identified risks) × 100%
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 relative">
                    <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                </div>

                {/* Percentage markers with proper positioning */}
                <div className="relative w-full mt-2 mb-4">
                    <span className="absolute left-0 text-xs text-gray-500">0%</span>

                    <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                        <span className="inline-block w-2 h-2 bg-red-500 rounded-full"></span>
                        <span className="text-xs text-gray-500 mt-1">Critical &lt;50%</span>
                    </div>

                    <div className="absolute left-3/4 transform -translate-x-1/2 flex flex-col items-center">
                        <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full"></span>
                        <span className="text-xs text-gray-500 mt-1">Warning &lt;75%</span>
                    </div>

                    <span className="absolute right-0 text-xs text-gray-500">100%</span>
                </div>
            </div>

            {/* Bottom section with metrics and button */}
            <div className="flex justify-between items-center border-t pt-3 mt-4">
                <div className="flex items-center space-x-4">
                    <div className="text-sm">
                        <div className="font-medium">14/45</div>
                        <div className="text-xs text-gray-500">Risks Mitigated</div>
                    </div>
                    <div className="text-sm">
                        <div className="font-medium">8</div>
                        <div className="text-xs text-gray-500">Pending Mitigation</div>
                    </div>
                </div>
                <button
                    onClick={() => {
                        // Get all risks from all cells
                        const allRisks = [
                            {
                                "title": "Server Outage",
                                "status": "Active",
                                "impactScore": "High",
                                "responsiblePerson": "John Doe",
                                "createdBy": "Sarah Smith",
                                "plannedTo": "2025-05-15"
                            },
                            {
                                "title": "Data Breach",
                                "status": "Mitigating",
                                "impactScore": "Critical",
                                "responsiblePerson": "Jane Wilson",
                                "createdBy": "Mike Johnson",
                                "plannedTo": "2025-04-30"
                            },
                            {
                                "title": "Budget Overrun",
                                "status": "Active",
                                "impactScore": "Medium",
                                "responsiblePerson": "Robert Brown",
                                "createdBy": "Lisa Taylor",
                                "plannedTo": "2025-06-10"
                            },
                            {
                                "title": "Staff Turnover",
                                "status": "Monitoring",
                                "impactScore": "Medium",
                                "responsiblePerson": "Emily Davis",
                                "createdBy": "David Wilson",
                                "plannedTo": "2025-05-20"
                            },
                            {
                                "title": "Equipment Failure",
                                "status": "Active",
                                "impactScore": "Medium",
                                "responsiblePerson": "Michael Scott",
                                "createdBy": "Pam Beesly",
                                "plannedTo": "2025-04-25"
                            },
                            {
                                "title": "Supply Chain Disruption",
                                "status": "Active",
                                "impactScore": "Medium",
                                "responsiblePerson": "Chris Evans",
                                "createdBy": "Tony Stark",
                                "plannedTo": "2025-05-05"
                            },
                            {
                                "title": "Regulatory Change",
                                "status": "Pending Review",
                                "impactScore": "Medium",
                                "responsiblePerson": "Natasha Romanoff",
                                "createdBy": "Nick Fury",
                                "plannedTo": "2025-06-15"
                            },
                            {
                                "title": "Project Delay",
                                "status": "Mitigating",
                                "impactScore": "Medium",
                                "responsiblePerson": "Steve Rogers",
                                "createdBy": "Bruce Banner",
                                "plannedTo": "2025-05-12"
                            },
                            {
                                "title": "Resource Constraint",
                                "status": "Active",
                                "impactScore": "Medium",
                                "responsiblePerson": "Wanda Maximoff",
                                "createdBy": "Vision",
                                "plannedTo": "2025-04-28"
                            },
                            {
                                "title": "Market Volatility",
                                "status": "Monitoring",
                                "impactScore": "High",
                                "responsiblePerson": "Peter Parker",
                                "createdBy": "Mary Jane",
                                "plannedTo": "2025-05-25"
                            },
                            {
                                "title": "Competitive Threat",
                                "status": "Active",
                                "impactScore": "High",
                                "responsiblePerson": "Thor Odinson",
                                "createdBy": "Loki Laufeyson",
                                "plannedTo": "2025-06-05"
                            },
                            {
                                "title": "Minor Software Bug",
                                "status": "Scheduled",
                                "impactScore": "Low",
                                "responsiblePerson": "Peter Quill",
                                "createdBy": "Gamora",
                                "plannedTo": "2025-06-30"
                            },
                            {
                                "title": "Office Renovation",
                                "status": "Scheduled",
                                "impactScore": "Low",
                                "responsiblePerson": "Stephen Strange",
                                "createdBy": "Wong",
                                "plannedTo": "2025-07-10"
                            },
                            {
                                "title": "Team Training",
                                "status": "Pending",
                                "impactScore": "Low",
                                "responsiblePerson": "T'Challa",
                                "createdBy": "Shuri",
                                "plannedTo": "2025-05-30"
                            }
                        ];

                        setSelectedRisks(allRisks);
                        setModalTitle("All Project Risks");
                        setIsModalOpen(true);
                    }}
                    className="text-blue-600 text-xs hover:underline focus:outline-none"
                >
                    View All Risks
                </button>
            </div>

            {/* Drilldown Modal */}
            {/* <RiskDrilldownModal
                isOpen={showDrilldown}
                closeModal={() => setShowDrilldown(false)}
            /> */}

            <RiskModal
                isOpen={isModalOpen}
                closeModal={() => setIsModalOpen(false)}
                selectedRisks={selectedRisks}
                modalTitle={modalTitle}
            />
        </div>
    );
};

export default RiskExposureCard;