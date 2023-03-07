import express from "express";
import mongoose from "mongoose";

const proyectoSchema = mongoose.Schema(
  {
    nombre: { type: String, trim: true, required: true },
    descripcion: { type: String, trim: true, required: true },
    fechaEntrega: { type: Date, default: Date.now() },
    cliente: { type: String, trim: true, required: true },
    creador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
    },
    colaboradores: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
      },
    ],
  },
  {
    tymestamps: true,
  }
);

const Proyecto = mongoose.model("Proyecto", proyectoSchema);

export default Proyecto;
