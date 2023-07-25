import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import './index.css';
import Home from './Home';
import Navbar from './components/Navbar';
import Post from './Pages/Post';
import Submit from './Pages/Submit';
import Community from './Pages/Community';
import User from './Pages/User';
import Explore from './Pages/Explore';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import CreateCommunity from './Pages/CreateCommunity';
import CategoryPage from './Pages/CategoryPage';
import EditPost from './Pages/EditPost';
import { useState } from 'react';
function App() {
    const location = useLocation();
    console.log(location.pathname);
    const [navRender, setRender] = useState(false);
    return (
        <>
            <Navbar navRender={navRender} />
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/post/:postId" element={<Post />}></Route>
                <Route path="/edit/:editPostId" element={<EditPost />}></Route>
                <Route path="/submit" element={<Submit />}></Route>
                <Route
                    path="/r/:rid"
                    element={<Community setRender={setRender} />}
                ></Route>
                <Route path="/u/:uid" element={<User />}></Route>
                <Route
                    path="/subcategory/:subCategory"
                    element={<CategoryPage />}
                ></Route>
                <Route path="/explore" element={<Explore />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/singnup" element={<SignUp />}></Route>
                <Route path="/r/create" element={<CreateCommunity />}></Route>
            </Routes>
        </>
    );
}

function Croute() {
    const location = useLocation();

    return (
        <Route
            path="/r/:rid"
            key={location.pathname}
            element={<Community />}
        ></Route>
    );
}

export default App;
