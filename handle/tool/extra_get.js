var logger = require('ss-logger').getLogger(__filename);
var common = require('../../app/common');
var _ = require('underscore');

function handle(clientip, args, endcb, req, res) {
    common.db.collection('user_extra').findOne({
        '_id': Number(args._id)
    }, function(err, extraInfo) {
        if (err) {
            logger.error(err);
        }
        if (extraInfo && extraInfo.list) {
            endcb({
                'querySuccess': true,
                'message': '操作成功',
                'ret': extraInfo.list
            });
        } else {
            endcb({
                'querySuccess': true,
                'message': '操作成功',
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