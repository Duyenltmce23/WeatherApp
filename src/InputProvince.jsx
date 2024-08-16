//provinces
import React from 'react'
import { Autocomplete, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getProvincesWithDetail } from 'vietnam-provinces';
import { selectProvince } from './redux/selectedProvinceSlice';

const InputProvince = () => {

    const dispatch = useDispatch();


    const [provinces, setProvinces] = useState([]);

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

    return (
        <div>
            <div className='p-5'>
                <Autocomplete disablePortal
                    options={provinces}
                    renderInput={(param) => <TextField {...param} label='Location'></TextField>}
                    onInputChange={(e, newValue) => dispatch(selectProvince(newValue))}
                >
                </Autocomplete>
            </div>
        </div>
    )
}

export default InputProvince