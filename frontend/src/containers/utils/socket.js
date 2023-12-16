// socket.js
import io from 'socket.io-client';

const ENDPOINT = ['http://www.skillsync.website/api','http://skillsync.website/api'];
const socket = io(ENDPOINT);

export default socket;
