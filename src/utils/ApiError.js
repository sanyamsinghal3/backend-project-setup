// by default nodejs provide apiError class, in this class we use constructor,error message,stacktrace, code, cause, syntax error etc. in this we will override the constrictor for beeter use this class.

class ApiError extends Error{
    //stack is error stack, in constructor body we override params
    constructor (statusCode,message="something went wrong",errors=[],stack=""){
        super(message)
        this.statusCode =statusCode;
        this.data=null;
        this.message=message;
        this.success=false;
        this.errors=errors;
        // below code use for prodcution some times error was in multiple line
        if(stack){
            this.stack=stack;
        }else{
            Error.captureStackTrace(this,this.constructor)
        }   
    }
}
export {ApiError};