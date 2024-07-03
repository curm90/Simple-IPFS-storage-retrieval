import { createThirdwebClient } from 'thirdweb';

const THIRDWEB_CLIENT_ID = process.env.THIRDWEB_CLIENT_ID;

const client = createThirdwebClient({
  clientId: THIRDWEB_CLIENT_ID as string,
});

export default client;
