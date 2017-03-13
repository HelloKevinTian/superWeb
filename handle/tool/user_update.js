var logger = require('ss-logger').getLogger(__filename);
var common = require('../../app/common');
var _ = require('underscore');
var util = require('../../app/util');

function handle(clientip, args, endcb, req, res) {

    common.db.collection('user_list').update({
        '_id': Number(args._id)
    }, {
        $set: {
            'name': args.name,
            'age': parseInt(args.age),
            'address': args.address,
            'phone': args.phone,
            'price': parseInt(args.price),
            'source': args.source,
            'comment': args.comment
        }
    }, function(err) {
        if (err) {
            logger.error(err);
            endcb({
                'querySuccess': false,
                'message': '更新失败',
                'ret': []
            });
        } else {
            common.db.collection('user_list').find({}).toArray(function(err, userList) {
                if (err || !userList) {
                    logger.error(err);
                    endcb({
                        'querySuccess': false,
                        'message': '更新失败',
                        'ret': []
                    });
                } else {
                    endcb({
                        'querySuccess': true,
                        'message': '更新成功',
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