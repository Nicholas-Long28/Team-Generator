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
 <h1 class="display-4">Managers name is ${answers.name}</h1>
 <p class="lead">${answers.name} will be a Manager.</p>
 <h3><span class="badge badge-secondary">Contact Me</span></h3>
    <ul class="list-group">
        <li class="list-group-item">Managers email: ${answers.email}</li>
        <li class="list-group-item">Managers ID: ${answers.id}</li>
        <li class="list-group-item">Managers office number: ${answers.officeNumber}</li>
    </ul>
</div>
</div>
</body>   
</html>`;