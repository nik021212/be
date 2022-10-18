#!/usr/bin/env node

const fs = require('fs');
var path = require('path');
const jsf = require('json-schema-faker')

var myArgs = process.argv.slice(2);
let src = myArgs[0]
let dst = myArgs[1]

function genJsonExamples(source,dest) {
    fs.readdir(source, function (err, files) {
        console.log("Scanning '%s'",source)
        if (err) {
            console.error("Could not list the directory.", err);
            process.exit(1);
        }
        files.forEach(function (file, index) {
            let fullSourcePath = source+'/'+file
            let fullDestPath = dest+'/'+file
            fs.stat(fullSourcePath, function (error, stat) {
                if (error) {
                    console.error("Error stating file.", error);
                    return;
                }
                if (stat.isFile()) {
                    if (!fullSourcePath.endsWith(".json")) {
                        console.log("Skipping '%s'", fullSourcePath)
                    }
                    else {
                        console.log("Processing '%s'", fullSourcePath);
                        let schema = JSON.parse(fs.readFileSync(fullSourcePath))
                        jsf.resolve(schema,null,source).then( function(v) {
                            fs.writeFile(fullDestPath,JSON.stringify(v,null,2),function(err) {
                                if (err) return console.log(err);
                                console.log("'%s' written.",fullDestPath);
                            })
                        })
                    }
                }
                if (stat.isDirectory()) {
                    if (!fs.existsSync(dest+"/"+file)) fs.mkdirSync(dest+"/"+file)
                    genJsonExamples(source+"/"+file,dest+"/"+file)
                }
            })
        })
    })
}

fs.rmdirSync(dst, {recursive: true, force: true})
fs.mkdirSync(dst)
genJsonExamples(src,dst)