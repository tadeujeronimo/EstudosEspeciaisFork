import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import { getMenuOptions } from "../../services/menuOptionsService";
import { createOrder } from "../../services/orderService";
import graoCafe from '../../assets/imagens/grao-cafe.png';


import "./Pedidos.css";

function Pedidos() {
  const [pedido, setPedido] = useState({
    nomeCliente: "",
    itens: [],
    formaPagamento: "",
    tipoPedido: "",
    rua: "",
    numero: "",
    bairro: "",
    precisaTroco: false,
    trocoPara: "",
    observacoes: "",
  });

  const [menuItems, setMenuItems] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [categoriaAtual, setCategoriaAtual] = useState("");
  const [itemAtual, setItemAtual] = useState("");
  const [quantidadeAtual, setQuantidadeAtual] = useState(1);

  useEffect(() => {
    async function loadMenuItems() {
      try {
        const data = await getMenuOptions();
        setMenuItems(data);
      } catch (error) {
        console.error("Erro ao buscar itens do menu:", error);
      }
    }

    loadMenuItems();
  }, []);

  const handleCategoriaClick = (categoria) => {
    setCategoriaAtual(categoria);
    setItemAtual("");
    setQuantidadeAtual(1);
    setShowModal(true);
  };

  const handleAdicionarItem = () => {
    if (!itemAtual || quantidadeAtual <= 0) {
      alert("Selecione um item válido.");
      return;
    }

    const itensAtualizados = [...pedido.itens];

    const indexExistente = itensAtualizados.findIndex(
      (item) => item.nome === itemAtual && item.categoria === categoriaAtual,
    );

    if (indexExistente !== -1) {
      itensAtualizados[indexExistente].quantidade += quantidadeAtual;
    } else {
      itensAtualizados.push({
        categoria: categoriaAtual,
        nome: itemAtual,
        preco: menuItems[categoriaAtual][itemAtual],
        quantidade: quantidadeAtual,
      });
    }

    setPedido({ ...pedido, itens: itensAtualizados });
    setShowModal(false);
  };

  const calcularTotal = (itens) => {
    return itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pedido.formaPagamento || !pedido.tipoPedido) {
      alert("Preencha pagamento e tipo de pedido.");
      return;
    }

    if (
      pedido.formaPagamento === "dinheiro" &&
      pedido.precisaTroco &&
      !pedido.trocoPara
    ) {
      alert("Informe o valor para troco.");
      return;
    }

    if (pedido.tipoPedido === "entrega") {
      if (!pedido.rua || !pedido.numero || !pedido.bairro) {
        alert("Preencha o endereço completo.");
        return;
      }
    }

    const pedidoCorrigido = {
      ...pedido,
      trocoPara: pedido.precisaTroco ? Number(pedido.trocoPara) || 0 : null,
    };

    try {
      await createOrder(pedidoCorrigido);

      alert("Pedido enviado com sucesso!");

      setPedido({
        nomeCliente: "",
        itens: [],
        formaPagamento: "",
        tipoPedido: "",
        rua: "",
        numero: "",
        bairro: "",
        precisaTroco: false,
        trocoPara: "",
        observacoes: "",
      });
    } catch (error) {
      console.error("Erro ao enviar pedido:", error);
    }
  };

    const nomesCategorias = {
      cafes: 'Cafés',
      sobremesas: 'Sobremesas',
      especiais: 'Especiais',
      bebidasGeladas: 'Bebidas Geladas',
      chas: 'Chás',
    };
  

  return (
    <div className="pedidos-container">
      <div className="title">
        <h2>Faça seu pedido</h2>
        <img
          src={graoCafe}
          alt="Xícara de café"
          className="graocafe-image"
        />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome:</label>
          <input
            type="text"
            value={pedido.nomeCliente}
            onChange={(e) =>
              setPedido({ ...pedido, nomeCliente: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label>Forma de Pagamento:</label>
          <select
            value={pedido.formaPagamento}
            onChange={(e) =>
              setPedido({ ...pedido, formaPagamento: e.target.value })
            }
            required
          >
            <option value="">Selecione</option>
            <option value="dinheiro">Dinheiro</option>
            <option value="pix">Pix</option>
            <option value="debito">Débito</option>
            <option value="credito">Crédito</option>
          </select>
        </div>
        {pedido.formaPagamento === "dinheiro" && (
          <>
            <div className="form-group">
              <label>Precisa de troco?</label>
              <div className="troco-options">
                  <label>
                  <input
                    type="radio"
                    name="precisaTroco"
                    checked={pedido.precisaTroco}
                    onChange={() =>
                      setPedido({
                        ...pedido,
                        precisaTroco: true,
                      })
                    }
                  />
                  Sim
                </label>
                <label>
                  <input
                    type="radio"
                    name="precisaTroco"
                    checked={!pedido.precisaTroco}
                    onChange={() =>
                      setPedido({
                        ...pedido,
                        precisaTroco: false,
                        trocoPara: "",
                      })
                    }
                  />
                  Não
                </label>
              </div>
            </div>
            {pedido.precisaTroco && (
              <div className="form-group">
                <label>Troco para quanto?</label>
                <input
                  type="number"
                  value={pedido.trocoPara}
                  onChange={(e) =>
                    setPedido({
                      ...pedido,
                      trocoPara:
                        e.target.value === "" ? "" : Number(e.target.value),
                    })
                  }
                />
              </div>
            )}
          </>
        )}
        <div className="form-group">
          <label>Tipo de Pedido:</label>
          <select
            value={pedido.tipoPedido}
            onChange={(e) =>
              setPedido({ ...pedido, tipoPedido: e.target.value })
            }
            required
          >
            <option value="">Selecione</option>
            <option value="retirada">Retirada</option>
            <option value="entrega">Entrega</option>
          </select>
        </div>
        {pedido.tipoPedido === "entrega" && (
          <>
            <div className="form-group">
              <label>Rua:</label>
              <input
                type="text"
                value={pedido.rua}
                onChange={(e) => setPedido({ ...pedido, rua: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Número:</label>
              <input
                type="text"
                value={pedido.numero}
                onChange={(e) =>
                  setPedido({ ...pedido, numero: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Bairro:</label>
              <input
                type="text"
                value={pedido.bairro}
                onChange={(e) =>
                  setPedido({ ...pedido, bairro: e.target.value })
                }
              />
            </div>
          </>
        )}
        <div className="form-group">
          <label>Observações:</label>
          <textarea
            value={pedido.observacoes}
            onChange={(e) =>
              setPedido({ ...pedido, observacoes: e.target.value })
            }
            className="textarea"
          />
        </div>
        <div className="menu-category-list">
          {Object.keys(menuItems).map((categoria) => (
            <Button
              key={categoria}
              onClick={() => handleCategoriaClick(categoria)}
            >
              {nomesCategorias[categoria] || categoria}
            </Button>
          ))}
        </div>
        <div className="order-items">
          <h3>Seu Pedido:</h3>
          {pedido.itens.length === 0 ? (
            <p>Nenhum item adicionado</p>
          ) : (
            <ul>
              {pedido.itens.map((item, index) => (
                <li key={index}>
                  {item.nome} ({item.categoria}) x{item.quantidade} - R${" "}
                  {(item.preco * item.quantidade).toFixed(2)}
                  <button
                    type="button"
                    onClick={() => {
                      const novosItens = pedido.itens.filter(
                        (_, i) => i !== index,
                      );
                      setPedido({ ...pedido, itens: novosItens });
                    }}
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <h3>Total: R$ {calcularTotal(pedido.itens).toFixed(2)}</h3>
        <button type="submit">Enviar Pedido</button>
      </form>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-plus-circle me-2"></i>
            Adicionar Item
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="px-4 py-3">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Produto</Form.Label>
              <Form.Select
                value={itemAtual}
                onChange={(e) => setItemAtual(e.target.value)}
              >
                <option value="">Selecione um item</option>

                {Object.keys(menuItems[categoriaAtual] || {}).map((item) => (
                  <option key={item} value={item}>
                    {item} - R$ {menuItems[categoriaAtual][item].toFixed(2)}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group>
              <Form.Label>Quantidade</Form.Label>
              <Form.Control
                type="number"
                value={quantidadeAtual}
                onChange={(e) =>
                  setQuantidadeAtual(parseInt(e.target.value) || 1)
                }
                min="1"
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer className="border-0 px-4 pb-4">
          <Button
            variant="outline-secondary"
            onClick={() => setShowModal(false)}
          >
            Cancelar
          </Button>

          <Button
            variant="success"
            onClick={handleAdicionarItem}
            disabled={!itemAtual}
            style={{
              backgroundColor: '#8B4513',
              borderColor: '#8B4513'
            }}
          >
            Adicionar ao Pedido
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Pedidos;
