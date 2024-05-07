import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(express.json())

app.get("/", (req, res) => {
  res.send("njdskd!");
});

//CREATE
app.post("/addproduct", async(req, res) => {
    try {
      const {name, category, price} = req.body;
      const dataCreate = await prisma.products.create({
        data: {
          name: name,
          category:category,
          price: price,
        },
      });
    
    res.json(dataCreate);
  } catch (error) {
    res.json(error);
  }
});

//READ
app.get("/products", async(req, res) => {
  try {
      const data = await prisma.products.findMany();
      res.json(data);
    read();
  } catch (error) {
    res.json(error);
  }
});

//READ BY ID
app.get("/product/:id", async(req, res) => {
  try {
    const data = await prisma.products.findUnique({
      where: {id: Number(req.params.id)}
    })
    res.json(data)
  } catch (error) {
    res.json(error)
  }
})

//UPDATE
app.put('/updateproduct/:id', async(req, res) => {
    try {
        // const {name, category, price} = req.body
        // const id = req.params
        const data = await prisma.products.update({
            where: {id: Number(req.params.id)},
            data: {
                name: req.body.name,
                category: req.body.category,
                price: req.body.price
            }
        })

        res.json(data)
    } catch (error) {
        res.json(error)
    }
})

//DELETE
app.delete('/deleteproduct/:id', async(req, res) => {
    try {
        const id = req.params.id
        const data = await prisma.products.delete({
            where: {id: Number(id)}
        })
        res.json(data)
    } catch (error) {
        res.json(error)
    }
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
