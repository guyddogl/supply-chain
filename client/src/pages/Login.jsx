import React from 'react';
import LoginForm from '../components/LoginForm';

export default function Login() {

  return (
    <main style={{ background: '#f1f1f1' }}>
    <section className="container-fluid">
      <div className="row justify-content-center align-items-center h100">
        <LoginForm />
      </div>
    </section>
  </main>
  )
}
