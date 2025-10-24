import api from "./api";

export function obtenerTodosLosContactos() {
  return api.get("/contactos/todos").then((res) => res.data);
}

export function obtenerContactoPorId(id) {
  return api.get(`contactos/${id}`).then((res) => res.data);
}

export function crearContacto(contacto) {
  return api.post("/contactos", contacto).then((res) => res.data);
}

export function eliminarContacto(id) {
  return api.delete(`/contactos/${id}`).then((res) => res.data);
}

export function actualizarContacto(id, contacto) {
  return api.put(`/contactos/total/${id}`, contacto).then((res) => res.data);
}

export function actualizarContactoParcial(id, contacto){
  return api.patch(`/contactos/parcial/${id}`, contacto).then((res) => res.data);
}

export function buscarNombre(nombre){
  return api.get(`/contactos/nombre/${nombre}`).then((res) => res.data);
}

