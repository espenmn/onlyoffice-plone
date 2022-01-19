require([
    "jquery"
], function ($) {

    /* Disable a control panel setting */
    $.disableSettings = function (settings) {
        $.each(settings, function (intIndex, setting) {
            setting.addClass('unclickable');
            var setting_field = $(setting).find('input,select');
            setting_field.attr('disabled', 'disabled');
        });
    };

    /* Enable a control panel setting */
    $.enableSettings = function (settings) {
        $.each(settings, function (intIndex, setting) {
            setting.removeClass('unclickable');
            var setting_field = $(setting).find('input,select');
            setting_field.removeAttr('disabled');
        });
    };

    $.updateSettings = function () {
        var demoEnabled = $('#form-widgets-demoEnabled-0').prop('checked');

        if (demoEnabled === true) {
            $.disableSettings([
                $('#formfield-form-widgets-docUrl'),
                $('#formfield-form-widgets-jwtSecret'),
                $('#formfield-form-widgets-docInnerUrl')
            ]);
        }
        else {
            $.enableSettings([
                $('#formfield-form-widgets-docUrl'),
                $('#formfield-form-widgets-jwtSecret'),
                $('#formfield-form-widgets-docInnerUrl')
            ]);
        }
    };

    $.testDocServiceApi = function () {
        var testApiResult = function () {
            var docUrlPublicValidation = $("#form-widgets-docUrlPublicValidation-0");

            var result = typeof DocsAPI != "undefined";

            docUrlPublicValidation.addClass("verified");
            docUrlPublicValidation.prop("checked", result);

            $("#form-buttons-save").click();
        };

        delete DocsAPI;

        $("#scripDocServiceAddress").remove();

        var js = document.createElement("script");
        js.setAttribute("type", "text/javascript");
        js.setAttribute("id", "scripDocServiceAddress");
        document.getElementsByTagName("head")[0].appendChild(js);

        var scriptAddress = $("#scripDocServiceAddress");

        scriptAddress.on("load", testApiResult).on("error", testApiResult);

        var docServiceUrlApi = $("#form-widgets-docUrl").val();

        if (!docServiceUrlApi.endsWith("/")) {
            docServiceUrlApi += "/";
        }

        scriptAddress.attr("src", docServiceUrlApi + "web-apps/apps/api/documents/api.js");
    };

    $("#form-widgets-docUrlPublicValidation").hide();

    $(document).ready(function () {
        $.updateSettings();

        $('#form-widgets-demoEnabled-0').on('change', function(){
            $.updateSettings();
        });

        $("#form-buttons-save").on("click", function(e) {
            if (!$("#form-widgets-docUrlPublicValidation-0").hasClass("verified")) {
                e.preventDefault();
                $.testDocServiceApi();
            }
        });

         /**********************************************************************
         * Remove the disabled attribute from all form elements before
         * submitting the form. Otherwise the z3c.form will raise errors on
         * the required attributes.
         **********************************************************************/
         $('form#OnlyofficeControlPanelForm').bind('submit', function () {
            $(this).find('input,select').removeAttr('disabled');
        });
    });
});
