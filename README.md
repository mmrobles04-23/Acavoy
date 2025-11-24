<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Módulo de Reportes - Concesionaria de Autos</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        body {
            background-color: #f5f7fa;
            color: #333;
            line-height: 1.6;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        header {
            background: linear-gradient(135deg, #2c3e50, #c0392b);
            color: white;
            padding: 25px 0;
            border-radius: 10px;
            margin-bottom: 30px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .logo i {
            font-size: 2.5rem;
        }

        .logo h1 {
            font-size: 1.8rem;
            font-weight: 600;
        }

        .user-info {
            display: flex;
            align-items: center;
            gap: 10px;
            background: rgba(255, 255, 255, 0.2);
            padding: 8px 15px;
            border-radius: 20px;
        }

        .user-info i {
            font-size: 1.2rem;
        }

        .dashboard {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 25px;
            margin-bottom: 40px;
        }

        .card {
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
            overflow: hidden;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
        }

        .card-header {
            background: linear-gradient(135deg, #e74c3c, #c0392b);
            color: white;
            padding: 18px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .card-header h2 {
            font-size: 1.3rem;
            font-weight: 600;
        }

        .card-header i {
            font-size: 1.5rem;
        }

        .card-body {
            padding: 20px;
        }

        .card-footer {
            background: #f8f9fa;
            padding: 15px 20px;
            border-top: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .card-id {
            font-size: 0.85rem;
            color: #7f8c8d;
            font-weight: 500;
        }

        .roles {
            display: flex;
            gap: 8px;
        }

        .role-tag {
            background: #e1f0fa;
            color: #2980b9;
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 500;
        }

        .filters {
            display: flex;
            gap: 15px;
            margin-bottom: 20px;
            flex-wrap: wrap;
        }

        .filter-item {
            display: flex;
            align-items: center;
            gap: 8px;
            background: white;
            padding: 8px 15px;
            border-radius: 6px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
        }

        .filter-item select, .filter-item input {
            border: 1px solid #ddd;
            padding: 6px 10px;
            border-radius: 4px;
            font-size: 0.9rem;
        }

        .chart-placeholder {
            height: 200px;
            background: #f8f9fa;
            border-radius: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 15px 0;
            color: #7f8c8d;
            font-style: italic;
        }

        .data-table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
        }

        .data-table th, .data-table td {
            padding: 12px 15px;
            text-align: left;
            border-bottom: 1px solid #eee;
        }

        .data-table th {
            background-color: #f8f9fa;
            font-weight: 600;
            color: #2c3e50;
        }

        .data-table tr:hover {
            background-color: #f5f7fa;
        }

        .metric-card {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 15px;
        }

        .metric-value {
            font-size: 1.8rem;
            font-weight: 700;
            color: #2c3e50;
        }

        .metric-label {
            font-size: 0.9rem;
            color: #7f8c8d;
        }

        .status-indicator {
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            margin-right: 8px;
        }

        .status-low {
            background-color: #e74c3c;
        }

        .status-normal {
            background-color: #2ecc71;
        }

        .status-high {
            background-color: #f39c12;
        }

        .export-btn {
            background: #27ae60;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 4px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 5px;
            font-weight: 500;
            transition: background 0.3s;
        }

        .export-btn:hover {
            background: #219653;
        }

        footer {
            text-align: center;
            margin-top: 40px;
            padding: 20px;
            color: #7f8c8d;
            font-size: 0.9rem;
            border-top: 1px solid #eee;
        }

        @media (max-width: 768px) {
            .dashboard {
                grid-template-columns: 1fr;
            }
            
            .header-content {
                flex-direction: column;
                gap: 15px;
                text-align: center;
            }
            
            .filters {
                flex-direction: column;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <div class="header-content">
                <div class="logo">
                    <i class="fas fa-car"></i>
                    <h1>Módulo de Reportes - Concesionaria de Autos</h1>
                </div>
                <div class="user-info">
                    <i class="fas fa-user-circle"></i>
                    <span>Administrador</span>
                </div>
            </div>
        </header>

        <main>
            <div class="dashboard">
                <!-- Resumen de Ventas -->
                <div class="card">
                    <div class="card-header">
                        <h2><i class="fas fa-chart-bar"></i> Resumen de Ventas</h2>
                        <i class="fas fa-ellipsis-v"></i>
                    </div>
                    <div class="card-body">
                        <div class="filters">
                            <div class="filter-item">
                                <label for="dateFrom">Desde:</label>
                                <input type="date" id="dateFrom" value="2023-01-01">
                            </div>
                            <div class="filter-item">
                                <label for="dateTo">Hasta:</label>
                                <input type="date" id="dateTo" value="2023-12-31">
                            </div>
                        </div>
                        <div class="metric-card">
                            <div>
                                <div class="metric-label">Ventas Totales</div>
                                <div class="metric-value">$4,245,680</div>
                            </div>
                            <i class="fas fa-dollar-sign" style="font-size: 2rem; color: #27ae60;"></i>
                        </div>
                        <div class="chart-placeholder">
                            Gráfico de tendencia de ventas de automóviles (no funcional)
                        </div>
                        <table class="data-table">
                            <tr>
                                <th>Vendedor</th>
                                <th>Ventas</th>
                                <th>Unidades</th>
                            </tr>
                            <tr>
                                <td>María González</td>
                                <td>$1,245,800</td>
                                <td>28</td>
                            </tr>
                            <tr>
                                <td>Carlos López</td>
                                <td>$985,450</td>
                                <td>22</td>
                            </tr>
                            <tr>
                                <td>Ana Martínez</td>
                                <td>$876,320</td>
                                <td>19</td>
                            </tr>
                        </table>
                    </div>
                    <div class="card-footer">
                        <div class="card-id">MOD-14-PANTALLA-01</div>
                        <div class="roles">
                            <span class="role-tag">Administrador</span>
                            <span class="role-tag">Gerente</span>
                        </div>
                    </div>
                </div>

                <!-- Desempeño de Modelos -->
                <div class="card">
                    <div class="card-header">
                        <h2><i class="fas fa-car-side"></i> Desempeño de Modelos</h2>
                        <i class="fas fa-ellipsis-v"></i>
                    </div>
                    <div class="card-body">
                        <div class="filters">
                            <div class="filter-item">
                                <label for="topN">Top N:</label>
                                <select id="topN">
                                    <option>Top 5</option>
                                    <option selected>Top 10</option>
                                    <option>Top 15</option>
                                </select>
                            </div>
                            <div class="filter-item">
                                <label for="category">Categoría:</label>
                                <select id="category">
                                    <option>Todos</option>
                                    <option>Sedán</option>
                                    <option>SUV</option>
                                    <option>Pickup</option>
                                    <option>Deportivo</option>
                                </select>
                            </div>
                        </div>
                        <h3>Modelos Más Vendidos</h3>
                        <table class="data-table">
                            <tr>
                                <th>Modelo</th>
                                <th>Unidades</th>
                                <th>Margen</th>
                            </tr>
                            <tr>
                                <td>Toyota Corolla</td>
                                <td>45</td>
                                <td>18%</td>
                            </tr>
                            <tr>
                                <td>Ford Ranger</td>
                                <td>38</td>
                                <td>22%</td>
                            </tr>
                            <tr>
                                <td>Hyundai Tucson</td>
                                <td>32</td>
                                <td>16%</td>
                            </tr>
                        </table>
                        <h3>Modelos de Baja Rotación</h3>
                        <table class="data-table">
                            <tr>
                                <th>Modelo</th>
                                <th>Unidades</th>
                                <th>Días en Inventario</th>
                            </tr>
                            <tr>
                                <td>Mazda MX-5</td>
                                <td>3</td>
                                <td>156</td>
                            </tr>
                            <tr>
                                <td>Subaru BRZ</td>
                                <td>2</td>
                                <td>210</td>
                            </tr>
                            <tr>
                                <td>Chevrolet Camaro</td>
                                <td>4</td>
                                <td>98</td>
                            </tr>
                        </table>
                    </div>
                    <div class="card-footer">
                        <div class="card-id">MOD-14-PANTALLA-02</div>
                        <div class="roles">
                            <span class="role-tag">Administrador</span>
                            <span class="role-tag">Gerente</span>
                            <span class="role-tag">Jefe Inventario</span>
                        </div>
                    </div>
                </div>

                <!-- Análisis de Clientes -->
                <div class="card">
                    <div class="card-header">
                        <h2><i class="fas fa-users"></i> Análisis de Clientes</h2>
                        <i class="fas fa-ellipsis-v"></i>
                    </div>
                    <div class="card-body">
                        <div class="filters">
                            <div class="filter-item">
                                <label for="customerType">Tipo Cliente:</label>
                                <select id="customerType">
                                    <option>Todos</option>
                                    <option>Nuevos</option>
                                    <option>Recurrentes</option>
                                </select>
                            </div>
                            <div class="filter-item">
                                <label for="minPurchase">Compra Mínima:</label>
                                <input type="number" id="minPurchase" value="25000">
                            </div>
                        </div>
                        <div class="chart-placeholder">
                            Gráfico de segmentación de clientes (no funcional)
                        </div>
                        <table class="data-table">
                            <tr>
                                <th>Cliente</th>
                                <th>Total Comprado</th>
                                <th>Vehículos</th>
                                <th>Tipo</th>
                            </tr>
                            <tr>
                                <td>Empresa Logística S.A.</td>
                                <td>$685,400</td>
                                <td>15</td>
                                <td>Recurrente</td>
                            </tr>
                            <tr>
                                <td>Juan Pérez</td>
                                <td>$245,800</td>
                                <td>4</td>
                                <td>Recurrente</td>
                            </tr>
                            <tr>
                                <td>Nuevo Cliente S.A.</td>
                                <td>$189,500</td>
                                <td>3</td>
                                <td>Nuevo</td>
                            </tr>
                        </table>
                    </div>
                    <div class="card-footer">
                        <div class="card-id">MOD-14-PANTALLA-03</div>
                        <div class="roles">
                            <span class="role-tag">Administrador</span>
                            <span class="role-tag">Gerente</span>
                            <span class="role-tag">Vendedor</span>
                        </div>
                    </div>
                </div>

                <!-- Estado de Inventario -->
                <div class="card">
                    <div class="card-header">
                        <h2><i class="fas fa-warehouse"></i> Estado de Inventario</h2>
                        <i class="fas fa-ellipsis-v"></i>
                    </div>
                    <div class="card-body">
                        <div class="metric-card">
                            <div>
                                <div class="metric-label">Valor Total del Inventario</div>
                                <div class="metric-value">$8,745,800</div>
                            </div>
                            <i class="fas fa-car" style="font-size: 2rem; color: #3498db;"></i>
                        </div>
                        <h3>Stock Bajo</h3>
                        <table class="data-table">
                            <tr>
                                <th>Modelo</th>
                                <th>Stock Actual</th>
                                <th>Stock Mínimo</th>
                                <th>Estado</th>
                            </tr>
                            <tr>
                                <td>Toyota Corolla</td>
                                <td>2</td>
                                <td>5</td>
                                <td><span class="status-indicator status-low"></span>Bajo</td>
                            </tr>
                            <tr>
                                <td>Ford Ranger</td>
                                <td>3</td>
                                <td>6</td>
                                <td><span class="status-indicator status-low"></span>Bajo</td>
                            </tr>
                        </table>
                        <h3>Sobrestock</h3>
                        <table class="data-table">
                            <tr>
                                <th>Modelo</th>
                                <th>Stock Actual</th>
                                <th>Stock Máximo</th>
                                <th>Estado</th>
                            </tr>
                            <tr>
                                <td>Mazda MX-5</td>
                                <td>8</td>
                                <td>4</td>
                                <td><span class="status-indicator status-high"></span>Alto</td>
                            </tr>
                            <tr>
                                <td>Subaru BRZ</td>
                                <td>7</td>
                                <td>3</td>
                                <td><span class="status-indicator status-high"></span>Alto</td>
                            </tr>
                        </table>
                    </div>
                    <div class="card-footer">
                        <div class="card-id">MOD-14-PANTALLA-04</div>
                        <div class="roles">
                            <span class="role-tag">Administrador</span>
                            <span class="role-tag">Gerente</span>
                            <span class="role-tag">Jefe Inventario</span>
                        </div>
                    </div>
                </div>

                <!-- Histórico de Facturación -->
                <div class="card">
                    <div class="card-header">
                        <h2><i class="fas fa-file-invoice-dollar"></i> Histórico de Facturación</h2>
                        <i class="fas fa-ellipsis-v"></i>
                    </div>
                    <div class="card-body">
                        <div class="filters">
                            <div class="filter-item">
                                <label for="docType">Tipo Documento:</label>
                                <select id="docType">
                                    <option>Todos</option>
                                    <option>Facturas</option>
                                    <option>Contratos</option>
                                </select>
                            </div>
                            <div class="filter-item">
                                <label for="paymentStatus">Estado Pago:</label>
                                <select id="paymentStatus">
                                    <option>Todos</option>
                                    <option>Pagadas</option>
                                    <option>Pendientes</option>
                                    <option>Canceladas</option>
                                </select>
                            </div>
                        </div>
                        <table class="data-table">
                            <tr>
                                <th>N° Documento</th>
                                <th>Fecha</th>
                                <th>Cliente</th>
                                <th>Vehículo</th>
                                <th>Monto</th>
                                <th>Estado</th>
                            </tr>
                            <tr>
                                <td>FAC-2023-001245</td>
                                <td>15/10/2023</td>
                                <td>Empresa Logística S.A.</td>
                                <td>Ford Ranger XLT</td>
                                <td>$45,800</td>
                                <td>Pagada</td>
                            </tr>
                            <tr>
                                <td>FAC-2023-001246</td>
                                <td>16/10/2023</td>
                                <td>Juan Pérez</td>
                                <td>Toyota Corolla SE</td>
                                <td>$28,760</td>
                                <td>Pagada</td>
                            </tr>
                            <tr>
                                <td>FAC-2023-001247</td>
                                <td>18/10/2023</td>
                                <td>Nuevo Cliente S.A.</td>
                                <td>Hyundai Tucson Limited</td>
                                <td>$35,230</td>
                                <td>Pendiente</td>
                            </tr>
                        </table>
                    </div>
                    <div class="card-footer">
                        <div class="card-id">MOD-14-PANTALLA-05</div>
                        <div class="roles">
                            <span class="role-tag">Administrador</span>
                            <span class="role-tag">Gerente</span>
                        </div>
                        <button class="export-btn">
                            <i class="fas fa-file-export"></i> Exportar
                        </button>
                    </div>
                </div>

                <!-- Análisis de Devoluciones -->
                <div class="card">
                    <div class="card-header">
                        <h2><i class="fas fa-undo-alt"></i> Análisis de Devoluciones</h2>
                        <i class="fas fa-ellipsis-v"></i>
                    </div>
                    <div class="card-body">
                        <div class="metric-card">
                            <div>
                                <div class="metric-label">Tasa de Devolución</div>
                                <div class="metric-value">1.8%</div>
                            </div>
                            <i class="fas fa-percentage" style="font-size: 2rem; color: #e74c3c;"></i>
                        </div>
                        <div class="metric-card">
                            <div>
                                <div class="metric-label">Costo Total Devoluciones</div>
                                <div class="metric-value">$78,600</div>
                            </div>
                            <i class="fas fa-dollar-sign" style="font-size: 2rem; color: #e74c3c;"></i>
                        </div>
                        <table class="data-table">
                            <tr>
                                <th>Vehículo</th>
                                <th>Devoluciones</th>
                                <th>Motivo Principal</th>
                                <th>Costo</th>
                            </tr>
                            <tr>
                                <td>Ford Focus Titanium</td>
                                <td>3</td>
                                <td>Problemas mecánicos</td>
                                <td>$42,300</td>
                            </tr>
                            <tr>
                                <td>Nissan Sentra SR</td>
                                <td>2</td>
                                <td>Defectos de pintura</td>
                                <td>$24,800</td>
                            </tr>
                            <tr>
                                <td>Chevrolet Onix</td>
                                <td>1</td>
                                <td>Fallas eléctricas</td>
                                <td>$11,500</td>
                            </tr>
                        </table>
                    </div>
                    <div class="card-footer">
                        <div class="card-id">MOD-14-PANTALLA-06</div>
                        <div class="roles">
                            <span class="role-tag">Administrador</span>
                            <span class="role-tag">Gerente</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <footer>
            <p>Módulo de Reportes - Concesionaria de Autos "AutoPremium"</p>
            <p>© 2023 Todos los derechos reservados</p>
        </footer>
    </div>
</body>
</html>
