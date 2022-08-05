// Get the objects we need to modify
let addPersonForm = document.getElementById('add-customer-form-ajax');

// Modify the objects we need
addPersonForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputUsername = document.getElementById("input-username");
    let inputPassword = document.getElementById("input-password");
    let inputEmail = document.getElementById("input-email");
    let inputIsPremium = document.getElementById("input-isPremium");

    // Get the values from the form fields
    let firstNameValue = inputUsername.value;
    let lastNameValue = inputPassword.value;
    let homeworldValue = inputEmail.value;
    let ageValue = inputIsPremium.value;

    // Put our data we want to send in a javascript object
    let data = {
        username: firstNameValue,
        password: lastNameValue,
        email: homeworldValue,
        isPremium: ageValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-customer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputUsername.value = '';
            inputPassword.value = '';
            inputEmail.value = '';
            inputIsPremium.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// the Customers table.
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("customers-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let firstNameCell = document.createElement("TD");
    let lastNameCell = document.createElement("TD");
    let homeworldCell = document.createElement("TD");
    let ageCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.customerID;
    firstNameCell.innerText = newRow.username;
    lastNameCell.innerText = newRow.password;
    homeworldCell.innerText = newRow.email;
    ageCell.innerText = newRow.isPremium;

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(firstNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(homeworldCell);
    row.appendChild(ageCell);

    // Add the row to the table
    currentTable.appendChild(row);
}