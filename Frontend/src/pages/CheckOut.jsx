// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";

// const Checkout = () => {
//   const navigate = useNavigate();
//   const { cart } = useSelector((store) => store.product);
//   const cartItems = cart?.items || [];

//   const [savedAddresses, setSavedAddresses] = useState([]);
//   const [selectedIndex, setSelectedIndex] = useState(null);

//   const [address, setAddress] = useState({
//     fullName: "",
//     phone: "",
//     street: "",
//     city: "",
//     state: "",
//     pincode: "",
//   });

//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem("savedAddresses")) || [];
//     setSavedAddresses(stored);
//   }, []);

//   const handleChange = (e) => {
//     setAddress({ ...address, [e.target.name]: e.target.value });
//   };

//   const total = cartItems.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   const saveAddress = () => {
//     if (Object.values(address).some((v) => !v)) {
//       toast.error("Fill all address fields");
//       return;
//     }

//     const updated = [...savedAddresses, address];
//     setSavedAddresses(updated);
//     localStorage.setItem("savedAddresses", JSON.stringify(updated));
//     setAddress({
//       fullName: "",
//       phone: "",
//       street: "",
//       city: "",
//       state: "",
//       pincode: "",
//     });
//     toast.success("Address saved");
//   };

//   const handleProceed = () => {
//     if (selectedIndex === null) {
//       toast.error("Select an address");
//       return;
//     }

//     localStorage.setItem(
//       "checkoutAddress",
//       JSON.stringify(savedAddresses[selectedIndex])
//     );
//     navigate("/Processorder");
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-2 gap-10">
//       {/* LEFT */}
//       <div className="space-y-8">
//         {/* SAVED ADDRESS */}
//         <div className="bg-white rounded-2xl shadow p-6">
//           <h2 className="text-xl font-semibold mb-4">Saved Addresses</h2>

//           {savedAddresses.length === 0 && (
//             <p className="text-gray-500 text-sm">No saved addresses</p>
//           )}

//           {savedAddresses.map((addr, i) => (
//             <label
//               key={i}
//               className={`flex items-start gap-3 p-4 border rounded-xl mb-3 cursor-pointer ${
//                 selectedIndex === i ? "border-black bg-gray-50" : ""
//               }`}
//             >
//               <input
//                 type="radio"
//                 checked={selectedIndex === i}
//                 onChange={() => setSelectedIndex(i)}
//                 className="mt-1"
//               />
//               <div className="text-sm">
//                 <p className="font-medium">{addr.fullName}</p>
//                 <p className="text-gray-600">
//                   {addr.street}, {addr.city}, {addr.state} - {addr.pincode}
//                 </p>
//                 <p className="text-gray-600">📞 {addr.phone}</p>
//               </div>
//             </label>
//           ))}
//         </div>

//         {/* ADD NEW ADDRESS */}
//         <div className="bg-white rounded-2xl shadow p-6">
//           <h2 className="text-xl font-semibold mb-6">Add New Address</h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {Object.keys(address).map((key) => (
//               <div key={key} className="flex flex-col gap-1">
//                 <label className="text-sm font-medium capitalize">
//                   {key.replace(/([A-Z])/g, " $1")}
//                 </label>
//                 <input
//                   name={key}
//                   value={address[key]}
//                   onChange={handleChange}
//                   className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
//                   placeholder={`Enter ${key}`}
//                 />
//               </div>
//             ))}
//           </div>

//           <button
//             onClick={saveAddress}
//             className="mt-6 bg-black text-white px-6 py-3 rounded-lg hover:opacity-90"
//           >
//             Save Address
//           </button>
//         </div>
//       </div>

//       {/* RIGHT */}
//       <div className="bg-white rounded-2xl shadow p-6 h-fit sticky top-28">
//         <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

//         {cartItems.map((item, i) => (
//           <div key={i} className="flex justify-between text-sm mb-3">
//             <p>
//               {item.productId.productName} × {item.quantity}
//             </p>
//             <p>₹{item.price * item.quantity}</p>
//           </div>
//         ))}

//         <hr className="my-4" />

//         <div className="flex justify-between text-lg font-bold mb-6">
//           <p>Total</p>
//           <p>₹{total}</p>
//         </div>

//         <button
//           onClick={handleProceed}
//           className="w-full bg-black text-white py-3 rounded-lg text-lg"
//         >
//           Place Order
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Checkout;




















































import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart } = useSelector((store) => store.product);
  const cartItems = cart?.items || [];

  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("savedAddresses")) || [];
    setSavedAddresses(stored);  
  }, []);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const saveAddress = () => {
    if (Object.values(address).some((v) => !v)) {
      toast.error("Fill all address fields");
      return;
    }

    const updated = [...savedAddresses, address];
    setSavedAddresses(updated);
    localStorage.setItem("savedAddresses", JSON.stringify(updated));
    setAddress({
      fullName: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      pincode: "",
    });
    toast.success("Address saved");
  };

  const handleProceed = () => {
    if (selectedIndex === null) {
      toast.error("Select an address");
      return;
    }

    localStorage.setItem(
      "checkoutAddress",
      JSON.stringify(savedAddresses[selectedIndex])
    );
    navigate("/processorder");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-2 gap-10">
      {/* LEFT */}
      <div className="space-y-8">
        {/* SAVED ADDRESS */}
        <div className="bg-white rounded-2xl shadow p-6 mt-15">
          <h2 className="text-xl font-semibold mb-4">Saved Addresses</h2>

          {savedAddresses.length === 0 && (
            <p className="text-gray-500 text-sm">No saved addresses</p>
          )}

          {savedAddresses.map((addr, i) => (
            <label
              key={i}
              className={`flex items-start gap-3 p-4 border rounded-xl mb-3 cursor-pointer ${
                selectedIndex === i ? "border-black bg-gray-50" : ""
              }`}
            >
              <input
                type="radio"
                checked={selectedIndex === i}
                onChange={() => setSelectedIndex(i)}
                className="mt-1"
              />
              <div className="text-sm">
                <p className="font-medium">{addr.fullName}</p>
                <p className="text-gray-600">
                  {addr.street}, {addr.city}, {addr.state} - {addr.pincode}
                </p>
                <p className="text-gray-600">📞 {addr.phone}</p>
              </div>
            </label>
          ))}
        </div>

        {/* ADD NEW ADDRESS */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-6">Add New Address</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(address).map((key) => (
              <div key={key} className="flex flex-col gap-1">
                <label className="text-sm font-medium capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  name={key}
                  value={address[key]}
                  onChange={handleChange}
                  className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder={`Enter ${key}`}
                />
              </div>
            ))}
          </div>

          <button
            onClick={saveAddress}
            className="mt-6 bg-black text-white px-6 py-3 rounded-lg hover:opacity-90"
          >
            Save Address
          </button>
        </div>
      </div>

      {/* RIGHT */}
      <div className="bg-white rounded-2xl shadow p-6 h-fit sticky top-28">
        <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

        {cartItems.length === 0 && (
          <p className="text-gray-500 text-sm">Cart is empty</p>
        )}

        {cartItems.map((item, i) => {
          const product =
            item.product || item.productId || null;

          if (!product) {
            return (
              <div
                key={i}
                className="flex justify-between text-sm mb-3 text-red-500"
              >
                <p>Product removed</p>
                <p>₹0</p>
              </div>
            );
          }

          return (
            <div key={i} className="flex justify-between text-sm mb-3">
              <p>
                {product.productName} × {item.quantity}
              </p>
              <p>₹{item.price * item.quantity}</p>
            </div>
          );
        })}

        <hr className="my-4" />

        <div className="flex justify-between text-lg font-bold mb-6">
          <p>Total</p>
          <p>₹{total}</p>
        </div>

        <button
          onClick={handleProceed}
          className="w-full bg-black text-white py-3 rounded-lg text-lg"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
