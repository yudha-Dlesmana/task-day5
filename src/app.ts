import express from "express"
import categoryRouter from "./routers/category"
import productRouter from "./routers/product"

const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use("/api/v1", categoryRouter)
app.use("/api/v1", productRouter)




app.listen(PORT, ()=>{
  console.log(`server is running on PORT: ${PORT}`)
})