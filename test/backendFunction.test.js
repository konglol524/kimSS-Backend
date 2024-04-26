const mongoose = require("mongoose");
const request = require("supertest");
const Promotion = require("../models/Promotion");
const Feedback = require("../models/Feedback");
const User = require("../models/User");
const {getFeedbacks} = require("./getFeedbacks");
const app = require("./testServer")
const {MongoMemoryServer} = require("mongodb-memory-server");
const jwt = require("jsonwebtoken");

const promoID = new mongoose.Types.ObjectId().toString(); 
const userID = new mongoose.Types.ObjectId().toString(); 
const fakeUserID = new mongoose.Types.ObjectId().toString(); 

const promoPayload = {
    _id : promoID,
    name:"Test sale",
    rentals: [],
    promoType : "simple",
    promoNum : 200
}

const feedbackPayload = {
    promotion: promoID,
    user: userID,
    rating: 5,
    comment: "hello world",
    username: "kong"
}   

const userPayload = {
    _id: userID,
    name: 'konglol',
    telephone: '0109918881',
    email: 'konglol@gmail.com',
    role: "user",
    point: 100,
    password: '12345678',
}


describe('Back end function tests', () => {
    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());
    });
     afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });  

    describe('US2-4: user view comments', () => {

        describe('given the promoID exists', () => {
      
            it('should return 200 and the comments', async ()=>{

                    const promo = await Promotion.create(promoPayload)  
                    const feedback1 = await Feedback.create(feedbackPayload)  

                    const res = await request(app).get(`/api/v1/feedbacks/${promoID}`)
                    expect(res.status).toBe(200);
                    console.log(res.body);
                    const feedbacks = res.body.data;
                    expect(feedbacks.length).toBeGreaterThan(0);
                    expect(typeof feedbacks[0].rating).toBe('number');
                    expect(feedbacks[0].rating).toBe(5);
                    expect(feedbacks[0].promotion).toBe(promoID);
            });            
        });

        describe('given the promoID no longer exists', () => {
            it('it should return a 400', async ()=>{
                const res = await request(app).get(`/api/v1/feedbacks/${fakeUserID}`)
                expect(res.status).toBe(400);
                console.log(res.body.message);
            });            
        });

        describe('given the promoID is not an object id', () => {
            it('should error and return 500', async ()=>{
                const res = await request(app).get('/api/v1/feedbacks/notId')
                expect(res.status).toBe(500);
                console.log(res.body.message);
            });            
        });
        
    });

    describe('US1-3: user view points', () => {

        describe('given the user is not logged in', ()=>{
            it('should return 401', async () => {
                const res = await request(app).get("/api/v1/auth/me");
                expect(res.status).toBe(401);
                expect(res.body.message).toBe('Not authorize to access this route');
            });
            
        })        
        
        describe('given the user is logged in', () => {
            it('should return user\'s info and points', async ()=>{
                 const user = await User.create(userPayload);
                 const token = jwt.sign({ id: user.id }, 'asdfjk;;lkjfdsa');
                 console.log(token);
                 const res = await request(app).get("/api/v1/auth/me").set('Authorization', `Bearer ${token}`);
                 console.log(res.body);
                 expect(res.body.data.point).toBe(100);
            });
        });


    });
});




