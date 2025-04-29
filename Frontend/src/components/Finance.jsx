


import React, { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const desktopOS = [
  { name: 'Registered-Sevak', value: 65 },
  { name: 'Regular-Sevak', value: 30 },
  { name: 'Group-Sevak', value: 4 },
  { name: 'Samithi', value: 1 }
];

const dataset = [
  { month: 'Jan', Sevak: 40 },
  { month: 'Feb', Sevak: 30 },
  { month: 'Mar', Sevak: 50 },
  { month: 'Apr', Sevak: 30 },
  { month: 'May', Sevak: 20 },
  { month: 'Jun', Sevak: 50 },
  { month: 'Jul', Sevak: 40 },
  { month: 'Aug', Sevak: 35 },
  { month: 'Sep', Sevak: 45 },
  { month: 'Oct', Sevak: 30 },
  { month: 'Nov', Sevak: 25 },
  { month: 'Dec', Sevak: 30 }
];

const valueFormatter = (value) => `${value}%`;

const TickParamsSelector = ({ tickPlacement, tickLabelPlacement, setTickPlacement, setTickLabelPlacement }) => (
  <div className="mb-6">
    <label className="mr-4">Tick Placement:</label>
    <select onChange={(e) => setTickPlacement(e.target.value)} value={tickPlacement}>
      <option value="start">Start</option>
      <option value="end">End</option>
      <option value="middle">Middle</option>
      <option value="extremities">Extremities</option>
    </select>

    <label className="ml-6 mr-4">Tick Label Placement:</label>
    <select onChange={(e) => setTickLabelPlacement(e.target.value)} value={tickLabelPlacement}>
      <option value="tick">Tick</option>
      <option value="middle">Middle</option>
    </select>
  </div>
);

const Finance = () => {
  const [tickPlacement, setTickPlacement] = useState('middle');
  const [tickLabelPlacement, setTickLabelPlacement] = useState('tick');

  return (
    <div className="text-center bg-white p-8 rounded-lg shadow-xl border border-gray-300 my-20">
      {/* <h1 className="text-3xl font-extrabold text-indigo-700 mb-6">Site Under Construction</h1> */}
      <p className="text-gray-700 text-lg mb-8">We are currently working on something amazing. Stay tuned!</p>

      {/* Tick Placement and Label Placement Selector */}
      <TickParamsSelector
        tickPlacement={tickPlacement}
        tickLabelPlacement={tickLabelPlacement}
        setTickPlacement={setTickPlacement}
        setTickLabelPlacement={setTickLabelPlacement}
      />

      {/* Flexbox Container for Layout */}
      <div className="flex flex-wrap justify-between items-center mt-8">
        {/* Left Side: Pie Chart */}
        <div className="w-full sm:w-1/2 p-4">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={desktopOS}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label={({ name, percent }) => `${name}: ${valueFormatter(percent * 100)}`}
              >
                {/* Adding colors for the segments */}
                <Cell key="cell-1" fill="#4C6DFF" />
                <Cell key="cell-2" fill="#FF6B6B" />
                <Cell key="cell-3" fill="#4CAF50" />
                <Cell key="cell-4" fill="#FFEB3B" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Right Side: Bar Chart */}
        <div className="w-full sm:w-1/2 p-4">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dataset}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                scale="band"
                tickPlacement={tickPlacement}
                tickLabelPlacement={tickLabelPlacement}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Sevak" fill="#4C6DFF" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* New Section: Line Chart with temporary data */}
        <div className="w-full sm:w-1/2 p-4">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={[
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
            ]}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Finance;
