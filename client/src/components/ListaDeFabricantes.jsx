import React, { useEffect, useState, useContext } from 'react';
import Axios from '../services/axios';
import showToast from '../services/toastr';
import AppContext from '../context/AppContext';

export default function ListaDeFabricantes() {
  const [fabricantes, setFabricantes] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const { update } = useContext(AppContext);

  useEffect(() => {
    setIsLoading(true);
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

  return (
    <ul className="list-group list-group-flush">
      <li className="list-group-item bg-light text-dark">
        Lista de Fabricantes
        {' '}
        {isLoading && (
        <div className="spinner-border spinner-border-sm text-secondary ms-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        )}
      </li>
      {fabricantes.length >= 1 && fabricantes.map((fabricante) => (
        <li className="list-group-item d-flex list-hover justify-content-between" key={fabricante.nome}>
          {fabricante.nome}
          <div className="d-flex d-grid gap-2">
            <button type="button" className="btn btn-sm btn-outline-secondary">
              <i className="fa-regular fa-pen-to-square" />
            </button>
            <button type="button" className="btn btn-sm btn-outline-danger">
              <i className="fa-solid fa-trash" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
