import React, { useState } from 'react';
import {
    HomeIcon,
    ChartBarIcon,
    CalendarIcon,
    ClipboardDocumentListIcon,
    UserGroupIcon,
    CogIcon,
    QuestionMarkCircleIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    ArrowsPointingInIcon,
    ArrowsPointingOutIcon
} from '@heroicons/react/24/outline';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';

import SPICard from './SPICard';
import ApprovalCycleEfficiency from './ApprovalCycleEfficiency';
import ApprovalBottleneckIndicator from './ApprovalBottleneckIndicator';
import MilestoneAdherenceCard from './MilestoneAdherenceCard';
import GoLiveRiskCard from './GoLiveRiskCard';
import RiskExposureCard from './RiskExposureCard';
import IssueResolutionCard from './IssueResolutionCard';
import DependencyCoverageCard from './DependencyCoverageCard';
import PlanRecencyCard from './PlanRecencyCard';
import BaselineChangesCard from './BaselineChangesCard';
import TimelineComparisonChart from './TimelineComparisonChart';
import RiskHeatmap from './RiskHeatmap';
import AIAssistantChatbot from './AIAssistantChatbot';
import OverdueTasksByStakeholder from './OverdueTasksByStakeholder';

const VerticalNavigation = ({ isFullScreen, toggleFullScreen }) => {
    const [collapsed, setCollapsed] = useState(true);
    const [headerExpanded, setHeaderExpanded] = useState(true);

    // Tailwind blue color that matches #1890FF (or close to it)
    // #1890FF is close to Tailwind's blue-500 with custom styling

    return (
        <div className="flex flex-col h-screen">
            {/* Vertical Navigation */}
            <div className="flex h-full">
                {/* Sidebar */}
                <div className={`bg-white text-blue-500 flex flex-col ${collapsed ? 'w-16' : 'w-64'} transition-all duration-300 ease-in-out shadow-md`}>
                    {/* Logo Section */}
                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-center">
                            <div className="flex items-center justify-center bg-red-800 text-white rounded-lg h-10 w-10 font-bold text-xl">
                                K
                            </div>
                            {!collapsed && (
                                <span className="ml-3 font-semibold text-lg text-gray-800">KTern</span>
                            )}
                        </div>
                        {/* <button
                            onClick={() => setCollapsed(!collapsed)}
                            className="text-blue-500 hover:bg-gray-100 rounded p-1"
                        >
                            {collapsed ? (
                                <ChevronRightIcon className="h-5 w-5" />
                            ) : (
                                <ChevronLeftIcon className="h-5 w-5" />
                            )}
                        </button> */}
                    </div>

                    {/* Navigation Items */}
                    <div className="flex-1 overflow-y-auto py-4">
                        <nav className="px-2 space-y-1">
                            {/* Dashboard */}
                            <a
                                href="#"
                                className={`flex items-center ${collapsed ? 'justify-center' : 'px-4'} py-3 text-sm font-medium rounded-md bg-blue-50 text-blue-500`}
                            >
                                <div className={`${collapsed ? '' : 'mr-3'} text-blue-500`}>
                                    <HomeIcon className="h-6 w-6" />
                                </div>
                                {!collapsed && <span>Dashboard</span>}
                            </a>

                            {/* Analytics */}
                            <a
                                href="#"
                                className={`flex items-center ${collapsed ? 'justify-center' : 'px-4'} py-3 text-sm font-medium rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-500`}
                            >
                                <div className={`${collapsed ? '' : 'mr-3'} text-gray-500`}>
                                    <ChartBarIcon className="h-6 w-6" />
                                </div>
                                {!collapsed && <span>Analytics</span>}
                            </a>

                            {/* Schedule */}
                            <a
                                href="#"
                                className={`flex items-center ${collapsed ? 'justify-center' : 'px-4'} py-3 text-sm font-medium rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-500`}
                            >
                                <div className={`${collapsed ? '' : 'mr-3'} text-gray-500`}>
                                    <CalendarIcon className="h-6 w-6" />
                                </div>
                                {!collapsed && <span>Schedule</span>}
                            </a>

                            {/* Tasks */}
                            <a
                                href="#"
                                className={`flex items-center ${collapsed ? 'justify-center' : 'px-4'} py-3 text-sm font-medium rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-500`}
                            >
                                <div className={`${collapsed ? '' : 'mr-3'} text-gray-500`}>
                                    <ClipboardDocumentListIcon className="h-6 w-6" />
                                </div>
                                {!collapsed && <span>Tasks</span>}
                            </a>

                            {/* Team */}
                            <a
                                href="#"
                                className={`flex items-center ${collapsed ? 'justify-center' : 'px-4'} py-3 text-sm font-medium rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-500`}
                            >
                                <div className={`${collapsed ? '' : 'mr-3'} text-gray-500`}>
                                    <UserGroupIcon className="h-6 w-6" />
                                </div>
                                {!collapsed && <span>Team</span>}
                            </a>

                            {/* Settings */}
                            <a
                                href="#"
                                className={`flex items-center ${collapsed ? 'justify-center' : 'px-4'} py-3 text-sm font-medium rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-500`}
                            >
                                <div className={`${collapsed ? '' : 'mr-3'} text-gray-500`}>
                                    <CogIcon className="h-6 w-6" />
                                </div>
                                {!collapsed && <span>Settings</span>}
                            </a>

                            {/* Help */}
                            <a
                                href="#"
                                className={`flex items-center ${collapsed ? 'justify-center' : 'px-4'} py-3 text-sm font-medium rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-500`}
                            >
                                <div className={`${collapsed ? '' : 'mr-3'} text-gray-500`}>
                                    <QuestionMarkCircleIcon className="h-6 w-6" />
                                </div>
                                {!collapsed && <span>Help</span>}
                            </a>
                        </nav>
                    </div>

                    {/* User Profile at bottom */}
                    <div className="p-4 border-t border-gray-100">
                        <div className="flex items-center">
                            <div className="inline-flex overflow-hidden relative justify-center items-center w-10 h-10 bg-orange-100 rounded-full">
                                <span className="font-medium text-sm text-orange-500">CS</span>
                            </div>
                            {!collapsed && (
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-800">Chris Scott</p>
                                    {/* <p className="text-xs text-gray-500">GNXD84</p> */}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Main Content Container */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Project Info Banner */}
                    <div className="bg-white border-b px-4 py-2 flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <div>
                                <span className="text-gray-500 text-xs">Project</span>
                                <h2 className="font-semibold text-sm">Motiva Quantum Leap</h2>
                            </div>
                            <div>
                                <span className="text-gray-500 text-xs block">Current Project/Wave</span>
                                <Menu as="div" className="relative inline-block text-left">
                                    <div>
                                        <Menu.Button className="inline-flex w-full justify-center gap-x-1 rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 hover:bg-blue-200">
                                            Wave 3 - S/4 Core
                                            <ChevronDownIcon className="-mr-1 h-4 w-4 text-blue-700" aria-hidden="true" />
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
                                        <Menu.Items className="absolute left-0 z-10 mt-1 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                                            <div className="py-1">
                                                {/* Program header - selectable but styled differently */}
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a className={`${active ? 'bg-blue-50 text-blue-900' : 'text-gray-900'} block px-4 py-2 text-xs ${active ? 'bg-blue-50' : ''}`}>
                                                            Program: Quantum Leap
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                                {/* Child wave items - indented and with a left border to show hierarchy */}
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a className={`${active ? 'bg-blue-50 text-blue-900' : 'text-gray-700'} block px-4 py-2 text-sm pl-8 border-l-2 border-transparent ${active ? 'border-blue-500' : ''}`}>
                                                            Wave 0 - Global Prepare
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a className={`${active ? 'bg-blue-50 text-blue-900' : 'text-gray-700'} block px-4 py-2 text-sm pl-8 border-l-2 border-transparent ${active ? 'border-blue-500' : ''}`}>
                                                            Value Validation
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a className={`${active ? 'bg-blue-50 text-blue-900' : 'text-gray-700'} block px-4 py-2 text-sm pl-8 border-l-2 border-transparent ${active ? 'border-blue-500' : ''}`}>
                                                            Wave 1 - PTP 1/2
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a className={`${active ? 'bg-blue-50 text-blue-900' : 'text-gray-700'} block px-4 py-2 text-sm pl-8 border-l-2 border-transparent ${active ? 'border-blue-500' : ''}`}>
                                                            Wave 2 - HSSE 1/2
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a className={`${active ? 'bg-blue-50 text-blue-900' : 'text-gray-700'} block px-4 py-2 text-sm pl-8 border-l-2 border-transparent ${active ? 'border-blue-500' : ''} font-medium`}>
                                                            Wave 3 - S/4 Core
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a className={`${active ? 'bg-blue-50 text-blue-900' : 'text-gray-700'} block px-4 py-2 text-sm pl-8 border-l-2 border-transparent ${active ? 'border-blue-500' : ''}`}>
                                                            Wave 4 - SAC Planning
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a className={`${active ? 'bg-blue-50 text-blue-900' : 'text-gray-700'} block px-4 py-2 text-sm pl-8 border-l-2 border-transparent ${active ? 'border-blue-500' : ''}`}>
                                                            Wave 5 - HSSE 2/2
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a className={`${active ? 'bg-blue-50 text-blue-900' : 'text-gray-700'} block px-4 py-2 text-sm pl-8 border-l-2 border-transparent ${active ? 'border-blue-500' : ''}`}>
                                                            Wave 6 - EAM 2/2
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a className={`${active ? 'bg-blue-50 text-blue-900' : 'text-gray-700'} block px-4 py-2 text-sm pl-8 border-l-2 border-transparent ${active ? 'border-blue-500' : ''}`}>
                                                            Wave 7 - S/4 Hydrocarbon
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a className={`${active ? 'bg-blue-50 text-blue-900' : 'text-gray-700'} block px-4 py-2 text-sm pl-8 border-l-2 border-transparent ${active ? 'border-blue-500' : ''}`}>
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
                                <div className="font-semibold flex items-center">
                                    <span className="text-sm">16 days</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <button
                                onClick={toggleFullScreen}
                                className="inline-flex items-center justify-center rounded-md bg-white p-1 text-gray-700 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50 transition-colors duration-200 focus:outline-none"
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

                    {/* Main Content Area - This is where your dashboard content will go */}
                    <div className="flex-1 p-6 overflow-auto bg-gray-50">
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

                                {/* Risk Heatmap */}
                                <RiskHeatmap />
                            </div>
                        </div>

                        {/* Timeline & Critical Path Section */}
                        <div className='mb-4'>
                            <TimelineComparisonChart />
                        </div>

                        {/* Signoff Approval and Governance */}
                        <div className="mb-8">
                            <h2 className="text-lg font-semibold mb-4 text-gray-700">
                                Signoff Approval & Governance
                            </h2>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <ApprovalCycleEfficiency />
                                <ApprovalBottleneckIndicator />
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
                                        <div>
                                            <DependencyCoverageCard />
                                        </div>

                                        {/* Two equal cards in a row */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <PlanRecencyCard />
                                            </div>
                                            <div>
                                                <BaselineChangesCard />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* AI Insights Section */}
                        <AIAssistantChatbot />
                    </div>
                </div>
            </div>
        </div>
    );
};

// Navigation Item Component
const NavItem = ({ icon, title, active = false, collapsed = false }) => {
    return (
        <a
            href="#"
            className={`flex items-center ${collapsed ? 'justify-center' : 'px-4'} py-3 text-sm font-medium rounded-md ${active
                ? 'bg-blue-600 text-white'
                : 'text-blue-100 hover:bg-blue-600 hover:text-white'
                }`}
        >
            <div className={collapsed ? '' : 'mr-3'}>{icon}</div>
            {!collapsed && <span>{title}</span>}
        </a>
    );
};

export default VerticalNavigation;