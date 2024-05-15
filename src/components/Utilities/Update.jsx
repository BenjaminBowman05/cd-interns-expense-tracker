import * as expenseService from "../../services/ExpenseService.jsx";
import * as programService from "../../services/ProgramService.jsx";

export function Update(obj) {
  // const programs = [obj.expensePrograms];
  console.log("OBJ UPDATE");
  console.log(obj);
  console.log(obj.receipt);

  expenseService.updateExpense(obj.id, obj).then((response) => {
    // for (let i = 0; i < programs.length; i++) {
    //     programService.updateProgram(programs[i].id, programs[i]).then(response => {
    //             // console.log(expenseService.getAllExpenses())
    //             // navigate(`/`);
    //             console.log("Hello I did stuff")
    //         })
    // }
  });
}

//export default Update;
