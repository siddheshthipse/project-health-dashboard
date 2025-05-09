import React, { useState, Fragment } from 'react';
import { Dialog, Transition, Menu } from '@headlessui/react';
import {
    XMarkIcon,
    ChevronRightIcon,
    ChevronDownIcon,
    ArrowsPointingOutIcon,
    ArrowsPointingInIcon,
    EyeIcon,
    EyeSlashIcon,
    FunnelIcon,
    CheckIcon,
    XMarkIcon as XCircleIcon,
    LightBulbIcon
} from '@heroicons/react/20/solid';

const MilestoneAdherenceDrilldownModal = ({ isOpen, closeModal }) => {
    // State for tree table, fullscreen and filters
    const [expandedRows, setExpandedRows] = useState({
        'MS58': true,
    });
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [showSlicers, setShowSlicers] = useState(true);
    const [filters, setFilters] = useState({
        type: [],
        baselineEnd: [],
        plannedEnd: [],
        planned: [],      // Renamed from progress
        actual: [],       // Added new filter 
        slackDays: [],
        baselineVariance: [],
        overdueDays: []
    });

    // Function to toggle row expansion
    const toggleRowExpansion = (id) => {
        setExpandedRows({
            ...expandedRows,
            [id]: !expandedRows[id]
        });
    };

    // Function to toggle fullscreen
    const toggleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
    };

    // Toggle a filter value
    const toggleFilter = (category, value) => {
        setFilters(prev => {
            const updated = { ...prev };
            if (updated[category].includes(value)) {
                updated[category] = updated[category].filter(v => v !== value);
            } else {
                updated[category] = [...updated[category], value];
            }
            return updated;
        });
    };

    // Clear filters for a category
    const clearFilters = (category) => {
        setFilters(prev => ({
            ...prev,
            [category]: []
        }));
    };

    // Sample milestone data with updated columns
    const milestoneData = [
        {
            "id": "3662d408d6beb0d53071c12b",
            "wbs": "1.5.1.1",
            "title": "MS48 : Completion of Wave Prepare",
            "type": "Milestone",
            "baselineEnd": "Jul 25, 2024",
            "plannedEnd": "Jul 25, 2024",
            "planned": "2.64%",
            "actual": "2.64%",
            "overdueDays": "288",
            "delayLog": "",
            "status": "COMPLETED",
            "children": [
                {
                    "id": "36639b40d6beb0d53071c12c",
                    "wbs": "1.5.1.1.1",
                    "title": "Project Plans, Schedule",
                    "type": "Task",
                    "baselineEnd": "May 24, 2024",
                    "plannedEnd": "May 24, 2024",
                    "planned": "0.06%",
                    "actual": "0.06%",
                    "overdueDays": "350",
                    "delayLog": "",
                    "status": "COMPLETED"
                },
                {
                    "id": "c3784e90ee452fb768a0d0dd",
                    "wbs": "1.5.1.1.2",
                    "title": "Data Migration Strategy Preparation",
                    "type": "Task",
                    "baselineEnd": "Jul 09, 2024",
                    "plannedEnd": "Jul 09, 2024",
                    "planned": "0.02%",
                    "actual": "0.02%",
                    "overdueDays": "304",
                    "delayLog": "",
                    "status": "COMPLETED"
                },
                {
                    "id": "36871930d6beb0d53071c150",
                    "wbs": "1.5.1.1.3",
                    "title": "Communication Plan",
                    "type": "Task",
                    "baselineEnd": "Jul 12, 2024",
                    "plannedEnd": "Jul 12, 2024",
                    "planned": "0.03%",
                    "actual": "0.03%",
                    "overdueDays": "301",
                    "delayLog": "",
                    "status": "COMPLETED"
                },
                {
                    "id": "3689efc0d6beb0d53071c153",
                    "wbs": "1.5.1.1.4",
                    "title": "Solution Scope Confirmation and P4 processes finalization",
                    "type": "Task",
                    "baselineEnd": "Jun 13, 2024",
                    "plannedEnd": "Jun 13, 2024",
                    "planned": "0.34%",
                    "actual": "0.34%",
                    "overdueDays": "330",
                    "delayLog": "",
                    "status": "COMPLETED"
                },
                {
                    "id": "c02c5c10ecea9e522381020d",
                    "wbs": "1.5.1.1.5",
                    "title": "Conduct - Solution Scope Assessment and GSI P4 confirmation (Kaar ,PQL, BPO, SME)",
                    "type": "Task",
                    "baselineEnd": "Jul 10, 2024",
                    "plannedEnd": "Jul 10, 2024",
                    "planned": "0.43%",
                    "actual": "0.43%",
                    "overdueDays": "303",
                    "delayLog": "",
                    "status": "COMPLETED"
                },
                {
                    "id": "368bbcb0d6beb0d53071c155",
                    "wbs": "1.5.1.1.6",
                    "title": "Stakeholder Analysis",
                    "type": "Task",
                    "baselineEnd": "Jun 21, 2024",
                    "plannedEnd": "Jun 21, 2024",
                    "planned": "0.06%",
                    "actual": "0.06%",
                    "overdueDays": "322",
                    "delayLog": "",
                    "status": "COMPLETED"
                },
                {
                    "id": "369818c0d6beb0d53071c15a",
                    "wbs": "1.5.1.1.7",
                    "title": "Clean Core Quality Gate",
                    "type": "Task",
                    "baselineEnd": "Jun 28, 2024",
                    "plannedEnd": "Jun 28, 2024",
                    "planned": "0.02%",
                    "actual": "0.02%",
                    "overdueDays": "315",
                    "delayLog": "",
                    "status": "COMPLETED"
                },
                {
                    "id": "3699f938d6beb0d53071c15c",
                    "wbs": "1.5.1.1.8",
                    "title": "Phase Closure and Sign-Off Phase Deliverables",
                    "type": "Task",
                    "baselineEnd": "Jul 25, 2024",
                    "plannedEnd": "Jul 25, 2024",
                    "planned": "0.03%",
                    "actual": "0.03%",
                    "overdueDays": "288",
                    "delayLog": "",
                    "status": "COMPLETED"
                },
                {
                    "id": "dd1bd6102bbf9ad3a3f4f363",
                    "wbs": "1.5.1.1.9",
                    "title": "Signoff - Project Plan",
                    "type": "Task",
                    "baselineEnd": "Jul 05, 2024",
                    "plannedEnd": "Jul 05, 2024",
                    "planned": "0.03%",
                    "actual": "0.03%",
                    "overdueDays": "308",
                    "delayLog": "",
                    "status": "COMPLETED"
                },
                {
                    "id": "36686da0d6beb0d53071c131",
                    "wbs": "1.5.1.1.10",
                    "title": "Project Kick-Off and On-Boarding",
                    "type": "Task",
                    "baselineEnd": "Jul 11, 2024",
                    "plannedEnd": "Jul 11, 2024",
                    "planned": "0.39%",
                    "actual": "0.39%",
                    "overdueDays": "302",
                    "delayLog": "",
                    "status": "COMPLETED"
                },
                {
                    "id": "366b3878d6beb0d53071c134",
                    "wbs": "1.5.1.1.11",
                    "title": "Business Driven Configuration Assessment",
                    "type": "Task",
                    "baselineEnd": "May 31, 2024",
                    "plannedEnd": "May 28, 2024",
                    "planned": "0.02%",
                    "actual": "0.02%",
                    "overdueDays": "346",
                    "delayLog": "",
                    "status": "COMPLETED"
                },
                {
                    "id": "366d72c8d6beb0d53071c136",
                    "wbs": "1.5.1.1.12",
                    "title": "Fit-to-Standard Analysis Preparation",
                    "type": "Task",
                    "baselineEnd": "Jul 09, 2024",
                    "plannedEnd": "Jul 09, 2024",
                    "planned": "0.10%",
                    "actual": "0.10%",
                    "overdueDays": "304",
                    "delayLog": "",
                    "status": "COMPLETED"
                },
                {
                    "id": "36719948d6beb0d53071c13a",
                    "wbs": "1.5.1.1.13",
                    "title": "Fit-to-Standard Analysis Preparation",
                    "type": "Task",
                    "baselineEnd": "Jul 11, 2024",
                    "plannedEnd": "Jul 11, 2024",
                    "planned": "0.93%",
                    "actual": "0.93%",
                    "overdueDays": "302",
                    "delayLog": "",
                    "status": "COMPLETED"
                },
                {
                    "id": "367978e8d6beb0d53071c142",
                    "wbs": "1.5.1.1.14",
                    "title": "Prepare Integration Setup",
                    "type": "Task",
                    "baselineEnd": "Jun 27, 2024",
                    "plannedEnd": "Jun 26, 2024",
                    "planned": "0.05%",
                    "actual": "0.05%",
                    "overdueDays": "317",
                    "delayLog": "",
                    "status": "COMPLETED"
                },
                {
                    "id": "367d4d60d6beb0d53071c146",
                    "wbs": "1.5.1.1.15",
                    "title": "Fit-to-Standard Preparation For Specific Features",
                    "type": "Task",
                    "baselineEnd": "Jun 21, 2024",
                    "plannedEnd": "Jun 21, 2024",
                    "planned": "0.05%",
                    "actual": "0.05%",
                    "overdueDays": "322",
                    "delayLog": "",
                    "status": "COMPLETED"
                },
                {
                    "id": "36811df0d6beb0d53071c14a",
                    "wbs": "1.5.1.1.16",
                    "title": "Change Plan",
                    "type": "Task",
                    "baselineEnd": "Jul 03, 2024",
                    "plannedEnd": "Jul 03, 2024",
                    "planned": "0.08%",
                    "actual": "0.08%",
                    "overdueDays": "310",
                    "delayLog": "",
                    "status": "COMPLETED"
                }
            ]
        },
        {
            "id": "369dbe10d6beb0d53071c160",
            "wbs": "1.5.2.1",
            "title": "MS49 : Completion of Fit to Standard Workshop",
            "type": "Milestone",
            "baselineEnd": "Dec 31, 2024",
            "plannedEnd": "Dec 27, 2024",
            "planned": "9.84%",
            "actual": "9.84%",
            "overdueDays": "133",
            "delayLog": "",
            "status": "COMPLETED",
            "children": [
                {
                    "id": "36aac9e8d6beb0d53071c16d",
                    "wbs": "1.5.2.1.1",
                    "title": "Fit-to-Standard (FTS) Workshops",
                    "type": "Task",
                    "baselineEnd": "Dec 17, 2024",
                    "plannedEnd": "Dec 27, 2024",
                    "planned": "9.41%",
                    "actual": "9.41%",
                    "overdueDays": "133",
                    "delayLog": "",
                    "status": "COMPLETED"
                },
                {
                    "id": "53aa1c18053cc70e7bb24fc7",
                    "wbs": "1.5.2.1.2",
                    "title": "Customer Execution of Standard Processes",
                    "type": "Task",
                    "baselineEnd": "Sep 24, 2024",
                    "plannedEnd": "Sep 16, 2024",
                    "planned": "0.43%",
                    "actual": "0.43%",
                    "overdueDays": "235",
                    "delayLog": "",
                    "status": "COMPLETED"
                },
                {
                    "id": "1a1dc478d747f481aad29cf8",
                    "wbs": "1.5.2.1.3",
                    "title": "Completion of P4 Validation - Indirect Tax (IT_TAX_MS1)",
                    "type": "Task",
                    "baselineEnd": "Nov 20, 2024",
                    "plannedEnd": "Nov 12, 2024",
                    "planned": "0.00%",
                    "actual": "0.00%",
                    "overdueDays": "178",
                    "delayLog": "",
                    "status": "COMPLETED"
                },
                {
                    "id": "1a22c9a0d747f481aad29cfd",
                    "wbs": "1.5.2.1.4",
                    "title": "Completion of Fit to Standard Workshop - Indirect Tax (IT_TAX_MS2)",
                    "type": "Task",
                    "baselineEnd": "Dec 31, 2024",
                    "plannedEnd": "Dec 23, 2024",
                    "planned": "0.00%",
                    "actual": "0.00%",
                    "overdueDays": "137",
                    "delayLog": "",
                    "status": "COMPLETED"
                }
            ]
        },
        {
            "id": "2161bf58d5747363b359b097",
            "wbs": "1.5.2.2",
            "title": "MS50 : Solution Design Document Completion",
            "type": "Milestone",
            "baselineEnd": "Jan 31, 2025",
            "plannedEnd": "May 05, 2025",
            "planned": "4.17%",
            "actual": "4.16%",
            "overdueDays": "4",
            "delayLog": "SDD final approval is pending with the Business SME and BPO. A few FRS & ADDs are yet to be completed by Kaar and approved by Motiva. target to complete them by 7th May",
            "status": "ON TRACK",
            "children": [
                {
                    "id": "dd7354709f77e9df21965bf0",
                    "wbs": "1.5.2.2.1",
                    "title": "CIM - Organization Structure & KDS Finalization",
                    "type": "Task",
                    "baselineEnd": "Dec 14, 2024",
                    "plannedEnd": "Dec 12, 2024",
                    "planned": "0.36%",
                    "actual": "0.36%",
                    "overdueDays": "148",
                    "delayLog": "",
                    "status": "COMPLETED"
                },
                {
                    "id": "716a10a0c0c8c21b7b55f770",
                    "wbs": "1.5.2.2.2",
                    "title": "Analytics Report Design",
                    "type": "Task",
                    "baselineEnd": "Nov 01, 2024",
                    "plannedEnd": "Nov 01, 2024",
                    "planned": "0.17%",
                    "actual": "0.17%",
                    "overdueDays": "189",
                    "delayLog": "",
                    "status": "COMPLETED"
                },
                {
                    "id": "fbcb56f001e8fb1b4212f338",
                    "wbs": "1.5.2.2.3",
                    "title": "Analytics Solution Design Document",
                    "type": "Task",
                    "baselineEnd": "Dec 25, 2024",
                    "plannedEnd": "Apr 18, 2025",
                    "planned": "0.03%",
                    "actual": "0.03%",
                    "overdueDays": "21",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "20757fd0cde609df7f20712d",
                    "wbs": "1.5.2.2.4",
                    "title": "Key Data Structure Finalization",
                    "type": "Task",
                    "baselineEnd": "Jan 11, 2025",
                    "plannedEnd": "Jan 09, 2025",
                    "planned": "0.13%",
                    "actual": "0.13%",
                    "overdueDays": "120",
                    "delayLog": "",
                    "status": "COMPLETED"
                },
                {
                    "id": "20899470cde609df7f207134",
                    "wbs": "1.5.2.2.5",
                    "title": "S/4 HANA  System Readiness",
                    "type": "Task",
                    "baselineEnd": "Jan 22, 2025",
                    "plannedEnd": "Oct 08, 2024",
                    "planned": "0.17%",
                    "actual": "0.17%",
                    "overdueDays": "213",
                    "delayLog": "",
                    "status": "COMPLETED"
                },
                {
                    "id": "6f124d78d275720849c49f68",
                    "wbs": "1.5.2.2.6",
                    "title": "FTS Workshop validation",
                    "type": "Task",
                    "baselineEnd": "Dec 20, 2024",
                    "plannedEnd": "Jan 20, 2025",
                    "planned": "0.12%",
                    "actual": "0.12%",
                    "overdueDays": "109",
                    "delayLog": "",
                    "status": "COMPLETED"
                },
                {
                    "id": "8a1f6e90e8748e63da881941",
                    "wbs": "1.5.2.2.7",
                    "title": "Solution Design Document",
                    "type": "Task",
                    "baselineEnd": "Jan 31, 2025",
                    "plannedEnd": "Apr 18, 2025",
                    "planned": "1.93%",
                    "actual": "1.92%",
                    "overdueDays": "21",
                    "delayLog": "Waiting for Business SME and BPO final Approval",
                    "status": "ON TRACK"
                },
                {
                    "id": "5235ada0812e1ac79eac3acd",
                    "wbs": "1.5.2.2.8",
                    "title": "Functional Requirement Specification - FRS",
                    "type": "Task",
                    "baselineEnd": "Jan 17, 2025",
                    "plannedEnd": "May 05, 2025",
                    "planned": "1.26%",
                    "actual": "1.26%",
                    "overdueDays": "4",
                    "delayLog": "",
                    "status": "ON TRACK"
                }
            ]
        },
        {
            "id": "36df8200d6beb0d53071c19f",
            "wbs": "1.5.2.3",
            "title": "MS51 : Completion of Explore Phase",
            "type": "Milestone",
            "baselineEnd": "Jan 31, 2025",
            "plannedEnd": "Apr 21, 2025",
            "planned": "4.23%",
            "actual": "4.17%",
            "overdueDays": "18",
            "delayLog": "",
            "status": "ON TRACK",
            "children": [
                {
                    "id": "9e2fb1201baaafde06b44a29",
                    "wbs": "1.5.2.3.1",
                    "title": "Execution/Monitoring of Project",
                    "type": "Task",
                    "baselineEnd": "Jan 29, 2025",
                    "plannedEnd": "Jan 29, 2025",
                    "planned": "0.16%",
                    "actual": "0.16%",
                    "overdueDays": "100",
                    "delayLog": "",
                    "status": "COMPLETED"
                },
                {
                    "id": "71fdd0e0719ccf4474bee2e9",
                    "wbs": "1.5.2.3.2",
                    "title": "System Walkthrough - Third Party",
                    "type": "Task",
                    "baselineEnd": "Sep 21, 2024",
                    "plannedEnd": "Sep 20, 2024",
                    "planned": "0.30%",
                    "actual": "0.30%",
                    "overdueDays": "231",
                    "delayLog": "",
                    "status": "COMPLETED"
                },
                {
                    "id": "47100b88c7f64b6dca4bc1fe",
                    "wbs": "1.5.2.3.3",
                    "title": "Data Migration",
                    "type": "Task",
                    "baselineEnd": "Dec 16, 2024",
                    "plannedEnd": "Feb 28, 2025",
                    "planned": "1.67%",
                    "actual": "1.67%",
                    "overdueDays": "70",
                    "delayLog": "",
                    "status": "COMPLETED"
                },
                {
                    "id": "a7c54080cc5cbad25b22f39d",
                    "wbs": "1.5.2.3.4",
                    "title": "Testing",
                    "type": "Task",
                    "baselineEnd": "Jan 21, 2025",
                    "plannedEnd": "Apr 11, 2025",
                    "planned": "1.27%",
                    "actual": "1.27%",
                    "overdueDays": "28",
                    "delayLog": "",
                    "status": "COMPLETED"
                },
                {
                    "id": "d2fbd1c87f40c85765c78351",
                    "wbs": "1.5.2.3.5",
                    "title": "Process Control & IAG",
                    "type": "Task",
                    "baselineEnd": "Oct 15, 2024",
                    "plannedEnd": "Oct 04, 2024",
                    "planned": "0.59%",
                    "actual": "0.59%",
                    "overdueDays": "217",
                    "delayLog": "",
                    "status": "COMPLETED"
                },
                {
                    "id": "36e35678d6beb0d53071c1a3",
                    "wbs": "1.5.2.3.6",
                    "title": "User Access and Security Planning and Design",
                    "type": "Task",
                    "baselineEnd": "Sep 20, 2024",
                    "plannedEnd": "Sep 06, 2024",
                    "planned": "0.03%",
                    "actual": "0.03%",
                    "overdueDays": "245",
                    "delayLog": "",
                    "status": "COMPLETED"
                },
                {
                    "id": "f60bc0d804c214cd44a3ecaa",
                    "wbs": "1.5.2.3.7",
                    "title": "OCM Activities",
                    "type": "Task",
                    "baselineEnd": "Jan 31, 2025",
                    "plannedEnd": "Apr 21, 2025",
                    "planned": "0.14%",
                    "actual": "0.14%",
                    "overdueDays": "18",
                    "delayLog": "",
                    "status": "COMPLETED"
                },
                {
                    "id": "36ef1260d6beb0d53071c1ae",
                    "wbs": "1.5.2.3.8",
                    "title": "Explore Phase Closure and Sign-Off Phase Deliverables",
                    "type": "Task",
                    "baselineEnd": "Jan 31, 2025",
                    "plannedEnd": "Apr 18, 2025",
                    "planned": "0.06%",
                    "actual": "0.00%",
                    "overdueDays": "21",
                    "delayLog": "",
                    "status": "ON TRACK"
                }
            ]
        },
        {
            "id": "370096c0d6beb0d53071c1c0",
            "wbs": "1.5.3.1",
            "title": "MS52 : Completion of Solution Walk Through 1",
            "type": "Milestone",
            "baselineEnd": "Mar 20, 2025",
            "plannedEnd": "Apr 03, 2025",
            "planned": "7.59%",
            "actual": "7.59%",
            "overdueDays": "36",
            "delayLog": "Waiting for the last approval from one of the PQL Business Leads. Once that is done, the final approval will be initiated for Robert's Signature. Expected to close by this Friday.",
            "status": "COMPLETED",
            "children": [
                {
                    "id": "37017d38d6beb0d53071c1c1",
                    "wbs": "1.5.3.1.1",
                    "title": "Solution Configuration",
                    "type": "Task",
                    "baselineEnd": "Feb 14, 2025",
                    "plannedEnd": "Feb 03, 2025",
                    "planned": "6.05%",
                    "actual": "6.05%",
                    "overdueDays": "95",
                    "delayLog": "",
                    "status": "COMPLETED"
                },
                {
                    "id": "345fff989d74f4ebda2e656c",
                    "wbs": "1.5.3.1.2",
                    "title": "WRICEF Object Developments",
                    "type": "Task",
                    "baselineEnd": "Jan 31, 2025",
                    "plannedEnd": "Feb 24, 2025",
                    "planned": "0.19%",
                    "actual": "0.19%",
                    "overdueDays": "74",
                    "delayLog": "",
                    "status": "COMPLETED"
                },
                {
                    "id": "19052ad0a97499d8f71229a4",
                    "wbs": "1.5.3.1.3",
                    "title": "System Preparation",
                    "type": "Task",
                    "baselineEnd": "Feb 04, 2025",
                    "plannedEnd": "Jan 01, 2025",
                    "planned": "0.57%",
                    "actual": "0.57%",
                    "overdueDays": "128",
                    "delayLog": "",
                    "status": "COMPLETED"
                },
                {
                    "id": "63350b3067f1a02173b68aa6",
                    "wbs": "1.5.3.1.4",
                    "title": "Solution Walk Through 1 Preparation",
                    "type": "Task",
                    "baselineEnd": "Mar 20, 2025",
                    "plannedEnd": "Apr 01, 2025",
                    "planned": "0.52%",
                    "actual": "0.52%",
                    "overdueDays": "38",
                    "delayLog": "",
                    "status": "COMPLETED"
                },
                {
                    "id": "cc3d5880b41c06d8a06c4d7e",
                    "wbs": "1.5.3.1.5",
                    "title": "Solution Walk Through 1 (SWT 1)",
                    "type": "Task",
                    "baselineEnd": "Mar 10, 2025",
                    "plannedEnd": "Apr 03, 2025",
                    "planned": "0.24%",
                    "actual": "0.24%",
                    "overdueDays": "36",
                    "delayLog": "",
                    "status": "COMPLETED"
                }
            ]
        },
        {
            "id": "371493f0d6beb0d53071c1c3",
            "wbs": "1.5.3.2",
            "title": "MS53 : Completion of Solution Walk Through 2",
            "type": "Milestone",
            "baselineEnd": "Apr 17, 2025",
            "plannedEnd": "May 07, 2025",
            "planned": "0.65%",
            "actual": "0.54%",
            "overdueDays": "2",
            "delayLog": "All SWT 2 activities have concluded except for REFX. REFX is scheduled for May 12th due to business availability. Also, the final report is yet to be produced for PQL approval.",
            "status": "ON TRACK",
            "children": [
                {
                    "id": "2401ced8c5d7a8e32b9eb98b",
                    "wbs": "1.5.3.2.1",
                    "title": "Solution Configuration",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "Mar 14, 2025",
                    "planned": "0.00%",
                    "actual": "0.00%",
                    "overdueDays": "56",
                    "delayLog": "",
                    "status": "COMPLETED"
                },
                {
                    "id": "240b2190c5d7a8e32b9eb98c",
                    "wbs": "1.5.3.2.2",
                    "title": "WRICEF Object Developments",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "Apr 15, 2025",
                    "planned": "0.03%",
                    "actual": "0.03%",
                    "overdueDays": "24",
                    "delayLog": "",
                    "status": "COMPLETED"
                },
                {
                    "id": "24115f38c5d7a8e32b9eb98d",
                    "wbs": "1.5.3.2.3",
                    "title": "System Preparation",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "Feb 14, 2025",
                    "planned": "0.00%",
                    "actual": "0.00%",
                    "overdueDays": "84",
                    "delayLog": "",
                    "status": "COMPLETED"
                },
                {
                    "id": "37167080d6beb0d53071c1c4",
                    "wbs": "1.5.3.2.4",
                    "title": "Solution Walk Through 2 (SWT2)",
                    "type": "Task",
                    "baselineEnd": "Apr 07, 2025",
                    "plannedEnd": "May 07, 2025",
                    "planned": "0.62%",
                    "actual": "0.51%",
                    "overdueDays": "2",
                    "delayLog": "",
                    "status": "ON TRACK"
                }
            ]
        },
        {
            "id": "371850f8d6beb0d53071c1c6",
            "wbs": "1.5.3.3",
            "title": "MS54 : Completion of Solution Walk Through 3",
            "type": "Milestone",
            "baselineEnd": "May 21, 2025",
            "plannedEnd": "May 19, 2025",
            "planned": "14.86%",
            "actual": "0.00%",
            "overdueDays": "0",
            "delayLog": "",
            "status": "ON TRACK",
            "children": [
                {
                    "id": "98d73d989b8dcc7e03f17e8d",
                    "wbs": "1.5.3.3.1",
                    "title": "End to End Process Mapping",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "May 12, 2025",
                    "planned": "0.00%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "f98bf508f68434d9f5f896a8",
                    "wbs": "1.5.3.3.2",
                    "title": "Delta Configuration",
                    "type": "Task",
                    "baselineEnd": "Apr 07, 2025",
                    "plannedEnd": "May 06, 2025",
                    "planned": "7.43%",
                    "actual": "0.00%",
                    "overdueDays": "3",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "6d6ed2a03d2bd2b557f03de2",
                    "wbs": "1.5.3.3.3",
                    "title": "WRICEF Development Object",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "May 07, 2025",
                    "planned": "0.00%",
                    "actual": "0.00%",
                    "overdueDays": "2",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "371923e8d6beb0d53071c1c7",
                    "wbs": "1.5.3.3.4",
                    "title": "Solution Walk Through 3",
                    "type": "Task",
                    "baselineEnd": "Apr 28, 2025",
                    "plannedEnd": "May 19, 2025",
                    "planned": "7.43%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                }
            ]
        },
        {
            "id": "371ad198d6beb0d53071c1c9",
            "wbs": "1.5.3.4",
            "title": "MS55 : Completion of System Integration Test 1",
            "type": "Milestone",
            "baselineEnd": "Apr 18, 2025",
            "plannedEnd": "May 15, 2025",
            "planned": "0.28%",
            "actual": "0.28%",
            "overdueDays": "0",
            "delayLog": "Based on the revised proposed plan, the baseline of the project would changed",
            "status": "ON TRACK",
            "children": [
                {
                    "id": "2c1b34c03c89498759645464",
                    "wbs": "1.5.3.4.1",
                    "title": "Execution of QA Testing & Resting",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "May 08, 2025",
                    "planned": "0.28%",
                    "actual": "0.28%",
                    "overdueDays": "1",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "bc042e58b15dda11fb2243b8",
                    "wbs": "1.5.3.4.2",
                    "title": "Test Prepareparation for SIT 1",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "Mar 14, 2025",
                    "planned": "0.00%",
                    "actual": "0.00%",
                    "overdueDays": "56",
                    "delayLog": "",
                    "status": "COMPLETED"
                },
                {
                    "id": "bc2b7508b15dda11fb2243bf",
                    "wbs": "1.5.3.4.3",
                    "title": "Perform System Integration testing - 2",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "May 09, 2025",
                    "planned": "0.00%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "bc38abd8b15dda11fb2243c6",
                    "wbs": "1.5.3.4.4",
                    "title": "Defect Resolution - System Integration Testing - 1",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "May 09, 2025",
                    "planned": "0.00%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "8005bb684a96f70f14ffb1b8",
                    "wbs": "1.5.3.4.5",
                    "title": "SIT 1 Sign-off",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "May 15, 2025",
                    "planned": "0.00%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                }
            ]
        },
        {
            "id": "371d5620d6beb0d53071c1cc",
            "wbs": "1.5.3.5",
            "title": "MS56 : Completion of System Integration Test 2",
            "type": "Milestone",
            "baselineEnd": "May 28, 2025",
            "plannedEnd": "Jun 02, 2025",
            "planned": "4.89%",
            "actual": "0.00%",
            "overdueDays": "0",
            "delayLog": "",
            "status": "ON TRACK",
            "children": [
                {
                    "id": "81345878077878bf2579bdf4",
                    "wbs": "1.5.3.5.1",
                    "title": "Test Preparation for SIT 2",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "May 02, 2025",
                    "planned": "0.49%",
                    "actual": "0.00%",
                    "overdueDays": "7",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "815ba6f8077878bf2579bdfa",
                    "wbs": "1.5.3.5.2",
                    "title": "Perform System Integration Testing - 2",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "May 28, 2025",
                    "planned": "0.00%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "816ae938077878bf2579be01",
                    "wbs": "1.5.3.5.3",
                    "title": "Perfrom System Integration for SAP Validation",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "May 28, 2025",
                    "planned": "0.00%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "8170d0f0077878bf2579be05",
                    "wbs": "1.5.3.5.4",
                    "title": "Defect Resolution - System Integration testing - 2 ",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "Feb 28, 2025",
                    "planned": "0.00%",
                    "actual": "0.00%",
                    "overdueDays": "70",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "81743038077878bf2579be07",
                    "wbs": "1.5.3.5.5",
                    "title": "SIT 2 Sign-off",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "Jun 02, 2025",
                    "planned": "0.00%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "81764760077878bf2579be09",
                    "wbs": "1.5.3.5.6",
                    "title": "SIT 2 Signoff",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "May 29, 2025",
                    "planned": "0.00%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "89a5ce18400dbe00bd7d4d1e",
                    "wbs": "1.5.3.5.7",
                    "title": "MS56 : Completion of System Integration Test 2 - 2",
                    "type": "Task",
                    "baselineEnd": "May 28, 2025",
                    "plannedEnd": "May 23, 2025",
                    "planned": "4.40%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                }
            ]
        },
        {
            "id": "3727aaa8d6beb0d53071c1d7",
            "wbs": "1.5.3.6",
            "title": "MS58 : Completion of User Acceptance Testing",
            "type": "Milestone",
            "baselineEnd": "Jun 23, 2025",
            "plannedEnd": "Jun 18, 2025",
            "planned": "14.86%",
            "actual": "0.00%",
            "overdueDays": "0",
            "delayLog": "",
            "status": "ON TRACK",
            "children": [
                {
                    "id": "c361bc1859ecb63dcba81a7e",
                    "wbs": "1.5.3.6.1",
                    "title": "Prepare - User Acceptance Testing",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "May 28, 2025",
                    "planned": "0.00%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "372879b0d6beb0d53071c1d8",
                    "wbs": "1.5.3.6.2",
                    "title": "Test Execution (UAT)",
                    "type": "Task",
                    "baselineEnd": "Jun 23, 2025",
                    "plannedEnd": "Jun 18, 2025",
                    "planned": "14.86%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                }
            ]
        },
        {
            "id": "601517f0b15dda11fb22b1fd",
            "wbs": "1.5.3.7",
            "title": "Prepare - User Acceptance Testing",
            "type": "Milestone",
            "baselineEnd": "",
            "plannedEnd": "Jun 02, 2025",
            "planned": "0.00%",
            "actual": "0.00%",
            "overdueDays": "0",
            "delayLog": "",
            "status": "ON TRACK",
            "children": [
                {
                    "id": "601b8c48b15dda11fb22b1fe",
                    "wbs": "1.5.3.7.1",
                    "title": "Prepare User Acceptance Testing Plan",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "May 26, 2025",
                    "planned": "0.00%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "60229510b15dda11fb22b1ff",
                    "wbs": "1.5.3.7.2",
                    "title": "Publish the UAT Plan",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "Jun 02, 2025",
                    "planned": "0.00%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "60260010b15dda11fb22b200",
                    "wbs": "1.5.3.7.3",
                    "title": "UAT participants list to be confirmed by PQL-WSLs",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "Jun 02, 2025",
                    "planned": "0.00%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "6028bb48b15dda11fb22b201",
                    "wbs": "1.5.3.7.4",
                    "title": "Schedule calendar Invite as per the Training Plan",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "Jun 02, 2025",
                    "planned": "0.00%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "602e3d70b15dda11fb22b202",
                    "wbs": "1.5.3.7.5",
                    "title": "Alignment with PQL team on UAT Plan",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "Jun 02, 2025",
                    "planned": "0.00%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "60310460b15dda11fb22b203",
                    "wbs": "1.5.3.7.6",
                    "title": "Setup Motiva Users in qTest",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "Jun 02, 2025",
                    "planned": "0.00%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "603409d0b15dda11fb22b204",
                    "wbs": "1.5.3.7.7",
                    "title": "Produce Test Scripts",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "Jun 02, 2025",
                    "planned": "0.00%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "6036b568b15dda11fb22b205",
                    "wbs": "1.5.3.7.8",
                    "title": "Produce test scripts for all the UAT Test Cases",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "Jun 02, 2025",
                    "planned": "0.00%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "60386700b15dda11fb22b206",
                    "wbs": "1.5.3.7.9",
                    "title": "Delivery the UAT Test Scripts",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "Jun 02, 2025",
                    "planned": "0.00%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "603a08f8b15dda11fb22b207",
                    "wbs": "1.5.3.7.10",
                    "title": "System Readiness for UAT",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "Jun 02, 2025",
                    "planned": "0.00%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                }
            ]
        },
        {
            "id": "603b9768b15dda11fb22b208",
            "wbs": "1.5.3.8",
            "title": "Conduct UAT",
            "type": "Milestone",
            "baselineEnd": "",
            "plannedEnd": "Jul 22, 2025",
            "planned": "0.00%",
            "actual": "0.00%",
            "overdueDays": "0",
            "delayLog": "",
            "status": "ON TRACK",
            "children": [
                {
                    "id": "603c7228b15dda11fb22b209",
                    "wbs": "1.5.3.8.1",
                    "title": "Conduct UAT Day 1",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "Jun 03, 2025",
                    "planned": "0.00%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "603d9720b15dda11fb22b20a",
                    "wbs": "1.5.3.8.2",
                    "title": "Conduct UAT Day 2 ",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "Jun 04, 2025",
                    "planned": "0.00%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "603e75c8b15dda11fb22b20b",
                    "wbs": "1.5.3.8.3",
                    "title": "Conduct UAT Day 3",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "Jun 30, 2025",
                    "planned": "0.00%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "603f3d00b15dda11fb22b20c",
                    "wbs": "1.5.3.8.4",
                    "title": "Conduct UAT Day 4",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "Jul 01, 2025",
                    "planned": "0.00%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "60400c08b15dda11fb22b20d",
                    "wbs": "1.5.3.8.5",
                    "title": "Conduct UAT Day 5",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "Jul 02, 2025",
                    "planned": "0.00%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "60411d78b15dda11fb22b20e",
                    "wbs": "1.5.3.8.6",
                    "title": "Conduct UAT Day 6",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "Jul 03, 2025",
                    "planned": "0.00%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "6041ec80b15dda11fb22b20f",
                    "wbs": "1.5.3.8.7",
                    "title": "Conduct UAT Day 7",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "Jul 04, 2025",
                    "planned": "0.00%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "6042afd0b15dda11fb22b210",
                    "wbs": "1.5.3.8.8",
                    "title": "Conduct UAT Day 8",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "Jul 07, 2025",
                    "planned": "0.00%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "60436b50b15dda11fb22b211",
                    "wbs": "1.5.3.8.9",
                    "title": "Conduct UAT Day 8",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "Jul 08, 2025",
                    "planned": "0.00%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "604426d0b15dda11fb22b212",
                    "wbs": "1.5.3.8.10",
                    "title": "Conduct UAT Day 9",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "Jul 09, 2025",
                    "planned": "0.00%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "247ee280b15dda11fb231b5f",
                    "wbs": "1.5.3.8.11",
                    "title": "Conduct UAT Day 10",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "Jul 10, 2025",
                    "planned": "0.00%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "24804dc8b15dda11fb231b60",
                    "wbs": "1.5.3.8.12",
                    "title": "Conduct UAT Day 11",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "Jul 11, 2025",
                    "planned": "0.00%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "24815f38b15dda11fb231b61",
                    "wbs": "1.5.3.8.13",
                    "title": "Conduct UAT Day 12",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "Jul 14, 2025",
                    "planned": "0.00%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "24824d80b15dda11fb231b62",
                    "wbs": "1.5.3.8.14",
                    "title": "Conduct UAT Day 13",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "Jul 15, 2025",
                    "planned": "0.00%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "24834398b15dda11fb231b63",
                    "wbs": "1.5.3.8.15",
                    "title": "Conduct UAT Day 14",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "Jul 16, 2025",
                    "planned": "0.00%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "248439b0b15dda11fb231b64",
                    "wbs": "1.5.3.8.16",
                    "title": "Conduct UAT Day 15",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "Jul 17, 2025",
                    "planned": "0.00%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "24857de8b15dda11fb231b65",
                    "wbs": "1.5.3.8.17",
                    "title": "Conduct UAT Day 16",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "Jul 18, 2025",
                    "planned": "0.00%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "248677e8b15dda11fb231b66",
                    "wbs": "1.5.3.8.18",
                    "title": "Conduct UAT Day 17",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "Jul 21, 2025",
                    "planned": "0.00%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "24876a18b15dda11fb231b67",
                    "wbs": "1.5.3.8.19",
                    "title": "Conduct UAT Day 18",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "Jul 22, 2025",
                    "planned": "0.00%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                }
            ]
        },
        {
            "id": "372a3700d6beb0d53071c1da",
            "wbs": "1.5.3.9",
            "title": "MS59 : Completion of Realize Phase",
            "type": "Milestone",
            "baselineEnd": "Jun 29, 2025",
            "plannedEnd": "Aug 15, 2025",
            "planned": "2.49%",
            "actual": "0.82%",
            "overdueDays": "0",
            "delayLog": "",
            "status": "ON TRACK",
            "children": [
                {
                    "id": "86f22dc08013d8d30288681f",
                    "wbs": "1.5.3.9.1",
                    "title": "Execution/Monitoring of Project",
                    "type": "Task",
                    "baselineEnd": "May 27, 2025",
                    "plannedEnd": "May 30, 2025",
                    "planned": "0.16%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "9ae33b88c6f5471084b1a9a5",
                    "wbs": "1.5.3.9.2",
                    "title": "Explore Phase Extension",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "May 29, 2025",
                    "planned": "0.06%",
                    "actual": "0.02%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "174be208a153d060cdcc9264",
                    "wbs": "1.5.3.9.3",
                    "title": "Data Migration - MOCK 1",
                    "type": "Task",
                    "baselineEnd": "May 30, 2025",
                    "plannedEnd": "Apr 03, 2025",
                    "planned": "0.48%",
                    "actual": "0.48%",
                    "overdueDays": "36",
                    "delayLog": "",
                    "status": "COMPLETED"
                },
                {
                    "id": "d894b6c0818009bf5e6298e5",
                    "wbs": "1.5.3.9.4",
                    "title": "Data Migration - MOCK 2",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "May 20, 2025",
                    "planned": "0.15%",
                    "actual": "0.01%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "303cbf487c56cec5a4a40e37",
                    "wbs": "1.5.3.9.5",
                    "title": "Data Cleansing",
                    "type": "Task",
                    "baselineEnd": "Dec 02, 2024",
                    "plannedEnd": "Jun 04, 2025",
                    "planned": "0.18%",
                    "actual": "0.08%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "372e6168d6beb0d53071c1df",
                    "wbs": "1.5.3.9.6",
                    "title": "Production System Readiness",
                    "type": "Task",
                    "baselineEnd": "Apr 04, 2025",
                    "plannedEnd": "May 16, 2025",
                    "planned": "0.16%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "37307890d6beb0d53071c1e1",
                    "wbs": "1.5.3.9.7",
                    "title": "Phase Closure and Sign-Off Phase Deliverables",
                    "type": "Task",
                    "baselineEnd": "May 13, 2025",
                    "plannedEnd": "May 09, 2025",
                    "planned": "0.16%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "1263cc38f6b4c1c75dea06c1",
                    "wbs": "1.5.3.9.8",
                    "title": "Process Control",
                    "type": "Task",
                    "baselineEnd": "Jun 29, 2025",
                    "plannedEnd": "May 29, 2025",
                    "planned": "0.16%",
                    "actual": "0.05%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "86fa82908013d8d302886821",
                    "wbs": "1.5.3.9.9",
                    "title": "OCM Alignment Activities",
                    "type": "Task",
                    "baselineEnd": "Jun 29, 2025",
                    "plannedEnd": "Oct 24, 2024",
                    "planned": "0.16%",
                    "actual": "0.00%",
                    "overdueDays": "197",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "870020108013d8d302886823",
                    "wbs": "1.5.3.9.10",
                    "title": "Quality System Initial Access",
                    "type": "Task",
                    "baselineEnd": "Dec 20, 2024",
                    "plannedEnd": "Dec 20, 2024",
                    "planned": "0.03%",
                    "actual": "0.03%",
                    "overdueDays": "140",
                    "delayLog": "",
                    "status": "COMPLETED"
                },
                {
                    "id": "870582f88013d8d302886825",
                    "wbs": "1.5.3.9.11",
                    "title": "Initial Quality System Setup",
                    "type": "Task",
                    "baselineEnd": "Jan 10, 2025",
                    "plannedEnd": "Jan 10, 2025",
                    "planned": "0.14%",
                    "actual": "0.14%",
                    "overdueDays": "119",
                    "delayLog": "",
                    "status": "COMPLETED"
                },
                {
                    "id": "870a7c688013d8d302886827",
                    "wbs": "1.5.3.9.12",
                    "title": "Enablement Content Development",
                    "type": "Task",
                    "baselineEnd": "Jan 15, 2025",
                    "plannedEnd": "Jul 23, 2025",
                    "planned": "0.16%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "372b0dd8d6beb0d53071c1db",
                    "wbs": "1.5.3.9.13",
                    "title": "Enablement Delivery",
                    "type": "Task",
                    "baselineEnd": "Mar 20, 2025",
                    "plannedEnd": "Aug 15, 2025",
                    "planned": "0.16%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "372cabe8d6beb0d53071c1dd",
                    "wbs": "1.5.3.9.14",
                    "title": "Cutover Preparation",
                    "type": "Task",
                    "baselineEnd": "Apr 11, 2025",
                    "plannedEnd": "Jul 04, 2025",
                    "planned": "0.16%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "1ffb7020b82401580e94b490",
                    "wbs": "1.5.3.9.15",
                    "title": "Datamart Queries",
                    "type": "Task",
                    "baselineEnd": "Jun 29, 2025",
                    "plannedEnd": "May 27, 2025",
                    "planned": "0.16%",
                    "actual": "0.01%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                }
            ]
        },
        {
            "id": "37390be0d6beb0d53071c1eb",
            "wbs": "1.5.4.1",
            "title": "MS60 : Completion of Cutover Mock1",
            "type": "Milestone",
            "baselineEnd": "Jun 23, 2025",
            "plannedEnd": "Jul 21, 2025",
            "planned": "8.55%",
            "actual": "0.00%",
            "overdueDays": "0",
            "delayLog": "",
            "status": "ON TRACK",
            "children": [
                {
                    "id": "a93ac2484e3f65627fac816a",
                    "wbs": "1.5.4.1.1",
                    "title": "Master Data Loads",
                    "type": "Task",
                    "baselineEnd": "Jun 23, 2025",
                    "plannedEnd": "Jul 21, 2025",
                    "planned": "8.55%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                }
            ]
        },
        {
            "id": "373b84b0d6beb0d53071c1ee",
            "wbs": "1.5.4.2",
            "title": "MS61 : Completion of Cutover Mock2",
            "type": "Milestone",
            "baselineEnd": "Jul 28, 2025",
            "plannedEnd": "Jul 22, 2025",
            "planned": "8.55%",
            "actual": "0.00%",
            "overdueDays": "0",
            "delayLog": "",
            "status": "ON TRACK",
            "children": [
                {
                    "id": "aaf9b848d6ba0062b38f77ff",
                    "wbs": "1.5.4.2.1",
                    "title": "Master Data Loads",
                    "type": "Task",
                    "baselineEnd": "Jun 16, 2025",
                    "plannedEnd": "Jul 22, 2025",
                    "planned": "4.27%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "aa9fdc404e3f65627fac81ae",
                    "wbs": "1.5.4.2.2",
                    "title": "Transactional Data Loads",
                    "type": "Task",
                    "baselineEnd": "May 12, 2025",
                    "plannedEnd": "Jul 07, 2025",
                    "planned": "4.27%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                }
            ]
        },
        {
            "id": "373df998d6beb0d53071c1f1",
            "wbs": "1.5.4.3",
            "title": "MS62 : Completion of End User Training",
            "type": "Milestone",
            "baselineEnd": "Aug 18, 2025",
            "plannedEnd": "Aug 12, 2025",
            "planned": "0.00%",
            "actual": "0.00%",
            "overdueDays": "0",
            "delayLog": "",
            "status": "ON TRACK",
            "children": [
                {
                    "id": "373ecc88d6beb0d53071c1f2",
                    "wbs": "1.5.4.3.1",
                    "title": "Enablement Delivery",
                    "type": "Task",
                    "baselineEnd": "Jul 03, 2025",
                    "plannedEnd": "Aug 12, 2025",
                    "planned": "0.00%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                }
            ]
        },
        {
            "id": "3724d418d6beb0d53071c1d4",
            "wbs": "1.5.4.4",
            "title": "MS57 : Completion of Train the Training",
            "type": "Milestone",
            "baselineEnd": "Jun 09, 2025",
            "plannedEnd": "Jul 08, 2025",
            "planned": "0.00%",
            "actual": "0.00%",
            "overdueDays": "0",
            "delayLog": "",
            "status": "ON TRACK",
            "children": [
                {
                    "id": "90b901d8b62b8e04d2d1b88b",
                    "wbs": "1.5.4.4.1",
                    "title": "Development of Training content - PPT",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "Jun 27, 2025",
                    "planned": "0.00%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "90bb7aa8b62b8e04d2d1b88c",
                    "wbs": "1.5.4.4.2",
                    "title": "Development of simulations",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "Jun 30, 2025",
                    "planned": "0.00%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "90bdeba8b62b8e04d2d1b88d",
                    "wbs": "1.5.4.4.3",
                    "title": "Conduct - Train the Trainer",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "Jul 01, 2025",
                    "planned": "0.00%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "90c6e870b62b8e04d2d1b890",
                    "wbs": "1.5.4.4.4",
                    "title": "Signoff - Train the Trainer",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "Jul 08, 2025",
                    "planned": "0.00%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                }
            ]
        },
        {
            "id": "373310a0d6beb0d53071c1e4",
            "wbs": "1.5.4.5",
            "title": "MS63 : Completion of Deploy Phase",
            "type": "Milestone",
            "baselineEnd": "Aug 29, 2025",
            "plannedEnd": "Sep 29, 2025",
            "planned": "6.41%",
            "actual": "0.00%",
            "overdueDays": "0",
            "delayLog": "",
            "status": "ON TRACK",
            "children": [
                {
                    "id": "3733cc20d6beb0d53071c1e5",
                    "wbs": "1.5.4.5.1",
                    "title": "Execution/Monitoring of Project",
                    "type": "Task",
                    "baselineEnd": "Sep 01, 2025",
                    "plannedEnd": "Aug 20, 2025",
                    "planned": "2.14%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "37357db8d6beb0d53071c1e7",
                    "wbs": "1.5.4.5.2",
                    "title": "OCM Execution Activities",
                    "type": "Task",
                    "baselineEnd": "Sep 01, 2025",
                    "plannedEnd": "Aug 20, 2025",
                    "planned": "2.14%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "46d6ffc0d98f2d8dfdff597a",
                    "wbs": "1.5.4.5.3",
                    "title": "Production Cutover",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "Sep 09, 2024",
                    "planned": "0.00%",
                    "actual": "0.00%",
                    "overdueDays": "242",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "47e38dc0d98f2d8dfdff59a7",
                    "wbs": "1.5.4.5.4",
                    "title": "Communication (PM1 - Production)",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "May 06, 2025",
                    "planned": "0.00%",
                    "actual": "0.00%",
                    "overdueDays": "3",
                    "delayLog": "",
                    "status": "ON TRACK"
                },
                {
                    "id": "47f63718d98f2d8dfdff59ac",
                    "wbs": "1.5.4.5.5",
                    "title": "System Go-Live",
                    "type": "Task",
                    "baselineEnd": "",
                    "plannedEnd": "Sep 29, 2025",
                    "planned": "2.14%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                }
            ]
        },
        {
            "id": "374d2468d6beb0d53071c202",
            "wbs": "1.5.5.1",
            "title": "MS64 : Completion of Month 1",
            "type": "Milestone",
            "baselineEnd": "Sep 30, 2025",
            "plannedEnd": "Oct 27, 2025",
            "planned": "2.73%",
            "actual": "0.00%",
            "overdueDays": "0",
            "delayLog": "",
            "status": "ON TRACK",
            "children": [
                {
                    "id": "374ea338d6beb0d53071c204",
                    "wbs": "1.5.5.1.1",
                    "title": "W3_MS64_Completion of Month 1",
                    "type": "Task",
                    "baselineEnd": "Sep 30, 2025",
                    "plannedEnd": "Oct 27, 2025",
                    "planned": "2.73%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                }
            ]
        },
        {
            "id": "374f9568d6beb0d53071c205",
            "wbs": "1.5.5.2",
            "title": "MS65 : Completion of Month 2",
            "type": "Milestone",
            "baselineEnd": "Oct 30, 2025",
            "plannedEnd": "Nov 26, 2025",
            "planned": "1.82%",
            "actual": "0.00%",
            "overdueDays": "0",
            "delayLog": "",
            "status": "ON TRACK",
            "children": [
                {
                    "id": "b1d595806049f763e13d75a5",
                    "wbs": "1.5.5.2.1",
                    "title": "W3_MS65_Completion of Month 2",
                    "type": "Task",
                    "baselineEnd": "Oct 30, 2025",
                    "plannedEnd": "Nov 26, 2025",
                    "planned": "1.82%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                }
            ]
        },
        {
            "id": "b1dd36a06049f763e13d75a7",
            "wbs": "1.5.5.3",
            "title": "MS66 : Completion of Month 3",
            "type": "Milestone",
            "baselineEnd": "Nov 28, 2025",
            "plannedEnd": "Dec 24, 2025",
            "planned": "1.82%",
            "actual": "0.00%",
            "overdueDays": "0",
            "delayLog": "",
            "status": "ON TRACK",
            "children": [
                {
                    "id": "b1df84786049f763e13d75a8",
                    "wbs": "1.5.5.3.1",
                    "title": "W3_MS66_Completion of Month 3",
                    "type": "Task",
                    "baselineEnd": "Nov 28, 2025",
                    "plannedEnd": "Dec 24, 2025",
                    "planned": "1.82%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                }
            ]
        },
        {
            "id": "b1e3f9186049f763e13d75aa",
            "wbs": "1.5.5.4",
            "title": "MS67 : Completion of Month 4",
            "type": "Milestone",
            "baselineEnd": "Dec 31, 2025",
            "plannedEnd": "Dec 19, 2025",
            "planned": "1.82%",
            "actual": "0.00%",
            "overdueDays": "0",
            "delayLog": "",
            "status": "ON TRACK",
            "children": [
                {
                    "id": "37506858d6beb0d53071c206",
                    "wbs": "1.5.5.4.1",
                    "title": "W3_MS67_Completion of Month 4",
                    "type": "Task",
                    "baselineEnd": "Dec 31, 2025",
                    "plannedEnd": "Dec 19, 2025",
                    "planned": "1.82%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                }
            ]
        },
        {
            "id": "b1ea4a486049f763e13d75ab",
            "wbs": "1.5.5.5",
            "title": "MS68 : Completion of Month 5",
            "type": "Milestone",
            "baselineEnd": "Jan 30, 2026",
            "plannedEnd": "Jan 19, 2026",
            "planned": "0.91%",
            "actual": "0.00%",
            "overdueDays": "0",
            "delayLog": "",
            "status": "ON TRACK",
            "children": [
                {
                    "id": "b1ecbb486049f763e13d75ac",
                    "wbs": "1.5.5.5.1",
                    "title": "W3_MS68_Completion of Month 5",
                    "type": "Task",
                    "baselineEnd": "Jan 30, 2026",
                    "plannedEnd": "Jan 19, 2026",
                    "planned": "0.91%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                }
            ]
        },
        {
            "id": "37521dd8d6beb0d53071c208",
            "wbs": "1.5.5.6",
            "title": "MS69 : Completion of Month 6",
            "type": "Milestone",
            "baselineEnd": "Feb 27, 2026",
            "plannedEnd": "Feb 17, 2026",
            "planned": "0.91%",
            "actual": "0.00%",
            "overdueDays": "0",
            "delayLog": "",
            "status": "ON TRACK",
            "children": [
                {
                    "id": "3752ece0d6beb0d53071c209",
                    "wbs": "1.5.5.6.1",
                    "title": "W3_MS69_Completion of Month 6",
                    "type": "Task",
                    "baselineEnd": "Feb 27, 2026",
                    "plannedEnd": "Feb 17, 2026",
                    "planned": "0.91%",
                    "actual": "0.00%",
                    "overdueDays": "0",
                    "delayLog": "",
                    "status": "ON TRACK"
                }
            ]
        }
    ];

    // Extract unique filter options
    const getUniqueOptions = (field) => {
        const getAllValues = (tasks) => {
            let values = [];
            tasks.forEach(task => {
                values.push(task[field]);
                if (task.children && task.children.length > 0) {
                    values = [...values, ...getAllValues(task.children)];
                }
            });
            return values;
        };

        const uniqueValues = [...new Set(getAllValues(milestoneData))];
        return uniqueValues.filter(value => value).sort();
    };

    // Create filter options
    const filterOptions = {
        type: getUniqueOptions('type'),
        baselineEnd: ['Apr 2025', 'May 2025', 'Jun 2025'],
        plannedEnd: ['Apr 2025', 'May 2025', 'Jun 2025'],
        planned: ['0-25%', '26-50%', '51-75%', '76-100%'],    // Renamed from progress
        actual: ['0-25%', '26-50%', '51-75%', '76-100%'],     // Added new filter
        slackDays: ['Negative', 'Zero', 'Positive'],
        baselineVariance: ['None', '1-3 days', '4+ days', 'Ahead of Baseline'],
        overdueDays: ['None', '1-3 days', '4+ days']
    };

    // Filter the tasks based on selected filters
    const filterTasks = (tasks) => {
        const isTaskFiltered = (task) => {
            // Check if task passes all filters
            for (const [category, values] of Object.entries(filters)) {
                if (values.length === 0) continue; // Skip if no filter for this category

                if (category === 'planned') {
                    const plannedValue = parseInt(task.planned);
                    let matchesAny = false;

                    for (const range of values) {
                        if (range === '0-25%' && plannedValue <= 25) matchesAny = true;
                        else if (range === '26-50%' && plannedValue > 25 && plannedValue <= 50) matchesAny = true;
                        else if (range === '51-75%' && plannedValue > 50 && plannedValue <= 75) matchesAny = true;
                        else if (range === '76-100%' && plannedValue > 75) matchesAny = true;
                    }

                    if (!matchesAny) return false;
                }
                else if (category === 'actual') {
                    const actualValue = parseInt(task.actual);
                    let matchesAny = false;

                    for (const range of values) {
                        if (range === '0-25%' && actualValue <= 25) matchesAny = true;
                        else if (range === '26-50%' && actualValue > 25 && actualValue <= 50) matchesAny = true;
                        else if (range === '51-75%' && actualValue > 50 && actualValue <= 75) matchesAny = true;
                        else if (range === '76-100%' && actualValue > 75) matchesAny = true;
                    }

                    if (!matchesAny) return false;
                }
                if (category === 'progress') {
                    const progressValue = parseInt(task.progress);
                    let matchesAny = false;

                    for (const range of values) {
                        if (range === '0-25%' && progressValue <= 25) matchesAny = true;
                        else if (range === '26-50%' && progressValue > 25 && progressValue <= 50) matchesAny = true;
                        else if (range === '51-75%' && progressValue > 50 && progressValue <= 75) matchesAny = true;
                        else if (range === '76-100%' && progressValue > 75) matchesAny = true;
                    }

                    if (!matchesAny) return false;
                }
                else if (category === 'slackDays') {
                    const slackValue = parseInt(task.slackDays);
                    let matchesAny = false;

                    for (const range of values) {
                        if (range === 'Negative' && slackValue < 0) matchesAny = true;
                        else if (range === 'Zero' && slackValue === 0) matchesAny = true;
                        else if (range === 'Positive' && slackValue > 0) matchesAny = true;
                    }

                    if (!matchesAny) return false;
                }
                else if (category === 'baselineVariance') {
                    const varianceText = task.baselineVariance;
                    const isAhead = varianceText.includes('-');
                    const days = parseInt(varianceText);
                    let matchesAny = false;

                    for (const range of values) {
                        if (range === 'None' && days === 0) matchesAny = true;
                        else if (range === '1-3 days' && !isAhead && days > 0 && days <= 3) matchesAny = true;
                        else if (range === '4+ days' && !isAhead && days > 3) matchesAny = true;
                        else if (range === 'Ahead of Baseline' && isAhead) matchesAny = true;
                    }

                    if (!matchesAny) return false;
                }
                else if (category === 'overdueDays') {
                    const overdueValue = parseInt(task.overdueDays);
                    let matchesAny = false;

                    for (const range of values) {
                        if (range === 'None' && overdueValue === 0) matchesAny = true;
                        else if (range === '1-3 days' && overdueValue > 0 && overdueValue <= 3) matchesAny = true;
                        else if (range === '4+ days' && overdueValue > 3) matchesAny = true;
                    }

                    if (!matchesAny) return false;
                }
                else if (category === 'type' && !values.includes(task[category])) {
                    return false;
                }
                else if ((category === 'baselineEnd' || category === 'plannedEnd') &&
                    !values.some(month => task[category].includes(month))) {
                    return false;
                }
            }

            return true;
        };

        // Apply filters to each task and its children
        return tasks.map(task => {
            const passes = isTaskFiltered(task);

            // If task has children, filter them too
            let filteredChildren = [];
            if (task.children && task.children.length > 0) {
                filteredChildren = task.children.filter(isTaskFiltered);
            }

            // Include the task if it passes filters or if any children pass
            return {
                ...task,
                visible: passes || filteredChildren.length > 0,
                children: filteredChildren
            };
        }).filter(task => task.visible);
    };

    // Apply filters to the data
    const filteredData = filterTasks(milestoneData);

    // Recursive function to render task rows
    const renderTaskRow = (task, depth = 0) => {
        const hasChildren = task.children && task.children.length > 0;
        const isExpanded = expandedRows[task.id];
        const indentPadding = depth * 12; // 12px per level of depth
        const isOverdue = parseInt(task.overdueDays) > 0;
        const slackStatus = parseInt(task.slackDays) < 0 ? 'negative' :
            parseInt(task.slackDays) === 0 ? 'zero' : 'positive';

        return (
            <React.Fragment key={task.id}>
                <tr className={`border-b ${isOverdue ? 'bg-red-50' : ''}`}>
                    <td className="p-2 text-center whitespace-nowrap text-xs text-gray-600">
                        {task.wbs}
                    </td>
                    <td className="p-2 whitespace-nowrap">
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
                    {/* <td className="p-2 text-center whitespace-nowrap">
                        <span className="px-2 py-1 rounded-full bg-gray-100 text-xs text-gray-700">{task.type}</span>
                    </td> */}
                    <td className="p-2 text-center whitespace-nowrap text-xs">{task.baselineEnd}</td>
                    <td className="p-2 text-center whitespace-nowrap text-xs">{task.plannedEnd}</td>
                    <td className="p-2 text-center whitespace-nowrap text-xs">
                        <div className="flex justify-center items-center">
                            <span>{task.planned}</span>
                        </div>
                    </td>
                    <td className="p-2 text-center whitespace-nowrap text-xs">{task.actual}</td>
                    {/* <td className="p-2 text-center whitespace-nowrap text-xs">
                        <span className={`font-medium ${slackStatus === 'negative' ? 'text-red-600' :
                            slackStatus === 'zero' ? 'text-yellow-600' : 'text-green-600'
                            }`}>{task.slackDays}</span>
                    </td> */}
                    {/* <td className="p-2 text-center whitespace-nowrap text-xs">
                        <span className={`font-medium ${task.baselineVariance.includes('-') ? 'text-green-600' : (task.baselineVariance === '0 days' ? 'text-gray-600' : 'text-orange-600')}`}>
                            {task.baselineVariance}
                        </span>
                    </td> */}
                    {/* <td className="p-2 text-center whitespace-nowrap text-xs">
                        <span className={`font-medium ${parseInt(task.overdueDays) > 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {task.overdueDays}
                        </span>
                    </td> */}
                    <td className="p-2 whitespace-normal text-xs">
                        <span className="text-gray-600">{task.delayLog}</span>
                    </td>
                </tr>
                {hasChildren && isExpanded && task.children.map(child => renderTaskRow(child, depth + 1))}
            </React.Fragment>
        );
    };

    // Expanded Filter Panel for fullscreen mode
    const ExpandedFilterPanel = ({ category, label, options }) => {
        const hasFilters = filters[category].length > 0;

        return (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm w-40">
                <div className="bg-gray-50 px-1.5 py-0.5 border-b flex justify-between items-center">
                    <div className="font-medium text-xs text-gray-700 flex items-center truncate">
                        <FunnelIcon className={`h-2.5 w-2.5 mr-0.5 flex-shrink-0 ${hasFilters ? 'text-blue-500' : 'text-gray-400'}`} />
                        <span className="truncate">{label}</span>
                        {hasFilters && (
                            <span className="ml-1 bg-blue-100 text-blue-800 rounded-full px-1 text-xs font-medium flex-shrink-0">
                                {filters[category].length}
                            </span>
                        )}
                    </div>
                    {hasFilters && (
                        <button
                            className="text-xs text-blue-600 hover:text-blue-800 ml-1 flex-shrink-0"
                            onClick={(e) => {
                                e.stopPropagation();
                                clearFilters(category);
                            }}
                        >
                            ×
                        </button>
                    )}
                </div>
                <div className="max-h-36 overflow-y-auto">
                    {options.length > 0 ? (
                        options.map(option => (
                            <div
                                key={option}
                                className={`flex items-center px-1.5 py-0.5 text-xs cursor-pointer hover:bg-gray-100 border-b border-gray-100 last:border-b-0 ${filters[category].includes(option) ? 'bg-blue-50' : ''
                                    }`}
                                onClick={() => toggleFilter(category, option)}
                            >
                                <div className={`w-2.5 h-2.5 mr-1 border rounded flex items-center justify-center flex-shrink-0 ${filters[category].includes(option) ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                                    }`}>
                                    {filters[category].includes(option) && (
                                        <CheckIcon className="h-1.5 w-1.5 text-white" />
                                    )}
                                </div>
                                <span className="truncate text-[10px]">{option}</span>
                            </div>
                        ))
                    ) : (
                        <div className="px-1.5 py-1 text-[10px] text-gray-500 text-center">No options</div>
                    )}
                </div>
            </div>
        );
    };

    // Compact Filter Dropdown for normal mode
    const CompactFilterDropdown = ({ category, label, options }) => {
        console.log(category, filters)
        const hasFilters = filters[category].length > 0;

        return (
            <Menu as="div" className="relative inline-block text-left">
                <Menu.Button
                    className={`flex items-center justify-between px-3 py-2 text-xs rounded-md border ${hasFilters ? 'bg-blue-50 border-blue-300 text-blue-700' : 'bg-white border-gray-300 text-gray-700'
                        }`}
                >
                    <div className="flex items-center">
                        <FunnelIcon className={`h-3.5 w-3.5 mr-1.5 ${hasFilters ? 'text-blue-500' : 'text-gray-400'}`} />
                        <span>{label}</span>
                        {hasFilters && (
                            <span className="ml-1.5 bg-blue-100 text-blue-800 rounded-full px-1.5 py-0.5 text-xs font-medium">
                                {filters[category].length}
                            </span>
                        )}
                    </div>
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
                    <Menu.Items className="absolute left-0 z-50 mt-1 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1 border-b flex justify-between items-center px-3">
                            <div className="text-xs font-medium text-gray-700">Filter by {label}</div>
                            {hasFilters && (
                                <button
                                    className="text-xs text-blue-600 hover:text-blue-800"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        clearFilters(category);
                                    }}
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                        <div className="max-h-60 overflow-y-auto p-1">
                            {options.map(option => (
                                <Menu.Item key={option}>
                                    {() => (
                                        <div
                                            className={`flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${filters[category].includes(option) ? 'bg-blue-50' : ''
                                                }`}
                                            onClick={() => toggleFilter(category, option)}
                                        >
                                            <div className={`w-4 h-4 mr-2 border rounded flex items-center justify-center ${filters[category].includes(option) ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                                                }`}>
                                                {filters[category].includes(option) && (
                                                    <CheckIcon className="h-3 w-3 text-white" />
                                                )}
                                            </div>
                                            <span className="truncate">{option}</span>
                                        </div>
                                    )}
                                </Menu.Item>
                            ))}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        );
    };

    // Helper function to get status color
    const getStatusColor = (status) => {
        switch (status) {
            case 'DELAYED':
                return 'text-red-700';
            case 'AT RISK':
                return 'text-amber-600';
            case 'ON TRACK':
                return 'text-green-600';
            default:
                return 'text-gray-600';
        }
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
                    <div className={`flex min-h-full ${isFullScreen ? 'p-0' : 'p-4'} items-start justify-center`}>
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
                                className={`transform overflow-hidden bg-white shadow-xl transition-all ${isFullScreen
                                    ? 'fixed inset-0 rounded-none'
                                    : 'w-full max-w-5xl rounded-lg p-4'
                                    }`}
                            >
                                <div className={`flex justify-between items-center ${isFullScreen ? 'p-4' : 'mb-4'}`}>
                                    <Dialog.Title as="h3" className="text-md font-semibold text-gray-900">
                                        Milestone Adherence Details
                                    </Dialog.Title>

                                    <div className="flex items-center space-x-2">
                                        <button
                                            type="button"
                                            onClick={toggleFullScreen}
                                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            title={isFullScreen ? "Exit full screen" : "Full screen"}
                                        >
                                            {isFullScreen ? (
                                                <ArrowsPointingInIcon className="h-4 w-6" aria-hidden="true" />
                                            ) : (
                                                <ArrowsPointingOutIcon className="h-4 w-6" aria-hidden="true" />
                                            )}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={closeModal}
                                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            title="Close"
                                        >
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>

                                <div className={`${isFullScreen ? 'p-6' : ''}`}>
                                    <div className="mb-4">
                                        <p className="text-sm text-gray-600">
                                            Measures how many milestones have been completed on or before their planned end dates.
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            (Milestones completed on time ÷ Total milestones due to date) × 100
                                        </p>
                                    </div>

                                    <div className="mb-4 grid grid-cols-3 gap-4">
                                        <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                                            <div className="text-2xl font-bold text-green-600 mb-1">17</div>
                                            <div className="text-xs text-gray-700">Completed Milestones</div>
                                        </div>
                                        <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
                                            <div className="text-2xl font-bold text-amber-600 mb-1">5</div>
                                            <div className="text-xs text-gray-700">At Risk Milestones</div>
                                        </div>
                                        <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                                            <div className="text-2xl font-bold text-red-600 mb-1">3</div>
                                            <div className="text-xs text-gray-700">Overdue Milestones</div>
                                        </div>
                                    </div>

                                    <div className="mb-4 flex justify-between">
                                        <div></div> {/* Empty div to maintain flex spacing */}

                                        <div className="flex items-center space-x-2">
                                            {Object.values(filters).some(arr => arr.length > 0) && (
                                                <button
                                                    className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
                                                    onClick={() => {
                                                        setFilters({
                                                            type: [],
                                                            baselineEnd: [],
                                                            plannedEnd: [],
                                                            planned: [],      // Renamed from progress
                                                            actual: [],       // Added new filter
                                                            slackDays: [],
                                                            baselineVariance: [],
                                                            overdueDays: []
                                                        });
                                                    }}
                                                >
                                                    <XCircleIcon className="h-4 w-4 mr-1" />
                                                    Clear All Filters
                                                </button>
                                            )}

                                            <button
                                                className="ml-3 text-xs text-gray-600 hover:text-gray-800 flex items-center border border-gray-300 rounded-md px-3 py-1.5"
                                                onClick={() => setShowSlicers(!showSlicers)}
                                            >
                                                {showSlicers ? (
                                                    <>
                                                        <EyeSlashIcon className="h-4 w-4 mr-1.5" />
                                                        Hide Filters
                                                    </>
                                                ) : (
                                                    <>
                                                        <EyeIcon className="h-4 w-4 mr-1.5" />
                                                        Show Filters
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Filter UI - Changes based on screen mode */}
                                    {showSlicers && (
                                        isFullScreen ? (
                                            // Expanded filter panels for full screen mode
                                            <div className="flex flex-wrap gap-3 mb-3">
                                                <ExpandedFilterPanel
                                                    category="type"
                                                    label="Type"
                                                    options={filterOptions.type}
                                                />
                                                <ExpandedFilterPanel
                                                    category="baselineEnd"
                                                    label="Baseline End"
                                                    options={filterOptions.baselineEnd}
                                                />
                                                <ExpandedFilterPanel
                                                    category="plannedEnd"
                                                    label="Planned End"
                                                    options={filterOptions.plannedEnd}
                                                />
                                                {/* <ExpandedFilterPanel
                                                    category="progress"
                                                    label="Progress"
                                                    options={filterOptions.progress}
                                                /> */}
                                                <ExpandedFilterPanel
                                                    category="slackDays"
                                                    label="Slack Days"
                                                    options={filterOptions.slackDays}
                                                />
                                                <ExpandedFilterPanel
                                                    category="baselineVariance"
                                                    label="Baseline Variance"
                                                    options={filterOptions.baselineVariance}
                                                />
                                                <ExpandedFilterPanel
                                                    category="overdueDays"
                                                    label="Overdue Days"
                                                    options={filterOptions.overdueDays}
                                                />
                                                <ExpandedFilterPanel
                                                    category="planned"
                                                    label="Planned %"
                                                    options={filterOptions.planned}
                                                />
                                                <ExpandedFilterPanel
                                                    category="actual"
                                                    label="Actual %"
                                                    options={filterOptions.actual}
                                                />
                                            </div>
                                        ) : (
                                            // Compact dropdowns for normal mode
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                <CompactFilterDropdown
                                                    category="type"
                                                    label="Type"
                                                    options={filterOptions.type}
                                                />
                                                <CompactFilterDropdown
                                                    category="baselineEnd"
                                                    label="Baseline End"
                                                    options={filterOptions.baselineEnd}
                                                />
                                                <CompactFilterDropdown
                                                    category="plannedEnd"
                                                    label="Planned End"
                                                    options={filterOptions.plannedEnd}
                                                />
                                                {/* <CompactFilterDropdown
                                                    category="progress"
                                                    label="Progress"
                                                    options={filterOptions.progress}
                                                /> */}
                                                <CompactFilterDropdown
                                                    category="slackDays"
                                                    label="Slack Days"
                                                    options={filterOptions.slackDays}
                                                />
                                                <CompactFilterDropdown
                                                    category="baselineVariance"
                                                    label="Baseline Variance"
                                                    options={filterOptions.baselineVariance}
                                                />
                                                <CompactFilterDropdown
                                                    category="overdueDays"
                                                    label="Overdue Days"
                                                    options={filterOptions.overdueDays}
                                                />
                                                <CompactFilterDropdown
                                                    category="planned"
                                                    label="Planned %"
                                                    options={filterOptions.planned}
                                                />
                                                <CompactFilterDropdown
                                                    category="actual"
                                                    label="Actual %"
                                                    options={filterOptions.actual}
                                                />
                                            </div>
                                        )
                                    )}

                                    {/* Results count */}
                                    <div className="mb-2 text-xs text-gray-500">
                                        Showing {filteredData.length} of {milestoneData.length} milestones
                                    </div>

                                    <div className="border rounded-lg overflow-hidden" style={{ minHeight: '300px' }}>
                                        <div style={{
                                            height: isFullScreen ? 'calc(100vh - 380px)' : '50vh',
                                            minHeight: '300px',
                                            maxHeight: isFullScreen ? 'calc(100vh - 380px)' : '50vh',
                                            overflowY: 'auto',
                                            overflowX: 'auto'
                                        }}>
                                            <table className="min-w-full divide-y divide-gray-200" style={{ minWidth: '1000px' }}>
                                                <thead className="bg-gray-50 sticky top-0 z-10">
                                                    <tr>
                                                        <th scope="col" className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap" style={{ minWidth: '80px', width: '80px' }}>
                                                            WBS
                                                        </th>
                                                        <th scope="col" className="p-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap" style={{ minWidth: '400px', width: '400px' }}>
                                                            Title
                                                        </th>
                                                        {/* <th scope="col" className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                    </th> */}
                                                        <th scope="col" className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap" style={{ minWidth: '120px', width: '120px' }}>
                                                            Baseline End
                                                        </th>
                                                        <th scope="col" className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap" style={{ minWidth: '120px', width: '120px' }}>
                                                            Planned End
                                                        </th>
                                                        <th scope="col" className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap" style={{ minWidth: '100px', width: '100px' }}>
                                                            Planned %
                                                        </th>
                                                        <th scope="col" className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap" style={{ minWidth: '100px', width: '100px' }}>
                                                            Actual %
                                                        </th>
                                                        {/* <th scope="col" className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Slack Days
                    </th> */}
                                                        {/* <th scope="col" className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Baseline Variance
                    </th> */}
                                                        {/* <th scope="col" className="p-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Overdue Days
                    </th> */}
                                                        <th scope="col" className="p-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{ minWidth: '150px', width: 'auto' }}>
                                                            Delay Log
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {filteredData.length > 0 ? (
                                                        filteredData.map(task => renderTaskRow(task))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="7" className="p-6 text-center text-gray-500">
                                                                No milestones match the current filters. Try adjusting your filters.
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex flex-wrap gap-3">
                                        <div className="flex items-center text-xs text-gray-500">
                                            <div className="w-3 h-3 bg-red-50 rounded mr-1 border border-gray-200"></div>
                                            <span>Overdue Tasks</span>
                                        </div>
                                        <div className="flex items-center text-xs text-gray-500">
                                            <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                                            <span>On Track</span>
                                        </div>
                                        <div className="flex items-center text-xs text-gray-500">
                                            <div className="w-3 h-3 rounded-full bg-amber-500 mr-1"></div>
                                            <span>At Risk</span>
                                        </div>
                                        <div className="flex items-center text-xs text-gray-500">
                                            <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                                            <span>Delayed</span>
                                        </div>
                                        {/* <div className="flex items-center text-xs text-gray-500">
                                            <div className="h-3 w-3 text-amber-500 mr-1 flex items-center justify-center">
                                                <LightBulbIcon className="h-3 w-3" />
                                            </div>
                                            <span>AI-Generated Insights</span>
                                        </div> */}
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

// Usage in your Milestone Adherence Rate Card
const MilestoneAdherenceCard = () => {
    const [showDrilldown, setShowDrilldown] = useState(false);

    return (
        <div className="bg-white rounded-lg shadow p-5 border-t-4 border-orange-500">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-medium text-gray-700">Milestone Adherence Rate</h3>
                    {/* <div className="text-xs text-gray-500 flex items-center">
                        <span>HIGH PRIORITY</span>
                    </div> */}
                </div>
                <div className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded flex items-center">
                    At Risk
                </div>
            </div>

            {/* Simplified progress circle */}
            <div className="flex justify-center mb-2">
                <div className="w-32 h-32 rounded-full border-8 border-red-500 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-gray-800">0%</span>
                    <span className="text-xs text-gray-500">Completed on time</span>
                </div>
            </div>

            {/* <div className="flex justify-between text-xs text-gray-500">
                <span>Threshold: 80%</span>
            </div> */}

            <div className="mt-4 text-sm">
                <div className="flex justify-between items-center text-gray-600">
                    <span>Completed Milestones</span>
                    <span className="font-medium">1/21</span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                    <span>Next Milestone</span>
                    <span className="font-medium text-red-600">Solution Design Documentation</span>
                </div>
            </div>

            <div className="mt-3 pt-3 border-t flex justify-between items-center text-xs">
                <div className="flex items-center text-gray-500">
                    <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
                    <span>6 Milestones at risk</span>
                </div>
                <button
                    onClick={() => setShowDrilldown(true)}
                    className="text-blue-600 hover:underline focus:outline-none"
                >
                    Details
                </button>
            </div>

            {/* Drilldown Modal */}
            <MilestoneAdherenceDrilldownModal
                isOpen={showDrilldown}
                closeModal={() => setShowDrilldown(false)}
            />
        </div>
    );
};

export default MilestoneAdherenceCard;