import { API_BASE } from './api';

export async function buscarPedidos() {
  const token = localStorage.getItem('auth');
  const res = await fetch(`${API_BASE}/api/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const data = await res.json();

  if (!Array.isArray(data)) {
    return [];
  }

  return data;
}

export async function atualizarStatusPedido(id, status) {
  const token = localStorage.getItem('auth');
  const res = await fetch(`${API_BASE}/api/dashboard/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    throw new Error('Erro ao atualizar status');
  }

  return res.json();
}