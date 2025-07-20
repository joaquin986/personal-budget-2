Presupuesto.prototype.filtrarPorTipo = function (TipoConstructor) {
  return this.movimientos.filter(m => m instanceof TipoConstructor);
};

Presupuesto.prototype.contarPorCategoria = function () {
  const conteo = {};
  
  this.movimientos.forEach(m => {
    const clave = m instanceof Ingreso ? m.fuente : m.categoria;
    conteo[clave] = (conteo[clave] || 0) + 1;
  });

  return conteo;
};

document.getElementById('btn-limpiar').addEventListener('click', () => {
  miPresupuesto.movimientos = [];
  renderizarPresupuesto();
});

const totalIngresos = miPresupuesto.filtrarPorTipo(Ingreso).length;
const totalEgresos = miPresupuesto.filtrarPorTipo(Egreso).length;

resumen.innerHTML = `
  <p><strong>Ingresos:</strong> ${miPresupuesto.calcularIngresos()} (Movs: ${totalIngresos})</p>
  <p><strong>Gastos:</strong> ${miPresupuesto.calcularGastos()} (Movs: ${totalEgresos})</p>
  <p><strong>Balance:</strong> ${balance}</p>
`;

Presupuesto.prototype.exportarDatos = function () {
  return JSON.stringify(this.movimientos, null, 2);
};

