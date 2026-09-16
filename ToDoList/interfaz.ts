import * as readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export function preguntar(pregunta: string): Promise<string> {
    return new Promise(resolve => {
        rl.question(pregunta, respuesta => {
            resolve(respuesta);
        });
    });
}

export async function pausar(): Promise<void> {
    await preguntar("\nPresiona ENTER para continuar...");
}

export function cerrar(): void {
    rl.close();
}