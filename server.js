const http = require('http');
const url = require('url');
const handler = require('./controller/router');
const NotFoundRouting = require('./controller/handle/notFoundRouting');


function getUrl(req) {
    const urlParse = url.parse(req.url,true);
    const pathName = urlParse.pathname;
    return pathName.split('/');
}
const server = http.createServer((req, res) => {
    const arrPath = getUrl(req);
    let trimPath = '';
    let id;
    if (arrPath.length > 2) {
        trimPath = arrPath[1] + '/' + arrPath[2];
    } else {
        trimPath = arrPath[arrPath.length - 1];
    }
    id = +arrPath[arrPath.length - 1];
    let chosenHandle;
    if (typeof handler[trimPath] ==='undefined') {
        chosenHandle = NotFoundRouting.showNotFound
    } else {
       chosenHandle = handler[trimPath];
    }
    chosenHandle(req,res,id);

})
server.listen(8080,()=>{
    console.log('Server is running!!!');
})