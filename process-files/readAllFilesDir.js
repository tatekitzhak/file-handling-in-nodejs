var fs = require('fs');
const path = require('path');
const readline = require('readline');
const readFile = require('./readFileLines');
const RegExRemoveUnwantedChar = require('../regex');

/* -----------guide-----------
  https://stackoverflow.com/questions/6156501/read-a-file-one-line-at-a-time-in-node-js
*/
async function readFileLineByLine(filePath) {
    const readableFileStream = fs.createReadStream(filePath); // lets us read the contents of a file ( creates a readable stream to a file).

    var singleTextFileIntoArray = [];
    const readable = readline.createInterface({
        input: readableFileStream,
        crlfDelay: Infinity
    });

    for await (const line of readable) {
        try {
            console.log(`Line from file: ${line}`);
            let fileLine = RegExRemoveUnwantedChar.prefix_regex(line);
            fileLine = RegExRemoveUnwantedChar.suffix_regex(fileLine);
            fileLine = RegExRemoveUnwantedChar.str_is_spaces(fileLine);
            // Each line in input.txt will be successively available here as `line`.
            if (fileLine) {
                // console.log(`Line from file: ${res}`);
                singleTextFileIntoArray.push(fileLine);
            }

        } catch (error) {
            console.log('error:', error);
        }

    }
    console.log('singleTextFileIntoArray:', singleTextFileIntoArray)
    return singleTextFileIntoArray;

}

/* -----------guide-----------
    https://stackoverflow.com/questions/10049557/reading-all-files-in-a-directory-store-them-in-objects-and-send-the-object
*/
function readFilesHandle(dirname, onFileContent, occurredError) {

    fs.readdir(dirname, function (err, filenames) {
        let contentTopicsCompleted = [];
        if (err) {
            occurredError(`The directory name is invalid: ${err}`);
            return;
        }

        var filelist = ['woohoo.txt', 'aha.pdf', 'wahoo.txt'];
        var extension = '.txt';

        var validateFileExtension = filenames.filter(function (file) {
            return file.indexOf(extension) !== -1;
        });

        console.log(validateFileExtension); // expected output: ['woohoo.txt', 'wahoo.txt']

        let filesLength = validateFileExtension.length;
        console.log('files Array:', validateFileExtension)
        console.log('files Length:', filesLength);
        var data = '';

        validateFileExtension.forEach(function (filename, i) {
            console.log('forEach files :', filename, i)
            console.log('forEach dirname + filename :', dirname + filename)
            data = readFileLineByLine(dirname + filename)
                .then(function (result_as_an_array) {
                    console.log('forEach result_as_an_array:', result_as_an_array)
                    let specificFileSchemaObject = {};
                    specificFileSchemaObject.subcategories = result_as_an_array;
                    let baseFileName = path.parse(filename).name + '$$';
                    // match begin of string non alphanumeric characters

                    baseFileName = RegExRemoveUnwantedChar.prefix_regex(baseFileName);

                    //match end of string dots and non alphanumeric characters
                    baseFileName = RegExRemoveUnwantedChar.suffix_regex(baseFileName);

                    // console.log('A file name after remove char with regex: ', baseFileName);
                    console.log('forEach baseFileName:', baseFileName)
                    specificFileSchemaObject.name = baseFileName;
                    contentTopicsCompleted.push(specificFileSchemaObject);

                    // console.log('Singel file content:', i, result_as_an_array);
                    return contentTopicsCompleted;
                }).catch((err) => {
                    //console.log(`Catch statement error has occurred :${err}`);
                    occurredError(`Catch statement error has occurred :${err}`);
                }).finally(() => {
                    /* console.log('finally filesLength:', filesLength, i, contentTopicsCompleted.length)
                    if (i == (filesLength - 1)) {
                        onFileContent(contentTopicsCompleted)
                        //console.log('The final result as an array list of content each file:', contentTopicsCompleted)
                    } */

                    /**
                     if (i == (filesLength - 1) && contentTopicsCompleted.length == (filesLength - 1)) {
                        onFileContent(contentTopicsCompleted)
                    } else {
                        onFileContent('Check file content and length'+contentTopicsCompleted)
                    }
                     */
                });

            data.then(function (result) {
                if (result.length == filesLength) {
                    console.log('result:', result, result.length) // "Some User token"
                    onFileContent(result)
                }
            });
        }); // End forEach
    });
}



module.exports = { readFilesHandle }