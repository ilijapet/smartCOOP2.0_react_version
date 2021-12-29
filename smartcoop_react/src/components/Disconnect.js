import React, { useState } from 'react';
import { useEthers } from '@usedapp/core'
import Connect from './Connect'


const Discconect = () => {

  const [hide, setHide] = useState(false);
  const {  deactivate } = useEthers()
  

  return (
      <>
    <div>
      <div>
        <button id="btn-disconnect" onClick={() => {   window.location.reload(); setHide(!hide);}}> Discconect wallet </button>
      </div>
      { hide && <Connect />}
    </div>
    </>
  )
}



export default Discconect;