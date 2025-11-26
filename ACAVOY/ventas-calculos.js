const CalculosModule = {
    
    /**
     * Aplica o quita una promoción
     */
    aplicarPromocion: function(promocionId, aplicar) {
        $.ajax({
            url: '/Ventas/AplicarPromocion',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ promocionId: promocionId, aplicar: aplicar }),
            success: (response) => {
                if (response.exito) {
                    this.actualizarTotales(response.totales);
                } else {
                    alert(response.mensaje || 'Error al aplicar promoción');
                }
            },
            error: (xhr, status, error) => {
                alert('Error al aplicar promoción: ' + error);
            }
        });
    },
    
    /**
     * Actualiza los totales en la interfaz
     */
    actualizarTotales: function(totales) {
        const formatearMoneda = (valor) => {
            return new Intl.NumberFormat('es-MX', {
                style: 'currency',
                currency: 'MXN'
            }).format(valor);
        };
        
        $('#resumen-subtotal').text(formatearMoneda(totales.subtotal));
        $('#resumen-descuento').text('-' + formatearMoneda(totales.descuento));
        $('#resumen-total').text(formatearMoneda(totales.total));
    }
};
