import React, {Dispatch, FC, SetStateAction} from 'react';
import ListItem from "./ListItem";
import {IMark} from "../../store/reducers/MainSlice";

export interface IList {
    setCenter: Dispatch<SetStateAction<Array<number>>>,
    data: IMark[]
}

const List: FC<IList> = ({setCenter, data}) => {
    return (
        <div>
            {data.map( (item) => <ListItem data={item} setCenter={setCenter} key={item._id} />   )}
        </div>
    );
};

export default List;