const readline = require('readline');
const inquirer = require('inquirer');
const fs = require('fs');
const _ = require('lodash');

let config = require('./config.json');

// TODO: RxJS

function generateFile(templateFile, name) {
	name = name || 'my-comp';
    
	let file = fs.readFileSync(templateFile, {}).toString();
	let compiled = _.template(file);
	let componentSelectorName = _.camelCase(name);
	let nameCamel = _.upperFirst(componentSelectorName);

	return compiled({
		name, 
		nameCamel, 
		componentSelectorName
	});
}

let componentsPath = config.componentsPath; 
let path = _.get(process, 'argv[2]', null);

if (path) {
	componentsPath = path;
}

inquirer.prompt([{
    type: 'list',
    name: 'type',
    message: 'what do you want to generate?',
    choices: [
        'component'
    ],
    filter: val => {
        return val.toLowerCase();
    }
}]).then(answerType => {
	// console.log(answerType)

    // COMPONENT:
    inquirer.prompt([{
        type: 'input',
        name: 'name',
        message: answerType.type + ' name? (this will be the folder name.)'
    }]).then(answerClassName => {	

        let componentPath = componentsPath + '/' + answerClassName.name;
        fs.mkdirSync(componentPath);

        let componentFile = generateFile(config.templatesPath + 'component.ts', answerClassName.name);
        let componentHtmlFile = generateFile(config.templatesPath + 'component.html', answerClassName.name);
        let componentStyleFile = generateFile(config.templatesPath + 'component.scss', answerClassName.name);

        fs.writeFile(componentPath + '/' + answerClassName.name + '.ts', componentFile, err => {
            if(err) {
                return console.log(err);
            }

            console.log("component file created!");
        });
        fs.writeFile(componentPath + '/' + answerClassName.name + '.html', componentHtmlFile, err => {
            if(err) {
                return console.log(err);
            }

            console.log("component html created!");
        });
        fs.writeFile(componentPath + '/' + answerClassName.name + '.scss', componentStyleFile, err => {
            if(err) {
                return console.log(err);
            }

            console.log("component style file created!");
        });	

        // console.log("component created succesfully! don't forget to sign it;");
    });
});


