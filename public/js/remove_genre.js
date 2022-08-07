// Get the objects we need to modify
let updateSongGenre = document.getElementById('update-song-form-ajax');

// Modify the objects we need
updateSongGenre.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputFullName = document.getElementById("mySelect");

    // Get the values from the form fields
    let fullNameValue = inputFullName.value;

    // Put our data we want to send in a javascript object
    let data = {
        songID: fullNameValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-song-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, fullNameValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, personID) {
    let parsedData = JSON.parse(data);
    let table = document.getElementById("customers-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == personID) {

            // Get the location of the row where we found the matching customer ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let tduser = updateRowIndex.getElementsByTagName("td")[1];
            let tdpass = updateRowIndex.getElementsByTagName("td")[2];
            let tdemail = updateRowIndex.getElementsByTagName("td")[3];
            let tdprem = updateRowIndex.getElementsByTagName("td")[4];

            // Reassign the customer to our value we updated to
            tduser.innerHTML = parsedData[0].username;
            tdpass.innerHTML = parsedData[0].password;
            tdemail.innerHTML = parsedData[0].email;
            tdprem.innerHTML = parsedData[0].isPremium;
        }
    }
}