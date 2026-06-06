import { getMenuItems } from './menuService';

export async function getMenuOptions() {
  const data = await getMenuItems();

  const categorias = {
    cafes: {},
    sobremesas: {},
    especiais: {},
    bebidasGeladas: {},
    chas: {},
  };

  data.forEach((item) => {
    if (categorias[item.categoria]) {
      categorias[item.categoria][item.nome] = item.preco;
    }
  });

  return categorias;
}