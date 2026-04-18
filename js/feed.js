// ============================================================
// KENGO TESHIMA — Site JavaScript
// Theme toggle · Scroll animations · Feed loader
// ============================================================

// ====================
// THEME TOGGLE
// ====================
function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  function updateToggleIcon() {
    const theme = document.documentElement.getAttribute('data-theme') || 'dark';
    const sunIcon = toggle.querySelector('.icon-sun');
    const moonIcon = toggle.querySelector('.icon-moon');
    if (sunIcon && moonIcon) {
      sunIcon.style.display = theme === 'dark' ? 'block' : 'none';
      moonIcon.style.display = theme === 'light' ? 'block' : 'none';
    }

    // Update X embed theme if present
    const twitterTimeline = document.querySelector('.twitter-timeline');
    if (twitterTimeline) {
      twitterTimeline.setAttribute('data-theme', theme);
    }
  }

  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateToggleIcon();
  });

  updateToggleIcon();
}

// ====================
// SCROLL ANIMATIONS
// ====================
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-up');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger animation for siblings
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach((el, index) => {
    // Add stagger delay to grid children
    const parent = el.parentElement;
    if (parent && (parent.classList.contains('focus-grid') || parent.classList.contains('hero-grid'))) {
      el.dataset.delay = index * 100;
    }
    observer.observe(el);
  });
}

// ====================
// SMOOTH SCROLL
// ====================
function initSmoothScroll() {
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
}

// ====================
// FEED LOADER (preserved from original)
// ====================
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
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      let response;
      let xml;

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

      list.innerHTML = '';

      if (items.length === 0) {
        this.showError(listId, 'No articles found');
        return;
      }

      Array.from(items).slice(0, limit).forEach((item, index) => {
        const titleEl = item.querySelector('title');
        const linkEl = item.querySelector('link');
        const pubDateEl = item.querySelector('pubDate, published, updated');
        
        const title = titleEl ? titleEl.textContent.trim() : 'Untitled';
        let href = '';
        
        if (linkEl) {
          href = linkEl.getAttribute('href') || linkEl.textContent.trim();
        }

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

// ====================
// INITIALIZE
// ====================
document.addEventListener('DOMContentLoaded', () => {
  // Theme
  initTheme();

  // Scroll animations
  initScrollAnimations();

  // Smooth scroll
  initSmoothScroll();

  // Load feeds (only on pages that have the feed)
  const noteFeedEl = document.getElementById('note-feed');
  if (noteFeedEl) {
    const loader = new FeedLoader();
    loader.fetchFeed('https://note.com/ognek4/rss', 'note-feed', 5);
  }
});
