let { Server:SocketIO } = require('socket.io')

class Socket {
    static instancia;
    constructor(http){
        if(Socket.instancia){
            return Socket.instancia
        }
        Socket.instancia = this;
        this.io = new SocketIO(http);
        this.mensajes = []
        this.usuarios = []
    }

    init(){
        try {
            this.io.on('connection', socket=>{
                console.log('usuario conectado')
                this.io.sockets.emit('init', this.mensajes);

                // escuchamos el mensaje del usuario y lo emitimos
                socket.on('mensaje', data=>{
                    this.mensajes.push({...data})
                    this.io.sockets.emit('nuevomensaje',this.mensajes)
                })
            })
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = Socket;