import { Suspense, lazy, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-toastify/dist/ReactToastify.css";

import bg from "./assets/bg3.jpg";
import { Route, Routes, useLocation } from "react-router-dom";
import Multiplayer from "./pages/multiplayer/Multiplayer";
import Tournaments from "./pages/Tournaments";
import Playwithfriend from "./pages/Playwithfriend";
import "./globalInit";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import BlogList from "./pages/blogPage/blog";
import Blogdetails from "./pages/blogPage/blogdetails";
import PlayerList from "./pages/blogPage/player";
import Pieces from "./pages/blogPage/pieces";
import Puzzle from "./pages/puzzle/Puzzle";
import ProtectRoute from "./components/auth/ProtectRoute";
import Trainer from "./pages/Trainer";
import Profile from "./pages/Profile";
import Games from "./pages/Games";
import LeaveRoomWarning from "./components/LeaveRoomWarning";
import "./globalInit";
import socket from "./pages/multiplayer/socket";
import { getUserdata } from "./utils/getuserdata";
import { getApi } from "./utils/api";
import Userprofile from "./pages/Userprofile";
import AnalysisBoard from "./pages/AnalysisBoard/AnalysisBoard";
import LiveTournamentDetail from "./pages/LiveTournamentDetail";
import { useDispatch } from "react-redux";
import { GameStatus } from "./redux/action";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsCondition from "./pages/TermsCondition";
import RefundCancelation from "./pages/RefundCancelation";
import Login2 from "./pages/auth/Login2";
import Register2 from "./pages/auth/Register2";
import ResetPassword from "./pages/auth/ResetPassword";
import ForgetPassword from "./pages/auth/ForgetPassword";
import ChessLanding from "./pages/Home/Index";
import Board2 from "./components/Board/Board2";
import Board from "./components/Board/Board";
// import Contact from "./pages/Contact"

function App() {
  const dispatch = useDispatch();
  const Header = lazy(() => import("./components/Header"));
  const Home = lazy(() => import("./pages/Home"));
  const Login = lazy(() => import("./pages/auth/Login"));
  const Register = lazy(() => import("./pages/auth/Register"));
  const Passwordreset = lazy(() => import("./pages/auth/Passwordreset"));
  const Chess8by8 = lazy(() => import("./pages/lichess/1by1/chess8by8"));
  const Chess10by10Phone = lazy(() =>
    import("./pages/lichess/1by1/Chess10by10Phone")
  );
  const LoginByEmail = lazy(() => import("./pages/auth/Loginbyemail"));
  const Footer = lazy(() => import("./components/Footer"));
  const ChessLearn = lazy(() => import("./pages/ChessLearn"));
  const TournamentDetail = lazy(() => import("./pages/TournamentDetail"));
  const Contact = lazy(() => import("./pages/Contact"));
  const AboutUs = lazy(() => import("./pages/AboutUs"));
  const RateUs = lazy(() => import("./pages/RateUs"));
  const UserDetail = JSON.parse(localStorage.getItem("User Detail"));
  const location = useLocation();
  const isMultiplayerPresent = location.pathname.includes("multiplayer");
  // if(!isMultiplayerPresent){
  //   dispatch(GameStatus(false))
  // }
  async function fetchData() {
    try {
      const userdata = UserDetail?.name; // Assuming getUserdata() returns a promise
      const url = `${import.meta.env.VITE_URL}${
        import.meta.env.VITE_GET_ACTIVITY
      }/${userdata}`;
      // console.log(userdata,"tttttttttt",UserDetail,url);
      userdata && (await getApi(url));
      // Assuming getApi is a function that fetches data
      // Process data or perform other actions here
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle errors here
    }
  }

  // Example usage:
  fetchData();

  let user;
  if (localStorage.getItem("chess-user-token")) {
    user = true;
  } else {
    user = false;
  }

  // console.log(user, "iiu=>>>>>>>>!!!!!!");

  const queryClient = new QueryClient();
  // const [pageAccessedByReload, setPageAccessedByReload] = useState(false);

  // useEffect(() => {
  //   const checkPageAccess = () => {
  //     setPageAccessedByReload(
  //       window.performance &&
  //       (window.performance.navigation.type === window.performance.navigation.TYPE_RELOAD ||
  //         window.performance.getEntriesByType('navigation').map((nav) => nav.type).includes('reload'))
  //     );
  //   };

  //   checkPageAccess();

  //   // Optionally, you can clear the state on component unmount
  //   return () => {
  //     setPageAccessedByReload(false);
  //   };
  // }, []);
  // console.log(pageAccessedByReload,"zzzzzzzzzzzzzzz");
  return (
    <>
      {/* <div id="google_translate_element"></div> */}
      {<LeaveRoomWarning />}

      <QueryClientProvider client={queryClient}>
        <div
          className=""
          style={{ background: `url(${bg}) cover/center no-repeat fixed` }}
        >
          {/* <Suspense fallback={<div>Loading...</div>}>
            <Header />
          </Suspense> */}
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route element={<ProtectRoute user={user} />}>
                {/* <Route path='/' element={<Home />} /> */}
                {/* <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/forget' element={<Passwordreset />} />
              <Route path='/loginbyemail' element={<LoginByEmail />} /> */}
                {/* <Route path='/chess8by8' element={<Chess8by8 />} /> */}
                {/* <Route path='/multiplayer/:time' element={<Multiplayer />} /> */}
                <Route
                  path="/multiplayer/:roomId/:time"
                  element={<Multiplayer />}
                />
                <Route path="/trainer" element={<Trainer />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/userprofile/:userId" element={<Userprofile />} />
                {/* <Route path='/tournaments' element={<Tournaments />} /> */}

                {/* <Route path='/chessLearn' element={<ChessLearn />} /> */}
                {/* <Route path='/TournamentDetail' element={<TournamentDetail />} /> */}
                {/* <Route path='/playwithfriend' element={<Playwithfriend />} /> */}
                {/* <Route path='/blog' element={<BlogList />} /> */}
                {/* <Route path='/puzzle' element={<Puzzle />} /> */}
                {/* <Route path='/blog' element={<BlogList />} /> */}
                {/* <Route path='/contact' element={<Contact />} /> */}
                {/* <Route path='/about' element={<AboutUs />} /> */}
                {/* <Route path='/rate' element={<RateUs />} /> */}
              </Route>
              <Route path="/" element={<ChessLanding />} />
              {/* <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} /> */}
              <Route path="/forgate-password" element={<ForgetPassword />} />
              <Route path="/reset-passwored" element={<ResetPassword />} />
              <Route path="/forget" element={<Passwordreset />} />
              <Route path="/loginbyemail" element={<LoginByEmail />} />
              <Route path="/chess10by10" element={<Chess10by10Phone />} />
              <Route path="/chess10by10Phone" element={<Chess10by10Phone />} />
              <Route path="/board" element={<Board2 />} />
              <Route path="/tournaments" element={<Tournaments />} />
              <Route path="/chessLearn" element={<ChessLearn />} />
              <Route path="/TournamentDetail" element={<TournamentDetail />} />
              <Route
                path="/LiveTournamentDetail/:id"
                element={<LiveTournamentDetail />}
              />
              <Route
                path="/playwithfriend/:time"
                element={<Playwithfriend />}
              />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/puzzle" element={<Puzzle />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/player" element={<PlayerList />} />
              <Route path="/blogdetails" element={<Blogdetails />} />
              <Route path="/pieces" element={<Pieces />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/aboutUs" element={<AboutUs />} />
              <Route path="/Games" element={<Games />} />
              <Route path="/rate" element={<RateUs />} />
              <Route
                path="/analysisBoard/:roomId"
                element={<AnalysisBoard />}
              />
            </Routes>
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/termsCondition" element={<TermsCondition />} />
              <Route
                path="/refundCancelationPolicy"
                element={<RefundCancelation />}
              />
              <Route
                path="/register"
                element={
                  <ProtectRoute user={!user} redirect="/">
                    <Register2 />
                  </ProtectRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <ProtectRoute user={!user} redirect="/">
                    <Login2 />
                  </ProtectRoute>
                }
              />
            </Routes>
          </Suspense>
          {/* <div className="relative w-full">
            <div className="absolute w-full">
              <Suspense fallback={<div>Loading...</div>}>
                <Footer />
              </Suspense>
            </div>
          </div> */}
        </div>

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>

      {/* <Routes>
        <Route path="/login2" element={<Login2 />} />
        <Route path="/register2" element={<Register2 />} />
        <Route path="/forgate-password" element={<ForgetPassword />} />
        <Route path="/reset-passwored" element={<ResetPassword />} />
        <Route path="/2" element={<ChessLanding />} />
      </Routes> */}

      <ToastContainer />
    </>
  );
}

export default App;
