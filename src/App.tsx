import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RoleSelection from "./pages/RoleSelection/RoleSelection";
import Login from "./pages/Login/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/role-selection" element={<RoleSelection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/role-selection" replace />} />
      </Routes>
    </Router>
  );
}

export default App;