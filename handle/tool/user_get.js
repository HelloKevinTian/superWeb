var logger = require('ss-logger').getLogger(__filename);
var common = require('../../app/common');
var _ = require('underscore');

function handle(clientip, args, endcb, req, res) {

    var findObj = {};

    if (args.name) {
        findObj.name = {
            $regex: args.name
        };
    }

    if (args.address) {
        findObj.address = {
            $regex: args.address
        };
    }

    if (args.source) {
        findObj.source = {
            $regex: args.source
        };
    }

    if (args.comment) {
        findObj.comment = {
            $regex: args.comment
        };
    }

    findObj['$and'] = [];

    if (args.start_price) {
        findObj['$and'].push({
            'price': {
                '$gte': parseInt(args.start_price)
            }
        });
    }

    if (args.end_price) {
        findObj['$and'].push({
            'price': {
                '$lte': parseInt(args.end_price)
            }
        })
    }

    var startTime = '2000/01/01';
    var endTime = '2100/01/01';
    if (args.start_time && args.start_time !== 'null') {
        startTime = args.start_time;
    }
    if (args.end_time && args.end_time !== 'null') {
        endTime = args.end_time + ' 23:59:59';
    }
    findObj['$and'].push({
        'time': {
            '$gte': startTime
        }
    });
    findObj['$and'].push({
        'time': {
            '$lte': endTime
        }
    });
    common.db.collection('user_list').find(findObj).toArray(function(err, userList) {
        if (err) {
            logger.error(err);
        }
        if (userList) {
            endcb({
                'querySuccess': true,
                'message': '获取数据成功',
                'ret': userList
            });
        } else {
            endcb({
                'querySuccess': false,
                'message': '数据不存在',
                'ret': []
            });
        }
    });
};

/**
 * 导出对象
 */
module.exports = {
    'handle': handle
};