import { Router, Request, Response } from "express";

const productRoutes = Router();

interface Product  {
    id: number,
    name : string,
    price: number
}

const mockProduct : Product[] = [
    {id:1, name: "Mouse", price:200},
    {id:2, name: "Usb Cable", price:150},
    {id:3, name: "KeyBoard", price:1000},
    {id:4, name: "RGB KeyBoard", price: 1500},
    {id:5, name: "Pen drive", price:700}
];


productRoutes.get("/products",(req:Request, res:Response) => {
    res.status(200).json(mockProduct);
})


export default productRoutes;