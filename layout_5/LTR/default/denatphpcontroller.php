<?php
include_once ($_SERVER['DOCUMENT_ROOT'].'/limitless/layout_5/LTR/default/mysql.php');
header("Content-type: application/json"); 
$str_json = file_get_contents('php://input'); //($_POST doesn't work here)
$response = json_decode($str_json, true); // decoding received JSON to array

if (is_null($response) && strpos($str_json, '&') !== false){
    $jqxdata = explode('&',$str_json);
    foreach ($jqxdata as &$value) {
        $resp_init = explode('=',$value);
        $response[$resp_init[0]] = $resp_init[1];
    }
}


switch ($response[0]) {

    case 'GET_EVENT':
        $db = new MySQL();
        $event = $db->get_results("SELECT * FROM calender");
        echo json_encode($event);
        break; 
     case 'NOTIF_NUM':
        $db = new MySQL();
        $notifnum = $db->get_results("SELECT COUNT(*) AS notifnum FROM `notification` WHERE `N_STATUS`='UNREAD'");
        echo json_encode($notifnum);
        break; 
    case 'READ_NOTIF':
        $db = new MySQL();
        $update_where = array( 'N_ID' => $response[2] );
        echo $db->update( 'notification', $response[1], $update_where, 1 );
        break;

    case 'SEARCH_STAT':
        $db = new MySQL();
        $totalnum = $db->get_results("SELECT COUNT(*) AS totalnum FROM `personnel` ");
        $officernum = $db->get_results("SELECT COUNT(*) AS offnum FROM `personnel` WHERE `P_RANK`='OFFICER'");
        $sousoffnum = $db->get_results("SELECT COUNT(*) AS sousoffnum FROM `personnel` WHERE `P_RANK`='SOUSOFF'");
        $malenum = $db->get_results("SELECT COUNT(*) AS malenum FROM `personnel` WHERE `P_SEX`='M'");
        $PERSONNEL=[$totalnum,$officernum,$sousoffnum,$malenum];
        echo json_encode($PERSONNEL);
        break; 


    case 'ADD_NOTIF':
        $db = new MySQL();
        
        //$key = $db->get_results("SELECT MAX(DM_CLE) + 1 as k FROM dossier_maritime")[0]['k'];
        //$response[1]['DM_CLE'] = $key;
        echo $db->insert( 'notification', $response[1]);
        break;
    case 'ADD_EVENT':
        $db = new MySQL();
        
        //$key = $db->get_results("SELECT MAX(DM_CLE) + 1 as k FROM dossier_maritime")[0]['k'];
        //$response[1]['DM_CLE'] = $key;
        echo $db->insert( 'calender', $response[1]);
        break;

    case 'ADD_PERSONNEL':
        $db = new MySQL();
        
        //$key = $db->get_results("SELECT MAX(DM_CLE) + 1 as k FROM dossier_maritime")[0]['k'];
        //$response[1]['DM_CLE'] = $key;
        echo $db->insert( 'personnel', $response[1]);
        break;

    case 'SEARCH_PERSONNEL':
        $db = new MySQL();
        $PERSONNEL = $db->get_results("SELECT * FROM personnel");
        echo json_encode($PERSONNEL);
        break; 

    case 'SEARCH_ONE_PERSONNEL':
        $db = new MySQL();
        $PERSONNEL = $db->get_results("SELECT * FROM personnel WHERE P_NAME = '$response[1]'");
        echo json_encode($PERSONNEL);
        break; 
    case 'GET_NOTIF':
        $db = new MySQL();
        $PERSONNEL = $db->get_results("SELECT * FROM notification WHERE N_STATUS = '$response[1]'");
        echo json_encode($PERSONNEL);
        break; 
    case 'SEARCH_BY_SERVICE':
        $db = new MySQL();
        $PERSONNELBYSERVICE = $db->get_results("SELECT * FROM personnel WHERE P_POSITION LIKE '$response[1]%'");
        echo json_encode($PERSONNELBYSERVICE);
        break; 



    case 'fournisseurs':
        $db = new MySQL();
        $fournisseurs = $db->get_results("SELECT FR_CODE,FR_LIBELLE FROM trans.fournisseur");
        echo json_encode($fournisseurs);
        break;
    
    case 'clients':
        $db = new MySQL();
        $clients = $db->get_results("SELECT CL_CODE,CL_LIBELLE FROM trans.client");
        echo json_encode($clients);
        break;

    case 'navire':
        $db = new MySQL();
        $navire = $db->get_results("SELECT NA_CODE,NA_LIBELLE FROM trans.navire");
        echo json_encode($navire);
        break;

    case 'port':
        $db = new MySQL();
        $port = $db->get_results("SELECT PO_CODE,PO_LIBELLE FROM trans.port");
        echo json_encode($port);
        break; 
        
    case 'CL_ADDRESS':
        $db = new MySQL();
        $CL_ADDRESS = $db->get_results("SELECT CL_ADRESSE from trans.client WHERE CL_CODE = '$response[1]'");
        echo json_encode($CL_ADDRESS);
        break; 

    case 'SEARCH_DOS':
        $db = new MySQL();
        $DM_NUM_DOSSIER = $db->get_results("SELECT DM_IMP_EXP,DM_CODE_COMP_GROUP,DM_ATTRIBUER FROM dossier_maritime WHERE DM_NUM_DOSSIER LIKE '$response[1]'");
        $usn = $DM_NUM_DOSSIER[0]['DM_ATTRIBUER'];
        if ($usn) {
            $DM_NUM_DOSSIER['UFNAME'] = $db->get_results("SELECT group_concat( concat( name, ' ',subname ) SEPARATOR ' ') as UFNAME FROM users WHERE username = '$usn'")[0]['UFNAME'];
        }else {
            $DM_NUM_DOSSIER['UFNAME'] = '';
        }
        echo json_encode($DM_NUM_DOSSIER);
        break; 

    case 'GET_DOS_MIG_MARCH':
        $db = new MySQL();
        $GET_DOS_MIG_MARCH["data"] = $db->get_results("SELECT DM_CLE,DM_NUM_BL,DM_MARCHANDISE,DM_POIDS,DM_NOMBRE,CL_LIBELLE from dossier_maritime, client WHERE DM_NUM_DOSSIER = '$response[1]' and DM_CLIENT = CL_CODE");//'$response[1]'");
        echo json_encode($GET_DOS_MIG_MARCH);
        break; 

    case 'GET_MARCH_DATA':
        $db = new MySQL();
        $GET_MARCH_DATA = $db->get_results("SELECT DM_FOURNISSEUR,DM_CLIENT,DM_MARCHANDISE,DM_DATE_EMBARQ,DM_DATE_DECHARG,DM_POIDS,DM_NUM_BL,DM_NAVIRE,DM_POL,DM_POD,DM_NOMBRE,DM_LONGUEUR,DM_LARGEUR,DM_HAUTEUR,DM_TERME,DM_MARQUE,DM_ESCALE,DM_RUBRIQUE,DM_VAL_DEVISE FROM trans.dossier_maritime WHERE DM_CLE = '$response[1]'");
        echo json_encode($GET_MARCH_DATA);
        break;

    case 'MODIF_DOS_MIG':
        $db = new MySQL();
        $update_where = array( 'N_ID' => $response[2] );
        echo $db->update( 'notification', $response[1], $update_where, 1 );
        break;

    case 'GEN_NEW_DOS_NUM':
        $db = new MySQL();
        $CPT = $db->get_results("SELECT MAX(NUMERO) + 1 as CPT FROM compteur_dossier")[0]['CPT'];
        switch (strlen((string) $CPT)) {
            case '1':
                $CPT = '000'.$CPT;
                break;
            case '2':
                $CPT = '00'.$CPT;
                break;
            case '3': 
                $CPT = '0'.$CPT;
                break;
            
            default:
                break;
        }
        echo date('Y').date('m').$CPT;
        break;  

    case 'ADD_To_MIG':
        $db = new MySQL();
        $key = $db->get_results("SELECT MAX(DM_CLE) + 1 as k FROM dossier_maritime")[0]['k'];
        $response[1]['DM_CLE'] = $key;
        echo $db->insert( 'dossier_maritime', $response[1]);
        break;

    case 'SAVE_DOS':
        $db = new MySQL();
        //$key = $db->get_results("SELECT MAX(NUMERO) + 1 as CPT FROM compteur_dossier")[0]['CPT'];
        echo $db->insert( 'compteur_dossier', array('NUMERO' => $response[1]));
        break;

    case 'CONF_DEL_PASS':
        $db = new MySQL();
        $key = $db->get_results("SELECT data FROM CONF_TAB where id = 'sup_pass'")[0]['data'];
        //echo $key . '  '.$response[1];
        if ( $key == $response[1]) {
            $where = array( 'DM_NUM_DOSSIER' => $response[2]);
            echo $db->delete( 'dossier_maritime', $where );
        }else{
            echo 'Wrong';
        }
        break;
        

    default:
        echo json_encode('{"0":"Error"}');
        echo json_encode($response);
        break;
}
?>