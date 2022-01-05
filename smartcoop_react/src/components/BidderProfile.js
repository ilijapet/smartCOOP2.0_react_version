import { useEthers } from '@usedapp/core';
import { NetworkID } from '../helpers/housekeeping';


const Bidder = () => {

const { account, chainId } = useEthers()

    return (
        <>
        <section className='container'>                
                <p style={{fontSize:20}} >  Bidders dashboard </p>           
                <p> Currently connected to { NetworkID[chainId] } network </p>
                {<p> Connected account:  { account  }</p>   }            
                <p> Total payed in USD: </p> 
                <p> Total bought from SmartCOOP </p>            
                <div className="trade"> 
                <label htmlFor="bought_kilograms" id="bought_label"> I want to buy </label>               
                <input type="number" id="bought_kilograms" placeholder="kg" />
                <button type="submit" id="buy_raspberry">                
                Buy raspberry 
                </button>
                <p id="boughtFruitsFromWarhouse"></p>
                </div>
        </section>
        </>        
    
    )
}

export default Bidder;