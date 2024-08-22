import { useEffect, useState } from "react";
import AboutUs from "./AboutUs";
import HeroSection from "./HeroSection";
import Pricing from "./Pricing";
import UseAuth from "../CustomHook/UseAuth";
import AdminHomePage from "./AdminHomePage";
import EmployeeHomePage from "./EmployeeHomePage";
import { Helmet } from "react-helmet-async";


const Home = () => {
  const [data, setData] = useState([])
  const {logout, user} = UseAuth()
  useEffect(() => {
    fetch("https://assetflow-server-side.vercel.app/users")
    .then((res) => res.json())
    .then((data) => {
      setData(data)
    })
    .catch((error) => {
      console.error("Error fetching roles:", error);
    });
  }, [user])
console.log(data)
const filterData = data?.filter((item) => item?.email === user?.email)
const roles = filterData?.[0]?.role
console.log(roles)
  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      {
        roles === undefined && 
        <div>
          <HeroSection/>
          <AboutUs/>
          <Pricing/>
        </div>
      }
      {
        roles === "Admin"  && 
        <div>
          <AdminHomePage/>
        </div>
      }
      {
        roles === "Employee"  && 
        <div>
          <EmployeeHomePage/>
        </div>
      }
    </div>
  );
};

export default Home;
