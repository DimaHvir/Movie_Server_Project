const knex = require("../db/connection");

const tableName = "theaters";

function list() {
    return knex(`${tableName} as t`)
	.join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
	.join("movies as m", "m.movie_id", "mt.movie_id")
	.select("*")
}

module.exports = {
    list,
}
