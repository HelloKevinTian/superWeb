var logger = require('ss-logger').getLogger(__filename);
var common = require('../../app/common');
var _ = require('underscore');
var util = require('../../app/util');

function handle(clientip, args, endcb, req, res) {

    common.db.collection('user_list').remove({
        '_id': Number(args._id)
    }, function(err) {
        if (err) {
            logger.error(err);
            endcb({
                'querySuccess': false,
                'message': '删除失败',
                'ret': []
            });
        } else {
            common.db.collection('user_list').find({}).toArray(function(err, userList) {
                if (err || !userList) {
                    logger.error(err);
                    endcb({
                        'querySuccess': false,
                        'message': '删除失败',
                        'ret': []
                    });
                } else {
                    endcb({
                        'querySuccess': true,
                        'message': '删除成功',
                        'ret': userList
                    });
                }
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