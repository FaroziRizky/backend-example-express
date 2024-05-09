'use strict';

var response = require('../../res');
var connection = require('../../connection');
var md5 = require('md5');

exports.index = function (req, res) {
    response.ok("REST API Worked!", res)
}

//GET REQUEST ACCOUNTS
exports.webrequestaccounts = function (req, res) {
    connection.query(`SELECT * FROM request_accounts`,
        function (error, rows, fields) {
            if (error) {
                connection.log(error);
            } else {
                response.ok(rows, res)
            };
        }
    )
};

//GET ID REQUEST ACCOUNT
exports.webrequestaccountid = function (req, res) {
    let id = req.params.id
    connection.query(`SELECT * FROM request_accounts WHERE id_request_account=?`, [id],
        function (error, rows, fields) {
            if (error) {
                connection.log(error);
            } else {
                response.ok(rows, res)
            };
        }
    )
};



//PUT APPROVE REQUEST ACCOUNT
exports.webapproverequestaccount = function (req, res) {
    let approve = req.body.approve;
    let id = req.params.id;

    if (approve == 1) {
        connection.query(`UPDATE request_accounts SET approve=1 WHERE id_request_account=?`,
            [id],
            function (error, rows, fields) {
                if (error) {
                    console.log(error);
                } else {
                    response.ok(rows, res)
                }
            });
    } else if (approve == 2) {
        connection.query(`UPDATE request_accounts SET approve=2 WHERE id_request_account=?`,
        [id],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                connection.query(`SELECT * FROM request_accounts WHERE id_request_account=?`, [id], function (error, results, fields) {
                    if (error) {
                        console.log(error);
                    } else {
                        if (results.length > 0) {
                            let email = results[0].email;
                            let name = results[0].name;
                            let phone = results[0].phone;
                            let password = md5(results[0].phone); // Menggunakan nomor telepon sebagai password (tidak disarankan, hanya untuk contoh)
                            let now = new Date();
                            let datetimenow = now.getFullYear() + '-' + ('0' + (now.getMonth() + 1)).slice(-2) + '-' + ('0' + now.getDate()).slice(-2) + ' ' +
                                ('0' + now.getHours()).slice(-2) + ':' + ('0' + now.getMinutes()).slice(-2) + ':' + ('0' + now.getSeconds()).slice(-2);
        
                            connection.query(`INSERT INTO users (email, name, phone, password, picture, created_at, updated_at, status)
                            VALUES (?, ?, ?, ?, NULL, ?, ?, 1)`,
                            [email, name, phone, password, datetimenow, datetimenow],
                            function (error, rows, fields) {
                                if (error) {
                                    console.log(error);
                                } else {
                                    response.ok(rows, res)
                                }
                            });
                        } else {
                            console.log("No data found for the specified ID.");
                        }
                    }
                });
            }
        });
        
    }
};
