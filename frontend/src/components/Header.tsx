import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { SignOutButton } from "./SignOutButton";

const Header = () => {
    const { isLoggedin } = useAppContext();

    return (
      <div className="bg-blue-800 py-6">
        <div className="container mx-auto flex justify-between items-center">
          <span className="text-3xl text-white font-bold tracking-tight">
            <Link to="/">GoAnyWhere.com</Link>
          </span>
          <div className="flex items-center"> 
            {isLoggedin ? (
              <>
                <Link to="/my-bookings" className="text-white px-3 font-bold">
                  My Bookings
                </Link>
                <Link to="/my-hotels" className="text-white px-3 font-bold">
                  My Hotels
                </Link>
                <SignOutButton /> 
              </>
            ) : (
              <Link to="/sign-in" className="text-white px-3 font-bold">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    );
};

export default Header;
