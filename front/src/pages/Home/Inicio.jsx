import React from 'react';
import './Inicio.css';
import { useNavigate } from 'react-router-dom';

function Inicio() {

 const navigate = useNavigate();

  return (
    <>
      <section className="inicio d-flex align-items-center justify-content-center">
        <div className="container">
          <h5 className="subtitle">Café e restaurante desde 2025</h5>
          <h1 className="title">Mais que café, uma experiência para os sentidos.</h1>
          <div className="button-container">
            <button className="button" onClick={() => navigate('/pedidos')}>
              Fazer pedido
            </button>
            <button className="button" onClick={() => navigate('/cardapio')}>
              Menu
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Inicio;
