function onLoad() {
    //formvalidate();
    fetchtrainMaster();
    fetchComplaintMaster();
    //alert(genrandname());
}

function formvalidate() {
    var form = $("#frmlogin");

    form.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block', // default input error message class
        focusInvalid: true, // do not focus the last invalid input

        rules: {


            txtTrainnumber: {
                required: true

            },
            txtCoachNumber: {
                required: true,
                number: true
            },
            txtProblemType: {
                required: true
                
            },
            txtProbDescription: {
                required: true
                
            },
            txtengineerName: {
                required: true
            }

        },

        messages: { // custom messages for radio buttons and checkboxes
            regschtnc: {
                required: "Please accept TNC first."
            }

        },

        invalidHandler: function (event, validator) { //display error alert on form submit   

        },

        highlight: function (element) { // hightlight error inputs
            $(element)
                .closest('.form-group').addClass('has-error'); // set error class to the control group
        },

        success: function (label) {
            label.closest('.form-group').removeClass('has-error');
            label.remove();
        },


        submitHandler: function (form) {


          
        }
    });
}



function InsUpdComplaints1() {
    $("#spantraninNo").html("Train No: " + sessionStorage.getItem('hdnTrainID'));
    $("#spantraninNo").show();
    
    //$("#spanCoachNo").html("Coach No: " + sessionStorage.getItem('hdnTrainID'));
    //var reguser = {
    //    'SupervisorID': sessionStorage.getItem('SupervisorID'),
    //    'TrainNo': sessionStorage.getItem('hdnTrainID'),
    //    'CoachNumber': $('#txtCoachNumber').val()
       
    //}
    //alert(JSON.stringify(reguser))
    //jQuery.ajax({
    //  url: allurlapi + "Complaintmaster/InsUpdComplaintsTab1",
    //    data: JSON.stringify(reguser),
    //    type: "POST",
    //    contentType: "application/json",
    //    success: function (data) {
    //        // alert(data[0].Flag)
    //        if (data[0].Flag == '1') {
    //            //alert(data[0].ComplaintID);
    //            sessionStorage.setItem('ComplaintID',data[0].ComplaintID)
    //            //$('#regusrsuccessdiv').show()
    //            //$('#regusrsuccessdiv').fadeOut(7000, function () {
    //            //    $("#modalUserRegister").modal('hide');
    //            //    resetregistrationForm();
    //            //});
                
    //        }
    //        else if (data[0].Flag == '-1') {
    //            //$('#regusrerrordiv').show();
    //            //$('#regscherror').html('A user with same email has been already registered.');
    //            //$('#regusrerrordiv').fadeOut(7000);

    //        }
    //        else if (data[0].Flag == '0') {
    //            $('#diverrlogin').show();
    //            $('#diverrlogin').find("span").html('Internal Server Error.');
    //            $('#diverrlogin').fadeOut(7000)

    //        }
    //    }

    //});
}

function resetcomplaintform() {
    //$("#txtTrainnumber").val('');
    //$("#txtCoachNumber").val('');
    $("#txtProblemType").val('');
    $("#txtProbDescription").val('');
    $("#fileToUpload").val('');
   // $("#txtengineerName").val('')
   // localStorage.setItem("CoachNo", '');
    $("#myImage").hide();
}

function InsUpdTab2Data() {
    sessionStorage.setItem("hddCoachNo", $('#txtCoachNumber').val());
    $("#spanCoachNo").html("Coach No: " + $('#txtCoachNumber').val())
    $("#spanCoachNo").show();
}
sessionStorage.setItem("hddCoachNo", 0);
sessionStorage.setItem('ComplaintID', 0);
sessionStorage.setItem("AttachementFileName", '');
function InsUpdTab3Data() {
    var AttachementFileName = '';

    if (jQuery('#fileToUpload').val() == '') {
        //alert(sessionStorage.getItem('blobImg'));
        AttachementFileName = genrandname();
        fileUploaderCam(sessionStorage.getItem('blobImg'), sessionStorage.getItem('hdnTrainID'), $('#txtCoachNumber').val(), AttachementFileName);

    } else {
        AttachementFileName = jQuery('#fileToUpload').val().substring(jQuery('#fileToUpload').val().lastIndexOf('\\') + 1);
        fileUploader('fileToUpload', sessionStorage.getItem('hdnTrainID'), $('#txtCoachNumber').val())
    }
    AttachementFileName = AttachementFileName + ".png";

    sessionStorage.setItem("AttachementFileName", AttachementFileName);
    //var reguser = {
    //    'ComplaintID':sessionStorage.getItem('ComplaintID'),
    //    'Attachment': AttachementFileName
        
    //}
    ////alert(JSON.stringify(reguser))
    //jQuery.ajax({
    //    url: allurlapi + "Complaintmaster/InsUpdComplaintsTab2",
    //    data: JSON.stringify(reguser),
    //    type: "POST",
    //    contentType: "application/json",
    //    success: function (data) {
    //        // alert(data[0].Flag)

    //        //if (data[0].Flag == '1') {


               

    //        //}
    //        //else if (data[0].Flag == '-1') {
               

    //        //}
    //        //else if (data[0].Flag == '0') {
    //        //    $('#diverrlogin').show();
    //        //    $('#diverrlogin').find("span").html('Internal Server Error.');
    //        //    $('#diverrlogin').fadeOut(7000)

    //        //}
    //    }

    //});
}

function InsupdTab4(){

    var reguser = {
        'SupervisorID':sessionStorage.getItem('SupervisorID'),
        'TrainNo': sessionStorage.getItem('hdnTrainID'),
        'CoachNumber': $('#txtCoachNumber').val(),
        'Attachment': imageurl2, //sessionStorage.getItem("AttachementFileName"),
        'ProblemType':$('#txtProblemType option:selected').val(),
        'ProblemDescription': $('#txtProbDescription').val(),        
        'AssignedTo': $('#txtProblemType option:selected').text()
        
    }
    //alert(JSON.stringify(reguser))
    jQuery.ajax({
        url: allurlapi + "Complaintmaster/InsUpdComplaintsAll",
        data: JSON.stringify(reguser),
        type: "POST",
        contentType: "application/json",
        success: function (data) {
            bootbox.alert("Complaint registered successfully!", function () {
                //resetcomplaintform();
                //$('#form_wizard_1').bootstrapWizard('previous');
                $('#form_wizard_1').bootstrapWizard('previous');
            });
            // alert(data[0].Flag)

            //if (data[0].Flag == '1') {


               

            //}
            //else if (data[0].Flag == '-1') {
               

            //}
            //else if (data[0].Flag == '0') {
            //    $('#diverrlogin').show();
            //    $('#diverrlogin').find("span").html('Internal Server Error.');
            //    $('#diverrlogin').fadeOut(7000)

            //}
        }, error: function () {

            //bootbox.alert("Attachment error.");

        }

    });       

    }

function capturImg() {
    //alert('success')
   // navigator.camera.getPicture(
   //     function (imageUri) {
   //         var image = document.getElementById('myImage');
   //         image.src = imageUri
   //     },
   //     function (message) {
   //         alert('Failed because: ' + message);
   //     }
   //     //,{
   //     //    quality: 50,
   //     //    destinationType: Camera.DestinationType.FILE_URI
   //     //}
   //);
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        //allowEdit: true,
        destinationType: Camera.DestinationType.FILE_URI
    });

}


var imageurl2 = "";
function onSuccess(imageURI) {
    //alert("success 2")
    var image = document.getElementById('myImage');

    image.src = imageURI;
    $("#myImage").show();
    //alert(imageURI)
    imageurl2 = imageURI;
    //convertImagefromstring(imageURI);
    //window.resolveLocalFileSystemURL(imageURI, function success(fileEntry) {

    //    // Do something with the FileEntry object, like write to it, upload it, etc.
    //    // writeFile(fileEntry, imgUri);
    //    alert(fileEntry.fullPath);
    //    //fileUploaderCam(fileEntry.fullPath, sessionStorage.getItem('hdnTrainID'), $('#txtCoachNumber').val(), AttachementFileName);
    //    //console.log("got file: " + fileEntry.fullPath);
    //    // displayFileData(fileEntry.nativeURL, "Native URL");

    //}, function () {
    //    // If don't get the FileEntry (which may happen when testing
    //    // on some emulators), copy to a new FileEntry.
    //    createNewFileEntry(imageURI);
    //});
    
}

function onFail(message) {
    alert('Failed because: ' + message);
}

sessionStorage.setItem('blobImg','')
function convertImagefromstring(imagestring) {

    var blob = imagestring;

    sessionStorage.setItem('blobImg',blob)

    
}


function genrandname() {
    
        var text = "";
        var possible = "abcdefghijklmnopqrstuvwxyz";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    
}
// For the best user experience, make sure the user is ready to give your app 
// camera access before you show the prompt. On iOS, you only get one chance. 

//QRScanner.prepare(onDone); // show the prompt 

//function onDone(err, status) {
//    if (err) {
//        // here we can handle errors and clean up any loose ends. 
//        console.error(err);
//    }
//    if (status.authorized) {
//        // W00t, you have camera access and the scanner is initialized. 
//        // QRscanner.show() should feel very fast. 
//    } else if (status.denied) {
//        // The video preview will remain black, and scanning is disabled. We can 
//        // try to ask the user to change their mind, but we'll have to send them 
//        // to their device settings with `QRScanner.openSettings()`. 
//    } else {
//        // we didn't get permission, but we didn't get permanently denied. (On 
//        // Android, a denial isn't permanent unless the user checks the "Don't 
//        // ask again" box.) We can ask again at the next relevant opportunity. 
//    }
//}

//// Start a scan. Scanning will continue until something is detected or 
//// `QRScanner.cancelScan()` is called. 
//QRScanner.scan(displayContents);

//function displayContents(err, text) {
//    if (err) {
//        // an error occurred, or the scan was canceled (error code `6`) 
//    } else {
//        // The scan completed, display the contents of the QR code: 
//        alert(text);
//    }
//}

//// Make the webview transparent so the video preview is visible behind it. 
//QRScanner.show();
//// Be sure to make any opaque HTML elements transparent here to avoid 
//// covering the video. 


//var done = function (err, status) {
//    if (err) {
//        console.error(err._message);
//    } else {
//        console.log('QRScanner is initialized. Status:');
//        console.log(status);
//    }
//};

//QRScanner.prepare(done);

//var callback = function (err, contents) {
//    if (err) {
//        console.error(err._message);
//    }
//    alert('The QR Code contains: ' + contents);
//};

//QRScanner.scan(callback);

//QRScanner.cancelScan(function (status) {
//    console.log(status);
//});

//QRScanner.enableLight(function (err, status) {
//    err && console.error(err);
//    console.log(status);
//});

//QRScanner.useFrontCamera(function (err, status) {
//    err && console.error(err);
//    console.log(status);
//});
//QRScanner.useBackCamera(function (err, status) {
//    err && console.error(err);
//    console.log(status);
//});

sessionStorage.setItem('hdnTrainID', '0');

jQuery("#txtTrainnumber").typeahead({
    source: function (query, process) {
        var data = sessionStorage.getItem('hdnfetchTrains');
        trainnames = [];
        map = {};
        var trainAutoCompleteName = "";
        jQuery.each(jQuery.parseJSON(data), function (i, trainAutoCompleteName) {
            map[trainAutoCompleteName.TrainAutoCompleteName] = trainAutoCompleteName;
            trainnames.push(trainAutoCompleteName.TrainAutoCompleteName);
        });

        process(trainnames);

    },
    minLength: 2,
    updater: function (item) {

        if (map[item].TrainNo != '0') {

            sessionStorage.setItem('hdnTrainID', map[item].TrainNo);
            //fetchSchoolDetails(map[item].TrainNo);
        }
        else {
            alert('Please select correct Train !');

        }
        return item;
    }

});

jQuery("#txtTrainnumber").keyup(function () {
    sessionStorage.setItem('hdnTrainID', '0');
    //clearAllValue();
});

$(".button-end").hide();


var form = $('#frmlogin');

var FormWizard = function () {

    return {

        init: function () {

            if (!jQuery().bootstrapWizard) {

                return;

            }

            //function format(state) {

            //    if (!state.id) return state.text; // optgroup

            //    return "<img class='flag' src='assets/global/img/flags/" + state.id.toLowerCase() + ".png'/>&nbsp;&nbsp;" + state.text;

            //}



            form.validate({

                doNotHideMessage: true, //this option enables to show the error/success messages on tab switch.

                errorElement: 'span', //default input error message container

                errorClass: 'help-block help-block-error', // default input error message class

                focusInvalid: false, // do not focus the last invalid input

                rules: {

                    ddlCustomer: {
                        required: true
                    }
                   
                },

                messages: {

                    //                    'payment[]': {

                    //                        required: "Please select at least one option"

                    //                        //minlength: jQuery.validator.format("Please select at least one option")

                    //                    }

                },

                errorPlacement: function (error, element) {

                    if (element.attr("name") == "gender") {

                        error.insertAfter("#form_gender_error");

                    } else if (element.attr("name") == "payment[]") {

                        error.insertAfter("#form_payment_error");

                    } else {

                        error.insertAfter(element);

                    }



                    if ($("#txtbidDate").closest('.inputgroup').attr('class') == 'inputgroup has-error') {

                        $("#btncal").css("margin-top", "-22px");

                    }

                },

                invalidHandler: function (event, validator) {
                    //success.hide();
                    //Metronic.scrollTo(error, -200);

                },

                highlight: function (element) {

                    $(element)
                        .closest('.inputgroup').removeClass('has-success').addClass('has-error');
                    $(element)
                        .closest('.col-md-4').removeClass('has-success').addClass('has-error');
                    $(element)
                        .closest('.col-md-10').removeClass('has-success').addClass('has-error');

                },

                unhighlight: function (element) {

                    $(element)
                        .closest('.inputgroup').removeClass('has-error');
                    $(element)
                        .closest('.col-md-4').removeClass('has-error');
                    $(element)
                        .closest('.col-md-10').removeClass('has-error');


                },

                success: function (label) {

                    if (label.attr("for") == "gender" || label.attr("for") == "payment[]") {

                        label

                            .closest('.inputgroup').removeClass('has-error').addClass('has-success');

                        label.remove();

                    } else {

                        label

                            .addClass('valid') // mark the current input as valid and display OK icon

                        .closest('.inputgroup').removeClass('has-error').addClass('has-success'); // set success class to the control group

                    }

                    if ($("#txtbidDate").closest('.inputgroup').attr('class') == 'inputgroup has-error') {

                        $("#btncal").css("margin-top", "-22px");

                    }

                    else {

                        $("#btncal").css("margin-top", "0px");

                    }

                },



                submitHandler: function (form) {

                   

                }



            });



            var displayConfirm = function () {

                $('#tab4 .form-control-static', form).each(function () {

                    var input = $('[name="' + $(this).attr("data-display") + '"]', form);

                    if (input.is(":radio")) {

                        input = $('[name="' + $(this).attr("data-display") + '"]:checked', form);

                    }

                    if (input.is(":text") || input.is("textarea")) {

                        $(this).html(input.val());

                    } else if (input.is("select")) {

                        $(this).html(input.find('option:selected').text());

                    } else if (input.is(":radio") && input.is(":checked")) {

                        $(this).html(input.attr("data-title"));

                    } else if ($(this).attr("data-display") == 'payment') {

                        var payment = [];

                        $('[name="payment[]"]:checked').each(function () {

                            payment.push($(this).attr('data-title'));

                        });

                        $(this).html(payment.join("<br>"));

                    }

                });

            }



            var handleTitle = function (tab, navigation, index) {

                var total = navigation.find('li').length;

                var current = index + 1;

                // set wizard title

                $('.step-title', $('#form_wizard_1')).text('Step ' + (index + 1) + ' of ' + total);

                // set done steps

                jQuery('li', $('#form_wizard_1')).removeClass("done");

                var li_list = navigation.find('li');

                for (var i = 0; i < index; i++) {

                    jQuery(li_list[i]).addClass("done");

                }



                if (current == 1) {

                    $('#form_wizard_1').find('.button-previous').hide();

                }
                else {

                    $('#form_wizard_1').find('.button-previous').show();

                }

                if (current == 3) {
                    $('#form_wizard_1').find('.button-end').show();
                } else {
                    $('#form_wizard_1').find('.button-end').hide();
                }


                if (current >= total) {

                    $('#form_wizard_1').find('.button-next').hide();

                    $('#form_wizard_1').find('.button-submit').show();

                    displayConfirm();

                } else {

                    $('#form_wizard_1').find('.button-next').show();

                    $('#form_wizard_1').find('.button-submit').hide();

                }

                //$('html, body').scrollTo($('.page-title'));

            }



            // default form wizard

            $('#form_wizard_1').bootstrapWizard({

                'nextSelector': '.button-next',

                'previousSelector': '.button-previous',

                onTabClick: function (tab, navigation, index, clickedIndex) {

                    return false;

                },

                onNext: function (tab, navigation, index) {

                    //success.hide();

                    //error.hide();

                    //if (form.valid() == false) {
                       // return false;
                    //} else {
                        if (index == 1) {
                            InsUpdComplaints1();
                        }
                        else if (index == 2) {
                            InsUpdTab2Data();
                        } else if (index == 3) {
                            InsUpdTab3Data();
                        }
                    //}
                    handleTitle(tab, navigation, index);

                },

                onPrevious: function (tab, navigation, index) {

                    handleTitle(tab, navigation, index);

                },

                onTabShow: function (tab, navigation, index) {

                    var total = navigation.find('li').length;

                    var current = index + 1;

                    var $percent = (current / total) * 100;

                    $('#form_wizard_1').find('.progress-bar').css({

                        width: $percent + '%'

                    });

                }

            });

            $('#form_wizard_1').find('.button-previous').hide();

            $('#form_wizard_1 .button-submit').click(function () {

                InsupdTab4();


            }).hide();



            //unblock code

        }

    };

}();


function fetchComplaintMaster() {
    //var data = {
    //    "Flag":'Y'
    //}
    //alert(JSON.stringify(data))
    jQuery.ajax({
        contentType: "application/json; charset=utf-8",
        url: allurlapi + "Complaintmaster/fetchProblemCategory?Flag=Y",
        type: "GET",
        //data: JSON.stringify(data),
        cache: false,
        crossDomain: true,
        dataType: "json",
        success: function (data) {
            //alert(JSON.stringify(data));
           
           // sessionStorage.setItem('hdnfetchTrains', JSON.stringify(data));
            
            $("#txtProblemType").empty();
            $("#txtProblemType").append("<option value=''>--Select--</option>");
            for (var i = 0; i < data.length; i++) {
                $("#txtProblemType").append("<option value=" + data[i].ProblemCategoryID + ">" + data[i].ProblemCategory + "</option>");
            }
        }

    });
    
}

function endTrain() {
    $('#form_wizard_1').bootstrapWizard('previous');
    $('#form_wizard_1').bootstrapWizard('previous');
}

function endCoach() {
    $('#form_wizard_1').bootstrapWizard('previous');
}