import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const Classes = () => {
    const [classes, setClasses] = useState([]);
    useEffect(() => {
        fetch('https://62c30133876c4700f5345ece.mockapi.io/classes')
            .then(res => res.json())
            .then(data => setClasses(data));
    }, []);


    const handleSubscribe = (id) => {

        const data = { classId: id, subscribe: true };
        axios.post('https://62c30133876c4700f5345ece.mockapi.io/subscribe', data)
            .then(res => {
                console.log(res);
                if (res?.data?.subscribe === true) {
                    toast.success('Subscribed Successfully', {
                        autoClose: 1000,
                        position: 'top-center'
                    });

                }

            });
    }

    return (
        <div >
            <ToastContainer />
            <div className='mx-auto container '>

                <h1 className='sm:text-lg lg:text-3xl text-center my-5'>See All Classes</h1>
                <div className='mx-3 my-5 grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                    {
                        classes?.map((singleClass => (<div key={singleClass.id}
                            className="p-3 rounded-lg bg-blue-100"
                        >
                            <h3 className='sm:text-lg lg:text-xl text-black'>Teacher Name: {singleClass?.name}</h3>
                            <h5 className='text-lg'>Classes Starts On {singleClass?.time}</h5>

                            <button
                                id='btn-subscribe'
                                onClick={() => handleSubscribe(singleClass.id)}
                                className="bg-blue-700 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-3 rounded-full">

                                Subscribe
                            </button>

                        </div>)))
                    }
                </div>
            </div>
        </div>
    );
};

export default Classes;