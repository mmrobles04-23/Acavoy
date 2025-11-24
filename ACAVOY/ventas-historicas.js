// Datos de ejemplo
const ventasEjemplo = [
    {
        id: "V001",
        fecha: "2024-01-15",
        cliente: "Empresa ABC",
        vendedor: "Juan Pérez",
        productos: "Laptop Dell, Mouse",
        cantidad: 2,
        total: 1250.00,
        estado: "completado"
    },
    {
        id: "V002",
        fecha: "2024-01-14",
        cliente: "Tienda XYZ",
        vendedor: "María García",
        productos: "Teclados x5",
        cantidad: 5,
        total: 250.00,
        estado: "pendiente"
    },
    {
        id: "V003", 
        fecha: "2024-01-13",
        cliente: "Oficina Central",
        vendedor: "Juan Pérez",
        productos: "Monitores x3",
        cantidad: 3,
        total: 600.00,
        estado: "completado"
    }
];

function cargarVentas() {
    const tabla = document.getElementById('tabla-ventas');
    let html = '';

    ventasEjemplo.forEach(venta => {
        html += `
            <tr>
                <td>${venta.id}</td>
                <td>${venta.fecha}</td>
                <td>${venta.cliente}</td>
                <td>${venta.vendedor}</td>
                <td>${venta.productos}</td>
                <td>${venta.cantidad}</td>
                <td>$${venta.total.toFixed(2)}</td>
                <td class="status-${venta.estado}">${venta.estado.charAt(0).toUpperCase() + venta.estado.slice(1)}</td>
                <td>
                    <button onclick="verDetalle('${venta.id}')">Ver</button>
                    <button onclick="imprimirTicket('${venta.id}')">Ticket</button>
                </td>
            </tr>
        `;
    });

    tabla.innerHTML = html;
    actualizarResumen();
}

function filtrarVentas() {
    // Aquí iría la lógica de filtrado
    alert('Funcionalidad de filtrado en desarrollo');
}

function limpiarFiltros() {
    document.getElementById('fecha-inicio').value = '';
    document.getElementById('fecha-fin').value = '';
    document.getElementById('filtro-vendedor').value = '';
    document.getElementById('filtro-estado').value = '';
    cargarVentas();
}

function actualizarResumen() {
    const totalVentas = ventasEjemplo.reduce((sum, venta) => sum + venta.total, 0);
    const totalTransacciones = ventasEjemplo.length;
    
    // Ventas del mes (ejemplo)
    const ventasMes = ventasEjemplo
        .filter(venta => venta.fecha.startsWith('2024-01'))
        .reduce((sum, venta) => sum + venta.total, 0);

    document.getElementById('total-ventas').textContent = `$${totalVentas.toFixed(2)}`;
    document.getElementById('ventas-mes').textContent = `$${ventasMes.toFixed(2)}`;
    document.getElementById('total-transacciones').textContent = totalTransacciones;
}

function verDetalle(idVenta) {
    alert(`Mostrando detalle de venta: ${idVenta}`);
}

function imprimirTicket(idVenta) {
    alert(`Imprimiendo ticket de: ${idVenta}`);
}

function exportarExcel() {
    alert('Exportando a Excel...');
}

// Cargar datos cuando la página esté lista
document.addEventListener('DOMContentLoaded', cargarVentas);
