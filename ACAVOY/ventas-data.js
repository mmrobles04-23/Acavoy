// Variable global para el carrito
let carrito = [];

// Variable para saber si hay un cliente seleccionado
let clienteSeleccionado = false;

// Datos del cliente actual
let clienteActual = {
    nombre: '',
    rfc: '',
    telefono: ''
};

// Catálogo de vehículos disponibles (podría venir de una API)
const catalogoVehiculos = [
    {
        id: 1,
        nombre: 'Nissan Versa 2024',
        modelo: 'Sedán • 4 puertas • Automático',
        precio: 289900
    },
    {
        id: 2,
        nombre: 'Toyota Corolla 2024',
        modelo: 'Sedán • 4 puertas • Automático',
        precio: 389900
    },
    {
        id: 3,
        nombre: 'Honda CR-V 2024',
        modelo: 'SUV • 5 puertas • Automático',
        precio: 549900
    },
    {
        id: 4,
        nombre: 'Mazda CX-5 2024',
        modelo: 'SUV • 5 puertas • Automático',
        precio: 489900
    }
];

// Promociones disponibles
const promociones = [
    {
        id: 'promo1',
        tipo: 'porcentaje',
        valor: 0.05,
        descripcion: 'Descuento Cliente Frecuente - 5%'
    },
    {
        id: 'promo2',
        tipo: 'fijo',
        valor: 20000,
        descripcion: 'Promoción Fin de Año - $20,000'
    },
    {
        id: 'promo3',
        tipo: 'beneficio',
        valor: 0,
        descripcion: 'Seguro Gratis 1 Año'
    }
];