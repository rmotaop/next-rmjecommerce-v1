"use client";
import Link from "next/link";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import useSWR from "swr";
import { formatPrice } from "@/lib/utils";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  BarElement,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  BarElement,
  ArcElement
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

const Dashboard = () => {
  const { data: summary, error } = useSWR(`/api/sellers/orders/summary`);

  if (error) return error.message;
  if (!summary) return "Carregando...";

  const salesData = {
    labels: summary.salesData.map((x: { _id: string }) => x._id),
    datasets: [
      {
        fill: true,
        label: "Planejado",
        data: summary.salesData.map(
          (x: { totalSales: number }) => x.totalSales * 0.95
        ),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        fill: true,
        label: "Realizado",
        data: summary.salesData.map(
          (x: { totalSales: number }) => x.totalSales
        ),
        borderColor: "rgb(5, 197, 43)",
        backgroundColor: "rgba(2, 121, 22, 0.5)",
      },
    ],
  };
  const ordersData = {
    labels: summary.salesData.map((x: { _id: string }) => x._id),
    datasets: [
      {
        fill: true,
        label: "Pedidos",
        data: summary.salesData.map(
          (x: { totalOrders: number }) => x.totalOrders
        ),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  const productsData = {
    labels: summary.productsData.map((x: { _id: string }) => x._id), // 2022/01 2022/03
    datasets: [
      {
        label: "Categorias",
        data: summary.productsData.map(
          (x: { totalProducts: number }) => x.totalProducts
        ),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
      },
    ],
  };
  const usersData = {
    labels: summary.usersData.map((x: { _id: string }) => x._id), // 2022/01 2022/03
    datasets: [
      {
        label: "Usuários",
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        data: summary.usersData.map(
          (x: { totalUsers: number }) => x.totalUsers
        ),
      },
    ],
  };

  return (
    <div>
      <div className="my-4 stats inline-grid md:flex shadow stats-vertical md:stats-horizontal">
        <div className="stat">
          <div className="stat-title">Vendas</div>
          <div className="stat-value text-primary">
            {formatPrice(summary.ordersPrice)}
          </div>
          <div className="stat-desc">
            <Link href="/seller/orders">Visualizar vendas</Link>
          </div>
        </div>
        <div className="stat">
          <div className="stat-title"> Pedidos</div>
          <div className="stat-value text-primary">{summary.ordersCount}</div>
          <div className="stat-desc">
            <Link href="/seller/orders">Visualizar pedidos</Link>
          </div>
        </div>
        <div className="stat">
          <div className="stat-title">Produtos</div>
          <div className="stat-value text-primary">{summary.productsCount}</div>
          <div className="stat-desc">
            <Link href="/seller/products">Visualizar produtos</Link>
          </div>
        </div>
        <div className="stat">
          <div className="stat-title">Usuários</div>
          <div className="stat-value text-primary">{summary.usersCount}</div>
          <div className="stat-desc">
            <Link href="/seller/users">Visualizar usuários</Link>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl py-2">Relatório de vendas</h2>
          <Bar data={salesData} />
        </div>
        <div>
          <h2 className="text-xl py-2">Relatório de pedidos</h2>
          <Line data={ordersData} />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl py-2">Relatório de produtos</h2>
          <div className="flex items-center justify-center h-80 w-96 ">
            <Doughnut data={productsData} />
          </div>
        </div>
        <div>
          <h2 className="text-xl py-2">Relatório de usuários</h2>
          <Bar data={usersData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
