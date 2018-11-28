var app=require('express')();
var http=require('http').Server(app);
var io=require('socket.io')(http);
var db=require('./src/db');

//作为socket的键值对存储
var users={};

http.listen(3000,function(){
    console.log('listening on *:3000');
});

io.sockets.on('connection',function (socket) {
    console.log('a user connected');
    socket.on('disconnect',function () {
        console.log('user disconnected');
    });
    //监听到登录事件
    socket.on('login',function (data) {
        //查询数据库，验证账号密码
        db.query('select * from User where account='+data.account,function (res) {
            if(res.length === 1){
                if(res[0].password === data.password){
                    //成功登录，存储登录socket键值对
                    if(data.account in users){

                    }else{
                        users[data.account]= socket;
                    }

                    //成功登录，发送账号信息
                    socket.emit('sureLogin',{
                        flag:true,
                        userInfo:{
                            account:res[0].account,
                            username:res[0].username
                        }
                    });

                    //将登录上线信息推送给好友
                    db.query('select * from friend where account='+data.account,(res2) => {
                        if(res2.length >= 1){
                            for(let item of res2){
                                db.query('select groupId from friend where account='+item.friendAccount+' and friendAccount='+item.account,function (res3) {
                                    if(res3.length === 1){
                                        if(item.friendAccount in users){
                                            users[item.friendAccount].emit('changeOnline',{
                                                flag:1,
                                                groupId:res3[0].groupId,
                                                account:item.friendAccount
                                            });
                                        }
                                    }
                                })
                            }
                        }
                    });

                    //修改账号状态
                    db.query('UPDATE user SET online=1 where account='+data.account,(res2) => {});
                    //获取并发送信息列表
                    //获取朋友列表
                    db.query('select * from friend where account='+data.account,function (res2) {
                        let msgList=[];
                        let count=0;
                        if(res2.length>=1){
                            for(let item of res2){
                                let thisMsg={};
                                thisMsg.id=item.friendAccount;
                                thisMsg.nonRead=item.nonRead;
                                thisMsg.lastMsg={};
                                //获取朋友名
                                db.query('select username from user where account='+item.friendAccount,function (res3) {
                                    if(res3.length === 1){
                                        thisMsg.name=res3[0].username;
                                        //获取信息列表
                                        db.query('select * from memory where memoryId='+item.memoryId+' order by time DESC',function (res4) {
                                            if(res4.length>=1){
                                                db.query('select username from user where account='+res4[0].talker,function (res5) {
                                                    if(res5.length === 1){
                                                        thisMsg.lastMsg.talker=res5[0].username;

                                                        var nowTime=new Date().Format('dd/MM/yyyy');
                                                        if(nowTime === res4[0].time.Format('dd/MM/yyyy')){
                                                            thisMsg.lastMsg.time=res4[0].time.Format('hh:mm');
                                                        }else{
                                                            thisMsg.lastMsg.time=res4[0].time.Format('yyyy/MM/dd');
                                                        }
                                                        thisMsg.lastMsg.msg=res4[0].msg;
                                                        msgList.push(thisMsg);
                                                        count+=1;
                                                        if(count === res2.length){
                                                            socket.emit('getMsgList',{
                                                                msgList:msgList
                                                            });
                                                        }
                                                    }
                                                })
                                            }else{
                                                msgList.push(thisMsg);
                                                count+=1;
                                                if(count === res2.length){
                                                    socket.emit('getMsgList',{
                                                        msgList:msgList
                                                    });
                                                }
                                            }
                                        })
                                    }
                                });
                            }
                        }else{
                            socket.emit('getMsgList',{
                                msgList:msgList
                            });
                        }
                    });
                    //获取并发送朋友群组表
                    db.query('select * from groups where account='+data.account,function (res2) {
                        let groupList=[];
                        let count=0;
                        if(res2.length >= 1){
                            for(let item of res2){
                                let thisGroup={};
                                let count2=0;
                                let onlineNum=0;
                                thisGroup.id=item.groupId;
                                thisGroup.groupName=item.groupName;
                                thisGroup.peopleNum=item.peopleNum;
                                thisGroup.peopleList=[];
                                db.query('select * from friend where account='+data.account+' and groupId='+item.groupId,function (res3) {
                                    if(res3.length >= 1){
                                        for(let item2 of res3){
                                            let thisFriend={};
                                            db.query('select username,online from user where account='+item2.friendAccount,function (res4) {
                                                if(res4.length === 1){
                                                    if(res4[0].online === 1){
                                                        onlineNum+=1;
                                                    }
                                                    thisFriend.name=res4[0].username;
                                                    thisFriend.id=res4[0].account;
                                                    thisGroup.peopleList.push(thisFriend);
                                                    count2+=1;
                                                    if(count2 === res3.length){
                                                        thisGroup.onlineNum=onlineNum;
                                                        groupList.push(thisGroup);
                                                        count+=1;
                                                    }

                                                    if(count === res2.length){
                                                        socket.emit('getGroupList',{
                                                            groupList:groupList
                                                        });
                                                    }
                                                }
                                            })
                                        }
                                    }else{
                                        thisGroup.onlineNum=onlineNum;
                                        groupList.push(thisGroup);
                                        count+=1;
                                        if(count === res2.length){
                                            socket.emit('getGroupList',{
                                                groupList:groupList
                                            });
                                        }
                                    }
                                })
                            }
                        }else{
                            socket.emit('getGroupList',{
                                groupList:groupList
                            });
                        }
                    });

                    //监听事件，发送历史消息
                    socket.on('getMemory',function (data2) {
                        db.query('select memoryId from friend where account='+data.account+' and friendAccount='+data2.friendAccount,function (res2) {
                            if(res2.length === 1){
                                db.query('select * from memory where memoryId='+res2[0].memoryId+' order by time desc',function (res3) {
                                    if(res3.length >= 1){
                                        let wordList=[];
                                        if(res3.length >5){
                                            for(let i=4;i>=0;i--){
                                                let thisWord={};
                                                let item=res3[i];
                                                db.query('select username from user where account='+item.talker,function (res4) {
                                                    if(res4.length === 1){
                                                        thisWord.name=res4[0].username;

                                                        var nowTime=new Date().Format('dd/MM/yyyy');
                                                        if(nowTime === item.time.Format('dd/MM/yyyy')){
                                                            thisWord.time=item.time.Format('hh:mm');
                                                        }else{
                                                            thisWord.time=item.time.Format('MM-dd');
                                                        }

                                                        thisWord.msg=item.msg;
                                                        wordList.push(thisWord);
                                                        if(i === 0){
                                                            socket.emit('sendMemory',{
                                                                wordList:wordList
                                                            });
                                                        }
                                                    }
                                                })
                                            }
                                        }else{
                                            for(let i=res3.length-1;i>=0;i--){
                                                let thisWord={};
                                                let item=res3[i];
                                                db.query('select username from user where account='+item.talker,function (res4) {
                                                    if(res4.length === 1){
                                                        thisWord.name=res4[0].username;

                                                        var nowTime=new Date().Format('dd/MM/yyyy');
                                                        if(nowTime === item.time.Format('dd/MM/yyyy')){
                                                            thisWord.time=item.time.Format('hh:mm');
                                                        }else{
                                                            thisWord.time=item.time.Format('MM-dd');
                                                        }

                                                        thisWord.msg=item.msg;
                                                        wordList.push(thisWord);
                                                        if(i === 0){
                                                            socket.emit('sendMemory',{
                                                                wordList:wordList
                                                            });
                                                        }
                                                    }
                                                })
                                            }
                                        }
                                    }else{
                                        socket.emit('sendMemory',{
                                            wordList:[]
                                        });
                                    }
                                })
                            }
                        })
                    });

                    //接收消息并发送给对方
                    socket.on('sendMsg',function (data2) {
                        db.query('select memoryId from friend where account='+data.account+' and friendAccount='+data2.talker,function (res2) {
                            if(res2.length === 1){
                                db.query('insert into memory(memoryId,talker,msg) values('+res2[0].memoryId+',"'+data.account+'","'+data2.msg+'")',function () {
                                    socket.emit('gotMsg',{
                                        flag:true
                                    });
                                })
                            }
                        })
                    });

                    //关闭连接的时候改变账号状态
                    socket.on('disconnect',function () {
                        //将账号状态修改推送给各个好友
                        db.query('select * from friend where account='+data.account,(res2) => {
                            if(res2.length >= 1){
                                for(let item of res2){
                                    db.query('select groupId from friend where account='+item.friendAccount+' and friendAccount='+item.account,function (res3) {
                                        if(res3.length === 1){
                                            if(item.friendAccount in users){
                                                users[item.friendAccount].emit('changeOnline',{
                                                    flag:0,
                                                    groupId:res3[0].groupId,
                                                    account:item.friendAccount
                                                });
                                            }
                                        }
                                    })
                                }
                            }
                        });

                        db.query('UPDATE user SET online=0 where account='+data.account,(res2) => {});
                        delete users[data.account];
                    });

                }else{
                    socket.emit('sureLogin',{
                        flag:false,
                        msg:'密码错误！'
                    });
                }
            }else{
                socket.emit('sureLogin',{
                    flag:false,
                    msg:'不存在此用户！'
                });
            }
        })
    });
})

//时间格式转换
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //Month
        "d+": this.getDate(), //Day
        "h+": this.getHours(), //Hour
        "m+": this.getMinutes(), //Minute
        "s+": this.getSeconds(), //Second
        "q+": Math.floor((this.getMonth() + 3) / 3), //Season
        "S": this.getMilliseconds() //millesecond
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
