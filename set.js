const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUtkSVh4Q1p5QkwvcG55aFpyZmlyWldDN0o2Y2x2dFdoNHRlcGZhak4xMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYTdvNHNiaGRZbVRBZTcwYmE3c2NseVBPZ3BrbzBWMWZWV2Ztd1JZWDFBST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyREJ2aHFyOXVqOHhZRFRaWGtZSVVMc3RIWTQxeTdQUEVtbW5uV2VCSGxvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJamN1U3BqeVV5Smp2U2JzM3BWOGFVRkNadVNKRGxnZXFXQW1PdDRqTGprPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1GVWl2WHRaTTdGdFZxWHh4QmF2WjJvVXBTTVdRdG85cHpMdUd3TzAyMFk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ilhrb0U2MG4vNEZtSmdkL05UOU56NlVibzJOTU4vaitUdnQ4Ly9ETjhYMVU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMFBueDFqNXR6KysrQUVxMmRhdzMwOXhGODB1elgzSHNvMC9KcnpFaG5FND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVG5lVzU5cHhJcVdqMXlBVWc2OWZYZ0d6cGI1bnhvbXRYWVNGU2NsaWJuRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNud3lweU1MZmd6VHByUVFNaFJEYjdvOEpTdHJaaVVKdW1UYXdqUjV4NlhCb1dKL1FxekZuSC8zZStaMzZUS2RxZnpweElBUURxbFlySCszYVczVEJRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTI5LCJhZHZTZWNyZXRLZXkiOiI5cVozcmozdEVvNERQU0FoLytjKzRCdW5DT25vMFQyS3ZDdy8xN09ySXlRPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiI5M2o1cDl0R1IzbXBYNEhmUXFLWFN3IiwicGhvbmVJZCI6IjMyNmZjOTg4LTljOTUtNGY1Ni05ZTc5LTZhYTNlN2QwMjg4NCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2N0NSUGZhRWpzOEJubUsrRFhXWVBkVzNsaU09In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibG5XWUNuMUZOc1ZZSDEvcnlDYjZTTzdlMFJZPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkgxRzFGUUM3IiwibWUiOnsiaWQiOiI5NDcwMjcyMjc2Njo2MEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLwnZG68J2Rh/CdkLTwnZGH8J2RiPCdkbog4Lisx7bhj4bIvvCdkLgg8J2XpvCdmLzwnZi+8J2Zg/CdmYTwnZmJXG5yZWNvcmRpbmcgYXVkaW8uLi5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbsOXXG5cblxuXG5cblxuXG5cblxuIPCdlJIifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ09IeXFOZ0hFS25na2JZR0dCY2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImFEcFN4NkhQNkMvT1czdDkwVXU0Y2pwQk14TlVGaGNGQnp4Ykhpa0VoMWc9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkluZlpHdmxMTmlpNVNmQ1JkV3Azd3VmNVhJSHVob0RTWWt0eURRaG12b0lCWC96QVc4N2JQRFV5dE9SbUtUaURINjBJTTNuSWRwaXdSZGFSb3cwZEF3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJzUG0xVHNVT3RoRnFDcE1SVG5JSUNRV05mak55TnlQOWY2MEI1ejNJWFNYLzhZbW1WbmtMaUFRRHloL0lNMzRZd1RyVmNEVS9VRmhEMDNFd1NaM3hEdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6Ijk0NzAyNzIyNzY2OjYwQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQldnNlVzZWh6K2d2emx0N2ZkRkx1SEk2UVRNVFZCWVhCUWM4V3g0cEJJZFkifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjQxNDk4MTV9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Ibrahim Adams",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 702722766",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
