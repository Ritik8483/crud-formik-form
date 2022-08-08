import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";
import Home from './components/Home';
import AddUser from './components/AddUser';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/adduser' element={<AddUser/>} />
          <Route path='/edituser/:id' element={<AddUser/>} />
        </Routes>
      </Router>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div>
  );
}

export default App;
