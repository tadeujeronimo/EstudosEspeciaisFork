export async function loginAdmin(email, senha) {
  const res = await fetch('http://localhost:4000/api/admin/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      senha,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Erro no login');
  }

  return data;
}