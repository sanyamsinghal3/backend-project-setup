/*
## break down function
const asyncHandler = (func) => {()  => {

}} 

function asyncHandler(func) {
  return function () {
    // logic here
  };
} 
const asyncHandler = (func) => {
  return (req, res, next) => {
    Promise.resolve(func(req, res, next)).catch(next);
  };
};
*/

// fun into fun (higher order function 1st (fn) is upper func 2nd () inner func.
//# breakdown exemple is above.
/*//# 1st method to handle
const asyncHandler = (fn) => async(req,res,next) => {
    try {
        await fn(req, res, next);
    } catch (error) {
        res.status(error.code || 500).json({
            success:false,
            message:err.message
        });
    }
} */

// 2nd method to handle req res
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}


export { asyncHandler }

