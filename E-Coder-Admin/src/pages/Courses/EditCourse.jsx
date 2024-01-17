import React, { useEffect, useState } from 'react';
import { LINK_API } from '../../constant';
import { useNavigate, useParams} from 'react-router-dom';
import { uploadFilesMultiple } from '../../utils';
import ReactLoading from 'react-loading';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditCourse = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    time: '',
    banner: '',
    price: '',
    level: '',
    tags: '',
    chapterId: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    description: '',
    time: '',
    banner: '',
    price: '',
    level: '',
    tags: '',
    chapterId: ''
  });
  const [loadingFile, setLoadingFile] = useState(false);
  const [listChapter, setListChapter] = useState([]);
  const [listOptionsChapter, setListOptionsChapter] = useState([]);
  const navigate = useNavigate();
  const [quill,setQuill] = useState();
  const {id} = useParams();

  const validateInput = () => {
    let valid = true;
    const newErrors = { name: '',
    description: '',
    time: '',
    banner: '',
    price: '',
    level: '',
    tags: '',
    quill: '' };

    if (!formData.name) {
      newErrors.name = 'Vui lòng nhập tên đăng nhập.';
      valid = false;
    }

    if (!quill) {
      newErrors.quill = 'Vui lòng khong de trong .';
      valid = false;
    }

    if (!formData.time) {
      newErrors.time = 'Vui lòng khong de trong ';
      valid = false;
    }

    if (!formData.price) {
      newErrors.price = 'Vui lòng khong de trong ';
      valid = false;
    }

    if (!formData.level) {
      newErrors.level = 'Vui lòng khong de trong .';
      valid = false;
    }

    if (!formData.tags) {
      newErrors.tags = 'Vui lòng khong de trong .';
      valid = false;
    }

    if(listOptionsChapter.length <= 0 ){
      newErrors.chapterId = 'Vui lòng khong de trong .';
      valid = false;
    }

    if(!formData.banner){
      newErrors.banner = 'Vui lòng khong de trong .';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Assuming getDetailCourse is an asynchronous function that returns a promise
        await getDetailCourse(id);
        // Additional logic after fetching user details can be added here
      } catch (error) {
        console.error("Error fetching user details:", error);
        // Handle the error as needed
      }
    };
  
    fetchData(); // Call the fetchData function
  
    // If getDetailCourse has a cleanup or cancellation mechanism, you can include it here
    return () => {
      // Cleanup logic if needed
    };
  }, [id]);

  const getDetailCourse = async(id) =>{
    try {
        const res = await fetch(`${LINK_API}/course/detail/${id}`);

          if(res.ok){
            const data = await res.json();
            console.log(data);
            setFormData(data);
            setListOptionsChapter(data.chapterId);
            setQuill(data.description)
          }
    } catch (error) {
        console.log(error);
    }
  }

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
      const response = await fetch(`${LINK_API}/course/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'isAdmin' : true
          // Add any other headers if needed (e.g., Authorization)
        },
        body: JSON.stringify({
            ...formData,
            description: quill,
            chapterId: listOptionsChapter.map((item) => item._id)
        }),
      });

      if (response.ok) {
        alert('Update success');

        setFormData({
          name: '',
          description: '',
          time: '',
          banner: '',
          price: '',
          level: '',
          tags: '',
          chapterId: ''
        });
        await getDetailCourse(id);
       navigate('/admin/quan-ly-course');
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
        // Assuming getDetailCourse is an asynchronous function that returns a promise
        await fetchListChapter();
        // Additional logic after fetching user details can be added here
      } catch (error) {
        console.error("Error fetching user details:", error);
        // Handle the error as needed
      }
    };
  
    fetchData(); // Call the fetchData function
  
    // If getDetailCourse has a cleanup or cancellation mechanism, you can include it here
    return () => {
      // Cleanup logic if needed
    };
  }, []);



  const fetchListChapter = async() =>{
    try {
        const res = await fetch(`${LINK_API}/course/chapterall`);

          if(res.ok){
            const data = await res.json();
            // console.log(data);
            setListChapter(data)
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
        banner: resFile.url
       });
       setErrors((prevErrors) => ({ ...prevErrors, ['banner']: '' }));
       setLoadingFile(false)
      }
    }
  } 

  const handleChangeChapter = (e) => {
    const { name, value } = e.target;
    console.log(`Handling change for ${name}: ${value}`);
    
    // Make sure listOptionsChapter is initialized as an array
    const updatedList = Array.isArray(listOptionsChapter) ? [...listOptionsChapter] : [];
    
    // Check if the value is already in the list
    const isValueInList = updatedList.find((item) => item._id === value);
    
    // If the value is in the list, remove it; otherwise, add it
    if (isValueInList) {
      const updatedListWithoutValue = updatedList.filter((item) => item._id !== value);
      setListOptionsChapter(updatedListWithoutValue);
    } else {
      const foundChapter = listChapter.find((item) => item._id === value);
  
      if (foundChapter) {
        setListOptionsChapter([...updatedList, foundChapter]);
      }
    }
  };

  console.log(formData);
  
  return (
    <>
      <div className="flex items-center justify-center p-12 w-full">
        <div className="mx-auto w-full max-w-[850px]">
            <div className="img mb-3">
              {
                loadingFile ? (
                  <ReactLoading type={'spin'} color={'black'} height={'20px'} width={'20px'} />
                ) : (
<>

<img src={formData.banner} className='h-[300px] w-[300px] object-cover my-3' alt="" />
                  <input
                      type="file"
                      accept="image/*"
                      id="upload"
                      onChange={handleFileChange}
                  />
                   {errors.banner && <p className="text-red-500">{errors.banner}</p>}
</>
                )
              }
            </div>
          <form className='w-full'>
            <div className="flex gap-2">
            <div className="mb-5 w-full">
              <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
                Name
              </label>
              <input
                type="text" // Change type to "text"
                name="name"
                id="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>

            <div className="mb-5 w-full">
              <label htmlFor="time" className="mb-3 block text-base font-medium text-[#07074D]">
                Time
              </label>
              <input
                type="time"
                name="time"
                id="time"
                placeholder="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              {errors.time && <p className="text-red-500">{errors.time}</p>}
            </div>
            </div>

            <div className="flex gap-2">
            <div className="mb-5 w-full">
              <label htmlFor="price" className="mb-3 block text-base font-medium text-[#07074D]">
                Price
              </label>
              <input
                type="text" // Change type to "text"
                name="price"
                id="price"
                placeholder="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              {errors.price && <p className="text-red-500">{errors.price}</p>}
            </div>

            <div className="mb-5 w-full">
              <label htmlFor="level" className="mb-3 block text-base font-medium text-[#07074D]">
                Level
              </label>
              <select
                name="level" // Change name to "isAdmin"
                id="level" // Change id to "isAdmin"
                value={formData.level}
                onChange={handleChange}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              >
                <option value="">Chọn Level</option>
                <option value="Basic">BASIC</option>
                <option value="Advantage">ADVANTAGE</option>
              </select>
              {errors.level && <p className="text-red-500">{errors.level}</p>}
            </div>
            </div>

            <div className="mb-5">
              <label htmlFor="tags" className="mb-3 block text-base font-medium text-[#07074D]">
                Tags
              </label>
              <input
                type="text"
                name="tags"
                id="tags"
                placeholder="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              {errors.tags && <p className="text-red-500">{errors.tags}</p>}
            </div>

            <div className="mb-5">
              {
                listOptionsChapter?.map((item)=>(
                  <span key={item._id} className="bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">{item.title}</span>
                ))
              }
            </div>
            
            <div className="mb-5">
              <label htmlFor="role" className="mb-3 block text-base font-medium text-[#07074D]">
                Chọn Chapter
              </label>
              <select
                name="isAdmin" // Change name to "isAdmin"
                id="isAdmin" // Change id to "isAdmin"
                value={formData.isAdmin ? 'ADMIN' : 'USER'}
                onChange={handleChangeChapter}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-4 px-8 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              >
                <option value="">Chọn chapter</option>
                {
                    listChapter?.map((item)=>(
                        <option value={item._id} key={item._id}>{item.title}</option>
                    ))
                }
              </select>
              {errors.chapterId && <p className="text-red-500">{errors.chapterId}</p>}
            </div>

            <div className="mb-5">
            <label htmlFor="role" className="mb-3 block text-base font-medium text-[#07074D]">
                Description
              </label>
            <ReactQuill theme="snow" value={quill} onChange={setQuill} />
            {errors.quill && <p className="text-red-500">{errors.quill}</p>}
            </div>

            <div className="flex gap-10">
              <button
                onClick={handleSubmit}
                type="button"
                className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
              >
                Cập nhật  
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditCourse;
