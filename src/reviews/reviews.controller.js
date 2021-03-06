const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function checkReview(req, res, next) {
    const {reviewId} = req.params;
    const review = await service.read(reviewId);
    if (review) {
	res.locals.review = review;
	return next();
    }
    next({status: 404, message: `/cannot be found/i`});
}
function checkInput(req, res, next) {
    if (req.body.data.content) {
	return next();
    }
    next({status:404, message: `invalid request body`});
}

async function update(req, res, next) {
    const {reviewId} = req.params;
    const {content} = req.body.data;
    res.locals.review.content = content;
    const data = await service.update(reviewId, res.locals.review);
    console.log(data);
    res.status(201).json({data});
}

async function destroy(req, res, next) {
    const {reviewId} = req.params;
    await service.destroy(reviewId)
    res.status(204).json({});
}

module.exports = {
    update : [asyncErrorBoundary(checkReview), checkInput, asyncErrorBoundary(update)],
    destroy : [asyncErrorBoundary(checkReview), asyncErrorBoundary(destroy)],
}
