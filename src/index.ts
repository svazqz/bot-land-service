require('dotenv').config();

import 'graphql-import-node';
import server from './server';

const PORT = 8080;

server.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
