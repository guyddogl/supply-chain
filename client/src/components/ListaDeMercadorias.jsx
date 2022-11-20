import React, { useEffect, useState, useContext } from 'react';
import Axios from '../services/axios';
import showToast from '../services/toastr';
import AppContext from '../context/AppContext';

export default function ListaDeMercadorias() {
  const [mercadorias, setMercadorias] = useState([]);

  const [fabricantes, setFabricantes] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const { update } = useContext(AppContext);

  const [inputSearch, setInputSearch] = useState('');

  const [selectSearch, setSelectSearch] = useState('');

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
    const getAllFabricantes = async () => {
      await Axios.get('fabricantes')
        .then((response) => {
          setFabricantes(response.data);
          setIsLoading(false);
        })
        .catch((err) => {
          showToast('error', err.response.data);
          setIsLoading(false);
        });
      setIsLoading(false);
    };
    getAllFabricantes();
  }, [update]);

  const removeFilters = () => {
    setInputSearch('');
    setSelectSearch('Todos');
  };

  const lista = mercadorias
    .filter((mercadoria) => ((selectSearch === 'Todos') ? mercadoria.fabricante : mercadoria.fabricante.includes(selectSearch)))
    .filter((mercadoria) => mercadoria.nome.toLowerCase().includes(inputSearch.toLowerCase()));

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
      <caption>
        <div className="row justify-content-start">
          <div className="col-6 col-lg-4">
            <label htmlFor="nome" className="form-label" style={{ width: '100%' }}>
              <div className="input-group">
                <span className="input-group-text text-secondary">
                  <i className="fas fa-search" />
                </span>
                <input
                  type="text"
                  name="nome"
                  value={inputSearch}
                  placeholder="Pesquisar por nome"
                  className="form-control"
                  onChange={(e) => setInputSearch(e.target.value)}
                />
              </div>
            </label>
          </div>
          <div className="col-6 col-lg-3">
            <label htmlFor="fabricante" className="form-label" style={{ width: '100%' }}>
              <select
                name="fabricante"
                className="form-control form-select"
                onChange={(e) => setSelectSearch(e.target.value)}
                value={selectSearch}
              >
                <option value="Todos">
                  Todos os Fabricantes
                </option>
                {fabricantes.map((fabricante) => (
                  <option key={fabricante.id} value={fabricante.nome}>
                    {fabricante.nome}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="col-6 col-lg-3">
            <div className="input-group">
              <button type="button" name="filtro" className="btn btn-md btn-outline-secondary" onClick={removeFilters}>
                <i className="fa-solid fa-filter-circle-xmark me-2" />
                Remover filtros
              </button>
            </div>
          </div>
        </div>
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
        {lista.length >= 1 && lista.map((mercadoria) => (
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
