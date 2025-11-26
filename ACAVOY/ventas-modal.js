const ModalModule = {
    
    /**
     * Muestra el modal con los datos de la venta
     */
    mostrar: function(ventaData) {
        const formatearMoneda = (valor) => {
            return new Intl.NumberFormat('es-MX', {
                style: 'currency',
                currency: 'MXN'
            }).format(valor);
        };
        
        // Obtener datos actuales de la interfaz
        const cliente = $('#cliente-nombre').text();
        const vehiculos = this.obtenerListaVehiculos();
        
        // Llenar el modal
        $('#modal-cliente').text(cliente);
        $('#modal-vehiculos').text(vehiculos);
        $('#modal-total').text(formatearMoneda(ventaData.total));
        $('#modal-folio').text(ventaData.folio);
        
        // Mostrar el modal
        $('#confirmModal').css('display', 'flex');
    },
    
    /**
     * Cierra el modal
     */
    cerrar: function() {
        $('#confirmModal').hide();
        
        // Recargar la página para limpiar todo
        window.location.href = '/Ventas/Index';
    },
    
    /**
     * Obtiene la lista de vehículos del carrito
     */
    obtenerListaVehiculos: function() {
        const items = [];
        $('.carrito-item').each(function() {
            const nombre = $(this).find('.nombre').text();
            const cantidad = $(this).find('.item-cantidad span').text();
            items.push(`${cantidad}x ${nombre}`);
        });
        return items.join(', ');
    }
};

// Cerrar modal al hacer clic fuera
$(window).on('click', function(event) {
    if ($(event.target).is('#confirmModal')) {
        ModalModule.cerrar();
    }
});
