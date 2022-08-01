-- READ OPERATIONS
-- genres
-- get all genres
SELECT Genres.genreID from Genres;

-- artists
-- get all artists
SELECT * from Artists;


-- albums
-- get all albums and the corresponding artist
SELECT Albums.albumID, Albums.title, Albums.description, Artists.name AS artist FROM Albums
Inner JOIN Artists ON Albums.artistID = Artists.artistID;

-- songs
-- get all songs, the corresponding artist, genre, and album
SELECT Songs.songID, Songs.title, Songs.duration, Songs.numberOfStreams, Albums.title as album, Artists.name as artist, Genres.genreID as genre FROM Songs
Inner Join Albums ON Albums.albumID = Songs.albumID
INNER JOIN Artists ON Artists.artistID = Songs.artistID
INNER JOIN Genres ON Genres.genreID = Songs.genreID;

-- customers
-- get all customers
SELECT Customers.customerID, Customers.username, Customers.password, Customers.email, Customers.isPremium FROM Customers;


-- playlists
-- get all playlists and all songs within the playlist
SELECT Playlists.playlistID, Playlists.numberOfStreams, Playlists.name, Playlists.description, Songs.title FROM Playlists
INNER JOIN Playlists_Songs on Playlists_Songs.playlistID = Playlists.playlistID
INNER JOIN Songs on Playlists_Songs.songID = Songs.songID;

-- filter by playlist name
SELECT Playlists.name, Playlists.streams, Playlists.description, Customers.username FROM Playlists_Songs
WHERE Playlists.name = :playlistnamefilter;

-- CREATE OPERATIONS
-- create a new genre
INSERT INTO Genres (Genres.genreID) VALUES (:genreIdInput);

-- create a new Artist
INSERT INTO Artists (Artists.name, Artists.bio) VALUES (:nameInput, :bioInput);

-- create a new Album
INSERT INTO Albums (Albums.title, Albums.description, Albums.artistID) VALUES (:titleInput, :descriptionInput, :artistIDFromDropDown);

-- create a new Song
INSERT INTO Songs (Songs.title, Songs.duration, Songs.albumID, Songs.artistID, Songs.genreID) VALUES (:titleInput, :durationInput, :albumIDFromDropDown, :artistIDFromDropDown, :genreIDFromDropDown);

-- create a new Customer
INSERT INTO Customers (Customers.username, Customers.password, Customers.email, Customers.isPremium) VALUES (:usernameInput, :passwordInput, :emailInput, :isPremiumInput);

-- create a new Playlist
INSERT INTO Playlists (Playlists.name, Playlists.description, Playlists.customerID) VALUES (:nameInput, :descriptionInput, :customerIDFromDropDown);

-- add a song to a Playlist
INSERT INTO Playlists_Songs (Playlists_Songs.playlistID, Playlists_Songs.songID) VALUES (:playlistInput, :songInput);

-- UPDATE OPERATIONS
-- update a customer
UPDATE Customers
    SET username = :usernameInput, password = :passwordInput, email = :emailInput, isPremium = :isPremiumInput
    WHERE customerID = :selectedCustomerID;

-- DELETE OPERATIONS
-- delete a song from a playlist
DELETE FROM Playlists_Songs WHERE playlistID = :selectedPlaylist AND songID = :selectedSong;

-- delete an entire playlist from the Playlists table, all associated entries in the Playlists_Songs table should be deleted by CASCADE
DELETE FROM Playlists
WHERE playlistID = :selectedPlaylist;

-- set a genre in a song to be null
UPDATE Songs
    SET Songs.genreID = NULL
    WHERE Songs.songID = :selectedSongID
