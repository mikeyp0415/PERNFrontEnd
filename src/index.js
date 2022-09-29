import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap'
import './index.css';
import App from './App';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./Dashboard";
import AdminPanel from "./AdminPanel";
import NoPage from "./NoPage";
import Footer from "./Footer";



export default function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="adminpanel" element={<AdminPanel />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const navbar = ReactDOM.createRoot(document.getElementById('root'));
navbar.render(<Navigation />);

const footMan = ReactDOM.createRoot(document.getElementById('footerRender'));
footMan.render(<Footer />,);