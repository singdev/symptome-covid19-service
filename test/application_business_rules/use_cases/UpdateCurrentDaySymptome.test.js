const chai = require('chai');

const Symptom = require('../../../lib/enterprise_business_rules/entities/Symptom');

const CreateUser = require('../../../lib/application_business_rules/use_cases/CreateUser');
const CreateTracking = require('../../../lib/application_business_rules/use_cases/CreateTracking');
const UpdateCurrentDaySymptom = require('../../../lib/application_business_rules/use_cases/UpdateCurrentDaySymptom');
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

let removeDayCount = 0;

describe('UpdateCurrentDaySymptom', () => {

    const username = "testupdatecurrentdaysymptom";
    const password = "123456";
    let userCreated = null;
    let tracking = null;
    let updateTracking = null;
    let symptom1 = new Symptom();

    before(async () => {
        await TrackingModel.deleteMany({});
        await UserModel.deleteMany({});

        userCreated = await CreateUser(username, password,
            { userRepository: userRepositoryMongoDB });
    })

    beforeEach(async () => {
        await TrackingModel.deleteMany({});

        const today = new Date();
        today.setDate(today.getDate() - removeDayCount);

        const response = await CreateTracking(userCreated._id, { trackingRepository }, today);
        tracking = response;

        symptom1.temperature = true;
        symptom1.prelevement = true;
        symptom1.cephalees = true;

        const response2 = await UpdateCurrentDaySymptom(tracking._id, symptom1, { trackingRepository });

        updateTracking = await GetTracking(response2._id, { trackingRepository });
    })

    after(async () => {
        await require('mongoose').disconnect();
    })

    for(let i = 0; i < 14; i++){
        it("Jour " + (i + 1), () => {
            expect(removeDayCount).to.equals(i);
            expect(updateTracking.days.length).to.equals(14);
            const symptom = updateTracking.days[removeDayCount];
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

            removeDayCount++;
        })
    }
})