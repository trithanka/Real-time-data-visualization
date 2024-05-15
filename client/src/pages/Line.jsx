import React, { useState, useEffect } from 'react';
import { Line } from "react-chartjs-2";
import axios from 'axios';
import { Chart as ChartJS, TimeScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import 'chartjs-adapter-moment';
import "./css/Line.css";

function LineG() {
    ChartJS.register(TimeScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

    const [data, setData] = useState([]);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [filter, setFilter] = useState({ startTime: '', endTime: '' });
    const timeWindow = 60000; // 1 minute in milliseconds

    // Function to fetch sensor data
    const fetchData = async (filterParams) => {
        try {
            const response = await axios.get('http://localhost:5000/v1/sensor/', {
                params: filterParams
            });
            setData(response.data.data);
        } catch (error) {
            console.error('Error fetching sensor data:', error);
        }
    };

    // Fetch sensor data from backend when the component mounts or when filter changes
    useEffect(() => {
        const interval = setInterval(() => fetchData(filter), 2000);
        return () => clearInterval(interval);
    }, [filter]); // Dependency array includes filter

    // Group the data by sensor ID
    const groupedData = data.reduce((acc, sensor) => {
        acc[sensor.sensor_id] = acc[sensor.sensor_id] || { label: sensor.sensor_id, data: [] };
        acc[sensor.sensor_id].data.push({ x: sensor.timestamp, y: sensor.value });
        return acc;
    }, {});

    const borderColorArray = ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'];

    // Construct datasets from grouped data
    const datasets = Object.values(groupedData).map((sensor, index) => ({
        label: `Sensor ${sensor.label}`,
        data: sensor.data,
        borderColor: borderColorArray[index % borderColorArray.length],
        fill: true,
        tension: 0.4
    }));

    // Determine the latest timestamp and set the x-axis range
    const latestTimestamp = Math.max(...data.map(sensor => new Date(sensor.timestamp).getTime()));
    const earliestTimestamp = latestTimestamp - timeWindow;

    const options = {
        plugins: {
            legend: true,
            zoom: {
                zoom: {
                    wheel: { enabled: true },
                    pinch: { enabled: true },
                    mode: 'xy'
                },
                pan: { enabled: true, mode: 'xy' }
            }
        },
        scales: {
            x: {
                type: 'time', // Use time scale for x-axis
                time: { unit: 'second' }, // Display x-axis labels in second intervals
                min: earliestTimestamp,
                max: latestTimestamp,
                pan: { enabled: true, mode: 'x' }
            },
            y: {
                min: 0,
                max: 100,
                ticks: { stepSize: 20 } // Set the interval for y-axis ticks
            }
        }
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setFilter({ startTime, endTime });
        fetchData({ startTime, endTime });
    };

    return (
        <div className='line'>
            <form onSubmit={handleSubmit} className="filter">
                <label htmlFor="startTime">Start Time:</label>
                <input type="datetime-local" id="startTime" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                <label htmlFor="endTime">End Time:</label>
                <input type="datetime-local" id="endTime" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
            <Line data={{ datasets: datasets }} options={options} />
        </div>
    );
}

export default LineG;
