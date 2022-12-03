import express, { query } from 'express'
import pg from "pg";
import cors from 'cors';
import bodyParser from 'body-parser';
const app = express();
import mydata from './Bureau_TOPO.json' assert { type: "json" };
app.use(cors())
app.use(bodyParser.json());

const DATABASE_URL = "postgresql://postgres:qljEtxAsWJCXwG8ix30d@containers-us-west-143.railway.app:8064/railway";
const pool = new pg.Pool({
    DATABASE_URL,
});
app.post('/add_all', (req, res)=>{
    mydata.features.forEach((feature)=>{
        var geom = `POINT(${feature.geometry.coordinates[0]} ${feature.geometry.coordinates[1]})`
        var offre_ing = feature.properties.Offre_ing;
        var offre_tech = feature.properties.Offre_tech;
        var nom = feature.properties.Nom;
        var query_string = `INSERT INTO bureau_topo(nom, offre_ing, offre_tech, geom) VALUES('${nom}', '${offre_ing}', '${offre_tech}', ST_GeomFromText('${geom}', 4326));`;
        pool.query(query_string);
    })
    res.send('done')
})
  const PORT = process.env.PORT || 3300;

  app.listen(PORT, console.log('app running'));
