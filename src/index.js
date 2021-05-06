const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: 'What type of worker do you want to add to the team?',
            choices: ['Employee', 'Manager', 'Engineer', 'Intern']
        },
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
};

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