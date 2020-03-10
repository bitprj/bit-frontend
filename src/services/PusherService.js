import Pusher from 'pusher-js'
import { setPusherClient } from 'react-pusher'

const pusherClient = new Pusher(process.env.PUSHER_KEY, {
	clustor: process.env.PUSHER_CLUSTER,
	forceTLS: true
})

setPusherClient(pusherClient)
