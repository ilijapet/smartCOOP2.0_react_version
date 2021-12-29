import React from 'react';
import { useEthers } from '@usedapp/core';
import { NetworkID } from '../helpers/housekeeping';




const Admin = () => {
    const { account, chainId } = useEthers()

    return (
        <>
        <section className='container'>            
                <p style={{fontSize:20}}> Admin dashboard </p>               
                <p> Currently connected to {NetworkID[chainId]} network </p>
                {<p> Connected account:  { account  }</p>   }     
                <p> Currently on COOPaccount ETH: </p> 
                <p> Currently rasperies in SmartCOOP warehuse </p>
                <p> Payed in COOP tokens to cooperants </p>        
                <button id="btn__widrow">Widrow ETH </button>     
        </section>
        </>        
    
    )
}

export default Admin;