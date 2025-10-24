import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { obtenerContactoPorId, actualizarContacto } from "../services/contactoService";
import ContactForm from "../components/ContactForm";

export default function EditContact() {
  const { id } = useParams(); // id del contacto desde la URL
  const navigate = useNavigate();
  console.log("ID recibido:", id);
  
  // Estados del formulario
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");

  // Estados de UI
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");
  const [enviando, setEnviando] = useState(false);

  // 1️⃣ Cargar datos del contacto al montar el componente
  useEffect(() => {
    obtenerContactoPorId(id)
      .then((data) => {
        setNombre(data.nombre || "");
        setTelefono(data.telefono || "");
        setEmail(data.email || "");
        setDireccion(data.direccion || "");
      })
      .catch(() => {
        setError("No se pudo cargar el contacto.");
      });
  }, [id]);

  // 2️⃣ Enviar cambios al backend
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setExito("");

    if (!nombre.trim() || !telefono.trim()) {
      setError("Nombre y teléfono son obligatorios.");
      return;
    }

    setEnviando(true);
    const actualizado = { nombre, telefono, email, direccion };

    actualizarContacto(id, actualizado)
      .then(() => {
        setExito(`Contacto actualizado correctamente.`);
        setTimeout(() => navigate("/"), 800);
      })
      .catch((err) => {
        setError(err.message || "No se pudo actualizar el contacto.");
      })
      .finally(() => setEnviando(false));
  };

  return (
    <section className="max-w-xl mx-auto mt-10 bg-white shadow rounded-xl p-6">
      <header className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-yellow-500">Editar contacto</h2>
        <Link to="/" className="text-sky-600 hover:underline">
          ← Volver
        </Link>
      </header>

      {/* Avisos */}
      {error && (
        <div className="mb-4 rounded bg-red-100 text-red-700 px-3 py-2">{error}</div>
      )}
      {exito && (
        <div className="mb-4 rounded bg-green-100 text-green-700 px-3 py-2">{exito}</div>
      )}

      {/* Reutilizamos el mismo formulario */}
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
        modo="editar"
      />
    </section>
  );
}
