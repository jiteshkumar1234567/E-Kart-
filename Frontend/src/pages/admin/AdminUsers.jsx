// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "sonner";

// const AdminUsers = () => {
//   const [admins, setAdmins] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const token = localStorage.getItem("accessToken");

//   useEffect(() => {
//     const fetchAdmins = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:8000/api/v1/admin/users",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         // Filter only admins
//         const onlyAdmins = res.data.users.filter(user => user.role === "admin");
//         setAdmins(onlyAdmins);
//       } catch {
//         toast.error("Failed to load admins");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAdmins();
//   }, []);

//   if (loading)
//     return (
//       <p className="pt-28 text-center text-gray-500">
//         Loading admins...
//       </p>
//     );

//   return (
//     <div className="pt-14 px-6 max-w-7xl mx-auto">
//       <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//         Admins
//       </h1>

//       {admins.length === 0 ? (
//         <p className="text-center text-gray-500">No admins found</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {admins.map((admin) => (
//             <div
//               key={admin._id}
//               className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center transition hover:shadow-xl"
//             >
//               <img
//                 src={admin.profileImage || "https://via.placeholder.com/100"}
//                 alt={admin.name}
//                 className="w-24 h-24 rounded-full object-cover border-2 border-pink-500 mb-4"
//               />
//               <p className="text-lg font-semibold text-gray-800">{admin.name}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminUsers;





























import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { UserMinus } from "lucide-react"; // ✅ import icon

const AdminUsers = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/admin/users",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const onlyAdmins = res.data.users.filter(user => user.role === "admin");
        setAdmins(onlyAdmins);
      } catch {
        toast.error("Failed to load admins");
      } finally {
        setLoading(false);
      }
    };
    fetchAdmins();
  }, []);

  if (loading)
    return (
      <p className="pt-28 text-center text-gray-500">Loading admins...</p>
    );

  return (
    <div className="pt-14 px-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Admins
      </h1>

      {admins.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <UserMinus className="w-20 h-20 text-gray-400 mb-4 animate-bounce" />
          <p className="text-center text-gray-500 text-lg font-medium">
            No admins found
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {admins.map((admin) => (
            <div
              key={admin._id}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center transition-transform hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={admin.profilePic || "https://via.placeholder.com/100"}
                alt={`${admin.firstName} ${admin.lastName}`}
                className="w-24 h-24 rounded-full object-cover border-2 border-pink-500 mb-4"
              />
              <p className="text-lg font-semibold text-gray-800 text-center">
                {admin.firstName} {admin.lastName}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
