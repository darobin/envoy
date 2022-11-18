
import { create as createNode } from 'ipfs-core';
import { CID } from 'multiformats';

export default class EnvoyFeed {
  constructor (feed) {
    console.warn(`CTOR(${feed})[${typeof feed}]`);
    this.init = false;
    this.feed = feed; // the CID or IPNS
    this.feedData = {
      $type: 'feed',
      nextPage: null, // we'll add pagination at some point
      items: [],
    };
  }
  async ensureInit () {
    if (this.init) return;
    this.node = await createNode();
    this.init = true;
  }
  async loadFeed () {
    await this.ensureInit();
    if (!this.feed) throw new Error(`No feed configured.`);
    const data = await this.node.dag.get(cnv(this.feed));
    this.feedData = data.value;
    if (!this.feedData.items) this.feedData.items = [];
    return this.feedData;
  }
  async publishFeed () {
    await this.ensureInit();
    const cid = await this.node.dag.put(this.feedData);
    this.feed = cid.toString();
    return this.feed;
  }
  async createMicroBlog (mb) {
    await this.ensureInit();
    if (typeof mb === 'string') mb = { text: mb };
    if (!mb.date) mb.date = new Date().toISOString();
    mb.$type = 'text';
    const cid = await this.node.dag.put(mb);
    return cid.toString();
  }
  async publishMicroBlogToFeed (mb) {
    await this.ensureInit();
    const cid = await this.createMicroBlog(mb);
    this.feedData.items.unshift(cid);
    return await this.publishFeed();
  }
}

function cnv (cid) {
  if (typeof cid === 'string') return CID.parse(cid);
  return cid;
}
