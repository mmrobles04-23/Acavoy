using System;
using System.Collections.Generic;
using System.Linq;
using AcaVoy.Models;

namespace AcaVoy.Services
{
    public class VentaService
    {
        // Simulación de datos - en producción vendría de base de datos
        
        public List<Vehiculo> ObtenerCatalogoVehiculos()
        {
            return new List<Vehiculo>
            {
                new Vehiculo
                {
                    Id = 1,
                    Nombre = "Nissan Versa 2024",
                    Modelo = "Sedán • 4 puertas • Automático",
                    Precio = 289900,
                    Marca = "Nissan",
                    Anio = 2024,
                    Disponible = true
                },
                new Vehiculo
                {
                    Id = 2,
                    Nombre = "Toyota Corolla 2024",
                    Modelo = "Sedán • 4 puertas • Automático",
                    Precio = 389900,
                    Marca = "Toyota",
                    Anio = 2024,
                    Disponible = true
                },
                new Vehiculo
                {
                    Id = 3,
                    Nombre = "Honda CR-V 2024",
                    Modelo = "SUV • 5 puertas • Automático",
                    Precio = 549900,
                    Marca = "Honda",
                    Anio = 2024,
                    Disponible = true
                },
                new Vehiculo
                {
                    Id = 4,
                    Nombre = "Mazda CX-5 2024",
                    Modelo = "SUV • 5 puertas • Automático",
                    Precio = 489900,
                    Marca = "Mazda",
                    Anio = 2024,
                    Disponible = true
                }
            };
        }

        public List<Promocion> ObtenerPromocionesActivas()
        {
            return new List<Promocion>
            {
                new Promocion
                {
                    Id = 1,
                    Codigo = "PROMO1",
                    Descripcion = "Descuento Cliente Frecuente",
                    Detalle = "5% de descuento en compra total",
                    Tipo = TipoPromocion.Porcentaje,
                    Valor = 0.05m,
                    Activa = true
                },
                new Promocion
                {
                    Id = 2,
                    Codigo = "PROMO2",
                    Descripcion = "Promoción Fin de Año",
                    Detalle = "$20,000 de descuento directo",
                    Tipo = TipoPromocion.MontoFijo,
                    Valor = 20000,
                    Activa = true
                },
                new Promocion
                {
                    Id = 3,
                    Codigo = "PROMO3",
                    Descripcion = "Seguro Gratis 1 Año",
                    Detalle = "Sin costo en el total",
                    Tipo = TipoPromocion.Beneficio,
                    Valor = 0,
                    Activa = true
                }
            };
        }

        public Cliente BuscarCliente(string termino)
        {
            // Simulación - en producción buscaría en base de datos
            if (!string.IsNullOrEmpty(termino))
            {
                return new Cliente
                {
                    Id = 1,
                    Nombre = "Juan Pérez García",
                    RFC = "PEGJ850101ABC",
                    Telefono = "55-1234-5678",
                    Email = "juan.perez@email.com"
                };
            }
            return null;
        }

        public decimal CalcularSubtotal(List<CarritoItem> items)
        {
            return items.Sum(item => item.Subtotal);
        }

        public decimal CalcularDescuentos(decimal subtotal, List<int> promocionesIds)
        {
            decimal descuento = 0;
            var promociones = ObtenerPromocionesActivas()
                .Where(p => promocionesIds.Contains(p.Id))
                .ToList();

            foreach (var promo in promociones)
            {
                switch (promo.Tipo)
                {
                    case TipoPromocion.Porcentaje:
                        descuento += subtotal * promo.Valor;
                        break;
                    case TipoPromocion.MontoFijo:
                        descuento += promo.Valor;
                        break;
                    case TipoPromocion.Beneficio:
                        // No afecta el monto monetario
                        break;
                }
            }

            return descuento;
        }

        public ConfirmarVentaResponse ConfirmarVenta(ConfirmarVentaRequest request)
        {
            try
            {
                // Calcular totales
                var subtotal = CalcularSubtotal(request.Items);
                var descuento = CalcularDescuentos(subtotal, request.PromocionesIds);
                var total = subtotal - descuento;

                // Generar folio único
                var folio = $"V-{DateTime.Now:yyyyMMddHHmmss}";

                // Crear la venta
                var venta = new Venta
                {
                    Folio = folio,
                    Fecha = DateTime.Now,
                    ClienteId = request.ClienteId,
                    Subtotal = subtotal,
                    Descuento = descuento,
                    Total = total,
                    MetodoPago = request.MetodoPago,
                    UsuarioRegistro = "mrobles", // Obtener del contexto de sesión
                    Detalles = request.Items.Select(item => new VentaDetalle
                    {
                        VehiculoId = item.VehiculoId,
                        Cantidad = item.Cantidad,
                        PrecioUnitario = item.Precio,
                        Subtotal = item.Subtotal
                    }).ToList()
                };

                // Aquí se guardaría en la base de datos
                // _context.Ventas.Add(venta);
                // _context.SaveChanges();

                return new ConfirmarVentaResponse
                {
                    Exito = true,
                    Mensaje = "Venta registrada exitosamente",
                    Folio = folio,
                    Total = total
                };
            }
            catch (Exception ex)
            {
                return new ConfirmarVentaResponse
                {
                    Exito = false,
                    Mensaje = $"Error al registrar la venta: {ex.Message}"
                };
            }
        }

        public Vehiculo ObtenerVehiculoPorId(int id)
        {
            return ObtenerCatalogoVehiculos().FirstOrDefault(v => v.Id == id);
        }
    }
}