const schedule = require('node-schedule');
const fs = require('fs');

module.exports.jobToSchedule = () => {
    const job = schedule.scheduleJob({hour: 21, minute: 00, dayOfWeek: 7}, function(){

        fs.readFile('/server/errors/errors.log', (err, data) => {
            
            if (err) {
              console.error(err)
              return
            }

            const buffer = data.toString('utf-8');
            const arrayOfObj = buffer.split('\n');
            arrayOfObj.forEach((item) => {
                if(item){
                    const end = item.indexOf("stackTrace");
                    const s = item.slice(0, end-2) + "}";
                    const obj = JSON.parse(s);
                    const content = {
                        message: obj.message,
                        code: obj.code,
                        time: obj.time,
                    };
                    const contentToString = JSON.stringify(content);
                    const date = new Date();
                    fs.appendFile(`/server/errors/logs/${date.getTime()}.log`, contentToString + '\n', (err) => {
                        if (err) {
                          console.error(err)
                          return
                        }
                    })
                }
            });
            
        });

        fs.truncate('/server/errors/errors.log', (err) => {
            if (err) {
                console.error(err)
                return
            }
            console.log("Old file is cleared!");
        })
    })
}