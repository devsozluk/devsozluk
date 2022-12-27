import { createClient } from "altogic";

const altogic = createClient(
   import.meta.env.VITE_ALTOGIC_ENV_URL,
   import.meta.env.VITE_ALTOGIC_CLIENT_KEY,
   {}
);

export default altogic;
