import {
  generarReporte, calcularBalance,
  validarPresupuesto, obtenerNombres
} from './functional-utils.js';

const movimientos = [
  { nombre: "Salario", tipo: "ingreso", valor: 3000 },
  { nombre: "Comida", tipo: "gasto", valor: 200 },
  { nombre: "Freelance", tipo: "ingreso", valor: 500 },
  { nombre: "Transporte", tipo: "gasto", valor: 150 }
];

const reporte = generarReporte(movimientos);
const balance = calcularBalance(movimientos);
const presupuestoOk = validarPresupuesto(movimientos, 400);

// Mostrar en el DOM
document.getElementById("ingresos").textContent = `$${reporte.totalIngresos}`;
document.getElementById("gastos").textContent = `$${reporte.totalGastos}`;
document.getElementById("balance").textContent = `$${balance}`;
document.getElementById("presupuesto-ok").textContent = presupuestoOk ? "✅ Sí" : "❌ No";

// Listar movimientos
const lista = document.getElementById("lista-movimientos");
movimientos.forEach(mov => {
  const li = document.createElement("li");
  li.textContent = `${mov.nombre} - ${mov.tipo} - $${mov.valor}`;
  lista.appendChild(li);
});
