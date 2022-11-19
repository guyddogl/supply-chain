import React from 'react';
import NavBar from '../components/NavBar';
import AdicionaFabricante from '../components/AdicionaFabricante';

export default function Fabricantes() {
  return (
    <>
      <NavBar />
      <section className="container">
        <AdicionaFabricante />
      </section>
    </>
  );
}
