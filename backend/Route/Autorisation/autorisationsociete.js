const route=require('express').Router();
const sortiesociete=require('../../Controllers/Autorisation/sortie_biens_societe');
const auth=require('../../Controllers/Auth/Auth');


route.post("/typesortie",auth.authGuardAdmin,sortiesociete.addTypeSortie);
route.get("/typesortie",auth.authGardBoth,sortiesociete.getTypeSortie);
route.delete("/typesortie/:id",auth.authGuardAdmin,sortiesociete.deleteTypeSortie);
route.patch("/typesortie/:id",auth.authGuardAdmin,sortiesociete.updateTypeSortie);


route.get("/biensortie",auth.authGardBoth,sortiesociete.getBiensSortie);

route.post("/materielles/:id",auth.authGardBoth,sortiesociete.addMaterielle);
route.get("/biens_societe/materielles/:id",auth.authGardBoth,sortiesociete.getMaterielle);
route.get("/materielleCount/:id",auth.authGardBoth,sortiesociete.getCountMaterielle);
route.post("/user/biens_scociete",auth.authGardBoth,sortiesociete.addBiensSociete);
route.get("/user/autorisation/:id",auth.authGardBoth,sortiesociete.getonebiensocieteautorisation);
route.get("/user/biens_societe/",auth.authGardBoth,sortiesociete.getmybiensocieteautorisation);
route.get("/admin/biens_societe/",auth.authGuardChef,sortiesociete.getAdminbiensociete);
route.patch("/admin/biens_societe/:id",auth.authGuardChef,sortiesociete.confirm_refus_bien_societe);
module.exports=route