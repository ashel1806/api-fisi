# FISI - API 
API para poder subir y obtener información sobre los cursos y profesores de la facultad de Ingeniería de Sistemas

## Endpoints

Obtener todos los `Profesores`

<https://fisi-unmsm.herokuapp.com/api/profesores>

Obtener un `Profesor` por `:id`

#### Ejemplo: 

<https://fisi-unmsm.herokuapp.com/api/profesores/61de80c6f2d73d8895658ec3>

##### Respuesta:

```js
{
  nombres: "Santiago Domingo",
  apellidos: "Moquillaza Hernandez",
  correo: "smoquillazah@unmsm.edu.pe",
  facultad: "FISI",
  cursos: [
    "61de823af2d73d8895658ed5",
  ],
  id: "61de80c6f2d73d8895658ec3"
}
```

Obtener todos los `Cursos`

<https://fisi-unmsm.herokuapp.com/api/cursos>

Obtener un `Curso` por `:id`

#### Ejemplo: 

<https://fisi-unmsm.herokuapp.com/api/cursos/61de823af2d73d8895658ed5>

##### Respuesta:

```js
{
  nombre: "Matemática Discreta",
  profesores: [
    "61de80c6f2d73d8895658ec3"
  ],
  creditos: 3,
  ciclo: 4,
  sylabus: "https://drive.google.com/file/d/1uRMgBl1tnqDZQTxtJV6_RKOqtj0iwSAP&export=download",
  id: "61de823af2d73d8895658ed5"
}
```

#### _NOTA: Si estas accediendo a los endpoints desde el navegador, probablemente necesites [esta extensión](https://chrome.google.com/webstore/detail/json-viewer/gbmdgpbipfallnflgajpaliibnhdgobh?hl=es)_
