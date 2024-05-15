import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AdminLogin from "./pages/AdminLogin";
import { SuperLogin } from "./pages/SuperLogin";
import AdminLayout from "./layout/AdminLayout";
import AddHotel from "./pages/AddHotel";
import AdminHotels from "./pages/AdminHotels";
import { EditHotel } from "./pages/EditHotel";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <p>Home Page</p>
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <p>Search Page</p>
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />
        <Route
          path="/admin-login"
          element={
            <Layout>
              <AdminLogin />
            </Layout>
          }
        />
        <Route
          path="/admin-home"
          element={
            <AdminLayout>
              <p>admin home page</p>
            </AdminLayout>
          }
        ></Route>
        <Route
          path="/go-hotel"
          element={<AdminLayout>{<AddHotel />}</AdminLayout>}
        ></Route>
        <Route
          path="/add-hotel"
          element={<AdminLayout>{<AddHotel />}</AdminLayout>}
        ></Route>
        <Route
          path="/adminHotelList"
          element={<AdminLayout>{<AdminHotels />}</AdminLayout>}
        ></Route>

        <Route
          path="/edit-hotel/:hotelId"
          element={<AdminLayout>{<EditHotel />}</AdminLayout>}
        ></Route>
        <Route
          path="/user"
          element={
            <AdminLayout>
              <p>go to hotel list</p>
            </AdminLayout>
          }
        ></Route>

        <Route
          path="/super-admin-login"
          element={
            <Layout>
              <SuperLogin />
            </Layout>
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
