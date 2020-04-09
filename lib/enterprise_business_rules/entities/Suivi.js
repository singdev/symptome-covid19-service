module.exports = class {

    constructor(){
        this.days = [];
        this.firstDate = new Date();
        this.loadDays();
    }

    loadDays(){
        for(let i = 0; i < 14; i++){
            this.days.push(new Symptome());
        }
    }
}