// selectedProvince, daily,

import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import DailyChild from './DailyChild';

const Daily = () => {
    const [daily, setDaily] = useState([]);

    const selectedProvince = useSelector(state => state.selectedProvinceSliceName)
    const coordinate = useSelector(state => state.coordinateSliceName)

    const getDaily = async () => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinate.lat}&lon=${coordinate.lon}&appid=6937e99f9f2811b3b531103e557e2d1d&units=metric`;
            const res = await fetch(url);
            const data = await res.json();

            const daily = data.list.filter((item) => item.dt_txt.split(' ')[1].split(':')[0] === '09');

            daily.splice(0, 1);

            setDaily(daily);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getDaily();
    }, [coordinate])

    return (
        <div>
            {
                selectedProvince && (
                    <p className='mx-5 my-3 text-2xl font-bold'>Daily</p>,
                    <div>
                        {
                            daily.map((value, index) => {
                                return (
                                    <DailyChild key={index} index={index} value={value}/>
                                )
                            }

                            )
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Daily