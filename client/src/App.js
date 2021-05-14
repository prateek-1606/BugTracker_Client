import './App.css';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import ProjectDetail from './components/ProjectDetails/Project';
import Employe from './components/Employes/Employe';
import Todos from './components/Todos/Todos'; 
import Chat from './components/Chat/Chat';
function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/auth" exact component={Auth} />
        <Route path="/project/:id" exact component={ProjectDetail} />
        <Route path="/employe" exact component={Employe} />
        <Route path="/todos" exact component={Todos} />
        <Route path="/chat" exact component={Chat} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
