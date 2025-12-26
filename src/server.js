import http from "http";
import app from "./index.js";

const PORT = process.env.PORT || 5100;
console.log('PORT: ', PORT);

// Create HTTP server
const server = http.createServer(app);

console.info("test from index.js ************* ");

// Start listening
server.listen(PORT, () => {
  console.info(`- Server is running on ${PORT}`);
});
