# Map App

An application to keep track of the places you have visited, an interactive app with a map.

# Live Demo
https://map-app-places.netlify.app/

# 🛠 Technologies

- React.js ⚛️
- React Router
- Tailwind CSS
- Redux
- Thunk

# Installation

git clone https://github.com/Giovanni-Serra-Git/clone_map_app.git

cd clone_map_app

npm install

npm run dev

# Brief API Description → What data does it provide?

An application that provides interaction with the map to mark points of interest with markers, specifically the places visited.  
You can select the city you visited, add personal reviews about the place, and a link to the Wikipedia page will be automatically generated.  
Additionally, you can also delete cities.  
It also provides a list of countries of the visited cities.


# Sample Data received

   {
      **"cityName":** "Lisbon",  
      **"country":** "Portugal",  
      **"emoji":** "pt",  
      **"date":** "2027-10-31T15:59:59.138Z",  
      **"notes":** "My favorite city so far!",  
      **"position":** {  
        "lat": 38.727881642324164,  
        "lng": -9.140900099907554  
      },  
      **"id":** "73930385"  
    },    

# Endpoints:

**GET - Get List of Cities** BASE_URL/cities  
**GET - Get specific City** BASE_URL/cities/id  

**POST - Create City** BASE_URL/cities  

**DELETE - Delete City** BASE_URL/cities/id  

# Features of the App

✔️ Fake login to access the app  :  **Username** Giovanni **Password** 12345
✔️ Viewing the cities list    
✔️ Viewing the coutries list   
✔️ Adding and removing cities from the list    
✔️ Adding feedback about the city  


# Author
Giovanni Serra







