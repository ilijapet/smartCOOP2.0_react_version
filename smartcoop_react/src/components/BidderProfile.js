import { NetworkID } from "../helpers/housekeeping";
import { useEthers } from "@usedapp/core";

/**
 * This function is responsible for displaying the bidder dashboard.
 * It displays the current connected account and network, the total payed in USD, the total bought from SmartCOOP.
 * @returns None
 */
const Bidder = () => {
  const { ethereum } = window;
  const account = ethereum.selectedAddress;
  const { chainId } = useEthers();

  return (
    <>
      <section className="container">
        <p style={{ fontSize: 20 }}> Bidders dashboard </p>
        <p> Currently connected to {NetworkID[chainId]} network </p>
        {<p> Connected account: {account}</p>}
        <p> Total payed in USD: </p>
        <p> Total bought from SmartCOOP </p>
        <div className="trade">
          <label htmlFor="bought_kilograms" id="bought_label">
            {" "}
            I want to buy{" "}
          </label>
          <input type="number" id="bought_kilograms" placeholder="kg" />
          <button type="submit" id="buy_raspberry">
            Buy raspberry
          </button>
          <p id="boughtFruitsFromWarhouse"></p>
        </div>
      </section>
    </>
  );
};

export default Bidder;
