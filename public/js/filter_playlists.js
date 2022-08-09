/*
/   Sets css style properties for the table on the Playlists page so that rows are hidden if they do not match the entered filter/search.
/   
/   Citation for the following function:
/   Date: 08/03/2022
/   Adapted from: freeCodeCamp
/   Source URL: https://www.freecodecamp.org/news/build-a-responsive-filterable-form-with-css-and-javascript/
*/
function filterPlaylist(filter_element) {
    let query = filter_element.value.toLowerCase();
    let rows = document.getElementsByTagName("tr");

    // Determine what column to filter by.
    let column;
    switch (filter_element.id) {
        case "playlistID-filter":
            column = 0;
            break;
        case "streams-filter":
            column = 1;
            break;
        case "name-filter":
            column = 2;
            break;
        case "description-filter":
            column = 3;
            break;
        case "song-filter":
            column = 4;
            break;
        default:
            console.error(`Filter ID is incorrect...}`);
            console.log(filter_element);
            break;
    }

    // Loop through all rows in the table, setting the css style for display to none for the row if the cell in the applicable column does not match the filter query.
    for (i = 2; i < rows.length; i++) {

        // Determine the contents of the cell for the row based on the column being filtered.
        let value = rows[i].getElementsByTagName("td")[column].textContent.toLowerCase();

        // Set the css style property if there is a match (not -1 using indexOf).
        if (value.indexOf(query) > -1) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
}