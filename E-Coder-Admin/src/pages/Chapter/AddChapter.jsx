import React, { useEffect, useState } from 'react';
import { LINK_API } from '../../constant';
import { useNavigate} from 'react-router-dom';
import { uploadFilesMultiple } from '../../utils';
import ReactLoading from 'react-loading';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddChapter = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    output: '',
    point: '',
    heading: '',
  });

  const [errors, setErrors] = useState({
    title: '',
    description: '',
    output: '',
    point: '',
    heading: '',
  });
  
  const [listChapter, setListChapter] = useState([]);
  const [listOptionsChapter, setListOptionsChapter] = useState([]);
  const navigate = useNavigate();
  const [quill,setQuill] = useState();


  const validateInput = () => {
    let valid = true;
    const newErrors = { 
      title: '',
      description: '',
      output: '',
      point: '',
      heading: '',
   };

    if (!formData.title) {
      newErrors.title = 'Vui lòng nhập tên đăng nhập.';
      valid = false;
    }

    if (!quill) {
      newErrors.quill = 'Vui lòng khong de trong .';
      valid = false;
    }

    if (!formData.point) {
      newErrors.point = 'Vui lòng khong de trong ';
      valid = false;
    }

    if (!formData.heading) {
      newErrors.heading = 'Vui lòng khong de trong .';
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
      const response = await fetch(`${LINK_API}/course/chapter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'isAdmin' : true
          // Add any other headers if needed (e.g., Authorization)
        },
        body: JSON.stringify({
            ...formData,
            description: quill,
        }),
      });

      if (response.ok) {
        alert('Add success');

        setFormData({
          title: '',
          description: '',
          output: '',
          point: '',
          heading: '',
        });
       navigate('/admin/quan-ly-chapter');
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
        await fetchListChapter();
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
  
  console.log(errors);
  
  return (
    <>
      <div className="flex items-center justify-center p-12 w-full">
        <div className="mx-auto w-full max-w-[850px]">
          <form className='w-full'>
            <div className="flex gap-2">
            <div className="mb-5 w-full">
              <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
                Title
              </label>
              <input
                type="text" // Change type to "text"
                name="title"
                id="title"
                placeholder="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              {errors.title && <p className="text-red-500">{errors.title}</p>}
            </div>

            <div className="mb-5 w-full">
              <label htmlFor="heading" className="mb-3 block text-base font-medium text-[#07074D]">
                Heading
              </label>
              <input
                type="text"
                name="heading"
                id="heading"
                placeholder="heading"
                value={formData.heading}
                onChange={handleChange}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              {errors.heading && <p className="text-red-500">{errors.heading}</p>}
            </div>
            </div>

            <div className="flex gap-2">
            <div className="mb-5 w-full">
              <label htmlFor="point" className="mb-3 block text-base font-medium text-[#07074D]">
                point
              </label>
              <input
                type="Number" // Change type to "text"
                name="point"
                min={1}
                max={100}
                id="point"
                placeholder="point"
                value={formData.point}
                onChange={handleChange}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              {errors.point && <p className="text-red-500">{errors.point}</p>}
            </div>

            <div className="mb-5">
              <label htmlFor="output" className="mb-3 block text-base font-medium text-[#07074D]">
                output
              </label>
              <input
                type="text"
                name="output"
                id="output"
                placeholder="output"
                value={formData.output}
                onChange={handleChange}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
              {errors.output && <p className="text-red-500">{errors.output}</p>}
            </div>
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
                Add Chapter
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddChapter;
