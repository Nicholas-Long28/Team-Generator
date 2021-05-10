const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const Manager = require('../lib/manager.js');
const Engineer = require('../lib/engineer.js');
const Intern = require('../lib/intern.js');


const writeFileAsync = util.promisify(fs.writeFile);

const promptManager = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Managers name:',
        },
        {
            type: 'input',
            name: 'id',
            message: 'Manager ID',
            validate: function(value) {
                var valid = !isNaN(parseFloat(value));
                return valid || 'Please enter a number';
            },
        },
        {
            type: 'input',
            name: 'email',
            message: 'Managers Email',
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'Manager Office Number',
            validate: function(value) {
                var valid = !isNaN(parseFloat(value));
                return valid || 'Please enter a number';
            },
        },
        {
            type: 'list',
            name: 'another',
            message: 'Would you like to add an Engineer, Intern, Employee or complete your team?',
            choices: ['Engineer', 'Intern', 'Employee', 'None']
        }
    ])
}

const promptEngineer = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the engineers name?'
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the Engineers ID?',
            validate: function(value) {
                var valid = !isNaN(parseFloat)(value);
                return valid || 'Please enter a number';
            },
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the engineers email?',
        },
        {
            type: 'input',
            name: 'github',
            message: 'Engineers Github',
        },
        {
            type: 'list',
            name: 'another',
            message: 'Would you like to add another employee?',
            choices: ['Engineer', 'intern', 'employee', 'none']
        }
    ])
}

const promptIntern = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the employees name?',
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the employees ID number?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the employees email?',
        },
        {
            type: 'input',
            name: 'role',
            message: 'What role will the employee be performing?',
        },
        {
            type: 'input',
            name: 'school',
            message: 'What school does the intern go to?',
        }
    ]);
};

/*const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the employees name?',
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the employees ID number?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the employees email?',
        },
        {
            type: 'input',
            name: 'role',
            message: 'What role will the employee be performing?',
        },
    ]);
};*/

const team = [];

function runEngineer(){
    promptEngineer().then(function(response){
        const engineer = new Engineer(rsponse.name, response.id, response.github, response.email)
        if(response.another == 'Engineer'){
            team.push(engineer);
            runEngineer();
        }else if(response.another == 'Intern'){
            team.push(engineer);
            runIntern();
        }else if(response.another =='None'){
            team.push(engineer);

            fs.writeFile('./output/team.html', render(team),function(err){
                if(err) throw err;
                console.log('Writing team file..')
            });
            return;
        }
    })
}

function runIntern(){
    promptIntern().then(function(response){
        const engineer = new Intern(rsponse.name, response.id, response.github, response.email)
        if(response.another == 'Engineer'){
            team.push(Intern);
            runEngineer();
        }else if(response.another == 'Intern'){
            team.push(Intern);
            runIntern();
        }else if(response.another =='None'){
            team.push(Intern);

            fs.writeFile('./output/team.html', render(team),function(err){
                if(err) throw err;
                console.log('Writing team file..')
            });
            return;
        }
    })
}

function runManager(){
    promptManager().then(function(response){
        const engineer = new Manager(rsponse.name, response.id, response.github, response.email)
        if(response.another == 'Engineer'){
            team.push(Manager);
            runEngineer();
        }else if(response.another == 'Intern'){
            team.push(Manager);
            runIntern();
        }else if(response.another =='None'){
            team.push(Manager);

            fs.writeFile('./output/team.html', render(team),function(err){
                if(err) throw err;
                console.log('Writing team file..')
            });
            return;
        }
    })
}

runManager();

const generateHTML = (answers) =>
    `<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <meta http-equiv="X-US-Compatible" content="ie=edge">
 <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
 <title>Document</title>
</head>
<body>
    <div class="jumbotron jumbotron-fluid">
    <div class="container">
     <h1 class="display-4">Employees name is ${answers.name}</h1>
     <p class="lead">${answers.name} will be an ${answers.employee}.</p>
     <h3><span class="badge badge-secondary">Contact Me</span></h3>
        <ul class="list-group">
            <li class="list-group-item">Employees email: ${answers.email}</li>
            <li class="list-group-item">Employees ID: ${answers.id}</li>
            <li class="list-group-item">Employees role: ${answers.role}</li>
        </ul>
    </div>
</div>
</body>   
</html>`;

const init = () => {
    promptUser()
        .then((answers) => writeFileAsync('index.html', generateHTML(answers)))
        .then(() => console.log('Successfully wrote to index.html'))
        .catch((err) => console.error(err));
};

init();