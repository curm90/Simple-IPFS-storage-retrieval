import { createThirdwebClient } from 'thirdweb';

const NEXT_PUBLIC_THIRDWEB_CLIENT_ID = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;

const client = createThirdwebClient({
  clientId: NEXT_PUBLIC_THIRDWEB_CLIENT_ID as string,
});

export default client;
