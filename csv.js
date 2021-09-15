var fs = require('fs');
var parse = require('csv-parse');

var filename = process.argv[2]; // Filename to use for Input

//Object use to store Triggers and Actions

var workflowsJsonObj = {}


var csvData = [];
fs.createReadStream(filename)
    .pipe(parse({delimiter: ','}))
    .on('data', function (csvrow) {
//        console.log(csvrow);
        //do something with csvrow
        csvData.push(csvrow);
    })
    .on('end', function () {

        var DudeFoundMyCarAndUser = 0;
        for (var item of csvData) { // Loop through each line
            if (item[0].includes("root")) { //each Individual Line

                // console.log ( item[0])

                // This set the fields for each line to be returned

                lineResult = {}
                lineResult.methodAddress = item[0]
                lineResult.rateLimit = item[1]
                lineResult.designConsideration = item[2]
                lineResult.oktaComplexity = item[3]

                indexName =  lineResult.methodAddress

                // workflowsJsonObj.push ( indexName )
                workflowsJsonObj[indexName] =
                    {
                        "methodAddress": lineResult.methodAddress,
                        "rateLimit": lineResult.rateLimit,
                        "designConsideration": lineResult.designConsideration,
                        "oktaComplexity": lineResult.oktaComplexity
                    }
            }
        }

        var temp = JSON.stringify(workflowsJsonObj)
        console.log(temp)
    });


