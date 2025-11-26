const VentaModule = {
    
    /**
     * Confirma la venta
     */
    confirmar: function() {
        // Obtener el método de pago seleccionado
        const metodoPago = parseInt($('input[name="metodo-pago"]:checked').val());
        
        // Confirmar con el usuario
        if (!confirm('¿Deseas confirmar esta venta?')) {
            return;
        }
        
        // Mostrar loader
        this.mostrarLoader(true);
        
        // Preparar los datos
        const request = {
            metodoPago: metodoPago
        };
        
        // Llamada AJAX al servidor
        $.ajax({
            url: '/Ventas/Confirmar',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(request),
            success: (response) => {
                this.mostrarLoader(false);
                
                if (response.exito) {
                    ModalModule.mostrar(response);
                } else {
                    alert(response.mensaje || 'Error al confirmar la venta');
                }
            },
            error: (xhr, status, error) => {
                this.mostrarLoader(false);
                alert('Error al confirmar la venta: ' + error);
            }
        });
    },
    
    /**
     * Actualiza el estado del botón de confirmar
     */
    actualizarBotonConfirmar: function() {
        const clienteSeleccionado = $('#cliente-info').is(':visible');
        const carritoVacio = $('.carrito-vacio').length > 0;
        
        const btn = $('#btn-confirmar-venta');
        btn.prop('disabled', !clienteSeleccionado || carritoVacio);
    },
    
    /**
     * Muestra u oculta el loader
     */
    mostrarLoader: function(mostrar) {
        const btn = $('#btn-confirmar-venta');
        if (mostrar) {
            btn.prop('disabled', true).text('Procesando...');
        } else {
            btn.text('Confirmar Venta');
            this.actualizarBotonConfirmar();
        }
    }
};
