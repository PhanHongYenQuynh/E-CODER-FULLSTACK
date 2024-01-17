import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LINK_API } from '../../constant';


const ListChapter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [course, setCourse] = useState([]);
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
        const response = await fetch(`${LINK_API}/course/list-chapter`);
        const data = await response.json();
        setCourse(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once after the initial render

  const handleDelete = async (courseId) => {
    try {
      // Send the DELETE request to the server
      const response = await fetch(`${LINK_API}/course/chapter/${courseId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'isAdmin' : true
          // Add any other headers if needed (e.g., Authorization)
        },
      });

      if (response.ok) {
        // Delete the user from the state locally
        setCourse((prev) => prev.filter((course) => course._id !== courseId));

        alert('Course deleted successfully');
      } else {
        console.error(`Failed to delete user with ID ${courseId}`);
        // If the deletion on the server fails, you might want to display an error message
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const filterCourse = course?.filter((c) =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log(course);

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
        <button type="button" onClick={()=> navigate('/admin/add-chapter',{replace: true})} className="ml-3 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Create</button>
        <div className="px-3 py-4 flex justify-center">

        <table className="w-full text-md bg-white shadow-md rounded mb-4 overflow-x-scroll">
            <tbody>
              <tr className="border-b">
                <th className="text-left p-2 px-3">Id Chapter</th>
                <th className="text-left p-2 px-3">Title</th>
                <th className="text-left p-2 px-3">Heading</th>
                <th className="text-left p-2 px-3">CreatedAt</th>
                <th className="text-left p-2 px-3">Action</th>

                {/* Add other table headers based on your API response */}
                <th></th>
              </tr>
              {filterCourse?.map((item, index) => (
                <tr key={item._id} className="border-b hover:bg-orange-100">
                    <td className="p-2 px-3">
                    {index+1}
                  </td>
                  <td className="p-2 px-3">
                    {item.title}
                  </td>
                  <td className="p-2 px-3">
                    {item?.content?.map((item)=>(
                       <span className="bg-green-100 m-2 text-green-800 text-xs font-medium me-2 px-3.5 py-1.5 rounded-full dark:bg-green-900 dark:text-green-300">{item?.heading}</span>
                    ))}
                  </td>
                  <td className="p-2 px-3">
                  {item.createdAt}
                  </td>
                  {/* Add other table cells based on your API response */}
                  <td className="p-2 px-3 flex justify-end">
                    <button
                      type="button"
                      onClick={() => navigate(`/admin/edit-chapter/${item._id}`)}
                      className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item._id)}
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

export default ListChapter;
