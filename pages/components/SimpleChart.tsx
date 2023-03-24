import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface SimpleChartProps {
  averagePrices: { month: string; google: number; amazone: number }[];
}

const SimpleChart: React.FC<SimpleChartProps> = ({
  averagePrices,
}: SimpleChartProps): React.ReactElement => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={700}
        height={700}
        data={averagePrices}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="amazone"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="google" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SimpleChart;
