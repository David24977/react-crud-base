import { Link } from "react-router-dom";

export default function Menu(){

  return(
     <section className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
<h2 className="text-2xl font-bold text-center mb-6">Menú principal</h2>

{/* 🔹 Botón para ir a la página de añadir contacto */}
      <div className="flex justify-end mb-4">
        <Link
          to="/contactos/listar"
          className="inline-block px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-medium"
        >
          + Lista
        </Link>
      </div>

 {/* 🔹 Botón para ir a la página de añadir contacto */}
      <div className="flex justify-end mb-4">
        <Link
          to="/contactos/nuevo"
          className="inline-block px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-medium"
        >
          + Añadir contacto
        </Link>
      </div>

      {/* 🔹 Botón para ir a la página de editar contacto */}
      <div className="flex justify-end mb-4">
        <Link
          to={`/contactos/editarCompleto`}
          className="inline-block px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-medium"
        >
          + modificar contacto completo
        </Link>
      </div>

        {/* 🔹 Botón para ir a la página de editar contacto parcial */}
      <div className="flex justify-end mb-4">
        <Link
          to={`/contactos/editarParcial`}
          className="inline-block px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-medium"
        >
          + modificar contacto parcial
        </Link>
      </div>
      </section>
  );
}
