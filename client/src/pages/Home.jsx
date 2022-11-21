import React from 'react';
import NavBar from '../components/NavBar';
import EntradaMercadoria from '../components/EntradaMercadoria';

export default function Home() {
  return (
    <>
      <NavBar />
      <section className="container">
        <EntradaMercadoria />
      </section>
    </>
  );
}
