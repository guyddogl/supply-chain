import React, { useState, useEffect } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import NavBar from '../components/NavBar';
import ListaDeEntradasESaidas from '../components/ListaDeEntradasESaidas';
import Axios from '../services/axios';
import showToast from '../services/toastr';
import { getInitialDate, getFinalDate } from '../utils/dateTime';
import TablePDF from '../components/PDF/TablePDF';

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
    const filtro = entradas.concat(saidas)
      .sort((a, b) => new Date(b.data_hora) - new Date(a.data_hora))
      .filter((e) => (inputsForm.categoria !== 'default' ? e.tipo === inputsForm.categoria : e))
      .filter((m) => (
        m.data_hora >= inputsForm.dataInicial && m.data_hora <= inputsForm.dataFinal));
    setEntradasESaidas(filtro);
  }, [entradas, saidas, inputsForm]);

  return (
    <>
      <NavBar />
      <section className="container">
        <div className="row justify-content-center mt-5 mb-4 text-center">
          <h4>Relatório de Entradas e Saídas</h4>
          <span>Selecione uma categoria e as datas para exibir o relatório</span>
        </div>
        <div className="row justify-content-center align-items-center my-3">
          <div className="col-12 col-lg-4">
            <label htmlFor="data" className="form-label" style={{ width: '100%' }}>
              Categoria
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
          <div className="col-12 col-lg-2 text-center overflow-hidden">
            <OverlayTrigger
              placement="top"
              overlay={(<Tooltip>Visualizar PDF</Tooltip>)}
            >
              <button
                type="button"
                className="btn btn-md btn-outline-secondary mt-3 mx-1"
                onClick={() => TablePDF('visualizar', inputsForm.dataInicial, inputsForm.dataFinal, entradasESaidas)}
              >
                <i className="fa-solid fa-file-pdf fa-xl" />
              </button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={(<Tooltip>Salvar PDF</Tooltip>)}
            >
              <button
                type="button"
                className="btn btn-md btn-outline-secondary mt-3 mx-1"
                onClick={() => TablePDF('salvar', inputsForm.dataInicial, inputsForm.dataFinal, entradasESaidas)}
              >
                <i className="fa-regular fa-floppy-disk fa-xl" />
              </button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={(<Tooltip>Imprimir PDF</Tooltip>)}
            >
              <button
                type="button"
                className="btn btn-md btn-outline-secondary mt-3 mx-1"
                onClick={() => TablePDF('imprimir', inputsForm.dataInicial, inputsForm.dataFinal, entradasESaidas)}
              >
                <i className="fa-solid fa-print fa-xl" />
              </button>
            </OverlayTrigger>
          </div>
        </div>
        <ListaDeEntradasESaidas entradasESaidas={entradasESaidas} isLoading={isLoading} />
      </section>
    </>
  );
}
