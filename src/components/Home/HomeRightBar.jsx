import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FaGooglePlay, FaHandshake } from 'react-icons/fa'
import { FaEarthAfrica } from 'react-icons/fa6'
import { GoDotFill } from "react-icons/go";
// import { RiRobot2Fill } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'
import banner from '../../assets/banner2.jpg'
import Avatar from '../../assets/Avatar.jpeg'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import ModalPlaywithFriend from './ModalPlaywithFriend';
import { LiaChalkboardTeacherSolid } from 'react-icons/lia';
import { getApi, postApiWithFormdata } from '../../utils/api';
import { useQuery } from 'react-query';
import LoadingBar from 'react-top-loading-bar';
import { getUserdata } from '../../utils/getuserdata';
import { toastInfo, toastSuccess } from '../../utils/notifyCustom';
import { v4 as uuidv4 } from 'uuid';
function HomeRightBar() {
  const inputId = uuidv4();
  const loadingBar = useRef(null);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const url = `${import.meta.env.VITE_URL}${import.meta.env.VITE_GET_ONLINE}`;
  // console.log(url, "vvvv");
  const queryGetonline = useQuery("getONLINE", () => getApi(url),);

  // console.log(queryGetonline?.data?.data, "ffffffffff");
  const startLoading = () => {
    loadingBar.current.continuousStart();
  };
  const finishLoading = () => {
    loadingBar.current.complete();
  };
  useEffect(() => {
    if (queryGetonline.isLoading) {
      startLoading();
    } else {
      finishLoading();
    }
  }, [queryGetonline.isLoading]);
  const itemsdata = Array.isArray(queryGetonline?.data?.data) ? queryGetonline.data.data : [];


  const user = getUserdata();

  const hendelChallenge = useCallback(async (e, toid) => {
    try {
      e.preventDefault();
      if (isExecuting) {
        toastInfo("notification already sent Successfully");

      } else {
        setIsExecuting(true);

        const protocol = window.location.protocol;
        const host = window.location.host;
        const uniqueIdurl = `${protocol}//${host}/multiplayer/${inputId}/1200`;
        const user = await getUserdata();
        const url = `${import.meta.env.VITE_URL}${import.meta.env.VITE_CHALLENGE}`;
        // console.log(toid, user._id, url, uniqueIdurl, "gggggggg");

        if (toid !== user._id) {
          const raw = {
            "fromUserId": user._id,
            "toUserId": toid,
            "url": uniqueIdurl,
            "challengeId": inputId,
          };

          const response = await postApiWithFormdata(url, raw);

          if (response.data.success) {
            toastSuccess("Successfully sent notification");
            // window.open(uniqueIdurl, '_blank');
            window.location.href = uniqueIdurl;
          }
        } else {
          toastInfo("Notification not sent");
        }
      }
    } catch (error) {
      // console.log("CHALLENGE", error);
    } finally {
      setTimeout(() => {
        setIsExecuting(false);
      }, 120000); // 120,000 milliseconds = 2 minutes
      // 2000ms delay before resetting the flag
    }
  }, [isExecuting, inputId]);
  // console.log(isExecuting, "vvvvvvvvvvvv");
  const hendelOnlineGame = () => {
    // /multiplayer/randomMultiplayer/1500
    const protocol = window.location.protocol;
    const host = window.location.host;
    const uniqueIdurl = `${protocol}//${host}/multiplayer/randomMultiplayer/1500`;
    window.location.href = uniqueIdurl;

  }
  return (
    <div>
      <LoadingBar color="#F11946" ref={loadingBar} />
      <div className="font-bold">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-y-4  gap-x-1  ">
          <div className='flex justify-center '>
            <Link onClick={hendelOnlineGame} className="h-16 w-[150px] max-md:w-[150px]   bg-green-600 rounded-md">
              <div className="flex gap-1 h-full items-center justify-center ">
                <div>
                  <FaGooglePlay className="text-white" />
                </div>
                <div className="uppercase text-white text-center">
                  Play Online
                </div>
              </div>
            </Link>

          </div>
          <div className="flex justify-center">
            <Link to='/chess10by10' className="h-16 w-[150px] max-md:w-[150px] bg-green-600 rounded-md">
              <div className="flex gap-1 h-full items-center justify-center ">
                <div>
                  <FaEarthAfrica className="text-white" />
                </div>
                <div className="uppercase text-white text-center">
                  Play offline

                </div>
              </div>
            </Link>
          </div>
          <div className="flex justify-center">
            <div className="h-16 w-[150px] max-md:w-[150px] bg-green-600 rounded-md cursor-pointer">
              <div onClick={openModal} className="flex h-full gap-1 items-center justify-center">
                <div className="text-2xl ml-2">
                  <FaHandshake className="text-white" />
                </div>
                <div className="uppercase text-white text-center m-0">
                  Play with friend
                </div>
              </div>

              <ModalPlaywithFriend open={isModalOpen} close={closeModal} />
            </div>

          </div>
          <div className='flex justify-center'>
            <Link to="/trainer" className="h-16 w-[150px] max-md:w-[150px]  bg-green-600 rounded-md">
              <div className="flex gap-1 h-full items-center justify-center ">
                <div className="ms-2">
                  <LiaChalkboardTeacherSolid className="text-white text-2xl" />
                </div>
                <div className="uppercase text-white text-center">
                  learn from trainer

                </div>
              </div>
            </Link>

          </div>


        </div>

      </div>
      <div className='mx-3 mt-4'>
        <h2 className='text-xl font-semibold'>Active Players ({`${itemsdata.length == 0 ? itemsdata.length : itemsdata.length-1}`})</h2>
        <div className='w-full mt-4 h-56 overflow-y-auto'>
          {itemsdata && itemsdata.map((item, index) => (
            <div key={index} className='flex pt-2 justify-between'>
              {item && user && item._id !== user._id ? (
                <>
                  <div className='flex cursor-pointer' onClick={() => navigate(`/userprofile/${item._id}`)}>
                    <GoDotFill className='mt-4 text-green-700 mr-2' />
                    <img src={Avatar} alt='Avatar' className='mt-2 h-10 w-10 rounded-full object-cover' />
                    <span className='text-xs p-2'>
                      <p>{item.username}</p>
                    </span>
                  </div>
                  <a onClick={(e) => hendelChallenge(e, item._id)} className='px-3 pt-2 text-green-600 font-semibold cursor-pointer'>Challenge</a>
                </>
              ) : (
                ""
              )}
            </div>
          ))}


        </div>

      </div>
      <div className="mx-3 mt-8 ">
        <LazyLoadImage src={banner} alt="" className="rounded-md" effect='blur' />
      </div>
    </div>
  )
}

export default HomeRightBar