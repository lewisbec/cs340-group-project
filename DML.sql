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
Inner JOIN Artists ON Albums.albumID = Artists.artistID;

-- songs
-- get all songs, the corresponding artist, genre, and album
SELECT Songs.songID, Songs.title, Songs.duration, Songs.streams, Albums.title as album, Artists.name as artist, Genres.genreID as genre FROM Songs
Inner Join Albums ON Albums.albumID = Songs.albumID
INNER JOIN Artists ON Artists.artistID = Songs.artistID
INNER JOIN Genres ON Genres.genreID = Songs.genreID;

-- customers
-- get all customers
SELECT Customers.customerID, Customers.username, Customers.password, Customers.email, Customers.isPremium FROM Customers;


-- playlists
-- get all playlists and all songs within the playlist
SELECT Playlists.name, Playlists.streams, Playlists.description, Customers.username as user FROM Playlists_Songs
INNER JOIN Playlists on Playlists_Songs.playlistID = Playlists.playlistID
INNER JOIN Customers on Customers.customerID = Playlists.customerID;

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
