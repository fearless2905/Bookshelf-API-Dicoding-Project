"use strict";

const Hapi = require("@hapi/hapi");
const {
  addBook,
  fetchBooks,
  fetchBookById,
  modifyBook,
  removeBook,
} = require("./bookHandlers");

const SERVER_HOST = "localhost";
const SERVER_PORT = 9000;

// Initialize the server
const initializeServer = async () => {
  const server = Hapi.server({
    port: SERVER_PORT,
    host: SERVER_HOST,
  });

  // Routes configuration
  server.route({ method: "POST", path: "/books", handler: addBook });
  server.route({ method: "GET", path: "/books", handler: fetchBooks });
  server.route({
    method: "GET",
    path: "/books/{bookId}",
    handler: fetchBookById,
  });
  server.route({ method: "PUT", path: "/books/{bookId}", handler: modifyBook });
  server.route({
    method: "DELETE",
    path: "/books/{bookId}",
    handler: removeBook,
  });

  await server.start();
  console.log(`Server is running at ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
  console.error(err);
  process.exit(1);
});

initializeServer();
