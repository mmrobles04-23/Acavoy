const ClienteModule = {
    
    /**
     * Selecciona un cliente basado en la búsqueda
     */
    seleccionar: function() {
        const busqueda = document.getElementById('buscar-cliente').value;
        
        // Validar que hay algo en el campo de búsqueda
        if (busqueda.trim() === '') {
            alert('Por favor ingresa un nombre, RFC o teléfono para buscar');
            return;
        }
        
        // Simular búsqueda de cliente (en producción sería una llamada a API)
        clienteActual = {
            nombre: 'Juan Pérez García',
            rfc: 'PEGJ850101ABC',
            telefono: '55-1234-5678'
        };
        
        // Actualizar la interfaz
        this.mostrarInformacion();
        
        // Marcar que ya hay un cliente seleccionado
        clienteSeleccionado = true;
        
        // Actualizar el botón de confirmar venta
        VentaModule.actualizarBotonConfirmar();
    },
    
    /**
     * Muestra la información del cliente seleccionado
     */
    mostrarInformacion: function() {
        document.getElementById('cliente-nombre').textContent = clienteActual.nombre;
        document.getElementById('cliente-rfc').textContent = clienteActual.rfc;
        document.getElementById('cliente-telefono').textContent = clienteActual.telefono;
        
        // Mostrar el panel de información
        document.getElementById('cliente-info').style.display = 'block';
        
        // Ocultar el botón de seleccionar
        document.getElementById('btn-seleccionar-cliente').style.display = 'none';
    },
    
    /**
     * Permite cambiar de cliente
     */
    cambiar: function() {
        // Ocultar información del cliente
        document.getElementById('cliente-info').style.display = 'none';
        
        // Mostrar el botón de seleccionar
        document.getElementById('btn-seleccionar-cliente').style.display = 'block';
        
        // Limpiar el campo de búsqueda
        document.getElementById('buscar-cliente').value = '';
        
        // Marcar que no hay cliente seleccionado
        clienteSeleccionado = false;
        
        // Actualizar el botón de confirmar venta
        VentaModule.actualizarBotonConfirmar();
    }
};