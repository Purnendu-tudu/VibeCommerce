import request from "supertest";

import app from "../src/app";

describe('Cart Router', () => {

    let newCartItem :{productId:number; qty:number};

    it('GET /api/cart it should return the cart item and totalQuantity', async () => {
        // add some items;
        await request(app).post('/api/cart').send({productId: 2, qty:2 });
        await request(app).post('/api/cart').send({productId: 2, qty:4 });
        await request(app).post('/api/cart').send({productId: 3, qty:2 });

        const res = await request(app).get('/api/cart');

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("cart");
        expect(res.body.cart.length).toBeGreaterThan(0);
        expect(res.body).toHaveProperty("total",8);




    })

    it('POST /api/cart it should add product in the cart', async () => {

        const newProduct = {
            productId: 123,
            qty: 10
        }

        const res = await request(app).post('/api/cart').send(newProduct);

        expect(res.statusCode).toBe(201); // what is our status code

        expect(res.body).toHaveProperty("productId", newProduct.productId);
        expect(res.body).toHaveProperty("qty", newProduct.qty);

        newCartItem = res.body;

    })

    it('POST /api/cart it should return error', async () => {
        const res = await  request(app).post('/api/cart').send({});
        expect(res.statusCode).toBe(400);

        expect(res.body).toHaveProperty("error", "ProductId and qty is required");
    })

    it('DELETE /api/cart/:productId it should delete an item from the cart', async () => {
        const res = await request(app).delete(`/api/cart/${newCartItem.productId}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("message", "Item Removed");
        expect(res.body).toHaveProperty("productId",newCartItem.productId);
    })

    it('DELETE /api/cart/:productId it should return no item found', async () => {
        const res = await request(app).delete('/api/cart/9999');

        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty("error", "Item Not Found With the Id");
    })
})