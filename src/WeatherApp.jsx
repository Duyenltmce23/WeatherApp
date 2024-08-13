import { Autocomplete, Card, CardContent, Paper, TextField } from '@mui/material'
import React, { useState } from 'react'
import imageCloud from './assets/icons/04d.png'
import imageSun from './assets/icons/01d.png'


export const WeatherApp = () => {

    const [show, setShow] = useState(false);
    const [indexClick, setIndexClick] = useState();
    const array = ['a', 'b', 'c']

    return (
        <>
            <div className='p-5'>
                <Autocomplete disablePortal
                    options={array}
                    renderInput={(param) => <TextField {...param} label='Location'></TextField>}>

                </Autocomplete>
            </div>


            <div className='flex justify-center '>
                <div className='w-1/3  py-5 px-4'>
                    <Card sx={{ backgroundColor: '#383838', color: '#FFFFFF' }} >
                        <CardContent>
                            <div className='flex justify-between items-center'>
                                <div>
                                    <p className='text-3xl font-bold'>
                                        Belgrade,RS
                                    </p>
                                    <p>
                                        broken clouds
                                    </p>
                                </div>
                                <div className='w-36'>
                                    <img src={imageCloud} alt="Cloud" />
                                </div>
                            </div>
                            <div className='flex justify-between items-center my-3'>
                                <div className='w-1/2'>
                                    <p className='text-8xl font-bold'>22&deg;C</p>
                                </div>
                                <div className='w-1/2'>
                                    <p>Details</p>
                                    <div className='flex justify-between'>
                                        <p>Feels like</p>
                                        <p className='font-bold'>22&deg;C</p>
                                    </div>
                                    <div className='flex justify-between'>
                                        <p>Wind Speed</p>
                                        <p className='font-bold'>2.06m/s</p>
                                    </div>
                                    <div className='flex justify-between'>
                                        <p>Humidity</p>
                                        <p className='font-bold'>21%</p>
                                    </div>
                                    <div className='flex justify-between'>
                                        <p>Pressure</p>
                                        <p className='font-bold'>1012hPa</p>
                                    </div>
                                </div>

                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className='my-2'>
                <p className='mx-5 my-3 text-2xl font-bold'>Daily</p>
                <div className='bg-neutral-200 mx-5 p-5 border border-neutral-200 rounded-2xl
                flex justify-between' onClick={() => { setShow(!show); }}>
                    <div className='flex items-center'>
                        <img className='w-10' src={imageSun} alt="Sun" />
                        <p className='px-5 font-bold'>Friday</p>
                    </div>
                    <div className='flex items-center'>
                        <p className='px-5 '>clear sky</p>
                        <p className='px-5 text-neutral-500'>32&deg;C/32&deg;C</p>
                    </div>
                </div>
                {show && (<div className='flex justify-between mx-8 my-3'>
                    <div className=' w-1/2 px-3'>
                        <div className='flex justify-between'>
                            <p className='text-neutral-700'>Pressure</p>
                            <p>1012hPa</p>
                        </div>
                        <div className='flex justify-between'>
                            <p className='text-neutral-700'>Clouds</p>
                            <p>4%</p>
                        </div>
                        <div className='flex justify-between '>
                            <p className='text-neutral-700'>Sea level</p>
                            <p>1012m</p>
                        </div>
                    </div>
                    <div className='w-1/2 px-3'>
                        <div className='flex justify-between'>
                            <p className='text-neutral-700'>Humidity</p>
                            <p>21%</p>
                        </div>
                        <div className='flex justify-between'>
                            <p className='text-neutral-700'>Wind Speed</p>
                            <p>2.63m/s</p>
                        </div>
                        <div className='flex justify-between '>
                            <p className='text-neutral-700'>Feels like</p>
                            <p>30&deg;C</p>
                        </div>
                    </div>
                </div>)}
            </div>
            <div className='my-2'>
                <div className='bg-neutral-200 mx-5 p-5 border border-neutral-200 rounded-2xl
                flex justify-between' onClick={() => setShow(!show)}>
                    <div className='flex items-center'>
                        <img className='w-10' src={imageSun} alt="Sun" />
                        <p className='px-5 font-bold'>Friday</p>
                    </div>
                    <div className='flex items-center'>
                        <p className='px-5 '>clear sky</p>
                        <p className='px-5 text-neutral-500'>32&deg;C/32&deg;C</p>
                    </div>
                </div>
                {show && (<div className='flex justify-between mx-8 my-3'>
                    <div className=' w-1/2 px-3'>
                        <div className='flex justify-between'>
                            <p className='text-neutral-700'>Pressure</p>
                            <p>1012hPa</p>
                        </div>
                        <div className='flex justify-between'>
                            <p className='text-neutral-700'>Clouds</p>
                            <p>4%</p>
                        </div>
                        <div className='flex justify-between '>
                            <p className='text-neutral-700'>Sea level</p>
                            <p>1012m</p>
                        </div>
                    </div>
                    <div className='w-1/2 px-3'>
                        <div className='flex justify-between'>
                            <p className='text-neutral-700'>Humidity</p>
                            <p>21%</p>
                        </div>
                        <div className='flex justify-between'>
                            <p className='text-neutral-700'>Wind Speed</p>
                            <p>2.63m/s</p>
                        </div>
                        <div className='flex justify-between '>
                            <p className='text-neutral-700'>Feels like</p>
                            <p>30&deg;C</p>
                        </div>
                    </div>
                </div>)}
            </div>
        </>
    )
}
