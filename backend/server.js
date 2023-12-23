"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const server = (0, fastify_1.default)();
const groupBy = (input) => {
    return input.reduce((acc, currentValue) => {
        var _a;
        console.log('currentValue', acc);
        const { company, gender, age, firstName, lastName, address, hair } = currentValue;
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
        acc[department].addressUser = Object.assign(Object.assign({}, acc[department].addressUser), { [firstName + lastName]: postalCode });
        //hair color
        acc[department].hair = Object.assign(Object.assign({}, acc[department].hair), { [hairColor]: ((_a = acc[department].hair[hairColor]) !== null && _a !== void 0 ? _a : 0) + 1 });
        return acc;
    }, {});
};
server.get("/api/data", (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit } = req.query;
    const results = yield fetch(`https://dummyjson.com/users?limit=${limit}`).then((res) => res.json());
    reply
        .header("Access-Control-Allow-Origin", "http://localhost:3000")
        .header("Access-Control-Allow-Methods", "GET, POST")
        .header("Access-Control-Allow-Headers", "Content-Type")
        .send(groupBy(results.users));
}));
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield server.listen(4000);
    }
    catch (err) {
        console.log("Error", err);
    }
});
start();
