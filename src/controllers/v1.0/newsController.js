class NewsController {
  constructor(repository) {
    this.repository = repository;
  }

  async index(req, res, next) {
    try {
      const select = 'title description text createdAt';
      const result = await this.repository.getAll(req.query, select);
      return res.sendCreatedSuccess(result);
    } catch (err) {
      return next(err);
    }
  }

  async save(req, res, next) {
    try {
      const news = await this.repository.save(req.body);
      return res.sendCreatedSuccess(news);
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = NewsController;
