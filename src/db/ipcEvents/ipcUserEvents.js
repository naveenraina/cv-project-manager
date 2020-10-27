const mysqlhelper = require('@/db/mysqlhelper');

export default class ipcUserEvents {
  constructor() {
  }

  init(ipcMain, win){
    
    ipcMain.on('login:submit', function(e, data){    
        mysqlhelper.default.login(data.username, data.password, function(data){
          win.webContents.send('login:success', data)
        })
    })

    ipcMain.on('project:new', function(e, data){    
      mysqlhelper.default.saveproject(data, function(data){
        win.webContents.send('project:newsuccess', data)
      })
    })

    ipcMain.on('users:get', function(e){
      mysqlhelper.default.getUsers(function(users){
          win.webContents.send('users:success', users)
      })
    })

  }

}