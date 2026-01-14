import { useSQLiteContext } from 'expo-sqlite';
export function useDatabase() {
    const db = useSQLiteContext();

    async function setupDatabase() {
        try {
            await db.execAsync('CREATE TABLE IF NOT EXISTS Flores( flor_id INTEGER PRIMARY KEY AUTOINCREMENT, flor_nombre TEXT NOT NULL;');
            await db.execAsync('CREATE TABLE IF NOT EXISTS FloresImagenes( flor_img_id INTEGER PRIMARY KEY AUTOINCREMENT, flor_id TEXT NOT NULL, flor_etapa TEXT NOT NULL, img_url TEXT NOT NULL, FOREIGN KEY (flor_id) REFERENCES Flores(flor_id)');
            await db.execAsync('CREATE TABLE IF NOT EXISTS Rutinas( rutina_id INTEGER PRIMARY KEY AUTOINCREMENT, rutina_nombre TEXT NOT NULL , rutina_num_pasos INTEGER NOT NULL, rutina_flor_id INTEGER NOT NULL,FOREIGN KEY (rutina_flor_id) REFERENCES Flores (flor_id));');
            await db.execAsync('CREATE TABLE IF NOT EXISTS Paso (paso_id INTEGER PRIMARY KEY AUTOINCREMENT, rutina_id INTEGER NOT NULL, paso_nombre TEXT NOT NULL, paso_descripcion TEXT NOT NULL, paso_completado BOOLEAN NOT NULL, FOREIGN KEY(rutina_id) REFERENCES Rutinas(rutina_id));')
            console.log("✅ Tablas inicializadas");
        } catch (error) {
            console.error("❌ Error al inicializar tablas:", error);
        }
    }

    return { setupDatabase };
}

