import React from 'react'
import { Link } from 'react-router-dom'

const SuccessfulVote = () => {
  return (
    <div style={{
      textAlign: 'center', height: "90vh", display: "flex", alignItems: 'center', margin: '20px 40px', borderRadius: '8px',
      justifyContent: "center", flexDirection: "column", gap: "20px", background: 'linear-gradient(270deg, rgb(103, 135, 156), rgb(150, 220, 203))'
    }}>
      <h2 >You gived vote successfully!</h2>
      <h4 style={{ border: '1px solid #d3d3d3', padding: '20px', background: 'beige', borderRadius: '8px' }} >
        <Link to={'/'} >Go back to home page</Link>
      </h4>
    </div>
  )
}

export default SuccessfulVote
