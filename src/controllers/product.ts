import { Request, Response } from "express";
import { connection } from "../connections/prismaClient";

export async function createProduct( req: Request, res: Response){
  const {name, price, stock, categoryId} = req.body;
  try{
    // console.log(`name ${name}`)
    // console.log(`price ${price}`)
    // console.log(`stock ${stock}`)
    // console.log(`categoryId ${categoryId}`)
    const product = await connection.product.create({
      data: {name, price, stock, categoryId}
    })
    res.status(201).json(product)
  }catch(e){
    res.status(500).json({message: "Internal Server Error"})
  }
} 

export async function getAllProducts( req: Request, res: Response){
  const {
    sortBy = "id", order= "asc", 
    minPrice = 0, maxPrice = 100_000_000, 
    minStock = 0, maxStock = 100, 
    limit = 10, offset=0 
  } = req.query;

  const filterByPrice: any = {}
  if (minPrice) filterByPrice.price = {gte: parseFloat(minPrice as string)}
  if (maxPrice) filterByPrice.price = {
    ...(filterByPrice.price || {}),
    lte: parseFloat(maxPrice as string)
  }

  const filterByStock: any = {}
  if (minStock) filterByStock.stock = {gte: parseFloat(minStock as string)}
  if (maxStock) filterByStock.stock = {
    ...(filterByStock.stock || {}),
    lte: parseFloat(maxStock as string)
  }

  try{
    const product = await connection.product.findMany({
      where: { AND: [ filterByPrice, filterByStock]},
      orderBy: {
        [sortBy as string]: order as "asc" || "desc"},
      take: Number(limit),
      skip: Number(offset),
      include: {restock: true}
    })
    res.status(200).json(product)
  }catch(e){
    res.status(500).json({message: "Internal Server Error"})
  }
} 

export async function getDetailProduct( req: Request, res: Response){

  const id = Number(req.params.id)
  try{
    const product = await connection.product.findUnique({
      where:{id},
      include: {restock:true}
    })
    if(!product) {
      res.status(400).json({message: "Product Not Found"}) 
      return 
    }

    res.status(200).json(product)
  }catch(e){
    res.status(500).json({message: "Internal Server Error"})
  }
} 

export async function updateProducts( req: Request, res: Response){
  const updateProducts = req.body as {productId:number, name: string, price:number}[];
  try{
    await Promise.all(
      updateProducts.map( async (update) => {
        const product = await connection.product.findUnique({where:{id:update.productId}})
        if (!product){ throw new Error ("Product tidak di temukan")}

        await connection.product.update({
            where: {id: update.productId},
            data: { name: update.name, price: update.price}}
          )}
        )
      )
      res.status(200).json({message: "Product updated"})
  } catch(e){
    if( e instanceof Error){
      res.status(500).json({message: e.message})
    } else{
      console.error("unknown error")
    } 
  }
} 

export async function restockProduct( req: Request, res: Response){
  const restockProducts = req.body as {productId:number, quantity:number}[];
  try {
    await Promise.all(
      restockProducts.map( async (restock) => {
      const product = await connection.product.findUnique({where:{id:restock.productId}})
      if (!product){ throw new Error ("Product tidak di temukan")}
      if (restock.quantity <= 0){ throw new Error("Stock kurang dari 0")}
      await connection.$transaction(async (tx) => {
        await connection.restock.create({
          data: {productId: restock.productId ,quantity:restock.quantity }
        })
        await connection.product.update({
          where: {id:restock.productId},
          data: {stock:{increment:restock.quantity}}
        })
      })
      })
    )
  } catch(e){
      if( e instanceof Error){
        res.status(500).json({message: e.message})
      } else{
        console.error("unknown error")
      } 
    }
  }

export async function deleteProduct( req: Request, res: Response){
  const id = Number(req.params.id)
  try{
    await connection.product.delete({
      where:{id}
    })
    res.status(200).json({message:"Product deleted"})

  }catch(e){
    res.status(500).json({message: "Internal Server Error"})
  }
} 

export async function totalStock( req:Request, res: Response){
  try{
    const totalProduct = await connection.product.aggregate({
      _sum:{stock:true}
    })
    const formatResult = {totalStockProduct: totalProduct._sum.stock}

    res.status(200).json(formatResult)
  }catch(e){
    res.status(500).json({message: "Intenal Server Error"})

  }
}