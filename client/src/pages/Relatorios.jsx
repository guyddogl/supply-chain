import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import ListaDeEntradasESaidas from '../components/ListaDeEntradasESaidas';
import Axios from '../services/axios';
import showToast from '../services/toastr';
import { getInitialDate, getFinalDate } from '../utils/dateTime';

export default function Mercadorias() {
  const [isLoading, setIsLoading] = useState(false);

  const [entradas, setEntradas] = useState([]);

  const [saidas, setSaidas] = useState([]);

  const [entradasESaidas, setEntradasESaidas] = useState([]);

  const [inputsForm, setInputsForm] = useState({
    categoria: 'default',
    dataInicial: getInitialDate(),
    dataFinal: getFinalDate(),
  });

  const handleFormInputs = (event) => {
    const { target } = event;
    return setInputsForm((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  useEffect(() => {
    setIsLoading(true);
    const getAllEntradasESaidas = async () => {
      await Axios.get('entradas')
        .then((response) => {
          const arrayDeEntradas = (response.data).map((e) => ({ ...e, tipo: 'entrada' }));
          setEntradas(arrayDeEntradas);
        })
        .catch((err) => {
          showToast('error', err.response.data);
        });
      await Axios.get('saidas')
        .then((response) => {
          const arrayDeSaidas = (response.data).map((e) => ({ ...e, tipo: 'saída' }));
          setSaidas(arrayDeSaidas);
        })
        .catch((err) => {
          showToast('error', err.response.data);
        });
      const filtro = entradas.concat(saidas)
        .sort((a, b) => new Date(b.data_hora) - new Date(a.data_hora));
      setEntradasESaidas(filtro);
      setIsLoading(false);
    };
    getAllEntradasESaidas();
  }, []);

  useEffect(() => {
    console.log(inputsForm.categoria);
    const filtro = entradas.concat(saidas)
      .sort((a, b) => new Date(b.data_hora) - new Date(a.data_hora))
      .filter((e) => (inputsForm.categoria !== 'default' ? e.tipo === inputsForm.categoria : e))
      .filter((m) => (
        m.data_hora >= inputsForm.dataInicial && m.data_hora <= inputsForm.dataFinal));
    setEntradasESaidas(filtro);
  }, [entradas, saidas, inputsForm]);

  console.log(entradasESaidas);

  return (
    <>
      <NavBar />
      <section className="container">
        <div className="row justify-content-center mt-5 mb-2">
          <h4 className="text-center">Relatório de Entradas e Saídas</h4>
        </div>
        <div className="row justify-content-center">
          <div className="col-12 col-lg-6">
            <label htmlFor="data" className="form-label" style={{ width: '100%' }}>
              Selecione uma categoria e as datas para exibir o relatório
              <select
                name="categoria"
                className="form-control form-select"
                onChange={handleFormInputs}
                value={inputsForm.categoria}
                disabled={isLoading}
                required
              >
                <option name="default" value="default">Entradas e Saídas</option>
                <option value="entrada">Entradas</option>
                <option value="saída">Saídas</option>
              </select>
            </label>
          </div>
          <div className="col-12 col-lg-3">
            <label htmlFor="data" className="form-label" style={{ width: '100%' }}>
              Data Inicial
              <input
                type="datetime-local"
                name="dataInicial"
                value={inputsForm.dataInicial}
                className="form-control"
                onChange={handleFormInputs}
                disabled={isLoading}
                required
              />
            </label>
          </div>
          <div className="col-12 col-lg-3">
            <label htmlFor="data" className="form-label" style={{ width: '100%' }}>
              Data Final
              <input
                type="datetime-local"
                name="dataFinal"
                value={inputsForm.dataFinal}
                className="form-control"
                onChange={handleFormInputs}
                disabled={isLoading}
                required
              />
            </label>
          </div>
        </div>
        <ListaDeEntradasESaidas entradasESaidas={entradasESaidas} isLoading={isLoading} />
      </section>
    </>
  );
}
