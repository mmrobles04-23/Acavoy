const CarritoModule = {
    
    /**
     * Agrega un vehículo al carrito
     */
    agregar: function(nombre, modelo, precio) {
        // Verificar si el vehículo ya existe en el carrito
        const existe = carrito.find(item => item.nombre === nombre);
        
        if (existe) {
            // Si ya existe, incrementar la cantidad
            existe.cantidad++;
        } else {
            // Si no existe, agregarlo como nuevo item
            carrito.push({
                nombre: nombre,
                modelo: modelo,
                precio: precio,
                cantidad: 1
            });
        }
        
        // Actualizar la interfaz del carrito
        this.renderizar();
        
        // Recalcular los totales
        CalculosModule.calcularTotal();
        
        // Actualizar el botón de confirmar
        VentaModule.actualizarBotonConfirmar();
    },
    
    /**
     * Cambia la cantidad de un vehículo en el carrito
     */
    cambiarCantidad: function(nombre, delta) {
        const item = carrito.find(i => i.nombre === nombre);
        
        if (item) {
            item.cantidad += delta;
            
            // Si la cantidad es 0 o menos, eliminar el item
            if (item.cantidad <= 0) {
                this.eliminar(nombre);
            } else {
                this.renderizar();
                CalculosModule.calcularTotal();
            }
        }
    },
    
    /**
     * Elimina un vehículo del carrito
     */
    eliminar: function(nombre) {
        carrito = carrito.filter(item => item.nombre !== nombre);
        this.renderizar();
        CalculosModule.calcularTotal();
        VentaModule.actualizarBotonConfirmar();
    },
    
    /**
     * Renderiza (dibuja) el carrito en la interfaz
     */
    renderizar: function() {
        const contenedor = document.getElementById('carrito-contenido');
        
        // Si el carrito está vacío, mostrar mensaje
        if (carrito.length === 0) {
            contenedor.innerHTML = `
                <div class="carrito-vacio">
                    <p>🛒 El carrito está vacío</p>
                    <p style="font-size: 12px;">Agrega vehículos del catálogo</p>
                </div>
            `;
            return;
        }
        
        // Construir el HTML de los items del carrito
        let html = '';
        carrito.forEach(item => {
            html += `
                <div class="carrito-item">
                    <div class="item-details">
                        <div class="nombre">${item.nombre}</div>
                        <div class="modelo">${item.modelo}</div>
                        <div style="color: #27ae60; font-weight: 600; margin-top: 5px;">
                            $${item.precio.toLocaleString()}
                        </div>
                    </div>
                    <div class="item-cantidad">
                        <button onclick="CarritoModule.cambiarCantidad('${item.nombre}', -1)">-</button>
                        <span>${item.cantidad}</span>
                        <button onclick="CarritoModule.cambiarCantidad('${item.nombre}', 1)">+</button>
                    </div>
                    <button class="btn-remove" onclick="CarritoModule.eliminar('${item.nombre}')">
                        Eliminar
                    </button>
                </div>
            `;
        });
        
        contenedor.innerHTML = html;
    },
    
    /**
     * Vacía completamente el carrito
     */
    vaciar: function() {
        carrito = [];
        this.renderizar();
        CalculosModule.calcularTotal();
        VentaModule.actualizarBotonConfirmar();
    }
};