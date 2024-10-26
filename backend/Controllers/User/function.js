const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const addFunction = async (req, res, next) => {
  try {
    const func = await prisma.fonction.create({
      data: {
        designation: req.body.designation,
      },
    });
    res.status(200).send({ msg: "fonction ajoutée avec succès" });
  } catch (err) {
    res.status(400).send({ msg: "fonction utilisée" });
  }
};

const deleteFunction = async (req, res, next) => {
  try {
    const deleted = await prisma.fonction.delete({
      where: {
        id: parseInt(req.params.id ),
      },
    });
    if (deleted) {
      res.status(200).send({ msg: "fonction supprimée avec succès" });
    }
  } catch (err) {
    res.status(400).send({ msg: err });
  }
};

const updateFunction = async (req, res, next) => {
  try {
    const updated = await prisma.fonction.update({
        where:{
        id: parseInt(req.params.id),
        },
        data:{
            designation:req.body.designation
        }
    })
    if (updated) {
      res.status(200).send({ msg: "fonction modifiée avec succès" });
    }
  } catch (err) {
    res.status(400).send({ msg: err });
  }
};

const getFunction = async (req, res, next) => {
    try {
        const all=await prisma.fonction.findMany();
        res.status(200).send({msg:all})
    }catch(err){
        res.status(400).send({msg:err})
    }
  };
module.exports = { addFunction, deleteFunction,updateFunction,getFunction };
