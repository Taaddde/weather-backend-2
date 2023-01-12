
![Logo](https://static.vecteezy.com/system/resources/previews/002/220/403/non_2x/weather-banner-vector.jpg)


# API de Clima

Una API de clima que permite a los desarrolladores acceder a datos meteorológicos a través de peticiones HTTP. Esta API utiliza Nest.js como su plataforma de programación y Fastify como su framework web para manejar las solicitudes y las respuestas HTTP.


## Instalación

Instalar módulos

```bash
  npm install
```

Se recomienda usar una versión de node ^19.0.0


## Variables de entorno

Para ejecutar este proyecto, se requiere tener un archivo .env ubicado en la raíz del mismo con estos parámetors:
```bash
  OPENWEATHER_KEY="3a65e841e72e1cfe8fb4f96e311b4e76"
  PORT=3000
```

## Ejecutar la app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API Reference

#### Location

```http
  GET /v1/location
```

#### Current

```http
  GET /v1/current/${city}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `city`      | `string` | *Optional*. Nombre de la ciudad |

#### Forecast

```http
  GET /v1/forecast/${city}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `city`      | `string` | *Optional*. Nombre de la ciudad |



## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## Autor

- [@Taaddde](https://github.com/Taaddde)

