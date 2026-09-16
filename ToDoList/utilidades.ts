export function fechaActual(): Date {
    return new Date();
}

export function formatearFecha(fecha: Date): string {
    return fecha.toLocaleDateString("es-AR");
}

export function convertirFecha(texto: string): Date | null {
    const partes = texto.split("/");

    if (partes.length !== 3) {
        return null;
    }

    const dia = Number(partes[0]);
    const mes = Number(partes[1]) - 1;
    const año = Number(partes[2]);

    const fecha = new Date(año, mes, dia);

    if (isNaN(fecha.getTime())) {
        return null;
    }

    return fecha;
}

export function validarTexto(texto: string): boolean {
    return texto.trim().length > 0;
}

export function descripcionEstado(estado: number): string {
    switch (estado) {
        case 1:
            return "Pendiente";
        case 2:
            return "En progreso";
        case 3:
            return "Completada";
        default:
            return "Desconocido";
    }
}

export function descripcionDificultad(dificultad: number): string {
    switch (dificultad) {
        case 1:
            return "Fácil";
        case 2:
            return "Media";
        case 3:
            return "Difícil";
        default:
            return "Desconocida";
    }
}

export function dificultadVisual(dificultad: number): string {
    return "★".repeat(dificultad);
}