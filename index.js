const PORT = process.env.PORT || 3000;

const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");

const app = express();

const articles = [];

app.listen(PORT, () => {
  console.log("Server running on port: " + PORT);
});

app.get("/", (req, res) => {
  res.json("Welcome Vatan Computer API");
});

app.get("/products", (request, response) => {
  axios.get("https://www.vatanbilgisayar.com/").then((axiosResponse) => {
    const html = axiosResponse.data;
    const $ = cheerio.load(html);

    $(".opportunity-content")
      .children(".row")
      .children(".col-lg-3")
      .each(function (i, el) {
        const imgSrc = $(el)
          .children(".product-list")
          .children(".product-list__image-safe")
          .children("a")
          .children(".slider-img")
          .children(".lazyimg")
          .attr("data-src");
        const name = $(el)
          .children(".product-list")
          .children(".product-list__content__home")
          .children("a")
          .children(".product-list__product-name")
          .text()
          .trim();
        const price = $(el)
          .children(".product-list")
          .children(".product-list__content__home")
          .children(".product-list__cost")
          .children(".product-list__price")
          .text();
        articles.push({
          imgSrc,
          name,
          price,
        });
      });
    response.json(articles);
  });
});
