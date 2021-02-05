
var app = require('express')();
var http = require('http').createServer(app);
const PORT = 3000;
var io = require('socket.io')(http);
const next = require('next')


const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({dev})
const nextHandler = nextApp.getRequestHandler()

// var STATIC_CHANNELS = [{
//     name: 'Global chat',
//     participants: 0,
//     id: 1,
//     sockets: []
// }, {
//     name: 'Funny',
//     participants: 0,
//     id: 2,
//     sockets: []
// }];

var sliderState = [{
    slider1: 0,
    slider2: 0,
    slider3: 0,
    slider4: 0,
    slider5: 0
}];



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})

nextApp.prepare().then(() => {
    app.get('*', (req, res) => {
        return nextHandler(req, res)
    })

    http.listen(PORT, () => {
        console.log(`listening on *:${PORT}`);
    });
    
})



io.on('connection', (socket) => { // socket object may be used to send specific messages to the new connected client
    console.log('new client connected');
    socket.emit('connection', null);
    // socket.on('channel-join', id => {
    //     console.log('channel join', id);
    //     STATIC_CHANNELS.forEach(c => {
    //         if (c.id === id) {
    //             if (c.sockets.indexOf(socket.id) == (-1)) {
    //                 c.sockets.push(socket.id);
    //                 c.participants++;
    //                 io.emit('channel', c);
    //             }
    //         } else {
    //             let index = c.sockets.indexOf(socket.id);
    //             if (index != (-1)) {
    //                 c.sockets.splice(index, 1);
    //                 c.participants--;
    //                 io.emit('channel', c);
    //             }
    //         }
    //     });

    //     return id;
    // });
    // socket.on('send-message', message => {
    //     console.log('message', id);
    //     io.emit('message', message);
    // });

    // socket.on('disconnect', () => {
    //     STATIC_CHANNELS.forEach(c => {
    //         let index = c.sockets.indexOf(socket.id);
    //         if (index != (-1)) {
    //             c.sockets.splice(index, 1);
    //           //  c.participants--;
    //           //  io.emit('channel', c);
    //         }
    //     });
    // });

});




app.put('/publish', (req, res) => {
        console.log("PUBLISH CHANGE")
     //const sliderId = req.body.id;
       
     //  const sliderVal = req.body.values[0];

     const sliderId = 1;
     const sliderVal = 50;

       this.slider1 = sliderVal;
       res.status(200).json({id: sliderId, value: sliderVal});
       io.emit('valchange', sliderVal);
     
});