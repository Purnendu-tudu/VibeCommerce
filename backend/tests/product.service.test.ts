import request from "supertest";

import app from "../src/app";

describe('Product Routes Test', () => {
    it('GET /api/products', async () => {
        const res = await request(app).get('/api/products');
        
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);

        expect(res.body.length).toBeGreaterThanOrEqual(5);

        for(const item of res.body){
            expect(item).toHaveProperty("id");
            expect(item).toHaveProperty("name");
            expect(item).toHaveProperty("price");
            expect(typeof item.id).toBe("number");
            expect(typeof item.name).toBe("string");
            expect(typeof item.price).toBe("number");
        }
        
    })
})