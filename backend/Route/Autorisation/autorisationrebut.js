const route=require('express').Router();
const rebut=require('../../Controllers/Autorisation/rebut');
const auth=require('../../Controllers/Auth/Auth');


route.post("/user/rebut",auth.authGardBoth,rebut.addRebut);
route.get("/user/rebut/",auth.authGardBoth,rebut.getmyRebut);
route.get("/admin/rebut/",auth.authGuardChef,rebut.getAdminRebut);
route.patch("/admin/rebut/:id",auth.authGuardChef,rebut.confirm_refus_rebut);

module.exports=route