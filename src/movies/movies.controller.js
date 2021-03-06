const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");



function checkUrl(req, res, next) {
    const url = req.originalUrl;
    res.locals.sort = "";
    if (url.includes("reviews")) {
	res.locals.sort = "reviews";
    }
    if (url.includes("theaters")) {
	res.locals.sort = "theaters";
    }
    next();
}

async function verifyMovie(req, res, next) {
    const {movieId} = req.params;
    console.log(res.locals.sort);
    const movie = await service.read(movieId, res.locals.sort);
    if (movie) {
	res.locals.movie = movie;
	return next();
    }
    next({status: 404, message: `No movie with ID: ${movieId}`});
}

async function list(req, res) {
    const preData = await service.list(req.query.is_showing ? true : false);
    const data = [];
    for(let i =0; i < preData.length; i++) {
	if (! data.find((movie) => preData[i].movie_id === movie.movie_id)) {
	    data.push(preData[i])
	}
    }
    res.json({data});
}

function read(req, res) {
    const data = res.locals.movie;
    res.json({data});
}

module.exports = {
    list : [list],
    read : [checkUrl, asyncErrorBoundary(verifyMovie), read],
}


