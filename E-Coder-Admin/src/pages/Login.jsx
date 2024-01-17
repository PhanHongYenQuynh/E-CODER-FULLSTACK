import React, { useState } from 'react';
import { LINK_API } from '../constant';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra xác thực trước khi gửi yêu cầu đăng nhập
        if (!username || !password) {
            setErrorMessage('Vui lòng nhập tên đăng nhập và mật khẩu.');
            return;
        }

        const apiUrl = `${LINK_API}/users/login`;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email:username, password: password }),
            });
        
            if (response.ok) {
                const responseData = await response.json();
                if(responseData.isAdmin){
                    setSuccessMessage('Đăng nhập thành công');
    
                localStorage.setItem('id', responseData._id);
                localStorage.setItem('email', responseData.email);
                localStorage.setItem('name', responseData.name);
                localStorage.setItem('isAdmin', responseData.isAdmin);
                navigate('/admin');
                }else{
                    
                    setErrorMessage('Bạn không phải là ADMIN');
                }
               
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Đăng nhập thất bại');
            }
        } catch (error) {
            console.error('Lỗi trong quá trình đăng nhập:', error);
            setErrorMessage('Đã xảy ra lỗi trong quá trình xử lý.');
        }
    };

    return (
        <>
            <div className='flex items-center justify-center min-h-screen from-purple-900 via-indigo-800 to-indigo-500 bg-gradient-to-br'>
                <div className='w-full max-w-lg px-10 py-8 mx-auto bg-white border rounded-lg shadow-2xl'>
                    <div className='max-w-md mx-auto space-y-3'>
                        <h3 className="text-lg font-semibold">&#128540; My Account</h3>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label className="block py-1">Tên đăng nhập</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="border w-full py-2 px-2 rounded shadow hover:border-indigo-600 ring-1 ring-inset ring-gray-300 font-mono"
                                />
                                <p className="text-sm mt-2 px-2 hidden text-gray-600">Text helper</p>
                            </div>
                            <div>
                                <label className="block py-1">Mật khẩu</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="border w-full py-2 px-2 rounded shadow hover:border-indigo-600 ring-1 ring-inset ring-gray-300 font-mono"
                                />
                            </div>
                            <div className="flex gap-3 pt-3 items-center">
                                <button
                                    type="submit"
                                    className="border hover:border-indigo-600 px-4 py-2 rounded-lg shadow ring-1 ring-inset ring-gray-300"
                                >
                                    Đăng nhập
                                </button>
                                <a href="#">Quên mật khẩu</a>
                            </div>
                            <div className="text-red-500">{errorMessage}</div>
                            <div className="text-green-500">{successMessage}</div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
