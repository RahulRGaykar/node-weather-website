const request=require('postman-request')

const geocode = (address,callback)=>{
    const url= 'http://api.weatherstack.com/current?access_key=737d6fecbbb765b0bee38f0349c3c03f&query='+address

    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to location service!',undefined)
        }
        else{
            callback(undefined,{
                type:response.body.request.type,
                query:response.body.request.query
            })    
        }
    })
}

module.exports=geocode