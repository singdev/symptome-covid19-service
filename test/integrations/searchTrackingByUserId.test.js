const axios = require('axios')
const chai = require('chai');
const User = require('../../lib/enterprise_business_rules/entities/User')
const Symptom = require('../../lib/enterprise_business_rules/entities/Symptom')


const expect = chai.expect;

describe('Create and Get Tracking and update symptom for current day controller test', function(){
    let accessToken = null;
    let response = null;
    let responseGet = null;
    let response3 = null;
    let userId = null;

    const user = new User("testsearch3", "123456")
    const symptom = new Symptom();

    before( async () => {

        const response4 = await axios.post('http://localhost:20201/users', {
            username: user.username,
            password: user.password,
        });
        userId = response4.data.newUser._id;

        const response2 = await axios.post('http://localhost:20201/api/oauth/token', {
            username: user.username,
            password: user.password,
            grant_type: 'password'
        });

        accessToken = response2.data;


        response = await axios.post("http://localhost:20201/tracking", {},
         { headers: { "Authorization": "Bearer " + accessToken,
        "Content-Type": "Application/json"}})

        //Mettre à jour les symptômes du jour
        symptom.temperature = true;
        symptom.prelevement = true;
        symptom.cephalees = true;
        response3 = await axios.put("http://localhost:20201/tracking/" + response.data.newTracking._id, symptom, 
        { headers: { "Authorization": "Bearer " + accessToken,
        "Content-Type": "Application/json"}})

        responseGet = await axios.get("http://localhost:20201/tracking/search/by-user", 
        { headers: { "Authorization": "Bearer " + accessToken,
        "Content-Type": "Application/json"}});

    })  

    it("Status 200", () => {
        expect(responseGet.status).to.equals(200); 
    });

    it("Le resultat est un tableau d'une case ", () => {
        expect(responseGet.data).instanceOf(Array);
    });

    it("La première case contient quelque chose", () => {
        expect(responseGet.data[0]).to.not.equals(undefined)
    });

    it("La réponse contient bien un symptom enregistré", () => {
        responseGet.data.forEach(d => {
            expect(d.userId).to.equals(userId);
        })
    });
})