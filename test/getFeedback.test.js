const mongoose = require("mongoose");
const request = require("supertest");
const Promotion = require("../models/Promotion");
const Feedback = require("../models/Feedback")
const {getFeedbacks} = require("./getFeedbacks");
const app = require("./testServer")
const {MongoMemoryServer} = require("mongodb-memory-server");



describe('Back end function tests', () => {
    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());
    });
     afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });  

    //Test for US2-4: user view comments
    describe('getFeedbacks function', () => {

        describe('given the promoID exists', () => {
      
            it('should return 200 and the comments', async ()=>{

                    const promo = await Promotion.create({
                            name:"Test sale",
                            rentals: [],
                            promoType : "simple",
                            promoNum : 200
                    })
                    const promoID = promo.id;
                    const userID = new mongoose.Types.ObjectId().toString();          
                    const feedback1 = await Feedback.create({
                        promotion: promoID,
                        user: userID,
                        rating: 5,
                        comment: "hello world",
                        username: "kong"
                    })  

                 const res = await request(app).get(`/api/v1/feedbacks/${promoID}`)
                 expect(res.status).toBe(200);
                 console.log(res.body);
                const feedbacks = res.body.data;
                 expect(feedbacks.length).toBeGreaterThan(0);
                expect(typeof feedbacks[0].rating).toBe('number');
            });            
        });

        describe('given the promoID no longer exists', () => {
            it('it should return a 400', async ()=>{
                const fakeUserID = new mongoose.Types.ObjectId().toString(); 
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
});



