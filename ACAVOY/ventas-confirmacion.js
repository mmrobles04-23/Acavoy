const VentaModule = {
    
    /**
     * Valida que se cumplan las condiciones para confirmar la venta
     */
    validar: function() {
        // Debe haber un cliente seleccionado
        if (!clienteSeleccionado) {
            alert('Debes seleccionar un cliente antes de confirmar la venta');
            return false;
        }
        
        // Debe haber al menos un vehículo en el carrito
        if (carrito.length === 0) {
            alert('Debes agregar al menos un vehículo al carrito');
            return false;
        }
        
        return true;
    },
    
    /**
     * Confirma la venta y muestra el modal de confirmación
     */
    confirmar: function() {
        // Validar antes de confirmar
        if (!this.validar()) {
            return;
        }
        
        // Generar un folio único para la venta
        const folio = 'V-' + Date.now();
        
        // Obtener los datos necesarios
        const cliente = clienteActual.nombre;
        const total = document.getElementById('resumen-total').textContent;
        
        // Crear lista de vehículos vendidos
        const vehiculos = carrito.map(item => 
            `${item.cantidad}x ${item.nombre}`
        ).join(', ');
        
        // Mostrar el modal con la información
        ModalModule.mostrar(cliente, vehiculos, total, folio);
        
        // Aquí se haría la llamada a la API para guardar la venta
        // this.guardarEnServidor(folio, cliente, carrito, total);
    },
    
    /**
     * Actualiza el estado del botón de confirmar venta
     */
    actualizarBotonConfirmar: function() {
        const btn = document.getElementById('btn-confirmar-venta');
        
        // El botón solo está habilitado si hay cliente Y productos en el carrito
        btn.disabled = !(clienteSeleccionado && carrito.length > 0);
    },
    
    /**
     * Resetea todo el formulario de venta (después de confirmar)
     */
    resetear: function() {
        // Vaciar el carrito
        CarritoModule.vaciar();
        
        // Quitar cliente
        ClienteModule.cambiar();
        
        // Desmarcar todas las promociones
        document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
            cb.checked = false;
        });
        
        // Resetear método de pago a "contado"
        document.querySelector('input[name="metodo-pago"][value="contado"]').checked = true;
        
        // Recalcular totales
        CalculosModule.calcularTotal();
    }
};