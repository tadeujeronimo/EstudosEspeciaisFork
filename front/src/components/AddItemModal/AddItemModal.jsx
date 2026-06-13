import React, { useState, useEffect, useRef } from 'react';
import { addMenuItem } from '../../services/menuService';
import './AddItemModal.css';

function AddItemModal({ isOpen, onClose, onItemAdded }) {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState('cafes');
  const [imagem, setImagem] = useState(null);
  const [imagemPreview, setImagemPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);

  const firstInputRef = useRef(null);

  // Focus the first input when modal opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        if (firstInputRef.current) {
          firstInputRef.current.focus();
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Clean up object URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (imagemPreview) {
        URL.revokeObjectURL(imagemPreview);
      }
    };
  }, [imagemPreview]);

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (imagemPreview) {
      URL.revokeObjectURL(imagemPreview);
      setImagemPreview(null);
    }

    if (file) {
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setErro('O arquivo de imagem deve ter no máximo 5MB.');
        setImagem(null);
        return;
      }
      // Validate mime type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setErro('Formato de imagem não suportado. Use JPEG, PNG ou WebP.');
        setImagem(null);
        return;
      }

      setErro('');
      setImagem(file);
      setImagemPreview(URL.createObjectURL(file));
    } else {
      setImagem(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro('');

    const token = localStorage.getItem('auth');
    if (!token) {
      setErro('Sessão expirada. Faça login novamente.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('preco', preco);
    formData.append('categoria', categoria);
    if (imagem) {
      formData.append('imagem', imagem);
    }

    try {
      await addMenuItem(formData, token);
      setSucesso(true);
      if (onItemAdded) {
        onItemAdded();
      }
      setTimeout(() => {
        // Reset states and close
        setNome('');
        setPreco('');
        setCategoria('cafes');
        setImagem(null);
        if (imagemPreview) {
          URL.revokeObjectURL(imagemPreview);
          setImagemPreview(null);
        }
        setSucesso(false);
        onClose();
      }, 1500);
    } catch (error) {
      console.error(error);
      const errMsg = error.response?.data?.message || 'Erro ao adicionar item ao cardápio.';
      setErro(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Fechar"
        >
          &times;
        </button>
        <h2>Novo Item</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="item-nome">Nome</label>
            <input
              id="item-nome"
              ref={firstInputRef}
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              placeholder="Ex: Café Mocha"
              disabled={loading || sucesso}
            />
          </div>

          <div className="form-group">
            <label htmlFor="item-preco">Preço (R$)</label>
            <input
              id="item-preco"
              type="number"
              step="0.01"
              min="0"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              required
              placeholder="0.00"
              disabled={loading || sucesso}
            />
          </div>

          <div className="form-group">
            <label htmlFor="item-categoria">Categoria</label>
            <select
              id="item-categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              required
              disabled={loading || sucesso}
            >
              <option value="cafes">Cafés</option>
              <option value="sobremesas">Sobremesas</option>
              <option value="especiais">Especiais</option>
              <option value="bebidasGeladas">Bebidas Geladas</option>
              <option value="chas">Chás</option>
            </select>
          </div>

          <div className="form-group">
            <label>Imagem</label>
            <label htmlFor="item-imagem" className="file-upload-label">
              <span className="upload-icon">📷</span>
              <span className="upload-text">
                {imagem ? imagem.name : 'Selecionar Imagem (JPEG, PNG, WebP)'}
              </span>
            </label>
            <input
              id="item-imagem"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
              disabled={loading || sucesso}
              style={{ display: 'none' }}
            />
            {imagemPreview && (
              <img
                src={imagemPreview}
                alt="Pré-visualização do item"
                className="image-preview"
              />
            )}
          </div>

          {erro && <p className="modal-error" role="alert">{erro}</p>}
          {sucesso && <p className="modal-success" role="status">Item adicionado com sucesso!</p>}

          <button
            type="submit"
            className="modal-submit-btn"
            disabled={loading || sucesso}
          >
            {loading ? 'Adicionando...' : 'Adicionar Item'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddItemModal;
