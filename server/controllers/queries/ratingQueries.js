const { Rating } = require('../../db/models');
const ServerError = require('../../errors/ServerError');
const {errorLogging} = require('../../utils/logFunction');

module.exports.updateRating = async (data, predicate, transaction) => {
  const [updatedCount, [updatedRating]] = await Rating.update(data,
    { where: predicate, returning: true, transaction });
  if (updatedCount !== 1) {
    const err = new ServerError('cannot update mark on this offer');
    errorLogging(err);
    throw err;
  }
  return updatedRating.dataValues;
};

module.exports.createRating = async (data, transaction) => {
  const result = await Rating.create(data, { transaction });
  if (!result) {
    const err = new ServerError('cannot mark offer');
    errorLogging(err);
    throw err;
  } else {
    return result.get({ plain: true });
  }
};

