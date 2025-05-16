import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = ({ token }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/allUsers", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data.users);
      } catch (err) {
        alert("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">All Users</h1>

        {loading ? (
          <div className="text-center text-gray-500">Loading users...</div>
        ) : users.length === 0 ? (
          <div className="text-center text-gray-500">No users found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-md overflow-hidden">
              <thead className="bg-blue-100 text-blue-700">
                <tr>
                  <th className="py-3 px-4 text-left border-b">Name</th>
                  <th className="py-3 px-4 text-left border-b">Email</th>
                  <th className="py-3 px-4 text-left border-b">DOB</th>
                  <th className="py-3 px-4 text-left border-b">Password</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr
                    key={user._id}
                    className={idx % 2 === 0 ? "bg-gray-50" : "bg-white hover:bg-blue-50"}
                  >
                    <td className="py-2 px-4 border-b">{user.fullname}</td>
                    <td className="py-2 px-4 border-b">{user.email}</td>
                    <td className="py-2 px-4 border-b">
                      {new Date(user.dob).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 border-b">{user.password}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
