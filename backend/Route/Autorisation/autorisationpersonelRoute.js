const route=require('express').Router();
const sortiepersonel=require('../../Controllers/Autorisation/sortie-biens-personel');
const auth=require('../../Controllers/Auth/Auth');

route.post("/typestage",auth.authGuardAdmin,sortiepersonel.addTypeStage);
route.get("/typestage",auth.authGardBoth,sortiepersonel.getTypeStage);
route.delete("/typestage/:id",auth.authGuardAdmin,sortiepersonel.deleteTypeStage);
route.patch("/typestage/:id",auth.authGuardAdmin,sortiepersonel.updateTypeStage);

route.post("/user/biens_personel",auth.authGardBoth,sortiepersonel.addbienspersonel);
route.get("/user/biens_personel/",auth.authGardBoth,sortiepersonel.getmybienspersonel);
route.get("/admin/biens_personel/",auth.authGuardChef,sortiepersonel.getAdminbienspersonel);
route.patch("/admin/biens_personel/:id",auth.authGuardChef,sortiepersonel.confirm_refus_biens_personel);

module.exports=route