const MO = function (funResponse, funHeaders, funResult) {
    funResponse.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': 'http://localhost:8080', 'Access-Control-Allow-Credentials': 'true'})
    funResponse.write(funResult)
    funResponse.end()
}

module.exports = MO