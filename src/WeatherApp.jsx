import { Autocomplete, Card, CardContent, Paper, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getProvincesWithDetail } from 'vietnam-provinces';


export const WeatherApp = () => {
    const [show, setShow] = useState(false);
    const [cities, setCities] = useState('');
    const [provinces, setProvinces] = useState([]);
    const [coordinate, setCoordinate] = useState({
        lat: '',
        lon: ''
    });
    const [weather, setWeather] = useState({

    });
    const [selectedProvince, setSelectedProvince] = useState('');
    const [daily, setDaily] = useState([]);
    const [indexClick, setIndexClick] = useState();
    const key = '6937e99f9f2811b3b531103e557e2d1d'

    const getVietnamProvinces = () => {
        const formattedProvinces = Object.values(getProvincesWithDetail()).map(
            (province) => {
                let result = '';

                province?.unit === 'Tỉnh'
                    ? (result = province.name.replace('Tỉnh ', ''))
                    : (result = province.name.replace('Thành phố ', ''));

                return result;
            }
        );

        return formattedProvinces;
    };

    useEffect(() => {
        const provinces = getVietnamProvinces();
        setProvinces(provinces);
    }, []);

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
            setCoordinate({ lat, lon })
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

    const getDaily = async () => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinate.lat}&lon=${coordinate.lon}&appid=${key}&units=metric`;
            const res = await fetch(url);
            const data = await res.json();

            const secondDate = data.list[5]
            const thirdDate = data.list[13]
            const fourthDate = data.list[21]
            const fifthDate = data.list[29]
            const sixthDate = data.list[37]
            setDaily([secondDate, thirdDate, fourthDate, fifthDate, sixthDate])
            console.log(daily)
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
        getDaily();
    }
        , [coordinate])

    return (
        <>
            <div className='p-5'>
                <Autocomplete disablePortal
                    options={provinces}
                    renderInput={(param) => <TextField {...param} label='Location'></TextField>}
                    onInputChange={(e, newValue) => setSelectedProvince(newValue)}
                >
                </Autocomplete>
            </div>

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
            {selectedProvince && (
                <p className='mx-5 my-3 text-2xl font-bold'>Daily</p>,
                <div>
                    {
                        daily.map((value, index) => {
                            const date = new Date(value.dt * 1000)
                            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
                            const dayOfWeek = days[date.getDay()]
                            const feels_like = Math.round(value.main.feels_like)
                            return (
                                <div key={index} className='my-2'>
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

                        )
                    }
                </div>
            )
            }
        </>
    )
}
