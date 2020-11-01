const mysqlhelper = require('@/db/mysqlHelpers/mysqlProjectHelper');

export default class ipcProjectEvents {
  constructor() {
  }

  init(ipcMain, win){
    
    ipcMain.on('project:new', function(e, data){    
      mysqlhelper.default.saveproject(data, function(data){
        win.webContents.send('project:newsuccess', data)
      })
    })
    
    ipcMain.on('projects:get', function(e){
      mysqlhelper.default.getProjects(function(projects){
          win.webContents.send('projects:success', projects)
      })
    })
    ipcMain.on('project:edit', function(e, data){
      mysqlhelper.default.editProject(data, function(response){
          win.webContents.send('project:editsuccess', response)
      })
    })
    ipcMain.on('project:delete', function(e, id){
      mysqlhelper.default.deleteProject(id, function(response){
          win.webContents.send('project:deletesuccess', response)
      })
    })

    ipcMain.on('project:new', function(e, data){    
      mysqlhelper.default.saveproject(data, function(data){
        win.webContents.send('project:newsuccess', data)
      })
    })

  }

}