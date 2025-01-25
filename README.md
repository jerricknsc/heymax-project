# Heymax Book App

## Overview
The **Heymax Book App** is a platform that facilitates the exchange of books among users in a community-driven manner. By combining technology and a love for books, it offers an easy and efficient way for users to share their books, discover new reads, and promote sustainability by giving books a second life.  

This app leverages a modern tech stack, including **Vue.js**, **Express.js**, and **MySQL**, to provide a seamless and intuitive user experience.

---

## Table of Contents
- [Key Features](#key-features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Project Plan and Milestones](#project-plan-and-milestones)
- [Decisions Worth Noting](#decisions-worth-noting)

---

## Key Features
1. **AI-Powered Book Listings**: Simplified the process of listing books by uploading a picture. The AI automatically extracts and generates details such as the book's title, author, genre, and price, making the listing process effortless for users.
2. **Engaging Book Recommendations on Feed**: Users can enjoy a TikTok-style feed featuring short, engaging book recommendation videos. Users can favorite the books they like directly from the feed, making it easy to discover and save interesting reads.
2. **Recommendation System**: Tailored book suggestions based on user preferences and favorited posts.
3. **Sustainability Focus**: Promotes reusability by encouraging users to exchange books instead of discarding them. This is done by showing users metrics like CO₂ saved by reusing books instead of buying new ones.
---

## Technologies Used
- **Frontend**: Vue.js for building a responsive and user-friendly interface.
- **Backend**: Express.js to manage APIs and business logic.
- **Database**: MySQL for storing user and book data efficiently.

---

## Installation

Follow these steps to set up the project locally:

### Prerequisites
- Node.js and npm installed.
- MySQL installed and running.
- Git installed.

### Steps
1. **Clone the repository**:
    ```bash
    git clone https://github.com/jerricknsc/heymax-project.git
    cd heymax-project
    ```

2. **Set up the database**:
    - Open your MySQL Workbench or preferred MySQL client.
    - Execute the `heymax.sql` script located in the root directory to initialize the database schema and populate sample data.

3. **Backend Setup**:
    ```bash
    cd backend
    npm install
    npm run dev
    ```
    The backend server should now be running on `http://localhost:8000`.

4. **Frontend Setup**:
    ```bash
    cd frontend
    npm install
    npm run dev
    ```
    The frontend application should now be accessible at `http://localhost:5173`.

---

## Project Plan and Milestones

### Phase 1: Planning (Completed)
- Deep dive in to user pain points and brainstorm potential solutions.
- Plan a detailed user flow.
- Map out and set up the required database schema.

### Phase 2: Core Functionalities (Completed)
- Create APIs for book listings, book browsing and user profiles.
- Build the frontend with basic UI for browsing and adding books.

### Phase 3: Advanced Features (Planned)
- Introduce forums and book clubs for community discussions and shared interests.
- Enable real-time chat functionality for seamless communication between users.
- Add a dedicated page to showcase upcoming events and activities.
- Implement a points-based system, where each successful exchange boosts a user's profile score.
- Develop a smart matching feature to connect users and facilitate book exchanges effortlessly.

---

## Decisions Worth Noting
1. **Tech Stack Selection**: Selected Vue.js for its reactive, component-based architecture, Express.js for a lightweight and efficient backend, and MySQL for reliable, structured relational data storage.

2. **User-Centric Design**: Focused on delivering an intuitive user experience with seamless navigation and personalized recommendations.

3. **Feature Prioritization**: Concentrated on implementing core functionalities within the limited timeframe, ensuring a solid foundation for future development.
