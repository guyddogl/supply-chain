import React, { useState, useContext, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Axios from '../services/axios';
import showToast from '../services/toastr';
import AppContext from '../context/AppContext';

export default function EntradaMercadoria() {
  const [show, setShow] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleShow = () => setShow(true);

  const handleClose = () => setShow(false);

  const { currentUser, update, setUpdate } = useContext(AppContext);

  const INITIAL_STATE = {
    criado_por: currentUser.id,
    atualizado_por: currentUser.id,
  };

  const [inputsForm, setInputsForm] = useState(INITIAL_STATE);

  const [mercadorias, setMercadorias] = useState([]);

  const handleFormInputs = (event) => {
    const { target } = event;
    return setInputsForm((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  useEffect(() => {
    setIsLoading(true);
    const getAllFabricantes = async () => {
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
    getAllFabricantes();
  }, [update]);

  const addNewMercadoria = async (event) => {
    event.preventDefault();
    await Axios.post('/entradas', inputsForm)
      .then(() => {
        showToast('success', 'Entrada de mercadoria concluída');
        setIsLoading(false);
        setUpdate(!update);
        setInputsForm(INITIAL_STATE);
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
        className="btn btn-md btn-outline-success my-3"
        onClick={handleShow}
      >
        <i className="fa-solid fa-circle-plus me-2" />
        Cadastrar Entrada
      </button>
      <Modal
        show={show}
        size="md"
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header>
          <Modal.Title>
            <i className="fa-solid fa-circle-plus text-success me-2" />
            Entrada de Mercadoria
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={addNewMercadoria}>
            <div className="row justify-content-center my-2">
              <div className="col-12 col-lg-8">
                <select
                  name="mercadoria"
                  className="form-control form-select"
                  onChange={handleFormInputs}
                  value={inputsForm.mercadoria}
                  disabled={isLoading}
                  required
                >
                  <option name="default" value="">Selecione a Mercadoria</option>
                  {mercadorias.map((mercadoria) => (
                    <option key={mercadoria.id} value={mercadoria.id}>{mercadoria.nome}</option>
                  ))}
                </select>
              </div>
              <div className="col-12 col-lg-4">
                <label htmlFor="quantidade" className="form-label" style={{ width: '100%' }}>
                  <input
                    type="number"
                    name="quantidade"
                    min="1"
                    value={inputsForm.quantidade}
                    placeholder="Quantidade"
                    className="form-control"
                    onChange={handleFormInputs}
                    disabled={isLoading}
                    required
                  />
                </label>
              </div>
            </div>
            <div className="row justify-content-center my-2">
              <div className="col-12 col-lg-7">
                <label htmlFor="local" className="form-label" style={{ width: '100%' }}>
                  <input
                    type="text"
                    name="local"
                    value={inputsForm.local}
                    placeholder="Local"
                    className="form-control"
                    onChange={handleFormInputs}
                    disabled={isLoading}
                    required
                  />
                </label>
              </div>
              <div className="col-12 col-lg-5">
                <label htmlFor="data" className="form-label" style={{ width: '100%' }}>
                  <input
                    type="datetime-local"
                    name="data"
                    value={inputsForm.data}
                    className="form-control"
                    onChange={handleFormInputs}
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
                  className="btn btn-md btn-success mx-1 my-3"
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
                  className="btn btn-md btn-success mx-1 my-3"
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
