const { Watchlist } = require("../models");

class WatchlistController {
  static async postWatchlist(req, res, next) {
    try {
      let { title, cover, url, rating, UserId } = req.body;

      if (Object.keys(req.body).length === 0) {
        throw { name: "EmptyInput1" };
      }

      const existingWatchlistItem = await Watchlist.findOne({
        where: {
          UserId: req.user.id,
          title: title,
        },
      });

      if (existingWatchlistItem) {
        throw { name: "AlreadyExists" };
      }

      let data = await Watchlist.create({
        title,
        cover,
        url,
        rating,
        UserId: req.user.id,
      });
      res.status(201).json({ message: "New Watchlist Added", data });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getWathlistUserId(req, res, next) {
    try {
      let data = await Watchlist.findAll({
        where: {
          UserId: req.user.id,
        },
      });
      if (!data || data.length === 0) {
        throw { name: "InvalidInput" };
      }
      res.status(200).json({ data });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async putWatchlistById(req, res, next) {
    try {
      let { id } = req.params;
      if (Object.keys(req.body).length === 0) {
        throw { name: "EmptyInput1" };
      }
      let data = await Watchlist.findByPk(id);
      if (!data) {
        throw { name: "InvalidInput" };
      }
      await data.update(req.body);
      res.status(200).json({ message: `succes update id` + " " + id, data });
    } catch (error) {
      next(error);
    }
  }

  static async getWatchlistById(req, res, next) {
    try {
      let { id } = req.params;
      let data = await Watchlist.findByPk(id);
      if (!data) {
        throw { name: "InvalidInput" };
      }
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  static async deleteWatchlistById(req, res, next) {
    try {
      let { id } = req.params;

      let data = await Watchlist.findByPk(id);

      if (!data) {
        throw { name: "InvalidInput" };
      }
      data.destroy();
      res
        .status(200)
        .json({ message: `${data.title} success to delete`, data });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = WatchlistController;
