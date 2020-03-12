class NewsController {
  constructor(DBModel) {
    this.DBModel = DBModel;
  }

  async index(req, res) {
    return res.json({ success: true });
  }

  async save(req, res) {
    return res.json({ success: true });
  }
}

module.exports = NewsController;
