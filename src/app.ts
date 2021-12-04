import { Application } from "./deps.ts";
import router from "./router.ts";

// Get configuration from env
const env = Deno.env.toObject();
const HOST = env.THROTTLEMOCK_HOST || "0.0.0.0";
const PORT = env.THROTTLEMOCK_PORT || 8080;

const app = new Application();

// Setup routing
app.use(router.routes());
app.use(router.allowedMethods());

// Start listening
console.log(`Listening on port ${PORT}`);
await app.listen(`${HOST}:${PORT}`);
