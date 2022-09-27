const dotenv = require ('dotenv');
const execSync= require('child_process');

dotenv.config({ path: `.env`});

function setScriptProduction (){
    if(process.env.PROD_ENV==='front'){
        execSync.execSync('cd packages/front && yarn build')
    }else if (process.env.PROD_ENV==='api'){
        execSync.execSync('cd packages/api && yarn build')
    }
}

setScriptProduction()