const chai = require('chai');

const Symptom = require('../../../lib/enterprise_business_rules/entities/Symptom');

const CreateUser = require('../../../lib/application_business_rules/use_cases/CreateUser');
const CreateTracking = require('../../../lib/application_business_rules/use_cases/CreateTracking');
const GetTracking = require('../../../lib/application_business_rules/use_cases/GetTracking');

const UserModel = require('../../../lib/frameworks_drivers/database/models/UserModel')
const TrackingModel = require('../../../lib/frameworks_drivers/database/models/TrackingModel')
const UserRepositoryMongoDB = require('../../../lib/interface_adapters/storage/UserRepositoryMongoDB')
const TrackingRepositoryMongoDB = require('../../../lib/interface_adapters/storage/TrackingRepositoryMongDB')


const userRepositoryMongoDB = new UserRepositoryMongoDB();
const trackingRepository = new TrackingRepositoryMongoDB();

const expect = chai.expect;

const MongoDB = require('../../../lib/frameworks_drivers/database/MongoDB');

MongoDB('testsymptomecovid19');

describe('GetTrackingUserCase', () => {

    const username = "testgettracking";
    const password = "123456";
    let userCreated = null;
    let trackingDate = new Date();
    let trackingDays = [ new Symptom() ];
    let trackingUserId = null;

    before(async () => {
        await TrackingModel.deleteMany({});
        await UserModel.deleteMany({});

        userCreated = await CreateUser(username, password,
            { userRepository: userRepositoryMongoDB });

        const response1 = await CreateTracking(userCreated._id, { trackingRepository});
        const response =await GetTracking(response1._id, { trackingRepository });
        trackingDate = new Date(response.firstDate);
        trackingDays = response.days;
        trackingUserId = response.userId;
    })

    after(async () => {
        await require('mongoose').disconnect();
    })

    it("La premiere date c'est aujourd'hui", () => {
        const today = new Date();
        expect(trackingDate.getDate()).to.equals(today.getDate());
        expect(trackingDate.getMonth()).to.equals(today.getMonth());
        expect(trackingDate.getFullYear()).to.equals(today.getFullYear());
    })

    it("days est un tableau de 14 symptômes dont les symptômes sont à false", () => {
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

    it("Ce tracking appartien bien au user indiqué", () => {
        expect(trackingUserId.toString()).to.equals(userCreated._id.toString());
    })
})