import React from 'react'
import { useNavigate } from 'react-router-dom'

const WelcomeHome = () => {

  const navigate = useNavigate()

  return (
    <div className='welcomehome_page' style={{
      height: "82vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", border: "1px solid #cdcdcd", margin: "40px", background: '#67879C',
      // background: 'linear-gradient(270deg, #67879C, #96DCCB)'
      backgroundImage: 'url(/images/Homebg.jpg)',
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat"
    }}>
      {/* <div style={{ width: "700px" }} > */}
      <div>
        {/* <img style={{ height: "200px" }} src="/images/e-voting-logo.png" alt="" /> */}
        <h1 style={{color: "black"}}>Welcome To! <br />VoteSuraksha</h1>

        {/* <button onClick={()=>navigate('/admin')}>Admin</button> */}
        <button onClick={() => navigate('/admin-login')}>Admin</button>
        <br />
        <button onClick={() => navigate('/face-login')}>Give Vote</button>

      </div>
    </div>
  )
}

export default WelcomeHome;
