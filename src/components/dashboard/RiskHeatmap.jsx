import React, { useState } from 'react';
import RiskModal from './RiskModal';

const RiskHeatmap = () => {
    // Sample data for risk heatmap
    const riskData = {
        "totals": {
            "high": 4,
            "medium": 3,
            "low": 0,
            "all": 7
        },
        "cells": [
            {
                "impact": "high",
                "probability": "low",
                "count": 3,
                "risks": [
                    {
                        "title": "W3 -Syniti Tool implementation ",
                        "status": "Closed",
                        "impactScore": "High",
                        "responsiblePerson": "Daniel Zambrano",
                        "createdBy": "Vengateshwararaja S",
                        "plannedTo": "2024-07-31",
                        "id": "risk-2"
                    },
                    {
                        "title": "W3 - Stakeholder Change",
                        "status": "Closed",
                        "impactScore": "High",
                        "responsiblePerson": "Ben Rubio",
                        "createdBy": "Vengateshwararaja S",
                        "plannedTo": "2024-07-31",
                        "id": "risk-5"
                    },
                    {
                        "title": "System access Delay",
                        "status": "Closed",
                        "impactScore": "High",
                        "responsiblePerson": "Daniel Zambrano",
                        "createdBy": "Vengateshwararaja S",
                        "plannedTo": "2024-07-31",
                        "id": "risk-6"
                    }
                ]
            },
            {
                "impact": "high",
                "probability": "medium",
                "count": 0,
                "risks": []
            },
            {
                "impact": "high",
                "probability": "high",
                "count": 1,
                "risks": [
                    {
                        "title": "Equipment Master data Cleansing ",
                        "status": "In-Process",
                        "impactScore": "High",
                        "responsiblePerson": "Amir Khan",
                        "createdBy": "Vengateshwararaja S",
                        "plannedTo": "2024-09-16",
                        "id": "risk-7"
                    }
                ]
            },
            {
                "impact": "medium",
                "probability": "low",
                "count": 3,
                "risks": [
                    {
                        "title": "W3 - Prepare Phase closure ",
                        "status": "Closed",
                        "impactScore": "Medium",
                        "responsiblePerson": "Vengateshwararaja S",
                        "createdBy": "Vengateshwararaja S",
                        "plannedTo": "2024-06-24",
                        "id": "risk-1"
                    },
                    {
                        "title": "W3 - Pilog Onboarding ",
                        "status": "Closed",
                        "impactScore": "Medium",
                        "responsiblePerson": "Baburaj Parakkal",
                        "createdBy": "Vengateshwararaja S",
                        "plannedTo": "2024-07-22",
                        "id": "risk-3"
                    },
                    {
                        "title": "W3 - MDG - Customer Master data",
                        "status": "Closed",
                        "impactScore": "Medium",
                        "responsiblePerson": "Vengateshwararaja S",
                        "createdBy": "Vengateshwararaja S",
                        "plannedTo": "2024-07-31",
                        "id": "risk-4"
                    }
                ]
            },
            {
                "impact": "medium",
                "probability": "medium",
                "count": 0,
                "risks": []
            },
            {
                "impact": "medium",
                "probability": "high",
                "count": 0,
                "risks": []
            },
            {
                "impact": "low",
                "probability": "low",
                "count": 0,
                "risks": []
            },
            {
                "impact": "low",
                "probability": "medium",
                "count": 0,
                "risks": []
            },
            {
                "impact": "low",
                "probability": "high",
                "count": 0,
                "risks": []
            }
        ]
    }

    // State for modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRisks, setSelectedRisks] = useState([]);
    const [modalTitle, setModalTitle] = useState('');

    // Helper function to get cell color based on impact and probability
    const getCellColor = (impact, probability) => {
        if (impact === 'high' && probability === 'high') return 'bg-red-600';
        if (impact === 'high' && probability === 'medium') return 'bg-red-500';
        if (impact === 'high' && probability === 'low') return 'bg-yellow-400';
        if (impact === 'medium' && probability === 'high') return 'bg-red-500';
        if (impact === 'medium' && probability === 'medium') return 'bg-yellow-400';
        if (impact === 'medium' && probability === 'low') return 'bg-green-400';
        if (impact === 'low' && probability === 'high') return 'bg-yellow-400';
        if (impact === 'low' && probability === 'medium') return 'bg-green-400';
        if (impact === 'low' && probability === 'low') return 'bg-green-400';
        return 'bg-gray-200';
    };

    // Helper function to get row color based on impact
    const getImpactRowColor = (impact) => {
        if (impact === 'high') return 'bg-red-500';
        if (impact === 'medium') return 'bg-yellow-400';
        if (impact === 'low') return 'bg-green-400';
        return 'bg-gray-200';
    };

    // Helper function to get column color based on probability
    const getProbabilityColumnColor = (probability) => {
        if (probability === 'high') return 'bg-red-500';
        if (probability === 'medium') return 'bg-yellow-400';
        if (probability === 'low') return 'bg-green-400';
        return 'bg-gray-200';
    };

    // Helper function to get total row color
    const getTotalRowColor = (level) => {
        if (level === 'high') return 'bg-red-600';
        if (level === 'medium') return 'bg-yellow-400';
        if (level === 'low') return 'bg-green-400';
        return 'bg-gray-300';
    };

    // Function to handle cell click and open modal
    const handleCellClick = (impact, probability) => {
        const cell = riskData.cells.find(c =>
            c.impact === impact && c.probability === probability);

        if (cell && cell.count > 0) {
            setSelectedRisks(cell.risks);
            setModalTitle(`${impact.charAt(0).toUpperCase() + impact.slice(1)} Impact, ${probability.charAt(0).toUpperCase() + probability.slice(1)} Probability Risks`);
            setIsModalOpen(true);
        }
    };

    // Function to close modal
    // const closeModal = () => {
    //     setIsModalOpen(false);
    //     setSelectedRisks([]);
    // };

    return (
        <div className="bg-white rounded-lg shadow p-5">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-medium text-gray-700">Risk Heatmap</h3>
                    {/* <div className="text-xs text-gray-500 flex items-center">
                        <span>HIGH PRIORITY</span>
                    </div> */}
                </div>
                {/* <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded flex items-center">
                    Active
                </div> */}
            </div>

            <div className="flex mb-4">
                {/* Left side - Total column */}
                {/* <div className="flex flex-col mr-1">
                    <div className="h-10 flex items-center justify-center font-semibold text-xs bg-blue-100 text-blue-800 w-12">
                        TOTAL
                    </div>
                    <div className={`h-10 w-12 ${getTotalRowColor('high')} flex items-center justify-center text-white font-semibold`}>
                        {riskData.totals.high}
                    </div>
                    <div className={`h-10 w-12 ${getTotalRowColor('medium')} flex items-center justify-center text-gray-800 font-semibold`}>
                        {riskData.totals.medium}
                    </div>
                    <div className={`h-10 w-12 ${getTotalRowColor('low')} flex items-center justify-center text-gray-800 font-semibold`}>
                        {riskData.totals.low}
                    </div>
                    <div className="h-10 w-12 bg-gray-300 flex items-center justify-center font-semibold text-gray-800">
                        {riskData.totals.all}
                    </div>
                </div> */}

                {/* Right side - Heatmap */}
                <div className="flex-1">
                    {/* Header */}
                    <div className="bg-blue-500 h-10 text-white font-semibold text-xs flex items-center justify-center rounded-t">
                        IMPACT VS PROBABILITY
                    </div>

                    <div className="flex flex-col"> {/* Main container for the grid */}
                        <div className="flex"> {/* Row for the heatmap grid */}
                            {/* Impact label column */}
                            <div className="w-10 bg-gray-200 relative">
                                <div className="absolute inset-0 flex items-center justify-center h-full">
                                    <span className="transform -rotate-90 font-medium text-xs text-gray-700 whitespace-nowrap">Impact</span>
                                </div>
                            </div>

                            {/* Impact levels and heatmap grid */}
                            <div className="flex-1">
                                {/* High impact row */}
                                <div className="flex h-10">
                                    <div className={`w-16 ${getImpactRowColor('high')} flex items-center justify-center`}>
                                        <span className="font-medium text-xs text-white">High</span>
                                    </div>
                                    {['low', 'medium', 'high'].map((probability) => {
                                        const cell = riskData.cells.find(c =>
                                            c.impact === 'high' && c.probability === probability);
                                        const count = cell ? cell.count : 0;

                                        return (
                                            <div
                                                key={`high-${probability}`}
                                                className={`flex-1 ${getCellColor('high', probability)} flex items-center justify-center font-semibold ${probability === 'high' ? 'text-white' : 'text-gray-800'} ${count > 0 ? 'cursor-pointer hover:opacity-80' : ''}`}
                                                onClick={() => count > 0 && handleCellClick('high', probability)}
                                                title={count > 0 ? "Click to view risks" : "No risks in this category"}
                                            >
                                                {count}
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Medium impact row */}
                                <div className="flex h-10">
                                    <div className={`w-16 ${getImpactRowColor('medium')} flex items-center justify-center`}>
                                        <span className="font-medium text-xs text-gray-800">Medium</span>
                                    </div>
                                    {['low', 'medium', 'high'].map((probability) => {
                                        const cell = riskData.cells.find(c =>
                                            c.impact === 'medium' && c.probability === probability);
                                        const count = cell ? cell.count : 0;

                                        return (
                                            <div
                                                key={`medium-${probability}`}
                                                className={`flex-1 ${getCellColor('medium', probability)} flex items-center justify-center font-semibold text-gray-800 ${count > 0 ? 'cursor-pointer hover:opacity-80' : ''}`}
                                                onClick={() => count > 0 && handleCellClick('medium', probability)}
                                                title={count > 0 ? "Click to view risks" : "No risks in this category"}
                                            >
                                                {count}
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Low impact row */}
                                <div className="flex h-10">
                                    <div className={`w-16 ${getImpactRowColor('low')} flex items-center justify-center`}>
                                        <span className="font-medium text-xs text-gray-800">Low</span>
                                    </div>
                                    {['low', 'medium', 'high'].map((probability) => {
                                        const cell = riskData.cells.find(c =>
                                            c.impact === 'low' && c.probability === probability);
                                        const count = cell ? cell.count : 0;

                                        return (
                                            <div
                                                key={`low-${probability}`}
                                                className={`flex-1 ${getCellColor('low', probability)} flex items-center justify-center font-semibold text-gray-800 ${count > 0 ? 'cursor-pointer hover:opacity-80' : ''}`}
                                                onClick={() => count > 0 && handleCellClick('low', probability)}
                                                title={count > 0 ? "Click to view risks" : "No risks in this category"}
                                            >
                                                {count}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Probability section */}
                        <div className="flex">
                            <div className="w-10"></div> {/* Spacer for Impact label column */}
                            <div className="w-16"></div> {/* Spacer for Impact level labels */}
                            <div className="flex-1">
                                <div className="flex h-8">
                                    <div className={`flex-1 ${getProbabilityColumnColor('low')} flex items-center justify-center font-medium text-xs text-gray-800`}>Low</div>
                                    <div className={`flex-1 ${getProbabilityColumnColor('medium')} flex items-center justify-center font-medium text-xs text-gray-800`}>Medium</div>
                                    <div className={`flex-1 ${getProbabilityColumnColor('high')} flex items-center justify-center font-medium text-xs text-white`}>High</div>
                                </div>
                                <div className="h-6 bg-gray-200 flex items-center justify-center font-medium text-xs text-gray-700">
                                    Probability
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-3 pt-3 border-t flex justify-between items-center text-xs">
                <div className="flex items-center text-gray-500">
                    <span>{riskData.totals.all} total risk items</span>
                </div>
                <button
                    onClick={() => {
                        // Get all risks from all cells
                        const allRisks = riskData.cells.reduce((acc, cell) => {
                            if (cell.risks && cell.risks.length > 0) {
                                return [...acc, ...cell.risks];
                            }
                            return acc;
                        }, []);

                        console.log('CONSOLIDATED RISKS', allRisks)

                        setSelectedRisks(allRisks);
                        setModalTitle("All Project Risks");
                        setIsModalOpen(true);
                    }}
                    className="text-blue-600 flex items-center hover:underline cursor-pointer"
                >
                    Details
                </button>
            </div>

            {/* Make sure the modal component is included */}
            <RiskModal
                isOpen={isModalOpen}
                closeModal={() => setIsModalOpen(false)}
                selectedRisks={selectedRisks}
                modalTitle={modalTitle}
            />
        </div>
    );
};

export default RiskHeatmap;