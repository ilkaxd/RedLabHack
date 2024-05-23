/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useRef } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const TableChart = () => {
    const chartRef = useRef(null);

    const data = {
        labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь'],
        datasets: [{
            label: 'Значения',
            data: [30, 20, 50, 40, 35, 45],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
        }]
    };

    const options = {
        plugins: {
            tooltip: {
                enabled: false,
            }
        },
        hover: {
            mode: 'nearest',
            intersect: true
        }
    };

    const handleRowMouseEnter = (index) => {
        const chart = chartRef.current;

        if (chart) {
            //@ts-ignore
            const chartInstance = chart.chartInstance;
            chartInstance.tooltip.setActiveElements([{ datasetIndex: 0, index }]);
            chartInstance.update();
        }
    };

    const handleRowMouseLeave = () => {
        const chart = chartRef.current;

        if (chart) {
            const chartInstance = chart.chartInstance;
            chartInstance.tooltip.setActiveElements([]);
            chartInstance.update();
        }
    };

    return (
        <div>
            <table id="data-table">
                <thead>
                    <tr>
                        <th>Месяц</th>
                        <th>Значение</th>
                    </tr>
                </thead>
                <tbody>
                    {data.labels.map((label, index) => (
                        <tr key={index} 
                            onMouseEnter={() => handleRowMouseEnter(index)}
                            onMouseLeave={handleRowMouseLeave} >
                            <td>{label}</td>
                            <td>{data.datasets[0].data[index]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <Line 
                    ref={chartRef}
                    data={data}
                    options={options}
                />
            </div>
        </div>
    );
};

export default TableChart;
