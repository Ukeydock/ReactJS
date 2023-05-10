import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import StartMain from "./pages/services/start.page";
import "./App.css";
import AuthCallback from "./components/auth/AuthCallback";
import ErrorBoundary from "./components/error/CatchError";

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
            <Route path="start" element={<StartMain />} />
            <Route path="auth/google/callback" element={<AuthCallback />} />
            <Route path="api" element={<Layout />}>
              {/* <Route path="sss" element={<StartMain />} /> */}
            </Route>
            {/* <Route path="/admin" element={<ServiceRouter />} /> */}
          </Route>
        </Routes>
      </ErrorBoundary>
    </div>
  );
}

export default App;
