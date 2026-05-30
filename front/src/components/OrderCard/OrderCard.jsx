export default function OrderCard({ pedido, atualizarStatus }) {
  return (
    <div className={`card ${pedido.status?.toLowerCase() || "pendente"}`}>
      <div className="card-header">
        <h3>Pedido #{pedido.id}</h3>
        <span className={`badge ${pedido.status?.toLowerCase()}`}>
          {pedido.status || "Pendente"}
        </span>
      </div>
      <p>
        <strong>Cliente:</strong> {pedido.nomeCliente}
      </p>
      <p>
        <strong>Mesa:</strong> {pedido.numeroMesa}
      </p>
      <p>
        <strong>Pagamento:</strong> {pedido.formaPagamento || "Não informado"}
      </p>
      <p>
        <strong>Tipo:</strong> {pedido.tipoPedido || "Não informado"}
      </p>
      {pedido.tipoPedido === "entrega" && (
        <p>
          <strong>Endereço:</strong> {pedido.rua}, {pedido.numero} -{" "}
          {pedido.bairro}
        </p>
      )}
      {pedido.formaPagamento === "dinheiro" && pedido.precisaTroco && (
        <p>
          <strong>Troco para:</strong> R$ {pedido.trocoPara}
        </p>
      )}
      {pedido.observacoes && (
        <p>
          <strong>Obs:</strong> {pedido.observacoes}
        </p>
      )}
      <ul className="items">
        {Array.isArray(pedido.itens) &&
          pedido.itens.map((item, i) => (
            <li key={i}>
              {item.name}
              <span>x{item.quantity}</span>
            </li>
          ))}
      </ul>
      <p className="total">
        Total: <strong>R$ {pedido.precoTotal?.toFixed(2)}</strong>
      </p>
      {(pedido.status || "Pendente") === "Pendente" && (
        <div className="actions">
          <button onClick={() => atualizarStatus(pedido.id, "Concluído")}>
            Concluir
          </button>
          <button
            className="cancel"
            onClick={() => atualizarStatus(pedido.id, "Cancelado")}
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
}
