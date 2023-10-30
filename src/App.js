import {Fragment, useState} from "react";
import Layout from "./pages/Layout";
import {sendLeads,sendLeadsTest} from "./api/apiLeads";


//stack overflow https://stackoverflow.com/questions/68483806/react-state-gets-updated-only-after-i-submit-the-form-twice

function App() {

  const [values,setValues] = useState({

        string: 'Select item 469 Marcello Di Stasio Marcello Di Stasio marcellodistasio@outlook.de api True Select item 470 Marci Gorzynski Marci Gorzynski and116@interia.pl api True Select item 471 Marco Danuso Marco Danuso marco.danuso@phillips.com api True Select item 81 Adriano Todisco Adriano Todisco Click to dial disabled+41588618012 ato@e-novinfo.ch kals True Select item 85 Agathe Lebocq Agathe Lebocq Click to dial disabled0613601429 agathelb@yahoo.com api True Select item 85 Adrien Clarinval Adrien Clarinval aclarinval@vincotte.be mmich True Select item 582 Arno van Bunnik Nivon Click to dial disabled0655387101 tech.abk-hh@nivon.nl tbaas False',

        /* 
          Select item 469 
          Marcello Di Stasio 
          Marcello Di Stasio 
          marcellodistasio@outlook.de 
          api 
          True 

          Select item 470 
          Marci Gorzynski 
          Marci Gorzynski 
          and116@interia.pl 
          api 
          True 
           
          Select item 471 
          Marco Danuso 
          Marco Danuso 
          marco.danuso@phillips.com 
          api 
          True 
           
          Select item 81 
          Adriano Todisco 
          Adriano Todisco 
          Click to dial disabled+41588618012 
          ato@e-novinfo.ch 
          kals 
          True 
           
          Select item 85 
          Agathe Lebocq 
          Agathe Lebocq 
          Click to dial disabled0613601429
          agathelb@yahoo.com
          api 
          True

          Select item 85 
          Adrien Clarinval
          Adrien Clarinval
          aclarinval@vincotte.be
          mmich 
          True

          Select item 582
          Arno van Bunnik
          Nivon
          Click to dial disabled0655387101
          tech.abk-hh@nivon.nl
          tbaas
          False

           */

        error: false,
        success: false
  })

  const [leads,setLeads] = useState([
        {

            firstname: "",
            lastname: "",
            email: "",
            phone: "",
            tdl:""

        }
  ]);

  const {string, error, success} = values



  const handleChange = name => e => {

    setValues({...values, [name]:e.target.value})
  }


  const parseString = (callback) => {

    const chunks = string.split("Select item ");

    let newLead = []
    
   for(let i = 1; i < chunks.length; i++) {

         let ck = chunks[i].split(" "); 

         let find_email = ck.find(item => item.includes("@")) || "";

         let find_tdl = find_email.split(".");
         find_tdl = find_tdl[find_tdl.length-1];

         let find_phone = ck.find(item => item.includes("disabled"));
         let trunc_phone = "";

         if(find_phone) {
         trunc_phone = find_phone.slice(8);

         if(trunc_phone.charAt(0)==="0") {           

            trunc_phone = trunc_phone.replace("0","+31");
         }
         }

         if(ck[2]) {

           if(ck[2].length < 4 && ck[3].length < 4) {

          ck[2] = ck[2] + " " + ck[3] + " " + ck[4];
        }

         if(ck[2].length < 4) {
            ck[2] = ck[2] + " " + ck[3];

         }
       
        
        }
        
         newLead.push({

            firstname: ck[1],
            lastname: ck[2],
            email: find_email,
            phone: trunc_phone,
            tdl: find_tdl
         })
       
   }
    setLeads([...newLead])
    callback([...newLead])
   
}

const clickSubmit = (e) => {

       e.preventDefault()
       parseString((updateLeads)=>sendLeads(updateLeads).then(data=>{

        if(data.error) {

            console.log(data.error);
             setValues({...values, error:data.error, loading:false});
        }

        else {

           console.log(data);
          setValues({...values,success:true})        
          
        }
       }));   
       
      
      }

const sLT = (e) => {

    
       parseString((updateLeads)=>sendLeadsTest(updateLeads).then(data=>{

        if(data.error) {

            console.log(data.error);
             setValues({...values, error:data.error, loading:false});
        }

        else {

           console.log(data);
          setValues({...values,success:true})        
          
        }
       }));   
       
      
      }
    

    

  function formInput() {
    return (

      <Fragment>

        <h3>Please enter the text here:</h3>

        <form onSubmit={clickSubmit}>


          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">Textarea</label>
            <textarea onChange={handleChange('string')} className="form-control" id="exampleFormControlTextarea1" rows="10" value={string}></textarea>
          </div>

          <div className="form-group row">
            <div className="col-sm-10">
              <button type="submit" className="btn btn-primary">Parse and send</button>
              <button type="button" onClick={sLT} className="btn btn-primary ml-2">Test</button>
            </div>
          </div>
        </form>
        
          

        <div>
         

        </div>

      </Fragment>

    );
  }

  const showSuccess = () => (

      <button className="alert alert-info" style={{display: success ? '' : 'none'}}>

          <h2>Data has been sent</h2>
        </button>
  )

  const showError = () => (

      <button className="alert alert-danger" style={{display: error ? '' : 'none'}}>

          <h2>{error}</h2>
        </button>
  )

  return (
  
    <Layout title="Lead Parser Input"
              description="tool for parsing leads"
              className="container col-md-8 offset-md-2">

              {showSuccess()}
              {showError()}
              {formInput()}
 


    </Layout>
  );
}

export default App;
