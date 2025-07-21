const fs = require("fs");

function requestHandler(req, res) {
  const { url, method } = req;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<body>");
    res.write(
      "<form action='/message' method='POST'><input name='message' type='text'/><button type='submit'>Submit</button></form>"
    );
    res.write("</body>");
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];

    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);

      const message = parsedBody.split("=")[1];
      // fs.writeFileSync("message.txt", message); // This blocks execution should not be used in most cases
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
  // console.log(req.url);
  // console.log(req.method);
  // console.log(req.headers);

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<body>");
  res.write("<h1>Hello World</h1>");
  res.write("</body>");
  res.write("</html>");
  res.end();
}

module.exports = requestHandler;
// module.exports.handler = requestHandler;
// exports.handler = requestHandler;
