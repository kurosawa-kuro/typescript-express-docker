// typescript-express-docker\src\index.ts

import express, { Request, Response } from "express";
import morgan from "morgan";
import mysql from "mysql";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

const app = express();

app.use(morgan("dev"));

app.get("/", (req: Request, res: Response) => {
  return res.json({
    status: "success",
  });
});

app.get("/db", (req: Request, res: Response) => {
  const db = mysql.createConnection({
    host: "host.docker.internal",
    user: "root",
    password: "",
    database: "boilerplate",
    port: 3306,
  });

  db.connect((err: any) => {
    if (err) {
      console.log("Error connecting to Db");
      return res.json({
        status: "Error connecting to Db",
      });
    }
    return res.json({
      status: "Connection established",
    });
  });
});

app.post("/upload", upload.single("file"), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({
      status: "error",
      message: "No file uploaded",
    });
  }

  return res.json({
    status: "success",
    filename: req.file.filename,
  });
});

app.post("/upload", upload.single("file"), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({
      status: "error",
      message: "No file uploaded",
    });
  }

  return res.json({
    status: "success",
    filename: req.file.filename,
  });
});

app.listen(4000, () => console.log("listening on port 4000"));
