const popularityFilter = (array,popularity) =>{
    if (popularity==="ASC"){
        return array.rows.sort(function(a,b){
            if(a.popularity>b.popularity){
                return -1
            }
            if(a.popularity<b.popularity){
                return 1
            }
            return 0
        })
    }
    else {
            return array.rows.sort(function(a,b){
                if(a.popularity>b.popularity){
                    return 1}
                if(a.popularity<b.popularity){
                    return -1}
                return 0
                })
    }
}
module.exports={popularityFilter}