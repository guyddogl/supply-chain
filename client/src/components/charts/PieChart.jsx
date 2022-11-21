import React from 'react';
import PropTypes from 'prop-types';
import ApexChart from 'react-apexcharts';

export default function PieChart(props) {
  const { entradasESaidas } = props;

  const pieOptions = {
    labels: ['Entradas', 'Saídas'],
    colors: ['#376384', '#949FB1'],
  };

  const pieSeries = [(entradasESaidas.filter((e) => e.tipo === 'entrada')).length, (entradasESaidas.filter((e) => e.tipo === 'saída')).length];

  return (
    <ApexChart
      options={pieOptions}
      series={pieSeries}
      width="430px"
      type="pie"
    />
  );
}

PieChart.propTypes = {
  entradasESaidas: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
};
