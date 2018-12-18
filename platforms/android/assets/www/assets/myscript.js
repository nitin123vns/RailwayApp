//var allurlapi = 'http://66.199.232.34/TMSAPI/api/';
//var allurlapi = 'http://localhost:63542/api/';
//var imgPath="http://66.199.232.34/TMSAPI/qrCodes/";

function fetchallQrCodes() {
    //alert(JSON.stringify(data))
    jQuery.ajax({
        contentType: "application/json; charset=utf-8",
        url: allurlapi + "QrCode/fetchQrCodeMaster?Status=Y",
        type: "GET",
        cache: false,
        crossDomain: true,
        dataType: "json",
        success: function (data) {
            //alert(JSON.stringify(data));

            $("#tblqrCodes").empty();
            $("<tr><th>Sr.No</th><th>Coach Number</th><th>QrCode Img</th></tr>").appendTo("#tblqrCodes");
            var j = 1;
            for (var i = 0; i < data.length; i++) {
                $("<tr><td>" + j + "</td><td>" + data[i].QrCodeText + "</td><td><img src=" + imgPath + "" + data[i].QrCodeImg + "/></td></tr>").appendTo("#tblqrCodes");
                j++;
            }


        }

    });
}