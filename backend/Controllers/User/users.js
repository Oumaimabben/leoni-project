const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const addUser = async (req, res, next) => {
  try {
    const user = await prisma.user.create({
      data: {
        matricule: req.body.matricule,
        email: req.body.email,
        nom: req.body.nom,
        prenom: req.body.prenom,
        mdp: req.body.password,
        Role: req.body.role,
        fonctionId: req.body.fonction,
        serviceId: req.body.service,
      },
    });
    if (user) {
      res.status(200).send({ msg: "utilisateur ajouté avec succès" });
    }
  } catch (err) {
    res.status(400).send({ msg: err });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const deleted = await prisma.user.delete({
      where: {
        id: parseInt(req.params["id"]),
      },
    });
    if (deleted) {
      res.status(200).send({ msg: "utilisateur supprimé avec succès" });
    }
  } catch (err) {
    res.status(400).send({ msg: err });
  }
};

const updateUser = async (req, res, next) => {
  try {
    const updated = await prisma.user.update({
      where: {
        id: parseInt(req.params["id"]),
      },
      data: {
        email: req.body.email,
        nom: req.body.nom,
        prenom: req.body.prenom,
        Role: req.body.role,
        fonctionId: req.body.fonction,
        serviceId: req.body.service,
      },
    });
    if (updated) {
      res.status(200).send({ msg: "utilisateur modifié avec succès" });
    }
  } catch (err) {
    res.status(400).send({ msg: err });
  }
};

const getUser = async (req, res, next) => {
  try {
    const all = await prisma.user.findMany();
    res.status(200).send({ msg: all });
  } catch (err) {
    res.status(400).send({ msg: err });
  }
};
const changePassword = async (req, res, next) => {
  try {
    const getUser = await prisma.user.findUnique({
      where: {
        id: req.userid,
      },
    });
    const test =req.body.passnow===getUser.mdp;
    if (!test) {
      return res.status(400).send({ msg: "mot de passe incorrect" });
    } else {
      const Update = await prisma.user.update({
        where: {
          id: req.userid,
        },
        data: {
          mdp: req.body.newpass,
        },
      });
      res.status(200).send("mot de passe modifié")
    }
  } catch (err) {
    res.status(400).send(err);
  }
};
module.exports = { addUser, deleteUser, updateUser, getUser, changePassword };
