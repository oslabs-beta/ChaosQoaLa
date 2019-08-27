const { writeFileSync } = require ('fs');
const { join } = require ('path');

//reads a provided local file path
const packageJSON = join(__dirname, '..', 'package.json')
const package = require(packageJSON)


//saves the conifguration for future use
function configure(state){
    package.chaosQoala = {
        ...state,
    }

    writeFileSync (
        packageJSON,
        JSON.stringify(package, null, 2)
    )
};

function questions(answers){
    configure({questions: answers})
};

//LOOK AT GRABBING THE PACKAGE AFTER THE PACKAGE IS READ
//look at renaming the properties in state
function read() {
    const { configQuestions = {} } = package
    let { questions = [], state = {
        socket: "",
        blastRadius: "",
        delay: "",
        missingData: "",
        runTime: ""
    }} = configQuestions
    return {
        questions,
        state,
    }
};

function save (state){
    const { configQuestions = {}} = package
    configure({...configQuestions, state: {...configQuestions.state, ...state}})
}

module.exports = {
    configure,
    read,
    save,
    questions,
}