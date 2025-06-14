# Filmnest - A Cinematic Resource and Film Recommendation System

![Film Nest Banner](https://i.ibb.co/1Q0r4b2/film-banner.jpg)

Film Nest is a cutting-edge cinematic resource and film recommendation platform designed to provide users with personalized movie suggestions, detailed information on films, and an engaging user experience. Built using React, Tailwind CSS, Redux, and integrated with Gemini and TMDB APIs, this application is perfect for film enthusiasts and showcases advanced web development practices. Authentication is powered by Firebase for a secure and seamless login experience.

## Features

- **Personalized Film Recommendations**: Recommends movies based on user preferences and past interactions.
- **AI-Powered Search**: Advanced search capabilities powered by Gemini API for intuitive and accurate results.
- **Interactive User Interface**: Built using React for a seamless and engaging user experience.
- **Responsive Design**: Designed with Tailwind CSS to ensure compatibility across all devices.
- **State Management**: Efficiently manages app state with Redux for better performance and structure.
- **Detailed Film Information**: Fetches data from TMDB and Gemini APIs to provide rich and comprehensive movie details.
- **User Authentication**: Secure login and registration functionality powered by Firebase.
- **Persistent User Preferences**: Favorites and custom lists are stored in Firebase Firestore for cross-device synchronization.
- **Comprehensive Media Support**: Full support for both movies and TV shows in favorites, lists, and recommendations.
- **Custom Lists**: Create and manage custom lists to organize your favorite movies and TV shows.
- **Smart Recommendations**: Get personalized recommendations based on your favorites and custom lists.

## Technologies Used

- **React.js**: For building the user interface.
- **Tailwind CSS**: For easy and responsive styling.
- **Redux**: For managing application state.
- **TMDB API (The Movie Database API)**: A powerful API providing access to a vast collection of movie, TV show, and actor information, including ratings, genres, and trailers.
- **Gemini API**: An AI-powered platform enabling advanced search functionality and personalized movie recommendations based on user preferences.
- **Firebase Authentication**: For secure user login and signup, ensuring data protection and smooth user management.
- **Firebase Firestore**: For persistent storage of user preferences, favorites, and custom lists.

## Recent Updates

### Persistent Storage
- Implemented Firebase Firestore for storing user preferences
- Favorites and custom lists now persist across sessions and devices
- Real-time synchronization of user data

### TV Show Integration
- Added full support for TV shows in favorites and lists
- Fixed media type handling for TV shows
- Improved display of TV show information in lists and favorites

### User Experience Improvements
- Enhanced mobile menu with better navigation
- Improved helper text for AI search functionality
- Optimized logo loading and performance
- Better error handling and loading states

## Demo

[Link to Demo Video](https://youtu.be/oVU_U6-PJVk)

## Installation and Setup

Follow these steps to get the project running locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sankaraxi/filmnest-gpt.git
   cd filmnest-gpt

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Firebase**:
- Create a Firebase project and enable authentication and Firestore.
- Add your Firebase configuration in a .env file:

     ```bash
     REACT_APP_FIREBASE=<your-api-key>
    ```
4. **Configure Gemini**:
- Generate Gemini Key from https://ai.google.dev/ for your project.
- Add your Gemini configuration in a .env file:

    ```  bash
    REACT_APP_GEMINI_API=<your-api-key>
    ```
5. **Start the development server**:

   ```bash
   npm start
   ```

    Navigate to `http://localhost:3000` in your web browser to view the app.

## Deployment

This project is configured for deployment on platforms like:

* **Vercel:** Configuration is available in `vercel.json`.

Refer to the respective platform's documentation for deployment steps.

## Screenshots
**BrowsePage**
![Browse Page Screenshot](https://i.ibb.co/fMbcrhv/Screenshot-101.png)
**Gemini Search Page**
![Menu Page Screenshot](https://i.ibb.co/rwH1V0V/Screenshot-102.png)
**Movie Details Page**
![Cart Page Screenshot](https://i.ibb.co/LxvcLBH/Screenshot-103.png)

## Future Enhancements
- Advanced filtering options for genres, release years, and ratings.
- Enhanced recommendation algorithms using machine learning.
- User profiles to track watchlists and viewing history.
- Social sharing features to recommend films to friends.
- Offline support for favorites and lists.
- Enhanced TV show details and episode tracking.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please fork the repository and create a pull request with your changes.

## Contact

For any questions or feedback, please reach out at [sankargnanasekar.k@gmail.com](mailto:sankargnanasekar.k@gmail.com) or connect with me on [LinkedIn](https://www.linkedin.com/in/sankargnanasekar/).

**Enjoy coding and happy contributing!**
