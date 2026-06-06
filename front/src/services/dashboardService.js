export async function buscarPedidos() {
  const res = await fetch('http://localhost:3000/api/dashboard');
  const data = await res.json();

  if (!Array.isArray(data)) {
    return [];
  }

  return data;
}

export async function atualizarStatusPedido(id, status) {
  const res = await fetch(`http://localhost:3000/api/dashboard/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    throw new Error('Erro ao atualizar status');
  }

  return res.json();
}