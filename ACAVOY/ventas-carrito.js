const CarritoModule = {
    
    /**
     * Agrega un vehículo al carrito
     */
    agregar: function(vehiculoId, nombre, modelo, precio) {
        const item = {
            vehiculoId: vehiculoId,
            nombre: nombre,
            modelo: modelo,
            precio: precio
        };
        
        $.ajax({
            url: '/Ventas/AgregarAlCarrito',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(item),
            success: (response) => {
                if (response.exito) {
                    this.renderizar(response.carrito);
                    CalculosModule.actualizarTotales(response.totales);
                    VentaModule.actualizarBotonConfirmar();
                } else {
                    alert(response.mensaje || 'Error al agregar al carrito');
                }
            },
            error: (xhr, status, error) => {
                alert('Error al agregar al carrito: ' + error);
            }
        });
    },
    
    /**
     * Cambia la cantidad de un vehículo
     */
    cambiarCantidad: function(vehiculoId, nuevaCantidad) {
        $.ajax({
            url: '/Ventas/CambiarCantidad',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ vehiculoId: vehiculoId, cantidad: nuevaCantidad }),
            success: (response) => {
                if (response.exito) {
                    this.renderizar(response.carrito);
                    CalculosModule.actualizarTotales(response.totales);
                    VentaModule.actualizarBotonConfirmar();
                } else {
                    alert(response.mensaje || 'Error al cambiar cantidad');
                }
            },
            error: (xhr, status, error) => {
                alert('Error al cambiar cantidad: ' + error);
            }
        });
    },
    
    /**
     * Elimina un vehículo del carrito
     */
    eliminar: function(vehiculoId) {
        if (!confirm('¿Deseas eliminar este vehículo del carrito?')) {
            return;
        }
        
        $.ajax({
            url: '/Ventas/EliminarDelCarrito',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ vehiculoId: vehiculoId }),
            success: (response) => {
                if (response.exito) {
                    this.renderizar(response.carrito);
                    CalculosModule.actualizarTotales(response.totales);
                    VentaModule.actualizarBotonConfirmar();
                } else {
                    alert(response.mensaje || 'Error al eliminar del carrito');
                }
            },
            error: (xhr, status, error) => {
                alert('Error al eliminar del carrito: ' + error);
            }
        });
    },
    
    /**
     * Renderiza el carrito en la interfaz
     */
    renderizar: function(carrito) {
        const contenedor = $('#carrito-contenido');
        
        if (!carrito || carrito.length === 0) {
            contenedor.html(`
                <div class="carrito-vacio">
                    <p>🛒 El carrito está vacío</p>
                    <p style="font-size: 12px;">Agrega vehículos del catálogo</p>
                </div>
            `);
            return;
        }
        
        let html = '';
        carrito.forEach(item => {
            const precioFormateado = new Intl.NumberFormat('es-MX', {
                style: 'currency',
                currency: 'MXN'
            }).format(item.precio);
            
            html += `
                <div class="carrito-item">
                    <div class="item-details">
                        <div class="nombre">${item.nombre}</div>
                        <div class="modelo">${item.modelo}</div>
                        <div style="color: #27ae60; font-weight: 600; margin-top: 5px;">
                            ${precioFormateado}
                        </div>
                    </div>
                    <div class="item-cantidad">
                        <button onclick="CarritoModule.cambiarCantidad(${item.vehiculoId}, ${item.cantidad - 1})">-</button>
                        <span>${item.cantidad}</span>
                        <button onclick="CarritoModule.cambiarCantidad(${item.vehiculoId}, ${item.cantidad + 1})">+</button>
                    </div>
                    <button class="btn-remove" onclick="CarritoModule.eliminar(${item.vehiculoId})">
                        Eliminar
                    </button>
                </div>
            `;
        });
        
        contenedor.html(html);
    }
};
