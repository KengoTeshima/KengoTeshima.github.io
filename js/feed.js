// Feed loading functionality with improved UX
class FeedLoader {
  constructor() {
    this.loadingTemplate = this.createLoadingTemplate();
    this.errorTemplate = this.createErrorTemplate();
  }

  createLoadingTemplate() {
    return `
      <li class="feed-loading">
        <div class="loading-shimmer">
          <div class="shimmer-line"></div>
          <div class="shimmer-line short"></div>
        </div>
      </li>
    `.repeat(3);
  }

  createErrorTemplate(message = 'Unable to load content') {
    return `
      <li class="feed-error">
        <i class="fas fa-exclamation-triangle"></i>
        <span>${message}</span>
      </li>
    `;
  }

  showLoading(listId) {
    const list = document.getElementById(listId);
    if (list) {
      list.innerHTML = this.loadingTemplate;
    }
  }

  showError(listId, message) {
    const list = document.getElementById(listId);
    if (list) {
      list.innerHTML = this.createErrorTemplate(message);
    }
  }

  async fetchFeed(url, listId, limit = 5) {
    this.showLoading(listId);
    
    try {
      // Add timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

      let response;
      let xml;

      // Try direct fetch first for local feeds
      if (url.startsWith('/') || url.startsWith(window.location.origin)) {
        response = await fetch(url, { 
          signal: controller.signal,
          cache: 'no-cache'
        });
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const text = await response.text();
        const parser = new DOMParser();
        xml = parser.parseFromString(text, 'application/xml');
      } else {
        // Use CORS proxy for external feeds
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
        
        response = await fetch(proxyUrl, { 
          signal: controller.signal,
          cache: 'no-cache'
        });
        
        if (!response.ok) {
          throw new Error(`Proxy HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        if (!data.contents) {
          throw new Error('No content returned from proxy');
        }
        
        const parser = new DOMParser();
        xml = parser.parseFromString(data.contents, 'application/xml');
      }

      clearTimeout(timeoutId);
      
      // Check for XML parsing errors
      const parserError = xml.querySelector('parsererror');
      if (parserError) {
        throw new Error('Invalid RSS/XML format');
      }

      const items = xml.querySelectorAll('item, entry');
      const list = document.getElementById(listId);
      
      if (!list) {
        console.warn(`List element with ID '${listId}' not found`);
        return;
      }

      // Clear loading content
      list.innerHTML = '';

      if (items.length === 0) {
        this.showError(listId, 'No articles found');
        return;
      }

      // Process and display items
      Array.from(items).slice(0, limit).forEach((item, index) => {
        const titleEl = item.querySelector('title');
        const linkEl = item.querySelector('link');
        const pubDateEl = item.querySelector('pubDate, published, updated');
        
        const title = titleEl ? titleEl.textContent.trim() : 'Untitled';
        let href = '';
        
        if (linkEl) {
          href = linkEl.getAttribute('href') || linkEl.textContent.trim();
        }

        // Format date if available
        let dateStr = '';
        if (pubDateEl) {
          try {
            const date = new Date(pubDateEl.textContent);
            if (!isNaN(date.getTime())) {
              dateStr = date.toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              });
            }
          } catch (e) {
            // Ignore date parsing errors
          }
        }

        const li = document.createElement('li');
        li.className = 'feed-item';
        
        const a = document.createElement('a');
        a.href = href;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.title = title;
        
        // Truncate long titles for better display
        const displayTitle = title.length > 50 ? title.substring(0, 50) + '...' : title;
        a.textContent = displayTitle;
        
        li.appendChild(a);
        
        if (dateStr) {
          const dateSpan = document.createElement('span');
          dateSpan.className = 'feed-date';
          dateSpan.textContent = dateStr;
          li.appendChild(dateSpan);
        }
        
        list.appendChild(li);

        // Add staggered animation
        setTimeout(() => {
          li.classList.add('fade-in');
        }, index * 100);
      });

    } catch (error) {
      console.error('Failed to fetch feed:', url, error);
      
      let errorMessage = 'Unable to load content';
      if (error.name === 'AbortError') {
        errorMessage = 'Request timed out';
      } else if (error.message.includes('Failed to fetch') || error.message.includes('Network')) {
        errorMessage = 'Network error';
      } else if (error.message.includes('CORS')) {
        errorMessage = 'Access blocked';
      } else if (error.message.includes('Proxy')) {
        errorMessage = 'Service temporarily unavailable';
      }
      
      this.showError(listId, errorMessage);
    }
  }
}

// Initialize feed loader when page loads
document.addEventListener('DOMContentLoaded', () => {
  const loader = new FeedLoader();
  
  // Load feeds with error handling
  const feeds = [
    { url: '/index.xml', listId: 'blog-feed', name: 'Blog' },
    { url: 'https://qiita.com/teshikenn/feed', listId: 'qiita-feed', name: 'Qiita' },
    { url: 'https://note.com/teshikenn4/rss', listId: 'note-feed', name: 'note' }
  ];

  feeds.forEach(feed => {
    loader.fetchFeed(feed.url, feed.listId, 5);
  });

  // Add smooth scroll behavior for navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
