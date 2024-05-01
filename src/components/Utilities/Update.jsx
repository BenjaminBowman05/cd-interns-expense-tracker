import * as expenseService from "../services/ExpenseService.jsx";
import * as programService from "../services/ProgramService.jsx";

function Update (id, obj) {
    expenseService.Update(id, obj[0]).then(response => {

        for (let i = 0; i < obj[0].expensePrograms.length; i++) {
            programService.Update(obj[0].expensePrograms[i])
                .then(response => {
                    // console.log(expenseService.getAllExpenses())
                    // navigate(`/`);
                    console.log("Hello I did stuff")
                })
        }
    })


}

export default Update;