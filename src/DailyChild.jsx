import React, { useState } from 'react'


const DailyChild = (props) => {
    const index = props.index
    const value = props.value
    const [indexClick, setIndexClick] = useState();
    const [show, setShow] = useState(false);
    console.log({ index, value })



    const date = new Date(value.dt * 1000)
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const dayOfWeek = days[date.getDay()]
    const feels_like = Math.round(value.main.feels_like)

    return (
        <div className='my-2'>
            <div className='bg-neutral-200 mx-5 p-5 border border-neutral-200 rounded-2xl
                flex justify-between' onClick={() => { if (index === indexClick) { setShow(!show) } else setShow(true); setIndexClick(index); }}>
                <div className='flex items-center'>
                    <img className='w-10' src={`src/assets/icons/${value.weather[0].icon}.png`} alt="Sun" />
                    <p className='px-5 font-bold'>{dayOfWeek}</p>
                </div>
                <div className='flex items-center'>
                    <p className='px-5 '>{value.weather[0].descriptin}</p>
                    <p className='px-5 text-neutral-500'>{feels_like}&deg;C/{feels_like}&deg;C</p>
                </div>
            </div>
            {show && index === indexClick && (<div className='flex justify-between mx-8 my-3'>
                <div className=' w-1/2 px-3'>
                    <div className='flex justify-between'>
                        <p className='text-neutral-700'>Pressure</p>
                        <p>{value.main.pressure}hPa</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='text-neutral-700'>Clouds</p>
                        <p>{value.clouds.all}%</p>
                    </div>
                    <div className='flex justify-between '>
                        <p className='text-neutral-700'>Sea level</p>
                        <p>{value.main.sea_level}m</p>
                    </div>
                </div>
                <div className='w-1/2 px-3'>
                    <div className='flex justify-between'>
                        <p className='text-neutral-700'>Humidity</p>
                        <p>{value.main.humidity}%</p>
                    </div>
                    <div className='flex justify-between items-center'>
                        <p className='text-neutral-700'>Wind Speed</p>
                        <p>{value.wind.speed}m/s</p>
                    </div>
                    <div className='flex justify-between '>
                        <p className='text-neutral-700'>Feels like</p>
                        <p>{feels_like}&deg;C</p>
                    </div>
                </div>
            </div>)}
        </div>
    )
}

export default DailyChild