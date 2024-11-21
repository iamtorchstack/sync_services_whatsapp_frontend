import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Layout from "./layout/Layout.jsx";
import Engineer from "./pages/Engineers.jsx";
import Customers from "./pages/Customers.jsx";
import Chats from "./pages/Chats.jsx";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/dashboard/engineer" element={<Engineer />} />
            <Route path="/dashboard/customers" element={<Customers />} />
            <Route path="/dashboard/chats" element={<Chats />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
