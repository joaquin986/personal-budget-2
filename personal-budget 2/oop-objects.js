// 1.1 Función constructora Movimiento
function Movimiento(nombre, tipo, valor) {
  this.nombre = nombre;
  this.tipo = tipo;
  this.valor = valor;
  this.fecha = new Date().toLocaleDateString();

  this.esIngreso = function() {
    return this.tipo === 'ingreso';
  };

  this.esGasto = function() {
    return this.tipo === 'gasto';
  };
}

// 🏆 1.4 Reto: Constructor Categoria
function Categoria(nombre, tipo, limite) {
  this.nombre = nombre;
  this.tipo = tipo;
  this.limite = limite;

  this.puedeGastar = function(monto) {
    return monto <= this.limite;
  };
}

// 2.1 Función constructora Presupuesto
function Presupuesto() {
  this.movimientos = [];
  this.fechaCreacion = new Date().toLocaleDateString();

  this.agregarMovimiento = function(movimiento) {
    if (movimiento instanceof Movimiento) {
      this.movimientos.push(movimiento);
      return true;
    }
    return false;
  };

  this.obtenerTotalIngresos = function() {
    return this.movimientos
      .filter(mov => mov.esIngreso())
      .reduce((total, mov) => total + mov.valor, 0);
  };

  this.obtenerTotalGastos = function() {
    return this.movimientos
      .filter(mov => mov.esGasto())
      .reduce((total, mov) => total + mov.valor, 0);
  };

  this.calcularBalance = function() {
    return this.obtenerTotalIngresos() - this.obtenerTotalGastos();
  };

  this.obtenerResumen = function() {
    return {
      totalIngresos: this.obtenerTotalIngresos(),
      totalGastos: this.obtenerTotalGastos(),
      balance: this.calcularBalance(),
      cantidadMovimientos: this.movimientos.length
    };
  };

  // 🏆 2.3 Reto: Filtrar por tipo
  this.obtenerMovimientosPorTipo = function(tipo) {
    return this.movimientos.filter(mov => mov.tipo === tipo);
  };

  // 3.2 Métodos Auxiliares
  this.eliminarMovimiento = function(indice) {
    if (indice >= 0 && indice < this.movimientos.length) {
      return this.movimientos.splice(indice, 1)[0];
    }
    return null;
  };

  this.buscarMovimiento = function(nombre) {
    return this.movimientos.find(mov =>
      mov.nombre.toLowerCase().includes(nombre.toLowerCase())
    );
  };

  this.validarPresupuesto = function() {
    return this.movimientos.every(mov => mov instanceof Movimiento);
  };

  // 🏆 3.3 Reto: Estadísticas
  this.obtenerEstadisticas = function() {
    const ingresos = this.obtenerMovimientosPorTipo('ingreso');
    const gastos = this.obtenerMovimientosPorTipo('gasto');

    const promedioIngresos = ingresos.length
      ? ingresos.reduce((acc, mov) => acc + mov.valor, 0) / ingresos.length
      : 0;

    const promedioGastos = gastos.length
      ? gastos.reduce((acc, mov) => acc + mov.valor, 0) / gastos.length
      : 0;

    const mayorMovimiento = this.movimientos.reduce((max, mov) =>
      mov.valor > max.valor ? mov : max, this.movimientos[0]
    );

    return {
      promedioIngresos,
      promedioGastos,
      mayorMovimiento
    };
  };

  // 🏆 3.4 Reto: Verificar límites
  this.verificarLimites = function() {
    const ingresos = this.obtenerTotalIngresos();
    const gastos = this.obtenerTotalGastos();
    return gastos > ingresos * 0.8;
  };
}

// 🏆 3.5 Reto: PresupuestoMensual que hereda de Presupuesto
function PresupuestoMensual(mes, año) {
  Presupuesto.call(this); // Herencia

  this.mes = mes;
  this.año = año;

  // Filtra movimientos por mes/año
  this.obtenerMovimientosDelMes = function() {
    return this.movimientos.filter(mov => {
      const [dia, mesMov, añoMov] = mov.fecha.split('/');
      return parseInt(mesMov) === this.mes && parseInt(añoMov) === this.año;
    });
  };
}
