//import { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "routes/Profile";
import Navigation from "./Navi";

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
    //const [isLoggedIn, setIsLoggedIn] = useState(false  );
    return(
        <Router>
            {isLoggedIn && <Navigation userObj={userObj} />}
            <Routes>
                {isLoggedIn ? (
                    <>
                        <Route exact path='/' element={ <Home userObj={userObj} /> } />
                        <Route exact path='/profile' element={ <Profile userObj={userObj} refreshUser={refreshUser} /> } />                     
                    </>                    
                ) : (
                    <Route exact path='/' element={ <Auth /> } />
                )}
                
            </Routes>
        </Router>
    );
};

export default AppRouter;
// react router dom v6 에서부터는 Redirect 를 못 써서 아래처럼
//<Route path="*" element={<Navigate to="/" replace />} />