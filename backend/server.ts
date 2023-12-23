import fastify from "fastify";
import { IDetailUser, IUser } from "./type";
const server = fastify();


const groupBy = (input: IDetailUser[]) => {
  return input.reduce((acc: any, currentValue: IDetailUser) => {
    const { company, gender, age, firstName, lastName, address, hair } =
      currentValue;
    const hairColor = hair.color;
    const postalCode = address.postalCode;
    const department = company.department;

    if (!acc[department]) {
      acc[department] = {
        male: 0,
        female: 0,
        minAge: Infinity,
        maxAge: -Infinity,
        hair: {},
        addressUser: {},
      };
    }

    //gender
    acc[department][gender]++;

    //age
    if (age < acc[department].minAge) {
      acc[department].minAge = age;
    }
    if (age > acc[department].maxAge) {
      acc[department].maxAge = age;
    }
    acc[department].ageRange =
      acc[department].minAge + "-" + acc[department].maxAge;

    //address
    acc[department].addressUser = {
      ...acc[department].addressUser,
      [firstName + lastName]: postalCode,
    };

    //hair color
    acc[department].hair = {
      ...acc[department].hair,
      [hairColor]: (acc[department].hair[hairColor] ?? 0) + 1,
    };
    return acc
  }, {});
};


server.get("/api/data", async (req, reply) => {
  const { limit } = req.query as any
  const results = await fetch(`https://dummyjson.com/users?limit=${limit}`).then(
    (res) => res.json()
  );
  
  reply
    .header("Access-Control-Allow-Origin", "http://localhost:3000")
    .header("Access-Control-Allow-Methods", "GET, POST")
    .header("Access-Control-Allow-Headers", "Content-Type")
    .send(groupBy(results.users));
});

const start = async () => {
  try {
    await server.listen(4000);
  } catch (err) {
    console.log("Error", err);
  }
};

start();
