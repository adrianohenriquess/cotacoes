const request = require('request')

const api_token = 'b3b2fda004d30d93b000b7bcdfefab42'

const cotacao = (symbol, callback) => {
    
    const url = `http://api.marketstack.com/v1/eod?access_key=${api_token}&symbols=${symbol}`
    
    request({url: url, json: true}, (err, response) =>{
        if(err){
            callback({
                        message : `Something went wrong: ${err}`,
                        code : 500
                    }, undefined)
        }        
        
        if(response.body === undefined || response.body.data === undefined){
            callback({
                        message : `No data found`,
                        code : 404    
                    }, undefined);
        }        
        
        const parsedJSON = response.body.data[0]

        const {symbol, open, close, high, low} = parsedJSON; //destrutor

        callback(undefined, {symbol, open, close, high, low});
    })
}

module.exports = cotacao