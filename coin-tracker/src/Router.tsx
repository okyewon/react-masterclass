import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";
import Chart from "./routes/Chart";
import Price from "./routes/Price";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Coins />}></Route>
        <Route path="/:coinId" element={<Coin />}>
          <Route path="/:coinId/price" element={<Price />}></Route>
          <Route path="/:coinId/chart" element={<Chart />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default Router;
