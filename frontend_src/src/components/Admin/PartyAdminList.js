import React, { useEffect, useState } from "react";
import "../../pages/voting.css";
import { Link } from "react-router-dom";

const PartyAdminList = () => {

  const [receipe, setReceipe] = useState([]);
  const [totalVoteList, settotalVoteList] = useState([]);

  useEffect(() => {
    getPartyList();
    getTotalVoteList();
  }, []);

  const getPartyList = async () => {
    let result = await fetch('http://localhost:5000/receipelist', {
      headers: {
        // Authorization: `bearer ${JSON.parse(localStorage.getItem('token')) }`
      }
    });
    result = await result.json();
    setReceipe(result);

  }
  console.log("receipe==", receipe)

  const getTotalVoteList = async () => {
    let result = await fetch('http://localhost:5000/total-votes', {
      headers: {
        // Authorization: `bearer ${JSON.parse(localStorage.getItem('token')) }`
      }
    });
    result = await result.json();
    console.log("result==", result)
    settotalVoteList(result?.combinedVotes);

  }


  const handledeleteAParty = async (id) => {
    let result = await fetch(`http://localhost:5000/delete-party/${id}`, {
      method: 'Delete',
      headers: {
        // Authorization: `bearer ${JSON.parse(localStorage.getItem('token')) }`
      }
    })
    result = await result.json();
    if (result) {
      alert("Record is deleted");
      getPartyList();
    } else {
      alert("You not able to delete this party");
    }
  }

  return (
    <div style={{ padding: "20px 10%" }}>
      <div style={{ display: "flex",gap:"10px", justifyContent: "space-between", alignItems: "center" }} >
        <h1>Party List</h1>
        <Link to={'/add-party'} className="add_newparty_btn1" >Add new party</Link>
        <Link to={'/'} className="add_newparty_btn1" >Logout</Link>

      </div>

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
                    <td  >
                      <button class="btn" style={{width:"100px"}}  onClick={() => handledeleteAParty(v?._id)} >Delete</button>
                    </td>
                  </tr>
                )
              }) : ""
            }

          </tbody>
        </table>

      </div>

      <div>

        <h2>Total Votes of Parties</h2>
        <div style={{display:'flex', gap:'20px', justifyContent:'space-between',alignContent: 'center',
flexWrap: 'wrap',
        }}>

       
        {
          totalVoteList && totalVoteList.length > 0 ? totalVoteList.map((v, i) => {
            return (
<div className="total_cardsofvote">
<h2>{v?.party_name}</h2>

                    <h3>
                      {v.vote_count}
                    </h3>
</div>
            )
 }) : ""}
  </div>

        {/* <table class="election-table">
          <thead>
            <tr>

              <th>Party</th>
              <th>Total Votes</th>
            </tr>
          </thead>
          <tbody>
            {
              totalVoteList && totalVoteList.length > 0 ? totalVoteList.map((v, i) => {
                return (
                  <tr>

                    <td>{v?.party_name}</td>

                    <td>
                      {v.vote_count}
                    </td>
                  </tr>
                )
              }) : ""
            }

          </tbody>
        </table> */}

      </div>

    </div>
  )
}

export default PartyAdminList;
