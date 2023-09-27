import React from "react";
import { Line, Pie, Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from 'chart.js/auto'

Chart.register(CategoryScale);

export function BarChart({ chartData, plugins }) {
  return (
    <div className="chart-container">
      <Bar data={ chartData } options={{
		  plugins: {
			  ...plugins,
			  legend: {
				  display: false
			  }
		  },
		  maintainAspectRatio: false
	  }} />
    </div>
  );
}

export function LineGraph({ chartData, plugins }) {
  return (
    <div className="chart-container">
      <Line data={ chartData } options={{
		  plugins: {
			  ...plugins,
			  legend: {
				  display: false
			  }
		  },
		  maintainAspectRatio: false
        }} />
    </div>
  );
}

export function PieChart({ chartData, plugins }) {
  return (
    <div className="chart-container">
      <Pie data={ chartData } options={{ plugins: plugins }} />
    </div>
  );
}