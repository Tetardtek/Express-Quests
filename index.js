const app = require("./src/app");

const port = 5000;

app
  .listen(port, () => {
    console.log(`CTRL + click : http://localhost:${port}`);
  })
  .on("error", (err) => {
    console.error("Error:", err.message);
  });
