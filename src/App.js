
import './App.css';
import EthereumBalanceCard from './components/EthereumBalanceCard';
import CosmosBalanceForm from "./components/CosmosBalanceForm";
import AboutContract from './components/AboutContract';
function App() {
  return (
    <div className="App">
      <div>
      <EthereumBalanceCard></EthereumBalanceCard>
      <br></br>
      <CosmosBalanceForm></CosmosBalanceForm>
      <br></br>
      <AboutContract></AboutContract>
      </div>
      

    </div>
  );
}

export default App;
