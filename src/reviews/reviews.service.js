const knex = require("../db/connection");

const tableName = "reviews";

function read(reviewId) {
    return knex(tableName).select("*").where({review_id : reviewId}).first();
}

function update(reviewId, updatedReview) {
    return knex(`${tableName} as r`)
	.join("critics as c", "r.critic_id", "c.critic_id")
	.select("c.*", "r.*")
	.where({review_id: reviewId})
	.update(updatedReview, "*")
	.then((data) => data[0]);
}

function destroy(reviewId) {
    return knex(tableName).where({review_id: reviewId}).del();
}

module.exports = {
    read,
    update,
    destroy,
}
