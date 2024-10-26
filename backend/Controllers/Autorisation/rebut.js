const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const addRebut = async (req, res, next) => {
  try {
    const rebut = await prisma.rebut.create({
      data: {
        nature_investissement: req.body.nature_investissement,
        caracteristiques: req.body.caracteristiques,
        montant_acquisition: req.body.montant_acquisition,
        centre_cout: req.body.centre_cout,
        perte: req.body.perte,
        date_acquisition: new Date(req.body.date_acquisition) || new Date().toISOString(),
        date_sortie: new Date(req.body.date_sortie) || new Date().toISOString(),
        cause_rebut: req.body.cause_rebut,
        etat: "En_attente",
        userId: req.userid
      },
    });
    if (rebut) {
      res.status(200).send({ msg: "autorisation ajoutée avec succès" });
    }
  } catch (err) {
    res.status(400).send({ msg: err });
  }
};

const getmyRebut = async (req, res, next) => {
  try {
    const all = await prisma.rebut.findMany({
      where: {
        userId: req.userid,
      },
    });
    res.status(200).send({msg:all});
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: err });
  }
};
const getAdminRebut = async (req, res, next) => {
  try {
    const all = await prisma.rebut.findMany({
      where: {
        etat: req.query.status,
      },
    });
    res.status(200).send({ msg: all });
  } catch (err) {
    res.status(400).send({ msg: err });
  }
};
const confirm_refus_rebut = async (req, res, next) => {
  try {
    const rebut = await prisma.rebut.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        etat: req.body.etat,
      },
    });
    if (rebut) {
      res.status(200).send({ msg: "autorisation modifiée avec succès" });
    }
  } catch (err) {
    res.status(400).send({ msg: err });
  }
};
module.exports = { getmyRebut,getAdminRebut,confirm_refus_rebut,addRebut};
