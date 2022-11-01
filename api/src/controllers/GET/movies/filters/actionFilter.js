const actorsFilter = (array,actorsf) =>{
    return array.rows.filter((i)=>{
        if(i.actors.map((j)=>{
            return actorsf.includes(j.name)}).filter((h)=> {
                return h==true}).length == actorsf.length){
                    return i}})}

module.exports={actorsFilter}