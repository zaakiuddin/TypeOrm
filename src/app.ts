import express from 'express';
import "reflect-metadata";
import { DataSource } from 'typeorm';
import { User } from './entites/user';


const app = express();
app.use(express.json());
const port = 3000;
app.get('/', async function (req, res) {

    const userRepo = AppDataSource.getRepository(User);
    //gettinmg all the records 
    //when we work any repo of typeorm all methods of that repository 
    //are always asynchronous then we use promises concept, so we use async and await
    //const allRecords = await userRepo.find();
    //await userRepo.delete(1);

    let user : User= new User();
    user.id= 1;
    user.email = "faiq@gmail.com";
    user.firstName = "faiq";
    user.lastName = "raza";
    const userInserted = await userRepo.save(user);



    res.json(userInserted);

});

const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Zak81@zaki',
    database: 'typeOrm',
    synchronize: true,
    entities: ["src/entites/*{.ts,.js}"],

    logging: true
  });

  AppDataSource.initialize().then(() => {console.log("connected");
  app.listen(port, ()=>{ 
    console.log('listening on port ${port}');
}); 
}).catch(err => console.log("error: ", err));


