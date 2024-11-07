import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './RelatorioVendas.css';

// Registrar os módulos do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function RelatorioVendas() {
  const [seller, setSeller] = useState(null);
  const [sales, setSales] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);

  useEffect(() => {
    const storedSellers = JSON.parse(localStorage.getItem('sellers')) || [];
    const sellerData = storedSellers[0]; // Considerando que existe apenas um vendedor
    setSeller(sellerData);

    const storedSales = JSON.parse(localStorage.getItem('sales')) || [];
    setSales(storedSales);

    const earnings = storedSales.reduce((acc, sale) => acc + sale.amount, 0);
    setTotalEarnings(earnings);
  }, []);

  const formatCurrency = (amount) => {
    return amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const chartData = {
    labels: sales.map((sale) => sale.date),
    datasets: [
      {
        label: 'Vendas Semanais',
        data: sales.map((sale) => sale.amount),
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
        text: 'Gráfico de Vendas Semanais',
      },
    },
  };

  return (
    <div className="relatorio-container">
      <h1>Relatório de Vendas</h1>

      {seller && (
        <div className="seller-profile">
          <img src={seller.profileImage} alt="Foto do Vendedor" className="profile-image" />
          <h2>{seller.name}</h2>
          <p><strong>CPF:</strong> {seller.cpf}</p>
          <p><strong>E-mail:</strong> {seller.email}</p>
          <p><strong>Telefone:</strong> {seller.phone}</p>
          <p><strong>Endereço:</strong> {seller.address}</p>
        </div>
      )}

      <div className="dashboard">
        <h2>Dashboard de Vendas</h2>
        <div className="dashboard-info">
          <p><strong>Total de Vendas:</strong> {sales.length}</p>
          <p><strong>Ganhos Totais:</strong> {formatCurrency(totalEarnings)}</p>
        </div>

        {/* Gráfico de Vendas */}
        {sales.length > 0 && (
          <div className="chart-container">
            <Bar data={chartData} options={chartOptions} />
          </div>
        )}

        <h3>Vendas Diárias:</h3>
        {sales.map((sale, index) => (
          <div key={index} className="sale-detail">
            <p><strong>Data:</strong> {sale.date}</p>
            <p><strong>Produto:</strong> {sale.productName}</p>
            <p><strong>Valor:</strong> {formatCurrency(sale.amount)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RelatorioVendas;
