const mysqlWorkHelper = require('@/db/mysqlHelpers/mysqlWorkHelper');

export default class ipcWorkEvents {
    constructor() {
    }
    init(ipcMain, win) {
        ipcMain.on('work:submit', function(e, data){
            mysqlWorkHelper.default.saveWork(data, function(data){
              win.webContents.send('work:submitsuccess', data)
            })
        })

        ipcMain.on('work:get', function (e, userId) {
          mysqlWorkHelper.default.getWork(userId, function(work){
               win.webContents.send('work:success', work)
           })
         })

    }

}

