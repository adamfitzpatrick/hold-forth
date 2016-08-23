module.exports = () => {
    "use strict";

    let faker = require("faker");
    let fs = require("fs");
    let ncp = require("ncp").ncp;

    let totalPosts = 23;

    String.prototype.capitalize = function () {
        return this.toString().replace(/(^| )([a-z])/g, (group) => group.toUpperCase());
    };

    let imagesDir = `${process.cwd()}/mock-backend/images`;
    let imageNames = fs.readdirSync(`${process.cwd()}/mock-backend/images`);
    ncp(imagesDir, `${process.cwd()}/public/images`, (err) => {
        if (err) { console.error(err); }
    });

    function Post() {
        this.id = faker.random.uuid();
        this.date = faker.date.past();
        this.title = faker.company.catchPhrase().capitalize();
        this.featured = false;
        this.description = faker.lorem.sentence();
        this.text = faker.lorem.paragraphs(faker.random.number(20));
        this.cover = `images/${faker.random.arrayElement(imageNames)}`;
    }

    let posts = [];
    while (posts.length < totalPosts) {
        posts.push(new Post());
    }
    faker.random.arrayElement(posts).featured = true;

    return {
        posts: posts
    };
};