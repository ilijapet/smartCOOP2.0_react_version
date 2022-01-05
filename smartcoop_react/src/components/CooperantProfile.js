import { useEthers } from '@usedapp/core';
import { NetworkID } from '../helpers/housekeeping';




const User = () => {
    const { account, chainId } = useEthers()

    return (
        <>
        <section className='container'>                
                <p style={{fontSize:20}}> Cooperant dashboard </p>
                <p> Currently connected to { NetworkID[chainId] }  network </p>
                <p> Connected account:  { account  }</p>             
                <p> COOP tokens on acount: </p> 
                <p> Raspberies in SmartCOOP warehouse  </p>        
                <label htmlFor="deposit_kg" id="deposit_kg_label"> I want to deposit </label>
                <input type="number" id="deposit_kg" placeholder="kg"></input>
                <button type="submit" id="deposit_raspberry" >Deposit your raspberry</button>
                <button id="addToken"> Add COOPtoken to wallet </button>
                <p id="furitsInWarhouse"></p>        
        </section>        
        </>
    )}

export default User;