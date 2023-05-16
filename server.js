import {app} from "./app.js";
import {connectDB} from "./data/database.js"

const PORT = process.env.PORT;

connectDB()

app.listen(PORT,()=>{
    console.log(`Server is working on port: ${PORT} in ${process.env.NODE_ENV} mode`)
});