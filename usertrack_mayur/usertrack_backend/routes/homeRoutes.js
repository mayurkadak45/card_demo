const Router=require("express").Router();
const homeController=require("../controllers/homeController");

Router.get('/',homeController.getHomepage);
Router.post('/login',homeController.login);
Router.get('/dash',homeController.fetchAllEmployees);
Router.get('/dash/screen/:empId',homeController.fetchEmployeeDetails);
Router.delete('/dash/screen/delete/:empId',homeController.deleteEmployee);




module.exports=Router;