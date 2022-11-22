import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './assets/css/global.css';
import 'toastr/build/toastr.min.css';
import ProtectedRoutes from './components/ProtectedRoutes';
import Login from './pages/Login';
import Home from './pages/Home';
import Fabricantes from './pages/Fabricantes';
import Mercadorias from './pages/Mercadorias';
import Relatorios from './pages/Relatorios';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoutes component={Home} />} />
      <Route path="/fabricantes" element={<ProtectedRoutes component={Fabricantes} />} />
      <Route path="/mercadorias" element={<ProtectedRoutes component={Mercadorias} />} />
      <Route path="/relatorios" element={<ProtectedRoutes component={Relatorios} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
