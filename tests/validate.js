'use strict';

const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { business, categories, assistantFaqs, certificates } = require('../content/site');
const services = require('../content/services');
const posts = require('../content/posts');

const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');

function routeFile(route) {
  if (route === '/') return path.join(dist, 'index.html');
  return path.join(dist, route.replace(/^\/|\/$/g, ''), 'index.html');
}

function readRoute(route) {
  return fs.readFileSync(routeFile(route), 'utf8');
}

function extractJsonLd(html) {
  const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert.ok(match, 'Missing JSON-LD');
  return JSON.parse(match[1]);
}

function countMatches(value, expression) {
  return (value.match(expression) || []).length;
}

assert.equal(services.length, 12, 'Expected exactly 12 services');
assert.equal(posts.length, 10, 'Expected exactly 10 blog posts');
assert.equal(assistantFaqs.length, 10, 'Expected exactly 10 assistant questions');
assert.equal(new Set(services.map(function (item) { return item.slug; })).size, services.length, 'Service slugs must be unique');
assert.equal(new Set(posts.map(function (item) { return item.slug; })).size, posts.length, 'Post slugs must be unique');

services.forEach(function (service) {
  assert.equal(service.faqs.length, 8, service.slug + ' must have 8 FAQs');
  assert.ok(service.intro.length >= 2, service.slug + ' needs a long introduction');
  assert.ok(service.sections.length >= 5, service.slug + ' needs at least five sections');
  assert.ok(categories.some(function (category) { return category.id === service.categoryId; }), service.slug + ' has an invalid category');
});

posts.forEach(function (post) {
  assert.ok(post.intro.length >= 2, post.slug + ' needs a long introduction');
  assert.ok(post.sections.length >= 5, post.slug + ' needs at least five sections');
  assert.ok(post.conclusion.length > 100, post.slug + ' needs a meaningful conclusion');
});

certificates.forEach(function (certificate) {
  assert.ok(fs.existsSync(path.join(dist, certificate.thumb)), 'Missing certificate thumbnail: ' + certificate.thumb);
  assert.ok(fs.existsSync(path.join(dist, certificate.original)), 'Missing original certificate: ' + certificate.original);
});

const routes = [
  '/',
  '/services/',
  ...services.map(function (service) { return '/services/' + service.slug + '/'; }),
  '/blog/',
  ...posts.map(function (post) { return '/blog/' + post.slug + '/'; }),
  '/about/',
  '/certificates/',
  '/contact/',
  '/privacy/'
];

const knownRoutes = new Set(routes);
routes.forEach(function (route) {
  const file = routeFile(route);
  assert.ok(fs.existsSync(file), 'Missing route output: ' + route);
  const html = fs.readFileSync(file, 'utf8');
  assert.equal(countMatches(html, /<h1(?:\s|>)/g), 1, route + ' must contain one H1');
  assert.ok(/<title>[^<]+<\/title>/.test(html), route + ' is missing a title');
  assert.ok(/<meta name="description" content="[^"]+">/.test(html), route + ' is missing a meta description');
  assert.ok(/<link rel="canonical" href="https:\/\/abdullah-alshamrani-store\.vercel\.app\//.test(html), route + ' has an invalid canonical');
  assert.ok(html.includes('id="site-navigation"'), route + ' is missing the navigation target');
  assert.ok(html.includes('aria-controls="site-navigation"'), route + ' menu button is not linked to the navigation');
  assert.equal(countMatches(html, /class="ai-assistant-question"/g), 10, route + ' must include 10 assistant questions');
  assert.ok(html.includes(business.phoneDisplay), route + ' is missing the public phone');
  assert.ok(!html.includes('0505782716'), route + ' contains a retired phone number');
  assert.ok(!html.includes('966505782716'), route + ' contains a retired WhatsApp number');
  const schema = extractJsonLd(html);
  assert.equal(schema['@context'], 'https://schema.org', route + ' has invalid schema context');
  const schemaText = JSON.stringify(schema);
  assert.ok(schemaText.includes(business.name), route + ' schema is missing the business name');
  assert.ok(schemaText.includes(business.phoneInternational), route + ' schema is missing the international phone');
  assert.ok(schemaText.includes(business.mapEmbedUrl), route + ' schema is missing the business map');

  const hrefs = Array.from(html.matchAll(/href="([^"]+)"/g), function (match) { return match[1]; });
  hrefs.forEach(function (href) {
    if (!href.startsWith('/') || href.startsWith('/assets/') || href === '/feed.xml' || href === '/site.webmanifest') return;
    const clean = href.split('#')[0].split('?')[0];
    if (!clean) return;
    assert.ok(knownRoutes.has(clean), route + ' links to unknown route ' + clean);
  });
});

const homeHtml = readRoute('/');
assert.ok(homeHtml.includes(business.mapEmbedUrl), 'Homepage is missing the supplied Google map');
assert.ok(homeHtml.includes('/assets/images/hero/store-front.webp'), 'Homepage is missing the preserved storefront image');
assert.equal(countMatches(homeHtml, /class="certificate-card"/g), 6, 'Homepage must display all six certificates');

const contactHtml = readRoute('/contact/');
assert.ok(contactHtml.includes(business.mapEmbedUrl), 'Contact page is missing the supplied Google map');

const assistantSource = fs.readFileSync(path.join(root, 'assets/js/assistant.js'), 'utf8');
assert.ok(assistantSource.includes('encodeURIComponent'), 'Assistant must encode WhatsApp messages');
assert.ok(!/classList\.(?:add|remove|toggle)\(['"](?!ai-assistant-)/.test(assistantSource), 'Assistant state classes must use ai-assistant- prefix');

const contentExport = path.join(root, 'content', 'seo-content.md');
assert.ok(fs.existsSync(contentExport), 'Markdown content export was not generated');
const markdown = fs.readFileSync(contentExport, 'utf8');
services.forEach(function (service) { assert.ok(markdown.includes('# ' + service.title), 'Markdown missing ' + service.title); });
posts.forEach(function (post) { assert.ok(markdown.includes('# ' + post.title), 'Markdown missing ' + post.title); });

['sitemap.xml', 'robots.txt', 'feed.xml', 'site.webmanifest', '404.html'].forEach(function (fileName) {
  assert.ok(fs.existsSync(path.join(dist, fileName)), 'Missing ' + fileName);
});

['tajawal-400.woff2', 'tajawal-700.woff2', 'noto-kufi-arabic-700.woff2'].forEach(function (fileName) {
  assert.ok(fs.existsSync(path.join(dist, 'assets', 'fonts', fileName)), 'Missing optimized font ' + fileName);
});

process.stdout.write('Validated ' + routes.length + ' routes, 12 services, 96 service FAQs, 10 posts, schema, links and assistant behavior.\n');
