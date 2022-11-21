import React, { useEffect, useState, useContext } from 'react';
import Axios from '../services/axios';
import showToast from '../services/toastr';
import AppContext from '../context/AppContext';
import { formatDateTime } from '../utils/dateTime';

export default function ListaDeEntradas() {
  const [entradas, setEntradas] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const { update } = useContext(AppContext);

  useEffect(() => {
    setIsLoading(true);
    const getAllEntradas = async () => {
      await Axios.get('entradas')
        .then((response) => {
          setEntradas(response.data);
          setIsLoading(false);
        })
        .catch((err) => {
          showToast('error', err.response.data);
          setIsLoading(false);
        });
      setIsLoading(false);
    };
    getAllEntradas();
  }, [update]);
  return (
    <table className="table table-sm table-striped caption-top">
      <caption>
        Últimas entradas
        {' '}
        {isLoading && (
          <div className="spinner-border spinner-border-sm text-secondary ms-2" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </caption>
      <thead className="table-success">
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
          <th className="text-center">
            Ações
          </th>
        </tr>
      </thead>
      <tbody className="table-group-divider">
        {entradas.length >= 1 && entradas.map((entrada, index) => (
          index < 5 && (
          <tr key={entrada.data_hora}>
            <td>
              {formatDateTime(entrada.data_hora)}
            </td>
            <td>
              {entrada.quantidade}
            </td>
            <td>
              {entrada.mercadoria}
            </td>
            <td>
              {entrada.local}
            </td>
            <td>
              <div className="d-flex d-grid gap-2 justify-content-center">
                <button type="button" className="btn btn-sm btn-outline-secondary">
                  <i className="fa-regular fa-pen-to-square" />
                </button>
                <button type="button" className="btn btn-sm btn-outline-danger">
                  <i className="fa-solid fa-trash" />
                </button>
              </div>
            </td>
          </tr>
          )
        ))}
      </tbody>
    </table>
  );
}
