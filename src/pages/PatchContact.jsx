import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { obtenerContactoPorId, actualizarContactoParcial } from "../services/contactoService";
import ContactForm from "../components/ContactForm";

export default function PatchContact() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    obtenerContactoPorId(id)
      .then((data) => {
        setNombre(data.nombre || "");
        setTelefono(data.telefono || "");
        setEmail(data.email || "");
        setDireccion(data.direccion || "");
      })
      .catch(() => setError("No se pudo cargar el contacto."));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setExito("");

    // Solo enviamos los campos no vacíos
    const camposActualizados = {};
    if (nombre.trim()) camposActualizados.nombre = nombre.trim();
    if (telefono.trim()) camposActualizados.telefono = telefono.trim();
    if (email.trim()) camposActualizados.email = email.trim();
    if (direccion.trim()) camposActualizados.direccion = direccion.trim();

    if (Object.keys(camposActualizados).length === 0) {
      setError("No has modificado ningún campo.");
      return;
    }

    setEnviando(true);
    actualizarContactoParcial(id, camposActualizados)
      .then(() => {
        setExito("Contacto actualizado parcialmente ✅");
        setTimeout(() => navigate("/"), 800);
      })
      .catch((err) => setError(err.message || "Error al actualizar."))
      .finally(() => setEnviando(false));
  };

  return (
    <section className="max-w-xl mx-auto mt-10 bg-white shadow rounded-xl p-6">
      <header className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-indigo-700">Modificación parcial</h2>
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
        modo="parcial"
      />
    </section>
  );
}
