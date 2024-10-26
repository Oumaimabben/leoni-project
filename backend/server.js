const express=require('express');
const app=express();
var cors = require('cors');
const userRoute=require('./Route/User/userRoute');
const AutorisationPersonelRoute=require('./Route/Autorisation/autorisationpersonelRoute')
const AutorisationRebutRoute=require('./Route/Autorisation/autorisationrebut');
const AutorisationSocieteRoute=require('./Route/Autorisation/autorisationsociete');
app.use(cors())
app.use(express.json());


app.use('/',userRoute);
app.use('/',AutorisationRebutRoute);
app.use('/',AutorisationPersonelRoute);
app.use('/',AutorisationSocieteRoute); 
app.listen(3005,()=>{
    console.log('serveur start')
})

