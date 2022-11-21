import React, { useState, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Axios from '../services/axios';
import showToast from '../services/toastr';
import AppContext from '../context/AppContext';

export default function AdicionaFabricante() {
  const [show, setShow] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleShow = () => setShow(true);

  const handleClose = () => setShow(false);

  const { currentUser, update, setUpdate } = useContext(AppContext);

  const INITIAL_STATE = {
    nome: '',
    criado_por: currentUser.id,
    atualizado_por: currentUser.id,
  };

  const [inputsForm, setInputsForm] = useState(INITIAL_STATE);

  const handleFormInputs = (event) => {
    const { target } = event;
    return setInputsForm((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const addNewFabricante = async (event) => {
    event.preventDefault();
    await Axios.post('/fabricantes', inputsForm)
      .then(() => {
        showToast('success', 'Novo fabricante adicionado');
        setIsLoading(false);
        setUpdate(!update);
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
        Adicionar Fabricante
      </button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header>
          <Modal.Title>
            <i className="fa-solid fa-circle-plus me-2" />
            Adicionar Fabricante
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={addNewFabricante}>
            <div className="row justify-content-center my-2">
              <div className="col-lg-12">
                <label htmlFor="local" className="form-label" style={{ width: '100%' }}>
                  <div className="input-group">
                    <span className="input-group-text text-secondary">
                      <i className="fa-solid fa-building" />
                    </span>
                    <input
                      type="text"
                      name="nome"
                      value={inputsForm.name}
                      placeholder="Nome do Fabricante"
                      className="form-control"
                      onChange={handleFormInputs}
                      required
                    />
                  </div>
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
