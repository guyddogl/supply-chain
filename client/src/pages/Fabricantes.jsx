import React from 'react';
import NavBar from '../components/NavBar';
import AdicionaFabricante from '../components/AdicionaFabricante';
import ListaDeFabricantes from '../components/ListaDeFabricantes';

export default function Fabricantes() {
  return (
    <>
      <NavBar />
      <section className="container">
        <AdicionaFabricante />
        <ListaDeFabricantes />
      </section>
    </>
  );
}
