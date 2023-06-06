# Framework_PHP_OOP_MVC
My second project done in 1st year of the DAW cycle
# Features
|Module|Description|
|-------|---------|
|Home	|The home page is the main page where there is a carousel of car brands, product platforms from different car categories, a 	     carousel featuring the most visited cars, and books related to cars.|
|Shop|The Shop displays a general listing of all cars paginated across multiple pages and sorted from most visited to least visited. There is also a map that geolocates the cars. From either the map or the car listing, users can access the details of a specific car.Within the car details, there is another map displaying the car's geolocation. A carousel of car images is also included. There is a related section showing cars that are related based on their engine type. From the car details, a logged-in user can like a car or add it to their cart. If the user is not logged in, they will be redirected to the login page to authenticate, and then brought back to the liked car.On the Shop's main page, cars can be filtered by fuel type, car type, and car model. There is also a search function where users can search for a car by brand, type, and city. Users can also like a car or add it to their cart if they are logged in. If not logged in, they will be redirected to the login page to authenticate or register, and then brought to the car details view of the liked car.|
|Login|In the Login module, a customer can register if they don't have an account yet or log in if they already have one. Additionally, they can log in using a Google or GitHub account. A customer can also recover their password by entering their email address. When a customer registers, they receive a validation email, and each time the customer wants to recover their password, an email is sent to them to access the password change view.|
|Search|This module is implemented in the menu, and can be used throughout the application, 2 filters for category and type of fuel and a location autocomplete, clicking the search button will take you directly to the shop with those filters applied|
|cart|In the cart module, the cars that the customer adds to the cart are stored. The functions that can be performed in the cart are deleting a car from the list, increasing the quantity of cars if stock control allows it, and checking out a particular car.|
# Technologies
  - Frontend
	-  JS
	-   JQuery
- Backend
	- PHP
- Database
	- MySQL
# APIs
- [Google Books API](https://developers.google.com/books?hl=es-419)
- [Map Box API](https://docs.mapbox.com/mapbox.js/api/v3.3.1/)
# Other technologies
- [Boostrap](https://getbootstrap.com/)
- [slick carrusel](https://kenwheeler.github.io/slick/)
