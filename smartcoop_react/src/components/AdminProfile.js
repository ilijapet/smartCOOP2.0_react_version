import { NetworkID } from '../helpers/housekeeping';
import { useEthers } from '@usedapp/core'

const Admin = () => {
    const { ethereum } = window;    
    const account = ethereum.selectedAddress;
    const { chainId } = useEthers()    

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