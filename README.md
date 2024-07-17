**TTS API REST que recibe un texto y devuelve el speech del mismo gestionado por ElevenLabs.**

### Herramientas utilizadas:

- [Git](https://git-scm.com/downloads)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Node.js](https://nodejs.org/en)
- [ElevenLabs](https://elevenlabs.io/)

## Requisitos:

Para utilizar este servicio, debe tener una cuenta registrada en ElevenLabs y conseguir su API Key.

    ## Obtener su ApiKey:
        1.  Inicie sesión en ElevenLabs.
        2.  Haga clic en "My Workspace" y seleccione "Profile + API key".
        3.  Genere su API Key y cópiela para utilizarla.

    ## Obtener su Voice_Id:
        4.  Diríjase a la sección "Voices" y elija la voz que desee.
        5.  Haga clic en el botón "ID" para copiar el ID de la voz.

## Inicializar servicio:

Ingrese a la carpeta del servicio:

    ```bash
    cd Accusys_TTS
    ```

## Instalar dependencias

Ejecute la instalacion de las dependencias con el siguiente comando:

    ```bash
    npm install
    ```

## Levantar TTS

Dentro de la terminal en la carpeta del servicio ejecute el siguiente comando:

    ```bash
    npm start
    ```

### Uso de la aplicación:

A través del endpoint /tts, se recibe un objeto con las siguientes propiedades:

`text`: (String) - Texto que desea convertir a speech.
`apikey`: (String) - API Key generada.
`voice_id`: (String) - Voice ID que desea utilizar para generar el speech.

A través del endpoint /tts/stream, se recibe un objeto con las siguientes propiedades:

`text`: (String) - Texto que desea convertir a speech.
`apikey`: (String) - API Key generada.
`voice_id`: (String) - Voice ID que desea utilizar para generar el speech.

### Devolucion de la api:

A travez del endpoint /tts se guarda dentro de la carpeta "audios" el archivo de audio generado por elevenLabs con el nombre de la fecha y hora solicitada.
A travez del endpoint /tts/stream se devuelve via Streaming el audio del speech generado.

## Utilizar front-end del servicio:

Puede utilizar el servicio de tipo stream mediante el front-end.
Dentro de la carpeta "frontStream" se encuentra el archivo index.html que posee el codigo del front.
Modifique en la linea 81 las credenciales utilizadas para la peticion (Se detalla arriba de este archivo como obtenerlas).

En su navegador, ingrese al siguiente link: http://localhost:9000/index.html

Dentro del mismo, podrá encontrar un textArea para escribir lo que desea transcribir y luego el botón "Speech" para generar el audio. Después de unos segundos, debería escucharse el audio generado en ElevenLabs.
