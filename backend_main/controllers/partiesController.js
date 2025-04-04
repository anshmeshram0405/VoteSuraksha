import Party from "../models/PartiesModel.js";
import Vote from "../models/VotedModel.js";

export const addReceipe = async (req, res) => {
  const receipe = req.body;
  // console.log("receipe==",receipe)
  // const { base64 } = req.body;
  const newReceipe = new Party(receipe);

  try {
    await newReceipe.save();
    res.send(newReceipe);
  } catch (err) {
    res.json({ message: err.message });
  }
};

export const receipeList = async (req, res) => {
  let receipe = await Party.find();
  if (receipe.length > 0) {
    res.send(receipe);
  } else {
    res.send({ result: "No receipe found" });
  }
};

export const giveVote = async (req, res) => {
  const votes = req.body;
  // console.log("receipe==",receipe)
  // const { base64 } = req.body;
  const newVote = new Vote(votes);

  try {
    await newVote.save();
    res.send(newVote);
  } catch (err) {
    res.json({ message: err.message });
  }
};

export const totalVotesList = async (req, res) => {
  let totalVotes = await Vote.find();

  // Combine votes by party_id
  const combinedVotes = totalVotes.reduce((acc, vote) => {
    const party = acc.find((item) => item.party_id === vote.party_id);

    if (party) {
      // If the party_id exists in the accumulator, add to the vote_count
      party.vote_count += parseInt(vote.vote_count, 10);
    } else {
      // If it doesn't exist, add a new object
      acc.push({
        party_id: vote.party_id,
        party_name: vote.party_name,
        vote_count: parseInt(vote.vote_count, 10),
      });
    }

    return acc;
  }, []);

  if (totalVotes.length > 0) {
    res.send({
      totalVotes,
      combinedVotes,
    });
  } else {
    res.send({ result: "No receipe found" });
  }
};

export const deleteAParty = async (req, res) => {
  let result = await Party.deleteOne({ _id: req.params.id });
  res.send(result);
};
