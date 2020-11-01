const mysqlTaskHelper = require('@/db/mysqlHelpers/mysqlTaskHelper');
export default class ipcTaskEvents {
  constructor() {
  }

  init(ipcMain, win){
    ipcMain.on('tasks:get', function(e, filter){
      mysqlTaskHelper.default.getTasks(filter, function(tasks){
          win.webContents.send('tasks:success', tasks)
      })
    })

    ipcMain.on('tasks:getuserassigned', function(e, userId){
      mysqlTaskHelper.default.getTasksAssignedToUser(userId, function(tasks){
          win.webContents.send('tasks:userassignedsuccess', tasks)
      })
    })
    ipcMain.on('task:submit', function(e, data){    
      mysqlTaskHelper.default.saveTask(data, function(data){
        win.webContents.send('task:submitsuccess', data)
      })
    })
    ipcMain.on('task:delete', function(e, id){
      mysqlTaskHelper.default.deleteTask(id, function(response){
          win.webContents.send('task:deletesuccess', response)
      })
    })

    ipcMain.on('task:move', function(e, data){
      mysqlTaskHelper.default.moveTask(data, function(response){
          win.webContents.send('task:movesuccess', response)
      })
    })

  }

}