import ContactList from "./pages/ContactList";
import AddContact from "./pages/AddContact";
import { Routes, Route } from "react-router-dom";
import EditContact from "./pages/EditContact";
import PatchContact from "./pages/PatchContact";
import Menu from "./pages/Menu";

export default function App() {
  return (
    
      <Routes>
      <Route path="/" element={<ContactList />} />
      <Route path="/contactos/nuevo" element={<AddContact />} />
      <Route path="/contactos/editarCompleto/:id" element={<EditContact />} />
       <Route path="/contactos/editarParcial/:id" element={<PatchContact />} />
      <Route path="/contactos/menu" element={<Menu />} />
    </Routes>
    
  );
}

