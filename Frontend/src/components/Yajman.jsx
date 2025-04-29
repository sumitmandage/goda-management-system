import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample datasets for Day, Week, and Month
const dailyDataset = [
  { day: 'Mon', value: 10 },
  { day: 'Tue', value: 20 },
  { day: 'Wed', value: 30 },
  { day: 'Thu', value: 40 },
  { day: 'Fri', value: 50 },
  { day: 'Sat', value: 60 },
  { day: 'Sun', value: 70 },
];

const weeklyDataset = [
  { week: 'Week 1', value: 30 },
  { week: 'Week 2', value: 45 },
  { week: 'Week 3', value: 55 },
  { week: 'Week 4', value: 65 },
];

const monthlyDataset = [
  { month: 'Jan', value: 10 },
  { month: 'Feb', value: 20 },
  { month: 'Mar', value: 30 },
  { month: 'Apr', value: 25 },
  { month: 'May', value: 35 },
  { month: 'Jun', value: 50 },
  { month: 'Jul', value: 45 },
  { month: 'Aug', value: 40 },
  { month: 'Sep', value: 55 },
  { month: 'Oct', value: 60 },
  { month: 'Nov', value: 70 },
  { month: 'Dec', value: 65 },
];

const Yajman = () => {
  const [timeFrame, setTimeFrame] = useState('month'); // Default to month

  const getXAxisKey = () => {
    if (timeFrame === 'day') return 'day';
    if (timeFrame === 'week') return 'week';
    return 'month'; // Default to month
  };

  const getData = () => {
    if (timeFrame === 'day') return dailyDataset;
    if (timeFrame === 'week') return weeklyDataset;
    return monthlyDataset; // Default to monthly data
  };

  return (
    <div className="text-center bg-white p-8 rounded-lg shadow-xl border border-gray-300 my-20">

      {/* Timeframe Selector: Day, Week, Month */}
      <div className="mb-6">
        <label className="mr-4">Select Time Frame:</label>
        <select onChange={(e) => setTimeFrame(e.target.value)} value={timeFrame}>
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
        </select>
      </div>

      {/* Line Chart based on selected timeframe */}
      <div className="w-full p-4">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={getData()}>
            <XAxis dataKey={getXAxisKey()} />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Yajman;
