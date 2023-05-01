import { Link, Route } from "react-router-dom";
import StartMain from "../pages/services/start.page";

export function Router() {
  return (
    <Route path="/api/start">
      <StartMain />
    </Route>
  );
}
