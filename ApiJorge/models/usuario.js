// Importar el esquema mongoose
const { Schema, model } = require('mongoose');

// Función de validación personalizada para verificar números negativos en el rango específico
const validateLongitudes = (value) => {
  return value >= -75.50 && value <= -75.43;
};

// Definir la estructura de la colección
const UsuarioSchema = Schema({
  direccion: {
    type: String,
    required: [true, 'La dirección es obligatoria']
  },
  latitud: {
    type: Number,
    required: [true, 'La latitud es obligatoria'],
    min: [6.14, 'El valor mínimo permitido es 6.14'],
    max: [6.200, 'El valor máximo permitido es 6.200']
  },
  longitudes: {
    type: Number,
    required: [true, 'La longitud es obligatoria'],
    validate: {
      validator: validateLongitudes,
      message: 'El valor debe estar en el rango de -75.43 a -75.50'
    }
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción es obligatoria']
  },
  fechareporte: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('Usuario', UsuarioSchema);
