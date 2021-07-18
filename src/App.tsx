import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Gallery from "./components/gallery";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Gallery} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
