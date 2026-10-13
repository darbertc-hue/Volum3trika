# VOLUM3TRIKA

Sitio web de VOLUM3TRIKA desarrollado con Next.js, TypeScript y Tailwind CSS.

## Ejecutar localmente

Requiere Node.js 22.12 o superior.

```sh
cd web
npm install
npm run dev
```

Abre http://localhost:3000. En Windows también puedes ejecutar `web/start-local.ps1`.

La configuración de contenido, correo y despliegue se documenta en [web/README.md](web/README.md). Las variables disponibles están en `web/.env.example`.

## Archivos

- `web/`: aplicación principal y pruebas.
- `sites/volum3trika/dist/index.html`: sitio estático original.
- `output/VOLUM3TRIKA-Prototipo-Cliente.html`: prototipo para el cliente.
- `output/assets/`: recursos del prototipo.

Los archivos temporales, paquetes generados, dependencias y credenciales locales se excluyen de Git.
