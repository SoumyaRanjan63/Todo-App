import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import TodoList from '../src/Components/TodoList';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Header from './Components/Header';

const App = () => {
    return (
        <Router>          
               <div>
                <Header/>
                <Routes>
                    {/* <Route exact path="/" Component={TodoList} /> */}
                    <Route  path="/Signup" Component={Signup} />
                    <Route  path="/Login" Component={Login} />
                    <Route  path="/Dashboard" Component={Dashboard} />
                </Routes>
               </div>
                
        </Router>
    );
}

export default App;
