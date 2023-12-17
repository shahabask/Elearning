// socket.js
import io from 'socket.io-client';

const ENDPOINT = 'https://www.skillsync.website/api';
const socket = io(ENDPOINT);

export default socket;
