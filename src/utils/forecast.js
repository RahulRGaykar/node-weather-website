const request=require('postman-request')

const forecast = (Latitude,Longitude,callback)=>{

    const url='http://api.weatherstack.com/current?access_key=737d6fecbbb765b0bee38f0349c3c03f&query='+Latitude+','+Longitude
    
    console.log(url)

    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect location service',undefined)
        }
        else if(response.request.uri.protocol.length===0){
            callback('Unable to find location',undefined)
        }
        else{
            callback(undefined,{
                protocol : response.request.uri.protocol
            })
        }
    })
}

module.exports=forecast