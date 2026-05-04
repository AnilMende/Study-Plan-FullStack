
// Express doesn't handle the errors by default
//to avoid the repeated use of try/catch blocks we are using the wrapper which helps in finding the errors

//here requestHandler is the async controller function

const asyncHandler = (requestHandler) => {

    return (req, res, next) => {
        Promise
            .resolve(requestHandler(req, res, next))
            .catch(err => next(err))
    }
}

export { asyncHandler };