
// Login - version segura (corrige la inyeccion SQL del server-vulnerable.js)
// Aqui ya NO concateno la entrada en el query. Uso consultas preparadas con ?
// para que lo que escribe el usuario se trate como dato y no como codigo SQL.
//
// npm install express sqlite3
// node server-seguro.js   ->  http://localhost:3001

const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

const db = new sqlite3.Database(":memory:");

// Misma base de datos de prueba que el server vulnerable
db.serialize(() => {
  db.run(
    "CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)",
  );
  db.run("INSERT INTO users (username, password) VALUES ('admin', 'admin')");
  db.run("INSERT INTO users (username, password) VALUES ('juan', '1234')");
});

app.post("/login-seguro", (req, res) => {
  const { username, password } = req.body;

  // Los ? son los placeholders. El usuario y el password se mandan aparte
  // en el arreglo, asi una comilla o un -- ya no rompen la consulta.
  const query = "SELECT * FROM users WHERE username = ? AND password = ?";

  console.log("Query preparada:", query);
  console.log("Parametros     :", [username, password]);

  db.get(query, [username, password], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (row) return res.json({ ok: true, user: row.username });
    res.status(401).json({ ok: false, message: "Credenciales inválidas" });
  });
});

app.listen(3001, () => console.log("http://localhost:3001"));
