const mysqlhelper = require('@/db/mysqlHelpers/mysqlDailyStatusHelper');

export default class ipcDailyStatusEvents {
  constructor() {
  }

  init(ipcMain, win){
    
    ipcMain.on('todaysdailystatus:get', function(e, userId){    
      mysqlhelper.default.gettodaysdailystatus(userId, function(data){
        win.webContents.send('todaysdailystatus:success', data)
      })
    })

    ipcMain.on('yesterdaysdailystatus:get', function(e, userId){    
      mysqlhelper.default.getyesterdaysdailystatus(userId, function(data){
        win.webContents.send('yesterdaysdailystatus:success', data)
      })
    })

    ipcMain.on('dailystatus:submit', function(e, data){    
      mysqlhelper.default.savedailystatus(data, function(data){
        win.webContents.send('dailystatus:success', data)
      })
    })


  }

}