import React, { useState, Fragment } from 'react';
import { Menu, Dialog, Transition, Tab } from '@headlessui/react';
import { XMarkIcon, ArrowsPointingOutIcon, ArrowsPointingInIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import ReactECharts from 'echarts-for-react';

const ApprovalEfficiencyDrilldownModal = ({ isOpen, closeModal }) => {
    // State for filtering
    const [activeFilter, setActiveFilter] = useState('all');
    const [isFullScreen, setIsFullScreen] = useState(false);

    // Sample approval data
    const approvalData = {
        summary: {
            avgTotal: 9.6,
            avgLevel1: 2.5,
            avgLevel2: 3.8,
            avgLevel3: 2.1,
            avgLevel4: 1.2,
            byWorkstream: {
                BAS: 11.2,
                CIM: 8.5,
                DMG: 7.3,
                DRA: 13.1,
                EAM: 9.8,
                FSM: 7.9,
                HSSE: 8.2,
                PTP: 10.4
            }
        },
        approvals: [
            {
                id: 'A001',
                title: 'Data Migration Plan',
                requestedBy: 'Sarah Williams',
                workstream: 'DMG',
                submittedDate: 'Apr 5, 2025',
                currentLevel: 'Completed',
                level1Time: 3.0,
                level2Time: 4.2,
                level3Time: 2.5,
                level4Time: 1.8,
                totalTime: 11.5,
                status: 'Completed'
            },
            {
                id: 'A002',
                title: 'Cloud Infrastructure Budget',
                requestedBy: 'Michael Chen',
                workstream: 'BAS',
                submittedDate: 'Apr 8, 2025',
                currentLevel: 'Level 3',
                level1Time: 2.2,
                level2Time: 3.5,
                level3Time: null,
                level4Time: null,
                totalTime: 5.7,
                status: 'In Progress'
            },
            {
                id: 'A003',
                title: 'Security Policy Update',
                requestedBy: 'Robert Taylor',
                workstream: 'HSSE',
                submittedDate: 'Apr 2, 2025',
                currentLevel: 'Level 4',
                level1Time: 1.8,
                level2Time: 3.0,
                level3Time: 2.5,
                level4Time: null,
                totalTime: 7.3,
                status: 'In Progress'
            },
            {
                id: 'A004',
                title: 'Software License Renewal',
                requestedBy: 'Lisa Johnson',
                workstream: 'CIM',
                submittedDate: 'Mar 25, 2025',
                currentLevel: 'Completed',
                level1Time: 2.0,
                level2Time: 3.5,
                level3Time: 1.5,
                level4Time: 1.0,
                totalTime: 8.0,
                status: 'Completed'
            },
            {
                id: 'A005',
                title: 'Staff Training Program',
                requestedBy: 'James Wilson',
                workstream: 'PTP',
                submittedDate: 'Apr 10, 2025',
                currentLevel: 'Level 2',
                level1Time: 2.8,
                level2Time: null,
                level3Time: null,
                level4Time: null,
                totalTime: 2.8,
                status: 'In Progress'
            },
            {
                id: 'A006',
                title: 'Document Repository Structure',
                requestedBy: 'Emily Davis',
                workstream: 'DRA',
                submittedDate: 'Apr 7, 2025',
                currentLevel: 'Level 3',
                level1Time: 3.2,
                level2Time: 4.0,
                level3Time: null,
                level4Time: null,
                totalTime: 7.2,
                status: 'In Progress'
            },
            {
                id: 'A007',
                title: 'Maintenance Schedule Update',
                requestedBy: 'Thomas Brown',
                workstream: 'EAM',
                submittedDate: 'Apr 3, 2025',
                currentLevel: 'Completed',
                level1Time: 2.5,
                level2Time: 3.2,
                level3Time: 2.0,
                level4Time: 1.5,
                totalTime: 9.2,
                status: 'Completed'
            },
            {
                id: 'A008',
                title: 'Financial Reporting Templates',
                requestedBy: 'Jennifer Lee',
                workstream: 'FSM',
                submittedDate: 'Apr 12, 2025',
                currentLevel: 'Level 2',
                level1Time: 2.0,
                level2Time: null,
                level3Time: null,
                level4Time: null,
                totalTime: 2.0,
                status: 'In Progress'
            }
        ]
    };

    // Filter approvals based on status or workstream
    const getFilteredApprovals = () => {
        if (activeFilter === 'all') {
            return approvalData.approvals;
        } else if (activeFilter === 'inprogress') {
            return approvalData.approvals.filter(approval => approval.status === 'In Progress');
        } else if (activeFilter === 'completed') {
            return approvalData.approvals.filter(approval => approval.status === 'Completed');
        } else {
            // Filter by workstream
            return approvalData.approvals.filter(approval => approval.workstream === activeFilter);
        }
    };

    const filteredApprovals = getFilteredApprovals();
    
    // Get unique workstreams
    const workstreams = ['BAS', 'CIM', 'DMG', 'DRA', 'EAM', 'FSM', 'HSSE', 'PTP'];

    // Generate option for bar chart
    // const generateBarChartOption = () => {
    //     const data = Object.entries(approvalData.summary.byWorkstream).map(([workstream, time]) => ({
    //         name: workstream,
    //         value: time
    //     }));
        
    //     return {
    //         tooltip: {
    //             trigger: 'axis',
    //             formatter: '{b}: {c} days'
    //         },
    //         grid: {
    //             left: '3%',
    //             right: '4%',
    //             bottom: '3%',
    //             containLabel: true
    //         },
    //         xAxis: {
    //             type: 'value',
    //             name: 'Days',
    //             nameLocation: 'end',
    //             nameTextStyle: {
    //                 padding: [0, 0, 0, 10]
    //             }
    //         },
    //         yAxis: {
    //             type: 'category',
    //             data: data.map(item => item.name)
    //         },
    //         series: [
    //             {
    //                 name: 'Average Approval Time',
    //                 type: 'bar',
    //                 data: data.map(item => item.value),
    //                 itemStyle: {
    //                     color: function(params) {
    //                         const value = params.value;
    //                         if (value > 10) return '#ef4444';
    //                         if (value > 7) return '#f59e0b';
    //                         return '#22c55e';
    //                     }
    //                 },
    //                 label: {
    //                     show: true,
    //                     position: 'right',
    //                     formatter: '{c} days'
    //                 }
    //             }
    //         ]
    //     };
    // };

    // Helper function to determine status color
    const getStatusColor = (status) => {
        return status === 'Completed'
            ? 'bg-green-100 text-green-800'
            : 'bg-amber-100 text-amber-800';
    };

    // Helper function to determine time color
    const getTimeColor = (time) => {
        if (time === null) return 'text-gray-400';
        if (time > 3) return 'text-red-600';
        if (time > 2) return 'text-amber-600';
        return 'text-green-600';
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
                    <div className={`flex min-h-full items-center justify-center ${isFullScreen ? 'p-0' : 'p-4'}`}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel 
                                className={`${isFullScreen ? 'w-screen h-screen m-0 rounded-none' : 'w-full max-w-6xl rounded-lg'} transform overflow-hidden bg-white p-4 shadow-xl transition-all`}
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <Dialog.Title as="h3" className="text-md font-semibold text-gray-900">
                                        Signoff Approval Cycle Analysis
                                    </Dialog.Title>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            type="button"
                                            onClick={() => setIsFullScreen(!isFullScreen)}
                                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        >
                                            {isFullScreen ?
                                                <ArrowsPointingInIcon className="h-4 w-6" aria-hidden="true" /> :
                                                <ArrowsPointingOutIcon className="h-4 w-6" aria-hidden="true" />
                                            }
                                        </button>
                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        >
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <div className="flex justify-between items-center">
                                        <div className="text-xs text-gray-600">
                                            Average days from submission to final approval across all workstreams
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-12 gap-6 mb-6">
                                    <div className="col-span-12">
                                        <div className="grid grid-cols-3 gap-4 mb-4">
                                            <div className="rounded-lg p-3 border bg-purple-50 border-purple-200">
                                                <div className="text-xl font-bold text-purple-700">
                                                    {approvalData.summary.avgTotal} days
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    Avg. Total Approval Time
                                                </div>
                                            </div>
                                            <div className={`rounded-lg p-3 border ${activeFilter === 'inprogress' ? 'bg-amber-50 border-amber-200' : 'bg-gray-50 border-gray-200'}`} 
                                                 onClick={() => setActiveFilter('inprogress')}
                                                 style={{ cursor: 'pointer' }}>
                                                <div className="text-xl font-bold text-amber-600">
                                                    {approvalData.approvals.filter(a => a.status === 'In Progress').length}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    In Progress Approvals
                                                </div>
                                            </div>
                                            <div className={`rounded-lg p-3 border ${activeFilter === 'completed' ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`} 
                                                 onClick={() => setActiveFilter('completed')}
                                                 style={{ cursor: 'pointer' }}>
                                                <div className="text-xl font-bold text-green-600">
                                                    {approvalData.approvals.filter(a => a.status === 'Completed').length}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    Completed Approvals
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="h-64 border rounded-lg p-3">
                                            <h4 className="text-sm font-medium text-gray-700 mb-2">Approval Time by Work Stream</h4>
                                            <ReactECharts
                                                option={generateBarChartOption()}
                                                style={{ height: 'calc(100% - 24px)', width: '100%' }}
                                                opts={{ renderer: 'canvas' }}
                                            />
                                        </div> */}
                                    </div>
                                </div>

                                <div className="border rounded-lg overflow-hidden mb-3">
                                    <div className="flex justify-between bg-gray-50 p-2 border-b">
                                        <Tab.Group onChange={(index) => {
                                            const statuses = ['all', 'inprogress', 'completed'];
                                            setActiveFilter(statuses[index]);
                                        }}>
                                            <Tab.List className="flex">
                                                <Tab className={({ selected }) => 
                                                    `px-4 py-1 text-sm rounded focus:outline-none ${
                                                        selected ? 'bg-white shadow-sm font-medium' : 'text-gray-600 hover:bg-gray-100'
                                                    }`
                                                }>
                                                    All Approvals
                                                </Tab>
                                                <Tab className={({ selected }) => 
                                                    `px-4 py-1 text-sm rounded focus:outline-none ${
                                                        selected ? 'bg-white shadow-sm font-medium' : 'text-gray-600 hover:bg-gray-100'
                                                    }`
                                                }>
                                                    In Progress
                                                </Tab>
                                                <Tab className={({ selected }) => 
                                                    `px-4 py-1 text-sm rounded focus:outline-none ${
                                                        selected ? 'bg-white shadow-sm font-medium' : 'text-gray-600 hover:bg-gray-100'
                                                    }`
                                                }>
                                                    Completed
                                                </Tab>
                                            </Tab.List>
                                        </Tab.Group>
                                        <div className="flex">
                                            <Menu as="div" className="relative inline-block text-left">
                                                <Menu.Button className="px-3 py-1 text-sm border rounded text-gray-700 bg-white inline-flex items-center">
                                                    {activeFilter === 'all' || activeFilter === 'inprogress' || activeFilter === 'completed' 
                                                        ? 'All Workstreams' 
                                                        : activeFilter}
                                                    <ChevronDownIcon className="h-4 w-4 ml-1" aria-hidden="true" />
                                                </Menu.Button>
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                                                        <div className="px-1 py-1">
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <button
                                                                        onClick={() => setActiveFilter('all')}
                                                                        className={`${
                                                                            active ? 'bg-gray-100' : ''
                                                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                                    >
                                                                        All Workstreams
                                                                    </button>
                                                                )}
                                                            </Menu.Item>
                                                            {workstreams.map(workstream => (
                                                                <Menu.Item key={workstream}>
                                                                    {({ active }) => (
                                                                        <button
                                                                            onClick={() => setActiveFilter(workstream)}
                                                                            className={`${
                                                                                active ? 'bg-gray-100' : ''
                                                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                                        >
                                                                            {workstream}
                                                                        </button>
                                                                    )}
                                                                </Menu.Item>
                                                            ))}
                                                        </div>
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </div>
                                    </div>

                                    <div className="max-h-[40vh] overflow-y-auto">
                                        {filteredApprovals.length > 0 ? (
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50 sticky top-0">
                                                    <tr>
                                                        <th scope="col" className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Signoff Title
                                                        </th>
                                                        <th scope="col" className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Requested By
                                                        </th>
                                                        <th scope="col" className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Workstream
                                                        </th>
                                                        <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Requested On
                                                        </th>
                                                        <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Current Level
                                                        </th>
                                                        <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Level 1
                                                        </th>
                                                        <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Level 2
                                                        </th>
                                                        <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Level 3
                                                        </th>
                                                        <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Level 4
                                                        </th>
                                                        <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Total Time
                                                        </th>
                                                        <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Status
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {filteredApprovals.map(approval => (
                                                        <tr key={approval.id} className="hover:bg-gray-50">
                                                            <td className="p-3 whitespace-nowrap text-xs font-medium text-gray-900">
                                                                {approval.title}
                                                            </td>
                                                            <td className="p-3 whitespace-nowrap text-xs text-gray-500">
                                                                {approval.requestedBy}
                                                            </td>
                                                            <td className="p-3 whitespace-nowrap text-xs text-gray-500">
                                                                {approval.workstream}
                                                            </td>
                                                            <td className="p-3 text-center whitespace-nowrap text-xs text-gray-500">
                                                                {approval.submittedDate}
                                                            </td>
                                                            <td className="p-3 text-center whitespace-nowrap text-xs">
                                                                <span className={`px-2 py-1 rounded-full ${approval.currentLevel === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                                                    {approval.currentLevel}
                                                                </span>
                                                            </td>
                                                            <td className="p-3 text-center whitespace-nowrap text-xs font-medium">
                                                                <span className={getTimeColor(approval.level1Time)}>
                                                                    {approval.level1Time !== null ? `${approval.level1Time} days` : '-'}
                                                                </span>
                                                            </td>
                                                            <td className="p-3 text-center whitespace-nowrap text-xs font-medium">
                                                                <span className={getTimeColor(approval.level2Time)}>
                                                                    {approval.level2Time !== null ? `${approval.level2Time} days` : '-'}
                                                                </span>
                                                            </td>
                                                            <td className="p-3 text-center whitespace-nowrap text-xs font-medium">
                                                                <span className={getTimeColor(approval.level3Time)}>
                                                                    {approval.level3Time !== null ? `${approval.level3Time} days` : '-'}
                                                                </span>
                                                            </td>
                                                            <td className="p-3 text-center whitespace-nowrap text-xs font-medium">
                                                                <span className={getTimeColor(approval.level4Time)}>
                                                                    {approval.level4Time !== null ? `${approval.level4Time} days` : '-'}
                                                                </span>
                                                            </td>
                                                            <td className="p-3 text-center whitespace-nowrap text-xs font-medium">
                                                                {approval.totalTime} days
                                                            </td>
                                                            <td className="p-3 text-center whitespace-nowrap">
                                                                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(approval.status)}`}>
                                                                    {approval.status}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        ) : (
                                            <div className="p-4 text-sm text-gray-500">No approvals match the selected filters</div>
                                        )}
                                    </div>
                                </div>

                                <div className="text-xs text-gray-500 mb-2">
                                    Note: Click on the cards above to filter approvals by status
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    <div className="flex items-center text-xs text-gray-500">
                                        <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                                        <span>Within Target (&lt;2 days)</span>
                                    </div>
                                    <div className="flex items-center text-xs text-gray-500">
                                        <div className="w-2 h-2 rounded-full bg-yellow-500 mr-1"></div>
                                        <span>Warning (2-3 days)</span>
                                    </div>
                                    <div className="flex items-center text-xs text-gray-500">
                                        <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
                                        <span>Critical (&gt;3 days)</span>
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

const ApprovalCycleEfficiency = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Mock data - would come from your MongoDB data in a real application
    const approvalData = {
        levels: ['Level 1 Approval', 'Level 2 Approval', 'Level 3 Approval', 'Level 4 Approval'],
        times: [2.5, 3.8, 2.1, 1.2],
        total: 9.6
    };

    // Determine status based on thresholds
    let status = 'bg-green-100 text-green-800';
    let statusText = 'On Track';

    if (approvalData.total > 7) {
        status = 'bg-red-100 text-red-800';
        statusText = 'Critical';
    } else if (approvalData.total > 3) {
        status = 'bg-yellow-100 text-yellow-800';
        statusText = 'Warning';
    }

    // ECharts option configuration
    const option = {
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} days'
        },
        color: ['#93c5fd', '#a78bfa', '#f9a8d4', '#8e44ad'],
        series: [
            {
                name: 'Approval Time',
                type: 'funnel',
                sort: 'none',
                left: '10%',
                top: 0,
                bottom: 0,
                width: '80%',
                min: 0,
                max: 10,
                minSize: '20%',
                maxSize: '100%',
                gap: 2,
                label: {
                    show: true,
                    position: 'right',
                    formatter: function (param) {
                        return `${param.name}: ${param.value} days`;
                    }
                },
                labelLine: {
                    length: 20,
                    lineStyle: {
                        width: 1,
                        type: 'solid'
                    }
                },
                itemStyle: {
                    borderColor: '#fff',
                    borderWidth: 1
                },
                emphasis: {
                    label: {
                        fontSize: 14
                    }
                },
                data: [
                    { value: approvalData.times[0], name: approvalData.levels[0] },
                    { value: approvalData.times[1], name: approvalData.levels[1] },
                    { value: approvalData.times[2], name: approvalData.levels[2] },
                    { value: approvalData.times[3], name: approvalData.levels[3] }
                ]
            }
        ]
    };

    return (
        <div className="bg-white rounded-lg shadow p-5 border-t-4 border-purple-500">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-medium text-gray-700">Signoff Approval Efficiency</h3>
                    {/* <div className="text-xs text-gray-500 flex items-center">
                        <span>MEDIUM PRIORITY</span>
                    </div> */}
                </div>
                <div className={`${status} text-xs px-2 py-1 rounded flex items-center`}>
                    {statusText}
                </div>
            </div>

            <div className="mb-4">
                <div className="flex justify-between items-end">
                    <div className="text-xl text-gray-800">{approvalData.total} days</div>
                    <div className="text-sm text-gray-500">
                        Avg. approval cycle
                    </div>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                    Average days from submission to final approval
                </div>
            </div>

            <div className="h-64">
                <ReactECharts
                    option={option}
                    style={{ height: '100%', width: '100%' }}
                    opts={{ renderer: 'canvas' }}
                    onChartReady={(chart) => {
                        setTimeout(() => {
                            chart.resize();
                        }, 100);
                    }}
                />
            </div>

            <div className="mt-3 pt-3 border-t flex justify-between items-center text-xs">
                <div className="flex flex-wrap gap-4">
                    <div className="flex items-center text-gray-500">
                        <div className="w-2 h-2 rounded-full bg-yellow-500 mr-1"></div>
                        <span>Warning &gt;3 days</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                        <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
                        <span>Critical &gt;7 days</span>
                    </div>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="text-blue-600 text-xs hover:underline focus:outline-none"
                >
                    Details
                </button>
            </div>

            <ApprovalEfficiencyDrilldownModal
                isOpen={isModalOpen}
                closeModal={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default ApprovalCycleEfficiency;