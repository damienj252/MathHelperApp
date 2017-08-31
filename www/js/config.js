angular.module('starter.config', [])
.constant('DB_CONFIG', {
    name: 'logs.db',
    tables: [
      {
            name: 'LOGS',
            columns: [
                {name: 'newLog', type: 'text'},
                {name: 'newComment', type: 'text'},
            ]
        }
    ]
});
