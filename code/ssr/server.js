import express from "express";
import * as reactServer from "react-dom/server";
import Home from "./Home.js";
import React from "react";

const app = express();

const content = reactServer.renderToString(React.createElement(Home));

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Set-Cookie", "sid=kljsadflkjkljkljkalsdjf;p=asdfk1");
  res.send(`
    <html>
      <head>
        <title>ssr</title>
      </head>
      <body>
        <div id="root">${content}</div>
        <script src="index.js"></script>
      </body>
    </html>
   `);
});

app.use(express.static("public"));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
  console.log("http://localhost:3000");
});
