import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LINK_API } from '../constant';

const User = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    id: '',
    username: '',
    name: '',
    date_create: '',
    phone: '',
    numberWeek: '',
    id_freedomRes: 0
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${LINK_API}/users`);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once after the initial render

  const handleDelete = async (userId) => {
    try {
      // Send the DELETE request to the server
      const response = await fetch(`${LINK_API}/users/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Delete the user from the state locally
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));

        alert('User deleted successfully');
      } else {
        console.error(`Failed to delete user with ID ${userId}`);
        // If the deletion on the server fails, you might want to display an error message
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <div className="text-gray-900 bg-gray-200">
        <div className="p-4 flex">
        </div>
        <div class="max-w-2xl mx-auto">

          <div>
            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
            <div class="relative">
              <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input
                type="search"
                id="default-search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block p-4 pl-10 w-full 
    text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 
    focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 
    dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search by Username, Date, or Phone..." // Adjusted placeholder text
                required
              />
              <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
            </div>
          </div>
        </div>
        <div className="px-3 py-4 flex justify-center">
          <table className="w-full text-md bg-white shadow-md rounded mb-4">
            <tbody>
              <tr className="border-b">
                <th className="text-left p-2 px-3">Tên đăng nhập</th>
                <th className="text-left p-2 px-3">Email</th>
                <th className="text-left p-2 px-3">Ngày đăng ký</th>
                <th className="text-left p-2 px-3">Role</th>
                {/* Add other table headers based on your API response */}
                <th></th>
              </tr>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-orange-100">
                  <td className="p-2 px-3">
                    {user.name}
                  </td>
                  <td className="p-2 px-3">
                  {user.email}
                  </td>
                  <td className="p-2 px-3">
                  {user.createdAt}
                  </td>
                  <td className="p-2 px-3">
                  {
                    user.isAdmin ? (
                      <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-3.5 py-1.5 rounded-full dark:bg-green-900 dark:text-green-300">ADMIN</span>
                    ): (
                      <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-3.5 py-1.5 rounded-full dark:bg-green-900 dark:text-green-300">Người dùng</span>
                    )
                  }
                  </td>
            
                  {/* Add other table cells based on your API response */}
                  <td className="p-2 px-3 flex justify-end">
                    <button
                      type="button"
                      onClick={() => navigate(`/admin/edit-user/${user._id}`)}
                      className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(user._id)}
                      className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default User;
