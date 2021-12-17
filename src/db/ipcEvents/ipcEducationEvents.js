const mysqlEducationHelper = require('@/db/mysqlHelpers/mysqlEducationHelper');

export default class ipcEducationEvents {
    constructor() {
    }

    init(ipcMain, win) {
        ipcMain.on('education:submit', function(e, data){
            mysqlEducationHelper.default.saveEducation(data, function(data){
              win.webContents.send('education:submitsuccess', data)
            })
        })

        ipcMain.on('education:get', function (e, userId) {
          mysqlEducationHelper.default.getEducation(userId, function(education){
               win.webContents.send('education:success', education)
           })
         })


    }
}