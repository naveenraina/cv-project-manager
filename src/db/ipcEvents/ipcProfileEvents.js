const mysqlProfileHelper = require('@/db/mysqlHelpers/mysqlProfileHelper');

export default class ipcProfileEvents {
    constructor() {
    }

    init(ipcMain, win) {
        ipcMain.on('profile:submit', function(e, data){
            mysqlProfileHelper.default.saveProfile(data, function(data){
              win.webContents.send('profile:submitsuccess', data)
            })
        })

      ipcMain.on('profile:get', function (e, userId) {
         mysqlProfileHelper.default.getProfile(userId, function(profile){
              win.webContents.send('profile:success', profile)
          })
        })


    }
}

