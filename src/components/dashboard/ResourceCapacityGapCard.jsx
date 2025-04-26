import React from 'react';

const ResourceCapacityGap = () => {
    return (
        <div className="bg-white rounded-lg shadow p-5 border-t-4 border-purple-500">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-medium text-gray-700">Resource Capacity Gap</h3>
                    {/* <div className="text-xs text-gray-500 flex items-center">
                        <span>MEDIUM PRIORITY</span>
                    </div> */}
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
    );
}

export default ResourceCapacityGap;