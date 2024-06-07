import { useQuery } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import UseAuth from "../CustomHook/UseAuth";
import { useEffect, useState } from "react";

const AddEmployee = () => {
  const { user } = UseAuth()
  const [data, setData] = useState([])
  // const { data } = useQuery({
  //   queryKey: ["addEmloyeeUser"],
  //   queryFn: () =>
  //     fetch("http://localhost:5000/users").then((res) => res.json()),
  // });
  const mainData = data?.filter((item) => item?.affiliateWith === "")
  const adminData = data?.filter((item) => item?.email === user?.email)
  const teamData = data?.filter((item) => item?.affiliateWith === adminData[0]?.companyName)

  useEffect(() => {
    fetch("http://localhost:5000/users")
    .then((res) => res.json())
    .then((data) => {
      setData(data)
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, [data]);

  const employee = data?.filter((item) => item?.email === user?.email)
  const company = employee[0]?.companyName

  const handleAddEmployee = (id) => {
    if(teamData?.length === parseInt(adminData[0]?.packages)){
        toast.error("You have reached your maximum members limit")
        return
      }
    const updatedItem = {
      affiliateWith: company
    }

    fetch(`http://localhost:5000/users/${id}`, {
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

//  useEffect(() => {
//     if(mainData?.length < parseInt(adminData[0]?.packages)){
//       toast.error("You have reached your maximum members limit")
//     }
//   }, [mainData])
  return (
    <div className="w-full min-h-screen bg1">
      <div className="contain">
        <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
          <div className="overflow-x-auto">
              <div className="border-2 border-purple pr-1 px-2 py-1 rounded-md mb-5 flex justify-between items-center">
                <h1 className="font-semibold">Your Team Members: {teamData.length}/{adminData[0]?.packages}</h1>
                <button className="px-5 py-1 gradient-bg2 font-semibold rounded-md text-white">Increase Your Members Limit</button>
              </div>
            <table className="min-w-full text-sm">
              <colgroup>
                <col />
                <col />
                <col />
                <col />
              </colgroup>
              <thead className="dark:bg-gray-300">
                <tr className="text-left">
                  <th className="p-3">Image</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3 text-right">Add to the Team</th>
                </tr>
              </thead>
              <tbody>
                {mainData?.map((item) => (
                  <tr key={item._id} className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                  <td className="p-3">
                    <img src={item.employeePhoto || "https://i.ibb.co/3prgXcC/userImg.jpg"} alt="" className="w-10 h-10 border rounded-md"/>
                  </td>
                  <td className="p-3">
                    <p>{item.name}</p>
                  </td>
                  <td className="p-3">
                    <p>{item.email}</p>
                  </td>
                  <td className="p-3 text-right">
                    <button onClick={() => handleAddEmployee(item._id)} className="px-8 py-1 gradient-bg2 text-white text-base font-semibold rounded-md">Add</button>
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
  );
};

export default AddEmployee;
