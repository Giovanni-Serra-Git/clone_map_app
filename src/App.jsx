/* eslint-disable no-unused-vars */
// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
// import "leaflet/dist/leaflet.css"

import { BrowserRouter, Navigate, Route, Routes } from "react-router"
import Home from "../pages/Home"
import Product from "../pages/Product"
import Pricing from "../pages/Pricing"
import Login from "../pages/Login"
import Form from "../pages/Form"
import PageNotFound from "../pages/PageNotFound"
import AppLayout from "../components/AppLayout"
import Cities from "../components/Cities"
import CityDetail from "../components/CityDetail"
import Countries from "../components/Countries"
import ProtectedRoute from "../components/ProtectedRoute"

import { CitiesProvider } from "../context/CitiesContext"
import { useContext } from "react"
import { LoginContextProvider } from "../context/LoginContextProvider"
import { Provider } from "react-redux"
import store from "../store/store.js"


function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
      <Routes>
        <Route index element={<Home /> } />
        <Route path="product" element={<Product /> } />
        <Route path="pricing" element={<Pricing /> } />
        <Route path="login" element={<Login /> } />
        <Route path="app" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route index element={<Navigate replace to="cities" />} />
          <Route path="cities" element={<Cities />} />
          <Route path="cities/:id" element={<CityDetail  />} />
          <Route path="countries" element={<Countries />} />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="*" element={<PageNotFound /> } />
      </Routes>

    </BrowserRouter>
    </Provider>
  )
}

export default App
