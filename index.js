const express = require("express");
const app = express();
const port = 4000;

app.use(express.json());

app.get("/", (req, res) => {
  try {
    return res.json({
      ok: true,
      msg: "Productos obtenidos",
      productos: [],
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error en el servidor, intentelo mas tarde",
      productos: [],
    });
  }
});

app.post("/", (req, res) => {
  const nombre = req.body.nombre;
  const precio = req.body.precio;

  if (!nombre) {
    return res.status(400).json({
      ok: false,
      msg: "El nombre es obligatorio",
      producto: {},
    });
  }

  const productoCreado = {
    nombre,
    precio,
  };

  return res.json({
    ok: true,
    msg: "Producto creado",
    producto: productoCreado,
  });
});

app.put("/:id", (req, res) => {
  const { nombre, precio, descripcion } = req.body;
  const { id } = req.params;

  const productoActualizado = {
    nombre,
    precio,
    descripcion,
  };

  return res.json({
    ok: true,
    msg: `El producto ${id} se ha actualizado`,
    producto: productoActualizado,
  });
});

app.delete("/:id", (req, res) => {
  const { id } = req.params;

  return res.json({
    ok: true,
    msg: `El producto ${id} se ha eliminado`,
    producto: {},
  });
});

app.listen(port, () => {
  console.log(`servidor corriendo en el puerto ${port}`);
});
