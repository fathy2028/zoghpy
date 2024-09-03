import mongoose from "mongoose"
const conn=()=>{mongoose.connect("mongodb+srv://zoghpyfurnit:zoghpy2024@cluster0.ocpm3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("connected")
}).catch((err)=>{
console.log(err);
})
}
export default conn;