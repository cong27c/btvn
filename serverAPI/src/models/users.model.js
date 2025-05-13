const db = require("../configs/db");

exports.getUsers = async () => {
  const [users] = await db.query("select * from users");
  return users;
};

exports.getUser = async ({ id, username }) => {
  const [user] = await db.query(
    `select * from users where id = ? or username = ?`,
    [id, username]
  );
  return user;
};
