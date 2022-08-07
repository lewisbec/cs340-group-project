// Get the objects we need to modify
let updatePersonForm = document.getElementById('update-person-form-ajax');

// Modify the objects we need
updatePersonForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputCustomerID = document.getElementById("mySelect");
    let inputUsername = document.getElementById("input-username-update");
    let inputPassword = document.getElementById("input-password-update")
    let inputEmail = document.getElementById("input-email-update")
    let inputIsPremium = document.getElementById("input-isPremium-update")

    // Get the values from the form fields
    let customerIDValue = inputCustomerID.value;
    let usernameValue = inputUsername.value;
    let password = inputPassword.value;
    let email = inputEmail.value
    let isPremium = inputIsPremium.value


    let data = {
        cutomerID: customerIDValue,
        username: usernameValue,
        password: password,
        email: email,
        isPremium: isPremium
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-person-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, customerIDValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, personID) {
    console.log(data)
    let parsedData = JSON.parse(data);
    console.log(parsedData)
    let table = document.getElementById("customers-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == personID) {

            let updateRowIndex = table.getElementsByTagName("tr")[i];

            let tduser = updateRowIndex.getElementsByTagName("td")[1];
            let tdpass = updateRowIndex.getElementsByTagName("td")[2];
            let tdemail = updateRowIndex.getElementsByTagName("td")[3];
            let tdprem = updateRowIndex.getElementsByTagName("td")[4];

            tduser.innerHTML = parsedData[0].username;
            tdpass.innerHTML = parsedData[0].password;
            tdemail.innerHTML = parsedData[0].email;
            tdprem.innerHTML = parsedData[0].isPremium;
        }
    }
}