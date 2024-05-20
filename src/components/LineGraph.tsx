import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { sallaries } from '../data/sallaries';
import { processData } from '../lib/ProcessData';
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import Styles from './LineGraph.module.css'
Chart.register(CategoryScale);

const LineGraph: React.FC = () => {
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [
      {
        label: 'Total Jobs',
        data: [],
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  });

  useEffect(() => {
    const processedData = processData(sallaries);
    const years = Array.from(new Set(processedData.map((item) => item.year)));
    const totalJobsByYear = years.map((year) => {
      const data = processedData.find((item) => item.year === year);
      return data? data.totalJobs : 0;
    });

    setChartData({
      labels: years,
      datasets: [
        {
          label: 'Total Jobs',
          data: totalJobsByYear,
          fill: false,
          borderColor: 'rgba(75,192,192,1)',
        },
      ],
    });
  }, []);

  return (
    <div >
      <Line data={chartData} className={Styles.lineGraph} />
    </div>
  );
};

export default LineGraph;
