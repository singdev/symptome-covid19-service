const mongoose = require('mongoose')

const Schema = mongoose.Schema;

module.exports = mongoose.model('Tracking', new Schema({
    userId: { type: mongoose.Types.ObjectId, ref: 'Users' },
    firstDate: { type: Date, default: Date.now },
    days: [{
        temperature: { type: Boolean, default: false },
        toux: { type: Boolean, default: false },
        asthenie: { type: Boolean, default: false },
        difficulte_respiratoire: { type: Boolean, default: false },
        douleurs_musculaire: { type: Boolean, default: false },
        diarrhe: { type: Boolean, default: false },
        cephalees: { type: Boolean, default: false },
        maux_de_gorges: { type: Boolean, default: false },
        yeux_rouges: { type: Boolean, default: false },
        ecoulement_nasal: { type: Boolean, default: false },
        autres: { type: Boolean, default: false },
        prelevement: { type: Boolean, default: false },
    }]
}))
