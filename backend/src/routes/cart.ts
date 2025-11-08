import { Router, Request, Response } from "express";

const cartRouter = Router();

interface cart {
    productId?: number;
    qty?: number;
}

let cart: cart[] = [];


cartRouter.get("/cart", (req:Request, res:Response) => {

    const totalQty = cart.reduce((sum, item) => sum + (item.qty || 0), 0)

    res.status(200).json({cart, total: totalQty});
})


cartRouter.post("/cart", (req: Request<{}, {}, cart>, res: Response) => {

    const { productId, qty } = req.body;

    if (!productId || !qty) {
        return res.status(400).json({ error: "ProductId and qty is required" })
    }

    const newItem = {productId, qty };
    cart.push(newItem);
    res.status(201).json(newItem);

})


cartRouter.delete("/cart/:productId", (req:Request<{productId: string}>, res:Response) =>{
    const { productId } = req.params;

    if(!productId){
        return res.status(400).json({error: "productId is required"});
    }

    const index = cart.findIndex((item) => item.productId === Number(productId))

    if(index == -1){
        return res.status(404).json({error:"Item Not Found With the Id"})
    }


    const deletedItem = cart.splice(index,1)[0];
    res.status(200).json({message:"Item Removed", productId : deletedItem.productId })
})


export default cartRouter;