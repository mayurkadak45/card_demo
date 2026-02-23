const {findUserByEmpId, getAllEmployees,getEmployeeDetailsByEmpId, deleteEmployeeById}=require("../daos/userDao")




const getHomepage=async(req,res)=>{
    res.send("Hello ");
}





async function login(req, res) {
  try {
    const { emp_id, password, type } = req.body;

    
    if (!emp_id || !password || !type) {
      return res.status(400).json({
        status: false,
        message: "Emp ID, Password and Type are required"
      });
    }

    
    const user = await findUserByEmpId(emp_id);

    if (!user) {
      return res.status(401).json({
        status: false,
        message: "Invalid credentials"
      });
    }

    
    if (user.type !== type) {
      return res.status(401).json({
        status: false,
        message: "Invalid credentials"
      });
    }

    
    if (user.password !== password) {
      return res.status(401).json({
        status: false,
        message: "Invalid credentials"
      });
    }

    
    return res.status(200).json({
      status: true,
      message: "Login successful",
      data: {
        emp_id: user.emp_id,
        full_name: user.full_name,
        type: user.type
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Internal server error"
    });
  }
}



async function fetchAllEmployees(req, res) {
  try {
    const employees = await getAllEmployees();

    
    const formattedEmployees = employees.map(emp => ({
      emp_id: emp.emp_id,
      full_name: emp.full_name,
      designation: emp.designation,
      photo: emp.photo
        ? `data:image/jpeg;base64,${emp.photo.toString("base64")}`
        : null
    }));

    return res.status(200).json({
      success: true,
      count: formattedEmployees.length,
      data: formattedEmployees
    });

  } catch (error) {
    console.error("Error fetching employees:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
}


async function fetchEmployeeDetails(req, res) {
  try {
    const { empId } = req.params;

    const employee = await getEmployeeDetailsByEmpId(empId);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found"
      });
    }

    
    if (employee.photo) {
      employee.photo = `data:image/jpeg;base64,${employee.photo.toString("base64")}`;
    }

    return res.status(200).json({
      success: true,
      data: employee
    });

  } catch (error) {
    console.error("Error fetching employee:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
}


async function deleteEmployee(req, res) {
  const { empId } = req.params;

  if (!empId) {
    return res.status(400).json({ success: false, message: "Employee ID required" });
  }

  try {
    const deleted = await deleteEmployeeById(empId);

    if (deleted) {
      return res.status(200).json({ success: true, message: "Employee deleted successfully" });
    } else {
      return res.status(404).json({ success: false, message: "Employee not found or cannot delete admin" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}













module.exports={
    getHomepage,
    login,
    fetchAllEmployees,
    fetchEmployeeDetails,
    deleteEmployee
}