const mysqlhelper = require('@/db/mysqlhelper');

export default class ipcTaskEvents {
  constructor() {
  }

  init(ipcMain, win){
    ipcMain.on('tasks:get', function(e, filter){
      mysqlhelper.default.getTasks(filter, function(tasks){
          win.webContents.send('tasks:success', tasks)
      })
    })

    ipcMain.on('tasks:getuserassigned', function(e, userId){
      mysqlhelper.default.getTasksAssignedToUser(userId, function(tasks){
          win.webContents.send('tasks:userassignedsuccess', tasks)
      })
    })
    ipcMain.on('task:submit', function(e, data){    
      mysqlhelper.default.saveTask(data, function(data){
        win.webContents.send('task:submitsuccess', data)
      })
    })
    ipcMain.on('task:delete', function(e, id){
      mysqlhelper.default.deleteTask(id, function(response){
          win.webContents.send('task:deletesuccess', response)
      })
    })

    ipcMain.on('task:move', function(e, data){
      mysqlhelper.default.moveTask(data, function(response){
          win.webContents.send('task:movesuccess', response)
      })
    })

  }

}