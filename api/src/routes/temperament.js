const {Router} = require ("express");
const axios = require ("axios");
const {Temperament} = require("../db");
const router = Router();
const {YOUR_API_KEY} = process.env 


router.get("/", async(req, res) => {
    try{
    const temperamentApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`)

    const temperament = temperamentApi.data.map(el => el.temperament).join(", ").split(", ")


    temperament.forEach(el=> {
        Temperament.findOrCreate ({
            where:{name:el}
        })
    });
    const dogTemperament = await Temperament.findAll();
    res.send(dogTemperament)

    }
    catch(error){
        console.log(error)
    }
})

module.exports = router;