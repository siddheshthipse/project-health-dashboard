import React, { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, FunnelIcon } from '@heroicons/react/20/solid';

const IssueResolutionDrilldownModal = ({ isOpen, closeModal }) => {
    // State for filtering
    const [activeFilter, setActiveFilter] = useState('all');
    const [activeTeamFilter, setActiveTeamFilter] = useState('all');
    const [activePriorityFilter, setActivePriorityFilter] = useState('all');

    // Handle filter change
    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
    };

    // Sample issue data
    const issueData = {
        open: [
            {
                id: 'I-001',
                title: 'UAT environment connectivity issues',
                priority: 'High',
                status: 'Open',
                assignedTo: 'Michael Chen',
                plannedTo: 'Apr 25, 2025',
                team: 'Technical',
                role: 'System Admin',
                impactedTask: 'UAT Testing',
                createdDate: 'Apr 10, 2025'
            },
            {
                id: 'I-002',
                title: 'Missing field mappings in data migration',
                priority: 'Critical',
                status: 'Open',
                assignedTo: 'Priya Sharma',
                plannedTo: 'Apr 20, 2025',
                team: 'Data',
                role: 'Data Architect',
                impactedTask: 'Data Migration',
                createdDate: 'Apr 12, 2025'
            },
            {
                id: 'I-003',
                title: 'Security approval pending for cloud deployment',
                priority: 'Medium',
                status: 'Open',
                assignedTo: 'Robert Taylor',
                plannedTo: 'Apr 28, 2025',
                team: 'Security',
                role: 'Security Lead',
                impactedTask: 'Cloud Deployment',
                createdDate: 'Apr 15, 2025'
            },
        ],
        resolved: [
            {
                id: 'I-004',
                title: 'Configuration issues in test environment',
                priority: 'High',
                status: 'Resolved',
                assignedTo: 'Lisa Johnson',
                plannedTo: 'Apr 18, 2025',
                team: 'Technical',
                role: 'DevOps Engineer',
                impactedTask: 'Integration Testing',
                createdDate: 'Apr 8, 2025'
            },
            {
                id: 'I-005',
                title: 'Missing access permissions for development team',
                priority: 'Medium',
                status: 'Resolved',
                assignedTo: 'James Wilson',
                plannedTo: 'Apr 15, 2025',
                team: 'Security',
                role: 'IAM Specialist',
                impactedTask: 'Development Setup',
                createdDate: 'Apr 5, 2025'
            }
        ]
    };

    // Get filtered tasks based on current filters
    const getFilteredIssues = () => {
        let issues = [];
        
        // Status filter (Open, Resolved, All)
        if (activeFilter === 'open') {
            issues = issueData.open;
        } else if (activeFilter === 'resolved') {
            issues = issueData.resolved;
        } else {
            issues = [...issueData.open, ...issueData.resolved];
        }
        
        // Team filter
        if (activeTeamFilter !== 'all') {
            issues = issues.filter(issue => issue.team === activeTeamFilter);
        }
        
        // Priority filter
        if (activePriorityFilter !== 'all') {
            issues = issues.filter(issue => issue.priority === activePriorityFilter);
        }
        
        return issues;
    };

    const filteredIssues = getFilteredIssues();
    
    // Get unique teams for team filter
    const teams = [...new Set([...issueData.open, ...issueData.resolved].map(issue => issue.team))];

    // Helper function to get priority color
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'Critical':
                return 'bg-red-100 text-red-800';
            case 'High':
                return 'bg-orange-100 text-orange-800';
            case 'Medium':
                return 'bg-yellow-100 text-yellow-800';
            case 'Low':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Helper function to get status color
    const getStatusColor = (status) => {
        return status === 'Resolved'
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
                            <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all">
                                <div className="flex justify-between items-center mb-4">
                                    <Dialog.Title as="h3" className="text-md font-semibold text-gray-900">
                                        Issue Resolution Details
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
                                    <div className="grid grid-cols-3 gap-4">
                                        <div
                                            className={`cursor-pointer rounded-lg p-3 border ${activeFilter === 'open' ? 'bg-amber-50 border-amber-200' : 'bg-gray-50 border-gray-200'}`}
                                            onClick={() => handleFilterChange('open')}
                                        >
                                            <div className="text-xl font-bold text-amber-600">{issueData.open.length}</div>
                                            <div className="text-sm text-gray-700">Open Issues</div>
                                        </div>
                                        <div
                                            className={`cursor-pointer rounded-lg p-3 border ${activeFilter === 'resolved' ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}
                                            onClick={() => handleFilterChange('resolved')}
                                        >
                                            <div className="text-xl font-bold text-green-600">{issueData.resolved.length}</div>
                                            <div className="text-sm text-gray-700">Resolved Issues</div>
                                        </div>
                                        <div
                                            className={`cursor-pointer rounded-lg p-3 border ${activeFilter === 'all' ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}
                                            onClick={() => handleFilterChange('all')}
                                        >
                                            <div className="text-xl font-bold text-blue-600">
                                                {(issueData.open.length / (issueData.open.length + issueData.resolved.length) * 100).toFixed(0)}%
                                            </div>
                                            <div className="text-sm text-gray-700">Resolution Rate</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border rounded-lg overflow-hidden mb-3">
                                    <div className="flex justify-between bg-gray-50 p-2 border-b">
                                        <div className="flex">
                                            <button
                                                className={`px-4 py-1 text-sm rounded ${activeFilter === 'all' ? 'bg-white shadow-sm font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
                                                onClick={() => handleFilterChange('all')}
                                            >
                                                All Issues
                                            </button>
                                            <button
                                                className={`px-4 py-1 text-sm rounded ${activeFilter === 'open' ? 'bg-white shadow-sm font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
                                                onClick={() => handleFilterChange('open')}
                                            >
                                                Open Issues
                                            </button>
                                            <button
                                                className={`px-4 py-1 text-sm rounded ${activeFilter === 'resolved' ? 'bg-white shadow-sm font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
                                                onClick={() => handleFilterChange('resolved')}
                                            >
                                                Resolved Issues
                                            </button>
                                        </div>
                                        <div className="flex space-x-2">
                                            <select
                                                value={activeTeamFilter}
                                                onChange={(e) => setActiveTeamFilter(e.target.value)}
                                                className="px-2 py-1 text-sm border rounded text-gray-700 bg-white"
                                            >
                                                <option value="all">All Teams</option>
                                                {teams.map(team => (
                                                    <option key={team} value={team}>{team}</option>
                                                ))}
                                            </select>
                                            <select
                                                value={activePriorityFilter}
                                                onChange={(e) => setActivePriorityFilter(e.target.value)}
                                                className="px-2 py-1 text-sm border rounded text-gray-700 bg-white"
                                            >
                                                <option value="all">All Priorities</option>
                                                <option value="Critical">Critical</option>
                                                <option value="High">High</option>
                                                <option value="Medium">Medium</option>
                                                <option value="Low">Low</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="max-h-[40vh] overflow-y-auto">
                                        {filteredIssues.length > 0 ? (
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50 sticky top-0">
                                                    <tr>
                                                        <th scope="col" className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Issue
                                                        </th>
                                                        <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Priority
                                                        </th>
                                                        <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Status
                                                        </th>
                                                        <th scope="col" className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Assigned To
                                                        </th>
                                                        <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Planned To
                                                        </th>
                                                        <th scope="col" className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Created Date
                                                        </th>
                                                        <th scope="col" className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Team
                                                        </th>
                                                        <th scope="col" className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Role
                                                        </th>
                                                        <th scope="col" className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Impacted Task
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {filteredIssues.map(issue => (
                                                        <tr key={issue.id} className={issue.status === 'Open' ? 'bg-amber-50' : ''}>
                                                            <td className="p-3">
                                                                <div className="flex items-center">
                                                                    <span className="text-gray-900 font-medium text-xs">{issue.title}</span>
                                                                </div>
                                                            </td>
                                                            <td className="p-3 text-center whitespace-nowrap">
                                                                <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(issue.priority)}`}>
                                                                    {issue.priority}
                                                                </span>
                                                            </td>
                                                            <td className="p-3 text-center whitespace-nowrap">
                                                                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(issue.status)}`}>
                                                                    {issue.status}
                                                                </span>
                                                            </td>
                                                            <td className="p-3 whitespace-nowrap text-gray-700 text-xs">
                                                                {issue.assignedTo}
                                                            </td>
                                                            <td className="p-3 text-center whitespace-nowrap text-gray-700 text-xs">
                                                                {issue.plannedTo}
                                                            </td>
                                                            <td className="p-3 whitespace-nowrap text-gray-700 text-xs">
                                                                {issue.createdDate}
                                                            </td>
                                                            <td className="p-3 whitespace-nowrap text-gray-700 text-xs">
                                                                {issue.team}
                                                            </td>
                                                            <td className="p-3 whitespace-nowrap text-gray-700 text-xs">
                                                                {issue.role}
                                                            </td>
                                                            <td className="p-3 whitespace-nowrap text-gray-700 text-xs">
                                                                {issue.impactedTask}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        ) : (
                                            <div className="p-4 text-sm text-gray-500">No issues match the selected filters</div>
                                        )}
                                    </div>
                                </div>

                                {/* <div className="text-xs text-gray-500 mb-2">
                                    Note: Click on the section cards above to filter issues
                                </div> */}

                                <div className="flex flex-wrap gap-3">
                                    <div className="flex items-center text-xs text-gray-500">
                                        <div className="w-3 h-3 bg-amber-50 rounded mr-1"></div>
                                        <span>Open Issues</span>
                                    </div>
                                    <div className="flex items-center text-xs text-gray-500">
                                        <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                                        <span>Critical Priority</span>
                                    </div>
                                    <div className="flex items-center text-xs text-gray-500">
                                        <div className="w-3 h-3 rounded-full bg-orange-500 mr-1"></div>
                                        <span>High Priority</span>
                                    </div>
                                    <div className="flex items-center text-xs text-gray-500">
                                        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
                                        <span>Medium Priority</span>
                                    </div>
                                    <div className="flex items-center text-xs text-gray-500">
                                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                                        <span>Low Priority</span>
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

const IssueResolutionCard = () => {
    const [showDrilldown, setShowDrilldown] = useState(false);

    return (
        <div className="bg-white rounded-lg shadow p-5 h-full flex flex-col">
            {/* Header section */}
            <div>
                <h3 className="font-medium text-gray-700 mb-2">Issue Resolution Efficiency</h3>
                <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-700">Resolution Rate</span>
                    <span className="text-sm font-medium text-green-600">87%</span>
                </div>
                <div className="text-xs text-gray-500 mb-3">
                    (Resolved Issues / Total Issues) × 100%
                </div>
                <div className="mb-2 bg-gray-200 h-1.5 rounded-full">
                    <div className="bg-green-500 h-full rounded-full" style={{ width: '87%' }}></div>
                </div>
            </div>

            {/* Main content - with flex-grow to expand and take available space */}
            <div className="flex-grow my-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-gray-700">12</div>
                        <div className="text-xs text-gray-500">Open Issues</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">6.2</div>
                        <div className="text-xs text-gray-500">Avg. Days to Resolve</div>
                    </div>
                </div>
            </div>

            {/* Action button section */}
            <div className="border-t pt-3 flex justify-end mt-auto">
                <button
                    onClick={() => setShowDrilldown(true)}
                    className="text-blue-600 text-xs hover:underline focus:outline-none"
                >
                    View Open Issues
                </button>
            </div>

            {/* Drilldown Modal */}
            <IssueResolutionDrilldownModal
                isOpen={showDrilldown}
                closeModal={() => setShowDrilldown(false)}
            />
        </div>
    );
};

export default IssueResolutionCard;