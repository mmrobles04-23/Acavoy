using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AcaVoy.Models
{
    // Modelo para Cliente
    public class Cliente
    {
        public int Id { get; set; }
        
        [Required(ErrorMessage = "El nombre es requerido")]
        public string Nombre { get; set; }
        
        [Required(ErrorMessage = "El RFC es requerido")]
        public string RFC { get; set; }
        
        [Required(ErrorMessage = "El teléfono es requerido")]
        public string Telefono { get; set; }
        
        public string Email { get; set; }
    }

    // Modelo para Vehículo
    public class Vehiculo
    {
        public int Id { get; set; }
        
        [Required]
        public string Nombre { get; set; }
        
        public string Modelo { get; set; }
        
        [Required]
        public decimal Precio { get; set; }
        
        public string Marca { get; set; }
        
        public int Anio { get; set; }
        
        public bool Disponible { get; set; }
    }

    // Modelo para Item del Carrito
    public class CarritoItem
    {
        public int VehiculoId { get; set; }
        public string Nombre { get; set; }
        public string Modelo { get; set; }
        public decimal Precio { get; set; }
        public int Cantidad { get; set; }
        
        public decimal Subtotal
        {
            get { return Precio * Cantidad; }
        }
    }

    // Modelo para Promoción
    public class Promocion
    {
        public int Id { get; set; }
        public string Codigo { get; set; }
        public string Descripcion { get; set; }
        public string Detalle { get; set; }
        public TipoPromocion Tipo { get; set; }
        public decimal Valor { get; set; }
        public bool Activa { get; set; }
    }

    public enum TipoPromocion
    {
        Porcentaje,
        MontoFijo,
        Beneficio
    }

    public enum MetodoPago
    {
        Contado,
        Credito,
        Financiamiento
    }

    // Modelo para la Venta completa
    public class Venta
    {
        public int Id { get; set; }
        public string Folio { get; set; }
        public DateTime Fecha { get; set; }
        
        public int ClienteId { get; set; }
        public Cliente Cliente { get; set; }
        
        public List<VentaDetalle> Detalles { get; set; }
        
        public decimal Subtotal { get; set; }
        public decimal Descuento { get; set; }
        public decimal Total { get; set; }
        
        public MetodoPago MetodoPago { get; set; }
        
        public string UsuarioRegistro { get; set; }
    }

    // Modelo para el detalle de cada vehículo en la venta
    public class VentaDetalle
    {
        public int Id { get; set; }
        public int VentaId { get; set; }
        public int VehiculoId { get; set; }
        public Vehiculo Vehiculo { get; set; }
        public int Cantidad { get; set; }
        public decimal PrecioUnitario { get; set; }
        public decimal Subtotal { get; set; }
    }

    // ViewModel para la vista de ventas
    public class VentaViewModel
    {
        public Cliente ClienteSeleccionado { get; set; }
        public List<Vehiculo> CatalogoVehiculos { get; set; }
        public List<CarritoItem> Carrito { get; set; }
        public List<Promocion> PromocionesDisponibles { get; set; }
        public List<int> PromocionesAplicadas { get; set; }
        public MetodoPago MetodoPago { get; set; }
        
        public decimal Subtotal { get; set; }
        public decimal Descuento { get; set; }
        public decimal Total { get; set; }
        
        public VentaViewModel()
        {
            Carrito = new List<CarritoItem>();
            PromocionesAplicadas = new List<int>();
            CatalogoVehiculos = new List<Vehiculo>();
            PromocionesDisponibles = new List<Promocion>();
        }
    }

    // Modelo para búsqueda de cliente
    public class BusquedaClienteRequest
    {
        public string Termino { get; set; }
    }

    // Modelo para confirmar venta
    public class ConfirmarVentaRequest
    {
        public int ClienteId { get; set; }
        public List<CarritoItem> Items { get; set; }
        public List<int> PromocionesIds { get; set; }
        public MetodoPago MetodoPago { get; set; }
    }

    // Respuesta de confirmación
    public class ConfirmarVentaResponse
    {
        public bool Exito { get; set; }
        public string Mensaje { get; set; }
        public string Folio { get; set; }
        public decimal Total { get; set; }
    }
}