const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const addTypeSortie = async (req, res, next) => {
  try {
    const type = await prisma.type_sortie.create({
      data: {
        TypeSortie: req.body.typesortie,
      },
    });
    if (type) {
      res.status(200).send({ msg: "type de sortie ajoutée avec succès" });
    }
  } catch (err) {
    res.status(400).send({ msg: err });
  }
};

const deleteTypeSortie = async (req, res, next) => {
  try {
    const deleted = await prisma.type_sortie.delete({
      where: {
        id: parseInt(req.params["id"]),
      },
    });
    if (deleted) {
      res.status(200).send({ msg: "type de sortie supprimée avec succès" });
    }
  } catch (err) {
    res.status(400).send({ msg: err });
  }
};

const updateTypeSortie = async (req, res, next) => {
  try {
    const updated = await prisma.type_sortie.update({
      where: {
        id: parseInt(req.params["id"]),
      },
      data: {
        TypeSortie: req.body.typesortie,
      },
    });
    if (updated) {
      res.status(200).send({ msg: "type de sortie modifiée avec succès" });
    }
  } catch (err) {
    res.status(400).send({ msg: err });
  }
};
const getTypeSortie = async (req, res, next) => {
  try {
    const all = await prisma.type_sortie.findMany();
    res.status(200).send({ msg: all });
  } catch (err) {
    res.status(400).send({ msg: err });
  }
};

const getBiensSortie = async (req, res, next) => {
  try {
    const all = await prisma.biens.findMany();
    res.status(200).send({ msg: all });
  } catch (err) {
    res.status(400).send({ msg: err });
  }
};
const addMaterielle = async (req, res, next) => {
  try {
    const materielle = await prisma.materielles.create({
      data: {
        num_imm: req.body.num_imm,
        num_serie: req.body.num_serie,
        marque: req.body.marque,
        sortieId: parseInt(req.params.id),
      },
    });
    res.status(200).send({ msg: "matérielle ajoutée avec succès" });
  } catch (err) {
    res.status(400).send({ msg: err });
  }
};
const getCountMaterielle = async (req, res, next) => {
  try {
    const count = await prisma.materielles.count({
      where: {
        sortieId: parseInt(req.params.id),
      },
    });
    res.status(200).send({ msg: count });
  } catch (err) {
    res.status(400).send({ msg: err });
  }
};
const getMaterielle = async (req, res, next) => {
  try {
    const all = await prisma.materielles.findMany({
      where: {
        sortieId: parseInt(req.params.id),
      },
    });
    if (all) {
      res.status(200).send({ msg: all });
    }
  } catch (err) {
    res.status(400).send({ msg: err });
  }
};

const addBiensSociete = async (req, res, next) => {
  try {
    const autorisation = await prisma.sortie_bien_societe.create({
      data: {
        quantite: req.body.quantite,
        destination: req.body.destination,
        tronsporteur: req.body.tronsporteur,
        type_sortie: req.body.type_sortie,
        num_mise_rebut: req.body.num_mise_rebut,
        date_sortie: new Date(req.body.date_sortie) || new Date().toISOString(),
        date_retour_prevue:
        new Date(req.body.date_retour_prevue) || new Date().toISOString(),
        responsable_retour: req.body.responsable_retour,
        nature_bien:req.body.nature_bien,
        etat: "En_attente",
        userId: req.userid,
      },
    });

    if (autorisation) {
      res.status(200).send({ msg: "autorisation ajoutée avec succès" });
    } else {
      res.status(400).send({ msg: "vous avez des informations incorrects" });
    }
  } catch (err) {
    res.status(400).send({ msg: err });
    console.log(err);
  }
};

const getmybiensocieteautorisation = async (req, res, next) => {
  try {
    const all = await prisma.sortie_bien_societe.findMany({
      where: {
        userId: req.userid,
      },
    });
    res.status(200).send({ msg: all });
  } catch (err) {
    res.status(400).send({ msg: err });
  }
};
const getonebiensocieteautorisation = async (req, res, next) => {
  try {
    const all = await prisma.sortie_bien_societe.findFirst({
      where: {
        userId: req.userid,
        id: parseInt(req.params.id),
      },
    });
    res.status(200).send({ msg: all.quantite });
  } catch (err) {
    res.status(400).send({ msg: err });
  }
};
const getAdminbiensociete = async (req, res, next) => {
  try {
    const all = await prisma.sortie_bien_societe.findMany({
      where: {
        etat: req.query.status,
      },
    });
    res.status(200).send({ msg: all });
  } catch (err) {
    res.status(400).send({ msg: err });
  }
};
const confirm_refus_bien_societe = async (req, res, next) => {
  try {
    const biens = await prisma.sortie_bien_societe.update({
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
  getTypeSortie,
  addTypeSortie,
  deleteTypeSortie,
  updateTypeSortie,
  addMaterielle,
  addBiensSociete,
  getmybiensocieteautorisation,
  confirm_refus_bien_societe,
  getAdminbiensociete,
  getBiensSortie,
  getMaterielle,
  getonebiensocieteautorisation,
  getCountMaterielle,
};
