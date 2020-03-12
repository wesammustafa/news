class NewsRepository {
  constructor(config, News) {
    this.config = config;
    this.News = News;
  }

  async all(query) {
    const DBQuery = {};
    const select = query.select || {};

    const total = await this.News.find(DBQuery).countDocuments();
    const page = Number(query.page) || 1;

    const limit = Number(query.limit) || this.config.app.reading.perPage;
    const skip = (page - 1) * limit;
    let to = skip + limit;
    if (to > total) to = total;

    const news = await this.News.find(DBQuery).select(select).skip(skip).limit(limit)
      .sort({ created_at: -1 })
      .lean({ virtuals: true });

    return {
      total,
      to,
      current_page: page,
      per_page: limit,
      data: news,
    };
  }

  async getNewsById(id, select = {}) {
    return this.News.findById(id).select(select).lean({ virtuals: true });
  }

  async updateNews(id, data) {
    return this.News.updateOne({ _id: id }, data);
  }

  async deleteNews(id) {
    return this.News.deleteOne({ _id: id });
  }

  getByIds(ids, select = {}) {
    return this.News.find({ _id: { $in: ids } }).select(select);
  }
}

module.exports = NewsRepository;
