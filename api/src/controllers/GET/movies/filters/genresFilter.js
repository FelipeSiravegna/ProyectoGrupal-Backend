const genresFilter = (array,genres) =>{
    return array.rows.filter((i)=>{
        if(i.genres.map((j)=>{
            return genres.includes(j.name)}).filter((h)=> {
                return h==true}).length == genres.length){
                    return i}})}

module.exports = { genresFilter }


