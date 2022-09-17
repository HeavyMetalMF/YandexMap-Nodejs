import React, {FC, useEffect, useState} from 'react';
import AddItem from "./addItem/AddItem";
import List from "../list/List";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {getMarks} from "../../store/reducers/MainSlice";
import '../../App.css';
import {Button} from "@mui/material";
import {useAuth} from "../../context/AuthProvider";
import {Placemark, YMaps, Map} from "@pbe/react-yandex-maps";

const Main: FC = () => {
    const {setToken} = useAuth()
    const [center, setCenter] = useState<Array<number>>([0, 0]);
    const {marks} = useAppSelector(state => state.MainSlice);
    const dispatch = useAppDispatch();

    const userId = localStorage.getItem('userId')

    const state = {
        center: center, zoom: 13
    }

    useEffect(() => {
        dispatch(getMarks(userId));
        navigator.geolocation.getCurrentPosition((e) => {
            setCenter([e.coords.latitude, e.coords.longitude])
        }, (e) => console.log(e), {enableHighAccuracy: true})
    }, [])
    const quit = () => {
        localStorage.removeItem('userId')
        setToken('');
    }

    return (
        <>
            <Button onClick={() => quit()} className={'quit'} variant="contained" >Выйти</Button>
            <AddItem />
            <div className='app'>
                <List data={marks} setCenter={setCenter}/>
                <YMaps query={{ apikey: "169aa46b-b6e7-40e8-9f51-f9d02a6af176" , load: "package.full"}}>
                    <div>
                        <Map modules={["geolocation"]} height={400} width={700} state={state} >
                            {
                                marks.map(mark =>
                                    {
                                        const point: Array<number>= [Number(mark.latitude), Number(mark.longitude)]
                                        return <Placemark key={mark._id} geometry={point} modules={["geoObject.addon.balloon"]} properties={
                                            {
                                                balloonContent: `<div>${mark.name}</div>`,
                                            }
                                        } />
                                    }
                                )
                            }
                        </Map>
                    </div>
                </YMaps>
            </div>
        </>
    );
};

export default Main;