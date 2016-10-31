import sendImageTemplate from './sendImageTemplate.html';
//import sendImageCtrl from './sendImageCtrl.html';

export default function ($stateProvider){
    $stateProvider.state('send-image', {
        parent: 'main',
       // url: '/sendImage',
        params: { },
        //controller: sendImageCtrl,
        template: sendImageTemplate
    });
};