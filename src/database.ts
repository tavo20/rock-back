import mongoose from "mongoose";


const DATABASE_CONECTION = process.env.DATABASE_CONECTION || "";

mongoose
  .connect(DATABASE_CONECTION, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then((db) => {
    console.log("DB conectada");
  })
  .catch((err) => console.log(`error al conectar la BD ${err}`, err));