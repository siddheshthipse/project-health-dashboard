import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon, ArrowsPointingOutIcon, ArrowsPointingInIcon } from '@heroicons/react/20/solid';
import { useState, Fragment, useEffect } from 'react';

// Component Imports
import SPICard from './SPICard';
import OnTimeDeliveryRate from './OnTimeDelivery';
import ApprovalCycleEfficiency from './ApprovalCycleEfficiency';
import ApprovalBottleneckIndicator from './ApprovalBottleneckIndicator';
import MilestoneAdherenceCard from './MilestoneAdherenceCard';
import GoLiveRiskCard from './GoLiveRiskCard';
import RiskExposureCard from './RiskExposureCard';
import IssueResolutionCard from './IssueResolutionCard';
import DependencyCoverageCard from './DependencyCoverageCard';

const ProjectHealthDashboard = () => {
    const [headerExpanded, setHeaderExpanded] = useState(true);

    // Add this state for tracking fullscreen mode
    const [isFullScreen, setIsFullScreen] = useState(false);

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
            setIsFullScreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullScreen(false);
            }
        }
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullScreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);


    return (
        <div className="flex flex-col h-screen bg-gray-50">
            {/* Header */}
            {headerExpanded && (
                <header className="bg-indigo-700 text-white p-4 shadow-md">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            {/* <img
                                src="https://planner.ktern.com/assets/images/ktern.PNG"
                                alt="KTERN Logo"
                                className="h-8"
                            /> */}
                            <h3 className="text-xl font-semibold ml-3">Project Health Navigator</h3>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <button className="flex items-center space-x-2 bg-indigo-800 px-3 py-1 rounded">
                                    <span>GNXD84</span>
                                </button>
                            </div>
                            <div className="inline-flex overflow-hidden relative justify-center items-center w-8 h-8 bg-indigo-600 rounded-full ring-2 ring-white">
                                <span className="font-medium text-xs text-white">CS</span>
                            </div>
                        </div>
                    </div>
                </header>
            )}

            {/* Project Info Banner */}
            <div className="bg-white border-b p-4 flex justify-between items-center">
                <div className="flex items-center space-x-6">
                    <div>
                        <span className="text-gray-500 text-sm">Project</span>
                        <h2 className="font-semibold">Motiva Quantum Leap</h2>
                    </div>
                    <div>
                        <span className="text-gray-500 text-sm block">Current Wave</span>
                        <Menu as="div" className="relative inline-block text-left mt-1">
                            <div>
                                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded bg-blue-100 px-3 py-1.5 text-sm font-medium text-blue-800 hover:bg-blue-200">
                                    Wave 2 - HSSE 1/2
                                    <ChevronDownIcon className="-mr-1 h-5 w-5 text-blue-700" aria-hidden="true" />
                                </Menu.Button>
                            </div>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                                    <div className="py-1">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a href="#" className={`${active ? 'bg-blue-50 text-blue-900' : 'text-gray-700'} block px-4 py-2 text-sm`}>
                                                    Wave 0 - Global Prepare
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a href="#" className={`${active ? 'bg-blue-50 text-blue-900' : 'text-gray-700'} block px-4 py-2 text-sm`}>
                                                    Wave 1 - PTP 1/2
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a href="#" className={`${active ? 'bg-blue-50 text-blue-900' : 'text-gray-700'} block px-4 py-2 text-sm font-medium`}>
                                                    Wave 2 - HSSE 1/2
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a href="#" className={`${active ? 'bg-blue-50 text-blue-900' : 'text-gray-700'} block px-4 py-2 text-sm`}>
                                                    Wave 3 - S/4 Core
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a href="#" className={`${active ? 'bg-blue-50 text-blue-900' : 'text-gray-700'} block px-4 py-2 text-sm`}>
                                                    Wave 4 - SAC Planning
                                                </a>
                                            )}
                                        </Menu.Item>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                    <div>
                        <span className="text-gray-500 text-sm">Next Milestone due in</span>
                        <div className="font-semibold flex items-center space-x-1">
                            <span>16 days</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    {/* <div className="flex items-center space-x-2 border px-3 py-1 rounded">
                        <CalendarIcon className="h-4 w-4" />
                        <span>Last 30 Days</span>
                        <ChevronDownIcon className="h-4 w-4" />
                    </div>
                    <button className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded">
                        <FunnelIcon className="h-4 w-4" />
                        <span>Filters</span>
                    </button> */}
                    <button
                        className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded"
                        onClick={() => setHeaderExpanded(!headerExpanded)}
                    >
                        {headerExpanded ? (
                            <>
                                <ChevronUpIcon className="h-4 w-4" />
                                <span>Collapse</span>
                            </>
                        ) : (
                            <>
                                <ChevronDownIcon className="h-4 w-4" />
                                <span>Expand</span>
                            </>
                        )}
                    </button>
                    <button
                        className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded"
                        onClick={toggleFullScreen}
                    >
                        {isFullScreen ? (
                            <>
                                <ArrowsPointingInIcon className="h-4 w-4" />
                                {/* <span>Exit Fullscreen</span> */}
                            </>
                        ) : (
                            <>
                                <ArrowsPointingOutIcon className="h-4 w-4" />
                                {/* <span>Fullscreen</span> */}
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 overflow-auto">
                {/* Executive Overview Section */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700 flex items-center">
                        Executive Overview
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Go-Live Risk Index */}
                        <GoLiveRiskCard />

                        {/* Schedule Performance Index */}
                        <SPICard />

                        {/* Milestone Adherence Rate */}
                        <MilestoneAdherenceCard />

                        {/* Resource Capacity Gap */}
                        <div className="bg-white rounded-lg shadow p-5 border-t-4 border-purple-500">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-medium text-gray-700">Resource Capacity Gap</h3>
                                    <div className="text-xs text-gray-500 flex items-center">
                                        <span>MEDIUM PRIORITY</span>
                                    </div>
                                </div>
                                <div className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded flex items-center">
                                    Critical
                                </div>
                            </div>

                            {/* Heat Map Visualization (simplified) */}
                            <div className="flex flex-col space-y-2 mb-2">
                                <div className="flex items-center">
                                    <span className="text-xs w-24 truncate">Ashok M.</span>
                                    <div className="flex-1 flex space-x-0.5">
                                        <div className="h-6 w-full bg-red-600 rounded-sm"></div>
                                        <div className="h-6 w-full bg-red-500 rounded-sm"></div>
                                        <div className="h-6 w-full bg-red-400 rounded-sm"></div>
                                        <div className="h-6 w-full bg-yellow-400 rounded-sm"></div>
                                    </div>
                                    <span className="text-xs w-10 text-right font-medium text-red-600">142%</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-xs w-24 truncate">Gotham A.</span>
                                    <div className="flex-1 flex space-x-0.5">
                                        <div className="h-6 w-full bg-red-500 rounded-sm"></div>
                                        <div className="h-6 w-full bg-orange-400 rounded-sm"></div>
                                        <div className="h-6 w-full bg-yellow-400 rounded-sm"></div>
                                        <div className="h-6 w-full bg-green-400 rounded-sm"></div>
                                    </div>
                                    <span className="text-xs w-10 text-right font-medium text-orange-600">118%</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-xs w-24 truncate">Nivedha V.</span>
                                    <div className="flex-1 flex space-x-0.5">
                                        <div className="h-6 w-full bg-orange-400 rounded-sm"></div>
                                        <div className="h-6 w-full bg-yellow-400 rounded-sm"></div>
                                        <div className="h-6 w-full bg-green-400 rounded-sm"></div>
                                        <div className="h-6 w-full bg-green-400 rounded-sm"></div>
                                    </div>
                                    <span className="text-xs w-10 text-right font-medium text-yellow-600">96%</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-xs w-24 truncate">Hrithik S.</span>
                                    <div className="flex-1 flex space-x-0.5">
                                        <div className="h-6 w-full bg-yellow-400 rounded-sm"></div>
                                        <div className="h-6 w-full bg-green-400 rounded-sm"></div>
                                        <div className="h-6 w-full bg-green-400 rounded-sm"></div>
                                        <div className="h-6 w-full bg-green-400 rounded-sm"></div>
                                    </div>
                                    <span className="text-xs w-10 text-right font-medium text-green-600">84%</span>
                                </div>
                            </div>

                            <div className="flex justify-between text-xs text-gray-500 mt-2">
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-green-400 mr-1"></div>
                                    <span>&lt;85%</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-yellow-400 mr-1"></div>
                                    <span>85-100%</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-orange-400 mr-1"></div>
                                    <span>100-120%</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-red-500 mr-1"></div>
                                    <span>&gt;120%</span>
                                </div>
                            </div>

                            <div className="mt-3 pt-3 border-t flex justify-between items-center text-xs">
                                <div className="flex items-center text-gray-500">
                                    <span>4 overallocated resources</span>
                                </div>
                                <a href="#" className="text-blue-600 flex items-center">
                                    Details
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Timeline & Critical Path Section */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700">
                        Timeline & Critical Path
                    </h2>
                    <div className="bg-white rounded-lg shadow p-5">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-medium text-gray-700">Milestone Timeline & Critical Path Status</h3>
                                <div className="text-xs text-gray-500">Schedule visualization with critical path tasks highlighted</div>
                            </div>
                            <div className="flex space-x-2">
                                <button className="text-xs px-2 py-1 rounded border border-gray-300 bg-white">Week</button>
                                <button className="text-xs px-2 py-1 rounded border border-gray-300 bg-gray-100">Month</button>
                                <button className="text-xs px-2 py-1 rounded border border-gray-300 bg-white">Quarter</button>
                            </div>
                        </div>

                        {/* Simplified Timeline Visualization */}
                        <div className="border rounded-lg p-4 my-4">
                            <div className="flex border-b pb-2 mb-4">
                                <div className="w-1/6 text-xs text-gray-500">Task</div>
                                <div className="w-5/6 flex">
                                    <div className="flex-1 text-xs text-center">Apr</div>
                                    <div className="flex-1 text-xs text-center">May</div>
                                    <div className="flex-1 text-xs text-center">Jun</div>
                                    <div className="flex-1 text-xs text-center">Jul</div>
                                    <div className="flex-1 text-xs text-center">Aug</div>
                                    <div className="flex-1 text-xs text-center">Sep</div>
                                </div>
                            </div>

                            <div className="flex items-center mb-4">
                                <div className="w-1/6 text-xs">Wave 2 Go-Live</div>
                                <div className="w-5/6 relative h-6">
                                    <div className="absolute left-[60%] top-0 h-6 w-1 bg-blue-500"></div>
                                    <div className="absolute left-[75%] top-0 h-6 w-1 bg-red-500"></div>
                                    <div className="absolute top-3 left-[60%] w-[15%] h-0.5 bg-red-500"></div>
                                    <div className="absolute top-6 left-[65%] text-xs text-red-600">+15 days</div>
                                </div>
                            </div>

                            <div className="flex items-center mb-4">
                                <div className="w-1/6 text-xs">UAT Completion</div>
                                <div className="w-5/6 relative h-6">
                                    <div className="absolute left-[45%] top-0 w-[25%] h-6 bg-orange-400"></div>
                                    <div className="absolute left-[45%] top-0 w-[10%] h-6 bg-green-500"></div>
                                </div>
                            </div>

                            <div className="flex items-center mb-4">
                                <div className="w-1/6 text-xs">Data Migration</div>
                                <div className="w-5/6 relative h-6">
                                    <div className="absolute left-[50%] top-0 w-[30%] h-6 bg-yellow-400"></div>
                                    <div className="absolute left-[50%] top-0 w-[10%] h-6 bg-green-500"></div>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div className="w-1/6 text-xs">Infrastructure</div>
                                <div className="w-5/6 relative h-6">
                                    <div className="absolute left-[35%] top-0 w-[20%] h-6 bg-green-500"></div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-green-500 rounded-sm mr-1"></div>
                                <span>On Track</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-yellow-400 rounded-sm mr-1"></div>
                                <span>At Risk</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-red-500 rounded-sm mr-1"></div>
                                <span>Delayed</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                                <span>Original Milestone</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 border-2 border-red-500 bg-white rounded-full mr-1"></div>
                                <span>Projected Milestone</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Project Management Metrics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Left Column */}
                    <div>
                        <h2 className="text-lg font-semibold mb-4 text-gray-700">
                            Project Management Discipline
                        </h2>
                        <div className="mb-4">
                            <OnTimeDeliveryRate />
                        </div>
                        <div className="mb-4">
                            <DependencyCoverageCard />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white rounded-lg shadow p-5">
                                <h3 className="font-medium text-gray-700 mb-2">Plan Recency</h3>
                                <div className="flex justify-center">
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-red-600">12</div>
                                        <div className="text-sm text-gray-500">days since last update</div>
                                    </div>
                                </div>
                                <div className="text-xs text-gray-500 mt-3 text-center">
                                    Last updated: Apr 5, 2024
                                </div>
                                <div className="mt-3 pt-2 border-t flex justify-end">
                                    <a href="#" className="text-blue-600 text-xs">View Update History</a>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow p-5">
                                <h3 className="font-medium text-gray-700 mb-2">Baseline Changes</h3>
                                <div className="flex justify-center">
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-amber-600">3</div>
                                        <div className="text-sm text-gray-500">revisions in baseline</div>
                                    </div>
                                </div>
                                <div className="text-xs text-gray-500 mt-3 text-center">
                                    Last change: Mar 28, 2024
                                </div>
                                <div className="mt-3 pt-2 border-t flex justify-end">
                                    <a href="#" className="text-blue-600 text-xs">View Changes</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div>
                        <h2 className="text-lg font-semibold mb-4 text-gray-700">
                            Risk & Issue Management
                        </h2>
                        <RiskExposureCard />

                        <IssueResolutionCard />
                    </div>
                </div>
                <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700">
                        Approval & Governance
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <ApprovalCycleEfficiency />
                        <ApprovalBottleneckIndicator />
                    </div>
                </div>

                {/* AI Insights Section */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700">
                        AI-Powered Insights
                    </h2>
                    <div className="bg-white rounded-lg shadow p-5">
                        <div className="mb-4">
                            <h3 className="font-medium text-gray-700 mb-2">What's causing project delays?</h3>
                            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                <p className="text-sm text-gray-700">
                                    Based on analysis of current project data, the <b>primary factors causing delays</b> are:
                                </p>
                                <ul className="list-disc ml-5 mt-2 text-sm text-gray-700 space-y-1">
                                    <li>Resource overallocation in the development team (142% capacity)</li>
                                    <li>Delayed approval cycles (averaging 5.3 days per approval)</li>
                                    <li>Incomplete dependency mapping for UAT activities</li>
                                </ul>
                                <div className="mt-3 text-sm text-blue-700">
                                    <a href="#">View detailed analysis</a>
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <h3 className="font-medium text-gray-700 mb-2">Recommended Actions</h3>
                            <div className="space-y-2">
                                <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-700">Rebalance workload for development team</p>
                                        <p className="text-xs text-gray-500">High impact on schedule recovery</p>
                                    </div>
                                    <button className="px-3 py-1 bg-green-600 text-white rounded text-xs">Assign</button>
                                </div>
                                <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-700">Create missing dependencies for UAT tasks</p>
                                        <p className="text-xs text-gray-500">Medium impact on risk reduction</p>
                                    </div>
                                    <button className="px-3 py-1 bg-green-600 text-white rounded text-xs">Assign</button>
                                </div>
                                <div className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-700">Update project plan with current status</p>
                                        <p className="text-xs text-gray-500">Required for accurate forecasting</p>
                                    </div>
                                    <button className="px-3 py-1 bg-green-600 text-white rounded text-xs">Assign</button>
                                </div>
                            </div>
                        </div>

                        <div className="border-t pt-4">
                            <div className="flex">
                                <input type="text" placeholder="Ask a question about your project..." className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg">Ask</button>
                            </div>
                            <div className="mt-2 text-xs text-gray-500">
                                Try: "What milestones are at risk?" or "How can we improve resource utilization?"
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectHealthDashboard;