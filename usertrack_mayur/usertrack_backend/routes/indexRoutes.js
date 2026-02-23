const homeRoutes=require("./homeRoutes");


const setupRoutes=(app)=>{
    app.use('/',homeRoutes);
}


module.exports=setupRoutes;