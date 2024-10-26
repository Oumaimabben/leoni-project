const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const addTypeStage = async (req, res, next) => {
  try {
    const type = await prisma.type_stage.create({
      data: {
        TypeStage: req.body.typestage,
      },
    });
    if (type) {
      res.status(200).send({ msg: "type de stage ajoutée avec succès" });
    }
  } catch (err) {
    res.status(400).send({ msg: err });
  }
};

const deleteTypeStage = async (req, res, next) => {
  try {
    const deleted = await prisma.type_stage.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.status(200).send({ msg: "type de stage supprimée avec succès" });

  } catch (err) {
    res.status(400).send({ msg: err });
  }
};

const updateTypeStage = async (req, res, next) => {
  try {
    const updated = await prisma.type_stage.update({
      where: {
        id: parseInt(req.params["id"]),
      },
      data: {
        TypeStage: req.body.typestage,
      },
    });
    if (updated) {
      res.status(200).send({ msg: "type de stage modifiée  avec succès" });
    }
  } catch (err) {
    res.status(400).send({ msg: err });
  }
};
const getTypeStage = async (req, res, next) => {
  try {
    const all = await prisma.type_stage.findMany();
    res.status(200).send({ msg: all });
  } catch (err) {
    res.status(400).send({ msg: err });
  }
};
const addbienspersonel = async (req, res, next) => {
   
  try {
    const biens = await prisma.sortie_bien_personel.create({
      data: {
        nature: req.body.nature,
        quantite: req.body.quantite,
        destination: req.body.destination,
        nom_tronsporteur: req.body.nom_tronsporteur,
        prenom_tronsporteur: req.body.prenom_tronsporteur,
        institue: req.body.institue,
        type_stage: req.body.type_stage,
        date_stage: new Date(req.body.date_stage) || new Date().toISOString(),
        date_debut: new Date(req.body.date_debut) || new Date().toISOString(),
        date_fin: new Date(req.body.date_fin) || new Date().toISOString(),
        userId: req.userid,
        etat: "En_attente",
      },
    });
    if (biens) {
      res
        .status(200)
        .send({ msg: "autorisation ajoutée avec succès" });
    }
  } catch (err) {
    res.status(400).send({ msg: err });
  }
};

const getmybienspersonel = async (req, res, next) => {
  try {
    const all = await prisma.sortie_bien_personel.findMany({
      where: {
        userId: req.userid,
      },
    });
    res.status(200).send({ msg: all });
  } catch (err) {
    res.status(400).send({ msg: err });
  }
};
const getAdminbienspersonel = async (req, res, next) => {
  try {
    const all = await prisma.sortie_bien_personel.findMany({
      where: {
        etat: req.query.status,
      },
    });
    res.status(200).send({ msg: all });
  } catch (err) {
    res.status(400).send({ msg: err });
  }
};
const confirm_refus_biens_personel = async (req, res, next) => {
  try {
    const biens = await prisma.sortie_bien_personel.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        etat: req.body.etat,
      },
    });
    if (biens) {
      res.status(200).send({ msg: "autorisation modifiée avec succès" });
    }
  } catch (err) {
    res.status(400).send({ msg: err });
  }
};
module.exports = {
  getTypeStage,
  updateTypeStage,
  addTypeStage,
  deleteTypeStage,
  addbienspersonel,
  getmybienspersonel,
  getAdminbienspersonel,
  confirm_refus_biens_personel,
};
