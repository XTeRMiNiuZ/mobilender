# mobilender-test

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

Hola, lo que aparece arriba son los comandos básicos para ejecutar este proyecto.
El archivo nuxt.config.js tiene configuraciones únicamente funcionales para la API reqres(https://reqres.in/) por lo que para usarlo con datos reales tendrán que hacerle ajustes a este archivo.

Para usar el sistema tendrán que usar las credenciales de acceso que vienen en la página de la API:
- usuario: eve.holt@reqres.in
- contraseña: cityslicka

Todas las entradas de datos también está proporcionadas por esta API repitiendo la misma estructura de datos en las vistas que se crearon para este mini proyecto.

Las rutas que se diseñaron y probaron son:
- localhost:3000
- localhost:3000/login
- localhost:3000/inspect
- localhost:3000/groups
- localhost:3000/changes

Como no se hicieron pruebas unitarias, realicé un documento de pruebas que podrían usar como plantilla para el sistema ficticio.

El link es el siguiente: 
https://docs.google.com/spreadsheets/d/1sGYAKOSywKlaWk8wnke3cUYwtuYTA5ImqEmVIiPbzoc/edit?usp=sharing

Mas allá de esas ruta se tendrían que trabajar dependiendo las especificaciones del mismo proyecto.

## License & Copyright

Noé Ramírez Guerrero, Ingeniero de software

Licensed under the [MIT License](LICENSE)