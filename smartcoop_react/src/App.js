import Connect from './Connect'
import BecomeMember from './BecomeMember';
import smartCoopLogo from './noun_raspberry_4132882_mala.svg'



function App() {
   return (   
    <>
    <h1><img src={smartCoopLogo}/></h1>
    <h1>SmartCOOP</h1>
    <h1>smart contract based agricultural cooperative</h1>  
    <div>
      <BecomeMember/>
      <Connect />    
    </div>
    </>   
    

   
  )
};

export default App;
