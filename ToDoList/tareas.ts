export interface Tarea {
    titulo: string;
    descripcion: string;
    dificultad: number;
    estado: number;
    fechaCreacion: Date;
    ultimaEdicion: Date;
}

export interface Tarea {
    titulo: string;
    descripcion: string;
    dificultad: number;
    estado: number;
    fechaCreacion: Date;
    ultimaEdicion: Date;
}

const tareas: Tarea[] = [];

export function agregarTarea(tarea: Tarea): void {
    tareas.push(tarea);
}

export function obtenerTareas(estado: number | null = null): Tarea[] {
    return tareas.filter(tarea =>
        estado === null || tarea.estado === estado
    );
}

export function buscarTareas(termino: string): Tarea[] {
    const texto = termino.toLowerCase();

    return tareas.filter(tarea =>
        tarea.titulo.toLowerCase().includes(texto)
    );
}

export function actualizarFechaEdicion(
    tarea: Tarea,
    fecha: Date
): void {
    tarea.ultimaEdicion = fecha;
}