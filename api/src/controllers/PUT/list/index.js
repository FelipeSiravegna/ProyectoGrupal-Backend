const { List, Movie }=require("../../../db");
const { getList, getUserListS } = require("../../../controllers/GET/lists");

const validateList = (name, description)=>{
    if (!name||name.length===0){
        return{status:400, message:"The name of the list is needed"};
    }
    else if (name.length>30){
        return{status:400, message:"The name of the list can't be longer than 30 characters"};
    }
    else if(description){
        if (description.length>500){
            return{status:400, message:"The description can't contain more than 500 characters"};
        }
    } 
}

const createList = async(userId, name, description)=>{
    const validation = validateList(name, description);
    if(validation){
        return {status:validation.status, message:validation.message}
    }else{
        const userLists = await getUserListS(userId);
        const userListsIds = await userLists.lists.map(list=>list.name);
        const existingUserList = await userListsIds.includes(name);
        if(existingUserList){
            return {status:403, message:`The user has another movie list named ${name}`}
        }else{
    
        }
    }
}

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
    const updatingList = await getList(listId);
    if(updatingList.name===name){
        return{status:403, message:`The name is equal to the current one`}
    }
    if(updatingList.description===description){
        return{status:403, message:`The description is equal to the current one`}
    }
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
    const list = await getList(listId);
    const movie = await Movie.findByPk(movieId);
    if(!list){
        return{status:500, message:"There was a problem to get the list data"};
    }
    if(!movie){
        return{status:500, message:"There was a problem to get the movie data"};
    }
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
    const beforeDeletionList = await getList(listId);
    const checkIfMovieInList = beforeDeletionList.movies.map(m=>m.id).includes(parseInt(movieId));
    console.log(checkIfMovieInList)
    if(checkIfMovieInList===false){
        return {status:404, message:"This movie is not in the movie list"}
    }else{
        const list = await List.findByPk(listId);
        const movie = await Movie.findByPk(movieId);
        await list.removeMovie(movie);
        const checkIfDeleted = await getList(listId);
        if(checkIfDeleted.movies.length<beforeDeletionList.movies.length){
            return{status:200, message:`The movie "${movie.name}" was removed from the list "${list.name}"`}
        }else{
            return{status:500, message:`There was an error to remove the movie "${movie.name}" from the list "${list.name}"`}
        }
    }
}

const manageListBanning = async(listId, action)=>{
    const banningList = await List.findByPk(listId);
    if(!banningList){
        return{status:404, message:"This list doesn't exists or there was a problem to get it"}
    }else{
        if(action==="bann"){
            if(!banningList.banned){
                const bannList = await banningList.update({banned:true});
                await bannList.save();
                return{status:200, message:`List (id: ${banningList.id}) banned`}
            }else{
                return{status:403, message:`List (id: ${banningList.id} is banned already)`}
            }
        }else{
            if(banningList.banned){
                const bannList = await banningList.update({banned:null});
                await bannList.save();
                return{status:200, message:`List (id: ${banningList.id}) unbanned`}
            }else{
                return{status:403, message:`List (id: ${banningList.id} is not banned already)`}
            }
        }
    }
}

const handleListDeletion = async (listId, action)=>{
    const deletingList = await List.findByPk(listId);
    if(!banningList){
        return{status:404, message:"This list doesn't exists or there was a problem to get it"}
    }else{
        if(action==="delete"){
            if(deletingList.active){
                const deleteList = await deletingList.update({active:false});
                await deleteList.save();
                return{status:200, message:`List (id: ${deletingList.id}) banned`};
            }else{
                return{status:403, message:`List (id: ${deletingList.id} is banned already)`};
            }
        }else{
            if(!deletingList.active){
                const deleteList = await deletingList.update({active:true});
                await deleteList.save();
                return{status:200, message:`Deletion of list "${deletingList.name}" prevented`};
            }else{
                return{status:403, message:`List "${deletingList.name}" is already active`};
            }
        }
    }
}

module.exports={
    createList,
    updateList,
    addMovieToList,
    deleteMovieFromList,
    manageListBanning,
    handleListDeletion,
}