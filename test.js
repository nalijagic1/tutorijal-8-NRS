let server = require("./server")
let chai = require("chai")
let chaiHttp = require("chai-http")
let mocha = require("mocha")
const {startDb,closeDb,beforeAndAfterEachShowGradove} = require('./server.js');
chai.should()
chai.use(chaiHttp)
describe('CRUD REST operacije',()=>{
    before(function () {
        startDb
    });

    after(function () {
        closeDb
    });

    beforeEach(function () {
        beforeAndAfterEachShowGradove
    });

    afterEach(function () {
        beforeAndAfterEachShowGradove
    });

    it("vraca se grad sa index-om 1", (done) => {
        chai.request(server).get("/gradovi/1").end((err, res) => {
            //console.log(res.body)
            res.should.have.status(200);
            res.should.to.be.json;
            res.body.should.not.be.a('array');
            
            res.body.should.contains("\"id\":1")
            done()
        });
    });

    it("grad se dodaje u bazu", (done) => {
        chai.request(server).post("/grad").send({
            id:7,
            naziv: "Banja Luka",
            broj_stanovnika: 100
          }).end((err, res) => {
            res.should.have.status(200);
            res.body.naziv.should.be.equal("Banja Luka");
            res.body.broj_stanovnika.should.be.equal(100);
            done()
        });
    });

    it("vracaju se svi gradovi", (done) => {
        chai.request(server).get("/gradovi").end((err, res) => {
            res.should.have.status(200);
            res.should.to.be.json;
            done()
        });
    });

    it("mijenja se grad", (done) => {
        chai.request(server).put("/gradovi/2").send({broj_stanovnika:300}).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.text.should.equal("A row 2 has been updated")
            done()
        });
    });

    it("brise se grad", (done) => {
        chai.request(server).get("/gradovi/1").end((err, res) => {
            res.should.have.status(200);
            done()
        });
    });
})