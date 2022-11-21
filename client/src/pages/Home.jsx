import React from 'react';
import NavBar from '../components/NavBar';
import EntradaMercadoria from '../components/EntradaMercadoria';
import ListaDeEntradas from '../components/ListaDeEntradas';
import SaidaMercadoria from '../components/SaidaMercadoria';
import ListaDeSaidas from '../components/ListaDeSaidas';

export default function Home() {
  return (
    <>
      <NavBar />
      <section className="container">
        <div className="row">
          <div className="col-12 col-lg-6">
            <EntradaMercadoria />
            <ListaDeEntradas />
          </div>
          <div className="col-12 col-lg-6">
            <SaidaMercadoria />
            <ListaDeSaidas />
          </div>
        </div>
      </section>
    </>
  );
}
