const getRequest = (req, res) => {
    res.send('message delivery')
    console.log('message sent to server');
}

const getCookies = (req, res) => {
    res.setHeader('Set-Cookie', 'newUserCookie=true')
    res.send('you have a new cookie');
    console.log('cookie sent to server');
}


module.exports = {
    getRequest,
    getCookies,
}