import React, { useState, useEffect } from "react";
import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TSensor, getSensor } from '../../api/getSensor'; // Ensure correct path

interface ChartProps {
  userId: string;
}

interface SensorData {
  name: string;
  temperature: number;
  humidity: number;
}

const Chart: React.FC<ChartProps> = ({ userId }) => {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const allSensors: TSensor[] = await getSensor(userId);
        const formattedData = allSensors.map(sensor => ({
          name: new Date(sensor.date).toLocaleTimeString(),
          temperature: sensor.temperature,
          humidity: sensor.humidity,
        }));
        setSensorData(formattedData);
      } catch (error) {
        console.error('Failed to fetch sensor data:', error);
      }
    };

    fetchSensorData();
  }, [userId]);

  return (
    <div className="chart">
      <div className="title">Temperature and Humidty Values</div>
      <ResponsiveContainer width="100%" aspect={2 / 1}>
        <AreaChart
          width={730}
          height={250}
          data={sensorData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorTemperature" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorHumidity" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="temperature"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorTemperature)"
          />
          <Area
            type="monotone"
            dataKey="humidity"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorHumidity)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;