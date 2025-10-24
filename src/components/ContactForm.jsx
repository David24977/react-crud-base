export default function ContactForm({
  nombre,
  telefono,
  email,
  direccion,
  enviando,
  onChangeNombre,
  onChangeTelefono,
  onChangeEmail,
  onChangeDireccion,
  onSubmit,
  modo = "añadir",
}) {
  const esParcial = modo === "parcial";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
     
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre *</label>
          <input
            type="text"
            value={nombre}
            onChange={onChangeNombre}
            className="mt-2 w-full rounded border border-gray-300 px-3 py-2"
            placeholder="Escribe tu nombre..."
          />
        </div>
      

      <div>
        <label className="block text-sm font-medium text-gray-700">
          {esParcial ? "Teléfono (opcional)" : "Teléfono *"}
        </label>
        <input
          type="tel"
          value={telefono}
          onChange={onChangeTelefono}
          className="mt-2 w-full rounded border border-gray-300 px-3 py-2"
          placeholder="Escribe tu teléfono..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          {esParcial ? "Email (opcional)" : "Email"}
        </label>
        <input
          type="email"
          value={email}
          onChange={onChangeEmail}
          className="mt-2 w-full rounded border border-gray-300 px-3 py-2"
          placeholder="Escribe tu email..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          {esParcial ? "Dirección (opcional)" : "Dirección"}
        </label>
        <input
          type="text"
          value={direccion}
          onChange={onChangeDireccion}
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2"
          placeholder="Escribe tu dirección..."
        />
      </div>

      <button
        type="submit"
        disabled={enviando}
        className={`w-full rounded px-4 py-2 font-semibold text-white ${
          enviando
            ? "bg-gray-400 cursor-not-allowed"
            : modo === "editar"
            ? "bg-yellow-600 hover:bg-green-700"
            : modo === "parcial"
            ? "bg-indigo-600 hover:bg-red-700"
            : "bg-sky-600 hover:bg-sky-700"
        }`}
      >
        {enviando
          ? "Guardando..."
          : modo === "editar"
          ? "Guardar cambios"
          : modo === "parcial"
          ? "Guardar cambios parciales"
          : "Guardar contacto"}
      </button>
    </form>
  );
}
