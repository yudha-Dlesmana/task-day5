import { Request, Response } from "express";
import { connection } from "../connections/prismaClient";

export async function createCategory( req: Request, res: Response){
  const {name} = req.body;
  try{
    const category = await connection.category.create({
      data: {name}
    })
    res.status(201).json(category)
  }catch(e){
    res.status(500).json({message: "Internal Server Error"})
  }
}

export async function getAllCategory( req: Request, res: Response){
  try{
    const categories = await connection.category.findMany()
    res.status(200).json(categories)
  }catch(e){
    res.status(500).json({message: "Internal Server Error"})
  }
}

export async function getDetailCategory( req: Request, res: Response){
  const id = Number(req.params.id)
  try{
    const category = await connection.category.findUnique({
      where:{id}
    })
    res.status(200).json(category)

  }catch(e){
    res.status(500).json({message: "Internal Server Error"})
  }
}

export async function updateCategory( req: Request, res: Response){
  const id = Number(req.params.id)
  const {newName} = req.body
  try{
    const updateCategory = await connection.category.update({
      where:{id},
      data: {name: newName}
    })
    res.status(200).json({UpdateCategory: updateCategory})

  }catch(e){
    res.status(500).json({message: "Internal Server Error"})
  }
}

export async function deleteCategory( req: Request, res: Response){
  const id = Number(req.params.id)
  try{
    await connection.category.delete({
      where:{id}
    })
    res.status(200).json({message: "categories deleted"})

  }catch(e){
    res.status(500).json({message: "Internal Server Error"})
  }
}

export async function totalProduct( req: Request, res: Response){
  try{
    const totalProduct = await connection.category.findMany({
      select:{
        id: true,
        name:true,
        _count: {select: {products: true}}
      }
    }) 
    const formatResult = totalProduct.map((item) => {
        return {
          CategoryName: item.name,
          TotalProduct: item._count.products
        }
    })

    res.status(200).json(formatResult)
  }catch(e){
    res.status(500).json({message: "Internal Server Error"})
  }
}

export async function totalStockProduct( req: Request, res:Response){
  const totalStockProduct = await connection.product.groupBy({
    by:["categoryId"],
    _sum: {stock: true},
    orderBy: {categoryId : "asc" }
  })
  res.status(200).json(totalStockProduct)
}


