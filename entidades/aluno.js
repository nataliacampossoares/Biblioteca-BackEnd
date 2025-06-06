class Aluno {
    constructor(ra) {
        this.ra = ra;
    }

    convertToArray(){
        return [this.ra];
    }  
}

module.exports = Aluno;