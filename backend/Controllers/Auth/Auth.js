const jwt = require("jsonwebtoken");
const authGuardUser = async (req, res, next) => {
  let token = req.header("Authorization") || req.header("authorization");
  if (!token) return res.status(401).send("Accès refusée");

  token = token.replace("Bearer ", "");

  try {
    if (token.startsWith("Bearer ")) {
      // Remove Bearer from string
      token = token.slice(7, token.length).trimLeft();
    }
    const verified = jwt.verify(token, "mysecretkey", {
      expiresIn: "2h",
    });
    if (verified.role === "Utilisateur") {
      req.userid = verified.id;
      req.role = "Utilisateur";
      next();
    } else {
      res.status(401).send("Accès refusé vous n'étes pas connecté");
    }
  } catch (err) {
    res.status(400).send("token incorrect");
  }
};

const authGuardAdmin = async (req, res, next) => {
  let token = req.header("Authorization") || req.header("authorization");
  if (!token) return res.status(401).send("Accès refusé");

  token = token.replace("Bearer ", "");

  try {
    if (token.startsWith("Bearer ")) {
      // Remove Bearer from string
      token = token.slice(7, token.length).trimLeft();
    }
    const verified = jwt.verify(token, "mysecretkey", {
      expiresIn: "2h",
    });
    if (verified.role === "Administrateur") {
      // Check authorization, 2 = Customer, 1 = Admin
      req.userid = verified.id;
      next();
    } else {
      res.status(401).send("Accès refusé vous êtes utilisateur");
    }
  } catch (err) {
    res.status(400).send("Token incorrect");
  }
};
const authGuardChef = async (req, res, next) => {
  let token = req.header("Authorization") || req.header("authorization");
  if (!token) return res.status(401).send("Accès refusé");

  token = token.replace("Bearer ", "");

  try {
    if (token.startsWith("Bearer ")) {
      // Remove Bearer from string
      token = token.slice(7, token.length).trimLeft();
    }
    const verified = jwt.verify(token, "mysecretkey", {
      expiresIn: "2h",
    });
    if (verified.fonction === 1) {
      // Check authorization, 2 = Customer, 1 = Admin
      req.userid = verified.id;
      next();
    } else {
      res.status(401).send("Accès refusé vous n'êtes pas chef");
    }
  } catch (err) {
    res.status(400).send("Token incorrect");
  }
};
const authGardBoth = (req, res, next) => {
  let token = req.header("Authorization") || req.header("authorization");
  if (!token) return res.status(401).send("Accès refusé");

  token = token.replace("Bearer ", "");

  try {
    if (token.startsWith("Bearer ")) {
      // Remove Bearer from string
      token = token.slice(7, token.length).trimLeft();
    }
    const verified = jwt.verify(token, "mysecretkey", {
      expiresIn: "2h",
    });
    if (verified.role === "Administrateur") {
      // Check authorization, 2 = Customer, 1 = Admin
      req.userid = verified.id;

      next();
    } else if (verified.role === "Utilisateur") {
      req.userid = verified.id;
      next();
    } else {
      res.status(401).send("Accès refusé vous n'êtes pas connecté");
    }
  } catch (err) {
    res.status(400).send("Token incorrect");
  }
};
module.exports = { authGuardUser, authGuardAdmin, authGuardChef, authGardBoth };
