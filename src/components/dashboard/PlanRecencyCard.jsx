import React, { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, ClockIcon } from '@heroicons/react/20/solid';

const PlanRecencyCard = () => {
  const [showDrilldown, setShowDrilldown] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow p-5 h-full flex flex-col justify-between">
      {/* Title Section */}
      <div>
        <h3 className="font-medium text-gray-700 mb-3">Plan Recency</h3>
      </div>

      {/* Main Content - Centered */}
      <div className="flex-grow flex flex-col justify-center items-center my-2">
        <div className="text-center">
          <div className="text-4xl font-bold text-red-600">1</div>
          <div className="text-sm text-gray-500 mt-1">days since last update</div>
        </div>

        <div className="text-xs text-gray-500 mt-3 text-center">
          Last Updated: May 7, 2025
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-auto pt-3 border-t flex justify-end">
        <button
          onClick={() => setShowDrilldown(true)}
          className="text-blue-600 text-xs hover:underline focus:outline-none"
        >
          View Update History
        </button>
      </div>

      {/* Drilldown Modal */}
      <PlanRecencyDrilldownModal
        isOpen={showDrilldown}
        closeModal={() => setShowDrilldown(false)}
      />
    </div>
  );
};
// Plan Recency Drilldown Modal
const PlanRecencyDrilldownModal = ({ isOpen, closeModal }) => {
  // Mock data for change history
  const changeHistoryData = [
    {
      id: 'ch-001',
      workItem: 'task',
      action: 'Updated',
      changes: [
        {
          action: 'updated',
          changedParameter: 'title',
          changedFrom: 'UAT Planning',
          changedTo: 'UAT Planning and Coordination'
        },
        {
          action: 'updated',
          changedParameter: 'plannedEnd',
          changedFrom: '2025-04-15',
          changedTo: '2025-04-20'
        }
      ],
      performedBy: 'Sarah Williams',
      performedOn: new Date('2025-04-18T14:25:30Z'), // 5 hours ago
      recency: '5 hours ago'
    },
    {
      id: 'ch-002',
      workItem: 'task',
      action: 'Created',
      changes: [
        {
          action: 'created',
          changedParameter: 'title',
          changedFrom: '',
          changedTo: 'Defining Test Cases/Test Scripts'
        }
      ],
      performedBy: 'Michael Chen',
      performedOn: new Date('2025-04-17T09:30:15Z'), // 1 day ago
      recency: '1 day ago'
    },
    {
      id: 'ch-003',
      workItem: 'issue',
      action: 'Updated',
      changes: [
        {
          action: 'updated',
          changedParameter: 'status',
          changedFrom: 'Open',
          changedTo: 'Resolved'
        }
      ],
      performedBy: 'Robert Taylor',
      performedOn: new Date('2025-04-15T11:45:20Z'), // 3 days ago
      recency: '3 days ago'
    },
    {
      id: 'ch-004',
      workItem: 'risk',
      action: 'Updated',
      changes: [
        {
          action: 'updated',
          changedParameter: 'impactScore',
          changedFrom: 'Medium (2)',
          changedTo: 'High (3)'
        }
      ],
      performedBy: 'Priya Sharma',
      performedOn: new Date('2025-04-13T16:20:45Z'), // 5 days ago
      recency: '5 days ago'
    },
    {
      id: 'ch-005',
      workItem: 'task',
      action: 'Deleted',
      changes: [
        {
          action: 'deleted',
          changedParameter: 'title',
          changedFrom: 'Unnecessary Task',
          changedTo: ''
        }
      ],
      performedBy: 'John Smith',
      performedOn: new Date('2025-04-12T10:15:30Z'), // 6 days ago
      recency: '6 days ago'
    },
    {
      id: 'ch-006',
      workItem: 'signoff',
      action: 'Created',
      changes: [
        {
          action: 'created',
          changedParameter: 'title',
          changedFrom: '',
          changedTo: 'Approval for UAT Phase Completion'
        }
      ],
      performedBy: 'Sarah Williams',
      performedOn: new Date('2025-04-10T14:50:10Z'), // 8 days ago
      recency: '8 days ago'
    },
    {
      id: 'ch-007',
      workItem: 'task',
      action: 'Updated',
      changes: [
        {
          action: 'updated',
          changedParameter: 'plannedFrom',
          changedFrom: '2025-04-05',
          changedTo: '2025-04-10'
        },
        {
          action: 'updated',
          changedParameter: 'plannedTo',
          changedFrom: '2025-04-15',
          changedTo: '2025-04-20'
        }
      ],
      performedBy: 'Michael Chen',
      performedOn: new Date('2025-04-05T09:30:00Z'), // 13 days ago (last update)
      recency: '13 days ago'
    }
  ];

  // Helper function to get work item color
  const getWorkItemColor = (workItem) => {
    switch (workItem.toLowerCase()) {
      case 'task':
        return 'bg-blue-100 text-blue-800';
      case 'issue':
        return 'bg-orange-100 text-orange-800';
      case 'risk':
        return 'bg-red-100 text-red-800';
      case 'signoff':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function to get action color
  const getActionColor = (action) => {
    switch (action) {
      case 'Created':
        return 'bg-green-100 text-green-800';
      case 'Updated':
        return 'bg-yellow-100 text-yellow-800';
      case 'Deleted':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function to format date
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
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
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-lg bg-white p-4 shadow-xl transition-all">
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title as="h3" className="text-md font-semibold text-gray-900">
                    Plan Update History
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
                  <div className="bg-red-50 rounded-lg p-3 border border-red-200 flex items-center">
                    <ClockIcon className="h-5 w-5 text-red-600 mr-2" />
                    <div>
                      <span className="text-sm font-medium text-red-800">Last plan update was 12 days ago</span>
                      <p className="text-xs text-red-700 mt-0.5">Regular plan updates are recommended to ensure project tracking accuracy</p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg overflow-hidden max-h-[50vh] overflow-y-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        <th scope="col" className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Changes
                        </th>
                        <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Work Item
                        </th>
                        <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                        <th scope="col" className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Performed By
                        </th>
                        <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date & Time
                        </th>
                        <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Recency
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {changeHistoryData.map(change => (
                        <tr key={change.id} className="hover:bg-gray-50">
                          <td className="p-3">
                            <div className="space-y-1">
                              {change.changes.map((item, index) => (
                                <div key={index} className="text-xs">
                                  <span className="font-medium text-gray-700">{item.changedParameter}: </span>
                                  {item.action === 'created' ? (
                                    <span className="text-green-600">{item.changedTo}</span>
                                  ) : item.action === 'deleted' ? (
                                    <span className="text-red-600 line-through">{item.changedFrom}</span>
                                  ) : (
                                    <span>
                                      <span className="text-red-600 line-through">{item.changedFrom}</span>
                                      {' → '}
                                      <span className="text-green-600">{item.changedTo}</span>
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="p-3 text-center whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs ${getWorkItemColor(change.workItem)}`}>
                              {change.workItem.charAt(0).toUpperCase() + change.workItem.slice(1)}
                            </span>
                          </td>
                          <td className="p-3 text-center whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs ${getActionColor(change.action)}`}>
                              {change.action}
                            </span>
                          </td>
                          <td className="p-3 whitespace-nowrap text-xs text-gray-700">
                            {change.performedBy}
                          </td>
                          <td className="p-3 text-center whitespace-nowrap text-xs text-gray-600">
                            {formatDate(change.performedOn)}
                          </td>
                          <td className="p-3 text-center whitespace-nowrap text-xs font-medium text-gray-700">
                            {change.recency}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 text-xs text-gray-500">
                  Showing the last 7 updates. The plan should be updated regularly to reflect the current project status.
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PlanRecencyCard;