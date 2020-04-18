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

    const user = new User("test2", "123456")
    const symptom = new Symptom();

    before( async () => {

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

        responseGet = await axios.get("http://localhost:20201/tracking/" + response.data.newTracking._id, 
        { headers: { "Authorization": "Bearer " + accessToken,
        "Content-Type": "Application/json"}})
    })  

    it("Create Response status", () => {
        expect(response.status).to.equals(200);
    })

    it("Create Response body contain newTracking", () => {
        expect(response.data.newTracking).to.not.equals(undefined);
    })

    it("new Tracking: first date c'est aujourd'hui", () => {
        const trackingDate = new Date(response.data.newTracking.firstDate);
        const today = new Date();
        expect(trackingDate.getDate()).to.equals(today.getDate());
        expect(trackingDate.getMonth()).to.equals(today.getMonth());
        expect(trackingDate.getFullYear()).to.equals(today.getFullYear());
    })

    it("new Tracking: tous les symptômes sont à false", () => {
        const trackingDays = response.data.newTracking.days;
        expect(trackingDays.length).to.equals(14);
        trackingDays.forEach(symptom => {
            expect(symptom.temperature).to.equals(false);
            expect(symptom.toux).to.equals(false);
            expect(symptom.asthenie).to.equals(false);
            expect(symptom.diarrhe).to.equals(false);
            expect(symptom.maux_de_gorges).to.equals(false);
            expect(symptom.cephalees).to.equals(false);
            expect(symptom.prelevement).to.equals(false);
            expect(symptom.douleurs_musculaire).to.equals(false);
            expect(symptom.ecoulement_nasal).to.equals(false);
            expect(symptom.yeux_rouges).to.equals(false);
            expect(symptom.difficulte_respiratoire).to.equals(false);
            expect(symptom.autres).to.equals(false);
        })
    })

    it("Update status", () => {
        expect(response3.status).to.equals(200);
    })

    it("Get status", () => {
        expect(responseGet.status).to.equals(200);
    })

    it("Les symptôme d'aujourd'hui ont été mis à jour correctement", () => {
        const updateTracking = responseGet.data;
        console.log(updateTracking);
        expect(updateTracking.days.length).to.equals(14);
        const symptom = updateTracking.days[0];
        expect(symptom.temperature).to.equals(true);
        expect(symptom.toux).to.equals(false);
        expect(symptom.asthenie).to.equals(false);
        expect(symptom.diarrhe).to.equals(false);
        expect(symptom.maux_de_gorges).to.equals(false);
        expect(symptom.cephalees).to.equals(true);
        expect(symptom.prelevement).to.equals(true);
        expect(symptom.douleurs_musculaire).to.equals(false);
        expect(symptom.ecoulement_nasal).to.equals(false);
        expect(symptom.yeux_rouges).to.equals(false);
        expect(symptom.difficulte_respiratoire).to.equals(false);
        expect(symptom.autres).to.equals(false);
    })
})