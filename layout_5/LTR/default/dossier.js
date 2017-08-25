$(document).ready(function() {
    $('.bootstrap-select').selectpicker();
    //init combox : Nature Dossier && Type Dossier
    $('.multiselect').multiselect({
        onChange: function() {
            $.uniform.update();
        }
    });

    // Buttons with progress/spinner
    // ------------------------------

    // Button with spinner
    Ladda.bind('.btn-ladda-spinner', {
        dataSpinnerSize: 16,
        timeout: 2000
    });

    // Button with progress
    Ladda.bind('.btn-ladda-progress', {
        callback: function(instance) {
            var progress = 0;
            var interval = setInterval(function() {
                progress = Math.min(progress + Math.random() * 0.1, 1);
                instance.setProgress(progress);

                if (progress === 1) {
                    instance.stop();
                    clearInterval(interval);
                }
            }, 200);
        }
    });


    // Success
    $('.multiselect-success').multiselect({
        buttonClass: 'btn btn-success'
    });
    // init radio inside combox 
    $(".styled, .multiselect-container input").uniform({ radioClass: 'choice' });

    //Selection de dossier
    $("#BTN_SEL_DOS").on('click', function() {
        Select_DOS();
    });

    function Select_DOS() {

        var choix = [];
        choix.push($('select#SEL_N_DOS').val(), $('select#SEL_T_DOS').val(), $('select#SEL_CG_DOS').val());
        console.log(choix.join(' '));
        switch (choix.join(' ')) {
            case "Maritime IMPORT G":
                $('#DOS_MAR_NAME').html('Dossier Maritime Import Groupage');
                $('#DIV_MAR').css("display", "block");
                $('#TAB_MIG').DataTable().columns.adjust().draw();
                break;
            case "Maritime IMPORT C":
                $('#DOS_MARC_NAME').html('Dossier Maritime Import Complet');
                $('#DIV_MAR_COMP').css("display", "block");
                break;
            case "Maritime EXPORT G":
                $('#DOS_MAR_NAME').html('Dossier Maritime Export Groupage');
                $('#DIV_MAR').css("display", "block");
                break;
            case "Maritime EXPORT C":
                $('#DOS_MARC_NAME').html('Dossier Maritime Export Complet');
                $('#DIV_MAR_COMP').css("display", "block");
                break;
            default:
                //hide maritime part if no choice
                console.log('MART DEFAULT CASE');
                $('#DOS_MAR_NAME').html('Dossier ...');
                $('#DIV_MAR').css("display", "none");
                break;
        }


        var choix_aeriene = [];
        choix_aeriene.push($('select#SEL_N_DOS').val(), $('select#SEL_T_DOS').val());

        switch (choix_aeriene.join(' ')) {
            case "Aériene Import":
                $('#DOS_AER_NAME').html('Dossier Aériene Import');
                $('#DIV_AER').css("display", "block");
                break;
            case "Aériene Export":
                $('#DOS_AER_NAME').html('Dossier Aériene Export');
                $('#DIV_AER').css("display", "block");
                break;
            default:
                //hide maritime part if no choice
                $('#DOS_AER_NAME').html('Dossier ...');
                $('#DIV_AER').css("display", "none");
                break;
        }
    }

    // Setting datatable defaults
    $.extend($.fn.dataTable.defaults, {
        select: true,
        responsive: true,
        autoWidth: true,
        columnDefs: [{
            orderable: false,
            width: '100%',
            targets: [5]
        }],
        //dom: '<"datatable-header"fl><"datatable-scroll"t><"datatable-footer"ip>',
        dom: '<"datatable-header"><"datatable-scroll"t><"datatable-footer">',
        language: {
            search: '<span>Filtre:</span> _INPUT_',
            searchPlaceholder: '...',
            lengthMenu: '<span>Affichage:</span> _MENU_',
            paginate: {
                'first': 'First',
                'last': 'Last',
                'next': '&rarr;',
                'previous': '&larr;'
            },
            sEmptyTable: "|*|-------------------->{ Aucune donnée disponible }<--------------------|*|",
            sInfo: "Affichage de _START_ à _END_ de _TOTAL_ entrées",
            sInfoEmpty: "Affichage de 0 à 0 de 0 entrées",
            sInfoFiltered: "(filtrer de _MAX_ totale entrées)",
            sInfoPostFix: "",
            sDecimal: "",
            sThousands: ",",
            sLengthMenu: "Show _MENU_ entries",
            sLoadingRecords: "Chargement...",
            sProcessing: "Progression...",
            sSearch: "Chercher:",
            sSearchPlaceholder: "",
            sUrl: "",
            sZeroRecords: "No matching records found"
        },
        drawCallback: function() {
            $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').addClass('dropup');
        },
        preDrawCallback: function() {
            $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').removeClass('dropup');
        }
    });

    //init combox
    $.post('/GTRANS/public/Dossier/Maritime/mart_gro.php', JSON.stringify(['fournisseurs'])).fail(function(data) {
        console.log('fail' + data);
    }).done(function(data) {
        data.forEach(function(element) {
            $('#fournisseurs_MIG').append('<option value="' + element.FR_CODE + '">' + element.FR_LIBELLE + '</option>');
        }, this);
        $("#fournisseurs_MIG").selectpicker("refresh");
    });

    $.post('/GTRANS/public/Dossier/Maritime/mart_gro.php', JSON.stringify(['clients'])).fail(function(data) {
        console.log('fail' + data);
    }).done(function(data) {
        data.forEach(function(element) {
            $('#clients_MIG').append('<option value="' + element.CL_CODE + '">' + element.CL_LIBELLE + '</option>');
            //$('#clients_PC_MIG').append('<option value="' + element.CL_CODE + '">' + element.CL_LIBELLE + '</option>');
        }, this);
        $("#clients_MIG").selectpicker("refresh");
        // $("#clients_PC_MIG").selectpicker("refresh");
    });

    $.post('/GTRANS/public/Dossier/Maritime/mart_gro.php', JSON.stringify(['navire'])).fail(function(data) {
        console.log('fail' + data);
    }).done(function(data) {
        data.forEach(function(element) {
            $('#navire_MIG').append('<option value="' + element.NA_CODE + '">' + element.NA_LIBELLE + '</option>');
        }, this);
        $("#navire_MIG").selectpicker("refresh");
    });

    $.post('/GTRANS/public/Dossier/Maritime/mart_gro.php', JSON.stringify(['port'])).fail(function(data) {
        console.log('fail' + data);
    }).done(function(data) {
        data.forEach(function(element) {
            $('#port_DEP_MIG').append('<option value="' + element.PO_CODE + '">' + element.PO_LIBELLE + '</option>');
            $('#port_ARR_MIG').append('<option value="' + element.PO_CODE + '">' + element.PO_LIBELLE + '</option>');
        }, this);
        $("#port_DEP_MIG").selectpicker("refresh");
        $("#port_ARR_MIG").selectpicker("refresh");
    });

    $('#clients_MIG').on('changed.bs.select', function(e) {
        var selected = e.target.value;
        $.post('/GTRANS/public/Dossier/Maritime/mart_gro.php', JSON.stringify(['CL_ADDRESS', selected])).fail(function(data) {
            console.log('fail' + data);
        }).done(function(data) {
            $('#clients_ADR_MIG').val(data[0].CL_ADRESSE);
        });
    });

    $('#GET_DMIG').on('click', function() {

    });

    $('#DOS_NUM_INP').on('keypress', function(e) {
        if (e.which === 13) {
            $('#GET_DOS_BTN').click();
        }
    });

    //table hide culumn
    var table = $('#TAB_MIG').DataTable();

    $('#BTN_ATT_U_ADD_MIG').on('click', function() {
        $.post('/GTRANS/sys/session.php').fail(function(data) {
            console.log('fail' + data);
        }).done(function(data) {
            var info = JSON.parse(data);
            $('#DM_ATTRIBUER_MIG').attr("user", info.user_connected);
            $('#DM_ATTRIBUER_MIG').val(info.user_name);
        });
    });

    $('#GET_DOS_BTN').on('click', function() {
        $.post('/GTRANS/public/Dossier/Maritime/mart_gro.php', JSON.stringify(['SEARCH_DOS', $('#DOS_NUM_INP').val()])).done(function(data) {
            if (Object.keys(data).length) {
                switch (data[0].DM_CODE_COMP_GROUP) {
                    case '': //Case Aerian
                        $('option[value="Aeriene"]', $('#SEL_N_DOS')).attr('selected', 'selected');
                        $('option[value="Aeriene"]', $('#SEL_N_DOS')).prop('selected', true);

                        $('option[value="' + data[0].DM_IMP_EXP + '"]', $('#SEL_T_DOS')).attr('selected', 'selected');
                        $('option[value="' + data[0].DM_IMP_EXP + '"]', $('#SEL_T_DOS')).prop('selected', true);

                        $('option[value="A"]', $('#SEL_CG_DOS')).attr('selected', 'selected');
                        $('option[value="A"]', $('#SEL_CG_DOS')).prop('selected', true);
                        break;

                    case 'G':
                        $('option[value="Maritime"]', $('#SEL_N_DOS')).attr('selected', 'selected');
                        $('option[value="Maritime"]', $('#SEL_N_DOS')).prop('selected', true);

                        $('option[value="' + data[0].DM_IMP_EXP + '"]', $('#SEL_T_DOS')).attr('selected', 'selected');
                        $('option[value="' + data[0].DM_IMP_EXP + '"]', $('#SEL_T_DOS')).prop('selected', true);

                        $('option[value="G"]', $('#SEL_CG_DOS')).attr('selected', 'selected');
                        $('option[value="G"]', $('#SEL_CG_DOS')).prop('selected', true);
                        $('#DM_ATTRIBUER_MIG').attr("user", data[0].DM_ATTRIBUER);
                        $('#DM_ATTRIBUER_MIG').val(data.UFNAME);
                        if (data.UFNAME) {
                            $('#BTN_ATT_U_ADD_MIG').prop('disabled', true);
                        } else {
                            $('#BTN_ATT_U_ADD_MIG').prop('disabled', false);
                        }
                        $('#DM_ATTRIBUER_MIG').prop('readonly', true);
                        switch (data[0].DM_IMP_EXP + data[0].DM_CODE_COMP_GROUP) {
                            case 'IMPORTG':
                                $('#TAB_MIG').DataTable({
                                    select: {

                                        style: 'single'
                                    },
                                    destroy: true,
                                    scrollY: "200px",
                                    scrollX: false,
                                    scrollCollapse: true,
                                    paging: false,
                                    ajax: {
                                        url: "/GTRANS/public/Dossier/Maritime/mart_gro.php",
                                        type: "POST",
                                        data: function(d) {
                                            return JSON.stringify({
                                                "0": "GET_DOS_MIG_MARCH",
                                                "1": $('#DOS_NUM_INP').val()
                                            });
                                        },
                                    },
                                    aoColumnDefs: [{ "sClass": "hide_me", "aTargets": [0] }],
                                    columns: [
                                        { "data": "DM_CLE" },
                                        { "data": "DM_NUM_BL" },
                                        { "data": "DM_MARCHANDISE" },
                                        { "data": "DM_POIDS" },
                                        { "data": "DM_NOMBRE" },
                                        { "data": "CL_LIBELLE" }
                                    ]
                                });
                                $('#TAB_MIG').DataTable().columns.adjust().draw();
                                break;

                            case 'EXPORTG':
                                $('#TAB_MIG').DataTable({
                                    select: {

                                        style: 'single'
                                    },
                                    destroy: true,
                                    scrollY: "150px",
                                    scrollX: false,
                                    scrollCollapse: true,
                                    paging: false,
                                    ajax: {
                                        url: "/GTRANS/public/Dossier/Maritime/mart_gro.php",
                                        type: "POST",
                                        data: function(d) {
                                            return JSON.stringify({
                                                "0": "GET_DOS_MIG_MARCH",
                                                "1": $('#DOS_NUM_INP').val()
                                            });
                                        },
                                    },
                                    aoColumnDefs: [{ "sClass": "hide_me", "aTargets": [0] }],
                                    columns: [
                                        { "data": "DM_CLE" },
                                        { "data": "DM_NUM_BL" },
                                        { "data": "DM_MARCHANDISE" },
                                        { "data": "DM_POIDS" },
                                        { "data": "DM_NOMBRE" },
                                        { "data": "CL_LIBELLE" }
                                    ],

                                });
                                $('#TAB_MIG').DataTable().columns.adjust().draw();
                                break;

                            default:
                                break;
                        }
                        break;

                    case 'C':
                        $('option[value="Maritime"]', $('#SEL_N_DOS')).attr('selected', 'selected');
                        $('option[value="Maritime"]', $('#SEL_N_DOS')).prop('selected', true);

                        $('option[value="' + data[0].DM_IMP_EXP + '"]', $('#SEL_T_DOS')).attr('selected', 'selected');
                        $('option[value="' + data[0].DM_IMP_EXP + '"]', $('#SEL_T_DOS')).prop('selected', true);

                        $('option[value="C"]', $('#SEL_CG_DOS')).attr('selected', 'selected');
                        $('option[value="C"]', $('#SEL_CG_DOS')).prop('selected', true);

                        $('#DM_ATTRIBUER_MIC').attr("user", data[0].DM_ATTRIBUER);
                        $('#DM_ATTRIBUER_MIC').val(data.UFNAME);
                        if (data.UFNAME) {
                            $('#BTN_ATT_U_ADD_MIC').prop('disabled', true);
                        } else {
                            $('#BTN_ATT_U_ADD_MIC').prop('disabled', false);
                        }
                        $('#DM_ATTRIBUER_MIC').prop('readonly', true);
                        break;
                    default:
                        break;
                }
                $('#SEL_N_DOS').multiselect('refresh');
                $('#SEL_T_DOS').multiselect('refresh');
                $('#SEL_CG_DOS').multiselect('refresh');
                $.uniform.update();
                $('#DOS_SELECT_DIV').css("display", "block");
                //setFormSubmitting();
                Select_DOS();
            } else {
                $('#DOS_SELECT_DIV').css("display", "none");
                $('#DIV_MAR').css("display", "none");
            }

        });
    });

    $('#TAB_MIG tbody').on('click', 'tr', function() {
        var tableData = $(this).children("td").map(function() {
            return $(this).text();
        }).get();
        //alert(tableData[0])
        //alert("Your data is: " + $.trim(tableData[0]) + " , " + $.trim(tableData[1]) + " , " + $.trim(tableData[2]) + " , " + $.trim(tableData[3]) + " , " + $.trim(tableData[4]));
        $.post('/GTRANS/public/Dossier/Maritime/mart_gro.php', JSON.stringify(['GET_MARCH_DATA', tableData[0]])).fail(function(data) {
            console.log('fail' + data);
        }).done(function(data) {
            $.post('/GTRANS/public/Dossier/Maritime/mart_gro.php', JSON.stringify(['CL_ADDRESS', data[0].DM_CLIENT])).fail(function(data) {
                console.log('fail' + data);
            }).done(function(data) {
                $('#clients_ADR_MIG').val(data[0].CL_ADRESSE);
            });
            $('#fournisseurs_MIG').val(data[0].DM_FOURNISSEUR);
            $('#clients_MIG').val(data[0].DM_CLIENT);
            $('#BL_MIG').val(data[0].DM_NUM_BL);
            $('#navire_MIG').val(data[0].DM_NAVIRE);
            $('#port_DEP_MIG').val(data[0].DM_POL);
            $('#port_ARR_MIG').val(data[0].DM_POD);
            $('#MARCH_MIG').val(data[0].DM_MARCHANDISE);
            $('#Date_Dep_MIG').val(new Date(data[0].DM_DATE_EMBARQ).formatDate('dd/MM/yyyy'));
            $('#Date_arr_MIG').val(new Date(data[0].DM_DATE_DECHARG).formatDate('dd/MM/yyyy'));
            $('#Poids_MIG').val(data[0].DM_POIDS);
            $('#Nombre_MIG').val(data[0].DM_NOMBRE);
            $('#long_MIG').val(data[0].DM_LONGUEUR);
            $('#larg_MIG').val(data[0].DM_LARGEUR);
            $('#haut_MIG').val(data[0].DM_HAUTEUR);
            $('#term_MIG').val(data[0].DM_TERME.toUpperCase());
            $('#marq_MIG').val(data[0].DM_MARQUE.toLowerCase());
            $('#escal_MIG').val(data[0].DM_ESCALE);
            $('#Rubr_MIG').val(data[0].DM_RUBRIQUE);
            $('#VAL_DEV_MIG').val(data[0].DM_VAL_DEVISE);
            $(".bootstrap-select").selectpicker("refresh");
        });
    });

    /*var formSubmitting = false;
    var setFormSubmitting = function() { formSubmitting = true; };
    var NotsetFormSubmitting = function() { formSubmitting = false; };
    var isDirty = function() { return false; };
    window.onload = function() {
        window.addEventListener("beforeunload", function(e) {
            if (formSubmitting) {
                return undefined;
            }
            var confirmationMessage = 'It looks like you have been editing something. ' +
                'If you leave before saving, your changes will be lost.';

            (e || window.event).returnValue = confirmationMessage; //Gecko + IE
            return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
        });
    };*/

    $('#ADD_NEW_DMIG').on('click', function() {
        $('#TAB_MIG').DataTable({
            select: {

                style: 'single'
            },
            destroy: true,
            scrollY: "200px",
            scrollX: false,
            scrollCollapse: true,
            paging: false,
            ajax: {
                url: "/GTRANS/public/Dossier/Maritime/mart_gro.php",
                type: "POST",
                data: function(d) {
                    return JSON.stringify({
                        "0": "GET_DOS_MIG_MARCH",
                        "1": $('#DOS_NUM_INP').val()
                    });
                },
            },
            aoColumnDefs: [{ "sClass": "hide_me", "aTargets": [0] }],
            columns: [
                { "data": "DM_CLE" },
                { "data": "DM_NUM_BL" },
                { "data": "DM_MARCHANDISE" },
                { "data": "DM_POIDS" },
                { "data": "DM_NOMBRE" },
                { "data": "CL_LIBELLE" }
            ]
        });
        $.post('/GTRANS/public/Dossier/Maritime/mart_gro.php', JSON.stringify(['GEN_NEW_DOS_NUM'])).fail(function(data) {
            console.log('fail' + data);
        }).done(function(data) {
            $('#DOS_SELECT_DIV').css("display", "block");
            $('#DIV_MAR').css("display", "none");
            DMIEG_CLEAN();
            $('#DOS_NUM_INP').val(data);
            $('#TAB_MIG').DataTable().columns.adjust().draw();
            $.post('/GTRANS/sys/session.php').fail(function(data) {
                console.log('fail' + data);
            }).done(function(data) {
                var info = JSON.parse(data);
                $('#DM_ATTRIBUER_MIG').attr("user", info.user_connected);
                $('#DM_ATTRIBUER_MIG').val(info.user_name);
            });
        });
    });

    $('#BTN_SAVE_MIG').on('click', function() {
        var id = $('#DOS_NUM_INP').val();
        $.post('/GTRANS/public/Dossier/Maritime/mart_gro.php', JSON.stringify(['SAVE_DOS', id.substr(id.length - 4)])).fail(function(data) {
            console.log('fail' + data);
        }).done(function(data) {
            DMIEG_CLEAN();
            var num_d = $('#DOS_NUM_INP').val();
            $('#DOS_NUM_INP').val('');
            $('#DOS_SELECT_DIV').css("display", "none");
            $('#DIV_MAR').css("display", "none");
            $.jGrowl('Dossier sauvegardé avec succès', {
                position: 'top-center',
                header: 'N° DOS : ' + num_d,
                theme: 'bg-success-800 alert-styled-left alert-styled-custom'
            });
        });
    });

    function toDate(dateStr) {
        const [day, month, year] = dateStr.split("/");
        return [year, month, day].join('/');
    }
    $('#BTN_MOD_MIG').on('click', function() {
        var dataArr;
        $.each($("#TAB_MIG tr.selected"), function() {
            dataArr = $(this).find('td').eq(0).text();
        });
        $.post('/GTRANS/public/Dossier/Maritime/mart_gro.php', JSON.stringify(['MODIF_DOS_MIG', {
            'DM_FOURNISSEUR': $('#fournisseurs_MIG').val(),
            'DM_CLIENT': $('#clients_MIG').val(),
            'DM_NUM_BL': $('#BL_MIG').val(),
            'DM_NAVIRE': $('#navire_MIG').val(),
            'DM_POL': $('#port_DEP_MIG').val(),
            'DM_POD': $('#port_ARR_MIG').val(),
            'DM_MARCHANDISE': $('#MARCH_MIG').val(),
            'DM_DATE_EMBARQ': toDate($('#Date_Dep_MIG').val()),
            'DM_DATE_DECHARG': toDate($('#Date_arr_MIG').val()),
            'DM_POIDS': $('#Poids_MIG').val(),
            'DM_NOMBRE': $('#Nombre_MIG').val(),
            'DM_LONGUEUR': $('#long_MIG').val(),
            'DM_LARGEUR': $('#larg_MIG').val(),
            'DM_HAUTEUR': $('#haut_MIG').val(),
            'DM_TERME': $('#term_MIG').val(),
            'DM_MARQUE': $('#marq_MIG').val(),
            'DM_ESCALE': $('#escal_MIG').val(),
            'DM_RUBRIQUE': $('#Rubr_MIG').val(),
            'DM_VAL_DEVISE': $('#VAL_DEV_MIG').val(),
        }, dataArr])).fail(function(data) {
            console.log('fail');
            console.dir(data);
        }).done(function(data) {
            console.log(data);
            $('#TAB_MIG').DataTable().ajax.reload();
        });
    });

    $('#BTN_ADD_to_MIG').on('click', function() {
        $('#TAB_MIG').DataTable().columns.adjust().draw();
        $.post('/GTRANS/public/Dossier/Maritime/mart_gro.php', JSON.stringify(['ADD_To_MIG', {
            'DM_NUM_DOSSIER': $('#DOS_NUM_INP').val(),
            'DM_FOURNISSEUR': $('#fournisseurs_MIG').val(),
            'DM_CLIENT': $('#clients_MIG').val(),
            'DM_NUM_BL': $('#BL_MIG').val(),
            'DM_NAVIRE': $('#navire_MIG').val(),
            'DM_POL': $('#port_DEP_MIG').val(),
            'DM_POD': $('#port_ARR_MIG').val(),
            'DM_MARCHANDISE': $('#MARCH_MIG').val(),
            'DM_DATE_EMBARQ': toDate($('#Date_Dep_MIG').val()),
            'DM_DATE_DECHARG': toDate($('#Date_arr_MIG').val()),
            'DM_POIDS': $('#Poids_MIG').val(),
            'DM_NOMBRE': $('#Nombre_MIG').val(),
            'DM_LONGUEUR': $('#long_MIG').val(),
            'DM_LARGEUR': $('#larg_MIG').val(),
            'DM_HAUTEUR': $('#haut_MIG').val(),
            'DM_TERME': $('#term_MIG').val(),
            'DM_MARQUE': $('#marq_MIG').val(),
            'DM_ESCALE': $('#escal_MIG').val(),
            'DM_RUBRIQUE': $('#Rubr_MIG').val(),
            'DM_VAL_DEVISE': $('#VAL_DEV_MIG').val(),
            'DM_CODE_COMP_GROUP': $('select#SEL_CG_DOS').val(),
            'DM_IMP_EXP': $('select#SEL_T_DOS').val(),
            'DM_ATTRIBUER': $('#DM_ATTRIBUER_MIG').attr("user")
        }])).fail(function(data) {
            console.log('fail');
            console.dir(data);
        }).done(function(data) {
            console.log(data);
            $('#TAB_MIG').DataTable().ajax.reload();
        });
    });

    function DMIEG_CLEAN() {
        $('#TAB_MIG').dataTable().fnClearTable();
        $('#BL_MIG').val('');
        $('#MARCH_MIG').val('');
        $('#Date_Dep_MIG').val('');
        $('#Date_arr_MIG').val('');
        $('#Poids_MIG').val('');
        $('#Nombre_MIG').val('');
        $('#long_MIG').val('');
        $('#larg_MIG').val('');
        $('#haut_MIG').val('');
        $('#escal_MIG').val('');
        $('#Rubr_MIG').val('');
        $('#VAL_DEV_MIG').val('');
        $('#clients_ADR_MIG').val('');
    }

    function get_center_pos(width, top) {
        // top is empty when creating a new notification and is set when recentering
        if (!top) {
            top = 90;
            // this part is needed to avoid notification stacking on top of each other
            $('.ui-pnotify').each(function() {
                top += $(this).outerHeight() + 20;
            });
        }

        return {
            "top": top,
            "left": ($(window).width() / 2) - (width / 2) + 10
        };
    }
    $(window).resize(function() {
        $(".ui-pnotify").each(function() {
            $(this).css(get_center_pos($(this).width(), $(this).position().top));
        });
    });
    $('#DEL_DMIG').on('click', function() {

        var notice = new PNotify({
            title: 'Supprimer Dos : ' + $('#DOS_NUM_INP').val(),
            icon: 'icon-warning22',
            addclass: 'custom text-center',
            width: '20%',
            before_open: function(PNotify) {
                PNotify.get().css(get_center_pos(PNotify.get().width()));
            },
            text: 'Entrez le mot de passe pour supprimer, cette opération n\'est pas reversible !',
            hide: false,
            confirm: {
                prompt: true,
                prompt_class: 'text-center',
                buttons: [{
                        text: 'Confirmer',
                        addClass: 'btn btn-sm bg-teal-800'
                    },
                    {
                        text: 'Annuler',
                        addClass: 'btn btn-sm bg-default'
                    }
                ]
            },
            buttons: {
                closer: false,
                sticker: false
            },
            history: {
                history: false
            }
        });

        // On confirm
        notice.get().on('pnotify.confirm', function(e, notice, val) {
            var id = $('#DOS_NUM_INP').val();
            $.post('/GTRANS/public/Dossier/Maritime/mart_gro.php', JSON.stringify(['CONF_DEL_PASS', val, id])).fail(function(data) {
                notice.cancelRemove().update({
                    title: 'Mot de passe incorrect !',
                    text: 'Erreur : contacter l\'administrateur !',
                    icon: 'icon-blocked',
                    type: 'error',
                    delay: 2000,
                    hide: true,
                    confirm: {
                        prompt: false
                    },
                    buttons: {
                        closer: true,
                        sticker: true
                    }
                });
            }).done(function(data) {
                DMIEG_CLEAN();
                $('#DOS_NUM_INP').val('');
                $('#DOS_SELECT_DIV').css("display", "none");
                $('#DIV_MAR').css("display", "none");
                notice.cancelRemove().update({
                    title: 'Mot de passe confirmé',
                    text: 'Dossier supprimé définitivement. ' + id + '.',
                    icon: 'icon-checkmark3',
                    type: 'success',
                    delay: 2000,
                    hide: true,
                    confirm: {
                        prompt: false
                    },
                    buttons: {
                        closer: true,
                        sticker: true
                    }
                });
            });

        });

        // On cancel
        notice.get().on('pnotify.cancel', function(e, notice) {
            notice.cancelRemove().update({
                title: 'Operation annuler !',
                text: '',
                icon: 'icon-blocked',
                type: 'info',
                delay: 2000,
                hide: true,
                confirm: {
                    prompt: false
                },
                buttons: {
                    closer: true,
                    sticker: true
                }
            });
        });

        $('.ui-pnotify-action-bar').children('input').attr('type', 'password');
    });

});