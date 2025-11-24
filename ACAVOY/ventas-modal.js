const ModalModule = {
    
    /**
     * Muestra el modal con los datos de la venta confirmada
     */
    mostrar: function(cliente, vehiculos, total, folio) {
        const modal = document.getElementById('confirmModal');
        
        // Llenar los datos en el modal
        document.getElementById('modal-cliente').textContent = cliente;
        document.getElementById('modal-vehiculos').textContent = vehiculos;
        document.getElementById('modal-total').textContent = total;
        document.getElementById('modal-folio').textContent = folio;
        
        // Mostrar el modal
        modal.style.display = 'flex';
    },
    
    /**
     * Cierra el modal y resetea el formulario
     */
    cerrar: function() {
        const modal = document.getElementById('confirmModal');
        
        // Ocultar el modal
        modal.style.display = 'none';
        
        // Resetear todo el formulario de venta
        VentaModule.resetear();
    }
};

// Cerrar el modal si el usuario hace clic fuera de la ventana
window.onclick = function(event) {
    const modal = document.getElementById('confirmModal');
    if (event.target == modal) {
        ModalModule.cerrar();
    }
}
