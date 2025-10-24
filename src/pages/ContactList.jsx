import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { obtenerTodosLosContactos, eliminarContacto } from "../services/contactoService";

export default function ContactList() {
  const [contactos, setContactos] = useState([]);
  const [error, setError] = useState("");

  // 🔹 Cargar contactos al iniciar
  useEffect(() => {
    obtenerTodosLosContactos()
      .then(setContactos)
      .catch(() => setError("Error al cargar los contactos."));
  }, []);

  // 🔹 Eliminar un contacto
  const handleEliminar = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este contacto?")) {
      eliminarContacto(id)
        .then(() => setContactos((prev) => prev.filter((c) => c.id !== id)))
        .catch(() => setError("No se pudo eliminar el contacto."));
    }
  };

  return (
    <section className="max-w-5xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      {/* 🔹 Encabezado principal */}
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-sky-700">Agenda de Contactos</h2>

        {/* Botón para añadir nuevo */}
        <Link
          to="/contactos/nuevo"
          className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg font-medium"
        >
          + Añadir contacto
        </Link>
      </header>

      {/* 🔹 Mensajes de error */}
      {error && (
        <div className="mb-4 rounded bg-red-100 text-red-700 px-3 py-2">
          {error}
        </div>
      )}

      {/* 🔹 Tabla de contactos */}
      {contactos.length === 0 ? (
        <p className="text-gray-500 text-center">No hay contactos todavía.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-sky-100 text-sky-900">
                <th className="border p-2 text-left">Nombre</th>
                <th className="border p-2 text-left">Teléfono</th>
                <th className="border p-2 text-left">Email</th>
                <th className="border p-2 text-left">Dirección</th>
                <th className="border p-2 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {contactos.map((contacto) => (
                <tr
                  key={contacto.id}
                  className="hover:bg-sky-50 transition-colors"
                >
                  <td className="border p-2">{contacto.nombre}</td>
                  <td className="border p-2">{contacto.telefono}</td>
                  <td className="border p-2">{contacto.email}</td>
                  <td className="border p-2">{contacto.direccion}</td>
                  <td className="border p-2 text-center space-x-2">
                    {/* ✏️ Editar completo */}
                    <Link
                      to={`/contactos/editarCompleto/${contacto.id}`}
                      className="text-yellow-600 hover:underline"
                    >
                      Editar completo
                    </Link>

                    {/* 🧩 Editar parcial */}
                    <Link
                      to={`/contactos/editarParcial/${contacto.id}`}
                      className="text-indigo-600 hover:underline"
                    >
                      Editar parcial
                    </Link>

                    {/* ❌ Eliminar */}
                    <button
                      onClick={() => handleEliminar(contacto.id)}
                      className="ml-9 text-red-600 hover:underline"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
