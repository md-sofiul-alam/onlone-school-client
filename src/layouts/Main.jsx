import { Outlet } from "react-router-dom";
import Footer from "../components/Shared/Footer";
import { Helmet } from "react-helmet-async";
import NavBar from "../Components/Shared/NavBar";

const Main = () => {
  return (
    <div className="bg-[#d5e0e0] text-black container m-auto">
      <Helmet>
        <title>EEE-SCHOOL - Home</title>
      </Helmet>
      <NavBar/>
      <Outlet />
      <Footer />
    </div>
  )
}

export default Main