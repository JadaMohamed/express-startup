const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) return res.status(400).send("Missing parameters");
  const foundUser = usersDB.users.find((person) => person.username === user);
  if (!foundUser) return res.status(401).send("User not found");
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    //Create jwt
    res.json({ success: `User ${user} is logged in` });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
