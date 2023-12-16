// socket.js
import io from 'socket.io-client';

const ENDPOINT = 'http://skillsync.website';
const socket = io(ENDPOINT);

export default socket;
