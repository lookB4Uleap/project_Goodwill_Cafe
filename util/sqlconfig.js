const sqlconfig = {
    user: 'anish',
    password: 'retshift123-AS',
    database: 'goodwill-db',
    server: 'goodwill-server.database.windows.net',
    options: {
      encrypt: true, // for azure
      trustServerCertificate: false // change to true for local dev / self-signed certs
    }
}

export default sqlconfig