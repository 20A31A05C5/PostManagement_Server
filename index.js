let express=require("express")
require('dotenv').config();
let mongoose=require("mongoose")
let cors=require("cors")
const rt = require("./Routes/rt")
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI).then(()=>{
    console.log("Connection Established...")
})
let app=express()
app.use(express.json())
app.use(cors({
  origin: 'https://postmanagement1.netlify.app/'
}))
app.use("/",rt)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
