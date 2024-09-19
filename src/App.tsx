import MiningAreaMap from "./components/MiningAreaMap/MiningAreaMap";

const coordinates = [
  { lon: -47.9292, lat: -15.7801 }, // Exemplo de coordenadas
  { lon: -47.9281, lat: -15.7802 },
  { lon: -47.9271, lat: -15.7812 },
  { lon: -47.9292, lat: -15.7822 },
];

const App = () => {
  return (
    <div>
      <h1>Mapa da Área</h1>
      <MiningAreaMap coordinates={coordinates} />
    </div>
  );
};

export default App;
