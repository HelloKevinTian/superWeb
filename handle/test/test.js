/**
 * get player
 */
var logger = require('ss-logger').getLogger(__filename);
var common = require('../../app/common.js');
var _ = require('underscore');

function handle(clientip, args, endcb, req, res) {

    logger.debug(args);

    var findObj = {};

    if (args.channel) {
        findObj.channel = args.channel;
    }

    if (args.name) {
        findObj.name = {
            $regex: args.name
        };
    }

    if (args.uid) {
        findObj._id = args.uid;
    }

    if (args.vip) {
        findObj.vip = parseInt(args.vip);
    }

    if (args.start_level) {
        findObj.level = {
            '$gte': parseInt(args.start_level)
        };
    }

    if (args.end_level) {
        findObj.level = {
            '$lte': parseInt(args.end_level)
        };
    }

    var startTime = '2016/01/01';
    var endTime = '2050/01/01';
    if (args.start_time && args.start_time !== 'null') {
        startTime = args.start_time;
    }
    if (args.end_time && args.end_time !== 'null') {
        endTime = args.end_time + ' 23:59:59';
    }
    findObj['$and'] = [{
        "create_time": {
            "$gte": startTime
        }
    }, {
        "create_time": {
            "$lte": endTime
        }
    }];

    // logger.debug('findObj:', JSON.stringify(findObj));

    // return;

    common.db.collection('cs2_player').find(findObj).limit(1000).toArray(function(err, userList) {
        if (err) {
            logger.error(err);
        }
        if (userList.length > 0) {

            var list = [];
            for (var i = 0; i < userList.length; i++) {
                list.push(_.omit(userList[i], ['bag_equip', 'bag_part', 'bag_ticket', 'tutorial', 'own_colors', 'own_tireboss', 'blue_print']))
            };

            var msg = {
                'querySuccess': true,
                'message': '获取数据成功',
                'ret': list
            };
            endcb(msg);
        } else {
            var msg = {
                'querySuccess': false,
                'message': '您查找的数据不存在！',
                'ret': userList
            };
            endcb(msg);
        }
    });
};

/**
 * 导出对象
 */
module.exports = {
    'handle': handle
};