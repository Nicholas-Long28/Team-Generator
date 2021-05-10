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
     <p class="lead">${answers.name} will be an ${answers.role}.</p>
     <h3><span class="badge badge-secondary">Contact Me</span></h3>
        <ul class="list-group">
            <li class="list-group-item">Employees email: ${answers.email}</li>
            <li class="list-group-item">Employees ID: ${answers.id}</li>
            <li class="list-group-item">Employees went to school at: ${answers.school}</li>
        </ul>
    </div>
</div>
</body>   
</html>`;