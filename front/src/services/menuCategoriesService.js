import { getMenuItems } from './menuService';

export async function getMenuItemsByCategory() {
  const data = await getMenuItems();

  const categories = {
    cafes: [],
    sobremesas: [],
    especiais: [],
    bebidasGeladas: [],
    chas: [],
  };

  data.forEach((item) => {
    if (categories[item.categoria]) {
      categories[item.categoria].push(item);
    }
  });

  return categories;
}