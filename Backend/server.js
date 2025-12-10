import express from "express";
import cors from "cors";

import productsRouter from './routes/product.js';
import salesRouter from "./routes/sales.js";
import reportsRouter from "./routes/reports.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/product", productsRouter);
app.use("/sales", salesRouter);
app.use("/reports", reportsRouter);

const PORT = 4000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
