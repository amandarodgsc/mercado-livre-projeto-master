import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import InputMask from 'react-input-mask'; 
import * as Yup from 'yup'; 
import './Cadastrarcep.css'; 
import CepValidator from '../validators/CepValidator';

const validationSchema = Yup.object().shape({
  endereco: Yup.string().required('Endereço é obrigatório'),
  complemento: Yup.string().optional(),
}).concat(CepValidator);

function CadastrarCep() {
  const [formData, setFormData] = useState({
    endereco: '',
    numero: '',
    complemento: '',
    cep: '',
    estado: '',
    cidade: '',
  });
  const [enderecos, setEnderecos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [errors, setErrors] = useState({});
  const [selectedEndereco, setSelectedEndereco] = useState(null);
  const [isAddressSaved, setIsAddressSaved] = useState(false);
  const [frete, setFrete] = useState(null);
  const [error, setError] = useState('');
  const [mostrarFrete, setMostrarFrete] = useState(false);
  const navigate = useNavigate();

  // Buscar os itens do carrinho do localStorage
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedEnderecos = JSON.parse(localStorage.getItem('enderecos')) || [];
    setEnderecos(storedEnderecos);
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart); // Carrega o carrinho do localStorage
  }, []);

  // Função para calcular o total do carrinho
  const calculateTotal = (cartItems) => {
    return cartItems
      .reduce((acc, item) => acc + (typeof item.price === 'number' ? item.price : 0), 0)
      .toFixed(2);  // Garantir que o valor total seja um número fixado com 2 casas decimais
  };
  

  const validateForm = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const newErrors = {};
      err.inner.forEach(error => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validateForm();
    if (!isValid) return;

    let updatedEnderecos;

    if (isEditing) {
      updatedEnderecos = enderecos.map((endereco, index) =>
        index === editIndex ? formData : endereco
      );
      setIsEditing(false);
      setEditIndex(null);
    } else {
      updatedEnderecos = [...enderecos, formData];
      setIsAddressSaved(true);
    }

    setEnderecos(updatedEnderecos);
    localStorage.setItem('enderecos', JSON.stringify(updatedEnderecos));
    setFormData({ endereco: '', numero: '', complemento: '', cep: '', estado: '', cidade: '' });
    setMostrarFrete(false); // Esconde o frete ao cadastrar
  };

  const buscarEndereco = async () => {
    const cepFormatado = formData.cep.replace(/[-.]/g, '');
    if (cepFormatado.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cepFormatado}/json/`);
        const data = await response.json();

        if (!data.erro) {
          setFormData(prevData => ({
            ...prevData,
            endereco: data.logradouro,
            estado: data.uf,
            cidade: data.localidade,
          }));
          calcularFrete(); // Chama a função para calcular o frete
          setMostrarFrete(true); // Mostra o frete
          setError('');
        } else {
          setError('CEP inválido!');
          setFrete(null);
          setMostrarFrete(false); // Esconde o frete se o CEP for inválido
        }
      } catch (error) {
        setError('Erro ao buscar o CEP. Tente novamente.');
        setFrete(null);
        setMostrarFrete(false); // Esconde o frete se ocorrer erro
      }
    } else {
      setError('Por favor, insira um CEP válido.');
      setMostrarFrete(false); // Esconde o frete se o CEP for inválido
    }
  };

  const calcularFrete = () => {
    // Baseia o valor do frete no estado do endereço, por exemplo:
    let valorFrete = 10.00; // Valor base
    if (formData.estado === "SP") {
      valorFrete = 15.00; // Ajusta o frete conforme a localidade
    } else if (formData.estado === "RJ") {
      valorFrete = 12.00;
    }
    setFrete(valorFrete);
  };

  const handleSelectEndereco = (e) => {
    const selected = enderecos[e.target.value];
    setSelectedEndereco(selected);
  };

  const handleEdit = (index) => {
    setFormData(enderecos[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    if (window.confirm("Tem certeza que deseja excluir?")) {
      const updatedEnderecos = enderecos.filter((_, i) => i !== index);
      setEnderecos(updatedEnderecos);
      localStorage.setItem('enderecos', JSON.stringify(updatedEnderecos));
    }
  };

  return (
    <div>
    <header role="banner" data-siteid="MLB" className="nav-header nav-header-lite">
      <div className="nav-bounds">
        <a className="nav-logo" href="//www.mercadolivre.com.br">
          <img src="https://http2.mlstatic.com/frontend-assets/ui-navigation/5.21.11/mercadolibre/logo__large_plus@2x.png" alt="Logo Mercado Livre" className="logo-image" />
        </a>
      </div>
    </header>
    
      <div className="cadastro-cep-container">
        <div className="cards-container">
          <div className="card">
            <h1>{isEditing ? "Editar Endereço" : "Cadastrar Endereço"}</h1>
            <form className="cadastro-cep-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="endereco">Endereço</label>
                <input
                  type="text"
                  id="endereco"
                  name="endereco"
                  required
                  placeholder="Digite seu endereço"
                  value={formData.endereco}
                  onChange={handleChange}
                  className={errors.endereco ? 'input-error' : ''}
                />
                {errors.endereco && <p className="error">{errors.endereco}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="numero">Número</label>
                <input
                  type="text"
                  id="numero"
                  name="numero"
                  required
                  placeholder="Digite o número"
                  value={formData.numero}
                  onChange={handleChange}
                  className={errors.numero ? 'input-error' : ''}
                />
                {errors.numero && <p className="error">{errors.numero}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="complemento">Complemento</label>
                <input
                  type="text"
                  id="complemento"
                  name="complemento"
                  placeholder="Digite o complemento (opcional)"
                  value={formData.complemento}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="cep">CEP</label>
                <InputMask
                  mask="99999-999"
                  id="cep"
                  name="cep"
                  required
                  placeholder="Digite seu CEP"
                  value={formData.cep}
                  onChange={handleChange}
                  className={errors.cep ? 'input-error' : ''}
                />
                {errors.cep && <p className="error">{errors.cep}</p>}
                <button
                  type="button" // Altera para button para evitar submit
                  className="btn-buscar"
                  onClick={buscarEndereco}
                >
                  Buscar Endereço
                </button>
              </div>

              <div className="form-group">
                <label htmlFor="estado">Estado</label>
                <input
                  type="text"
                  id="estado"
                  name="estado"
                  required
                  placeholder="Digite seu estado"
                  value={formData.estado}
                  onChange={handleChange}
                  className={errors.estado ? 'input-error' : ''}
                />
                {errors.estado && <p className="error">{errors.estado}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="cidade">Cidade</label>
                <input
                  type="text"
                  id="cidade"
                  name="cidade"
                  required
                  placeholder="Digite sua cidade"
                  value={formData.cidade}
                  onChange={handleChange}
                  className={errors.cidade ? 'input-error' : ''}
                />
                {errors.cidade && <p className="error">{errors.cidade}</p>}
              </div>

              {mostrarFrete && frete !== null && (
                <p>Valor do Frete: R$ {frete.toFixed(2)}</p>
              )}
              {error && <p className="error">{error}</p>}

              <button type="submit" className="button">{isEditing ? "Salvar" : "Cadastrar"}</button>
            </form>
          </div>

          <div className="card">
            <h1>Endereços Cadastrados</h1>
            <select onChange={handleSelectEndereco} className="select-endereco">
              <option value="">Selecione um endereço</option>
              {enderecos.map((endereco, index) => (
                <option key={index} value={index}>
                  {`${endereco.endereco}, ${endereco.numero}, ${endereco.cidade}, ${endereco.estado}`}
                </option>
              ))}
            </select>

            <button
              onClick={() => {
                if (selectedEndereco) {
                  navigate('/pagamento', { 
                    state: { 
                      cartItems: cartItems, 
                      endereco: selectedEndereco, 
                      total: calculateTotal(cartItems) 
                    }
                  });
                }
              }}
              className="button"
              disabled={!selectedEndereco}
            >
              Ir para Pagamento
            </button>

            <table className="enderecos-table">
              <thead>
                <tr>
                  <th>Endereço</th>
                  <th>Número</th>
                  <th>Complemento</th>
                  <th>CEP</th>
                  <th>Estado</th>
                  <th>Cidade</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {enderecos.map((endereco, index) => (
                  <tr key={index}>
                    <td>{endereco.endereco}</td>
                    <td>{endereco.numero}</td>
                    <td>{endereco.complemento || '-'}</td>
                    <td>{endereco.cep}</td>
                    <td>{endereco.estado}</td>
                    <td>{endereco.cidade}</td>
                    <td>
                      <button className="button edit-button" onClick={() => handleEdit(index)}>Editar</button>
                      <button className="button delete-button" onClick={() => handleDelete(index)}>Excluir</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CadastrarCep;
