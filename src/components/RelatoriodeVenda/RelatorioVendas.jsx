import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import './RelatorioVendas.css';

// Registrar os componentes necessários do Chart.js
Chart.register(...registerables);

const RelatorioVendas = () => {
  const [vendas, setVendas] = useState([]);

  useEffect(() => {
    const fetchVendas = () => {
      const storedVendas = JSON.parse(localStorage.getItem('vendas')) || [];
      setVendas(storedVendas);
    };

    fetchVendas();
  }, []);

  const calcularTotal = () => {
    const total = vendas.reduce((acc, venda) => {
      const preco = Number(venda.preco); // Certifique-se de que `venda.preco` é um número
      return acc + (isNaN(preco) ? 0 : preco); // Ignorar valores não numéricos
    }, 0);

    return total.toFixed(2); // Retornar o total formatado
  };

  const dadosGrafico = {
    labels: vendas.map(venda => venda.produto),
    datasets: [
      {
        label: 'Total de Vendas',
        data: vendas.map(venda => Number(venda.preco)), // Garantir que os dados sejam numéricos
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="relatorio-vendas-container">
      <h1>Relatório de Vendas</h1>
      <div className="summary">
        <h2>Total Vendido: R$ {calcularTotal()}</h2>
      </div>
      <div className="chart-container">
        <h3>Gráfico de Vendas</h3>
        <Bar data={dadosGrafico} options={{ responsive: true }} />
      </div>
      <div className="tabela-vendas">
        <h3>Detalhes das Vendas</h3>
        <table>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Preço</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {vendas.map((venda, index) => (
              <tr key={index}>
                <td>{venda.produto}</td>
                <td>R$ {Number(venda.preco).toFixed(2)}</td> {/* Garantir que seja numérico */}
                <td>{venda.data}</td> {/* Supondo que você tenha uma data na venda */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RelatorioVendas;
