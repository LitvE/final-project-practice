const schedule = require('node-schedule');
const fs = require('fs');

module.exports.jobToSchedule = () => {
    const rule = new schedule.RecurrenceRule();
    rule.hour = 23;
    rule.minute = 59;
    rule.dayOfWeek = 0;
    rule.tz = 'Europe/Kiev';

    const job = schedule.scheduleJob(rule, function(){
        fs.readFile('/server/errors/errors.log', (err, data) => {
            if (err) {
              console.error(err);
              return
            } else {
                const date = new Date();
                fs.writeFile(`/server/errors/logs/${date.getTime()}.log`, '', function(err){
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Файл создан");
                    }
                });

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
                        
                        fs.appendFile(`/server/errors/logs/${date.getTime()}.log`, contentToString + '\n', (err) => {
                            if (err) {
                            console.error(err);
                            return
                            }
                        })
                    }
                });

                fs.truncate('/server/errors/errors.log', (err) => {
                    if (err) {
                        console.error(err);
                        return
                    }
                    console.log("Old file is cleared!");
                });
            }  
        });
    })
    return job;
}