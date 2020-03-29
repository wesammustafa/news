/* eslint-disable quotes */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const request = require('supertest');
const { expect } = require('chai');
const app = require('../../app');
const News = require('../../src/repositories/news/model');


describe('news', () => {
  afterEach(async () => {
    await News.deleteMany({});
  });

  describe('GET /api/v1.0/news', () => {
    it('should return news empty list', async () => {
      const res = await request(app).get('/api/v1.0/news');
      expect(res.status).to.equal(200);
      expect(res.body.data.data.length).to.equal(0);
      expect(res.headers['content-type']).to.match(/json/);
    });

    it('should return news list with two elements', async () => {
      await News.insertMany([
        {
          title: 'Real Madrid team',
          description: 'Real madrid is a spanish team who plays football',
          text: "attempt to test this apis and hope it's gonna work well :)",
        },
        {
          title: 'Real Madrid team',
          description: 'Real madrid is a spanish team who plays football',
          text: "attempt to test this apis and hope it's gonna work well :)",
        },
      ]);
      const res = await request(app).get('/api/v1.0/news');
      expect(res.status).to.equal(200);
      expect(res.body.data.data.length).to.equal(2);
      expect(res.body.data.total).to.equal(2);
      expect(res.body.data.current_page).to.equal(1);
      expect(res.body.data.per_page).to.equal(15);
      expect(res.headers['content-type']).to.match(/json/);
    });

    it('should return news with specific title', async () => {
      await News.insertMany([
        {
          title: 'Real Madrid team',
          description: 'Real madrid is a spanish team who plays football',
          text: "attempt to test this apis and hope it's gonna work well :)",
        },
      ]);
      const res = await request(app).get('/api/v1.0/news?title=Real Madrid team');
      expect(res.body.data.data[0].title).to.equal('Real Madrid team');
      expect(res.status).to.equal(200);
      expect(res.body.data.data.length).to.equal(1);
      expect(res.headers['content-type']).to.match(/json/);
    });

    it('should return no news within date range if the data range has no news ', async () => {
      await News.insertMany([
        {
          title: 'Real Madrid team',
          description: 'Real madrid is a spanish team who plays football',
          text: "attempt to test this apis and hope it's gonna work well :)",
        },
      ]);

      const from = new Date('2019-03-01').toISOString();
      const to = new Date('2020-03-01').toISOString();
      const res = await request(app).get(`/api/v1.0/news?from=${from}&to=${to}`);
      expect(res.status).to.equal(200);
      expect(res.body.data.data.length).to.equal(0);
      expect(res.headers['content-type']).to.match(/json/);
    });

    it('should return news within specific date range', async () => {
      await News.insertMany([
        {
          title: 'Real Madrid team',
          description: 'Real madrid is a spanish team who plays football',
          text: "attempt to test this apis and hope it's gonna work well :)",
        },
        {
          title: 'Real Madrid team',
          description: 'Real madrid is a spanish team who plays football',
          text: "attempt to test this apis and hope it's gonna work well :)",
        },
        {
          title: 'Real Madrid team',
          description: 'Real madrid is a spanish team who plays football',
          text: "attempt to test this apis and hope it's gonna work well :)",
        },
      ]);

      const to = new Date().toISOString();
      const res = await request(app).get(`/api/v1.0/news?to=${to}`);
      expect(res.status).to.equal(200);
      expect(res.body.data.data.length).to.equal(3);
      expect(res.headers['content-type']).to.match(/json/);
    });
  });

  describe('POST /api/v1.0/news', () => {
    let news;
    beforeEach(() => {
      news = {
        title: 'Real Madrid team',
        description: 'Real madrid is a spanish team who plays football',
        text: "attempt to test this apis and hope it's gonna work well :)",
      };
    });

    const exec = async () => request(app).post('/api/v1.0/news').send(news);

    it('it should return validation error if title is more than 100 character', async () => {
      news.title = 'o'.repeat(101);
      const res = await exec();
      expect(res.body.errors.title.length).to.equal(1);
      expect(res.body.errors.title).to.match(/less than or equal to 100/);
      expect(Object.keys(res.body.errors).length).to.equal(1);
    });

    it('it should return validation error if description is more than 400 character', async () => {
      news.description = 'o'.repeat(401);
      const res = await exec();
      expect(res.body.errors.description.length).to.equal(1);
      expect(res.body.errors.description).to.match(/less than or equal to 400/);
      expect(Object.keys(res.body.errors).length).to.equal(1);
    });

    it('it should return validation error if text is not provided', async () => {
      delete news.text;
      const res = await exec();
      expect(res.body.errors.text.length).to.equal(1);
      expect(res.body.errors.text).to.match(/required/);
      expect(Object.keys(res.body.errors).length).to.equal(1);
    });

    it('it should return success if data is valid', async () => {
      const res = await exec();
      expect(res.status).to.equal(201);
      expect(res.headers['content-type']).to.match(/json/);
      expect(res.body.data.id).to.be.exist;
      expect(res.body.errors).to.be.undefined;
    });
  });
});
