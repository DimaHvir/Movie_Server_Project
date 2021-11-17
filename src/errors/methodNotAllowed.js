function methodNotAllowed(req, res, next) {
    return next({status: 400 , message: "This method is not allowed"});
}

module.exports = methodNotAllowed;
