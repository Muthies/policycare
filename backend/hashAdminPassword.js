const bcrypt = require('bcryptjs');

(async () => {
  const password = "admin123"; // admin password you want
  const hashed = await bcrypt.hash(password, 10);
  console.log("Hashed password:", hashed); 
})();
