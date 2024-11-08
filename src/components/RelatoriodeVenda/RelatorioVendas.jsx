import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './RelatorioVendas.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function RelatorioVendas() {
  const [sales, setSales] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);

  useEffect(() => {
    const storedSales = JSON.parse(localStorage.getItem('vendas')) || [];
    storedSales.sort((a, b) => new Date(a.data) - new Date(b.data));
    setSales(storedSales);

    const earnings = storedSales.reduce((acc, sale) => acc + sale.preco, 0);
    setTotalEarnings(earnings);
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

  const groupedSales = sales.reduce((acc, sale) => {
    const saleDate = sale.data;
    if (!acc[saleDate]) {
      acc[saleDate] = { data: saleDate, preco: 0 };
    }
    acc[saleDate].preco += sale.preco;
    return acc;
  }, {});

  const dailySales = Object.values(groupedSales);

  const chartData = {
    labels: dailySales.map((sale) => sale.data),
    datasets: [
      {
        label: 'Vendas Diárias',
        data: dailySales.map((sale) => sale.preco),
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
        text: 'Gráfico de Vendas Diárias',
      },
    },
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

      <div className="relatorio-container">
        <h1>Relatório de Vendas</h1>
        <div className="dashboard">
          <h2>Dashboard de Vendas</h2>
          <div className="dashboard-info">
            <p><strong>Total de Vendas:</strong> {sales.length}</p>
            <p><strong>Ganhos Totais:</strong> {formatCurrency(totalEarnings)}</p>
          </div>

          {/* Gráfico de Vendas Diárias */}
          {dailySales.length > 0 && (
            <div className="chart-container">
              <Bar data={chartData} options={chartOptions} />
            </div>
          )}

          <h3>Vendas:</h3>
          {sales.map((sale, index) => (
            <div key={index} className="sale-detail">
              <p><strong>Data:</strong> {sale.data}</p>
              <p><strong>Produto:</strong> {sale.produto}</p>
              <p><strong>Valor:</strong> {formatCurrency(sale.preco)}</p>
              <p><strong>Forma de Pagamento:</strong> {sale.metodoPagamento}</p>

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
    </div>
  );
}

export default RelatorioVendas;
