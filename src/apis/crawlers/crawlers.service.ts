import { Injectable } from '@nestjs/common';
import cheerio from 'cheerio';
import puppeteer from 'puppeteer';
import axios from 'axios';

@Injectable()
export class CrawlersService {
  async naverBestCrawler() {
    const naverData = [];

    const url =
      'https://search.shopping.naver.com/best/category/keyword?categoryCategoryId=ALL&categoryDemo=A00&categoryRootCategoryId=ALL&chartRank=1&period=P1D';
    const naverHtml = await axios.get(url);
    const $ = cheerio.load(naverHtml.data);

    $(
      '#container > div > div > div > div.category_panel > div > ul > li > a',
    ).each((i, elem) => {
      const keyword = $(elem)
        .text()
        .replace($(elem).children('.chartList_rank__ZTvTo').text(), '')
        .replace($(elem).children('.chartList_status__YiyMu').text(), '')
        .replace($(elem).children('.chartList_toggle__cQZC_').text(), '');
      naverData.push({ keyword, rank: i + 1 });
    });

    return naverData;
  }
  async street11BestCrawler() {
    const street11Data = [];

    const url = 'https://www.11st.co.kr/main';
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
    // 페이지의 크기를 설정한다.
    await page.setViewport({
      width: 1366,
      height: 768,
    });
    await page.goto(url);
    await page.click(
      '#gnb > div > div.b_header_gnb > div > div.c_gnb_raking > div > button',
    );
    const content = await page.content();

    const $ = cheerio.load(content);
    $('#tabpanel-ranking-2-1 > ul > li > a').each((i, elem) => {
      const rank = Number($(elem).children('.number').text());
      const keyword = $(elem).children('.text').text();
      street11Data.push({ rank, keyword });
    });
    browser.close();
    return street11Data;
  }

  async gmarketBestCrawler() {
    const gmarketData = [];

    const url = 'https://m.gmarket.co.kr/#tab_keyword';
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
    // 페이지의 크기를 설정한다.
    await page.setViewport({
      width: 375,
      height: 768,
    });
    await page.goto(url);
    await page.click('header > div > div.box__top-search > div > button');
    const content = await page.content();

    const $ = cheerio.load(content);
    $('ul > li > a.link__hot-keyword').each((i, elem) => {
      const keyword = $(elem).children('.text__title').text();
      const rank = Number($(elem).children('.text__rank').text());
      gmarketData.push({ keyword, rank });
    });
    browser.close();
    console.log(gmarketData);
    return gmarketData;
  }
}
