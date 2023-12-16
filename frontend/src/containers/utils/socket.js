// socket.js
import io from 'socket.io-client';

const ENDPOINT = 'http://3.111.231.253:5000';
const socket = io(ENDPOINT);

export default socket;
