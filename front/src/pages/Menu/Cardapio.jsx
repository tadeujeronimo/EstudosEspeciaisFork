import React, { useEffect, useState } from 'react';
import { getMenuItemsByCategory } from '../../services/menuCategoriesService';

import './Cardapio.css';
import bannerCafe from '../../assets/imagens/banner-cafe.png';

function Cardapio() {

  const [menuItems, setMenuItems] = useState({
    cafes: [],
    sobremesas: [],
    especiais: [],
    bebidasGeladas: [],
    chas: [],
  });

  useEffect(() => {
    async function loadMenuItems() {
      const data = await getMenuItemsByCategory();
      setMenuItems(data);
    }

    loadMenuItems();
  }, []);


  const renderSection = (titulo, items) => (
    <section className="menu-section">
      <h2>{titulo}</h2>

      <div className="menu-grid">
        {items.map((item) => (
          <div key={item.id} className="menu-item">
            <h3>{item.nome}</h3>
            <p>
              {item.descricao || 'Descrição do produto'}
            </p>
            <span>
              R$ {(item.preco || 0).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="cardapio-page">
      <div className="hero-menu">
        <h1>Nosso Menu</h1>
        <p> Conheça nossos cafés especiais, sobremesas e bebidas.</p>
      </div>
      <img
        src={bannerCafe}
        alt="Xícara de café"
        className="bannercafe-image"
      />
      <section className="menu-content">
        {renderSection('Cafés', menuItems.cafes)}
        {renderSection('Sobremesas', menuItems.sobremesas)}
        {renderSection('Especiais', menuItems.especiais)}
        {renderSection('Bebidas Geladas', menuItems.bebidasGeladas)}
        {renderSection('Chás', menuItems.chas)}
      </section>
    </div>
  );
}

export default Cardapio;
