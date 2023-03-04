const Validator = require('jsonschema').Validator;

module.exports = {
    hasSchemaValidationErrors: function (obj, schema) {
        let validator = new Validator()
        return validator.validate(obj, schema).errors.length === 0
    }

}