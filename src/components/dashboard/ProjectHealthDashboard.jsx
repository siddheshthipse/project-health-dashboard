import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon, ArrowsPointingOutIcon, ArrowsPointingInIcon, SparklesIcon } from '@heroicons/react/20/solid';
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
import PlanRecencyCard from './PlanRecencyCard';
import BaselineChangesCard from './BaselineChangesCard';
import ResourceCapacityGap from './ResourceCapacityGapCard';
import TimelineComparisonChart from './TimelineComparisonChart';
import RiskHeatmap from './RiskHeatmap';
import AIAssistantChatbot from './AIAssistantChatbot';
import OverdueTasksByStakeholder from './OverdueTasksByStakeholder';

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
                        <span className="text-gray-500 text-xs">Project</span>
                        <h2 className="font-semibold">Motiva Quantum Leap</h2>
                    </div>
                    <div>
                        <span className="text-gray-500 text-xs block">Current Program/Wave</span>
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
                                                    Program: Quantum Leap
                                                </a>
                                            )}
                                        </Menu.Item>
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
                                                    Value Validation
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
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a href="#" className={`${active ? 'bg-blue-50 text-blue-900' : 'text-gray-700'} block px-4 py-2 text-sm`}>
                                                    Wave 5 - HSSE 2/2
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a href="#" className={`${active ? 'bg-blue-50 text-blue-900' : 'text-gray-700'} block px-4 py-2 text-sm`}>
                                                    Wave 6 - EAM 2/2
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a href="#" className={`${active ? 'bg-blue-50 text-blue-900' : 'text-gray-700'} block px-4 py-2 text-sm`}>
                                                    Wave 7 - S/4 Hydrocarbon
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a href="#" className={`${active ? 'bg-blue-50 text-blue-900' : 'text-gray-700'} block px-4 py-2 text-sm`}>
                                                    Wave 8 - Security & Control
                                                </a>
                                            )}
                                        </Menu.Item>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                    <div>
                        <span className="text-gray-500 text-xs">Next Milestone due in</span>
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
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setHeaderExpanded(!headerExpanded)}
                            className="inline-flex items-center gap-1.5 rounded-md bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50 transition-colors duration-200 focus:outline-none"
                        >
                            <Transition
                                show={true}
                                enter="transition duration-100 ease-out"
                                enterFrom="transform scale-95 opacity-0"
                                enterTo="transform scale-100 opacity-100"
                                leave="transition duration-75 ease-out"
                                leaveFrom="transform scale-100 opacity-100"
                                leaveTo="transform scale-95 opacity-0"
                            >
                                <span className="flex items-center">
                                    {headerExpanded ? (
                                        <>
                                            <ChevronUpIcon className="h-4 w-4 text-gray-500" />
                                            <span>Collapse</span>
                                        </>
                                    ) : (
                                        <>
                                            <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                                            <span>Expand</span>
                                        </>
                                    )}
                                </span>
                            </Transition>
                        </button>

                        <button
                            onClick={toggleFullScreen}
                            className="inline-flex items-center justify-center rounded-md bg-white p-1.5 text-gray-700 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50 transition-colors duration-200 focus:outline-none"
                            title={isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
                        >
                            <Transition
                                show={true}
                                enter="transition duration-100 ease-out"
                                enterFrom="transform rotate-90 opacity-0"
                                enterTo="transform rotate-0 opacity-100"
                                leave="transition duration-75 ease-out"
                                leaveFrom="transform rotate-0 opacity-100"
                                leaveTo="transform rotate-90 opacity-0"
                            >
                                {isFullScreen ? (
                                    <ArrowsPointingInIcon className="h-4 w-4" />
                                ) : (
                                    <ArrowsPointingOutIcon className="h-4 w-4" />
                                )}
                            </Transition>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 overflow-auto">
                {/* Executive Overview Section */}
                <div className="mb-4">
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
                        {/* <ResourceCapacityGap /> */}
                        <RiskHeatmap />
                    </div>
                </div>

                {/* Timeline & Critical Path Section */}
                <div className='mb-4'>
                    <TimelineComparisonChart />
                </div>

                {/* Project Management Metrics */}
                {/* Project Management Discipline Section */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700">
                        Project Management Discipline
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* First column - spans 2 columns */}
                        <div className="lg:col-span-2">
                            <OverdueTasksByStakeholder />
                        </div>

                        {/* Second column - spans 2 columns with nested grid */}
                        <div className="lg:col-span-2">
                            <div className="grid grid-cols-1 gap-6">
                                {/* Dependency Coverage Card takes full width */}
                                <div className="h-full">
                                    <DependencyCoverageCard />
                                </div>

                                {/* Two equal cards in a row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                    <div className="h-full">
                                        <PlanRecencyCard />
                                    </div>
                                    <div className="h-full">
                                        <BaselineChangesCard />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Risk & Issue Management Section */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700">
                        Risk & Issue Management
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="h-full">
                            <RiskExposureCard />
                        </div>
                        <div className="h-full">
                            <IssueResolutionCard />
                        </div>
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
                <AIAssistantChatbot />
            </div>
        </div>
    );
};

export default ProjectHealthDashboard;