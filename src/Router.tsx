import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { Contato } from "./pages/main/Contato";
import { Gdoor } from "./pages/main/Gdoor";
import { Index } from "./pages/main/Index";
import { Login } from "./pages/main/Login";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Index />} />
        <Route path="/Contato" element={<Contato />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Gdoor" element={<Gdoor />} />
      </Route>
    </Routes>
  );
}
