import React, { useEffect, useState } from "react";
import "./voting.css"
import { useNavigate } from 'react-router-dom';

const VotingPageWrapper = () => {
  const navigate = useNavigate();
  const [receipe, setReceipe] = useState([]);

  useEffect(() => {
    getReceipe();
  }, []);

  const getReceipe = async () => {
    let result = await fetch('http://localhost:5000/receipelist', {
      headers: {
        Authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
    setReceipe(result);

  }
  console.log("receipe==", receipe)

  const handleGiveVote = async (vote_id, party_name) => {

    if (vote_id && party_name) {

      let result = fetch('http://localhost:5000/give-vote', {
        method: 'post',
        body: JSON.stringify({ party_id: vote_id, party_name: party_name, vote_count: 1 }),
        headers: {
          'Content-Type': 'application/json',

        }
      })
      result = await (await result).json();
      console.log(result);
      navigate('/successfull-vote');
    }
  }

  return (
    <>
      <div style={{background: "beige", borderRadius: "8px", height: "90vh" }}>
        <h1 style={{ textAlign: "center", paddingTop: "20px" }}>Give your vote </h1>
        <div>
          <table class="election-table">
            <thead>
              <tr>
                <th>Election Symbol</th>
                <th>Party</th>
                <th>Candidate Name</th>
                <th>Vote</th>
              </tr>
            </thead>
            <tbody>
              {
                receipe && receipe.length > 0 ? receipe.map((v, i) => {
                  return (
                    <tr>
                      <td>
                        <img src={v?.party_symbol} alt="BJP Symbol" height="42" width="42" />
                      </td>
                      <td>{v?.party_name}</td>
                      <td id="cand1">{v?.candidate_name}</td>
                      <td>
                        <button id="vote1" class="btn" onClick={() => handleGiveVote(v._id, v.party_name)} >Vote</button>
                      </td>
                    </tr>
                  )
                }) : ""
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default VotingPageWrapper;
