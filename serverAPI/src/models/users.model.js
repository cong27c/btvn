const db = require("../configs/db");

exports.getUsers = async () => {
  const [users] = await db.query("select * from users");
  return users;
};
