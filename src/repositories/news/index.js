class NewsRepository {
  constructor(config, News) {
    this.config = config;
    this.News = News;
  }

  async getAll(query, select = '') {
    const match = {};
    const sort = {};
    if (query.title) {
      match.title = query.title;
    }

    if (query.from) {
      match.createdAt = { $gte: new Date(query.from).toISOString() };
    }

    if (query.to) {
      match.createdAt = { $lte: new Date(query.to).toISOString() };
    }

    const total = await this.News.find(match).countDocuments();
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || this.config.APP.Reading.Default;
    const skip = (page - 1) * limit;

    if (query.sortBy && query.OrderBy) {
      sort[query.sortBy] = query.OrderBy === 'desc' ? -1 : 1;
    } else {
      sort.createdAt = -1;
    }

    const news = await this.News.find(match).select(select).skip(skip).limit(limit)
      .sort(sort)
      .lean({ virtuals: true });

    return {
      total,
      current_page: page,
      per_page: limit,
      data: news,
    };
  }

  async save(data) {
    const news = new this.News(data);
    return (await news.save()).toObject();
  }
}

module.exports = NewsRepository;
