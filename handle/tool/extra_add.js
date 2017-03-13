var logger = require('ss-logger').getLogger(__filename);
var common = require('../../app/common');
var _ = require('underscore');
var _ = require('underscore');
var util = require('../../app/util');

function handle(clientip, args, endcb, req, res) {

    common.db.command({
        findAndModify: 'user_extra',
        query: {
            '_id': Number(args._id)
        },
        new: true, //返回更新后的数据
        upsert: true, //没有该条记录时会insert一条（默认是false）
        update: {
            $push: {
                'list': {
                    'time': util.formatDate('yyyy/MM/dd hh:mm:ss'),
                    'content': args.content
                }
            }
        }
    }, function(err, result) { // null { value: null, ok: 1 }
        if (err) {
            logger.error(err);
        }
        if (result.value && result.value.list) {
            endcb({
                'querySuccess': true,
                'message': '获取数据成功',
                'ret': result.value.list
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