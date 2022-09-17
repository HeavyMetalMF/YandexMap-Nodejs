import React, {ChangeEvent, Dispatch, FC, SetStateAction, useState} from 'react';
import './list.css';
import {Button, TextField} from "@mui/material";
import {deleteMark, IInputsData, IMark, updateMark} from "../../store/reducers/MainSlice";
import {useAppDispatch} from "../../hooks/redux";

interface IListItem {
    setCenter: Dispatch<SetStateAction<Array<number>>>,
    data: IMark
}

const ListItem: FC<IListItem> = ({setCenter, data}) => {

    const [inputsData, setInputsData] = useState<IInputsData>({
        name: '',
        latitude: '',
        longitude: '',
        _id: data._id
    });
    const [edit, setEdit] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const center = [Number(data.latitude), Number(data.longitude)]
    const userId = localStorage.getItem('userId')

    const updateItem = (data: IInputsData) => {
        setEdit(false);
        data.userId = userId;
        dispatch(updateMark(data));
    }

    const deleteItem = (id: number) => {
        dispatch(deleteMark({id, userId}))
    }

    return (
        <div>
            <div onClick={() => setCenter(center)}><strong>Название места: </strong>{data.name}</div>
            <div onClick={() => setCenter(center)}><strong>Долгота: </strong>{data.latitude}</div>
            <div onClick={() => setCenter(center)}><strong>Широта: </strong>{data.longitude}</div>
            {
                edit ?
                    <div>
                        <div>
                            <TextField value={inputsData.name} onChange={(e: ChangeEvent<HTMLInputElement>) => setInputsData({...inputsData, name: e.target.value})}  size='small' id="outlined-basic" label="Название" variant="outlined" />
                        </div>
                        <div>
                            <TextField value={inputsData.latitude} onChange={(e: ChangeEvent<HTMLInputElement>) => setInputsData({...inputsData, latitude: e.target.value})} size='small' id="outlined-basic" label="Широта" variant="outlined" />
                        </div>
                        <div>
                            <TextField value={inputsData.longitude} onChange={(e: ChangeEvent<HTMLInputElement>) => setInputsData({...inputsData, longitude: e.target.value})} size='small' id="outlined-basic" label="Долгота" variant="outlined" />
                        </div>
                    </div>
                : <Button onClick={() => setEdit(true)} size='small' variant="contained">Редактировать</Button>
            }
            {
                edit ? <Button onClick={() => updateItem(inputsData)} size='small' variant="contained">Подтвердить</Button>
                    :<Button onClick={() => deleteItem(data._id)} size='small' color='error' variant="contained">Удалить</Button>
            }
        </div>
    );
};

export default ListItem;