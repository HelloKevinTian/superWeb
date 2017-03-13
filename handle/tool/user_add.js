var logger = require('ss-logger').getLogger(__filename);
var common = require('../../app/common');
var _ = require('underscore');
var util = require('../../app/util');

function handle(clientip, args, endcb, req, res) {

    common.db.collection('user_list').findOne({
        'phone': args.phone
    }, function(err, one) {
        if (err) {
            endcb({
                'querySuccess': false,
                'message': '录入失败',
                'ret': []
            });
        } else if (one) {
            endcb({
                'querySuccess': true,
                'message': '当前手机号客户已经录入',
                'ret': [one]
            });
        } else {
            genId('user', function(err, uuid) {
                if (err) {
                    endcb({
                        'querySuccess': false,
                        'message': '录入失败',
                        'ret': []
                    });
                    return;
                }
                var newObj = {
                    '_id': uuid,
                    'name': args.name,
                    'age': parseInt(args.age),
                    'address': args.address,
                    'phone': args.phone,
                    'price': parseInt(args.price),
                    'time': util.formatDate('yyyy/MM/dd hh:mm:ss'),
                    'source': args.source,
                    'comment': args.comment
                }

                common.db.collection('user_list').insert(newObj, function(err) {
                    if (err) {
                        logger.error(err);
                        endcb({
                            'querySuccess': false,
                            'message': '录入失败',
                            'ret': []
                        });
                    } else {
                        common.db.collection('user_list').find({}).toArray(function(err, userList) {
                            if (err || !userList) {
                                logger.error(err);
                                endcb({
                                    'querySuccess': false,
                                    'message': '录入失败',
                                    'ret': []
                                });
                            } else {
                                endcb({
                                    'querySuccess': true,
                                    'message': '录入成功',
                                    'ret': userList
                                });
                            }
                        });
                    }
                });
            });
        }
    });

};

function genId(name, callback) {
    common.db.command({
        findAndModify: 'id_list',
        query: {
            '_id': name
        },
        new: true,
        upsert: true,
        update: {
            $inc: {
                'uuid': 1
            }
        }
    }, function(err, result) {
        if (err) {
            logger.error(err);
            callback(err);
        } else {
            callback(null, result.value.uuid);
        }
    });
}

/**
 * 导出对象
 */
module.exports = {
    'handle': handle
};