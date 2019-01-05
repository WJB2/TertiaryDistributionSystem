const express = require('express');
const app = express();

//解析表单的插件
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}))


//创建数据库连接对象
const mysql = require('mysql');
const conn = mysql.createConnection({
    host: '103.214.167.8', //数据库地址
    user: 'hg', //账号
    password: '11111111', //密码
    database: 'Chaomeng', //库名
    multipleStatements: true //允许执行多条语句
});
app.use(bodyParser.json())
const get_ip = require('ipware')().get_ip;
app.get('',(req,res)=>{
    let ip_info = get_ip(req);
    let date = new Date();
  console.log (ip_info.clientIp+'  '+date)
    res.send('<h3>'+'淮哥很累！'+'<br/>'+ ip_info.clientIp+'<br/>'+date+'</h3>') })

//---------------------------总代权限
//查询所有客户数据
app.get('/api/getAllCus', (req, res) => {

   
    const sqlStr = 'SELECT *   FROM  ` customer_tb` '
    conn.query(sqlStr, (err, results) => {
        if (err) return res.json({
            err_code: 1,
            message: '数据不存在',
            affextedRows: 0
        })
        res.json({
            err_code: 200,
            message: results,
            affextedRows: results.affextedRows
        })

    })
});
//查询所有业务员数据
app.get('/api/getAllUser', (req, res) => {
    const sqlStr = 'SELECT * \n' +
        'FROM  `user_tb` '
    conn.query(sqlStr, (err, results) => {
        if (err) return res.json({
            err_code: 1,
            message: '数据不存在',
            affextedRows: 0
        })
        res.json({
            err_code: 200,
            message: results,
            affextedRows: results.affextedRows
        })
    })
});

//查询所有收银音响激活数据数据
app.get('/api/getAllyx', (req, res) => {
    const sqlStr = 'SELECT * \n' +
        'FROM  `shouyingyinxiangjihuo_tb` '
    conn.query(sqlStr, (err, results) => {
        if (err) return res.json({
            err_code: 1,
            message: '数据不存在',
            affextedRows: 0
        })
        res.json({
            err_code: 200,
            message: results,
            affextedRows: results.affextedRows
        })
    })
});

//查询所有今日新增数据
app.get('/api/getAlltdn', (req, res) => {
    const sqlStr = 'SELECT * \n' +
        'FROM  `todaynew_tb` '
    conn.query(sqlStr, (err, results) => {
        if (err) return res.json({
            err_code: 1,
            message: '数据不存在',
            affextedRows: 0
        })
        res.json({
            err_code: 200,
            message: results,
            affextedRows: results.affextedRows
        })

        //conn.release();
    })
});
//查询所有台卡数据
app.get('/api/getAlltk', (req, res) => {
    const sqlStr = 'SELECT * \n' +
        'FROM  `salemantaika_tb` '
    conn.query(sqlStr, (err, results) => {
        if (err) return res.json({
            err_code: 1,
            message: '数据不存在',
            affextedRows: 0
        })
        res.json({
            err_code: 200,
            message: results,
            affextedRows: results.affextedRows
        })
    })
});

//分配上级和设置密码
app.post('/api/setInformation', (req, res) => {
    const name = req.body.aid
    const psw = req.body.psw
    const bigaid=req.body.bigaid
    var Sql_Params = [bigaid, psw,name];
    console.log(req.query)
    const sqlStr = 'UPDATE  user_tb SET  bigaid =  ? ,psw =  ? WHERE aid =  ?'
    conn.query(sqlStr, Sql_Params, (err, results) => {
        if (err) return res.json({
            err_code: 1,
            message: '错误',
            affextedRows: 0
        })
        res.json({
            err_code: 200,
            message: '分配上级和密码成功！',
            affextedRows: results.affextedRows
        })
    })
});

//设置分润点
app.post('/api/setpoint', (req, res) => {
    const point = req.body.point  //值：0.01-1
    const bigaid=req.body.bigaid
    var Sql_Params = [point, bigaid,bigaid];
    console.log(req.query)
    const sqlStr = 'UPDATE  user_tb SET  profitpoint =  ?  WHERE bigaid =  ? or aid =? '
    conn.query(sqlStr, Sql_Params, (err, results) => {
        if (err) return res.json({
            err_code: 1,
            message: '错误',
            affextedRows: 0
        })
        res.json({
            err_code: 200,
            message: '设置分润点操作完成！',
            affextedRows: results.affectedRows
        })
console.log(results)
    })
});

//---------------------------中层代理权限-------------------------




//查询指定下级的顾客信息
app.post('/api/getCuslist', (req, res) => {
    const number = req.body.bigaid
    var Sql_Params = [number, number];
    console.log(req.query)
    const sqlStr = 'select * from ` customer_tb` where   aid in  (SELECT  aid  FROM `user_tb` WHERE bigaid= ?  ) or aid =?'
    conn.query(sqlStr, Sql_Params, (err, results) => {
        if (err) return res.json({
            err_code: 1,
            message: '数据不存在',
            affextedRows: 0
        })
        res.json({
            err_code: 200,
            message: results,
            affextedRows: results.affectedRows
        })
    })
});

//查询指定代理下的员工数据
app.post('/api/getSelemanlist', (req, res) => {
    const number = req.body.bigaid
    var Sql_Params = [number, number];
    console.log(req.query)
    var sqlStr = 'select * from `user_tb` where   bigaid = ?  or aid=?  '

    conn.query(sqlStr, Sql_Params, (err, results) => {
        if (err) return res.json({
            err_code: 1,
            message: '数据不存在',
            affextedRows: 0
        })
        res.json({
            err_code: 200,
            message: results,
            affextedRows: results.affectedRows
        })
    })
});
//查询指定aid的员工数据
app.post('   ', (req, res) => {
    const number = req.body.aid
  var Sql_Params = [number];
    console.log(req.query)
    var reg = /^[\u4e00-\u9fa5]+$/;
    var sqlStr = "SELECT * FROM `user_tb` WHERE   aid= "+mysql.escape(number)
    if (reg.test(number)){
        var sqlStr = "SELECT * FROM `user_tb` WHERE   name LIKE "+mysql.escape("%"+number+"%")
    }

    // if (number=="29150"){
    //     sqlStr = 'SELECT *   FROM  `user_tb` '
    //     console.log ("总代账号")
    // }Sql_Params,

    conn.query(sqlStr, (err, results) => {
        if (err) return res.json({
            err_code: 1,
            message: '数据不存在',
            affextedRows: err
        })
        res.json({
            err_code: 200,
            message: results,
            affextedRows: results.affectedRows
        })

    })
});

//查询指定员工台卡数据
app.post('/api/getTKlist', (req, res) => {
    const number = req.body.bigaid
    var Sql_Params = [number, number];
    var sqlStr = 'select * from `salemantaika_tb` where   aid in  (SELECT  aid  FROM `user_tb` WHERE bigaid= ? )  or aid =? '
// if (number=="29150"){
//     var  sqlStr = 'SELECT *   FROM  `salemantaika_tb` '
//     console.log ("总代账户号")
// }

    conn.query(sqlStr, Sql_Params, (err, results) => {
        if (err) return res.json({
            err_code: 1,
            message: '数据不存在',
            affextedRows: 0
        })
        res.json({
            err_code: 200,
            message: results,
            affextedRows: results.affextedRows
        })
    })
});

//查询指定员工收银音响数据
app.post('/api/getSYYXlist', (req, res) => {
    const number = req.body.bigaid
    var Sql_Params = [number, number];
    var sqlStr = 'select * from `shouyingyinxiangjihuo_tb` where   salesmanaid in  (SELECT  aid  FROM `user_tb` WHERE bigaid= ? ) or aid=?  '
    // if (number=="29150"){
    //     var sqlStr = 'SELECT *   FROM  `shouyingyinxiangjihuo_tb` '
    // }
    conn.query(sqlStr, Sql_Params, (err, results) => {
        if (err) return res.json({
            err_code: 1,
            message: '数据不存在',
            affextedRows: 0
        })
        res.json({
            err_code: 200,
            message: results,
            affextedRows: results.affextedRows
        })
    })
});

//查询今日新政数据
app.post('/api/getTodayNewlist', (req, res) => {
    const number = req.body.bigaid
    var Sql_Params = [number, number];
    console.log(req.query)
    var sqlStr = 'select * from `todaynew_tb` where   salesman in  (SELECT  name  FROM `user_tb` WHERE bigaid= ? ) or aid=?   '
    // if (number=="29150"){
    //     var sqlStr = 'SELECT *   FROM  `todaynew_tb` '
    // }
    conn.query(sqlStr, Sql_Params, (err, results) => {
        if (err) return res.json({
            err_code: 1,
            message: '数据不存在',
            affextedRows: 0
        })
        res.json({
            err_code: 200,
            message: results,
            affextedRows: results.affextedRows
        })
    })
});
//按月查询客源信息
app.post('/api/getCusMonth', (req, res) => {
    const month = req.body.month
    const bigaid = req.body.bigaid
    var Sql_Params = [month, bigaid,bigaid];
    var sql_paramss=[bigaid]
    console.log(req.query)
    const sqlStr = 'SELECT * FROM  ` customer_tb`  WHERE MONTH( CertificationTime ) = ?  and aid in  (SELECT  aid  FROM `user_tb` WHERE bigaid= ? or aid=? )  '
    const sqlStr2 = 'SELECT SUM(AllMoney) FROM  ` customer_tb`  WHERE MONTH( CertificationTime ) = ?  and aid in  (SELECT  aid  FROM `user_tb` WHERE bigaid= ? or aid=?)  '
const sqlStr3='SELECT  `profitpoint`  FROM  `user_tb`  WHERE aid =?  '
    conn.query(sqlStr, Sql_Params, (err, results) => {
        if (err) return res.json({
            err_code: 1,
            message: '错误',
            affextedRows: 0
        })
        conn.query(sqlStr2, Sql_Params, (err, results2) => {
            if (err) return res.json({
                err_code: 1,
                message: '错误',
                affextedRows: 0
            })

            conn.query(sqlStr3, sql_paramss, (err, results3) => {
                if (err) return res.json({
                    err_code: 1,
                    message: '错误',
                    affextedRows: 0
                })
                res.json({
                    err_code: 200,
                    affextedRows: results.affextedRows,
                    allmoney:results2,
                    point:results3,
                    message: results
                })
            })



        })


    })
});
//---------------------------------------------------
//用户登录
app.post('/api/login', (req, res) => {
    const name = req.body.aid
    const psw = req.body.psw
    var Sql_Params = [psw];
    console.log(req.query)
    var sqlStr = 'select * from `user_tb` where  aid = '+name +'  and psw = '+mysql.escape(psw)
    var reg = /^[\u4e00-\u9fa5]+$/;
    if (reg.test(name)){
        var sqlStr = "select * from `user_tb` where   psw = "+mysql.escape(psw)+"  and  name LIKE "+mysql.escape(name)
    }
    console.log(sqlStr)
    conn.query(sqlStr,  (err, results) => {
        if (err) return res.json({
            err_code: 1,
            message: '账号不存在或密码错误',
            affextedRows: err
        })
        res.json({
            err_code: 200,
            message: results,
            affextedRows: results.affectedRows
        })
    })
});













app.listen(3000,'0.0.0.0', () => {
    console.log('正在监听端口3000!');
})
