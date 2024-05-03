import inquirer from 'inquirer';

let id : { [key: string]: any } = [{id: '00001', name : 'saleem'}, {id: '00002', name : 'Hammad'}]
// let n : [string] ='name' 
let newVal = await inquirer
.prompt({
    name: "newName",
    type: "list",
    message: "Enter New Value",
    choices: ['id','name']
  });

  let news = await inquirer
  .prompt({
      name: "news",
      type: "input",
      message: "Enter New Value",
    //   choices: ['id','name']
    });
  

  console.log(id[0][newVal.newName] )
  console.log( news.news)
  id[0][newVal.newName] = news.news
  console.log(id)

