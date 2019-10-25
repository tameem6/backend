const joi = require('joi');
//Registration validation
const registerValidation = (data) =>{
    const schema = joi.object().keys({
        username: joi.string().required().min(5),
        name: joi.string().required().min(3),
        password: joi.string().required().min(6)
    });
    return joi.validate(data, schema);
}

//Login validation
const loginValidation = (data) => {
    const schema = joi.object().keys({
        username: joi.string().required().min(5),
        password: joi.string().required().min(6)
    });
    return joi.validate(data, schema);
}

//Post Validation
const postValidation = (data) => {
    const schema = joi.object().keys({
        title: joi.string().required(),
        description: joi.string().required()
    });
    return joi.validate(data, schema);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.postValidation = postValidation;