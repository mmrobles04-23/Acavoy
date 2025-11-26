const ClienteModule = {
    
    /**
     * Selecciona un cliente mediante búsqueda
     */
    seleccionar: function() {
        const busqueda = $('#buscar-cliente').val();
        
        if (!busqueda || busqueda.trim() === '') {
            alert('Por favor ingresa un nombre, RFC o teléfono para buscar');
            return;
        }
        
        // Mostrar loader (opcional)
        this.mostrarLoader(true);
        
        // Llamada AJAX al servidor
        $.ajax({
            url: '/Ventas/BuscarCliente',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ termino: busqueda }),
            success: (response) => {
                this.mostrarLoader(false);
                
                if (response.exito) {
                    this.mostrarInformacion(response.cliente);
                    VentaModule.actualizarBotonConfirmar();
                } else {
                    alert(response.mensaje || 'No se encontró el cliente');
                }
            },
            error: (xhr, status, error) => {
                this.mostrarLoader(false);
                alert('Error al buscar cliente: ' + error);
            }
        });
    },
    
    /**
     * Muestra la información del cliente
     */
    mostrarInformacion: function(cliente) {
        $('#cliente-nombre').text(cliente.nombre);
        $('#cliente-rfc').text(cliente.rfc);
        $('#cliente-telefono').text(cliente.telefono);
        
        $('#cliente-info').show();
        $('#btn-seleccionar-cliente').hide();
    },
    
    /**
     * Permite cambiar de cliente
     */
    cambiar: function() {
        $.ajax({
            url: '/Ventas/CambiarCliente',
            type: 'POST',
            success: (response) => {
                if (response.exito) {
                    $('#cliente-info').hide();
                    $('#btn-seleccionar-cliente').show();
                    $('#buscar-cliente').val('');
                    VentaModule.actualizarBotonConfirmar();
                }
            },
            error: (xhr, status, error) => {
                alert('Error al cambiar cliente: ' + error);
            }
        });
    },
    
    /**
     * Muestra u oculta el loader
     */
    mostrarLoader: function(mostrar) {
        // Implementar un loader si es necesario
        if (mostrar) {
            $('#btn-seleccionar-cliente').prop('disabled', true).text('Buscando...');
        } else {
            $('#btn-seleccionar-cliente').prop('disabled', false).text('Seleccionar Cliente');
        }
    }
};
