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

    ipcMain.on('users:get', function(e,filter){
      mysqlhelper.default.getUsers(filter,function(users){
          win.webContents.send('users:success', users)
      })
    })
    ipcMain.on('user:delete', function(e, id){
      mysqlhelper.default.deleteUser(id, function(response){
          win.webContents.send('user:deletesuccess', response)
      })
    })
    ipcMain.on('user:submit', function(e, data){    
      mysqlhelper.default.saveUser(data, function(data){
        win.webContents.send('user:submitsuccess', data)
      })
    })
    
    ipcMain.on('user:edit', function(e, data){    
      mysqlhelper.default.editUser(data, function(data){
        win.webContents.send('user:editsuccess', data)
      })
    })
  }
  
}