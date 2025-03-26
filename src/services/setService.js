const { Op } = require("sequelize");
const Set = require("../models/Set");
const Track = require("../models/Track");
const User = require("../models/User");
const Like = require("../models/Like");

const getSets = async (user) => {
  const now = new Date();
  const offset = (now.getDay() === 1 ? 0 : 7) - now.getDay();
  const lastMonday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - offset,
    1,
    0,
    0
  );

  const currentUser = await User.findByPk(user.id);
  const currentUserGenres = new Set(currentUser.genres);

  const users = await User.findAll();
  const userMatches = users.map((u) => {
    const matchingGenres = u.genres.filter((genre) =>
      currentUserGenres.has(genre)
    ).length;
    const totalGenres = currentUserGenres.size;
    const matchingPercent = totalGenres > 0 ? matchingGenres / totalGenres : 0;

    return { user: u, matchingPercent };
  });

  userMatches.sort((a, b) => b.matchingPercent - a.matchingPercent);

  const filteredUserIds = userMatches.map((match) => match.user.id);
  const sets = await Set.findAll({
    where: { userId: { [Op.in]: filteredUserIds } },
    include: [Track, User],
  });

  const filteredSets = sets.filter(
    (set) => set.createdAt >= lastMonday && !set.dummy
  );
  const dummySets = sets.filter((set) => set.dummy);

  if (filteredSets.length < 2) {
    filteredSets.push(...dummySets);
  }

  const likes = await Like.findAll({ where: { userId: user.id } });
  const tracksUserLikesMap = new Set(likes.map((like) => like.trackId));

  const trackLikes = await Like.findAll({
    where: { createdAt: { [Op.gte]: lastMonday } },
    attributes: ["trackId", [sequelize.fn("COUNT", "trackId"), "count"]],
    group: ["trackId"],
  });

  const trackLikesCountMap = trackLikes.reduce((map, like) => {
    map[like.trackId] = like.dataValues.count;
    return map;
  }, {});

  return filteredSets.map((set) => ({
    ...set.toJSON(),
    tracks: set.tracks.map((track) => ({
      ...track.toJSON(),
      liked: tracksUserLikesMap.has(track.id),
      likes: trackLikesCountMap[track.id] || 0,
    })),
  }));
};

module.exports = { getSets };
