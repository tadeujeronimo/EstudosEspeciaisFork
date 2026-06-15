import { useEffect, useState } from 'react';
import { buscarPedidos, atualizarStatusPedido } from '../../services/dashboardService';
import OrderCard from '../../components/OrderCard/OrderCard';

import './Dashboard.css';

function Dashboard() {
  const [pedidos, setPedidos] = useState([]);

  const carregarPedidos = async () => {
    try {
      const data = await buscarPedidos();
      setPedidos(data);
    } catch (error) {
      console.error('Erro ao buscar pedidos', error);
      setPedidos([]);
    }
  };

  useEffect(() => {
    carregarPedidos();
    const interval = setInterval(carregarPedidos, 5000);
    return () => clearInterval(interval);
  }, []);

  const atualizarStatus = async (id, novoStatus) => {
    try {
      await atualizarStatusPedido(id, novoStatus);
      carregarPedidos();
    } catch (error) {
      console.error('Erro ao atualizar status', error);
    }
  };

  const pendentes = pedidos.filter(
    (p) => (p.status || 'Pendente') === 'Pendente',
  );

  const concluidos = pedidos.filter((p) => p.status === 'Concluído');
  const cancelados = pedidos.filter((p) => p.status === 'Cancelado');
  const hoje = new Date().toDateString();

  const pedidosHoje = pedidos.filter(
    (p) => new Date(p.criadoEm).toDateString() === hoje,
  );

  const totalHoje = pedidosHoje
    .filter((p) => p.status === 'Concluído')
    .reduce((acc, p) => acc + (p.precoTotal || 0), 0);

  const totalPedidos = pedidosHoje.length || 1;
  const porcentagemConcluidos = (concluidos.length / totalPedidos) * 100;
  const porcentagemCancelados = (cancelados.length / totalPedidos) * 100;

  return (
    <div className="dashboard">
      <header className="topbar">
        <h2>Painel Administrativo</h2>
        <button
          onClick={() => {
            localStorage.removeItem('auth');
            window.location.href = '/admin/login';
          }}
        >
          Sair
        </button>
      </header>
      <div className="stats">
        <div className="stat-card">
          <h4>Pendentes</h4>
          <p>{pendentes.length}</p>
        </div>
        <div className="stat-card">
          <h4>Concluídos</h4>
          <p>{concluidos.length}</p>
        </div>
        <div className="stat-card">
          <h4>Cancelados</h4>
          <p>{cancelados.length}</p>
        </div>
        <div className="stat-card">
          <h4>Faturamento Hoje</h4>
          <p>R$ {totalHoje.toFixed(2)}</p>
        </div>
      </div>
      <div className="progress">
        <div
          className="progress-bar concluido"
          style={{ width: `${porcentagemConcluidos}%` }}
        />
        <div
          className="progress-bar cancelado"
          style={{ width: `${porcentagemCancelados}%` }}
        />
      </div>
      <div className="kanban">
        <div className="column">
          <h2>🕒 Pendentes</h2>
          <div className="column-cards">
          {pendentes.map((pedido) => (
            <OrderCard
              key={pedido.id}
              pedido={pedido}
              atualizarStatus={atualizarStatus}
            />
          ))}
        </div>
        </div>
        <div className="column">
          <h2>✅ Concluídos</h2>
          <div className="column-cards">
            {pendentes.map((pedido) => (
              <OrderCard
                key={pedido.id}
                pedido={pedido}
                atualizarStatus={atualizarStatus}
              />
            ))}
          </div>
        </div>
        <div className="column">
          <h2>❌ Cancelados</h2>
          <div className="column-cards">
            {pendentes.map((pedido) => (
              <OrderCard
                key={pedido.id}
                pedido={pedido}
                atualizarStatus={atualizarStatus}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard