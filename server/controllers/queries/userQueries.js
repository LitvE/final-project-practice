const { User, Contest, sequelize } = require('../../db/models');
const NotFound = require('../../errors/UserNotFoundError');
const ServerError = require('../../errors/ServerError');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const {errorLogging} = require('../../utils/logFunction');

module.exports.updateUser = async (data, userId, transaction) => {

  const [updatedCount, [updatedUser]] = await User.update(data, { where: { id: userId }, returning: true, transaction });
  if (updatedCount !== 1) {
    const err = new ServerError('cannot update user');
    errorLogging(err);
    throw err; 
  }
  return updatedUser.dataValues;
};

module.exports.findUser = async (predicate, transaction) => {

  const result = await User.findOne({ where: predicate, transaction });
  if (!result) {
    const err = new NotFound('user with this data didn`t exist');
    errorLogging(err);
    throw err;
  } else {
    return result.get({ plain: true });
  }
};

module.exports.userCreation = async (data) => {

  const newUser = await User.create(data);
  if (!newUser) {
    const err = new ServerError('server error on user creation');
    errorLogging(err);
    throw err;
  } else {
    return newUser.get({ plain: true });
  }
};

module.exports.passwordCompare = async (pass1, pass2) => {
  const passwordCompare = await bcrypt.compare(pass1, pass2);
  if (!passwordCompare) {
    const err = new NotFound('Wrong password');
    errorLogging(err);
    throw err;
  }
};

module.exports.countUsersRoles = async (req, res, next) => {
  try {
    const numberOfRoles = await User.count({
      attributes: [
        'role',
      ],
      group: 'role',
    });
    //res.send(numberOfRoles);
    console.dir(numberOfRoles);
  } catch (error) {
    errorLogging(error);
    next(error);
  }
}

module.exports.bonusToPay = async () => {

  try {
    const selectedContests = await Contest.findAll({
      attributes: [[sequelize.fn('sum', sequelize.col('prize')), 'totalPrizes']],
      where: {
        createdAt: {
            [Op.between]: ['2021-12-25','2022-01-14'],
        },
      },
      include: [
        {
          model: User,
        }
      ],
      group: ['User.id'],
      row: true,
    });
  
    selectedContests.forEach(async (sc) => {
        const userToUpdateBalance = await User.findByPk(sc.User.id);
  
        userToUpdateBalance.update({
            balance: (sc.User.balance + (sc.dataValues.totalPrizes*0.1)),
        });
    });
  } catch (error) {
    errorLogging(error);
  }
};

module.exports.bonusForRating = async () => {
  try {
    const creatorsWithHighestRating = await User.findAll(
      {
        where: {
          role: 'creator',
        },
        order: [['rating', 'DESC']],
        limit: 3,
      }
    );

    creatorsWithHighestRating.forEach(async (creator) => {
      
      const userToUpdateBalance = await User.findByPk(creator.id);

      userToUpdateBalance.update({
          balance: (creator.balance + 10.00),
      });
    });
  } catch (error) {
    errorLogging(error);
  }
}

