module.exports = class {

    constructor(temperature = false,
        toux = false,
        asthenie = false,
        difficulte_respiratoire = false,
        douleurs_musculaire, diarrhe = false,
        cephaless = false,
        maux_de_gorges = false,
        yeux_rouges = false,
        ecoulement_nasal = false,
        autres = false,
        prelevement = false) {

        this.temperature = temperature;
        this.toux = toux;
        this.asthenie = asthenie;
        this.difficulte_respiratoire = difficulte_respiratoire;
        this.douleurs_musculaire = douleurs_musculaire;
        this.diarrhe = diarrhe;
        this.cephalees = cephaless;
        this.maux_de_gorges = maux_de_gorges;
        this.yeux_rouges = yeux_rouges;
        this.ecoulement_nasal = ecoulement_nasal;
        this.autres = autres;
        this.prelevement = prelevement;
    }
}