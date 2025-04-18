import React from 'react';
import ReactECharts from 'echarts-for-react';

const OnTimeDeliveryRate = () => {
    // Mock data - in a real application, this would come from your MongoDB data
    const deliveryRateData = {
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        onTimeRate: [88, 92, 87, 84, 77, 82],
        totalTasks: [45, 52, 48, 56, 62, 58],
        completedOnTime: [40, 48, 42, 47, 48, 48]
    };

    // Calculate current on-time rate
    const currentRate = deliveryRateData.onTimeRate[deliveryRateData.onTimeRate.length - 1];

    // Determine status based on thresholds
    let status = 'bg-green-100 text-green-800';
    let statusText = 'On Track';

    if (currentRate < 70) {
        status = 'bg-red-100 text-red-800';
        statusText = 'Critical';
    } else if (currentRate < 85) {
        status = 'bg-yellow-100 text-yellow-800';
        statusText = 'Warning';
    }

    // ECharts option configuration
    const option = {
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                const onTimeRate = params[0].value;
                const totalTasks = deliveryRateData.totalTasks[params[0].dataIndex];
                const completedOnTime = deliveryRateData.completedOnTime[params[0].dataIndex];

                return `${params[0].axisValue}<br/>
          <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#3b82f6;"></span>
          On-Time Rate: ${onTimeRate}%<br/>
          <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#10b981;"></span>
          Completed On-Time: ${completedOnTime}<br/>
          <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#6b7280;"></span>
          Total Tasks: ${totalTasks}`;
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: '15%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: deliveryRateData.months,
            axisLine: {
                lineStyle: {
                    color: '#e5e7eb'
                }
            },
            axisLabel: {
                color: '#6b7280'
            }
        },
        yAxis: [
            {
                type: 'value',
                name: 'Rate (%)',
                min: 50,
                max: 100,
                interval: 10,
                axisLine: {
                    show: false
                },
                axisLabel: {
                    color: '#6b7280',
                    formatter: '{value}%'
                },
                splitLine: {
                    lineStyle: {
                        color: '#e5e7eb',
                        type: 'dashed'
                    }
                }
            },
            {
                type: 'value',
                name: 'Tasks',
                show: false
            }
        ],
        series: [
            {
                name: 'On-Time Rate',
                type: 'line',
                smooth: true,
                lineStyle: {
                    width: 3,
                    color: '#3b82f6'
                },
                symbol: 'circle',
                symbolSize: 6,
                itemStyle: {
                    color: '#3b82f6'
                },
                data: deliveryRateData.onTimeRate
            },
            {
                name: 'Tasks',
                type: 'bar',
                yAxisIndex: 1,
                stack: 'Tasks',
                barWidth: '30%',
                itemStyle: {
                    color: '#10b981'
                },
                z: 2,
                data: deliveryRateData.completedOnTime
            },
            {
                name: 'Delayed Tasks',
                type: 'bar',
                yAxisIndex: 1,
                stack: 'Tasks',
                barWidth: '30%',
                itemStyle: {
                    color: '#d1d5db'
                },
                data: deliveryRateData.totalTasks.map((total, index) =>
                    total - deliveryRateData.completedOnTime[index]
                )
            }
        ],
        // Add warning threshold line
        markLine: {
            silent: true,
            lineStyle: {
                color: '#fbbf24'
            },
            data: [
                {
                    yAxis: 85,
                    name: 'Warning',
                    label: {
                        formatter: 'Warning (85%)',
                        position: 'middle',
                        color: '#fbbf24'
                    }
                }
            ]
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-5 border-t-4 border-blue-500">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-medium text-gray-700">On-Time Delivery Rate</h3>
                    <div className="text-xs text-gray-500 flex items-center">
                        <span>HIGH PRIORITY</span>
                    </div>
                </div>
                <div className={`${status} text-xs px-2 py-1 rounded flex items-center`}>
                    {statusText}
                </div>
            </div>

            <div className="mb-4">
                <div className="flex justify-between items-end">
                    <div className="text-3xl font-bold text-gray-800">{currentRate}%</div>
                    <div className="text-sm text-gray-500">
                        {deliveryRateData.completedOnTime[deliveryRateData.completedOnTime.length - 1]} /
                        {deliveryRateData.totalTasks[deliveryRateData.totalTasks.length - 1]} tasks on time
                    </div>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                    (Tasks completed by planned end date / Total completed tasks) × 100
                </div>
            </div>

            <div className="h-64">
                <ReactECharts
                    option={option}
                    style={{ height: '100%', width: '100%' }}
                    opts={{ renderer: 'canvas' }}
                />
            </div>

            <div className="mt-3 pt-3 border-t flex justify-between items-center text-xs">
                <div className="flex items-center text-gray-500">
                    <div className="w-2 h-2 rounded-full bg-yellow-500 mr-1"></div>
                    <span>10 tasks completed late this month</span>
                </div>
                <a href="#" className="text-blue-600 flex items-center">
                    Details
                </a>
            </div>
        </div>
    );
};

export default OnTimeDeliveryRate;