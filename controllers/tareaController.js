import Tarea from "../models/Tarea.js";
import Proyecto from "../models/Proyecto.js";

const agregarTarea = async (req, res) => {
  const { proyecto } = req.body;
  const existeProyecto = await Proyecto.findById(proyecto);
  if (!existeProyecto) {
    const error = new Error("El proyecto no existe");
    return res.status(404).json({ message: error.message });
  }

  if (existeProyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("No tienes los permisos para agregar tareas");
    return res.status(404).json({ message: error.message });
  }

  try {
    const tareaAlmacenada = await Tarea.create(req.body);
    //almancenar el ID en el proyecto
    existeProyecto.tareas.push(tareaAlmacenada._id);
    await existeProyecto.save();
    res.status(200).json(tareaAlmacenada);
  } catch (error) {
    console.log(error);
  }
};

const obtenerTarea = async (req, res) => {
  const { id } = req.params;
  const tarea = await Tarea.findById(id).populate("proyecto");
  if (!tarea) {
    const error = new Error("Hubo un error");
    return res.status(404).json({ message: error.message });
  }

  if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Accion no valida");
    return res.status(403).json({ message: error.message });
  }

  res.status(200).json(tarea);
};

const actualizarTarea = async (req, res) => {
  const { id } = req.params;
  const tarea = await Tarea.findById(id).populate("proyecto");
  if (!tarea) {
    const error = new Error("Hubo un error");
    return res.status(404).json({ message: error.message });
  }

  if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Accion no valida");
    return res.status(403).json({ message: error.message });
  }
  tarea.nombre = req.body.nombre || tarea.nombre;
  tarea.descripcion = req.body.descripcion || tarea.descripcion;
  tarea.prioridad = req.body.prioridad || tarea.prioridad;
  tarea.fechaEntrega = req.body.fechaEntrega || tarea.fechaEntrega;

  try {
    const tareaAlmacenada = await tarea.save();
    res.status(200).json(tareaAlmacenada);
  } catch (error) {
    console.log(error);
  }
};

const eliminarTarea = async (req, res) => {
  const { id } = req.params;
  const tarea = await Tarea.findById(id).populate("proyecto");
  if (!tarea) {
    const error = new Error("Hubo un error");
    return res.status(404).json({ message: error.message });
  }

  if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Accion no valida");
    return res.status(403).json({ message: error.message });
  }

  try {
    const proyecto = await Proyecto.findById(tarea.proyecto);
    proyecto.tareas.pull(tarea._id);

    //promise allsettled
    await Promise.allSettled([await proyecto.save(), await tarea.deleteOne()]);
    res.status(200).json({ msg: "La Tarea se elimino" });
  } catch (error) {
    console.log(error);
  }
};

const cambiarEstado = async (req, res) => {
  const { id } = req.params;
  const tarea = await Tarea.findById(id).populate("proyecto");
  if (!tarea) {
    const error = new Error("Hubo un error");
    return res.status(404).json({ message: error.message });
  }
  if (
    tarea.proyecto.creador.toString() !== req.usuario._id.toString() &&
    !tarea.proyecto.colaboradores.some(
      (colaborador) => colaborador._id.toString() === req.usuario._id.toString()
    )
  ) {
    const error = new Error("Accion no valida");
    return res.status(403).json({ message: error.message });
  }
  tarea.estado = !tarea.estado;
  tarea.completado = req.usuario._id;
  await tarea.save();
  const tareaAlmacenada = await Tarea.findById(id)
    .populate("proyecto")
    .populate("completado");
  res.status(200).json(tareaAlmacenada);
};

export {
  agregarTarea,
  obtenerTarea,
  actualizarTarea,
  eliminarTarea,
  cambiarEstado,
};
