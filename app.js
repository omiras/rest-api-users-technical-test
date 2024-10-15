/**
 * Pequeñas victorias: crear el endpoint de tipo POST y comprobar que la información que nos piden nos llega
 */

const express = require('express');
const fs = require('fs');

const app = express();

// necesito procesar las peticiones de tipo POST en formato JSON
app.use(express.json())

app.post('/users', (req, res) => {

    // Utilizamos el operador de desestructuración para obtener el "name" y los "surnames" del cuerpo de la petición POST

    // req.body.name 
    // req.body.surnames

    // TODO: Impleemntar validación. Si no nos han informado del valor de 'name' o del vaor de 'surnames' deberíamos devolver un error y no escribir nada en el fichero de users.txt
    const { name, surnames } = req.body;

    // Escribimos la información en un fichero. Usamos el método appendFileSync para escribir la información al final del fichero
    const newRow = `${name},${surnames}\n` // \n significa salto de línea (cómo hacer un enter)
    fs.appendFileSync("users.txt", newRow);

    // devolvemos una respuesta al cliente indicando que todo ha ido bien
    res.status(201).json({
        "message": "User added successfully",
        "user": req.body
    })

})


app.get('/users', (req, res) => {

    // leemos todo el fichero
    const data = fs.readFileSync('users.txt', 'utf8');
    console.log("🚀 ~ file: app.js:43 ~ app.get ~ data:", data)

    // utilizamos el método split para separar el string por saltos de línea
    const parsedData = data.split('\n');
    console.log("🚀 ~ file: app.js:47 ~ app.get ~ parsedData:", parsedData)
    parsedData.pop();

    // Corregir a las 21.07-> pasar el 'parsedData' a un array de objetos (manualmente o usando map)

    // "Manual con forEach"
    let users = [];
    // parsedData.forEach((p) => {
    //     const parsedPerson = p.split(',');
    //     users.push({
    //         name: parsedPerson[0],
    //         surnames: parsedPerson[1]
    //     });
    // });
    users = parsedData.map(p => {
        const parsedPerson = p.split(',');
        return {
            name: parsedPerson[0],
            surnames: parsedPerson[1]
        }
    })

    // devolvemos la respuesta (faltan cosas)
    res.status(200).json({
        "message": "Users retrieved successfully",
        "results": users
    })

})

app.listen(3000, () => {
    console.log("Sevidor esuchando por el puerto 3000 correctamente");
})