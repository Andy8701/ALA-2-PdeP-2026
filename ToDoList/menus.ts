import { preguntar, pausar, cerrar } from "./interfaz";

import {
    fechaActual,
    formatearFecha,
    convertirFecha,
    validarTexto,
    descripcionEstado,
    descripcionDificultad,
    dificultadVisual
} from "./utilidades";

import {
    Tarea,
    agregarTarea as guardarTarea,
    obtenerTareas,
    buscarTareas,
    actualizarFechaEdicion
} from "./tareas";

export async function agregarTarea(): Promise<void> {
    console.clear();

    console.log("=== AGREGAR TAREA ===\n");

    let titulo = "";

    while (!validarTexto(titulo)) {
        titulo = await preguntar("Título: ");

        if (!validarTexto(titulo)) {
            console.log("El título no puede estar vacío.");
        }
    }

    let descripcion = "";

    while (!validarTexto(descripcion)) {
        descripcion = await preguntar("Descripción: ");

        if (!validarTexto(descripcion)) {
            console.log("La descripción no puede estar vacía.");
        }
    }

    let dificultad: number;

    do {
        dificultad = Number(
            await preguntar("Dificultad (1-Fácil, 2-Media, 3-Difícil): ")
        );
    } while (![1, 2, 3].includes(dificultad));

    const nuevaTarea: Tarea = {
        titulo,
        descripcion,
        dificultad,
        estado: 1,
        fechaCreacion: fechaActual(),
        ultimaEdicion: fechaActual()
    };

    guardarTarea(nuevaTarea);

    console.log("\nTarea agregada correctamente.");

    await pausar();
}

export async function menuVerTareas(): Promise<void> {
    let opcion: string;

    do {
        console.clear();

        console.log("=== VER TAREAS ===");
        console.log("1. Todas");
        console.log("2. Pendientes");
        console.log("3. En progreso");
        console.log("4. Completadas");
        console.log("0. Volver");

        opcion = await preguntar("\nSeleccione una opción: ");

        switch (opcion) {
            case "1":
                await listarTareas(null);
                break;

            case "2":
                await listarTareas(1);
                break;

            case "3":
                await listarTareas(2);
                break;

            case "4":
                await listarTareas(3);
                break;

            case "0":
                break;

            default:
                console.log("Opción inválida.");
                await pausar();
        }

    } while (opcion !== "0");
}

export async function listarTareas(
    estado: number | null
): Promise<void> {
    console.clear();

    const lista = obtenerTareas(estado);

    console.log("=== LISTA DE TAREAS ===\n");

    if (lista.length === 0) {
        console.log("No hay tareas para mostrar.");
        await pausar();
        return;
    }

    for (let i = 0; i < lista.length; i++) {
        const tarea = lista[i];

        console.log(`${i + 1}. ${tarea.titulo}`);
        console.log(`   Estado: ${descripcionEstado(tarea.estado)}`);
        console.log(
            `   Dificultad: ${descripcionDificultad(tarea.dificultad)} ` +
            `${dificultadVisual(tarea.dificultad)}`
        );
        console.log(`   Creada: ${formatearFecha(tarea.fechaCreacion)}`);
        console.log("");
    }

    await pausar();
}

export async function buscarTarea(): Promise<void> {
    console.clear();

    console.log("=== BUSCAR TAREA ===\n");

    const busqueda = await preguntar("Ingrese el título a buscar: ");

    const resultados = buscarTareas(busqueda);

    if (resultados.length === 0) {
        console.log("\nNo se encontraron tareas.");
        await pausar();
        return;
    }

    console.log("\nResultados:\n");

    for (const tarea of resultados) {
        console.log(`Título: ${tarea.titulo}`);
        console.log(`Descripción: ${tarea.descripcion}`);
        console.log(`Estado: ${descripcionEstado(tarea.estado)}`);
        console.log(
            `Dificultad: ${descripcionDificultad(tarea.dificultad)}`
        );
        console.log("");
    }

    await pausar();
}

export async function detallesTarea(tarea: Tarea): Promise<void> {
    console.clear();

    console.log("=== DETALLES DE LA TAREA ===\n");

    console.log(`Título: ${tarea.titulo}`);
    console.log(`Descripción: ${tarea.descripcion}`);
    console.log(`Estado: ${descripcionEstado(tarea.estado)}`);
    console.log(
        `Dificultad: ${descripcionDificultad(tarea.dificultad)}`
    );
    console.log(
        `Creación: ${formatearFecha(tarea.fechaCreacion)}`
    );
    console.log(
        `Última edición: ${formatearFecha(tarea.ultimaEdicion)}`
    );

    await pausar();
}

export async function editarTarea(tarea: Tarea): Promise<void> {
    console.clear();

    console.log("=== EDITAR TAREA ===\n");

    console.log(`Título actual: ${tarea.titulo}`);

    const nuevoTitulo = await preguntar(
        "Nuevo título (ENTER para mantener): "
    );

    if (validarTexto(nuevoTitulo)) {
        tarea.titulo = nuevoTitulo;
    }

    console.log(`\nDescripción actual: ${tarea.descripcion}`);

    const nuevaDescripcion = await preguntar(
        "Nueva descripción (ENTER para mantener): "
    );

    if (validarTexto(nuevaDescripcion)) {
        tarea.descripcion = nuevaDescripcion;
    }

    console.log("\nEstados:");
    console.log("1. Pendiente");
    console.log("2. En progreso");
    console.log("3. Completada");

    const nuevoEstado = await preguntar(
        "Nuevo estado (ENTER para mantener): "
    );

    if (["1", "2", "3"].includes(nuevoEstado)) {
        tarea.estado = Number(nuevoEstado);
    }

    actualizarFechaEdicion(tarea, fechaActual());

    console.log("\nTarea modificada correctamente.");

    await pausar();
}

export async function menuPrincipal(): Promise<void> {
    let opcion: string;

    do {
        console.clear();

        console.log("================================");
        console.log("       LISTA DE TAREAS");
        console.log("================================");
        console.log("1. Agregar tarea");
        console.log("2. Ver tareas");
        console.log("3. Buscar tarea");
        console.log("0. Salir");

        opcion = await preguntar("\nSeleccione una opción: ");

        switch (opcion) {
            case "1":
                await agregarTarea();
                break;

            case "2":
                await menuVerTareas();
                break;

            case "3":
                await buscarTarea();
                break;

            case "0":
                console.log("\nHasta luego.");
                cerrar();
                break;

            default:
                console.log("\nOpción inválida.");
                await pausar();
        }

    } while (opcion !== "0");
}