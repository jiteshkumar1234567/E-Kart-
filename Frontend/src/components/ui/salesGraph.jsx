
// import React from "react"
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts"

// const SalesGraph = ({ data = [], title, dataKey }) => {
//   return (
//     <div className="bg-white p-5 rounded-xl shadow-sm border">
//       <h3 className="text-lg font-semibold mb-3">{title}</h3>

//       <ResponsiveContainer width="100%" height={250}>
//         <LineChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="month" />
//           <YAxis />
//           <Tooltip />
//           <Line
//             type="monotone"
//             dataKey={dataKey}
//             stroke="#ec4899"
//             strokeWidth={2}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   )
// }

// export default SalesGraph























// import React from "react";
// import {
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
// } from "recharts";

// const SalesGraph = ({ data, title, dataKey }) => {
//   const chartData =
//     data && data.length > 0
//       ? data.map((item, i) => ({
//           month: item.month ? item.month.toString() : `Month ${i + 1}`,
//           [dataKey]: Number(item[dataKey] ?? 0),
//         }))
//       : [{ month: "No Data", [dataKey]: 0 }];

//   return (
//     <div className="bg-white p-4 rounded-xl shadow-sm border">
//       <h3 className="text-lg font-semibold mb-3">{title}</h3>
//       <ResponsiveContainer width="100%" height={250}>
//         <LineChart
//           data={chartData}
//           margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="month" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Line
//             type="monotone"
//             dataKey={dataKey}
//             stroke="#ec4899"
//             strokeWidth={2}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default SalesGraph;

































// import {
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
// } from "recharts";

// const SalesGraph = ({ data, title, dataKey }) => {
//   const chartData =
//     data && data.length > 0
//       ? data.map((item, i) => ({
//           month: item.month?.toString() || `Month ${i + 1}`,
//           [dataKey]: Number(item[dataKey] ?? 0),
//         }))
//       : [{ month: "No Data", [dataKey]: 0 }];

//   return (
//     <div className="bg-white p-4 rounded-xl shadow-sm border">
//       <h3 className="text-lg font-semibold mb-3">{title}</h3>

//       <ResponsiveContainer width="100%" height={260}>
//         <LineChart data={chartData}>
//           <CartesianGrid strokeDasharray="4 4" />
//           <XAxis dataKey="month" />
//           <YAxis domain={["auto", "auto"]} />
//           <Tooltip />

//           <Line
//             type="linear"              // 🔥 ZIG-ZAG
//             dataKey={dataKey}
//             stroke="#ec4899"
//             strokeWidth={3}
//             dot={{ r: 5 }}              // 🔥 points visible
//             activeDot={{ r: 7 }}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default SalesGraph;






























import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const MONTHS = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec"
];

const SalesGraph = ({ data, title, dataKey }) => {
  // 🔥 12 months base with zero
  const baseData = MONTHS.map((m, i) => ({
    month: m,
    [dataKey]: 0,
  }));

  // 🔥 backend data merge
  data?.forEach((item) => {
    const index = Number(item.month || item._id) - 1;
    if (index >= 0 && index < 12) {
      baseData[index][dataKey] = Number(item[dataKey] || 0);
    }
  });

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>

      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={baseData}>
          <CartesianGrid strokeDasharray="4 4" />
          <XAxis dataKey="month" />
          <YAxis allowDecimals={false} />
          <Tooltip />

          <Line
            type="linear"          // zig-zag analytics style
            dataKey={dataKey}
            stroke="#ec4899"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesGraph;
