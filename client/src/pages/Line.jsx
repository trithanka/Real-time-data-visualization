import React, { useState, useEffect } from 'react';
import { Line } from "react-chartjs-2";
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import 'chartjs-adapter-moment';
import "./css/Line.css";

function LineG() {
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

    const [data, setData] = useState([]);
    const [startTime, setStartTime] = useState('');  //query filter
    const [endTime, setEndTime] = useState('');    //query filter

    // Function to fetch sensor data
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/v1/sensor/', {
                params: {
                    startTime: startTime,
                    endTime: endTime
                }
            });
            setData(response.data.data);
        } catch (error) {
            console.error('Error fetching sensor data:', error);
        }
    };

    // Fetch sensor data from backend when the component mounts
    useEffect(() => {
        // fetch data initially when the component mounts
        fetchData();

        // fetch data every 10 seconds to show in real time
        const interval = setInterval(fetchData, 10000);

        // clean up the interval when the component unmounts ,if you dont then set interval will work continuously
        return () => clearInterval(interval);
    }, []); // Empty dependency array to run once on mount

    // Group the data by sensor ID
    const groupedData = data.reduce((acc, sensor) => {
        acc[sensor.sensor_id] = acc[sensor.sensor_id] || { label: sensor.sensor_id, data: [] };
        acc[sensor.sensor_id].data.push(sensor.value);
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

    // Get timestamps from the data
    const timestamps = data.map(sensor => sensor.timestamp);

    // Create chart data object
    const chartData = {
        labels: timestamps,
        datasets: datasets
    };

    const options = {
        plugins: {
            legend: true
        },
        scales: {
            y: {
                min: 5,
                max: 100
            }
        }
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
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
            <Line data={chartData} options={options} />
        </div>
    );
}

export default LineG;
