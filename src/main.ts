import bootstrap from './bootstrap';

async function start() {
  const app = await bootstrap();
  app.listen(3000, () => console.log(`🚀 Server running at http://localhost:3000`));
}

start();
