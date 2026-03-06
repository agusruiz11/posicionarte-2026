# FASE 2 — Cómo ejecutar y desplegar

## How to run

### Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). El servidor de desarrollo de Next.js recarga al guardar.

### Build de producción (sitio estático)

```bash
npm run build
```

Genera la salida estática en la carpeta **`out/`**. No hace falta Node en el servidor.

### Preview local del build estático

Después de `npm run build`, podés servir la carpeta `out/` con cualquier servidor estático, por ejemplo:

```bash
npx serve out
```

O con Python: `python -m http.server 3000 --directory out`

---

## Build & Deploy

### Opción A: Vercel

1. Conectá el repo (GitHub/GitLab/Bitbucket) en [vercel.com](https://vercel.com).
2. Vercel detecta Next.js. En **Build & Output**:
   - **Build Command:** `npm run build` (o `next build`)
   - **Output Directory:** `out` (necesario para static export).
3. En el proyecto de Next.js con `output: 'export'`, Vercel usa automáticamente la salida estática; no hace falta configurar Output Directory si ya está en `next.config.js`.
4. Deploy: cada push a la rama principal puede desplegar automáticamente.

**Nota:** Con `output: 'export'`, Vercel hace un build estático; no usa serverless functions ni SSR.

### Opción B: Hostinger (o cualquier hosting estático)

1. Ejecutá localmente:
   ```bash
   npm run build
   ```
2. Subí **todo el contenido** de la carpeta **`out/`** al directorio público del hosting (por ejemplo `public_html` o la raíz del sitio).
   - Incluí: `index.html`, `404.html`, `servicios.html`, `casos.html`, `contacto.html`, la carpeta `_next/` y el `.htaccess` si existe.
3. Si Hostinger usa Apache, el `.htaccess` que Next genera en `out/` ayuda con rutas limpias (rewrite a `index.html` para SPA; con static export ya tenés un `.html` por ruta, así que no es obligatorio).
4. La URL base del sitio debe coincidir con lo configurado en `metadataBase` en `src/app/layout.jsx` (por defecto `https://posicionarte.online`) para que los OG y canonical sean correctos.

### Resumen de salida estática

| Ruta        | Archivo generado |
|------------|-------------------|
| `/`        | `out/index.html`  |
| `/servicios` | `out/servicios.html` |
| `/casos`   | `out/casos.html`  |
| `/contacto` | `out/contacto.html` |
| 404        | `out/404.html`    |

Todo lo que está en `out/_next/` (JS, CSS) debe subirse junto con los HTML.

---

## TODOs para futuro (panel de usuario / auth)

- [ ] **Auth:** Añadir autenticación (NextAuth.js, Clerk o similar) si más adelante se agrega un panel de cliente.
- [ ] **Rutas protegidas:** Crear layout o middleware para rutas tipo `/dashboard`, `/panel` o `/admin` que exijan sesión.
- [ ] **API routes:** Si el panel necesita datos, valorar API routes en Next (teniendo en cuenta que con `output: 'export'` no hay serverless; habría que pasar a deploy con Node o usar un backend externo).
- [ ] **Formulario de contacto:** Conectar el formulario de `/contacto` con un backend o servicio (email, CRM, webhook) en lugar del toast de “en desarrollo”.
- [ ] **Blog (opcional):** Si más adelante se agrega blog, usar rutas estáticas con MDX o CMS headless y regeneración bajo demanda o build-time.

No implementar nada de lo anterior en esta fase; el sitio actual es solo marketing estático.
