import React, {useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/img/logox64.png';
import AppContext from '../context/AppContext';
import Axios from '../services/axios';
import { showToast } from '../services/toastr';

export default function Login() {
  const INITIAL_STATE = {username: '', password: ''};

  const [inputsLoginForm, setInputsLoginForm] = useState(INITIAL_STATE);

  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const { setIsUserLoggedIn, setCurrentUser } = useContext(AppContext);

  const navigate = useNavigate();

  const handleFormInputs = ({ target }) => {
    setInputsLoginForm((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  useEffect(() => {
    const validateRequiredFormInputs = () => {
      const usernanme = inputsLoginForm.username.length >= 5;
      const password = inputsLoginForm.password.length >= 5;
      return !(usernanme && password);
    };
    setIsLoginButtonDisabled(validateRequiredFormInputs());
  }, [inputsLoginForm]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    await Axios.get(`/usuarios/${inputsLoginForm.username}`, { body: { password: inputsLoginForm.password}})
    .then((response) => {
      if (response.status === 200) {
        setCurrentUser(response.data);
        setIsUserLoggedIn(true);
        showToast('success', 'Login realizado com sucesso');
        setIsLoading(false);
        navigate('/');
      }
    })
    .catch((err) => {
      showToast('error', err.response.data);
      setIsLoading(false);
    });
  }

  return (
        <form
          onSubmit={handleSubmit}
          className="col-10 col-md-6 col-lg-4 rounded-3 p-4 shadow-sm"
          style={{ maxWidth: '350px', background: 'white' }}
        >
          <img
            src={logo}
            className="img-fluid mx-auto d-block mb-4"
            alt="Supply Chain"
            style={{ maxWidth: '80px' }}
          />
          <div className="input-group mb-3">
            <span className="input-group-text text-secondary">
              <i className="fa-solid fa-envelope" />
            </span>
            <input
              type="username"
              name="username"
              value={inputsLoginForm.username}
              placeholder="username"
              className="form-control"
              onChange={handleFormInputs}
              required
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text text-secondary">
              <i className="fa-solid fa-key" />
            </span>
            <input
              type="password"
              name="password"
              value={inputsLoginForm.password}
              placeholder="password"
              className="form-control"
              onChange={handleFormInputs}
              required
            />
          </div>
          {isLoading
            ? (
              <button className="btn btn-primary d-block mx-auto mt-4 form-control" type="button" disabled>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                Acessando...
              </button>
            )
            : (
              <button
                type="submit"
                className={
          `btn btn-md btn-primary d-block mx-auto mt-4 form-control
          ${isLoginButtonDisabled && 'btn-secondary disabled'}`
        }
                disabled={isLoginButtonDisabled}
              >
                Acessar
              </button>
            )}
        </form>
  )
}
