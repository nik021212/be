#!/usr/bin/env node

const Ajv = require("ajv")
const addFormats = require('ajv-formats').default;
const ajv = new Ajv({removeAdditional: true, allErrors: true})
addFormats(ajv)
const fs = require('fs')

var myArgs = process.argv.slice(2);
let schemaFile = myArgs[0]
let jsonFile = myArgs[1]

fs.readdirSync('json-schemas').forEach(file => {
    if (file.endsWith('.json')) {
        rawSchema = fs.readFileSync('json-schemas/'+file);
        schema = JSON.parse(rawSchema); 
        ajv.addSchema(schema, file)
    }
});

rawSchema = fs.readFileSync('json-schemas/'+schemaFile);
schema = JSON.parse(rawSchema); 

rawJson = fs.readFileSync(jsonFile);
let json = JSON.parse(rawJson);

const validate = ajv.compile(schema)
const valid = validate(json)
if (!valid) console.log(validate.errors)