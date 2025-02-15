<!-- 
    Products
    Pricing
    Login
    HomePage
    AppLayout
    ProductNotFound
    AppNav

    AppLayout ----- SideNav - Map

    Nested Route -- App --- SideBar - Maps - Form - Outlet Component


    CityList Component in Sidebar
    We need to fetch data to show it in the cities field - country field and maps field
    Hence we need a global state but we start with useState

    We use the state in the main app and pass it as props through the component
    Props --- cities and spinner -- we do our checks

    Loop over cities and show countries


    Global state 

    We click into the city -- > we pass the id city in the url - we retrieve data from the url and display the info of the city

    Fetch Cities

    Click on City 

    Send param ID to the url

    Read ID from url ----- > city/01234   

    Display info of the city

    State Id

    We create the route

    Link the route

    Display the route reading data


    Element City path city/id

    We read the id from the url and lng lat



    Map

    On the Map we need to click on it and display the form
    Programatic Navigation 
    We need to display data later on the form clickin on the map



    We pass the value through Context 

    Create Context --- Variable uppercase Create Context MyContext = Create Context(null)

    Pass the context as Provider with its value  MyContext.Provider values your values

    Read the context - UseContext(MyContext)

    We need to both visualize in the sidebar of City and in the CitiesList so we need 
    to provide a global value that returns the city

    We get the ID, getTheCity with the context
    In the context we setTheCurrentCity and pass the data in the provider


    When we click on a city and see the details, and we set the currentCity in order to display the data, we retrieve that data to read it in the cityListItems


    React Leaflet - leaflet


    Set the Map - display different Markers

    Clicking on cities should move the map to the current location

    Make it reactive with its component

    From Details when we get back with the button we need to remember the url lat and lng
    so we use useEffect in order to set that data to useState
    We retrieve it in order to keep it fixed in the map

    ChangeCenter



    Clicking on the Map give the current position of the place that was clicked

    UseMapEvent

    Use Geolocation


    Retrieve Data in the form

    useHook location

    Retrieve data and display it

    if there is an error display it


    We Improve the form

    Calendar date-picker

    We create the city when we are inserting the data, we send the data
    to the state

    Loading Spinner while post request

    Load spinner while inserting data and clicking the button


    Delete City

    Reducer must be pure functions - we cannot fetch data inside it



    Fake Authentication

    Login - IsAuthenticated

    if IsAuthenticated we redirect to the main page - we check it with useEffect


    If the user is not authenticate we redirect it 


 -->