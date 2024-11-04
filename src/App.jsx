import RouterApp from './RouterApp';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <RouterApp />
      </div>
    </Router>
  );
};

export default App;
