import React, { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, FunnelIcon } from '@heroicons/react/20/solid';

const IssueResolutionDrilldownModal = ({ isOpen, closeModal }) => {
  // State for filtering
  const [showOpenOnly, setShowOpenOnly] = useState(true);
  
  // Sample issue data
  const issueData = [
    {
      id: 'I-001',
      title: 'UAT environment connectivity issues',
      priority: 'High',
      status: 'Open',
      assignedTo: 'Michael Chen',
      plannedTo: 'Apr 25, 2025',
      team: 'Technical',
      role: 'System Admin'
    },
    {
      id: 'I-002',
      title: 'Missing field mappings in data migration',
      priority: 'Critical',
      status: 'Open',
      assignedTo: 'Priya Sharma',
      plannedTo: 'Apr 20, 2025',
      team: 'Data',
      role: 'Data Architect'
    },
    {
      id: 'I-003',
      title: 'Performance degradation during bulk operations',
      priority: 'Medium',
      status: 'Open',
      assignedTo: 'Robert Taylor',
      plannedTo: 'Apr 28, 2025',
      team: 'Performance',
      role: 'Solution Architect'
    },
    {
      id: 'I-004',
      title: 'User permissions not correctly assigned',
      priority: 'High',
      status: 'Open',
      assignedTo: 'Sarah Williams',
      plannedTo: 'Apr 21, 2025',
      team: 'Security',
      role: 'Security Admin'
    },
    {
      id: 'I-005',
      title: 'Incorrect currency conversion in financial reports',
      priority: 'High',
      status: 'Resolved',
      assignedTo: 'John Smith',
      plannedTo: 'Apr 15, 2025',
      team: 'Finance',
      role: 'Functional Consultant'
    },
    {
      id: 'I-006',
      title: 'Integration test failures with third-party API',
      priority: 'Medium',
      status: 'Open',
      assignedTo: 'Michael Chen',
      plannedTo: 'Apr 26, 2025',
      team: 'Integration',
      role: 'Developer'
    },
    {
      id: 'I-007',
      title: 'Inconsistent data in master data imports',
      priority: 'Medium',
      status: 'Resolved',
      assignedTo: 'Priya Sharma',
      plannedTo: 'Apr 18, 2025',
      team: 'Data',
      role: 'Data Architect'
    },
    {
      id: 'I-008',
      title: 'Test script failures during regression testing',
      priority: 'High',
      status: 'Open',
      assignedTo: 'Robert Taylor',
      plannedTo: 'Apr 23, 2025',
      team: 'Testing',
      role: 'Test Lead'
    },
    {
      id: 'I-009',
      title: 'Session timeout issues during extended data entry',
      priority: 'Low',
      status: 'Open',
      assignedTo: 'Sarah Williams',
      plannedTo: 'Apr 30, 2025',
      team: 'UX',
      role: 'UI Developer'
    },
    {
      id: 'I-010',
      title: 'Reporting dashboard displays incorrect data',
      priority: 'Critical',
      status: 'Open',
      assignedTo: 'John Smith',
      plannedTo: 'Apr 22, 2025',
      team: 'Reporting',
      role: 'BI Developer'
    }
  ];

  // Filter the issues based on current setting
  const filteredIssues = showOpenOnly 
    ? issueData.filter(issue => issue.status === 'Open')
    : issueData;

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
                  <Dialog.Title as="h3" className="text-lg font-semibold text-gray-900">
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

                <div className="mb-4 flex justify-between items-center">
                  <div className="flex gap-5">
                    <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
                      <div className="text-lg font-bold text-amber-600">12</div>
                      <div className="text-xs text-gray-700">Open Issues</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                      <div className="text-lg font-bold text-green-600">87%</div>
                      <div className="text-xs text-gray-700">Resolution Rate</div>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
                      <div className="text-lg font-bold text-orange-600">6.2 days</div>
                      <div className="text-xs text-gray-700">Avg. Resolution Time</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowOpenOnly(!showOpenOnly)}
                    className={`flex items-center px-3 py-2 text-sm border rounded ${
                      showOpenOnly ? 'bg-blue-50 border-blue-300 text-blue-700' : 'bg-gray-50 border-gray-300 text-gray-700'
                    }`}
                  >
                    <FunnelIcon className="h-4 w-4 mr-2" />
                    <span className='text-xs'>{showOpenOnly ? 'Show All Issues' : 'Show Open Only'}</span>
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
                          Team
                        </th>
                        <th scope="col" className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredIssues.map(issue => (
                        <tr key={issue.id} className={issue.status === 'Open' ? 'bg-amber-50' : ''}>
                          <td className="p-3">
                            <div className="flex items-center">
                              <span className="text-gray-900 font-medium text-sm">{issue.title}</span>
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
                          <td className="p-3 whitespace-nowrap text-gray-700 text-sm">
                            {issue.assignedTo}
                          </td>
                          <td className="p-3 text-center whitespace-nowrap text-gray-700 text-sm">
                            {issue.plannedTo}
                          </td>
                          <td className="p-3 whitespace-nowrap text-gray-700 text-sm">
                            {issue.team}
                          </td>
                          <td className="p-3 whitespace-nowrap text-gray-700 text-sm">
                            {issue.role}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
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

// Usage in your Issue Resolution Card
const IssueResolutionCard = () => {
  const [showDrilldown, setShowDrilldown] = useState(false);
  
  return (
    <div className="bg-white rounded-lg shadow p-5">
      <h3 className="font-medium text-gray-700 mb-2">Issue Resolution Efficiency</h3>
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-600">Average Resolution Time</span>
        <span className="text-sm font-medium text-orange-600">6.2 days</span>
      </div>
      <div className="mb-4 bg-gray-200 h-1.5 rounded-full">
        <div className="bg-orange-500 h-full rounded-full" style={{ width: '62%' }}></div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-700">12</div>
          <div className="text-xs text-gray-500">Open Issues</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">87%</div>
          <div className="text-xs text-gray-500">Resolution Rate</div>
        </div>
      </div>
      <div className="border-t pt-3 flex justify-end">
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