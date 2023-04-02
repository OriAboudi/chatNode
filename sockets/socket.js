const iosock = require("socket.io");

exports.CreateSocket = (_server) => {
  // מייצר לנו סוקט שיודע להאזין ולשדר אירועים לצד לקוח
  // פרמטר שני , אוביירט שמגדיר קורס שכל דומיין מצד לקוח יכול ליצור אתנו קשר
  const io = iosock(_server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  })
  createChatSocket(io);
}

const createChatSocket = (io) => {
  // מאזין להתחברות ראשונית של מחשב כלשהו מצד לקוח שהתחבר
  // להאזנה לשרת
  io.on("connection", (socket) => {
    console.log("connect from client");
    // מאזין לאבינט מהצד לקוח של קליינט אינפוט
    socket.on("clientInput", (msg) => {
      console.log("client input ", msg)
      // משגר אירוע לכל מי שמאזין לסוקט
      io.sockets.emit("nodejsEvent", msg)
    })

    socket.on("chatInput", (item) => {
      console.log("chatInput");
      io.sockets.emit("chatNode", item)
    })
    // socket.on("clientInputPro", (item) => {
    //   console.log("client input pro ",item)
    //   // משגר אירוע לכל מי שמאזין לסוקט
    //   io.sockets.emit("nodejsEventPro",item)
    // })
  })
}