async function fetchFeed(url, listId, limit = 5) {
  try {
    const response = await fetch(url);
    const text = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, 'application/xml');
    const items = xml.querySelectorAll('item, entry');
    const list = document.getElementById(listId);
    items.forEach((item, index) => {
      if (index >= limit) return;
      const titleEl = item.querySelector('title');
      const linkEl = item.querySelector('link');
      const title = titleEl ? titleEl.textContent : 'No title';
      let href = '';
      if (linkEl) {
        href = linkEl.getAttribute('href') || linkEl.textContent;
      }
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = href;
      a.textContent = title;
      li.appendChild(a);
      list.appendChild(li);
    });
  } catch (e) {
    console.error('Failed to fetch feed', url, e);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetchFeed('/index.xml', 'blog-feed');
  fetchFeed('https://qiita.com/ognek/feed', 'qiita-feed');
  fetchFeed('https://note.com/ognek4/rss', 'note-feed');
});
