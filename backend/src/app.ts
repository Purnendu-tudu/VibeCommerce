import express , {Request, Response} from "express";

import productRoutes from "./routes/product";
import cartRouter from "./routes/cart";

const app = express();
app.use(express.json());

app.use("/api", productRoutes);
app.use("/api", cartRouter);

app.get("/", (req:Request, res:Response) => {
    res.json({
        message: "Hello, Express + TypeScript!"
    });
});


export default app;