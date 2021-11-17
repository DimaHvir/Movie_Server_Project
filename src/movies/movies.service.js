const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const mapCritic = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name:"critic.organization_name",
    created_at:"critic.created_at",
    updated_at:"critic.updated_at",
});

const tableName = "movies";

function list(isShowing) {
    return isShowing ? (
	knex(`${tableName} as m`)
	    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
	    .select("m.*") //unspecific
	    .where({"mt.is_showing" : true})
	    
    )
	: knex(tableName).select("*")
}

function read(movieId, sort) {
    if (sort === "theaters") {
	return knex(`${tableName} as m`)
	    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
	    .join("theaters as t", "t.theater_id", "mt.theater_id")
	    .select("t.*")
	    .where({"mt.is_showing" : true})
	    .andWhere({"mt.movie_id" : movieId});
    }
    if (sort === "reviews") {
	return knex(`${tableName} as m`)
	    .join("reviews as r", "r.movie_id", "m.movie_id")
	    .join("critics as c", "c.critic_id", "r.critic_id")
	    .select("r.*", "c.*")
	    .where({"m.movie_id" : movieId})
	    .then((data) => data.map(mapCritic));
    }
    return knex(tableName).select("*").where({movie_id : movieId}).first();
}

module.exports = {
    list,
    read,
}
