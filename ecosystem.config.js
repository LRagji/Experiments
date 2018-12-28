module.exports = {
    apps : [{
      name: 'E-commerce',
      script: 'index.js',
  
      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file                                                                                        /
      args: '',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
          PORT:3000,
          DB_USER:"tonystark",
          DB_DB:"tonystark",
          DB_PASS:"P@55word",
          DB_HOST:"localhost"
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }],
  
    deploy : {
      production : {
        user : 'node',
        host : '212.83.163.1',
        ref  : 'origin/master',
        repo : 'git@github.com:repo.git',
        path : '/var/www/production',
        'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env produ                                                                                        ction'
      }
    }
  };
  