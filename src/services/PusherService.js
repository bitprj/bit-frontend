import Pusher from 'pusher-js'
import { setPusherClient } from 'react-pusher'

const pusherClient = new Pusher(process.env.PUSHER_KEY, {
	clustor: process.env.PUSHER_CLUSTER,
	authEndpoint: 'https://darlene-autograder.herokuapp.com/uploader/cli',
	forceTLS: true
})

setPusherClient(pusherClient)
