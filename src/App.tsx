import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import AuthMain from "./pages/services/auth/Auth.page";
import "./App.css";
import AuthCallback from "./components/auth/AuthCallback";
import ErrorBoundary from "./components/error/CatchError";
import Startpage from "./pages/services/start/Start.page";

const Layout = () => {
  return (
    <div>
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <div>
      <ErrorBoundary>
        <Routes>
          <Route path="/">
            <Route path="auth" element={<AuthMain />} />
            <Route path="auth/google/callback" element={<AuthCallback />} />
            <Route path="start" element={<Startpage />} />
            <Route path="api" element={<Layout />}></Route>
            {/* <Route path="/admin" element={<ServiceRouter />} /> */}
          </Route>
        </Routes>
      </ErrorBoundary>
    </div>
  );
}

export default App;
