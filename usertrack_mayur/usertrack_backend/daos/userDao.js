const { getConnection } = require("../utils/dbConfig");

async function findUserByEmpId(empId) {
  const conn = getConnection();

  const [rows] = await conn.execute(
    "SELECT * FROM users WHERE emp_id = ?",
    [empId]
  );

  return rows.length > 0 ? rows[0] : null;
}

async function getAllEmployees() {
  const conn = getConnection();

  const [rows] = await conn.execute(
    `SELECT photo, emp_id, full_name, designation
     FROM users
     WHERE type = ?`,
    ["employee"]
  );

  return rows;
}



async function getEmployeeDetailsByEmpId(empId) {
  const conn = getConnection();

  const [rows] = await conn.execute(
    `SELECT 
        photo,
        emp_id,
        full_name,
        email,
        join_date,
        designation,
        mobile,
        specifications,
        type
     FROM users
     WHERE emp_id = ?`,
    [empId]
  );

  return rows.length > 0 ? rows[0] : null;
}


async function deleteEmployeeById(empId) {
  try {
    const conn = getConnection();

    const [result] = await conn.execute(
      "DELETE FROM users WHERE emp_id = ? AND type != 'admin'", 
      [empId]
    );

    return result.affectedRows > 0; 
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw error;
  }
}





module.exports = {
  findUserByEmpId,
  getAllEmployees,
  getEmployeeDetailsByEmpId,
  deleteEmployeeById
};