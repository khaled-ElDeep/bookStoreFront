const express = require("express");
let { PythonShell } = require("python-shell");
const app = express();
app.use(express.json());
let m = "";
app.get("/app/customers", (req, res) => {
  const customers = [
    { id: 1, fname: "Amr", lName: "Khaled" },
    { id: 2, fname: "Zeyad", lName: "Elsawy" },
    { id: 3, fname: "mahmoud", lName: "Ghazy" },
    { id: 4, fname: "Khaled", lName: "Amer" }
  ];
  res.json(customers);
});
const c = [
  { id: 1, fname: "Ammmr", lName: "Khalsdsded" },
  { id: 2, fname: "Zzzzeyad", lName: "sdsdsdsd" }
];

app.post("/app/customers", (req, res) => {
  let pyshell = new PythonShell("print.py");

  const customer = {
    id: c.length + 1,
    fname: req.body.fname,
    lNmae: req.body.lName
  };
  c.push(customer);

  {
    console.log(c[c.length - 1]["fname"], "opopo");
    pyshell.send("ghazy");
    pyshell.on("message", function(message) {
      console.log("message", message);
      m = message;
    });
    console.log("oooooooooooooooooooooooooooo");

    pyshell.end(function(err) {
      if (err) {
        throw err;
      }
      console.log(m, "AMR");
      res.send(m);
      console.log("ldldld");
    });
  }
});

const port = 5000;
app.listen(port, () => console.log(`server started on port ${port}`));
