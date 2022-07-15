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
    ipcMain.on('tasks:report', function(e, filter){
      mysqlTaskHelper.default.searchOnDate(filter, function(tasks){
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

    ipcMain.on('notes:get', function(e, taskid){
      mysqlTaskHelper.default.getNotes(taskid, function(response){
          win.webContents.send('notes:getsuccess', response)
      })
    })

    ipcMain.on('note:save', function(e, note){
      mysqlTaskHelper.default.saveNote(note, function(response){
          win.webContents.send('note:savesuccess', response)
      })
    })

    ipcMain.on('note:delete', function(e, id){
      mysqlTaskHelper.default.deleteNote(id, function(response){
          win.webContents.send('note:deletesuccess', response)
      })
    })

    ipcMain.on('task:saveSequence', function(e, data){
      mysqlTaskHelper.default.saveSequence(data, function(response){
          win.webContents.send('task:saveSequencesuccess', response)
      })
    })

  }

}