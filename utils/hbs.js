var hbs = require("hbs");

hbs.registerHelper("join", function () {
  return `/join/${this.id}`;
});

hbs.registerHelper("leave", function () {
  return `/leave/${this.id}`;
});