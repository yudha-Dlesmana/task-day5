import { connect } from "http2";
import { connection } from "./prismaClient";

async function main(){
  //clean old data 
  await connection.product.deleteMany()
  await connection.category.deleteMany();

  //create category
  await connection.category.createMany({
    data: [
      {name: "Mini PC"},
      {name: "Laptop"},
      {name: "Monitor"},
      {name: "Game Console"},
      {name: "Smartphone"}
    ]
  })

  // create product
  await connection.product.createMany({
    data: [
      {name: "Beelink SER5 Ryzen 7", 
        price: 4700000, stock: 0, categoryId: 18},
      {name: "ASUS ROG Zephyrus G14", 
        price: 18999000, stock: 5, categoryId: 19},
      {name: "Acer Aspire 5 Slim", 
        price: 7499000, stock: 0, categoryId: 19},
      {name: "LG UltraGear 27\" 144Hz", 
        price: 2950000, stock: 0, categoryId: 20},
      {name: "PlayStation 5 Slim Digital Edition", 
        price: 8990000, stock: 0, categoryId: 21},
      {name: "Nintendo Switch OLED", 
        price: 5799000, stock: 0, categoryId: 21},
      {name: "Samsung Galaxy S23 Ultra", 
        price: 18999000, stock: 0, categoryId: 22},
      {name: "iPhone 15 Pro Max", 
        price: 20999000, stock: 0, categoryId: 22}      
    ]
  })
}

main()
  .then(()=>{
    console.log("✅ Success seeding data!")
  })
  .catch((e)=>{
    console.error("❌ Error seeding data:", e)
    process.exit(1)
  })
  .finally(async ()=>{
    await connection.$disconnect()
  })