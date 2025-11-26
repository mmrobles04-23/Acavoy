using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using AcaVoy.Models;
using AcaVoy.Services;

namespace AcaVoy.Controllers
{
    public class VentasController : Controller
    {
        private readonly VentaService _ventaService;
        private const string CARRITO_SESSION_KEY = "Carrito";
        private const string CLIENTE_SESSION_KEY = "ClienteActual";
        private const string PROMOCIONES_SESSION_KEY = "PromocionesAplicadas";

        public VentasController()
        {
            _ventaService = new VentaService();
        }

        // GET: /Ventas
        public IActionResult Index()
        {
            var viewModel = new VentaViewModel
            {
                CatalogoVehiculos = _ventaService.ObtenerCatalogoVehiculos(),
                PromocionesDisponibles = _ventaService.ObtenerPromocionesActivas(),
                Carrito = ObtenerCarritoDesdeSession(),
                ClienteSeleccionado = ObtenerClienteDesdeSession(),
                PromocionesAplicadas = ObtenerPromocionesDesdeSession()
            };

            CalcularTotales(viewModel);

            return View(viewModel);
        }

        // POST: /Ventas/BuscarCliente
        [HttpPost]
        public IActionResult BuscarCliente([FromBody] BusquedaClienteRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Termino))
            {
                return Json(new { exito = false, mensaje = "Debe ingresar un término de búsqueda" });
            }

            var cliente = _ventaService.BuscarCliente(request.Termino);

            if (cliente == null)
            {
                return Json(new { exito = false, mensaje = "No se encontró el cliente" });
            }

            // Guardar en sesión
            GuardarClienteEnSession(cliente);

            return Json(new { exito = true, cliente = cliente });
        }

        // POST: /Ventas/CambiarCliente
        [HttpPost]
        public IActionResult CambiarCliente()
        {
            LimpiarClienteDeSession();
            return Json(new { exito = true });
        }

        // POST: /Ventas/AgregarAlCarrito
        [HttpPost]
        public IActionResult AgregarAlCarrito([FromBody] CarritoItem item)
        {
            var carrito = ObtenerCarritoDesdeSession();
            var vehiculo = _ventaService.ObtenerVehiculoPorId(item.VehiculoId);

            if (vehiculo == null)
            {
                return Json(new { exito = false, mensaje = "Vehículo no encontrado" });
            }

            var itemExistente = carrito.FirstOrDefault(c => c.VehiculoId == item.VehiculoId);

            if (itemExistente != null)
            {
                itemExistente.Cantidad++;
            }
            else
            {
                carrito.Add(new CarritoItem
                {
                    VehiculoId = vehiculo.Id,
                    Nombre = vehiculo.Nombre,
                    Modelo = vehiculo.Modelo,
                    Precio = vehiculo.Precio,
                    Cantidad = 1
                });
            }

            GuardarCarritoEnSession(carrito);

            var totales = CalcularTotalesJson(carrito);

            return Json(new
            {
                exito = true,
                carrito = carrito,
                totales = totales
            });
        }

        // POST: /Ventas/CambiarCantidad
        [HttpPost]
        public IActionResult CambiarCantidad([FromBody] dynamic data)
        {
            int vehiculoId = data.vehiculoId;
            int cantidad = data.cantidad;

            var carrito = ObtenerCarritoDesdeSession();
            var item = carrito.FirstOrDefault(c => c.VehiculoId == vehiculoId);

            if (item == null)
            {
                return Json(new { exito = false, mensaje = "Item no encontrado en el carrito" });
            }

            item.Cantidad = cantidad;

            if (item.Cantidad <= 0)
            {
                carrito.Remove(item);
            }

            GuardarCarritoEnSession(carrito);

            var totales = CalcularTotalesJson(carrito);

            return Json(new
            {
                exito = true,
                carrito = carrito,
                totales = totales
            });
        }

        // POST: /Ventas/EliminarDelCarrito
        [HttpPost]
        public IActionResult EliminarDelCarrito([FromBody] dynamic data)
        {
            int vehiculoId = data.vehiculoId;

            var carrito = ObtenerCarritoDesdeSession();
            var item = carrito.FirstOrDefault(c => c.VehiculoId == vehiculoId);

            if (item != null)
            {
                carrito.Remove(item);
                GuardarCarritoEnSession(carrito);
            }

            var totales = CalcularTotalesJson(carrito);

            return Json(new
            {
                exito = true,
                carrito = carrito,
                totales = totales
            });
        }

        // POST: /Ventas/AplicarPromocion
        [HttpPost]
        public IActionResult AplicarPromocion([FromBody] dynamic data)
        {
            int promocionId = data.promocionId;
            bool aplicar = data.aplicar;

            var promociones = ObtenerPromocionesDesdeSession();

            if (aplicar)
            {
                if (!promociones.Contains(promocionId))
                {
                    promociones.Add(promocionId);
                }
            }
            else
            {
                promociones.Remove(promocionId);
            }

            GuardarPromocionesEnSession(promociones);

            var carrito = ObtenerCarritoDesdeSession();
            var totales = CalcularTotalesJson(carrito);

            return Json(new
            {
                exito = true,
                totales = totales
            });
        }

        // POST: /Ventas/Confirmar
        [HttpPost]
        public IActionResult Confirmar([FromBody] ConfirmarVentaRequest request)
        {
            var cliente = ObtenerClienteDesdeSession();

            if (cliente == null)
            {
                return Json(new { exito = false, mensaje = "Debe seleccionar un cliente" });
            }

            var carrito = ObtenerCarritoDesdeSession();

            if (carrito.Count == 0)
            {
                return Json(new { exito = false, mensaje = "El carrito está vacío" });
            }

            request.ClienteId = cliente.Id;
            request.Items = carrito;
            request.PromocionesIds = ObtenerPromocionesDesdeSession();

            var resultado = _ventaService.ConfirmarVenta(request);

            if (resultado.Exito)
            {
                // Limpiar la sesión después de confirmar
                LimpiarSession();
            }

            return Json(resultado);
        }

        // Métodos auxiliares para manejo de sesión

        private List<CarritoItem> ObtenerCarritoDesdeSession()
        {
            var carritoJson = HttpContext.Session.GetString(CARRITO_SESSION_KEY);
            return string.IsNullOrEmpty(carritoJson)
                ? new List<CarritoItem>()
                : JsonConvert.DeserializeObject<List<CarritoItem>>(carritoJson);
        }

        private void GuardarCarritoEnSession(List<CarritoItem> carrito)
        {
            HttpContext.Session.SetString(CARRITO_SESSION_KEY, JsonConvert.SerializeObject(carrito));
        }

        private Cliente ObtenerClienteDesdeSession()
        {
            var clienteJson = HttpContext.Session.GetString(CLIENTE_SESSION_KEY);
            return string.IsNullOrEmpty(clienteJson)
                ? null
                : JsonConvert.DeserializeObject<Cliente>(clienteJson);
        }

        private void GuardarClienteEnSession(Cliente cliente)
        {
            HttpContext.Session.SetString(CLIENTE_SESSION_KEY, JsonConvert.SerializeObject(cliente));
        }

        private void LimpiarClienteDeSession()
        {
            HttpContext.Session.Remove(CLIENTE_SESSION_KEY);
        }

        private List<int> ObtenerPromocionesDesdeSession()
        {
            var promocionesJson = HttpContext.Session.GetString(PROMOCIONES_SESSION_KEY);
            return string.IsNullOrEmpty(promocionesJson)
                ? new List<int>()
                : JsonConvert.DeserializeObject<List<int>>(promocionesJson);
        }

        private void GuardarPromocionesEnSession(List<int> promociones)
        {
            HttpContext.Session.SetString(PROMOCIONES_SESSION_KEY, JsonConvert.SerializeObject(promociones));
        }

        private void LimpiarSession()
        {
            HttpContext.Session.Remove(CARRITO_SESSION_KEY);
            HttpContext.Session.Remove(CLIENTE_SESSION_KEY);
            HttpContext.Session.Remove(PROMOCIONES_SESSION_KEY);
        }

        private void CalcularTotales(VentaViewModel viewModel)
        {
            viewModel.Subtotal = _ventaService.CalcularSubtotal(viewModel.Carrito);
            viewModel.Descuento = _ventaService.CalcularDescuentos(viewModel.Subtotal, viewModel.PromocionesAplicadas);
            viewModel.Total = viewModel.Subtotal - viewModel.Descuento;
        }

        private object CalcularTotalesJson(List<CarritoItem> carrito)
        {
            var promociones = ObtenerPromocionesDesdeSession();
            var subtotal = _ventaService.CalcularSubtotal(carrito);
            var descuento = _ventaService.CalcularDescuentos(subtotal, promociones);
            var total = subtotal - descuento;

            return new
            {
                subtotal = subtotal,
                descuento = descuento,
                total = total
            };
        }
    }
}