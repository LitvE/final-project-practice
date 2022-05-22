const { User, Contest, sequelize } = require('../../db/models');
const NotFound = require('../../errors/UserNotFoundError');
const ServerError = require('../../errors/ServerError');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

module.exports.updateUser = async (data, userId, transaction) => {

  const [updatedCount, [updatedUser]] = await User.update(data, { where: { id: userId }, returning: true, transaction });
  if (updatedCount !== 1) {
    throw new ServerError('cannot update user');
  }
  return updatedUser.dataValues;
};

module.exports.findUser = async (predicate, transaction) => {

  const result = await User.findOne({ where: predicate, transaction });
  if (!result) {
    throw new NotFound('user with this data didn`t exist');
  } else {
    return result.get({ plain: true });
  }
};

module.exports.userCreation = async (data) => {

  const newUser = await User.create(data);
  if (!newUser) {
    throw new ServerError('server error on user creation');
  } else {
    return newUser.get({ plain: true });
  }
};

module.exports.passwordCompare = async (pass1, pass2) => {
  const passwordCompare = await bcrypt.compare(pass1, pass2);
  if (!passwordCompare) {
    throw new NotFound('Wrong password');
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
    next(error);
  }
}

module.exports.bonusToPay = async () => {

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
};

module.exports.bonusForRating = async () => {
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

}

