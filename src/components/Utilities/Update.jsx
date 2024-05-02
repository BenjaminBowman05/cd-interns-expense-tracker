import * as expenseService from "../services/ExpenseService.jsx";
import * as programService from "../services/ProgramService.jsx";

function Update(id, obj) {
    const programs = obj[0].expensePrograms;
    obj[0].expensePrograms = null;
    const expense = obj[0];
    expenseService.Update(id, expense).then(response => {

        for (let i = 0; i < programs.length; i++) {
            programService.Update(programs[i])
                .then(response => {
                    // console.log(expenseService.getAllExpenses())
                    // navigate(`/`);
                    console.log("Hello I did stuff")
                })
        }
    })


}

export default Update;