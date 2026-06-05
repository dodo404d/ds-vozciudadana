import 'dotenv/config';
import app from './app';
import { connectDatabase } from './config/database';

const PORT = Number(process.env.PORT || 4000);

async function bootstrap(): Promise<void> {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`[API] VozCiudadana backend en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('[API] No se pudo iniciar el servidor', error);
    process.exit(1);
  }
}

void bootstrap();
