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

    console.log(rows);

    for (i = 2; i < rows.length; i++) {
        let value = rows[i].getElementsByTagName("td")[column].textContent.toLowerCase();
        if (value.indexOf(query) > -1) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
}