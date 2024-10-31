import express from "express"
import userRouter from "./routes/userRoute.js"



import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors())

app.use("/api/v1/users/",userRouter)



export default app;