import './App.css';
import {Container} from "reactstrap";
import Dijkstra from "./pages/dijkstra.js"
import Mapex from "./pages/mapex"
function App() {
  return (
    <Container>
      {/* <Dijkstra /> */}
      <Mapex />
    </Container>
  );
}

export default App;
