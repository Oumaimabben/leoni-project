const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const login = async (req, res, next) => {
  try {
    let user = await prisma.user.findUnique({
      where: {
        matricule: req.body.matricule,
      },
    });
    if (user) {
      const isValidPass = req.body.password===user.mdp;
      if (!isValidPass) {
        return res.status(400).send({ msg: "mot de passe incorrect" });
      } else {
        let payload = {
          id: user.id,
          matricule: user.matricule,
          email: user.email,
          name: user.name,
          prenom: user.prenom,
          role: user.Role,
          fonction: user.fonctionId,
          service: user.serviceId,
          
        };
        const token = jwt.sign(payload, "mysecretkey", {
          expiresIn: "2h",
        });
        return res.status(200).send({
          token: token,
          info: { ...payload },
        });
      }
    } else {
      return res.status(400).send({ msg: "aucune utilisateur avec cette matricule" });
    }
  } catch (err) {
    console.log(err);
    return res.status(501).send({ msg: err });
  }
};
module.exports = login;
