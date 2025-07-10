# Farmers Market Finder Web App

## 📍 Discover Fresh & Local Markets Near You!

Welcome to the Farmers Market Finder, your go-to web application for locating and exploring local farmers markets. Whether you're searching for fresh produce, artisanal goods, or unique local vendors, this app makes it easy to connect with your community's agricultural heart.

## ✨ Features

* **Market Discovery:** Easily find farmers markets in your vicinity or search for them by location.

* **Detailed Market Information:** View essential details for each market, including operating hours, address, and a brief description.

* **Get Directions:** Seamlessly get directions to your chosen market via integrated mapping services.

* **Vendor Listings:** Explore a comprehensive list of vendors present at each market.

* **Vendor Location (Coming Soon):** Future enhancements may include the ability to locate specific vendors within a market layout.

* **User-Friendly Interface:** An intuitive and responsive design ensures a smooth experience on any device.

## 🚀 Technologies Used

This project leverages a modern web stack to deliver a robust and interactive user experience.

* **Frontend:**

    * HTML5

    * CSS3 (with PostCSS for styling)

    * JavaScript (ES6+)

    * Next.js (for building dynamic user interfaces)

    * Mantine (for UI Components)

* **Mapping & Location Services:**

    * Google Maps API

    * Geolocation API (for "near me" functionality)

* **Backend (if applicable):**

    * Node.js / Express.js (for API endpoints)

    * PostgreSQL (for database storage of market and vendor data)

    * Containerization (eg: Docker) for API Deployment

* **Deployment:**

    * Vercel Deployment https://dirtroaddirectory.vercel.app/

## 🛠️ Installation

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js (LTS version recommended)

* npm or Yarn

* Docker (for local backend via container)

### Steps

1.  **Clone the repository:**

    ```
    git clone https://github.com/CrusaderJohnny/dirtroaddirectory.git
    cd dirtroaddirectory

    ```

2.  **Install dependencies:**

    ```
    npm install
    # or
    yarn install

    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root directory and add your API keys.

    ```
    CLERK_API_KEYS
    GOOGLE_MAPS_API_KEYS
    CLOUDINARY_API_KEYS
    ```

4.  **Run the application:**

    ```
    npm run dev
    # or
    yarn dev

    ```

    The app should now be running on `http://localhost:3000` (or another port if 3000 is occupied).

    #### If running the backend locally: ####
    Refer to the backend repository/documentation for instructions on how to build and run the PostgreSQL database and API container.

    Located at https://github.com/MacelroyDev/dirt_roadAPI

## 💡 Usage

* Upon launching the application, you will see a home landing page with articles fetched from the api.

* **Search:** Click on Markets, Enter a market name in the search bar or select a region from the dropdown to find markets.

* **Market Details:** Click on a market pin on the map or a market listing to view its details, including address, hours, and a list of vendors.

* **Directions:** Use the "Get Directions" button to open your preferred mapping application with directions pre-filled.

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks!

1.  Fork the Project

2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)

3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)

4.  Push to the Branch (`git push origin feature/AmazingFeature`)

5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

Dirt Road Directory - mark.leonardis@edu.sait.ca

Project Link: <https://github.com/CrusaderJohnny/dirtroaddirectory>
