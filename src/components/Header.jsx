import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { FaSearch } from "react-icons/fa";
import { FaBell } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { FaXmark } from "react-icons/fa6";
import ModalPlaywithFriend from "./Home/ModalPlaywithFriend";
import { FaRegUserCircle } from "react-icons/fa";
import "./googleTranslate.css"
import { useQuery } from "react-query";
import { getApi, getApiWithToken } from "../utils/api";
import { getUserdata } from "../utils/getuserdata";
import NotificationMp3 from '../assets/sound/notification.mp3'
import JoinTournament from "./joinTournament/JoinTournament";
import { useDispatch, useSelector } from "react-redux";
import { GameStatus, TournamentStartPopup, TournamentStatus } from "../redux/action";
const NotificationSound = new Audio(NotificationMp3)
function Header() {
  const location = useLocation();
  const isMultiplayerPresent = location.pathname.includes('/multiplayer');
  // console.log(isMultiplayerPresent, "isMultiplayerPresent");
  const [search, setSearch] = useState('');
  const token = localStorage.getItem('chess-user-token')
  const dispatch=useDispatch();

  const navigate = useNavigate();
  const [searchInut, setSearchInput] = useState(false);
  const [menu, setMenu] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModal1Open, setIsModal1Open] = useState(false);
  const[showPopup,setShowPopup]=useState(false)
  const [remainingTime, setRemainingTime] = useState(null);
  const [joinUrl, setJoinUrl] = useState(null);
  const [redirect, setRedirect] = useState(false);
  // var redirect=false;
  // const [pairedMatches,setPairedMatches]=useState([])

  function timeToMs(time, addMinutes = 0) {
    // Get current date
    const now = new Date();

    // Split the time string into hours and minutes
    const [hours, minutes] = time?.split(":").map(Number);

    // Create a date object for today at the specified time
    const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

    // Convert the target time to milliseconds and add extra minutes
    const ms = targetTime.getTime();
    const addedMs = addMinutes * 60 * 1000;

    return ms + addedMs;
  }
  const userdata = getUserdata();
  const notificationUrl = `${import.meta.env.VITE_URL}${import.meta.env.VITE_NOTIFICATION}/${userdata?._id}`;

  const queryNOTIFICATION = useQuery(
    ["getNOTIFICATION", notificationUrl], // Query key
    () => getApi(notificationUrl),    // Query function
    {
      refetchOnWindowFocus: false,
      refetchInterval: 2000,
      enabled: !!notificationUrl,
    }
  );

  const upcomingTournmentUrl = userdata?._id
    ? `${import.meta.env.VITE_URL}${import.meta.env.VITE_GET_UPCOMING_TOURNAMENT}`
    : null;

  // console.log(notificationUrl1);

  const queryNOTIFICATION1 = useQuery(
    ["getNOTIFICATION12", upcomingTournmentUrl], // Query key
    () => getApiWithToken(upcomingTournmentUrl), // Query function
    {
      refetchOnWindowFocus: false,
      refetchInterval: 2000,
      enabled: !!upcomingTournmentUrl, // Only run if the URL is valid
    }
  )

  // let joinUrl=queryNOTIFICATION1?.data?.data?.pairedMatches?.[0]?.matchUrl || null


  // let remainingTime=queryNOTIFICATION1?.data?.data?.tournaments?.[0]?.time || null
  const UserDetail = JSON.parse(localStorage.getItem("User Detail"));
  const userId = UserDetail?._id;
  // console.log(joinUrl,remainingTime,queryNOTIFICATION1,showPopup,"queryNOTIFICATION1");
  useEffect(() => {
    // Extract time from the first tournament's data
    // setPairedMatches(queryNOTIFICATION1?.data?.data?.pairedMatches)

    const pairedMatches = queryNOTIFICATION1?.data?.data?.pairedMatches || [];
    const time = queryNOTIFICATION1?.data?.data?.tournaments?.[0]?.time;
    // console.log(pairedMatches,time ,"pairedmatches, time");
    if(time){
      setRemainingTime(timeToMs(time,1));
    }
    // console.log(pairedMatches,"");
    // Find the first match where both user1 and user2 are present
    const match = pairedMatches.find(
      (match) => (match.user1 === userId || match.user2 === userId) &&
        match.user1 && match.user2
    );
    // console.log(match,"hhhhhhhhhhh,match by user id");
    // If both user1 and user2 exist, set the join URL and show popup
    if (match?.user1 && match?.user2) {
      const userColor = match.user1 === userId ? match.user1Color : match.user2 === userId ? match.user2Color : "null";
      const url = match.url || null;
      localStorage.setItem('userColour', userColor);
      
      // setJoinUrl(url);
      // if (url && !redirect) {
      //   const path = url.split('/multiplayer/')[1];
      // navigate(`/multiplayer/${path}`);
      // setRedirect(true)
      // }

      console.log(userColor,match?.user1,match?.user2,"usercolor",url);

      dispatch(TournamentStatus(false))
      dispatch(TournamentStartPopup(remainingTime, url,true))
      // Show popup if the current user is involved in any match
      setShowPopup(true);
    }
     else {
      // Hide the popup and reset the join URL if the conditions aren't met
      setShowPopup(false);
      setJoinUrl(null);
      dispatch(TournamentStartPopup(null, null,false))
      setRedirect(false)
    }
   
    // console.log(pairedMatches,remainingTime,"pairedMatches remaining time");
  }, [queryNOTIFICATION1, userId, remainingTime]);




  useEffect(() => {
    if (queryNOTIFICATION?.data?.data?.notifications?.length > 0) {
      // console.log("notification sound play ho gaya");
      NotificationSound.play();
    }
  }, [queryNOTIFICATION?.data?.data?.notifications?.length])



  localStorage.setItem('notification', JSON.stringify(queryNOTIFICATION?.data?.data?.notifications));


  const openModal = () => {
    setIsModalOpen(true)

  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const userDetails = token;


  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: false
      },
      "google_translate_element"
    );
  };
  useEffect(() => {
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  const handleChange = (value) => {
    setSearch(value);
  };

  const url = `${import.meta.env.VITE_URL}${import.meta.env.VITE_GET_USER_BY_NAME}${search}`;

  const queryGetSearch = useQuery("getSearch", () => getApi(url), {
    enabled: false,
  });




  const handleSearch = () => {
    // Only refetch if search is not empty
    if (search.trim() !== '') {
      // console.log("ggggggggg=>>>>>>>>>>>>");
      queryGetSearch.refetch();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleClick = () => {
    handleSearch(); // Call your search function on mouse click
  };

  const handleSearchClick = (e, item) => {
    // console.log("ggggggggg=>>>>>>>>>>>>");
    e.preventDefault();
    navigate(`/userprofile/${item._id}`)
    setIsModal1Open(false);
    setSearch("")
  }
  // console.log(queryGetSearch.isSuccess && queryGetSearch.data?.data?.success,"=>>>>>>>>>>>ttt",queryGetSearch.data?.data,"=========",url);
  // Check if the API call was successful and set modal state
  React.useEffect(() => {
    // console.log('useEffect triggered:', {
    //   isSuccess: queryGetSearch.isSuccess,
    //   successData: queryGetSearch.data?.data?.success,
    // });

    if (queryGetSearch.isSuccess && queryGetSearch.data?.data?.success) {
      // console.log('Success and data are true:', queryGetSearch.data?.data);
      setIsModal1Open(true);
      // console.log('Modal should be open now.');
    } else {
      setIsModal1Open(false);
    }
  }, [queryGetSearch.isSuccess, queryGetSearch.data?.data?.success, queryGetSearch.data?.data,]);



  const hendelOnlineGame = () => {
    // /multiplayer/randomMultiplayer/1500
    const protocol = window.location.protocol;
    const host = window.location.host;
    const uniqueIdurl = `${protocol}//${host}/multiplayer/randomMultiplayer/1500`;
    // window.open(uniqueIdurl, '_blank');
    window.location.href = uniqueIdurl;

    setMenu(false)
  }

  const handleOfline = () => {
    navigate('/chess10by10')
    setMenu(false)
  }


  // console.log("===============>>>>>isModal1Open",isModal1Open);

  return (
    <div className="text-white  sticky top-0 left-0 w-full  bg-slate-700   z-50">
      {/* first header */}
      <JoinTournament />


      <nav className="flex   gap-1 justify-between px-3 text-white border-b border-b-gray-500   bg-slate-700  ">
        <div onClick={() => setMenu(false)} className=" flex items-center relative gap-3 ">
          <Link to='/' className="py-1 flex items-center">
            <img src={logo} alt="" className="w-40 h-12" />
          </Link>

        </div>
        <div className="flex justify-end gap-2 items-center">

          <div id="google_translate_element"></div>
          <div className="relative pt-2 pr-2 lg:hidden">
            <Link to='/profile'> <FaBell className="w-5 h-5 text-white" /></Link>
            <div className="absolute top-1 left-3 right-0 inline-flex items-center justify-center  text-sm font-bold leading-none text-white bg-red-600 rounded-full">
            {queryNOTIFICATION?.data?.data?.notifications?.length || 0}
            </div>
          </div>
          <div className="lg:hidden" onClick={() => setMenu(!menu)}>
            <IoMdMenu className={`text-gray-200 text-xl ${menu && 'hidden'}`} />
            <FaXmark className={`text-gray-200 text-xl ${!menu && 'hidden'}`} />
          </div>
          {userDetails ?
            <div className="flex gap-2 justify-end max-lg:hidden">
              <p className="px-2 py-3">
                <div className="flex items-center">
                  <input
                    type="text"
                    className="focus:outline-none px-2 bg-black rounded-l-sm"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => handleChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <label onClick={handleClick} className="bg-yellow-600 p-1 text-base rounded-r-sm"><FaSearch className="p-0.5" /></label>

                  {isModal1Open && (
                    <div className="absolute right-0 z-10 mt-[121px] mr-[42px] w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                      <div className="py-1" role="none">
                        {queryGetSearch.data?.data?.data?.map((item, index) => (
                          <a onClick={(e) => handleSearchClick(e, item)} key={index} className=" cursor-pointer block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-0">{item.username} </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </p>
              <div className="relative pt-3">
                <Link to='/profile'> <FaBell className="w-7 h-7 text-white" /></Link>
                <div className="absolute top-1 left-3 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                  {queryNOTIFICATION?.data?.data?.notifications?.length || 0}
                </div>
              </div>
              <div className="flex items-center text-3xl">

                <Link to='/profile'><FaRegUserCircle /></Link>
              </div>
              {/* <p onClick={Logout} className="py-1 px-3 cursor-pointer">Logout</p> */}
            </div>
            :
            <ul className="flex justify-end gap-2 max-lg:hidden">
              <li
                onClick={() => setSearchInput(!searchInut)}
                className="px-2 py-3"
              >
                <div className="flex items-center">
                  <FaSearch className="mt-1" />
                </div>
              </li>
              {searchInut && (
                <li className="px-2 py-3">
                  <div className="flex items-center">
                    <input
                      type="text"
                      className="focus:outline-none px-2 bg-black"
                      placeholder="Search"
                    />
                  </div>
                </li>
              )}
              <li className="px-2 py-3">
                {" "}
                <Link to="/register" className="text-white uppercase">
                  sign up{" "}
                </Link>
              </li>
              <li className="px-2 py-3">
                {" "}
                <Link to="/login" className="text-white uppercase text-md">
                  Log in{" "}
                </Link>
              </li>

            </ul>

          }
        </div>
      </nav>

      {/* second header */}
      <div className="max-lg:hidden">
        <ul className="flex  max-lg:block ps-4 gap-4  bg-green-600 text-black font-bold ">

          <li className="relative group/item hover:bg-gray-600 hover:text-white py-1 px-2 uppercase hover:">
            {" "}
            <Link to='/' className="">Home</Link>

          </li>
          <li className="relative group/item hover:bg-gray-600 hover:text-white py-1 px-2 uppercase hover:">
            {" "}
            <a className="">Play</a>
            <ul className="absolute z-50 left-0  hidden bg-gray-600 text-white  group-hover/item:block capitalize   ">
              <li className="hover:bg-gray-500 text-nowrap p-1 my-2">
                <Link onClick={hendelOnlineGame}>Play Online</Link>
              </li>
              <li className="hover:bg-gray-500 text-nowrap p-1 my-2">
                <Link to="/chess10by10">Play Offline</Link>
              </li>
              <li onClick={openModal} className="hover:bg-gray-500 text-nowrap p-1 my-2">
                <a >Play with friend</a>
              </li>
              <li className="hover:bg-gray-500 text-nowrap p-1 my-2">
                <Link to='/trainer'>
                  Learn from Trainer
                </Link>
              </li>

            </ul>
          </li>
          <li className="relative group/item hover:bg-gray-600 hover:text-white py-1 px-2 uppercase hover:">
            {" "}
            <a>puzzles</a>
            <ul className="absolute left-0 z-50 hidden bg-gray-600 text-white  group-hover/item:block capitalize  ">

              <li className="hover:bg-gray-500 text-nowrap p-1 my-2 pe-8">
                <Link to={"/puzzle"}>puzzle rush</Link>
              </li>
              <li className="hover:bg-gray-500 text-nowrap p-1 my-2">
                <a href="">puzzle battle</a>
              </li>
              <li className="hover:bg-gray-500 text-nowrap p-1 my-2">
                <a href="">puzzle storm</a>
              </li>
              <li className="hover:bg-gray-500 text-nowrap p-1 my-2">
                <a href="">puzzle racer</a>
              </li>
            </ul>
          </li>
          {/* <li className="relative group/item hover:bg-gray-600 hover:text-white py-1 px-2 uppercase hover:">
            {" "}
            <a className="">learn</a>
            <ul className="absolute z-50 left-0 hidden bg-gray-600 text-white  group-hover/item:block capitalize  ">
              <li className="hover:bg-gray-500 text-nowrap p-1 my-2 pe-12">
                <Link to="/chessLearn">Chess basics</Link>

              </li>
              <li className="hover:bg-gray-500 text-nowrap p-1 my-2">
                <Link to="/chess8by8">Practice</Link>
              </li> */}
          {/* <li className="hover:bg-gray-500 text-nowrap p-1 my-2">
                 <a href="">Analysis</a>
               </li>
               <li className="hover:bg-gray-500 text-nowrap p-1 my-2">
                 <a href="">Lessons</a>
               </li>
               <li className="hover:bg-gray-500 text-nowrap p-1 my-2">
                 <a href="">endgame</a>
               </li> */}
          {/* </ul>
          </li> */}
          {/* <li className="relative  group/item hover:bg-gray-600 hover:text-green-400 py-1 px-2 uppercase hover:">
             {" "}
             <a>watch</a>
             <ul className="absolute z-50 left-0 hidden bg-gray-600 text-green-400  group-hover/item:block capitalize  ">
               <li className="hover:bg-gray-500 text-nowrap p-1 my-2 pe-16">
                 <a href="">Broadcasts</a>
               </li>
              
               <li className="hover:bg-gray-500 text-nowrap p-1 my-2">
                 <a href="">current games</a>
               </li>
               <li className="hover:bg-gray-500 text-nowrap p-1 my-2">
                 <a href="">streamers</a>
               </li>
               <li className="hover:bg-gray-500 text-nowrap p-1 my-2">
                 <a href="">video library</a>
               </li>
             </ul>
           </li> */}
          <li className="relative   group/item hover:bg-gray-600 hover:text-white py-1 px-2 uppercase">
            {" "}
            <a >community</a>
            <ul className="absolute z-50 left-0 hidden bg-gray-600 text-white  group-hover/item:block capitalize  ">
              <li className="hover:bg-gray-500 text-nowrap p-1 pe-16 my-2 ">
                <Link to={'/player'} href>Players</Link>
              </li>
              {/* <li className="hover:bg-gray-500 text-nowrap p-1 my-2">
                 <a href="">Teams</a>
               </li>
               <li className="hover:bg-gray-500 text-nowrap p-1 my-2">
                 <a href="">form</a>
               </li> */}
              <li className="hover:bg-gray-500 text-nowrap p-1 my-2">
                {/* <Link to={'/blog'} href="">Blog</Link> */}
              </li>
            </ul>
          </li>
          {/* <li className="relative  hover: group/item  hover:bg-gray-600 hover:text-green-400 py-1 px-2 uppercase">
             {" "}
             <a >tools</a>
             <ul className="absolute z-50 left-0 hidden bg-gray-600 text-green-400  group-hover/item:block capitalize  ">
               <li className="hover:bg-gray-500 text-nowrap p-1 my-2">
                 <a href="">Analysis board</a>
               </li>
               <li className="hover:bg-gray-500 text-nowrap p-1 my-2">
                 <a href="">Openings</a>
               </li>
               <li className="hover:bg-gray-500 text-nowrap p-1 my-2">
                 <a href="">Boards editor</a>
               </li>
               <li className="hover:bg-gray-500 text-nowrap p-1 my-2">
                 <a href="">Import game</a>
               </li>
               <li className="hover:bg-gray-500 text-nowrap p-1 my-2">
                 <a href="">advance search</a>
               </li>
             </ul>
           </li> */}
          <li className="relative  hover: group/item  hover:bg-gray-600 hover:text-white py-1 px-2 uppercase">
            {" "}
            <Link to='' >Tournaments</Link>
            <ul className="absolute z-50 lg:left-0  hidden bg-gray-600 text-white  group-hover/item:block capitalize ">
              <li className="hover:bg-gray-500 text-nowrap p-1 my-2">
                <Link to="/TournamentDetail">About Tournament</Link>
              </li>
              <li className="hover:bg-gray-500 text-nowrap p-1 my-2">
                <Link to="/tournaments">Tournament List</Link>
              </li>


            </ul>
          </li>

          <li className="relative  hover: group/item  hover:bg-gray-600 hover:text-white py-1 px-2 uppercase">
            {" "}
            <Link to='/chessLearn' >Rules</Link>

          </li>

          <li className="relative  hover: group/item  hover:bg-gray-600 hover:text-white py-1 px-2 uppercase">
            {" "}
            <Link to='/aboutUs' >About us</Link>

          </li>

          <li className="relative  hover: group/item  hover:bg-gray-600 hover:text-white py-1 px-2 uppercase">
            {" "}
            <Link to='/Games' >Games</Link>

          </li>

          {/* <li className="text-yellow-300 hover:text-green-500 py-3 px-2 uppercase">
             {" "}
             <a href="" className=" ">
               Donate
             </a>
           </li>  */}
        </ul>
      </div>

      {/* mobile and tab device header */}
      {
        menu &&
        <div className="relative overscroll-contain overflow-hidden h-screen w-full md:hidden text-white">
          <div className=" h-screen fixed top-15 bg-gray-700 w-full">
            {/* first heading */}
            <div className="">
              <ul className="flex justify-between">
                {userDetails ? <p className="text-white capitalize  mt-3 px-3">
                  <Link onClick={() => setMenu(false)} to='/profile'><FaRegUserCircle className="text-2xl" /></Link>
                </p>
                  :
                  <ul className="flex justify-between">
                    <li onClick={() => setMenu(false)} className="px-2 py-3">
                      {" "}
                      <Link to="/register" className="text-green-400 uppercase">
                        sign up{" "}
                      </Link>
                    </li>
                    <li onClick={() => setMenu(false)} className="px-2 py-3">
                      {" "}
                      <Link to="/login" className="text-green-400 uppercase text-md">
                        Log in{" "}
                      </Link>
                    </li>
                  </ul>

                }

                <li
                  onClick={() => setSearchInput(!searchInut)}
                  className="px-2 py-3"
                >
                  <div className="flex items-center">
                    <FaSearch className="mt-1" />
                  </div>
                </li>

              </ul>
              {searchInut && (

                <div className="flex items-center ">
                  <input
                    type="text"
                    className="focus:outline-none p-2 bg-black w-full"
                    placeholder="Search"
                  />
                </div>

              )}
            </div>
            {/* second header */}
            <div className="">
              <ul className="block  gap-4   text-black font-bold ">

                <li onClick={() => setMenu(false)} className="relative group/item hover:bg-gray-600 hover:text-green-400 py-1 px-2 uppercase text-white ">
                  {" "}
                  <Link to='/' className="">Home</Link>

                </li>
                <li className="relative group/item hover:bg-gray-600 hover:text-white py-1 px-2 uppercase text-white">
                  {" "}
                  <a className="">Play</a>
                  <ul className=" z-50 lg:left-0  hidden bg-gray-600 text-white  group-hover/item:block capitalize  ">
                    <li className="hover:bg-gray-500 text-nowrap p-1 my-2">
                      <Link onClick={hendelOnlineGame}>Play Online</Link>
                    </li>
                    <li onClick={handleOfline} className="hover:bg-gray-500 text-nowrap p-1 my-2">
                      <Link to="/chess10by10">Play Offline</Link>
                    </li>
                    <li onClick={openModal} className="hover:bg-gray-500 text-nowrap p-1 my-2 cursor-pointer">
                      <a >Play with friend</a>
                    </li>
                    <li onClick={() => setMenu(false)} className="hover:bg-gray-500 text-nowrap p-1 my-2">
                      <Link to='/trainer' className="hover:bg-gray-500 text-nowrap p-1 my-2">
                        Learn from Trainer
                      </Link>
                    </li>

                  </ul>
                </li>
                <li className="relative group/item hover:bg-gray-600 hover:text-white py-1 px-2 uppercase text-white">
                  {" "}
                  <a>puzzles</a>
                  <ul className=" hidden bg-gray-600 text-white  group-hover/item:block capitalize  ">

                    <li onClick={() => setMenu(false)} className="hover:bg-gray-500 text-nowrap p-1 my-2 pe-8">
                      <Link to={"/puzzle"}>puzzle rush</Link>
                    </li>
                    <li onClick={() => setMenu(false)} className="hover:bg-gray-500 text-nowrap p-1 my-2">
                      <a href="">puzzle battle</a>
                    </li>
                    <li onClick={() => setMenu(false)} className="hover:bg-gray-500 text-nowrap p-1 my-2">
                      <a href="">puzzle storm</a>
                    </li>
                    <li onClick={() => setMenu(false)} className="hover:bg-gray-500 text-nowrap p-1 my-2">
                      <a href="">puzzle racer</a>
                    </li>
                  </ul>
                </li>
                {/* <li className="relative group/item hover:bg-gray-600 hover:text-white py-1 px-2 uppercase text-white ">
                  {" "}
                  <a className="">learn</a>
                  <ul className=" hidden bg-gray-600 text-white  group-hover/item:block capitalize ">
                    <li onClick={() => setMenu(false)} className="hover:bg-gray-500 text-nowrap p-1 my-2 pe-12">
                      <Link to="/chessLearn">Chess basics</Link>

                    </li>
                    <li onClick={() => setMenu(false)} className="hover:bg-gray-500 text-nowrap p-1 my-2">
                      <a href="">Practice</a>
                    </li>
                    {/* <li className="hover:bg-gray-500 text-nowrap p-1 my-2">
                 <a href="">Analysis</a>
               </li>
               <li className="hover:bg-gray-500 text-nowrap p-1 my-2">
                 <a href="">Lessons</a>
               </li>
               <li className="hover:bg-gray-500 text-nowrap p-1 my-2">
                 <a href="">endgame</a>
               </li> */}
                {/* </ul>
                {/* <li className="relative  group/item hover:bg-gray-600 hover:text-white py-1 px-2 uppercase hover:">
             {" "}
             <a>watch</a>
             <ul className="absolute z-50 left-0 hidden bg-gray-600 text-white  group-hover/item:block capitalize  ">
               <li className="hover:bg-gray-500 text-nowrap p-1 my-2 pe-16">
                 <a href="">Broadcasts</a>
               </li>
              
               <li className="hover:bg-gray-500 text-nowrap p-1 my-2">
                 <a href="">current games</a>
               </li>
               <li className="hover:bg-gray-500 text-nowrap p-1 my-2">
                 <a href="">streamers</a>
               </li>
               <li className="hover:bg-gray-500 text-nowrap p-1 my-2">
                 <a href="">video library</a>
               </li>
             </ul>
           </li> */}
                <li className="relative   group/item hover:bg-gray-600 hover:text-white py-1 px-2 uppercase text-white">
                  {" "}
                  <a >community</a>
                  <ul className=" hidden bg-gray-600 text-white  group-hover/item:block capitalize">
                    <li onClick={() => setMenu(false)} className="hover:bg-gray-500 text-nowrap p-1 pe-16 my-2 ">
                      <Link to={'/player'} href>Players</Link>
                    </li>
                    {/* <li className="hover:bg-gray-500 text-nowrap p-1 my-2">
                 <a href="">Teams</a>
               </li>
               <li className="hover:bg-gray-500 text-nowrap p-1 my-2">
                 <a href="">form</a>
               </li> */}
                    <li onClick={() => setMenu(false)} className="hover:bg-gray-500 text-nowrap p-1 my-2">
                      {/* <Link to={'/blog'} href="">Blog</Link> */}
                    </li>
                  </ul>
                </li>
                {/* <li className="relative  hover: group/item  hover:bg-gray-600 hover:text-white py-1 px-2 uppercase">
             {" "}
             <a >tools</a>
             <ul className="absolute z-50 left-0 hidden bg-gray-600 text-white  group-hover/item:block capitalize  ">
               <li className="hover:bg-gray-500 text-nowrap p-1 my-2">
                 <a href="">Analysis board</a>
               </li>
               <li className="hover:bg-gray-500 text-nowrap p-1 my-2">
                 <a href="">Openings</a>
               </li>
               <li className="hover:bg-gray-500 text-nowrap p-1 my-2">
                 <a href="">Boards editor</a>
               </li>
               <li className="hover:bg-gray-500 text-nowrap p-1 my-2">
                 <a href="">Import game</a>
               </li>
               <li className="hover:bg-gray-500 text-nowrap p-1 my-2">
                 <a href="">advance search</a>
               </li>
             </ul>
           </li> */}
                <li className="relative text-white   group/item  hover:bg-gray-600 hover:text-white py-1 px-2 uppercase">
                  {" "}
                  <a >Tournaments</a>
                  <ul className="hidden bg-gray-600 text-white  group-hover/item:block capitalize ">
                    <li onClick={() => setMenu(false)} className="hover:bg-gray-500 text-nowrap p-1 my-2">
                      <Link to="/TournamentDetail">About Tournament</Link>
                    </li>
                    <li onClick={() => setMenu(false)} className="hover:bg-gray-500 text-nowrap p-1 my-2">
                      <Link to="/tournaments">Tournament List</Link>
                    </li>


                  </ul>

                </li>

                <li onClick={() => setMenu(false)} className="relative text-white   group/item  hover:bg-gray-600 hover:text-white py-1 px-2 uppercase">
                  {" "}
                  <Link to='/chessLearn' >Rules</Link>

                </li>
                <li onClick={() => setMenu(false)} className="relative text-white   group/item  hover:bg-gray-600 hover:text-white py-1 px-2 uppercase">
                  {" "}
                  <Link to='/aboutUs' >About us</Link>

                </li>

                <li onClick={() => setMenu(false)} className="relative text-white   group/item  hover:bg-gray-600 hover:text-white py-1 px-2 uppercase">
                  {" "}
                  <Link to='/Games' >Games</Link>

                </li>
                <li onClick={() => setMenu(false)} className="relative text-white   group/item  hover:bg-gray-600 hover:text-white py-1 px-2 uppercase">
                  {" "}
                  <Link to='/privacy' >Privacy & Policy</Link>
                </li>
                <li onClick={() => setMenu(false)} className="relative text-white   group/item  hover:bg-gray-600 hover:text-white py-1 px-2 uppercase">
                  {" "}
                  <Link to='/termsCondition' >Terms & Conditions</Link>

                </li>
                <li onClick={() => setMenu(false)} className="relative text-white   group/item  hover:bg-gray-600 hover:text-white py-1 px-2 uppercase">
                  {" "}
                  <Link to='/refundCancelationPolicy' >Refund & Cancelation Policy</Link>

                </li>

                {/* <li className="text-yellow-300 hover:text-green-500 py-3 px-2 uppercase">
             {" "}
             <a href="" className=" ">
               Donate
             </a>
           </li>  */}
              </ul>
            </div>
          </div>

        </div>


      }

      <ModalPlaywithFriend open={isModalOpen} close={closeModal} />
    </div>
  );
}

export default Header;
