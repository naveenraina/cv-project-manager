const mysqlhelper = require('@/db/mysqlHelpers/mysqlUserHelper');

export default class ipcUserEvents {
  constructor() {
  }

  init(ipcMain, win){
    
    ipcMain.on('login:submit', function(e, data){    
        mysqlhelper.default.login(data.username, data.password, function(data){
          win.webContents.send('login:success', data)
        })
    })

    ipcMain.on('users:get', function(e){
      mysqlhelper.default.getUsers(function(users){
          win.webContents.send('users:success', users)
      })
    })

  }

}