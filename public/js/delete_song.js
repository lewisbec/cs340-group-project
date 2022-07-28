function deleteSong(songID) {
    let link = '/delete-song-ajax/';
    let data = {
        songID: songID
    };

    $.ajax({
        url: link,
        type: 'DELETE',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            deleteRow(songID);
        }
    });
}

function deleteRow(songID) {
    let table = document.getElementById("song-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == songID) {
            table.deleteRow(i);
            break;
        }
    }
}