import React from 'react';
import ApexChart from 'react-apexcharts';

export default function PieChart() {
  const pieOptions = {
    labels: ['Entradas', 'Saídas'],
    colors: ['#376384', '#949FB1'],
  };

  const pieSeries = [100, 30];

  return (
    <ApexChart
      options={pieOptions}
      series={pieSeries}
      width="430px"
      type="pie"
    />
  );
}
