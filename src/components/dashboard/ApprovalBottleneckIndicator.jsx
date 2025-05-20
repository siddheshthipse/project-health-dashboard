import React, { useState, Fragment } from 'react';
import { Dialog, Transition, Tab, Menu } from '@headlessui/react';
import { XMarkIcon, ArrowsPointingOutIcon, ArrowsPointingInIcon, ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import ReactECharts from 'echarts-for-react';

const ApprovalBottleneckDrilldownModal = ({ isOpen, closeModal }) => {
    // State for filtering and expanding rows
    const [activeFilter, setActiveFilter] = useState('all');
    const [expandedStakeholders, setExpandedStakeholders] = useState({});
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [viewMode, setViewMode] = useState('total');
    const [levelFilter, setLevelFilter] = useState('all');

    // Sample stakeholder delay data
    const stakeholderData = {
        stakeholders: [
            {
                id: 'S001',
                name: 'John Smith',
                title: 'Finance Director',
                workstream: 'FSM',
                level1Delay: 1.2,
                level2Delay: 0.7,
                level3Delay: 0.4,
                totalDelay: 2.3,
                level1Count: 3,
                level2Count: 2,
                level3Count: 1,
                approvals: [
                    {
                        id: 'A001',
                        title: 'Q2 Budget Approval',
                        requestDate: 'Apr 5, 2025',
                        dueDate: 'Apr 8, 2025',
                        approvalDate: 'Apr 10, 2025',
                        approvalLevel: 'Level 1',
                        delayDays: 2,
                        requestedBy: 'Michael Chen',
                        workstream: 'FSM',
                        status: 'Approved'
                    },
                    {
                        id: 'A002',
                        title: 'CapEx Request - Cloud Infrastructure',
                        requestDate: 'Apr 12, 2025',
                        dueDate: 'Apr 15, 2025',
                        approvalDate: 'Apr 16, 2025',
                        approvalLevel: 'Level 1',
                        delayDays: 1,
                        requestedBy: 'Sarah Williams',
                        workstream: 'CIM',
                        status: 'Approved'
                    },
                    {
                        id: 'A003',
                        title: 'Software Licensing Agreement',
                        requestDate: 'Apr 18, 2025',
                        dueDate: 'Apr 20, 2025',
                        approvalDate: 'Apr 21, 2025',
                        approvalLevel: 'Level 2',
                        delayDays: 1,
                        requestedBy: 'Robert Taylor',
                        workstream: 'CIM',
                        status: 'Rejected'
                    }
                ]
            },
            {
                id: 'S002',
                name: 'Sarah Williams',
                title: 'IT Director',
                workstream: 'CIM',
                level1Delay: 0.5,
                level2Delay: 1.8,
                level3Delay: 3.2,
                totalDelay: 5.5,
                level1Count: 2,
                level2Count: 3,
                level3Count: 4,
                approvals: [
                    {
                        id: 'A004',
                        title: 'Data Migration Plan',
                        requestDate: 'Apr 3, 2025',
                        dueDate: 'Apr 7, 2025',
                        approvalDate: 'Apr 10, 2025',
                        approvalLevel: 'Level 3',
                        delayDays: 3,
                        requestedBy: 'Lisa Johnson',
                        workstream: 'DMG',
                        status: 'Approved'
                    },
                    {
                        id: 'A005',
                        title: 'Security Framework Update',
                        requestDate: 'Apr 15, 2025',
                        dueDate: 'Apr 18, 2025',
                        approvalDate: 'Apr 22, 2025',
                        approvalLevel: 'Level 3',
                        delayDays: 4,
                        requestedBy: 'James Wilson',
                        workstream: 'HSSE',
                        status: 'Approved'
                    }
                ]
            },
            {
                id: 'S003',
                name: 'Michael Chen',
                title: 'Program Manager',
                workstream: 'PTP',
                level1Delay: 0.8,
                level2Delay: 5.2,
                level3Delay: 1.5,
                totalDelay: 7.5,
                level1Count: 1,
                level2Count: 4,
                level3Count: 2,
                approvals: [
                    {
                        id: 'A006',
                        title: 'Project Timeline Adjustment',
                        requestDate: 'Apr 8, 2025',
                        dueDate: 'Apr 12, 2025',
                        approvalDate: 'Apr 21, 2025',
                        approvalLevel: 'Level 2',
                        delayDays: 9,
                        requestedBy: 'Emily Davis',
                        workstream: 'PTP',
                        status: 'Approved'
                    },
                    {
                        id: 'A007',
                        title: 'Resource Allocation Plan',
                        requestDate: 'Apr 14, 2025',
                        dueDate: 'Apr 17, 2025',
                        approvalDate: 'Apr 21, 2025',
                        approvalLevel: 'Level 2',
                        delayDays: 4,
                        requestedBy: 'Thomas Brown',
                        workstream: 'PTP',
                        status: 'Approved'
                    }
                ]
            },
            {
                id: 'S004',
                name: 'Priya Sharma',
                title: 'Legal Counsel',
                workstream: 'DRA',
                level1Delay: 4.2,
                level2Delay: 2.6,
                level3Delay: 0,
                totalDelay: 6.8,
                level1Count: 5,
                level2Count: 3,
                level3Count: 0,
                approvals: [
                    {
                        id: 'A008',
                        title: 'Contract Revision',
                        requestDate: 'Apr 5, 2025',
                        dueDate: 'Apr 8, 2025',
                        approvalDate: 'Apr 15, 2025',
                        approvalLevel: 'Level 1',
                        delayDays: 7,
                        requestedBy: 'John Smith',
                        workstream: 'DRA',
                        status: 'Approved'
                    },
                    {
                        id: 'A009',
                        title: 'Terms of Service Update',
                        requestDate: 'Apr 12, 2025',
                        dueDate: 'Apr 15, 2025',
                        approvalDate: 'Apr 18, 2025',
                        approvalLevel: 'Level 1',
                        delayDays: 3,
                        requestedBy: 'Jennifer Lee',
                        workstream: 'DRA',
                        status: 'Approved'
                    }
                ]
            },
            {
                id: 'S005',
                name: 'Robert Taylor',
                title: 'Operations Lead',
                workstream: 'EAM',
                level1Delay: 2.1,
                level2Delay: 0.3,
                level3Delay: 1.9,
                totalDelay: 4.3,
                level1Count: 4,
                level2Count: 1,
                level3Count: 2,
                approvals: [
                    {
                        id: 'A010',
                        title: 'Maintenance Schedule',
                        requestDate: 'Apr 10, 2025',
                        dueDate: 'Apr 13, 2025',
                        approvalDate: 'Apr 15, 2025',
                        approvalLevel: 'Level 1',
                        delayDays: 2,
                        requestedBy: 'Michael Chen',
                        workstream: 'EAM',
                        status: 'Approved'
                    },
                    {
                        id: 'A011',
                        title: 'Equipment Requisition',
                        requestDate: 'Apr 18, 2025',
                        dueDate: 'Apr 21, 2025',
                        approvalDate: 'Apr 24, 2025',
                        approvalLevel: 'Level 3',
                        delayDays: 3,
                        requestedBy: 'Sarah Williams',
                        workstream: 'EAM',
                        status: 'Approved'
                    }
                ]
            }
        ]
    };

    // Toggle stakeholder expansion
    const toggleStakeholderExpansion = (stakeholderId) => {
        setExpandedStakeholders(prev => ({
            ...prev,
            [stakeholderId]: !prev[stakeholderId]
        }));
    };

    // Filter stakeholders
    const getFilteredStakeholders = () => {
        let filteredData = [...stakeholderData.stakeholders];

        // Filter by workstream if not 'all'
        if (activeFilter !== 'all') {
            filteredData = filteredData.filter(stakeholder =>
                stakeholder.workstream === activeFilter
            );
        }

        // Filter by level if not 'all'
        if (levelFilter !== 'all') {
            const levelKey = `level${levelFilter.charAt(5)}Delay`; // Convert 'Level1' to 'level1Delay'
            filteredData = filteredData.filter(stakeholder =>
                stakeholder[levelKey] > 0
            );
        }

        return filteredData;
    };

    // Get filtered approvals for a stakeholder
    const getFilteredApprovals = (stakeholder) => {
        let filteredApprovals = [...stakeholder.approvals];

        // Filter by level if not 'all'
        if (levelFilter !== 'all') {
            filteredApprovals = filteredApprovals.filter(approval =>
                approval.approvalLevel === levelFilter
            );
        }

        return filteredApprovals;
    };

    const filteredStakeholders = getFilteredStakeholders();

    // Get unique workstreams
    const workstreams = [...new Set(stakeholderData.stakeholders.map(stakeholder => stakeholder.workstream))];

    // Generate chart option
    // const generateChartOption = () => {
    //     // Calculate averages for each stakeholder
    //     const stakeholderNames = filteredStakeholders.map(s => s.name);
    //     const totalDelays = filteredStakeholders.map(s => ({
    //         level1: s.level1Delay,
    //         level2: s.level2Delay,
    //         level3: s.level3Delay
    //     }));

    //     const avgDelays = filteredStakeholders.map(s => ({
    //         level1: s.level1Count > 0 ? +(s.level1Delay / s.level1Count).toFixed(1) : 0,
    //         level2: s.level2Count > 0 ? +(s.level2Delay / s.level2Count).toFixed(1) : 0,
    //         level3: s.level3Count > 0 ? +(s.level3Delay / s.level3Count).toFixed(1) : 0
    //     }));

    //     const delayData = viewMode === 'total' ? totalDelays : avgDelays;

    //     // Set thresholds based on view mode
    //     const criticalThreshold = viewMode === 'total' ? 10 : 3;
    //     const warningThreshold = viewMode === 'total' ? 5 : 1.5;

    //     return {
    //         tooltip: {
    //             trigger: 'axis',
    //             axisPointer: {
    //                 type: 'shadow'
    //             },
    //             formatter: function (params) {
    //                 const stakeholder = params[0].name;
    //                 let total = 0;
    //                 let result = `<div>${stakeholder}</div>`;

    //                 params.forEach(param => {
    //                     total += param.value;
    //                     result += `<div style="display:flex;justify-content:space-between;margin-top:4px;">
    //                       <div>
    //                         <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${param.color};"></span>
    //                         ${param.seriesName}:
    //                       </div>
    //                       <div style="font-weight:bold;margin-left:20px;">${param.value} days</div>
    //                     </div>`;
    //                 });

    //                 result += `<div style="margin-top:6px;border-top:1px solid rgba(0,0,0,0.1);padding-top:4px;">
    //                     <div style="display:flex;justify-content:space-between;">
    //                       <div>Total:</div>
    //                       <div style="font-weight:bold;">${total.toFixed(1)} days</div>
    //                     </div>
    //                   </div>`;

    //                 return result;
    //             }
    //         },
    //         legend: {
    //             data: ['Level 1', 'Level 2', 'Level 3'],
    //             bottom: 0
    //         },
    //         grid: {
    //             left: '3%',
    //             right: '4%',
    //             bottom: '15%',
    //             top: '3%',
    //             containLabel: true
    //         },
    //         xAxis: {
    //             type: 'value',
    //             name: 'Days',
    //             axisLabel: {
    //                 color: '#6b7280'
    //             },
    //             splitLine: {
    //                 lineStyle: {
    //                     color: '#e5e7eb',
    //                     type: 'dashed'
    //                 }
    //             },
    //             axisLine: {
    //                 lineStyle: {
    //                     color: '#e5e7eb'
    //                 }
    //             }
    //         },
    //         yAxis: {
    //             type: 'category',
    //             data: stakeholderNames,
    //             axisLabel: {
    //                 color: '#6b7280'
    //             },
    //             axisLine: {
    //                 lineStyle: {
    //                     color: '#e5e7eb'
    //                 }
    //             },
    //             splitLine: {
    //                 show: false
    //             }
    //         },
    //         series: [
    //             {
    //                 name: 'Level 1',
    //                 type: 'bar',
    //                 stack: 'total',
    //                 itemStyle: {
    //                     color: '#93c5fd' // Blue
    //                 },
    //                 emphasis: {
    //                     focus: 'series'
    //                 },
    //                 data: delayData.map(d => d.level1)
    //             },
    //             {
    //                 name: 'Level 2',
    //                 type: 'bar',
    //                 stack: 'total',
    //                 itemStyle: {
    //                     color: '#a78bfa' // Purple
    //                 },
    //                 emphasis: {
    //                     focus: 'series'
    //                 },
    //                 data: delayData.map(d => d.level2)
    //             },
    //             {
    //                 name: 'Level 3',
    //                 type: 'bar',
    //                 stack: 'total',
    //                 itemStyle: {
    //                     color: '#f9a8d4' // Pink
    //                 },
    //                 emphasis: {
    //                     focus: 'series'
    //                 },
    //                 data: delayData.map(d => d.level3)
    //             }
    //         ],
    //         markLine: {
    //             silent: true,
    //             lineStyle: {
    //                 color: '#fbbf24',
    //                 type: 'dashed'
    //             },
    //             data: [
    //                 {
    //                     xAxis: warningThreshold,
    //                     lineStyle: {
    //                         color: '#fbbf24',
    //                         type: 'dashed'
    //                     },
    //                     label: {
    //                         formatter: `Warning (${warningThreshold} days)`,
    //                         position: 'insideEndTop',
    //                         color: '#fbbf24'
    //                     }
    //                 },
    //                 {
    //                     xAxis: criticalThreshold,
    //                     lineStyle: {
    //                         color: '#ef4444',
    //                         type: 'dashed'
    //                     },
    //                     label: {
    //                         formatter: `Critical (${criticalThreshold} days)`,
    //                         position: 'insideEndTop',
    //                         color: '#ef4444'
    //                     }
    //                 }
    //             ]
    //         }
    //     };
    // };

    // Helper function to determine delay severity
    const getDelaySeverity = (days) => {
        if (days > 5) return 'text-red-600';
        if (days > 2) return 'text-amber-600';
        return 'text-blue-600';
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
                                <div className="flex justify-between items-center mb-4">
                                    <Dialog.Title as="h3" className="text-md font-semibold text-gray-900">
                                        Approval Bottleneck Analysis
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
                                        <div className="text-sm text-gray-600">
                                            Stakeholder approval delays by level showing bottlenecks in the approval process
                                        </div>
                                        <div className="flex bg-gray-100 rounded-md p-0.5">
                                            <button
                                                className={`text-xs py-1 px-2 rounded-md ${viewMode === 'total' ? 'bg-white shadow-sm' : ''}`}
                                                onClick={() => setViewMode('total')}
                                            >
                                                Total Delay
                                            </button>
                                            <button
                                                className={`text-xs py-1 px-2 rounded-md ${viewMode === 'average' ? 'bg-white shadow-sm' : ''}`}
                                                onClick={() => setViewMode('average')}
                                            >
                                                Average Delay
                                            </button>
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">
                                        Formula: {viewMode === 'total' ?
                                            "Sum of approval delay days per stakeholder across all levels" :
                                            "Average days of delay per approval at each level"}
                                    </div>
                                </div>

                                {/* <div className="grid grid-cols-1 gap-6 mb-6">
                                    <div className="border rounded-lg p-3">
                                        <div className="h-64">
                                            <ReactECharts
                                                option={generateChartOption()}
                                                style={{ height: '100%', width: '100%' }}
                                                opts={{ renderer: 'canvas' }}
                                            />
                                        </div>
                                    </div>
                                </div> */}

                                <div className="border rounded-lg overflow-hidden mb-3">
                                    <div className="flex justify-between bg-gray-50 p-2 border-b">
                                        <Tab.Group onChange={(index) => {
                                            const levels = ['all', 'Level1', 'Level2', 'Level3'];
                                            setLevelFilter(levels[index]);
                                        }}>
                                            <Tab.List className="flex">
                                                <Tab className={({ selected }) =>
                                                    `px-4 py-1 text-sm rounded focus:outline-none ${selected ? 'bg-white shadow-sm font-medium' : 'text-gray-600 hover:bg-gray-100'
                                                    }`
                                                }>
                                                    All Levels
                                                </Tab>
                                                <Tab className={({ selected }) =>
                                                    `px-4 py-1 text-sm rounded focus:outline-none ${selected ? 'bg-white shadow-sm font-medium' : 'text-gray-600 hover:bg-gray-100'
                                                    }`
                                                }>
                                                    Level 1
                                                </Tab>
                                                <Tab className={({ selected }) =>
                                                    `px-4 py-1 text-sm rounded focus:outline-none ${selected ? 'bg-white shadow-sm font-medium' : 'text-gray-600 hover:bg-gray-100'
                                                    }`
                                                }>
                                                    Level 2
                                                </Tab>
                                                <Tab className={({ selected }) =>
                                                    `px-4 py-1 text-sm rounded focus:outline-none ${selected ? 'bg-white shadow-sm font-medium' : 'text-gray-600 hover:bg-gray-100'
                                                    }`
                                                }>
                                                    Level 3
                                                </Tab>
                                            </Tab.List>
                                        </Tab.Group>
                                        <div className="flex">
                                            <Menu as="div" className="relative inline-block text-left">
                                                <Menu.Button className="px-3 py-1 text-sm border rounded text-gray-700 bg-white inline-flex items-center">
                                                    {activeFilter === 'all'
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
                                                                        className={`${active ? 'bg-gray-100' : ''
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
                                                                            className={`${active ? 'bg-gray-100' : ''
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
                                        {filteredStakeholders.length > 0 ? (
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50 sticky top-0">
                                                    <tr>
                                                        <th scope="col" className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Stakeholder
                                                        </th>
                                                        <th scope="col" className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Title
                                                        </th>
                                                        <th scope="col" className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Workstream
                                                        </th>
                                                        <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Level 1 Delay
                                                        </th>
                                                        <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Level 2 Delay
                                                        </th>
                                                        <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Level 3 Delay
                                                        </th>
                                                        <th scope="col" className="p-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Total Delay
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {filteredStakeholders.map(stakeholder => {
                                                        const isExpanded = expandedStakeholders[stakeholder.id];
                                                        const stakeholderApprovals = getFilteredApprovals(stakeholder);

                                                        return (
                                                            <React.Fragment key={stakeholder.id}>
                                                                <tr className="hover:bg-gray-50">
                                                                    <td className="p-3 whitespace-nowrap">
                                                                        <div className="flex items-center">
                                                                            <button
                                                                                onClick={() => toggleStakeholderExpansion(stakeholder.id)}
                                                                                className="mr-2 p-0.5 rounded hover:bg-gray-200 focus:outline-none"
                                                                            >
                                                                                {isExpanded ?
                                                                                    <ChevronDownIcon className="h-4 w-4 text-gray-500" /> :
                                                                                    <ChevronRightIcon className="h-4 w-4 text-gray-500" />
                                                                                }
                                                                            </button>
                                                                            <span className="font-medium text-xs text-gray-900">{stakeholder.name}</span>
                                                                        </div>
                                                                    </td>
                                                                    <td className="p-3 whitespace-nowrap text-xs text-gray-500">
                                                                        {stakeholder.title}
                                                                    </td>
                                                                    <td className="p-3 whitespace-nowrap text-xs text-gray-500">
                                                                        {stakeholder.workstream}
                                                                    </td>
                                                                    <td className="p-3 text-center whitespace-nowrap">
                                                                        <span className={`text-xs font-medium ${getDelaySeverity(stakeholder.level1Delay)}`}>
                                                                            {viewMode === 'total' ?
                                                                                `${stakeholder.level1Delay} days` :
                                                                                `${(stakeholder.level1Count > 0 ? (stakeholder.level1Delay / stakeholder.level1Count).toFixed(1) : 0)}`
                                                                            }
                                                                        </span>
                                                                    </td>
                                                                    <td className="p-3 text-center whitespace-nowrap">
                                                                        <span className={`text-xs font-medium ${getDelaySeverity(stakeholder.level2Delay)}`}>
                                                                            {viewMode === 'total' ?
                                                                                `${stakeholder.level2Delay} days` :
                                                                                `${(stakeholder.level2Count > 0 ? (stakeholder.level2Delay / stakeholder.level2Count).toFixed(1) : 0)}`
                                                                            }
                                                                        </span>
                                                                    </td>
                                                                    <td className="p-3 text-center whitespace-nowrap">
                                                                        <span className={`text-xs font-medium ${getDelaySeverity(stakeholder.level3Delay)}`}>
                                                                            {viewMode === 'total' ?
                                                                                `${stakeholder.level3Delay} days` :
                                                                                `${(stakeholder.level3Count > 0 ? (stakeholder.level3Delay / stakeholder.level3Count).toFixed(1) : 0)}`
                                                                            }
                                                                        </span>
                                                                    </td>
                                                                    <td className="p-3 text-center whitespace-nowrap text-xs font-medium">
                                                                        <span className={`${getDelaySeverity(stakeholder.totalDelay)}`}>
                                                                            {stakeholder.totalDelay} days
                                                                        </span>
                                                                    </td>
                                                                </tr>

                                                                {/* Approval details when expanded */}
                                                                {isExpanded && stakeholderApprovals.length > 0 && (
                                                                    <tr>
                                                                        <td colSpan="7" className="p-0">
                                                                            <div className="p-3 bg-gray-50">
                                                                                <div className="text-xs font-medium text-gray-700 mb-2">
                                                                                    Delayed Approvals ({stakeholderApprovals.length})
                                                                                </div>
                                                                                <table className="min-w-full divide-y divide-gray-200 border">
                                                                                    <thead className="bg-gray-100">
                                                                                        <tr>
                                                                                            <th scope="col" className="p-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                                                Approval Title
                                                                                            </th>
                                                                                            <th scope="col" className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                                                Workstream
                                                                                            </th>
                                                                                            <th scope="col" className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                                                Due Date
                                                                                            </th>
                                                                                            <th scope="col" className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                                                Actual Date
                                                                                            </th>
                                                                                            <th scope="col" className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                                                Delay
                                                                                            </th>
                                                                                            <th scope="col" className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                                                Level
                                                                                            </th>
                                                                                            <th scope="col" className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                                                Status
                                                                                            </th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody className="bg-white divide-y divide-gray-200">
                                                                                        {stakeholderApprovals.map(approval => (
                                                                                            <tr key={approval.id} className="hover:bg-gray-50">
                                                                                                <td className="p-2 whitespace-nowrap">
                                                                                                    <div className="text-xs font-medium text-gray-900">{approval.title}</div>
                                                                                                    <div className="text-xs text-gray-500">Requested by: {approval.requestedBy}</div>
                                                                                                </td>
                                                                                                <td className="p-2 text-center whitespace-nowrap text-xs text-gray-500">
                                                                                                    {approval.workstream}
                                                                                                </td>
                                                                                                <td className="p-2 text-center whitespace-nowrap text-xs text-gray-500">
                                                                                                    {approval.dueDate}
                                                                                                </td>
                                                                                                <td className="p-2 text-center whitespace-nowrap text-xs text-gray-500">
                                                                                                    {approval.approvalDate}
                                                                                                </td>
                                                                                                <td className="p-2 text-center whitespace-nowrap">
                                                                                                    <span className={`text-xs font-medium ${getDelaySeverity(approval.delayDays)}`}>
                                                                                                        {approval.delayDays} days
                                                                                                    </span>
                                                                                                </td>
                                                                                                <td className="p-2 text-center whitespace-nowrap">
                                                                                                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                                                                                                        {approval.approvalLevel}
                                                                                                    </span>
                                                                                                </td>
                                                                                                <td className="p-2 text-center whitespace-nowrap">
                                                                                                    <span className={`px-2 py-1 text-xs rounded-full ${approval.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                                                                        {approval.status}
                                                                                                    </span>
                                                                                                </td>
                                                                                            </tr>
                                                                                        ))}
                                                                                    </tbody>
                                                                                </table>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                )}

                                                                {isExpanded && stakeholderApprovals.length === 0 && (
                                                                    <tr>
                                                                        <td colSpan="7" className="p-0">
                                                                            <div className="p-3 bg-gray-50 text-xs text-gray-500">
                                                                                No delayed approvals match the current filter
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                )}
                                                            </React.Fragment>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        ) : (
                                            <div className="p-4 text-sm text-gray-500">No stakeholders match the selected filters</div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    <div className="flex items-center text-xs text-gray-500">
                                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                                        <span>Level 1 Approvals</span>
                                    </div>
                                    <div className="flex items-center text-xs text-gray-500">
                                        <div className="w-3 h-3 rounded-full bg-purple-500 mr-1"></div>
                                        <span>Level 2 Approvals</span>
                                    </div>
                                    <div className="flex items-center text-xs text-gray-500">
                                        <div className="w-3 h-3 rounded-full bg-pink-500 mr-1"></div>
                                        <span>Level 3 Approvals</span>
                                    </div>
                                    <div className="flex items-center text-xs text-gray-500 ml-6">
                                        <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                                        <span>Minor Delay (&lt;2 days)</span>
                                    </div>
                                    <div className="flex items-center text-xs text-gray-500">
                                        <div className="w-2 h-2 rounded-full bg-yellow-500 mr-1"></div>
                                        <span>Moderate Delay (2-5 days)</span>
                                    </div>
                                    <div className="flex items-center text-xs text-gray-500">
                                        <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
                                        <span>Severe Delay (&gt;5 days)</span>
                                    </div>
                                </div>

                                <div className="text-xs text-gray-500 mt-2">
                                    Note: Click on the expand icon next to each stakeholder to view their delayed approvals
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

const ApprovalBottleneckIndicator = () => {
    // Add state for view mode (total or average)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewMode, setViewMode] = useState('total');

    // Mock data - would come from your MongoDB data in a real application
    const bottleneckData = {
        stakeholders: ['John Smith', 'Sarah Williams', 'Michael Chen', 'Priya Sharma', 'Robert Taylor'],
        level1Delays: [1.2, 0.5, 0.8, 4.2, 2.1],
        level2Delays: [0.7, 1.8, 5.2, 2.6, 0.3],
        level3Delays: [0.4, 3.2, 1.5, 0, 1.9],
        // Mock data for counts (to calculate averages)
        level1Counts: [3, 2, 1, 5, 4],
        level2Counts: [2, 3, 4, 3, 1],
        level3Counts: [1, 4, 2, 0, 2]
    };

    // Calculate average delays
    const avgLevel1Delays = bottleneckData.level1Delays.map((delay, index) =>
        bottleneckData.level1Counts[index] > 0 ?
            +(delay / bottleneckData.level1Counts[index]).toFixed(1) : 0
    );

    const avgLevel2Delays = bottleneckData.level2Delays.map((delay, index) =>
        bottleneckData.level2Counts[index] > 0 ?
            +(delay / bottleneckData.level2Counts[index]).toFixed(1) : 0
    );

    const avgLevel3Delays = bottleneckData.level3Delays.map((delay, index) =>
        bottleneckData.level3Counts[index] > 0 ?
            +(delay / bottleneckData.level3Counts[index]).toFixed(1) : 0
    );

    // Get the appropriate data based on view mode
    const getDelayData = () => {
        if (viewMode === 'total') {
            return {
                level1: bottleneckData.level1Delays,
                level2: bottleneckData.level2Delays,
                level3: bottleneckData.level3Delays
            };
        } else {
            return {
                level1: avgLevel1Delays,
                level2: avgLevel2Delays,
                level3: avgLevel3Delays
            };
        }
    };

    const delayData = getDelayData();

    // Calculate total delays for each stakeholder based on current view
    // const totalDelays = bottleneckData.stakeholders.map((_, index) => {
    //     if (viewMode === 'total') {
    //         return (
    //             bottleneckData.level1Delays[index] +
    //             bottleneckData.level2Delays[index] +
    //             bottleneckData.level3Delays[index]
    //         );
    //     } else {
    //         // For average view, sum up the averages
    //         return (
    //             avgLevel1Delays[index] +
    //             avgLevel2Delays[index] +
    //             avgLevel3Delays[index]
    //         );
    //     }
    // });

    // Find maximum total delay for sorting
    // const maxDelay = Math.max(...totalDelays);
    const criticalThreshold = viewMode === 'total' ? 10 : 3; // Adjust threshold for average view
    const warningThreshold = viewMode === 'total' ? 5 : 1.5; // Adjust threshold for average view

    // ECharts option configuration
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function (params) {
                const stakeholder = params[0].name;
                let total = 0;
                let result = `<div>${stakeholder}</div>`;

                params.forEach(param => {
                    total += param.value;
                    result += `<div style="display:flex;justify-content:space-between;margin-top:4px;">
                      <div>
                        <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${param.color};"></span>
                        ${param.seriesName}:
                      </div>
                      <div style="font-weight:bold;margin-left:20px;">${param.value} days</div>
                    </div>`;
                });

                result += `<div style="margin-top:6px;border-top:1px solid rgba(0,0,0,0.1);padding-top:4px;">
                    <div style="display:flex;justify-content:space-between;">
                      <div>Total:</div>
                      <div style="font-weight:bold;">${total.toFixed(1)} days</div>
                    </div>
                  </div>`;

                return result;
            }
        },
        legend: {
            data: ['Level 1', 'Level 2', 'Level 3'],
            bottom: 0
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '15%',
            top: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            name: 'Days',
            axisLabel: {
                color: '#6b7280'
            },
            splitLine: {
                lineStyle: {
                    color: '#e5e7eb',
                    type: 'dashed'
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#e5e7eb'
                }
            }
        },
        yAxis: {
            type: 'category',
            data: bottleneckData.stakeholders,
            axisLabel: {
                color: '#6b7280'
            },
            axisLine: {
                lineStyle: {
                    color: '#e5e7eb'
                }
            },
            splitLine: {
                show: false
            }
        },
        series: [
            {
                name: 'Level 1',
                type: 'bar',
                stack: 'total',
                itemStyle: {
                    color: '#93c5fd' // Blue
                },
                emphasis: {
                    focus: 'series'
                },
                data: delayData.level1
            },
            {
                name: 'Level 2',
                type: 'bar',
                stack: 'total',
                itemStyle: {
                    color: '#a78bfa' // Purple
                },
                emphasis: {
                    focus: 'series'
                },
                data: delayData.level2
            },
            {
                name: 'Level 3',
                type: 'bar',
                stack: 'total',
                itemStyle: {
                    color: '#f9a8d4' // Pink
                },
                emphasis: {
                    focus: 'series'
                },
                data: delayData.level3
            }
        ],
        markLine: {
            symbol: 'none',
            silent: true,
            data: [
                {
                    xAxis: warningThreshold,
                    lineStyle: {
                        color: '#fbbf24',
                        type: 'dashed'
                    },
                    label: {
                        formatter: `Warning (${warningThreshold} days)`,
                        position: 'insideEndTop',
                        color: '#fbbf24'
                    }
                },
                {
                    xAxis: criticalThreshold,
                    lineStyle: {
                        color: '#ef4444',
                        type: 'dashed'
                    },
                    label: {
                        formatter: `Critical (${criticalThreshold} days)`,
                        position: 'insideEndTop',
                        color: '#ef4444'
                    }
                }
            ]
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-5 border-t-4 border-yellow-500">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-medium text-gray-700">Approval Bottleneck Indicator</h3>
                    {/* <div className="text-xs text-gray-500 flex items-center">
                        <span>MEDIUM PRIORITY</span>
                    </div> */}
                </div>
                <div className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded flex items-center">
                    Warning
                </div>
            </div>

            <div className="mb-4">
                <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-700">
                        Stakeholder approval delays by level
                    </div>
                    <div className="flex bg-gray-100 rounded-md p-0.5">
                        <button
                            className={`text-xs py-1 px-2 rounded-md ${viewMode === 'total' ? 'bg-white shadow-sm' : ''}`}
                            onClick={() => setViewMode('total')}
                        >
                            Total Delay
                        </button>
                        <button
                            className={`text-xs py-1 px-2 rounded-md ${viewMode === 'average' ? 'bg-white shadow-sm' : ''}`}
                            onClick={() => setViewMode('average')}
                        >
                            Average Delay
                        </button>
                    </div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                    Formula: {viewMode === 'total' ?
                        "Sum of approval delay days per stakeholder across all levels" :
                        "Average days of delay per approval at each level"}
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
                        <span>Warning &gt;{warningThreshold} days</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                        <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
                        <span>Critical &gt;{criticalThreshold} days</span>
                    </div>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="text-blue-600 text-xs hover:underline focus:outline-none"
                >
                    Details
                </button>
            </div>

            <ApprovalBottleneckDrilldownModal isOpen={isModalOpen}
                closeModal={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default ApprovalBottleneckIndicator;