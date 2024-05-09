'use strict';

module.exports = function(app)  {
    var apiAdmin = require('./controllers/admin')
    var apiUser = require('./controllers/user')


    //API ADMIN
    app.route('/v1/web/animals')
    .get(apiAdmin.animal_controller.webanimalid);

    app.route('/v1/web/animal/:id')
    .get(apiAdmin.animal_controller.webanimalid);

    app.route('/v1/web/animal/edit/:id')
    .put(apiAdmin.animal_controller.webanimaledit);

    app.route('/v1/web/animal/delete/:id')
    .delete(apiAdmin.animal_controller.webanimaldelete);

    app.route('/v1/web/request/accounts')
    .get(apiAdmin.request_account_controller.webrequestaccounts);

    app.route('/v1/web/request/account/:id')
    .get(apiAdmin.request_account_controller.webrequestaccountid);

    app.route('/v1/web/request/account/approve/:id')
    .put(apiAdmin.request_account_controller.webapproverequestaccount);

    app.route('/v1/web/request/datas')
    .get(apiAdmin.request_data_controller.webrequestdatas);

    app.route('/v1/web/request/data/:id')
    .get(apiAdmin.request_data_controller.webrequestdataid);

    app.route('/v1/web/request/data/approve/:id')
    .put(apiAdmin.request_data_controller.webapproverequestdata);

    app.route('/v1/web/request/data/approve/send')
    .post(apiAdmin.request_data_controller.websendrequestdata);
   
    app.route('/v1/web/history/request/data')
    .get(apiAdmin.history_request_data_controller.webhistoryrequestdatas);

    app.route('/v1/web/history/request/data/:id')
    .get(apiAdmin.history_request_data_controller.webhistoryrequestdataid);



    //API USER
    app.route('/v1/mob/animals/editable/:token')
    .get(apiUser.editable_animal_controller.mobeditableanimals);

    app.route('/v1/mob/animal/editable/:token/:id_animal')
    .get(apiUser.editable_animal_controller.mobeditableanimalid);
   
    app.route('/v1/mob/animal/add')
    .post(apiUser.editable_animal_controller.mobanimalpost);

    app.route('/v1/mob/animal/editable/edit/:token/:id_animal')
    .put(apiUser.editable_animal_controller.mobediteditableanimal);

    app.route('/v1/mob/animal/editable/edit/image/:token/:id_animal')
    .put(apiUser.editable_animal_controller.mobediteditableanimalimage);


    app.route('/v1/mob/animals/history/:token')
    .get(apiUser.history_animal_controller.mobhistoryanimals);

    app.route('/v1/mob/animal/history/:token/:id_animal')
    .get(apiUser.history_animal_controller.mobhistoryanimalid);


    app.route('/v1/mob/user/account/:token')
    .get(apiUser.account_controller.mobaccount);

    app.route('/v1/mob/user/account/edit/name/:token')
    .put(apiUser.account_controller.mobaccounteditname);

    app.route('/v1/mob/user/account/edit/picture/:token')
    .put(apiUser.account_controller.mobaccounteditpicture);

    app.route('/v1/mob/user/account/edit/password/:token')
    .put(apiUser.account_controller.mobaccounteditpassword);

    

}

