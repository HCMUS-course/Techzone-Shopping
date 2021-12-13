module.exports=getCurrentDate=()=>{
    return new Date().toISOString().slice(0, 10)
}
