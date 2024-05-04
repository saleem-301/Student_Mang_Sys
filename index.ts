#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

let stuData: { [key: string]: any } = [];

let courses: any = {
  "Ms Office": 10000,
  Html: 20000,
  "C++": 9000,
  "Java Script": 14000,
  "Type Script": 15000,
};

let studID = 0;
console.log(chalk.bgYellowBright(chalk.blue("\n\nWelcome to Pak Institute\n")));

for (let i = 1; i != 0; ) {
  let status = await inquirer.prompt({
    name: "status",
    type: "list",
    message: chalk.green("\nPlease Select your action to Continue\n"),
    choices: [
      "Enrol New Student",
      "Check Student's Status",
      "Enrol New Student",
      "Check Student's Status",
      "Edit Existing Student's Record",
      "Exit",
    ],
  });
  console.log(status.status);

  //CONDITION 1 : TO ENROL NEW STUDENT

  if (status.status === "Exit") {
    console.log(chalk.yellow("GOOD BYE"));
    break;
  } else if (status.status === "Enrol New Student") {
    let studInfo = await inquirer.prompt([
      {
        name: "name",
        type: "input",
        message: chalk.cyanBright("Enter Your Name"),
      },
      {
        name: "fname",
        type: "input",
        message: chalk.cyanBright("Enter Your father's name"),
      },
      {
        name: "Course",
        type: "list",
        message: chalk.cyanBright("Select Your Course to Enrol"),
        choices: ["Ms Office", "HTML", "C++", "Java Script", "Type Script"],
      },
      {
        name: "Fee",
        type: "list",
        message: "Select Status of Fee",
        choices: ["Paid", "Unpaid", "Partialy Paid"],
      },
    ]);
    //Gerneratinig Students ID and storing data in to stuData
    studID++;
    let students: { [key: string]: any } = {
      ID: studID.toString().padStart(5, "0"),
      Name: studInfo.name,
      Fname: studInfo.fname,
      Course: studInfo.Course,
      Fee: studInfo.Fee,
    };
    stuData[stuData.length] = students;

    //STORING FEE AND BALANCE
    let lastVal = stuData[stuData.length - 1];

    if (lastVal.Fee === "Unpaid") {
      lastVal.Balance = courses[lastVal.Course];
    } else if (stuData[stuData.length - 1].Fee === "Partialy Paid") {
      let amt = await inquirer.prompt({
        name: "payment",
        type: "input",
        message: "\nEnter the amount Paid\n",
      });
      // console.log(amt.payment)
      stuData[stuData.length - 1]["Balance"] =
        courses[stuData[stuData.length - 1]["Course"]] - amt.payment;
    } else {
      stuData[stuData.length - 1]["Balance"] = 0;
    }
  }
  //CONDITION 2 : TO CHECK STATUS
  else if (status.status === "Check Student's Status") {
    if (stuData.length === 0) {
      console.log(`\n No Record Found in Data \n`);
    } else {
      console.log(stuData);
    }
  }
  //CONDITION 3 : TO EDIT EXISTING STUDENT'S RECORD
  else if (status.status === "Edit Existing Student's Record") {
    let exId = await inquirer.prompt([
      {
        name: "exId",
        type: "input",
        message: "\n Type student's ID you want to Edit \n", //asking for id to change record
      },
    ]);
    console.log(exId.exId);

    //LOOP TO CHECK EACH RECORD TO FIND DESIRED ID RECORD
    for (let i = 0; i < stuData.length; i++)
      if (stuData[i].ID === exId.exId) {
        console.log(`Found your Desired ID ${exId.exId}`);
        let newfield = await inquirer.prompt({
          name: "field",
          type: "list",
          message: "\nSelect the field you want to edit",
          choices: ["Name", "Fname", "Course", "Fee"],
        });
        //Editing options other than fee
        if (newfield.field != "Fee") {
          let newVal = await inquirer.prompt({
            name: "newName",
            type: "input",
            message: "Enter New Value",
          });
          stuData[i][newfield.field] = newVal.newName;
        }
        //EDITING THE FEE OPTION
        else {
          let newFee = await inquirer.prompt({
            name: "newFee",
            type: "list",
            message: "Select New Value",
            choices: ["Paid", "Unpaid", "Partialy Paid"],
          });
          stuData[i][newfield.field] = newFee.newFee;

          if (newFee.newFee === "Unpaid") {
            stuData[i].Balance = courses[stuData[i].Course];
          } else if (newFee.newFee === "Partialy Paid") {
            let amt = await inquirer.prompt({
              name: "payment",
              type: "input",
              message: "\nEnter the amount Paid\n",
            });

            stuData[i].Balance = courses[stuData[i].Course] - amt.payment;
          } else {
            stuData[i].Balance = 0;
          }
        }
        console.log(stuData[i]);
        break;
      } else if (i === stuData.length - 1) {
        console.log("ID DOES NOT EXIST");
        break;
      }

      // IF ID DOESN'T EXIST
      else {
        console.log(i);
        continue;
      }
  }
}
