const CalculosModule = {
    
    /**
     * Calcula el subtotal de todos los items en el carrito
     */
    calcularSubtotal: function() {
        let subtotal = 0;
        
        carrito.forEach(item => {
            subtotal += item.precio * item.cantidad;
        });
        
        return subtotal;
    },
    
    /**
     * Calcula los descuentos aplicados según las promociones seleccionadas
     */
    calcularDescuentos: function(subtotal) {
        let descuento = 0;
        
        // Promoción 1: Descuento del 5%
        if (document.getElementById('promo1').checked) {
            descuento += subtotal * 0.05;
        }
        
        // Promoción 2: Descuento fijo de $20,000
        if (document.getElementById('promo2').checked) {
            descuento += 20000;
        }
        
        // Promoción 3: Seguro gratis (no afecta el total monetario)
        // Solo es un beneficio adicional
        
        return descuento;
    },
    
    /**
     * Calcula y actualiza todos los totales en la interfaz
     */
    calcularTotal: function() {
        // Calcular subtotal
        const subtotal = this.calcularSubtotal();
        
        // Calcular descuentos
        const descuento = this.calcularDescuentos(subtotal);
        
        // Calcular total final
        const total = subtotal - descuento;
        
        // Actualizar la interfaz
        this.actualizarInterfaz(subtotal, descuento, total);
    },
    
    /**
     * Actualiza los valores en la interfaz
     */
    actualizarInterfaz: function(subtotal, descuento, total) {
        document.getElementById('resumen-subtotal').textContent = 
            '$' + subtotal.toLocaleString('es-MX', {minimumFractionDigits: 2});
        
        document.getElementById('resumen-descuento').textContent = 
            '-$' + descuento.toLocaleString('es-MX', {minimumFractionDigits: 2});
        
        document.getElementById('resumen-total').textContent = 
            '$' + total.toLocaleString('es-MX', {minimumFractionDigits: 2});
    },
    
    /**
     * Obtiene el total actual (útil para otras funciones)
     */
    obtenerTotal: function() {
        const subtotal = this.calcularSubtotal();
        const descuento = this.calcularDescuentos(subtotal);
        return subtotal - descuento;
    }
};