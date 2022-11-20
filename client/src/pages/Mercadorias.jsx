import React from 'react';
import NavBar from '../components/NavBar';
import AdicionaMercadoria from '../components/AdicionaMercadoria';
import ListaDeMercadorias from '../components/ListaDeMercadorias';

export default function Mercadorias() {
  return (
    <>
      <NavBar />
      <section className="container">
        <AdicionaMercadoria />
        <ListaDeMercadorias />
      </section>
    </>
  );
}
