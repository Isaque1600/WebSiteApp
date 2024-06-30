import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { Index } from "./pages/main/Index";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Index />} />
        <Route path="/Atalhos" element={<Atalhos />} />
        <Route path="/Contato" element={<Contato />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Gdoor" element={<Gdoor />} />
      </Route>
    </Routes>
  );
}
