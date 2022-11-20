import React, { useEffect, useState, useContext } from 'react';
import Axios from '../services/axios';
import showToast from '../services/toastr';
import AppContext from '../context/AppContext';

export default function ListaDeMercadorias() {
  const [mercadorias, setMercadorias] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const { update } = useContext(AppContext);

  useEffect(() => {
    setIsLoading(true);
    const getAllMercadorias = async () => {
      await Axios.get('mercadorias')
        .then((response) => {
          setMercadorias(response.data);
          setIsLoading(false);
        })
        .catch((err) => {
          showToast('error', err.response.data);
          setIsLoading(false);
        });
      setIsLoading(false);
    };
    getAllMercadorias();
  }, [update]);

  return (
    <table className="table table-striped caption-top">
      <caption>
        Lista de Mercadorias
        {' '}
        {isLoading && (
          <div className="spinner-border spinner-border-sm text-secondary ms-2" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </caption>
      <thead>
        <tr>
          <th>
            Nome
          </th>
          <th>
            Registro
          </th>
          <th>
            Fabricante
          </th>
          <th>
            Tipo
          </th>
          <th>
            Descrição
          </th>
          <th>
            Ações
          </th>
        </tr>
      </thead>
      <tbody className="table-group-divider">
        {mercadorias.length >= 1 && mercadorias.map((mercadoria) => (
          <tr key={mercadoria.nome}>
            <td>
              {mercadoria.nome}
            </td>
            <td>
              {mercadoria.registro}
            </td>
            <td>
              {mercadoria.fabricante}
            </td>
            <td>
              {mercadoria.tipo}
            </td>
            <td>
              {mercadoria.descricao}
            </td>
            <td>
              <div className="d-flex d-grid gap-2">
                <button type="button" className="btn btn-sm btn-outline-secondary">
                  <i className="fa-regular fa-pen-to-square" />
                </button>
                <button type="button" className="btn btn-sm btn-outline-danger">
                  <i className="fa-solid fa-trash" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
