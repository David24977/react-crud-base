import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { crearContacto } from "../services/contactoService";
import ContactForm from "../components/ContactForm";

export default function AddContact() {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");

  const [error, setError] = useState("");
  const [exito, setExito] = useState("");
  const [enviando, setEnviando] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setExito("");

    if (!nombre.trim() || !telefono.trim()) {
      setError("Nombre y teléfono son obligatorios.");
      return;
    }

    setEnviando(true);
    const nuevo = { nombre, telefono, email, direccion };

    crearContacto(nuevo)
      .then((contactoCreado) => {
        setExito(`Contacto "${contactoCreado?.nombre ?? nombre}" creado correctamente.`);
        setTimeout(() => navigate("/"), 600);
      })
      .catch((err) => setError(err.message || "No se pudo crear el contacto."))
      .finally(() => setEnviando(false));
  };

  return (
    <section className="max-w-xl mx-auto mt-10 bg-white shadow rounded-xl p-6">
      <header className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-sky-700">Nuevo contacto</h2>
        <Link to="/" className="text-sky-600 hover:underline">
          ← Volver
        </Link>
      </header>

      {error && (
        <div className="mb-4 rounded bg-red-100 text-red-700 px-3 py-2">{error}</div>
      )}
      {exito && (
        <div className="mb-4 rounded bg-green-100 text-green-700 px-3 py-2">{exito}</div>
      )}

      <ContactForm
        nombre={nombre}
        telefono={telefono}
        email={email}
        direccion={direccion}
        enviando={enviando}
        onChangeNombre={(e) => setNombre(e.target.value)}
        onChangeTelefono={(e) => setTelefono(e.target.value)}
        onChangeEmail={(e) => setEmail(e.target.value)}
        onChangeDireccion={(e) => setDireccion(e.target.value)}
        onSubmit={handleSubmit}
        modo="añadir"
      />
    </section>
  );
}
