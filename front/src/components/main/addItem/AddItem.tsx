import React, {ChangeEvent, FC, useState} from 'react';
import './add.css';
import {Button} from "@mui/material";
import {addMark, IInputsData} from "../../../store/reducers/MainSlice";
import {useAppDispatch} from "../../../hooks/redux";

const AddItem: FC = () => {
    const dispatch = useAppDispatch();
    const [inputsData, setInputsData] = useState<IInputsData>({
        name: '',
        latitude: '',
        longitude: '',
    });

    const addItem = (data: IInputsData) => {
        data.userId = localStorage.getItem('userId')
        dispatch(addMark(data))
        setInputsData({name: '', latitude: '', longitude: ''})
    }

    return (
        <>
            <div className={'add'}>
                <input
                    value={inputsData.name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setInputsData({...inputsData, name: e.target.value})}
                    className='field' placeholder='Название'/>
                <input
                    value={inputsData.latitude}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setInputsData({...inputsData, latitude: e.target.value})}
                    className='field' placeholder='Широта'/>
                <input
                    value={inputsData.longitude}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setInputsData({...inputsData, longitude: e.target.value})}
                    className='field' placeholder='Долгота'/>
                <Button variant="contained" onClick={() => addItem(inputsData)}> Добавить </Button>
            </div>
        </>
    );
};

export default AddItem;