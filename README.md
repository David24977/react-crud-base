# React CRUD Base — Plantilla reutilizable

Plantilla base en **React + Axios + TailwindCSS + React Router** para crear interfaces CRUD completas conectadas a un backend (por ejemplo, **Spring Boot + MySQL**).

Ideal para proyectos donde se necesiten listas, formularios y edición de entidades como **contactos, productos, clientes, barcas, hielo, etc.**

---

Tecnologías principales

- React 19 + Vite  
- React Router DOM  
- Axios (para las peticiones HTTP)  
- TailwindCSS (diseño rápido y responsivo)  
- Validación visual básica y estados de carga

---

## 📦 Estructura del proyecto

src/
├── components/
│ └── ContactForm.jsx
├── pages/
│ ├── ContactList.jsx
│ ├── AddContact.jsx
│ └── EditContact.jsx
├── services/
│ ├── api.js
│ └── contactoService.js
├── App.jsx
├── main.jsx
└── index.css


*(Los nombres "Contact" son de ejemplo; se pueden sustituir por cualquier entidad)*

---

Cómo usar esta plantilla

Clonar el repositorio

```bash
git clone https://github.com/TuUsuario/react-crud-base.git
cd react-crud-base
npm install
npm run dev

Conectar con tu backend
Crea un archivo .env en la raíz con la URL de tu backend:
VITE_API_URL=http://localhost:8080

Tu backend debe exponer endpoints REST del tipo:
GET    /entidades/todos
POST   /entidades
PUT    /entidades/{id}
DELETE /entidades/{id}

Adaptar la plantilla a una nueva entidad

Ejemplo: pasar de Contactos a Productos

Buscar y reemplazar
Buscar	Reemplazar
contacto	producto
Contact	Producto

Hazlo en carpetas, archivos y nombres de variables.

Cambiar los campos del formulario

Edita ContactForm.jsx para reflejar tus atributos, por ejemplo:

<label>Nombre del producto</label>
<input value={nombre} onChange={onChangeNombre} />

<label>Precio (€)</label>
<input type="number" value={precio} onChange={onChangePrecio} />

Ajustar los endpoints

Edita productoService.js (antes contactoService.js):

api.get("/productos/todos");
api.post("/productos");
api.put(`/productos/${id}`);
api.delete(`/productos/${id}`);

Ejecutar
npm run dev
 

Abre http://localhost:5173

y tendrás tu nuevo CRUD listo para usar 

Personalización rápida

Cambia los textos (Editar contacto → Editar producto)

Cambia colores en Tailwind si lo deseas

Ajusta validaciones del formulario (@NotBlank, @Email, etc.) desde el backend

Recomendación

Guarda este repositorio como tu modelo base.
Para nuevos proyectos:

Clónalo

Cámbiale el nombre de carpeta y los campos

Conéctalo al backend que necesites

Así tendrás un frontend CRUD listo en minutos

---

## ⚖️ Licencia

MIT License  

Copyright (c) 2025 **David Ferrer Sapiña**

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 

Autor

Desarrollado por David Ferrer Sapiña
Java · Spring Boot · Python · React · MySQL
España
github.com/David24977
