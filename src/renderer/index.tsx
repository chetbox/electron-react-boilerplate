import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<App />);

// // calling IPC exposed from preload script
// window.electron.ipcRenderer.once('ipc-example', (arg) => {
//   // eslint-disable-next-line no-console
//   console.log(arg);
// });
// window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);

import * as S from 'serialport'
console.log(S)

import { SerialPort } from 'serialport'
import tableify from 'tableify'

async function listSerialPorts() {
  await SerialPort.list().then((ports) => {
    document.getElementById('error')!.textContent = ''
    console.log('ports', ports);

    if (ports.length === 0) {
      document.getElementById('error')!.textContent = 'No ports discovered'
    }

    const tableHTML = tableify(ports)
    document.getElementById('ports')!.innerHTML = tableHTML
  }).catch((err) => {
    document.getElementById('error')!.textContent = err.message
  })
}

function listPorts() {
  listSerialPorts();
  setTimeout(listPorts, 2000);
}

// Set a timeout that will check for new serialPorts every 2 seconds.
// This timeout reschedules itself.
setTimeout(listPorts, 2000);

listSerialPorts()
