/**
 * ============================================================
 *  http.js — Cliente HTTP genérico para proyectos React (Vite)
 * ============================================================
 * Si queremos trabajar con axios
 *
 * 🔹 Función: centralizar todas las llamadas al backend
 * 🔹 Evita repetir fetch, headers, JSON, manejo de errores, etc.
 * 🔹 Se usa desde servicios específicos (contactoService.js, clienteService.js...)
 *
 * ============================================================
 */

// 🌍 URL base del backend (definida en .env o valor por defecto)
const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

// ⏱️ Tiempo máximo de espera (ms) para cada petición
const DEFAULT_TIMEOUT_MS = 10_000;

/**
 * Función interna para realizar peticiones HTTP
 * @param {string} path - ruta del endpoint (ej: "/contactos/todos")
 * @param {object} options - método, headers, body, etc.
 * @param {number} timeoutMs - milisegundos antes de cancelar la petición
 */
async function request(path, options = {}, timeoutMs = DEFAULT_TIMEOUT_MS) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      signal: controller.signal,
      headers: {
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...options.headers,
      },
      ...options,
    });

    // 🧩 Si la respuesta no es 2xx → lanza error con detalle
    if (!response.ok) {
      const text = await response.text().catch(() => "");
      const message = text || response.statusText || "Error HTTP desconocido";
      throw new Error(`HTTP ${response.status} - ${message}`);
    }

    // 🧠 Si hay cuerpo JSON → devuélvelo, si no → null (casos 204, DELETE)
    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      return await response.json();
    }
    return null;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("La petición tardó demasiado (timeout).");
    }
    throw error;
  } finally {
    clearTimeout(id);
  }
}

// ============================================================
// 📡 Funciones públicas — se exportan para usar en otros módulos
// ============================================================

/** Petición GET */
export function httpGet(path, opts) {
  return request(path, { method: "GET", ...(opts || {}) });
}

/** Petición POST (envía un cuerpo JSON) */
export function httpPost(path, body, opts) {
  return request(path, {
    method: "POST",
    body: JSON.stringify(body),
    ...(opts || {}),
  });
}

/** Petición PUT (reemplaza un recurso completo) */
export function httpPut(path, body, opts) {
  return request(path, {
    method: "PUT",
    body: JSON.stringify(body),
    ...(opts || {}),
  });
}

/** Petición PATCH (actualiza parcialmente un recurso) */
export function httpPatch(path, body, opts) {
  return request(path, {
    method: "PATCH",
    body: JSON.stringify(body),
    ...(opts || {}),
  });
}

/** Petición DELETE */
export function httpDelete(path, opts) {
  return request(path, { method: "DELETE", ...(opts || {}) });
}
