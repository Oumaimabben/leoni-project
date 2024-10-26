const route=require('express').Router();
const usermodel=require('../../Controllers/User/Login')
const fonction=require('../../Controllers/User/function');
const service=require('../../Controllers/User/service');
const user=require('../../Controllers/User/users');
const auth=require('../../Controllers/Auth/Auth');

route.post('/login',usermodel);

route.get('/function',auth.authGuardAdmin,fonction.getFunction);
route.post('/function',auth.authGuardAdmin,fonction.addFunction);
route.delete('/function/:id',auth.authGuardAdmin,fonction.deleteFunction);
route.patch('/function/:id',auth.authGuardAdmin,fonction.updateFunction);

route.get('/service',auth.authGuardAdmin,service.getService);
route.post('/service',auth.authGuardAdmin,service.addService);
route.delete('/service/:id',auth.authGuardAdmin,service.deleteService);
route.patch('/service/:id',auth.authGuardAdmin,service.updateService);

route.post('/changepassword',auth.authGardBoth,user.changePassword)
route.get('/user',auth.authGuardAdmin,user.getUser);
route.post('/user',auth.authGuardAdmin,user.addUser);
route.delete('/user/:id',auth.authGuardAdmin,user.deleteUser);
route.patch('/user/:id',auth.authGuardAdmin,user.updateUser);

module.exports=route

