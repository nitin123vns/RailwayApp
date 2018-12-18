//var allurlapi = 'http://localhost:63542/api/';
var allurlapi = 'http://66.199.232.34/TMSAPI/api/';

function fetchtrainMaster() {

    //alert(JSON.stringify(data))
    jQuery.ajax({
        contentType: "application/json; charset=utf-8",
        url: allurlapi + "RailMaintenance/fetchtrainMaster",
        type: "GET",
        cache: false,
        crossDomain: true,
        dataType: "json",
        success: function (data) {
            //alert(JSON.stringify(data));
            sessionStorage.setItem('hdnfetchTrains', JSON.stringify(data));
        }

    });
    
}


function fileUploader(frmctrlID, trainNo, coachno) {

    var formData = new window.FormData();

    var file = $('#' + frmctrlID).prop("files")[0];

    //var genregNo = sessionStorage.getItem('hdnvehicleID');
    //alert("FileUpload" + file);
    formData.append("file", file);

    formData.append("Trainno", trainNo);

    formData.append("CoachNo", coachno);
    formData.append("UploadFor", "Web");

    $.ajax({
        type: 'POST',
        url: "http://66.199.232.34/TMSAPI/ConfigureFileAttachment.ashx",

        data: formData,

        processData: false,

        contentType: false,

        success: function (data) {
           // bootbox.alert("Data Saved Successfully.");
        },

        error: function () {

            bootbox.alert("Attachment error.");

        }

    });
}



function fileUploaderCam(fileToUpload, trainNo, coachno, AttachementFileName) {

    var formData = new window.FormData();
    var blob = new Blob([fileToUpload], { type: "image/png" });
    var file = new File([blob], AttachementFileName + '.png', { type: "application/octet-stream" });
   // var file = fileToUpload.prop("files")[0];
    //var genregNo = sessionStorage.getItem('hdnvehicleID');
    //alert("FileUploadCam" + fileToUpload);
    formData.append("file", blob);

    formData.append("Trainno", trainNo);

    formData.append("CoachNo", coachno);
    formData.append("UploadFor", "Web");
    //formData.append("appimg", fileupload);
    //alert(JSON.stringify(formData));
    $.ajax({
        type: 'POST',
        url: "http://66.199.232.34/TMSAPI/ConfigureFileAttachment.ashx",

        data: formData,

        processData: false,

        contentType: false,

        success: function (data) {
            //bootbox.alert("Data Saved Successfully. No need To worry!");
        },

        error: function () {

            bootbox.alert("Attachment error.");

        }

    });
}

function LogOut() {

    sessionStorage.clear();
    window.location.href = "index.html";
}