import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './RelatorioVendas.css';
import { useNavigate, Link } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function RelatorioVendas() {
  const [sales, setSales] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [seller, setSeller] = useState(null);

  useEffect(() => {
    // Recuperando as vendas armazenadas
    const storedSales = JSON.parse(localStorage.getItem('vendas')) || [];
    storedSales.sort((a, b) => new Date(a.data) - new Date(b.data));
    setSales(storedSales);

    // Calculando o total de ganhos
    const earnings = storedSales.reduce((acc, sale) => acc + sale.preco, 0);
    setTotalEarnings(earnings);

    // Recuperando as informações do vendedor do localStorage
    const storedSeller = JSON.parse(localStorage.getItem('sellers')) || [];
    if (storedSeller.length > 0) {
      setSeller(storedSeller[0]);
    }
  }, []);

  const formatCurrency = (amount) => {
    return amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleDeleteSale = (saleId) => {
    const updatedSales = sales.filter(sale => sale.id !== saleId);
    setSales(updatedSales);

    localStorage.setItem('vendas', JSON.stringify(updatedSales));

    const earnings = updatedSales.reduce((acc, sale) => acc + sale.preco, 0);
    setTotalEarnings(earnings);
  };

  // Agrupando todas as vendas por data
  const groupSalesByDate = (sales) => {
    return sales.reduce((acc, sale) => {
      const saleDate = sale.data;
      if (!acc[saleDate]) {
        acc[saleDate] = 0;
      }
      acc[saleDate] += sale.preco;
      return acc;
    }, {});
  };

  const dailySales = groupSalesByDate(sales);

  const chartData = {
    labels: Object.keys(dailySales),  // Datas das vendas
    datasets: [
      {
        label: 'Total de Vendas',
        data: Object.values(dailySales),  // Valores totais das vendas por data
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Gráfico de Vendas por Dia',
      },
    },
  };

  return (
    <div>
      <header className="header"style={{border:'0'}}>
        <img 
          src="https://http2.mlstatic.com/frontend-assets/ui-navigation/5.21.11/mercadolibre/logo__large_plus@2x.png" 
          alt="Logo Mercado Livre" 
          className="logo"
          style={{height:'40px',width:'150px'}}
        />
        <nav className="navbar" style={{backgroundColor:'#fee601'}}>
          <Link to="/Produtos-Cadastrados" className="navbar-link">Produtos</Link>
          <Link to="/feedbacks" className="navbar-link">Avaliação</Link>
          <Link to="/relatorio-vendas" className="navbar-link">Relatório</Link> 
          <Link to="/login" className="navbar-link">Login</Link>
          <Link to="/cadastro-vendedor" className="navbar-link">Cadastre-se</Link>
        </nav>
        </header>

      <div className="relatorio-container">
        <h1>Relatório de Vendas</h1>
        <div className="dashboard">
          <h2>Dashboard de Vendas</h2>
          <div className="dashboard-info">
            <p><strong>Total de Vendas:</strong> {sales.length}</p>
            <p><strong>Ganhos Totais:</strong> {formatCurrency(totalEarnings)}</p>
          </div>

          {/* Exibição das informações do vendedor */}
          {seller && (
            <div className="seller-info">
              <div className="seller-details">
              <h3>Informações do Vendedor</h3>

                <img
                  src={seller.profileImage} // Exibindo a foto do vendedor
                  alt="Foto do Vendedor"
                  className="seller-image"
                />
                <div className="seller-data">
                  <p><strong>Nome:</strong> {seller.name}</p>
                  <p><strong>CPF:</strong> {seller.cpf}</p>
                  <p><strong>E-mail:</strong> {seller.email}</p>
                  <p><strong>Telefone:</strong> {seller.phone}</p>
                  <p><strong>Endereço:</strong> {seller.address}</p>
                </div>
              </div>
            </div>
          )}

          {/* Exibição do gráfico de vendas */}
          <div className="chart-container">
            <Bar data={chartData} options={chartOptions} />
          </div>

          <h3>Vendas:</h3>
          {sales.map((sale, index) => (
            <div key={index} className="sale-detail">
              <p><strong>Data:</strong> {sale.data}</p>
              <p><strong>Produto:</strong> {sale.produto}</p>
              <p><strong>Valor:</strong> {formatCurrency(sale.preco)}</p>
              <p><strong>Forma de Pagamento:</strong> {sale.metodoPagamento}</p>
              <p><strong>Vendedor:</strong> {sale.vendedor}</p> {/* Exibindo o nome do vendedor */}

              {/* Botão de exclusão */}
              <button
                className="delete-button"
                onClick={() => handleDeleteSale(sale.id)}
              >
                Excluir Venda
              </button>
            </div>
          ))}
        </div>
      </div>
            {/* Adicionando o footer */}
<footer className="produtos-footer" style={{padding:'40px'}}>
  <p className="produtos-footer-copyright">Copyright © 2024 Ebazar.com.br LTDA.</p>
  <div className="produtos-footer-links">
    <a href="#termos" className="produtos-footer-link">Termos e condições</a>
    <a href="#privacidade" className="produtos-footer-link">Como cuidamos da sua privacidade</a>
  </div>
</footer>
    </div>
  );
}

export default RelatorioVendas;
