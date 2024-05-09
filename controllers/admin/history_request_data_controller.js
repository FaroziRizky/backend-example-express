'use strict';

var response = require('../../res');
var connection = require('../../connection');
var md5 = require('md5');

exports.index = function (req, res) {
    response.ok("REST API Worked!", res)
}

//GET HISTORY REQUEST DATA
exports.webhistoryrequestdatas = function (req, res) {
    connection.query(`SELECT * FROM history_request_datas`,
        function (error, rows, fields) {
            if (error) {
                connection.log(error);
            } else {
                response.ok(rows, res)
            };
        }
    )
};


//GET ID HISTORY REQUEST DATA
exports.webhistoryrequestdataid = function (req, res) {
    let id = req.params.id
    connection.query(`SELECT * FROM history_request_datas WHERE id_history_request_data=?`,[id],
        function (error, rows, fields) {
            if (error) {
                connection.log(error);
            } else {
                response.ok(rows, res)
            };
        }
    )
};
