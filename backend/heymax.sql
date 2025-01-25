create database if not exists heymax;
use heymax;

CREATE TABLE User (
    username VARCHAR(255) PRIMARY KEY,
    points INT DEFAULT 0
);

CREATE TABLE Post (
    postID INT auto_increment PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    review VARCHAR(500) NOT NULL,
    bookGenre VARCHAR(255) NOT NULL,
    bookTitle VARCHAR(255) NOT NULL,
    FOREIGN KEY (username) REFERENCES User(username) ON DELETE CASCADE
);

CREATE TABLE Listing (
    listingID INT auto_increment PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    url VARCHAR(500) NOT NULL,
    bookGenre VARCHAR(255) NOT NULL,
    bookTitle VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    author VARCHAR(500) NOT NULL,
    FOREIGN KEY (username) REFERENCES User(username) ON DELETE CASCADE
);

CREATE TABLE Likes (
    postID INT,
    username VARCHAR(255) NOT NULL,
    PRIMARY KEY (username, postID),
    FOREIGN KEY (username) REFERENCES User(username) ON DELETE CASCADE,
    FOREIGN KEY (postID) REFERENCES Post(postID) ON DELETE CASCADE
);

INSERT INTO User (username, points) VALUES
('john_doe', 120),
('emma_wilson', 85),
('michael_smith', 200),
('sarah_jones', 150),
('david_brown', 60),
('lucy_martin', 175),
('james_clark', 220),
('olivia_williams', 90),
('daniel_lee', 35),
('isabella_taylor', 110),
('angel_loves_books', 12),
('jerricknsc', 9);

INSERT INTO Post (username, review, bookGenre, bookTitle) VALUES
('john_doe', 'An amazing thriller that kept me on the edge of my seat!', 'Thriller', 'The Silent Night'),
('emma_wilson', 'Heartwarming and emotional, a must-read for everyone.', 'Romance', 'Love in the Rain'),
('michael_smith', 'Incredible world-building, a true fantasy masterpiece.', 'Fantasy', 'The Kingdom of Shadows'),
('sarah_jones', 'A gripping historical drama with fascinating characters.', 'Historical Fiction', 'The Time Traveler'),
('david_brown', 'A fast-paced mystery with a shocking twist at the end!', 'Mystery', 'The Vanishing Hour'),
('lucy_martin', 'An insightful look into the human condition, beautifully written.', 'Drama', 'Pieces of Us'),
('james_clark', 'An exciting adventure, perfect for young readers!', 'Adventure', 'The Lost Island'),
('olivia_williams', 'A poignant tale of survival and friendship.', 'Survival', 'Into the Wilderness'),
('daniel_lee', 'A thrilling detective story with sharp twists and turns.', 'Crime', 'The Murderer’s Game'),
('isabella_taylor', 'A funny and light-hearted read, perfect for a weekend.', 'Comedy', 'The Laughing Mystery'),
('john_doe', 'A beautiful story about second chances and redemption.', 'Romance', 'Starting Over'),
('emma_wilson', 'A chilling horror novel that will keep you up at night.', 'Horror', 'Night of the Screams'),
('michael_smith', 'An epic journey that blends mythology and modern storytelling.', 'Fantasy', 'The Gods of Chaos'),
('sarah_jones', 'A thought-provoking narrative that challenges societal norms.', 'Science Fiction', 'Tomorrow’s World'),
('david_brown', 'An inspiring memoir of resilience and triumph over adversity.', 'Biography', 'Rise Above'),
('lucy_martin', 'A charming tale about the importance of family and love.', 'Fiction', 'Our Forever Home'),
('james_clark', 'A deep dive into the world of artificial intelligence and its implications.', 'Technology', 'The AI Revolution'),
('olivia_williams', 'A compelling look into the world of international politics.', 'Political Fiction', 'Power Games'),
('daniel_lee', 'A captivating thriller filled with unexpected twists and dark secrets.', 'Thriller', 'Whispers in the Dark'),
('isabella_taylor', 'An emotional journey of self-discovery and personal growth.', 'Self-Help', 'Finding Myself');

INSERT INTO Listing (username, url, bookGenre, bookTitle, price, author) VALUES
('john_doe', '/images/book-1.jpg', 'Thriller', 'The Silent Night', 15, 'Stephen King'),
('emma_wilson', '/images/book-2.jpg', 'Romance', 'Love in the Rain', 12, 'Nicholas Sparks'),
('michael_smith', '/images/book-3.jpg', 'Fantasy', 'The Kingdom of Shadows', 20, 'J.R.R. Tolkien'),
('sarah_jones', '/images/book-4.jpg', 'Historical Fiction', 'The Time Traveler', 18, 'Diana Gabaldon'),
('david_brown', '/images/book-5.jpg', 'Mystery', 'The Vanishing Hour', 14, 'Agatha Christie'),
('lucy_martin', '/images/book-1.jpg', 'Drama', 'Pieces of Us', 16, 'Toni Morrison'),
('james_clark', '/images/book-2.jpg', 'Adventure', 'The Lost Island', 13, 'Michael Crichton'),
('olivia_williams', '/images/book-3.jpg', 'Survival', 'Into the Wilderness', 22, 'Jon Krakauer'),
('daniel_lee', '/images/book-4.jpg', 'Crime', 'The Murderer’s Game', 17, 'James Patterson'),
('isabella_taylor', '/images/book-5.jpg', 'Comedy', 'The Laughing Mystery', 11, 'David Sedaris'),
('john_doe', '/images/book-1.jpg', 'Romance', 'Starting Over', 13, 'Julia Quinn'),
('emma_wilson', '/images/book-2.jpg', 'Horror', 'Night of the Screams', 15, 'Stephen King'),
('michael_smith', '/images/book-3.jpg', 'Fantasy', 'The Gods of Chaos', 19, 'George R.R. Martin'),
('sarah_jones', '/images/book-4.jpg', 'Science Fiction', 'Tomorrow’s World', 17, 'Isaac Asimov'),
('david_brown', '/images/book-5.jpg', 'Biography', 'Rise Above', 20, 'Michelle Obama'),
('lucy_martin', '/images/book-1.jpg', 'Fiction', 'Our Forever Home', 14, 'Chimamanda Ngozi Adichie'),
('james_clark', '/images/book-2.jpg', 'Technology', 'The AI Revolution', 23, 'Ray Kurzweil'),
('olivia_williams', '/images/book-3.jpg', 'Political Fiction', 'Power Games', 18, 'John Grisham'),
('daniel_lee', '/images/book-4.jpg', 'Thriller', 'Whispers in the Dark', 16, 'Lee Child'),
('isabella_taylor', '/images/book-5.jpg', 'Self-Help', 'Finding Myself', 10, 'Brene Brown');
