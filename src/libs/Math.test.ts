import {Math} from "./Math";

describe('Testing Math library', ()=>{

    beforeAll(()=>{
        //antes de todos os testes rodarem, essa função será executada
    });

    afterAll(()=>{
        //após todos os testes rodarem, essa função será executada
    });

    it('should sum two numbers correctly', ()=>{
        const response =  Math.sum( 5, 10 );
        expect(response).toBe(15);
    });
 
    it('should subtract two numbers correctly', ()=>{
     const response =  Math.sub( 12, 8 );
     expect(response).toBe(4);
    });
 
    it('should multiply two numbers correctly', ()=>{
     const response =  Math.mut( 10, 3 );
     expect(response).toBe(30);
    });
 
    it('should divide two numbers correctly', ()=>{
     const response =  Math.div( 15, 5 );
     expect(response).toBe(3);
 
     const response2 = Math.div( 3, 0 );
     expect(response2).toBe(false);
    });

    it('se possui determinada propriedade', ()=>{
        const response = {
            nome: "Everton",
            email: "dumpassos@hotmail.com"
        };
        expect(response).not.toHaveProperty("idade");
    });
});

