import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

function LogOut() {
  const [loggingOut, setLoggingOut] = useState(true);
  const navigate = useNavigate();
  const { activeMenu, setActiveMenu } = useStateContext();

  useEffect(() => {
    // Simulate an asynchronous operation (e.g., API call) for better user experience
    const logoutUser = async () => {
      try {
        // Your logout logic here (remove items from local storage, etc.)
        localStorage.removeItem('id');
        localStorage.removeItem('email');
        localStorage.removeItem('name');
        localStorage.removeItem('isAdmin');
        setActiveMenu(false)
        // Simulate a delay (you can replace this with your actual logout logic)
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Navigate to the login page after successful logout
        navigate('/login', { replace: true });
      } catch (error) {
        console.error("Error during logout:", error);
        // Handle logout error if needed
      } finally {
        // Set loggingOut to false once the operation is complete
        setLoggingOut(false);
      }
    };

    // Call the logout function
    logoutUser();
  }, [navigate]);

  return (
    <div>
      <h1>Logging Out...</h1>
      {loggingOut && <p>Please wait...</p>}
    </div>
  );
}

export default LogOut;
