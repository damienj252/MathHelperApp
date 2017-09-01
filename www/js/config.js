angular.module('starter.config','ngCordova', [])
.constant('DB_CONFIG', {
    name: 'logs.db',
    tables:
    [{
            name: 'DOCUMENT',
            columns:
            [
                {name: 'newLog', type: 'text'},
                {name: 'newComment', type: 'text'},
            ]}
    ]
});
