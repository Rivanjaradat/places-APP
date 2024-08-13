import Place from "../models/place";
import { SET_PLACES, ADD_PLACE } from "./places-actions";
const initialState ={
    places: [],

};
export default (state = initialState, action) => {

    switch(action.type){
        case SET_PLACES:
            return{
                places: action.places.map(
                    pl=> new Place(pl.id.toString(),pl.title,pl.imageUri,pl.address,pl.lat,pl.lng)
                )
            };
        case ADD_PLACE:
           const newPlace=new Place(
                new Date().toString(),
                action.placeData.title,
                action.placeData.image,
                action.placeData.address,
                action.placeData.coords.lat,
                action.placeData.coords.lng

              );
                return{
                    places: state.places.concat(newPlace)
                };
       default:    return state;
    }

};