import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import UseAuth from "../CustomHook/UseAuth";
import { ToastContainer, toast } from "react-toastify";

const AllRequests = () => {
  const {user} = UseAuth()

  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [matched, setMatched] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/requests")
      .then((res) => res.json())
      .then((data) => {
        setData(data.filter((item) => item.postedBy === user.email && item.status === "Pending"));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [data]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = data
    .filter((item) =>
      item?.requesterName?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
    item?.requesterEmail?.toLowerCase().includes(searchQuery?.toLowerCase())
    )

    const handleRequestDelete = (id) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Reject it!"
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`http://localhost:5000/requests/${id}`, {
            method: "DELETE",
          })
          .then(res => res.json())
          .then(data => {
            console.log(data)
            if (data.deletedCount > 0) {
              // Remove the deleted item from matched state
              const updatedMatched = matched.filter(item => item._id !== id);
              setMatched(updatedMatched);
              // Show success message
              Swal.fire({
                title: "Rejected!",
                text: "You succesfully rejected this request",
                icon: "success"
              });
            }
          })
          .catch(error => {
            console.error("Error deleting item:", error);
            // Show error message
            Swal.fire({
              title: "Error",
              text: "Failed to reject. Please try again later.",
              icon: "error"
            });
          });
        }
      });
    }

    const handleApproveRequest = (id, id2) => {

      const today = new Date();
      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const year = today.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;
      const updatedRequest = {
        status: "Approved",
        approvalDate: formattedDate
      }
  
      fetch(`http://localhost:5000/requests/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedRequest) 
    })
    .then(res => res.json())
    .then(data => {
        if (data.modifiedCount > 0) {
            toast.success("Successfully Approved");
        } else {
            toast.error("Already Approved")
        }
    })
    .catch(error => console.error("Error updating Asset:", error));

    fetch(`http://localhost:5000/assets/decrement/${id2}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json"
      },
  })
  .then(res => res.json())
  .then(data => {
     
  })
  .catch(error => console.error("Error updating Asset:", error)); 
    }



  return (
    <div className="w-full min-h-screen bg1">
      <div className="contain pt-1 pb-10">
        <div className="mb-4 grid grid-cols-1 w-full gap-3 border-2 p-1 rounded-lg border-purple">
          <input
            type="text"
            placeholder="Search by product name..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-2 border rounded-md outline-none"
          />
        </div>
        <div className="grid grid-cols-4 gap-7">
          {filteredData.map((item) => (
            <div className="w-full border p-3 rounded-lg shad" key={item._id}>
              <img
                src={item.productImage}
                alt=""
                className="rounded-lg h-44 w-full object-cover"
              />
              <h1 className="text-base font-semibold mt-2 text-gray-700">
                Product Name: <span className="text-black">{item.productName}</span>
              </h1>
              <h2 className="text-base font-semibold text-gray-700">
                Product Type: <span className="text-black">{item.productType}</span>
              </h2>
              <h1 className="text-base font-semibold text-gray-700">
                Requester Name: <span className="text-black">{item.requesterName}</span>
              </h1>
              <h1 className="text-base font-semibold text-gray-700">
                Requester Email: <span className="text-black">{item.requesterEmail}</span>
              </h1>
              <h2 className="text-base font-semibold text-gray-700">
                Request Date: <span className="text-black">{item.requestedDate}</span>
              </h2>
              <h2 className="text-base font-semibold text-gray-700 h-20 mt-2">
                Additional Note: <span className="text-black text-sm">{item.message}</span>
              </h2>
              <h2 className="text-base font-semibold text-gray-700">
                Status: <span className="text-black">{item.status}</span>
              </h2>             
              <div className="flex justify-center gap-5 mt-5 mb-2">
                <button onClick={() => handleApproveRequest(item._id, item.productId)} className="w-full bg-cyan-500 text-md text-white py-1 rounded-md font-semibold">
                  Approve
                </button>
                <button onClick={() => handleRequestDelete(item._id)} className="w-full bg-red-500 text-md text-white py-1 rounded-md font-semibold">
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default AllRequests
