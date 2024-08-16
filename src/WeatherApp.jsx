//cities, selectedProvince,weather

//state global: coordinate,selectedProvince
import { Card, CardContent } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCoordinate } from './redux/coordinateSlice';


export const WeatherApp = () => {
    const [cities, setCities] = useState('');
    const [weather, setWeather] = useState({

    });
    const key = '6937e99f9f2811b3b531103e557e2d1d'
    const dispatch = useDispatch();
    const coordinate = useSelector(state => state.coordinateSliceName)
    const selectedProvince = useSelector(state => state.selectedProvinceSliceName)

    const getCities = async () => {
        try {
            const url = `http://api.geonames.org/searchJSON?q=${encodeURIComponent(
                selectedProvince
            )}&country=VN&maxRows=1&username=nguyenkhoa`;

            const res = await fetch(url);
            const data = await res.json();
            const { name } = data.geonames[0]
            setCities(name)

        } catch (error) {
            console.log(error)
        }
    }

    const getCoordinates = async () => {
        try {
            const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cities},VN&appid=${key}`;

            const res = await fetch(url);
            const data = await res.json();
            const { lat, lon } = data[0];
            dispatch(setCoordinate({ lat, lon }))
        } catch (error) {
            console.log(error)
        }
    }

    const getWeathers = async () => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinate.lat}&lon=${coordinate.lon}&appid=${key}`;
            const res = await fetch(url);
            const data = await res.json();
            const { description, icon } = data.weather[0]
            let { feels_like, humidity, pressure } = data.main
            const { speed } = data.wind
            feels_like = Math.round(feels_like - 273);
            setWeather({ description, icon, feels_like, humidity, pressure, speed })
        } catch (error) {
            console.log(error)
        }
    }



    useEffect(() => {
        getCities();
    }
        , [selectedProvince])

    useEffect(() => {
        getCoordinates();
    }
        , [cities])

    useEffect(() => {

        getWeathers();
    }
        , [coordinate])

    return (
        <>


            {selectedProvince && (<div className='flex justify-center'>
                <div className='w-1/2 lg:w-1/3   py-5 px-4'>
                    <Card sx={{ backgroundColor: '#383838', color: '#FFFFFF' }} >
                        <CardContent>
                            <div className='flex md:flex-row flex-col justify-between items-center'>
                                <div>
                                    <p className='text-3xl font-bold'>
                                        {cities},VN
                                    </p>
                                    <p>
                                        {weather.description}
                                    </p>
                                </div>
                                <div className='w-36'>
                                    <img src={`src/assets/icons/${weather.icon}.png`} alt="Cloud" />
                                </div>
                            </div>
                            <div className='flex md:flex-row flex-col justify-between items-center my-3'>
                                <div className='w-full md:w-1/2 flex'>
                                    <p className='w-full text-center justify-center text-5xl md:text-6xl xl:text-7xl font-bold'>{weather.feels_like}&deg;C</p>
                                </div>
                                <div className='w-full md:w-1/2 mt-5'>
                                    <p className='leading-5'>Details</p>
                                    <div className='flex justify-between'>
                                        <p className='leading-5'>Feels like</p>
                                        <p className='font-bold leading-5'>{weather.feels_like}&deg;C</p>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <p className='leading-5'>Wind Speed</p>
                                        <p className='font-bold leading-5'>{weather.speed}m/s</p>
                                    </div>
                                    <div className='flex justify-between'>
                                        <p className='leading-5'>Humidity</p>
                                        <p className='font-bold leading-5'>{weather.humidity}%</p>
                                    </div>
                                    <div className='flex justify-between'>
                                        <p className='leading-5'>Pressure</p>
                                        <p className='font-bold leading-5'>{weather.pressure}hPa</p>
                                    </div>
                                </div>

                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>)
            }

        </>
    )
}
