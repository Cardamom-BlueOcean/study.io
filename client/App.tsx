
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import UserPage from './components/UserPage';
import Login from './components/Login';
import { Provider } from 'react-redux';
import { store } from './store';


const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/about" />
          <Route path="/userlogin" element={<UserPage />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router >
    </Provider>
  );
}

export default App;
