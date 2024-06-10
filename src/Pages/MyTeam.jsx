import { ToastContainer, toast } from "react-toastify";
import UseAuth from "../CustomHook/UseAuth";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
const MyTeam = () => {
  const { user } = UseAuth()
  const [data, setData] = useState([])
  const [team, setTeam] = useState([])
  // const { data } = useQuery({
  //   queryKey: ["addEmloyeeUser"],
  //   queryFn: () =>
  //     fetch("https://assetflow-server.vercel.app/users").then((res) => res.json()),
  // });
  useEffect(() => {
    fetch("https://assetflow-server.vercel.app/users")
    .then((res) => res.json())
    .then((data) => {
      setData(data)
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, [data]);

  const handleAddEmployee = (id) => {
    if(mainData?.length - 1 < parseInt(adminData[0]?.packages)){
        toast.error("You have reached your maximum members limit")
        return
      }
    const updatedItem = {
      affiliateWith: user.email
    }

    fetch(`https://assetflow-server.vercel.app/users/${id}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedItem) 
  })
  .then(res => res.json())
  .then(data => {
      if (data.modifiedCount > 0) {
          toast.success("Successfully Added to Your Team");
      } else {
          toast.error("Already Added to Your Team")
      }
  })
  .catch(error => console.error("Error updating item:", error));

  }
  const employee = data?.filter((item) => item?.email === user?.email)
  const affiliateWith = employee[0]?.affiliateWith
  useEffect(() => {
    if(affiliateWith === ""){
      return
    }else{
      const team = data?.filter((item) => item?.affiliateWith === affiliateWith)
      setTeam(team)
    }
  }, [employee])

  // const teamData = data?.filter((item) => item?.affiliateWith === user?.email)
  // const adminData = data?.filter((item) => item?.email === user?.email)
//  useEffect(() => {
//     if(mainData?.length < parseInt(adminData[0]?.packages)){
//       toast.error("You have reached your maximum members limit")
//     }
//   }, [mainData])
  return (
    <div className="w-full min-h-screen bg1">
      <Helmet>
        <title>My Team</title>
      </Helmet>
    <div className="contain">
      <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
        <div className="overflow-x-auto">
            {/* <div className="border-2 border-purple pr-1 px-2 py-1 rounded-md mb-5 flex justify-between items-center">
              <h1 className="font-semibold">Your Team Members: {teamData.length}/{adminData[0]?.packages}</h1>
              <button className="px-5 py-1 gradient-bg2 font-semibold rounded-md text-white">Increase Your Members Limit</button>
            </div> */}
          <table className="min-w-full text-sm">
            <colgroup>
              <col className=""/>
              <col className="hidden md:inline-block"/>
              <col />
              <col />
            </colgroup>
            <thead className="dark:bg-gray-300">
              <tr className="text-left">
                <th className="p-3 ">Image</th>
                <th className="p-3 ">Name</th>
                <th className="p-3 hidden md:inline-block">Email</th>
                <th className="p-3 text-right">Role</th>
              </tr>
            </thead>
            <tbody>
              {team?.map((item) => (
                <tr key={item._id} className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                <td className="p-3">
                  <img src={item.employeePhoto || "https://i.ibb.co/3prgXcC/userImg.jpg"} alt="" className="w-10 h-10 border rounded-md"/>
                </td>
                <td className="p-3">
                  <p>{item.name}</p>
                </td>
                <td className="p-3 hidden md:inline-block">
                  <p>{item.email}</p>
                </td>
                <td className="p-3 text-right">
                  <p>{item.role}</p>
                </td>
                
              </tr>
              ))}
              {/* <tr className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                <td className="p-3">
                  <p>97412378923</p>
                </td>
                <td className="p-3">
                  <p>Microsoft Corporation</p>
                </td>
                <td className="p-3">
                  <p>14 Jan 2022</p>

                </td>
                <td className="p-3">
                  <p>14 Jan 2022</p>

                </td>
                <td className="p-3 text-center">
                  <p>01 Feb 2022</p>
                </td>
                
              </tr> */}  
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <ToastContainer/>
  </div>
  )
}

export default MyTeam
