import React from 'react';
import PropTypes from 'prop-types';
import { formatDateTime } from '../utils/dateTime';

export default function ListaDeEntradasESaidas(props) {
  const { entradasESaidas, isLoading } = props;

  const lineTableBg = (tipo) => {
    if (tipo === 'saída') return 'table-saida';
    return 'table-entrada';
  };

  return (
    <table className="table table-sm caption-top">
      <caption>
        {' '}
        {isLoading && (
          <div className="spinner-border spinner-border-sm text-secondary ms-2" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </caption>
      <thead className="table-secondary">
        <tr>
          <th>
            Data
          </th>
          <th>
            Qntd
          </th>
          <th>
            Mercadoria
          </th>
          <th>
            Local
          </th>
        </tr>
      </thead>
      <tbody className="table-group-divider">
        {entradasESaidas.length >= 1 && entradasESaidas.map((e, index) => (
          index < 10 && (
          <tr key={e.data_hora} className={`${lineTableBg(e.tipo)}`}>
            <td>
              {formatDateTime(e.data_hora)}
            </td>
            <td>
              {e.quantidade}
            </td>
            <td>
              {e.mercadoria}
            </td>
            <td>
              {e.local}
            </td>
          </tr>
          )
        ))}
      </tbody>
    </table>
  );
}

ListaDeEntradasESaidas.propTypes = {
  entradasESaidas: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  isLoading: PropTypes.bool.isRequired,
};
