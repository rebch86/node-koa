const mysql = require('mysql2/promise');

try {
    /* Step 1, create DB Pool */
    const pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });
    /* Step 2. get connection */
    const getConnection = async () => {
        let connection = null;
        try {
            connection = await pool.getConnection(async conn => conn);
        } catch (err) {
            console.log(err);
        }
        console.log(connection);
    };

} catch (err) {
    console.log(err);

}


