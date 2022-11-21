import React, { useEffect, useState, useContext } from 'react';
import NavBar from '../components/NavBar';
import EntradaMercadoria from '../components/EntradaMercadoria';
import ListaDeEntradas from '../components/ListaDeEntradas';
import SaidaMercadoria from '../components/SaidaMercadoria';
import ListaDeSaidas from '../components/ListaDeSaidas';
import ListaDeEntradasESaidas from '../components/ListaDeEntradasESaidas';
import PieChart from '../components/charts/PieChart';
import Axios from '../services/axios';
import showToast from '../services/toastr';
import AppContext from '../context/AppContext';
import { getInitialDate, getFinalDate } from '../utils/dateTime';

export default function Home() {
  const [entradas, setEntradas] = useState([]);

  const [saidas, setSaidas] = useState([]);

  const [entradasESaidas, setEntradasESaidas] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const { update } = useContext(AppContext);

  const [inputsForm, setInputsForm] = useState({
    mercadoria: 'default',
    dataInicial: getInitialDate(),
    dataFinal: getFinalDate(),
  });

  const [mercadorias, setMercadorias] = useState([]);

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
      setIsLoading(false);
    };
    getAllEntradasESaidas();
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

  useEffect(() => {
    const filtro = entradas.concat(saidas)
      .sort((a, b) => new Date(b.data_hora) - new Date(a.data_hora))
      .filter((mercadoria) => Number(mercadoria.mercadoria_id) === Number(inputsForm.mercadoria))
      .filter((m) => (
        m.data_hora >= inputsForm.dataInicial && m.data_hora <= inputsForm.dataFinal));
    setEntradasESaidas(filtro);
  }, [inputsForm]);

  return (
    <>
      <NavBar />
      <section className="container-fluid">
        <div className="row justify-content-center gap-5 mt-3">
          <div className="col-12 col-lg-5 rounded-3 shadow-sm px-4 py-2">
            <EntradaMercadoria />
            <ListaDeEntradas />
          </div>
          <div className="col-12 col-lg-5 rounded-3 shadow-sm px-4 py-2">
            <SaidaMercadoria />
            <ListaDeSaidas />
          </div>
        </div>
      </section>
      <section className="container">
        <div className="row justify-content-center mt-5 mb-2">
          <h4 className="text-center">Relatório de Entradas e Saídas</h4>
        </div>
        <div className="row justify-content-center">
          <div className="col-12 col-lg-6">
            <label htmlFor="data" className="form-label" style={{ width: '100%' }}>
              Selecione uma mercadoria e as datas para exibir o relatório
              <select
                name="mercadoria"
                className="form-control form-select"
                onChange={handleFormInputs}
                value={inputsForm.mercadoria}
                disabled={isLoading}
                required
              >
                <option name="default" value="default">Mercadorias</option>
                {mercadorias.map((mercadoria) => (
                  <option key={mercadoria.registro} value={mercadoria.id}>{mercadoria.nome}</option>
                ))}
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
        <div className="row justify-content-center mt-4">
          <div className="col-12 col-lg-5 px-4 py-2">
            <PieChart />
          </div>
          <div className="col-12 col-lg-7 px-4 py-2">
            {inputsForm.mercadoria !== 'default' && <ListaDeEntradasESaidas entradasESaidas={entradasESaidas} isLoading={isLoading} />}
          </div>
        </div>
      </section>
    </>
  );
}
