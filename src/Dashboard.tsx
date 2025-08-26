import BarChart from "./components/BarChart";
import "./index.css";

export default function Dashboard() {
  return (
    <div id="dashboard-container">
      <header>
        <h1>Análise de Cenários Tributários</h1>
      </header>
      <BarChart />
    </div>
  );
}
