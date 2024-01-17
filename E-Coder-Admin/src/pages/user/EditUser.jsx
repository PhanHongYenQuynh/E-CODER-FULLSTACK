import React, { useEffect, useState } from 'react';
import { LINK_API } from '../../constant';
import { useParams} from 'react-router-dom';
import { uploadFilesMultiple } from '../../utils';
import ReactLoading from 'react-loading';

const EditUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    email: '',
    isAdmin: '',
    avatar: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    password: '',
    email: '',
    isAdmin: '',
    avatar: ''
  });
  const [loadingFile, setLoadingFile] = useState(false);

  const {id} = useParams();

  const validateInput = () => {
    let valid = true;
    const newErrors = { name: '', password: '', email: '', avatar: '', isAdmin: '' };

    if (!formData.name) {
      newErrors.name = 'Vui lòng nhập tên đăng nhập.';
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu.';
      valid = false;
    }

    if (!formData.email) {
      newErrors.email = 'Vui lòng nhập Email.';
      valid = false;
    }

    if (!formData.avatar) {
      newErrors.avatar = 'Vui lòng upload hinh anh.';
      valid = false;
    }

    if (!formData.isAdmin) {
      newErrors.isAdmin = 'Vui lòng nhập ROLE.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Handling change for ${name}: ${value}`);
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInput()) {
      console.log('Validation failed');
      alert('Vui long dien du thong tin')
      return;
    }

    try {
      const response = await fetch(`${LINK_API}/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers if needed (e.g., Authorization)
        },
        body: JSON.stringify({
            ...formData,
            _id: id,
            isAdmin: formData.isAdmin === 'ADMIN' ? true : false
        }),
      });

      if (response.ok) {
        alert('Update success');

        setFormData({
          name: '',
          password: '',
          email: '',
          isAdmin: '', // Change this line
        });
        await getDetailUser(id);
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Assuming getDetailUser is an asynchronous function that returns a promise
        await getDetailUser(id);
        // Additional logic after fetching user details can be added here
      } catch (error) {
        console.error("Error fetching user details:", error);
        // Handle the error as needed
      }
    };
  
    fetchData(); // Call the fetchData function
  
    // If getDetailUser has a cleanup or cancellation mechanism, you can include it here
    return () => {
      // Cleanup logic if needed
    };
  }, [id]);

  const getDetailUser = async(id) =>{
    try {
        const res = await fetch(`${LINK_API}/users/user/${id}`);

          if(res.ok){
            const data = await res.json();
            setFormData(data)
          }
    } catch (error) {
        console.log(error);
    }
  }
  
  const handleFileChange = async(e) =>{
    const selectedFile = e.target.files[0];
    setLoadingFile(true);
    if(selectedFile){
      const resFile = await uploadFilesMultiple(selectedFile);
      if (resFile){
       setFormData({
        ...formData,
        avatar: resFile.url
       });
       setLoadingFile(false)
      }
    }
  } 

  console.log(formData);

  return (
    <>
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px]">
            <div className="img mb-3">
              {
                loadingFile ? (
                  <ReactLoading type={'spin'} color={'black'} height={'20px'} width={'20px'} />
                ) : (
<>

<img src={formData.avatar} className='h-[300px] w-[300px] object-cover my-3' alt="" />
                  <input
                      type="file"
                      accept="image/*"
                      id="upload"
                      onChange={handleFileChange}
                  />
</>
                )
              }
            </div>
          <form>
            <div className="mb-5">
              <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
                User Name
              </label>
              <input
                type="text" // Change type to "text"
                name="name"
                id="name"
                placeholder="User Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>

            <div className="mb-5">
              <label htmlFor="password" className="mb-3 block text-base font-medium text-[#07074D]">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              {errors.password && <p className="text-red-500">{errors.password}</p>}
            </div>

            <div className="mb-5">
              <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>

            
            <div className="mb-5">
              <label htmlFor="role" className="mb-3 block text-base font-medium text-[#07074D]">
                Chọn Role
              </label>
              <select
                name="isAdmin" // Change name to "isAdmin"
                id="isAdmin" // Change id to "isAdmin"
                value={formData.isAdmin ? 'ADMIN' : 'USER'}
                onChange={handleChange}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              >
                <option value="">Chọn Role</option>
                <option value="ADMIN">ADMIN</option>
                <option value="USER">USER</option>
              </select>
              {errors.isAdmin && <p className="text-red-500">{errors.isAdmin}</p>}
            </div>

            <div className="flex gap-10">
              <button
                onClick={handleSubmit}
                type="button"
                className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
              >
                Đăng kí
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditUser;
