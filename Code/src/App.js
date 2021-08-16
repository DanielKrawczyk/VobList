import { HashRouter, Link, Switch, Route } from 'react-router-dom';
import List from './components/List';
import Add from './components/Add';
import vobs from './data/data.json';

function App() {
  return (
    <HashRouter>
      <nav>
        <div className="links">
          <Link to="/static">Voby statyczne</Link>
          <Link to="/nature">Voby natury</Link>
          <Link to="/effects">Efekty wizualne</Link>
          <Link to="/sounds">Efekty dźwiękowe</Link>
          <Link to="/all">Wszystkie voby</Link>
          <Link to="/add">Dodaj voba...</Link>
        </div>
      </nav>
      <Switch>
        <Route path="/static">
          <List data={vobs.filter(item => item.type === "static")} type="static" />
        </Route>
        <Route path="/nature">
          <List data={vobs.filter(item => item.type === "nature")} type="nature" />
        </Route>
        <Route path="/effects">
          <List data={vobs.filter(item => item.type === "effects")} type="effects" />
        </Route>
        <Route path="/sounds">
          <List data={vobs.filter(item => item.type === "sounds")} type="sounds" />
        </Route>
        <Route path="/all">
          <List data={vobs} type="all" />
        </Route>
        <Route path="/add">
          <Add />
        </Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
