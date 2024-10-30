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
  const navigate = useNavigate();

  // Exemplo: array de itens do carrinho (substitua isso pela sua lógica real)
  const seuArrayDeItems = [
    { name: 'Produto 1', price: 100 },
    { name: 'Produto 2', price: 200 }
  ];

  useEffect(() => {
    const storedEnderecos = JSON.parse(localStorage.getItem('enderecos')) || [];
    setEnderecos(storedEnderecos);
  }, []);

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
  };

  const handleDelete = (index) => {
    if (window.confirm("Tem certeza que deseja excluir?")) {
      const updatedEnderecos = enderecos.filter((_, i) => i !== index);
      setEnderecos(updatedEnderecos);
      localStorage.setItem('enderecos', JSON.stringify(updatedEnderecos));
    }
  };

  const handleEdit = (index) => {
    setFormData(enderecos[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleSelectEndereco = (e) => {
    const selected = enderecos[e.target.value];
    setSelectedEndereco(selected);
  };

  return (
    <div>
      <header role="banner" className="nav-header nav-header-lite">
        <div className="nav-bounds">
          <a href="./" className="nav-logo" tabIndex="0">
            <div className="nav-logo-title">
              <span>Mercado Livre</span>
            </div>
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
                  navigate('/pagamento', { state: { cartItems: seuArrayDeItems, endereco: selectedEndereco } }); // Passa o endereço selecionado e os itens do carrinho
                }
              }}
              className="button"
              disabled={!selectedEndereco} // Desabilita o botão se nenhum endereço for selecionado
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
