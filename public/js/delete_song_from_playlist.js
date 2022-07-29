function deleteSongFromPlaylist(playlistID, songID) {
    let link = '/delete-song-from-playlist-ajax/';
    let data = {
        playlistID: playlistID,
        songID: songID
    };

    $.ajax({
        url: link,
        type: 'DELETE',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            deleteRow(playlistID, songID);
        }
    });
}

function deleteRow(playlistID, songID) {
    let table = document.getElementById("playlist-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("playlistid-value") == playlistID && table.rows[i].getAttribute("songid-value") == songID) {
            table.deleteRow(i);
            break;
        }
    }
}