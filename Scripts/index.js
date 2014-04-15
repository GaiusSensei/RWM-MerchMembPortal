head.load("bower_components/jquery/dist/jquery.min.js", //
    "bower_components/bootstrap/dist/js/bootstrap.min.js", //
    "bower_components/bootstrap/dist/css/bootstrap.min.css", //
    "bower_components/bootstrap/dist/css/bootstrap-theme.min.css", //
    "bower_components/datatables/media/css/jquery.dataTables.css", //
    "bower_components/jstorage/jstorage.min.js", //
    "bower_components/rwm-phoenix/dist/phoenix.min.js", //
    "bower_components/datatables/media/js/jquery.dataTables.js", //
    "Content/index.css", //

    function readyF() {
        $.jStorage.set("auth", null);
        $.jStorage.set("authType", null);
        if($.jStorage.get("rememberedUserId")) {
            // Load Remembered UserId
            $(".form-signin input[type=text]").val($.jStorage.get("rememberedUserId"));
            $(".form-signin input[type=checkbox]").prop("checked", true);
            $(".form-signin input[type=password]").focus();
        }
        $(".form-signin").submit(function onLoginF(event) {
            event.preventDefault();
            $(".form-signin input[type=text]").prop("disabled", true);
            $(".form-signin input[type=checkbox]").prop("disabled", true);
            $(".form-signin input[type=password]").prop("disabled", true);
            $(".form-signin button").prop("disabled", true);
            if($(".form-signin input[type=checkbox]").prop("checked")) {
                // Remember UserId
                $.jStorage.set("rememberedUserId", $(".form-signin input[type=text]").val());
            }
            $.jStorage.set("auth", null);
            phoenix.userId = 'public';
            phoenix.apiKey = '7CE766FE1473813B97C148EB9F7BD49514B9ECD0';
            phoenix.send({
                cgrp: '$merchants',
                cmnd: 'auth',
                prms: {
                    'username': $(".form-signin input[type=text]").val(),
                    'password': $(".form-signin input[type=password]").val(),
                }
            }, function onMerchantsAuth(data1) {
                var d1 = JSON.parse(data1);
                if(d1.exitCode === 0) {
                    phoenix.send({
                        cgrp: '$members',
                        cmnd: 'auth',
                        prms: {
                            'employeeNo': $(".form-signin input[type=text]").val(),
                            'password': $(".form-signin input[type=password]").val(),
                        }
                    }, function onMembersAuth(data2) {
                        var d2 = JSON.parse(data2);
                        if(d2.exitCode === 0) {
                            alert(JSON.stringify(d2.response['error']));
                            $(".form-signin input[type=text]").prop("disabled", false);
                            $(".form-signin input[type=checkbox]").prop("disabled", false);
                            $(".form-signin input[type=password]").prop("disabled", false);
                            $(".form-signin button").prop("disabled", false);
                        } else {
                            $.jStorage.set("auth", d2);
                            $.jStorage.set("authType", "membership");
                            loadMain();
                        }
                    });
                } else {
                    $.jStorage.set("auth", d1);
                    $.jStorage.set("authType", "merchant");
                    loadMain();
                }
            });
        });
        $('.btnLogout').click(function() {
            location.reload();
        });
        $('.btnAdd').click(function() {
            openModule();            
        });
        $('.btnMain').click(function(){ loadMain();});
        $('#btnSetMer').click(function() {
            if($('.addClsMer')) {
                varCmd = 'authNew';
                generatePassword();
            } else {
                
            }
            if($.trim($('#setUNMer').val()) != "" && $.trim($('#setEMMer').val()) != "" && $.trim($('#setCISMer').val()) != "" && //
                $.trim($('#setPCIDMer').val()) != "" && $.trim($('#setFPLMer').val()) != "" && $.trim($('#setALMer').val()) != "" && //
                $.trim($('#setARMer').val()) != "" && $.trim($('#setAWMer').val()) != "" && $.trim($('#setAWAMer').val()) != "" && $.trim($('#setAWCMer').val()) != "") {
                phoenix.userId = $.jStorage.get("auth").response.userId;
                phoenix.apiKey = $.jStorage.get("auth").response.apiKey;
                phoenix.send({
                    cgrp: '$merchants',
                    cmnd: varCmd,
                    prms: {
                        'username': $.trim($('#setUNMer').val()),
                        'password': varPass,
                        'email': $.trim($('#setEMMer').val()),
                        'apiUserId': $.jStorage.get("auth").response.userId,
                        'cis': $.trim($('#setCISMer').val()),
                        'pcid': $.trim($('#setPCIDMer').val()),
                        'frmCil': $.trim($('#setFPLMer').val()),
                        'acCil': $.trim($('#setALMer').val()),
                        'awardRate': $.trim($('#setARMer').val()),
                        'awardWallet': $.trim($('#setAWMer').val()),
                        'awardWalletAbv': $.trim($('#setAWAMer').val()),
                        'awardWalletCode': $.trim($('#setAWCMer').val()),
                    }
                }, function callbackF(data) {
                    //alert(data);
                    var d = JSON.parse(data);
                    if(d.exitCode === 0) alert(JSON.stringify(d.response['error']));
                    else alert('Successfully added ' + $.trim($('#setUNMer').val()) + ' as merchant user. Password : ' + varPass);
                    $('#setUNMer').val('');
                    $('#setEMMer').val('');
                    $('#setCISMer').val('');
                    $('#setPCIDMer').val('');
                    $('#setFPLMer').val('');
                    $('#setALMer').val('');
                    $('#setARMer').val('');
                    $('#setAWMer').val('');
                    $('#setAWAMer').val('');
                    $('#setAWCMer').val('');
                    if($('.addClsMer')) {
                        $('#').removeClass('addClsMer');
                    }
                });
            }else{
                alert('Please fill up all fields');
                return false;
            }
        });
        $('#btnSetMem').click(function() {
            if($('.addClsMem')) {
                varCmd = 'authNew';
                generatePassword();
            } else {
                
            }
            if($.trim($('#setENoMem').val()) != "" && $.trim($('#setEMMem').val()) != "" && $.trim($('#setENaMem').val()) != "" && //
                $.trim($('#setLDMem').val()) != "" && $.trim($('#setCNSPMem').val()) != "" && $.trim($('#setPROGMem').val()) != "") {
                phoenix.userId = $.jStorage.get("auth").response.userId;
                phoenix.apiKey = $.jStorage.get("auth").response.apiKey;
                phoenix.send({
                    cgrp: '$members',
                    cmnd: varCmd,
                    prms: {
                        'employeeNo': $.trim($('#setENoMem').val()),
                        'password': varPass,
                        'email': $.trim($('#setEMMem').val()),
                        'apiUserId': $.jStorage.get("auth").response.userId,
                        'employeeName': $.trim($('#setENaMem').val()),
                        'GPE': $.trim($('#setLDMem').val()),
                        'CNSP': $.trim($('#setCNSPMem').val()),
                        'PROG': $.trim($('#setPROGMem').val()),
                    }
                }, function callbackF(data) {
                    //alert(data);
                    var d = JSON.parse(data);
                    if(d.exitCode === 0) alert(JSON.stringify(d.response['error']));
                    else alert('Successfully added ' + $.trim($('#setENoMem').val()) + ' as membership user. Password : ' + varPass);
                    $('#setENoMem').val('');
                    $('#setEMMem').val('');
                    $('#setENaMem').val('');
                    $('#setLDMem').val('');
                    $('#setCNSPMem').val('');
                    $('#setPROGMem').val('');
                    if($('.addClsMem')) {
                        $('#').removeClass('addClsMem');
                    }
                });
            }else{
                alert('Please fill up all fields');
                return false;
            }
        });
    });

var loadMain = function loadMainF() {
    $(".row").hide();
    $(".form-signin input[type=text]").prop("disabled", false);
    $(".form-signin input[type=checkbox]").prop("disabled", false);
    $(".form-signin input[type=password]").prop("disabled", false);
    $(".form-signin button").prop("disabled", false);
    $("#main").removeClass("hidden").fadeIn();
    $('#divLogout').show();
    //alert($.jStorage.get("auth").response.userId + " : " + $.jStorage.get("auth").response.apiKey);
    if($.jStorage.get("authType") === "merchant") {
        $("#mainMer").removeClass("hidden").fadeIn();
        varType = $.jStorage.get("authType");
    } else if($.jStorage.get("authType") === "membership") {
        $("#mainMem").removeClass("hidden").fadeIn();
        varType = "member";
    }
    $('#setUNMer').val('');
    $('#setEMMer').val('');
    $('#setCISMer').val('');
    $('#setPCIDMer').val('');
    $('#setFPLMer').val('');
    $('#setALMer').val('');
    $('#setARMer').val('');
    $('#setAWMer').val('');
    $('#setAWAMer').val('');
    $('#setAWCMer').val('');
    $('#setENoMem').val('');
    $('#setEMMem').val('');
    $('#setENaMem').val('');
    $('#setLDMem').val('');
    $('#setCNSPMem').val('');
    $('#setPROGMem').val('');
    phoenix.userId = $.jStorage.get("auth").response.userId;
    phoenix.apiKey = $.jStorage.get("auth").response.apiKey;
    phoenix.send({
        cgrp: '$' + varType + 's',
        cmnd: 'authList',
    }, function callbackF(data) {
        //alert(data);
        var d = JSON.parse(data);
        if(d.exitCode === 0) alert(JSON.stringify(d.response['error']));
        else {
            $('#tblUsers > tbody').empty();
            $('#tblUsers').dataTable().fnClearTable();
            $.each(d.response, function(i, users) {
                $('#tblUsers').dataTable().fnAddData([ //
                    users, "<button class='btn btn-sm btn-primary btn-block btnEdit' id=" + users + ">Edit</button>"
                ]);
            });
            $('.btnEdit').unbind('click');
            $('.btnEdit').bind('click',function(){
                phoenix.userId = $.jStorage.get("auth").response.userId;
                phoenix.apiKey = $.jStorage.get("auth").response.apiKey;
                if(varType === "merchant"){
                    phoenix.send({
                        cgrp: '$' + varType + 's',
                        cmnd:'authGet',
                        prms:{
                            'username' : this.id
                        }
                    }, function callbackF(data) {
                        //alert(data);
                        var d = JSON.parse(data);
                        if (d.exitCode === 0)
                            alert(JSON.stringify(d.response['error']));
                        else{ 
                            openModule();
                            $('#btnSetMer').removeClass('addClsMer');
                            $('#setUNMer').val(d.response.username);
                            $('#setCISMer').val(d.response.CompIssueShift);
                            $('#setPCIDMer').val(d.response.ProfitCenterId);
                            $('#setFPLMer').val(d.response.FormPrinterCIL);
                            $('#setALMer').val(d.response.AccountingCIL);
                        }
                    });                    
                }else if(varType === "member"){
                    phoenix.send({
                        cgrp: '$' + varType + 's',
                        cmnd:'authGet',
                        prms:{
                            'employeeNo' : this.id
                        }
                    }, function callbackF(data) {
                        //alert(data);
                        var d = JSON.parse(data);
                        if (d.exitCode === 0)
                            alert(JSON.stringify(d.response['error']));
                        else{
                            openModule();
                            $('#btnSetMem').removeClass('addClsMem');
                            $('#setENoMem').val(d.response.employeeNo);
                            $('#setENaMem').val(d.response.employeeName);
                            $('#setLDMem').val(d.response.locationDefault);
                            $('#setCNSPMem').val(d.response.CNSP);
                            $('#setPROGMem').val(d.response.PROG);
                        }
                    });
                }
            });
        }
    });
};
var generatePassword = function() {
    var arrChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for(var i = 0; i < 8; i++) varPass += arrChars.charAt(Math.floor(Math.random() * arrChars.length));
};
var openModule = function(){
    $('.row').hide();
            $('#set').removeClass("hidden").fadeIn();
            if($.jStorage.get("authType") === "merchant") {
                $('#setMer').removeClass('hidden').fadeIn();
                $('#headerMer').html('Add Merchant');
                $('#btnSetMer').addClass('addClsMer');
            } else if($.jStorage.get("authType") === "membership") {
                $('#setMem').removeClass('hidden').fadeIn();
                $('#headerMem').html('Add Membership');
                $('#btnSetMem').addClass('addClsMem');
            }    
};
var varCmd = "",
    varPass = "",
    varType = "";