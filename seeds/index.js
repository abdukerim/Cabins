

const mongoose = require('mongoose');
const path = require('path');
const Campground = require('../model/campground');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelper');


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology:true
});
const db = mongoose.connection;
db.on("error",console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})


const seedDb = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const c = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${descriptors[Math.floor(Math.random()*descriptors.length)]} ${places[Math.floor(Math.random()*places.length)]}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error atque reiciendis eum? Accusamus quae molestiae nulla voluptates, consectetur velit ullam id officia in enim accusantium vitae aut voluptate consequuntur cupiditate!',
            price
        });
        c.save();
    }
}
//seedDb();
seedDb().then(() => {
    mongoose.connection.close();
});