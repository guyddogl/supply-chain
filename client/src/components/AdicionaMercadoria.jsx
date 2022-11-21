import React, { useState, useContext, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Axios from '../services/axios';
import showToast from '../services/toastr';
import AppContext from '../context/AppContext';
import gerarRegistro from '../utils/gerarRegistro';

export default function AdicionaMercadoria() {
  const [show, setShow] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleShow = () => setShow(true);

  const handleClose = () => setShow(false);

  const { currentUser, update, setUpdate } = useContext(AppContext);

  const INITIAL_STATE = {
    nome: '',
    registro: '',
    criado_por: currentUser.id,
    atualizado_por: currentUser.id,
  };

  const [inputsForm, setInputsForm] = useState(INITIAL_STATE);

  const [fabricantes, setFabricantes] = useState([]);

  const handleFormInputs = (event) => {
    const { target } = event;
    return setInputsForm((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

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

  const addNewMercadoria = async (event) => {
    event.preventDefault();
    await Axios.post('/mercadorias', inputsForm)
      .then(() => {
        showToast('success', 'Mercadoria adicionada');
        setIsLoading(false);
        setUpdate(!update);
        setInputsForm({ ...INITIAL_STATE, registro: gerarRegistro(16) });
        handleClose();
      })
      .catch((err) => {
        showToast('error', err.response.data);
        setIsLoading(false);
      });
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-md btn-light my-3"
        onClick={handleShow}
      >
        <i className="fa-solid fa-circle-plus me-2" />
        Adicionar Mercadoria
      </button>
      <Modal
        show={show}
        size="lg"
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header>
          <Modal.Title>
            <i className="fa-solid fa-circle-plus me-2" />
            Adicionar Mercadoria
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={addNewMercadoria}>
            <div className="row justify-content-center my-2">
              <div className="col-12 col-lg-4">
                <label htmlFor="nome" className="form-label" style={{ width: '100%' }}>
                  <input
                    type="text"
                    name="nome"
                    value={inputsForm.nome}
                    placeholder="Nome"
                    className="form-control"
                    onChange={handleFormInputs}
                    disabled={isLoading}
                    required
                  />
                </label>
              </div>
              <div className="col-12 col-lg-4">
                <label htmlFor="tipo" className="form-label" style={{ width: '100%' }}>
                  <input
                    type="text"
                    name="tipo"
                    value={inputsForm.tipo}
                    placeholder="Tipo"
                    className="form-control"
                    onChange={handleFormInputs}
                    disabled={isLoading}
                    required
                  />
                </label>
              </div>
              <div className="col-12 col-lg-4">
                <select
                  name="fabricante"
                  className="form-control form-select"
                  onChange={handleFormInputs}
                  value={inputsForm.fabricante}
                  disabled={isLoading}
                  required
                >
                  <option name="default" value="">Fabricante</option>
                  {fabricantes.map((fabricante) => (
                    <option key={fabricante.id} value={fabricante.id}>{fabricante.nome}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row justify-content-center my-2">
              <div className="col-12">
                <label htmlFor="descricao" className="form-label" style={{ width: '100%' }}>
                  <textarea
                    type="text"
                    name="descricao"
                    value={inputsForm.descricao}
                    placeholder="Descrição"
                    className="form-control"
                    onChange={handleFormInputs}
                    style={{ resize: 'none' }}
                    rows="7"
                    disabled={isLoading}
                    required
                  />
                </label>
              </div>
            </div>
            {isLoading ? (
              <div className="d-grid gap-2 d-flex justify-content-md-end mt-3">
                <button
                  type="button"
                  className="btn btn-md btn-outline-secondary mx-1 my-3"
                  style={{ minWidth: '140px' }}
                  disabled
                >
                  <i className="fa-solid fa-xmark me-2" />
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-md btn-secondary mx-1 my-3"
                  style={{ minWidth: '140px' }}
                  disabled
                >
                  <span className="spinner-border spinner-border-sm me-2" />
                  Salvando
                </button>
              </div>
            ) : (
              <div className="d-grid gap-2 d-flex justify-content-md-end mt-3">
                <button
                  type="button"
                  className="btn btn-md btn-outline-secondary mx-1 my-3"
                  style={{ minWidth: '140px' }}
                  onClick={handleClose}
                >
                  <i className="fa-solid fa-xmark me-2" />
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn btn-md btn-secondary mx-1 my-3"
                  style={{ minWidth: '140px' }}
                >
                  <i className="fa-regular fa-floppy-disk me-2" />
                  Salvar
                </button>
              </div>
            )}
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
