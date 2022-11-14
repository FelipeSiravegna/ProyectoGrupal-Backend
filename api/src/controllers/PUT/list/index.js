const { List, Movie }=require("../../../db");
const { getListByPk, getListAndContent } = require("../../GET/lists");
const { validateList } = require("../../POST/list");

const updateList = async (listId, name, description)=>{
    validateList(name, description);
    let newListData = {};
    const updatedData = [];
    if(name){
        updatedData.push("name");
        newListData.name=name;
    }
    if(description){
        updatedData.push("description");
        newListData.description=description;
    }
    const updatingList = await getListByPk(listId);
    if(updatingList.name===name)return{status:403, message:`The name is equal to the current one`};
    if(updatingList.description===description)return{status:403, message:`The description is equal to the current one`};
    const updateList = await updatingList.set(newListData);
    await updateList.save();
    return{status:200, message:`list ${updatedData.join(" & ")} updated`};
}

const validateAddMovie = (movieId, list)=>{
    //list is an array with the movie ids existing in the list where the user wants to add the movie
    if(list.length>1000){
        return{status:403, message:"The user reached the maximum list capacity (1000 movies)"};
    }
    else if (list.includes(movieId)){
        return{status:403, message:"This movie is already in the list"};
    }
}

const addMovieToList = async (listId, movieId)=>{
    const list = await await List.findByPk(listId, {
        attributes:[ "id", "name" ],
        through:{ attributes:[] },
        include:{
            model:Movie,
            attributes:["id"],
            through:{ attributes: [] }
        }
    });
    const movie = await Movie.findByPk(movieId);
    if(!list)return{status:500, message:"There was a problem to get the list data"};
    if(!movie)return{status:500, message:"There was a problem to get the movie data"};
    const moviesIdInList = list.movies.map(movie=>movie.id)
    const validation = validateAddMovie(parseInt(movieId), moviesIdInList);
    if(validation){
        return{status:validation.status, message:validation.message};
    }else{
        await list.addMovie(movie);
        return{status:200, message:`The movie "${movie.name}" was added to the list "${list.name}"`};
    }
}

const deleteMovieFromList = async(listId, movieId)=>{
    const beforeDeletionList = await List.findByPk(listId, {
        attributes:[ "id", "name" ],
        through:{ attributes:[] },
        include:{
            model:Movie,
            attributes:["id"],
            through:{ attributes: [] }
        }
    });
    console.log(beforeDeletionList);
    const checkIfMovieInList = beforeDeletionList.movies.map(m=>m.id).includes(parseInt(movieId));
    console.log(checkIfMovieInList)
    if(checkIfMovieInList===false){
        return {status:404, message:"This movie is not in the movie list"}
    }else{
        const list = await List.findByPk(listId);
        const movie = await Movie.findByPk(movieId);
        await list.removeMovie(movie);
        const checkIfDeleted = await getListAndContent(listId);
        if(checkIfDeleted.movies.length<beforeDeletionList.movies.length){
            return{status:200, message:`The movie "${movie.name}" was removed from the list "${list.name}"`}
        }else{
            return{status:500, message:`There was an error to remove the movie "${movie.name}" from the list "${list.name}"`}
        }
    }
}

const manageListBanning = async(listId, action)=>{
    const banningList = await getListByPk(listId);
    if(!banningList){
        return{status:404, message:"This list doesn't exists or there was a problem to get it"}
    }else{
        if(action==="bann"){
            if(!banningList.banned){
                const bannList = await banningList.update({banned:true});
                await bannList.save();
                return{status:200, message:`List (id: ${banningList.id}) banned`}
            }else{
                return{status:403, message:`List (id: ${banningList.id}) is banned already`}
            }
        }else{
            if(banningList.banned){
                const bannList = await banningList.update({banned:null});
                await bannList.save();
                return{status:200, message:`List (id: ${banningList.id}) unbanned`}
            }else{
                return{status:403, message:`List (id: ${banningList.id}) is not banned already`}
            }
        }
    }
}

const handleListDeletion = async (listId, action)=>{
    const deletingList = await getListByPk(listId);
    if(!deletingList){
        return{status:404, message:"This list doesn't exists or there was a problem to get it"}
    }else{
        if(action==="delete"){
            if(deletingList.active){
                const deleteList = await deletingList.update({active:false});
                await deleteList.save();
                return{status:200, message:`List (id: ${deletingList.id}) deleted`};
            }else{
                return{status:403, message:`List (id: ${deletingList.id}) is deleted already`};
            }
        }else{
            if(!deletingList.active){
                const deleteList = await deletingList.update({active:true});
                await deleteList.save();
                return{status:200, message:`Deletion of list (id: ${deletingList.id}) prevented`};
            }else{
                return{status:403, message:`List (id: ${deletingList.id}) was already active`};
            }
        }
    }
}

module.exports={
    updateList,
    addMovieToList,
    deleteMovieFromList,
    manageListBanning,
    handleListDeletion,
}
