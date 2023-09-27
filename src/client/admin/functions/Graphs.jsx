import React from "react";
import { Line, Pie, Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from 'chart.js/auto'

Chart.register(CategoryScale);

export function BarChart({ chartData, plugins }) {
  return <Bar data={ chartData } options={{
		  plugins: {
			  ...plugins,
			  legend: {
				  display: false
			  }
		  }
	  }} />
}

export function LineGraph({ chartData, plugins }) {
  return <Line data={ chartData } options={{
		  plugins: {
			  ...plugins,
			  legend: {
				  display: false
			  }
		  }
        }} />
}

export function PieChart({ chartData, plugins }) {
  return <Pie data={ chartData } options={{ plugins: plugins }} />
}