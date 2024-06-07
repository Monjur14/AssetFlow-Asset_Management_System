import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";


const RequestForAsset = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [stockStatus, setStockStatus] = useState("");
  const [assetType, setAssetType] = useState("");
  const [matched, setMatched] = useState([])
  const [popup, setPopup] = useState(false)
  const [postedBy, setPostedBy] = useState(null)
  const [productName, setProductName] = useState(null)
  const [productImage, setProductImage] = useState(null)
  const [productType, setProductType] = useState(null)
  const [id, setId] = useState(null)

  useEffect(() => {
    fetch("http://localhost:5000/assets")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [data]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleStockStatusChange = (e) => {
    setStockStatus(e.target.value);
  };

  const handleAssetTypeChange = (e) => {
    setAssetType(e.target.value);
  };


  const filteredData = data
    .filter((item) =>
      item.productName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((item) =>
      stockStatus ? item.availibility.toLowerCase() === stockStatus.toLowerCase() : true
    )
    .filter((item) =>
      assetType ? item.productType.toLowerCase() === assetType.toLowerCase() : true
    );

    const handleRequestAsset = (item) => {
      setPopup(true)
      setPostedBy(item.postedBy)
      setProductName(item.productName)
      setProductImage(item.productImage)
      setProductType(item.productType)
      setId(item._id)
    }
    const hidePopup = () => {
      setPopup(false)
    }

    // console.log(postedBy)
  return (
    <div className="w-full min-h-screen bg1 relative overflow-hidden">
      <div className="contain pt-1">
        <div className="mb-4 grid grid-cols-3 w-full gap-3 border-2 p-1 rounded-lg border-purple">
          <input
            type="text"
            placeholder="Search by product name..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-2 border rounded-md outline-none"
          />
          <select onChange={handleStockStatusChange} className="p-2 border rounded-md">
            <option value="">All Stock Status</option>
            <option value="available">Available</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
          <select onChange={handleAssetTypeChange} className="p-2 border rounded-md">
            <option value="">All Asset Types</option>
            <option value="returnable">Returnable</option>
            <option value="non-returnable">Non-Returnable</option>
          </select>
        </div>
        <div className="grid grid-cols-4 gap-7">
          {filteredData.map((item) => (
            <div className="w-full border p-3 rounded-lg shad" key={item._id}>
              <img
                src={item.productImage}
                alt=""
                className="rounded-lg h-44 w-full object-cover"
              />
              <h1 className="text-lg font-semibold mt-2 text-gray-700">
                Product Name: <span className="text-black">{item.productName}</span>
              </h1>
              <h2 className="text-lg font-semibold text-gray-700">
                Product Type: <span className="text-black">{item.productType}</span>
              </h2>
              <h2 className="text-lg font-semibold text-gray-700">
                Availability: <span className="text-black">{item.availibility}</span>
              </h2>
              <div className="mt-5 mb-2">
                <button onClick={() => handleRequestAsset(item)} className={`w-full gradient-bg2 text-md text-white py-1 rounded-md font-semibold ${item.availibility === "Out of Stock" && "grad"}`}>
                  Request for this Asset
                </button>
              </div>
            </div>
            
          ))}
        </div>
          {/* <div className={`h-96 w-96 bg-white border absolute top-40 popup ${!popup && "hidden"} p-2`}>
            <div className="flex justify-end">
              <button onClick={hidePopup}><IoMdClose  size={25}/></button>
            </div>
          </div> */}
      </div>
      <div className={`h-full w-screen bg-transparent backdrop-blur-sm absolute top-0 ${!popup && "hidden"}`}>
          <div className={`pb-5 w-96 bg-white border absolute top-40 popup rounded-md shad p-2`}>
            <div className="flex justify-end">
              <button onClick={hidePopup}><IoMdClose  size={25}/></button>
            </div>
            <textarea name="message" id="message" placeholder="Enter a short note for your HR Manager" className="p-1 w-full  border-2 border-purple/50 mt-3 rounded-md resize-none"></textarea>
            <button  className="w-full gradient-bg2 text-md text-white py-1 rounded-md font-semibold mt-2">Confirm Request</button>
          </div>
      </div>
    </div>
  )
}

export default RequestForAsset
