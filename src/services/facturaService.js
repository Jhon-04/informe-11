// Datos de ejemplo mejorados para Sider Perú
let facturas = [
    {
      id: '1',
      numeroFactura: 'F001-0001',
      fecha: '2023-05-15',
      cliente: 'Constructora Andina SAC',
      ruc: '20123456789',
      direccion: 'Av. Los Constructores 123, Lima',
      moneda: 'PEN',
      items: [
        { id: 1, descripcion: 'Barras de acero corrugado 1/2" Grado 60', cantidad: 100, precioUnitario: 25.50, subtotal: 2550.00 },
        { id: 2, descripcion: 'Planchas de acero ASTM A36 3mm', cantidad: 50, precioUnitario: 120.00, subtotal: 6000.00 }
      ],
      montoTotal: 8550.00,
      estado: 'pagada'
    },
    {
      id: '2',
      numeroFactura: 'F001-0002',
      fecha: '2023-05-20',
      cliente: 'Ferretería El Constructor EIRL',
      ruc: '20234567890',
      direccion: 'Jr. Los Herrajes 456, Arequipa',
      moneda: 'USD',
      items: [
        { id: 1, descripcion: 'Tubos galvanizados SCH 40 1"', cantidad: 80, precioUnitario: 35.75, subtotal: 2860.00 },
        { id: 2, descripcion: 'Perfiles angulares L 2"x2"x1/4"', cantidad: 40, precioUnitario: 42.30, subtotal: 1692.00 }
      ],
      montoTotal: 4552.00,
      estado: 'pendiente'
    },
    {
      id: '3',
      numeroFactura: 'F001-0003',
      fecha: '2023-06-01',
      cliente: 'Ingeniería Metalúrgica del Sur',
      ruc: '20345678901',
      direccion: 'Calle Los Ingenieros 789, Cusco',
      moneda: 'PEN',
      items: [
        { id: 1, descripcion: 'Varillas de acero 5/8" Grado 40', cantidad: 200, precioUnitario: 18.75, subtotal: 3750.00 },
        { id: 2, descripcion: 'Alambre negro #8', cantidad: 150, precioUnitario: 5.20, subtotal: 780.00 },
        { id: 3, descripcion: 'Mallas electrosoldadas 6x6-W2.9xW2.9', cantidad: 30, precioUnitario: 85.00, subtotal: 2550.00 }
      ],
      montoTotal: 7080.00,
      estado: 'pagada'
    }
  ];
  
  // Simulación de delay de API
  const simulateApiDelay = () => new Promise(resolve => setTimeout(resolve, 500));
  
  const facturaService = {
    getAll: async () => {
      await simulateApiDelay();
      return facturas;
    },
  
    getById: async (id) => {
      await simulateApiDelay();
      return facturas.find(f => f.id === id);
    },
  
    create: async (facturaData) => {
      await simulateApiDelay();
      const newId = Math.max(...facturas.map(f => parseInt(f.id))) + 1;
      const newFactura = { 
        ...facturaData, 
        id: newId.toString(),
        montoTotal: facturaData.items.reduce((sum, item) => sum + item.subtotal, 0)
      };
      facturas.push(newFactura);
      return newFactura;
    },
  
    update: async (id, facturaData) => {
      await simulateApiDelay();
      const index = facturas.findIndex(f => f.id === id);
      if (index !== -1) {
        facturas[index] = { 
          ...facturas[index], 
          ...facturaData,
          montoTotal: facturaData.items.reduce((sum, item) => sum + item.subtotal, 0)
        };
        return facturas[index];
      }
      return null;
    },
  
    delete: async (id) => {
      await simulateApiDelay();
      facturas = facturas.filter(f => f.id !== id);
    },
  
    search: async (term) => {
      await simulateApiDelay();
      return facturas.filter(f => 
        f.cliente.toLowerCase().includes(term.toLowerCase()) ||
        f.numeroFactura.toLowerCase().includes(term.toLowerCase()) ||
        f.ruc.includes(term)
      );
    }
  };
  
  export default facturaService;