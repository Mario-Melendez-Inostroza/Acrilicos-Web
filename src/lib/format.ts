const clp = new Intl.NumberFormat('es-CL')
export const formatCLP = (n: number) => `$${clp.format(Math.round(n))}`
