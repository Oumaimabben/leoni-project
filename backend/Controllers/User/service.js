const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const addService = async (req, res, next) => {
  try {
    const service = await prisma.service.create({
      data: {
        designation:req.body.designation,
        nbr_employee:req.body.nbr_employee
    },
    });
    if (service) {
      res.status(200).send({ msg: "service ajouté avec succès" });
    }
  } catch (err) {
    res.status(400).send({ msg: err });
  }
};

const deleteService = async (req, res, next) => {
  try {
    const deleted = await prisma.service.delete({
      where: {
        id: parseInt(req.params["id"]),
      },
    });
    if (deleted) {
      res.status(200).send({ msg: "service supprimé avec succès" });
    }
  } catch (err) {
    res.status(400).send({ msg: err });
  }
};

const updateService = async (req, res, next) => {
  try {
    const updated = await prisma.service.update({
        where:{
        id: parseInt(req.params["id"]),
        },
        data:{
            designation:req.body.designation,
            nbr_employee:req.body.nbr_employee
        }
    })
    if (updated) {
      res.status(200).send({ msg: "service modifié avec succès" });
    }
  } catch (err) {
    res.status(400).send({ msg: err });
  }
};

const getService = async (req, res, next) => {
    try {
        const all=await prisma.service.findMany();
        res.status(200).send({msg:all})
    }catch(err){
        res.status(400).send({msg:err})
    }
  };
module.exports = { addService, deleteService,updateService,getService };