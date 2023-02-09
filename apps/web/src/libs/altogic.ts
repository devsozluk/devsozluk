import { createClient } from "altogic";

const altogic = createClient(
   process.env.NEXT_PUBLIC_ALTOGIC_ENV_URL as string,
   process.env.NEXT_PUBLIC_ALTOGIC_CLIENT_KEY as string,
   {}
);

export default altogic;