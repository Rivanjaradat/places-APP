export const ADD_PLACE='ADD_PLACE';
export const addPlace=(title ,image)=>{
    return {type:ADD_PLACE, placeData:{title:title,image:image}};
}