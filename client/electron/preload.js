const {ipcRenderer, contextBridge} = require('electron')
const notifier = require('node-notifier');

const showNotification = ({message, sender})  => {
  notifier.notify({
    title: sender,
    message,
    sound: true,
    wait: true
  });
}

contextBridge.exposeInMainWorld("myApp", {
  sayHello: (arg) => {
    showNotification(arg)
  },
  send: (channel, data) => {
    // let validChannels = ["toMain"];
    // if (validChannels.includes(channel)) {
      console.log(data)
      ipcRenderer.send('toMain', 'data');
    // }
  }
  // receive: (channel, func) => {
  //   let validChannels = ["fromMain"];
  //   if (validChannels.includes(channel)) {
  //     ipcRenderer.on(channel, (event, ...args) => func(...args));
  //   }
  // }
})