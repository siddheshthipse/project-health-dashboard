import React, { useState, Fragment } from 'react';
import { Dialog, Transition, Listbox, Switch } from '@headlessui/react';
import { XMarkIcon, ChevronRightIcon, ChevronDownIcon, PlusIcon, MinusIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

const BaselineChangesCard = () => {
  const [showDrilldown, setShowDrilldown] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col justify-between">
      {/* Title Section */}
      <div>
        <h3 className="font-medium text-gray-700 mb-2">Baseline Changes</h3>
      </div>

      {/* Main Content - Centered */}
      <div className="flex justify-center items-center py-2">
        <div className="text-center">
          <div className="text-3xl font-bold text-amber-600">1</div>
          <div className="text-xs text-gray-500">revisions in baseline</div>
        </div>
      </div>

      {/* Last Updated Info */}
      <div className="text-xs text-gray-500 text-center mb-2">
        Last Change: Dec 4, 2024
      </div>

      {/* Action Button */}
      <div className="pt-2 border-t flex justify-end">
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
        // Similar structure to baseline 1
      ]
    },
    {
      id: 'baseline-3',
      name: 'Baseline 3',
      date: 'Mar 28, 2025',
      netEffortDelta: 8,
      totalAffectedTasks: 18,
      tasks: [
        // Similar structure to baseline 1
      ]
    },
    // Adding more baselines for demonstration
    {
      id: 'baseline-4',
      name: 'Baseline 4',
      date: 'Apr 10, 2025',
      netEffortDelta: 12,
      totalAffectedTasks: 25,
      tasks: []
    },
    {
      id: 'baseline-5',
      name: 'Baseline 5',
      date: 'Apr 22, 2025',
      netEffortDelta: -5,
      totalAffectedTasks: 15,
      tasks: []
    },
    {
      id: 'baseline-6',
      name: 'Baseline 6',
      date: 'May 5, 2025',
      netEffortDelta: 7,
      totalAffectedTasks: 22,
      tasks: []
    },
    {
      id: 'baseline-7',
      name: 'Baseline 7',
      date: 'May 18, 2025',
      netEffortDelta: 3,
      totalAffectedTasks: 10,
      tasks: []
    },
    {
      id: 'baseline-8',
      name: 'Baseline 8',
      date: 'Jun 2, 2025',
      netEffortDelta: -2,
      totalAffectedTasks: 8,
      tasks: []
    },
    {
      id: 'baseline-9',
      name: 'Baseline 9',
      date: 'Jun 20, 2025',
      netEffortDelta: 10,
      totalAffectedTasks: 30,
      tasks: []
    },
    {
      id: 'baseline-10',
      name: 'Baseline 10',
      date: 'Jul 5, 2025',
      netEffortDelta: 6,
      totalAffectedTasks: 12,
      tasks: []
    }
  ];

  // Selected baseline state
  const [selectedBaseline, setSelectedBaseline] = useState(baselineData[0]);
  const [showAffectedOnly, setShowAffectedOnly] = useState(false);

  // Function to toggle row expansion
  const toggleRowExpansion = (id) => {
    setExpandedRows({
      ...expandedRows,
      [id]: !expandedRows[id]
    });
  };

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
        <tr className={`border-b hover:bg-gray-50 ${task.status === 'added' ? 'bg-green-50' :
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
              <span className="ml-1 font-medium text-gray-700 text-xs">{task.title}</span>
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
              <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-lg bg-white p-4 shadow-xl transition-all">
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title as="h3" className="text-md font-semibold text-gray-900">
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
                  {/* Baseline selector dropdown using Headless UI Listbox */}
                  <div className="mb-4">
                    <Listbox value={selectedBaseline} onChange={setSelectedBaseline}>
                      <div className="relative">
                        <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-blue-50 py-2.5 pl-4 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm">
                          <div className="flex items-center">
                            <span className="block truncate font-medium text-blue-700">{selectedBaseline.name}</span>
                            <span className="ml-2 text-sm text-blue-500">({selectedBaseline.date})</span>
                          </div>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {baselineData.map((baseline) => (
                              <Listbox.Option
                                key={baseline.id}
                                className={({ active }) =>
                                  `relative cursor-pointer select-none py-2 px-4 ${active ? 'bg-blue-50 text-blue-700' : 'text-gray-900'
                                  }`
                                }
                                value={baseline}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <div className="flex items-center justify-between">
                                      <div>
                                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                          {baseline.name}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                          {baseline.date}
                                        </span>
                                      </div>
                                      <div className="text-xs">
                                        <span className={baseline.netEffortDelta > 0 ? 'text-red-600' : 'text-green-600'}>
                                          {baseline.netEffortDelta > 0 ? '+' : ''}{baseline.netEffortDelta} days
                                        </span>
                                      </div>
                                    </div>
                                    {/* {selected ? (
                                      <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-600">
                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                      </span>
                                    ) : null} */}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>

                  {/* Additional filtering options - optional, can be used for larger datasets */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-xs text-gray-500">
                      Comparing current plan with <span className="font-medium text-gray-700">{selectedBaseline.name}</span> ({selectedBaseline.date})
                    </div>
                    <div className="flex items-center">
                      <Switch
                        checked={showAffectedOnly}
                        onChange={setShowAffectedOnly}
                        className={`${showAffectedOnly ? 'bg-blue-600' : 'bg-gray-200'
                          } relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mr-2`}
                      >
                        <span className="sr-only">Show affected tasks only</span>
                        <span
                          className={`${showAffectedOnly ? 'translate-x-5' : 'translate-x-1'
                            } inline-block h-3 w-3 transform rounded-full bg-white transition-transform`}
                        />
                      </Switch>
                      <span className="text-xs text-gray-700">
                        {showAffectedOnly ? 'Showing affected tasks only' : 'Showing all tasks'}
                      </span>
                    </div>
                  </div>

                  {/* Baseline metrics cards */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
                      <div className="text-lg font-bold text-amber-600">
                        {selectedBaseline.netEffortDelta > 0 ? '+' : ''}{selectedBaseline.netEffortDelta} days
                      </div>
                      <div className="text-xs text-gray-700">Net Effort Change</div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                      <div className="text-lg font-bold text-blue-600">{selectedBaseline.totalAffectedTasks}</div>
                      <div className="text-xs text-gray-700">Affected Tasks</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <div className="text-lg font-bold text-gray-600">Current vs. {selectedBaseline.name}</div>
                      <div className="text-xs text-gray-700">Baseline date: {selectedBaseline.date}</div>
                    </div>
                  </div>

                  {/* Tasks table */}
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
                        {selectedBaseline.tasks && selectedBaseline.tasks.length > 0 ? (
                          selectedBaseline.tasks.map(task => renderTaskRow(task))
                        ) : (
                          <tr>
                            <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                              No task changes found for this baseline
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Legend */}
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