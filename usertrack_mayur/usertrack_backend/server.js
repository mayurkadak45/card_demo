const express=require("express");

const app=express();

const cors=require("cors");

const {connectDB}=require("./utils/dbConfig");
const setupRoutes=require("./routes/indexRoutes");

const corsOptions = {
  origin: '*', 
  methods: ['GET', 'POST', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

setupRoutes(app);


app.listen(3000,async()=>{
    await connectDB();
    console.log("Server is listening on 3000");
})