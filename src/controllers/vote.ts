import voteModel from '../models/vote';
import {Nominee} from '../types';

const createVote = async (ctx: any) => {
  const {awardName, category, firstName, fullName, lastName, year} =
    ctx.request.body;
  if (
    !awardName ||
    !category ||
    !firstName ||
    !fullName ||
    !lastName ||
    !year
  ) {
    return ctx.throw(400, 'Invalid request: Missing values');
  }

  const data = await voteModel.getAwareNominee(awardName, fullName);

  if (data?.Item?.votes) {
    await voteModel.updateAwardNomineeVote(awardName, data?.Item, fullName);
  } else {
    await voteModel.createVote(
      awardName,
      category,
      firstName,
      fullName,
      lastName,
      year
    );
  }
  ctx.body = {
    data: 'Successfully created vote.',
  };
};

const getVotes = async (ctx: any) => {
  const {awardName} = ctx.request.params;
  const {year} = ctx.request.query;
  const {Items} = voteModel.getAwardNomineesByYear(awardName);
  if (!Items?.length)
    ctx.throw(400, 'There are no nominees by this award and year.');
  // map over the nominee and push them into an array
  const nominees: Array<Nominee> = [];
  Items.map(({category, firstName, lastName, votes, year: yearOfAward}) => {
    if (year === yearOfAward)
      nominees.push({category, firstName, lastName, votes});
  });
  ctx.body = {
    awardName,
    year,
    nominees,
  };
};

module.exports = {createVote, getVotes};
