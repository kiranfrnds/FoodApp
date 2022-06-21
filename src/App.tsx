import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Verification from "./components/Verification";
import ProductList from "./components/ProductList";
import ProtectedRouting from "./components/ProtectedRouting/ProtectedRouting";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route element={<ProtectedRouting />}>
        <Route path="/verification/:number" element={<Verification />} />
        <Route path="/product" element={<ProductList />} />
      </Route>
    </Routes>
  );
}

export default App;
