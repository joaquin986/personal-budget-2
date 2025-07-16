export function obtenerNombres(movimientos) {
  return movimientos.map(mov => mov.nombre);
}

export function obtenerValores(movimientos) {
  return movimientos.map(mov => mov.valor);
}

export function calcularTotal(valores) {
  return valores.reduce((total, valor) => total + valor, 0);
}

// 🏆 Reto: Contar por tipo
export function contarPorTipo(movimientos) {
  return movimientos.reduce((acc, mov) => {
    if (mov.tipo === 'ingreso') acc.ingresos++;
    else if (mov.tipo === 'gasto') acc.gastos++;
    return acc;
  }, { ingresos: 0, gastos: 0 });
}
export function obtenerIngresos(movimientos) {
  return movimientos.filter(mov => mov.tipo === 'ingreso');
}

export function obtenerGastos(movimientos) {
  return movimientos.filter(mov => mov.tipo === 'gasto');
}

export function filtrarPorMonto(movimientos, minimo) {
  return movimientos.filter(mov => mov.valor >= minimo);
}

export function buscarPorNombre(movimientos, nombre) {
  return movimientos.find(mov => 
    mov.nombre.toLowerCase().includes(nombre.toLowerCase())
  );
}

export function obtenerPrimero(movimientos, tipo) {
  return movimientos.find(mov => mov.tipo === tipo);
}

// 🏆 Reto: Total por tipo
export function obtenerTotalPorTipo(movimientos, tipo) {
  const filtrados = movimientos.filter(mov => mov.tipo === tipo);
  return calcularTotal(obtenerValores(filtrados));
}
export function generarReporte(movimientos) {
  const ingresos = obtenerIngresos(movimientos);
  const gastos = obtenerGastos(movimientos);

  return {
    totalIngresos: calcularTotal(obtenerValores(ingresos)),
    totalGastos: calcularTotal(obtenerValores(gastos)),
    cantidad: movimientos.length
  };
}

export function calcularBalance(movimientos) {
  const { totalIngresos, totalGastos } = generarReporte(movimientos);
  return totalIngresos - totalGastos;
}

export function obtenerPromedio(movimientos, tipo) {
  const filtrados = movimientos.filter(mov => mov.tipo === tipo);
  if (filtrados.length === 0) return 0;
  return calcularTotal(obtenerValores(filtrados)) / filtrados.length;
}

// 🏆 Reto: Validar presupuesto
export function validarPresupuesto(movimientos, limite) {
  const totalGastos = calcularTotal(obtenerValores(obtenerGastos(movimientos)));
  return totalGastos <= limite;
}

// 🏆 Básico: Categorizar por monto
export function categorizarPorMonto(movimientos) {
  return movimientos.map(mov => {
    let categoria = 'bajo';
    if (mov.valor >= 500) categoria = 'alto';
    else if (mov.valor >= 200) categoria = 'medio';
    return { ...mov, categoria };
  });
}

// 🏆 Intermedio: Ordenar por monto
export function analizarPatrones(movimientos) {
  return [...movimientos].sort((a, b) => b.valor - a.valor);
}

// 🏆 Avanzado: Búsqueda avanzada
export function busquedaAvanzada(movimientos, criterios) {
  return movimientos.filter(mov => {
    return Object.entries(criterios).every(([key, val]) =>
      mov[key]?.toLowerCase?.().includes(val.toLowerCase?.())
    );
  });
}
