import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import './App.css'
import Login from './pages/Login';
import User from './pages/User';
import { useStateContext } from './contexts/ContextProvider';
import EditUser from './pages/user/EditUser';
import ListCourse from './pages/Courses';
import AddCourse from './pages/Courses/AddCourse';
import EditCourse from './pages/Courses/EditCourse';
import ListChapter from './pages/Chapter';
import AddChapter from './pages/Chapter/AddChapter';
import EditChapter from './pages/Chapter/EditChapter';
import LogOut from './pages/Logout';

const App = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    const role = localStorage.getItem('role');

    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }

    // Kiểm tra nếu có giá trị 'role' thì setLoggedIn(true)
  }, []);

  useEffect(() => {
    if (localStorage.getItem('id')) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  },[localStorage.getItem('id')])

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            <TooltipComponent
              content="Settings"
              position="Top"
            >
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
          {loggedIn && activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              loggedIn && activeMenu
                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            <div>
              {themeSettings && (<ThemeSettings />)}

              <Routes>

                <Route path="/" element={(<Login />)} />
                


                <Route path="/admin/quan-ly-user" element={<User />} />
                <Route path="/admin/quan-ly-course" element={<ListCourse />} />
                <Route path="/admin/add-course" element={<AddCourse />} />
                <Route path="/admin/edit-user/:id" element={<EditUser />} />
                <Route path="/admin/edit-course/:id" element={<EditCourse />} />

                <Route path="/admin/quan-ly-chapter" element={<ListChapter />} />
                <Route path="/admin/add-chapter" element={<AddChapter />} />
                <Route path="/admin/edit-chapter/:id" element={<EditChapter />} />

                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<LogOut />} />

               
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
