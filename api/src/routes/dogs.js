const { Router } = require ("express");
const { Dog, Temperament } = require("../db");
const router = Router();
const { getAllDogs } = require("./controlador")
const axios = require ("axios");



router.get("/", async (req, res, next) => {
    try{
        const {name} = req.query;
    let totalDogs = await getAllDogs();
    //console.dog(totalDogs)

    if (name) {
        let dogName = await totalDogs.filter (el => el.name.toLowerCase().includes(name.toLowerCase()));
        dogName.length ?
        res.status(200).send(dogName):
        res.status(404).send("This dog doesn't exists")
    } else {
        res.status(200).send(totalDogs)
    }
}
catch (error){
 next(error)
}
});


router.get("/:id", async (req, res) => {
    try{
        const {id} = req.params;
    const totalDogs = await getAllDogs()
    if (id){
        let dogId = await totalDogs.filter( el => el.id == id);
        dogId.length?
        res.status(200).json(dogId) :
        res.status(404).send ("There is not dog with this ID")
    }
}
catch (error){
    console.log(error)
}
});

router.post ("/", async (req, res, next) => {
    let {name, life_span, minweight, maxweight, minheight, maxheight, image, temperament } = req.body;
    try {
        let postDog = await Dog.create ({
            name, 
            minheight,
            maxheight,
            minweight,
            maxweight,
            life_span,
            image,
          })
    let temperamentDb = await Temperament.findAll ({
        where: {name: temperament }
    })
    postDog.addTemperament(temperamentDb)
    res.send("Dog add successfully!!")
    }
    catch (error) {
        next(error)
    }
});

module.exports = router;

