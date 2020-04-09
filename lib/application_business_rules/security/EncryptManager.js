
module.exports = class {

    encrypt(value){
        throw new Error("Abstract method call")
    }

    compare(value, hash){
        throw new Error("Abstract method call")
    }
}