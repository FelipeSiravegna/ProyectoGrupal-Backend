const directorFilter = (array,directorf) =>{
    return array.rows.filter((i)=>{
        if(i.director.name==directorf){
                    return i}})}

module.exports = { directorFilter }