import React, { useState, Fragment } from 'react';
import { Dialog, Transition, Tab } from '@headlessui/react';
import { XMarkIcon, ChevronRightIcon, ChevronDownIcon, PlusIcon, MinusIcon } from '@heroicons/react/20/solid';

// Baseline Changes Card with Drilldown
const BaselineChangesCard = () => {
  const [showDrilldown, setShowDrilldown] = useState(false);
  
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-medium text-gray-700 mb-2">Baseline Changes</h3>
      <div className="flex justify-center">
        <div className="text-center">
          <div className="text-4xl font-bold text-amber-600">3</div>
          <div className="text-sm text-gray-500">revisions in baseline</div>
        </div>
      </div>
      <div className="text-xs text-gray-500 mt-3 text-center">
        Last change: Mar 28, 2025
      </div>
      <div className="mt-3 pt-2 border-t flex justify-end">
        <button 
          onClick={() => setShowDrilldown(true)} 
          className="text-blue-600 text-xs hover:underline focus:outline-none"
        >
          View Changes
        </button>
      </div>
      
      {/* Drilldown Modal */}
      <BaselineChangesDrilldownModal 
        isOpen={showDrilldown} 
        closeModal={() => setShowDrilldown(false)} 
      />
    </div>
  );
};

// Baseline Changes Drilldown Modal
const BaselineChangesDrilldownModal = ({ isOpen, closeModal }) => {
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

  // Sample baseline comparison data
  const baselineData = [
    {
      id: 'baseline-1',
      name: 'Baseline 1',
      date: 'Feb 15, 2025',
      netEffortDelta: 25, // positive means increased effort in current plan
      totalAffectedTasks: 32,
      tasks: [
        {
          id: 'wave-1',
          level: 'Wave',
          title: 'Wave 1 - PTP 1/2',
          status: 'modified',
          baselineDates: 'Feb 15, 2025 - Jun 15, 2025',
          currentDates: 'Feb 15, 2025 - Jun 30, 2025',
          deviation: '+15 days',
          children: [
            {
              id: 'phase-1',
              level: 'Phase',
              title: 'Explore Phase',
              status: 'modified',
              baselineDates: 'Feb 15, 2025 - Mar 15, 2025',
              currentDates: 'Feb 15, 2025 - Mar 20, 2025',
              deviation: '+5 days',
              children: [
                {
                  id: 'task-1',
                  level: 'Activity',
                  title: 'Requirements Gathering',
                  status: 'modified',
                  baselineDates: 'Feb 15, 2025 - Feb 28, 2025',
                  currentDates: 'Feb 15, 2025 - Mar 5, 2025',
                  deviation: '+5 days',
                }
              ]
            },
            {
              id: 'task-2',
              level: 'Activity',
              title: 'Integration Testing',
              status: 'added',
              baselineDates: 'N/A',
              currentDates: 'Jun 10, 2025 - Jun 20, 2025',
              deviation: '+10 days',
            }
          ]
        },
        {
          id: 'task-3',
          level: 'Activity',
          title: 'Performance Testing',
          status: 'removed',
          baselineDates: 'Jun 5, 2025 - Jun 15, 2025',
          currentDates: 'N/A',
          deviation: '-10 days',
        }
      ]
    },
    {
      id: 'baseline-2',
      name: 'Baseline 2',
      date: 'Mar 10, 2025',
      netEffortDelta: 15,
      totalAffectedTasks: 27,
      tasks: [
        // Similar structure to baseline 1 but with different values
      ]
    },
    {
      id: 'baseline-3',
      name: 'Baseline 3',
      date: 'Mar 28, 2025',
      netEffortDelta: 8,
      totalAffectedTasks: 18,
      tasks: [
        // Similar structure to baseline 1 but with different values
      ]
    }
  ];

  // Helper function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'modified':
        return 'bg-yellow-100 text-yellow-800';
      case 'added':
        return 'bg-green-100 text-green-800';
      case 'removed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Helper function to get deviation color
  const getDeviationColor = (deviation) => {
    if (deviation.startsWith('+')) {
      return 'text-red-600'; // Added time is shown in red
    } else if (deviation.startsWith('-')) {
      return 'text-green-600'; // Reduced time is shown in green
    }
    return 'text-gray-600';
  };

  // Recursive function to render task rows
  const renderTaskRow = (task, depth = 0) => {
    const hasChildren = task.children && task.children.length > 0;
    const isExpanded = expandedRows[task.id];
    const indentPadding = depth * 12; // 12px per level of depth
    
    return (
      <React.Fragment key={task.id}>
        <tr className={`border-b hover:bg-gray-50 ${
          task.status === 'added' ? 'bg-green-50' :
          task.status === 'removed' ? 'bg-red-50' : ''
        }`}>
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
              {task.level}
            </span>
          </td>
          <td className="p-3 text-center whitespace-nowrap">
            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(task.status)}`}>
              {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
            </span>
          </td>
          <td className="p-3 text-center whitespace-nowrap text-xs text-gray-600">
            {task.baselineDates}
          </td>
          <td className="p-3 text-center whitespace-nowrap text-xs text-gray-600">
            {task.currentDates}
          </td>
          <td className="p-3 text-center whitespace-nowrap">
            <span className={`font-medium text-sm ${getDeviationColor(task.deviation)}`}>
              {task.status === 'added' && <PlusIcon className="inline-block h-3 w-3 mr-1" />}
              {task.status === 'removed' && <MinusIcon className="inline-block h-3 w-3 mr-1" />}
              {task.deviation}
            </span>
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
              <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all">
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title as="h3" className="text-lg font-semibold text-gray-900">
                    Baseline Change Analysis
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
                  <Tab.Group>
                    <Tab.List className="flex space-x-1 rounded-lg bg-blue-50 p-1">
                      {baselineData.map((baseline) => (
                        <Tab
                          key={baseline.id}
                          className={({ selected }) =>
                            `w-full rounded-lg py-2.5 text-sm font-medium leading-5 
                            ${
                              selected
                                ? 'bg-white shadow text-blue-700'
                                : 'text-blue-500 hover:bg-white/[0.12] hover:text-blue-600'
                            }`
                          }
                        >
                          {baseline.name} ({baseline.date})
                        </Tab>
                      ))}
                    </Tab.List>

                    <Tab.Panels className="mt-4">
                      {baselineData.map((baseline) => (
                        <Tab.Panel
                          key={baseline.id}
                          className="rounded-lg bg-white"
                        >
                          <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
                              <div className="text-lg font-bold text-amber-600">{baseline.netEffortDelta > 0 ? '+' : ''}{baseline.netEffortDelta} days</div>
                              <div className="text-xs text-gray-700">Net Effort Change</div>
                            </div>
                            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                              <div className="text-lg font-bold text-blue-600">{baseline.totalAffectedTasks}</div>
                              <div className="text-xs text-gray-700">Affected Tasks</div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                              <div className="text-lg font-bold text-gray-600">Current vs. {baseline.name}</div>
                              <div className="text-xs text-gray-700">Baseline date: {baseline.date}</div>
                            </div>
                          </div>

                          <div className="border rounded-lg overflow-hidden max-h-[50vh] overflow-y-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50 sticky top-0">
                                <tr>
                                  <th scope="col" className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Task
                                  </th>
                                  <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Level
                                  </th>
                                  <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                  </th>
                                  <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Baseline Dates
                                  </th>
                                  <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Current Dates
                                  </th>
                                  <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Deviation
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {baseline.tasks.map(task => renderTaskRow(task))}
                              </tbody>
                            </table>
                          </div>
                        </Tab.Panel>
                      ))}
                    </Tab.Panels>
                  </Tab.Group>
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  <div className="flex items-center text-xs text-gray-500">
                    <div className="w-3 h-3 bg-yellow-100 rounded mr-1"></div>
                    <span>Modified Tasks</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <div className="w-3 h-3 bg-green-50 rounded mr-1"></div>
                    <span>Added Tasks</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <div className="w-3 h-3 bg-red-50 rounded mr-1"></div>
                    <span>Removed Tasks</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <span className="text-red-600 font-medium">+10 days</span>
                    <span className="ml-1">Increased Effort</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <span className="text-green-600 font-medium">-10 days</span>
                    <span className="ml-1">Reduced Effort</span>
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

export default BaselineChangesCard;