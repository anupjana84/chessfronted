import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Slider from '../components/Slider';
import tBanner from "../assets/tBanner.jpg";
import tBanner2 from "../assets/tBanner2.jpg";
import Avatar from "../assets/Avatar.jpeg";
import Avatar2 from "../assets/Avatar2.jpeg";
import Avatar3 from "../assets/Avatar3.jpeg";
import Avatar4 from "../assets/Avatar4.jpeg";
import { useQuery } from 'react-query';
import { getApi } from '../utils/api';
import "../styles.css"
// import DTourmnt from "../assets/DTourmnt.jpg"

const Trainer = () => {
  const sliderHeight = '280px'; // Set the desired height here
  const eventDetails = "Play with our Trainer DynamoChess";
  const images = [
    // { img: img, content: "kjhsg sdgkjsdgh skdfg" },
    { img: tBanner, content: "kjhsg sdgkjsdgh skdfg" },
    { img: tBanner2, content: "kjhsg sdgkjsdgh skdfg" },
  ];
  const [showModal, setShowModal] = useState(false);
  const [selectedPiece, setSelectedPiece] = useState('');

  const handleOpenModal = (item) => {
    // console.log(item);
    setSelectedPiece(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPiece('');
  };
  // const closeDropdown = () => {
  //     console.log("+++")
  //     setDropdown(false);
  // };
  // const [dropdown, setDropdown] = useState(false);
  // const dropdownRef = useRef(null);
  // const toggleDropdown = () => setDropdown(!dropdown);

  const [selectedOption, setSelectedOption] = useState("");

  const handleSelect = (event) => {
    setSelectedOption(event.target.value);
  };
  const getBackgroundColor = () => {
    if (selectedOption === "online") return "bg-green-500";
    if (selectedOption === "offline") return "bg-gray-500";
    return "bg-white";
  };
  const getTextColor = () => {
    if (selectedOption === "online" || selectedOption === "offline") return "text-white";
    return "text-gray-700";
  };

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  const modalContent = {
    Trainer1: {
      name: 'Trainer1',
      description: '',
      city: 'Kolkata',
      language: 'Bangali/English/Hindi',
      img: Avatar
    },
    Trainer2: {
      name: 'Trainer2',
      description: '',
      city: 'Kolkata',
      language: 'Bangali/English/Hindi',
      img: Avatar2
    },
    Trainer3: {
      name: 'Trainer3',
      description: '',
      city: 'Kolkata',
      language: 'Bangali/English/Hindi',
      img: Avatar3
    },
    Trainer4: {
      name: 'Trainer4',
      description: '',
      city: 'Kolkata',
      language: 'Bangali/English/Hindi',
      img: Avatar4
    },
  };

  const url = `${import.meta.env.VITE_URL}${import.meta.env.VITE_GET_TRAINER}/get-all`;
  const { data, error, isLoading } = useQuery('GET_Trainer_LIST', () => getApi(url));

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading data</p>;
  }

  if (!data?.data?.trainerData || data.data.trainerData.length === 0) {
    return <p>No ratings available</p>;
  }

  console.log(data, "hhhhhhhhhhhhhhhkkkkkkkkkkk=================>>>>", selectedPiece?.name);

  return (
    <>
      <Modal show={showModal} onClose={handleCloseModal}>
        <img src={Avatar} className='h-60 w-60 max-sm:h-48 max-sm:w-48 mx-auto mb-2 rounded-md' />
        {/* <LazyLoadImage src={selectedPiece?.image} className="h-60 w-h-60 max-sm:h-48 max-sm:w-48 mx-auto mb-2 rounded-md" /> */}
        <p className='text-2xl text-green-900 font-bold text-center'>{selectedPiece?.name}</p>
        {/* <p className='pl-3'>{modalContent[selectedPiece]?.description} </p> */}

        <div className='flex flex-wrap justify-between'>
          <div className=' mt-2 max-sm:pl-6'>
            <p className=' mx-3 font-semibold'>City: <span className='text-green-700'>{selectedPiece?.address}</span>  </p>
            <p className='  mx-3 font-semibold'>Language: <span className='text-green-700'>{selectedPiece?.language}</span> </p>
          </div>
          <div className='mt-2 flex  max-sm:pl-8'>
            <div>
              {/* <label htmlFor="options" className="block text-sm font-medium text-gray-700">
        Select Mode
      </label> */}
              <select
                id="options"
                name="options"
                className={`mt-2 block  py-1 font-semibold text-xl border border-gray-300 focus:outline-none max-sm:text-sm rounded-md ${getBackgroundColor()} ${getTextColor()}`}
                value={selectedOption}
                onChange={handleSelect}
              >
                <option value="" disabled>Mode to Play</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
            </div>

            {/* <button  
            className={`px-1 my-2 rounded text-white ${
                isOnline ? 'bg-green-500' : 'bg-red-500'
            }`}
        >
            {isOnline ? 'Online' : 'Offline'}
        </button> */}
            <div className='px-2'>
              <input type='date' className='border border-black my-2 mx-4 py-1 rounded-md max-sm:text-xs'></input>
            </div>

          </div>
          <div className='flex max-sm:pl-6'>
            <div className='mt-1 max-sm:mt-0'>
              <input type='time' className='border border-black my-2 py-1 rounded-md mx-3 max-sm:text-xs'></input>
            </div>
            <div className='max-sm:pl-12 mt-2 max-sm:mt-1'>
              <button className='bg-green-600 px-3 py-2 max-sm:py-1   mx-3  max-sm:my-1  text-white font-bold text-base rounded-md'>Pay to Learn</button>

            </div>
          </div>

        </div>



      </Modal>
      <Slider height={sliderHeight} eventDetails={eventDetails} images={images} />
      <div className=''>
        <p className='text-center font-bold text-4xl m-3 max-sm:text-xl'> Play with Our Respected Trainers</p>
        <div className='w-full flex flex-wrap py-4 '>

          {data?.data?.trainerData.map((item, index) =>
            <div key={index} className='w-full lg:w-1/4 md:w-1/2 text-center p-4'>
              <div className='ms-2' onClick={() => handleOpenModal(item)}>
                <img src={item.image
                } className='inline-flex items-center  justify-center text-white transition-all duration-200 ease-soft-in-out  w-3/4 rounded-md' />
                {/* <LazyLoadImage src={item.image} alt="" className="inline-flex items-center  justify-center text-white transition-all duration-200 ease-soft-in-out  w-3/4 rounded-md" /> */}
                <br /><span className='text-lg font-semibold ms-2'>{item.name}</span>
                <p className='font-normal text-sm leading-5 text-gray-600 text-justify'><div className='custom-content text-black' dangerouslySetInnerHTML={{ __html: item.content }} /></p>
                <div className='flex w-full  mt-2'>
                  <p className=' text-start w-1/2  font-semibold  text-base'>Experience:<br /> <span className='text-green-700'>{item.experience}</span>  </p>
                  <p className=' text-start w-1/2 ml-4 font-semibold text-base'>Fees per hour:<br /> <span className='text-green-700 text-start'>₹ {item.feesPerHour}</span> </p>
                </div>

              </div>

            </div>
          )}

        </div>

      </div>





    </>
  )
}

const Modal = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex  justify-center items-center z-50">
      <div className="bg-white p-2 rounded-lg w-1/2 max-sm:w-full max-sm:mx-3">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-xl font-bold">X</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
export default Trainer
