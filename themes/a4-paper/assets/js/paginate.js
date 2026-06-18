(function() {
  var A4_HEIGHT = 1123;
  var ATTRIBUTION = document.documentElement.getAttribute('data-attribution') || '';

  function paginate(src, target, headerHTML) {
    if (!src || !target) return;

    var children = Array.from(src.children);
    src.style.display = 'none';

    var pages = [];
    var currentPage = createPage(0, headerHTML);
    pages.push(currentPage);
    target.appendChild(currentPage.container);

    var contentEl = currentPage.content;
    var usedHeight = 0;

    // Measure available content height on first page
    // (account for header, padding, and footer)
    var maxContentHeight = getMaxContentHeight(currentPage.container);

    children.forEach(function(child) {
      contentEl.appendChild(child);
      var childHeight = child.getBoundingClientRect().height;

      if (usedHeight + childHeight > maxContentHeight && usedHeight > 0) {
        // Move to next page
        currentPage = createPage(pages.length);
        pages.push(currentPage);
        target.appendChild(currentPage.container);
        contentEl = currentPage.content;
        usedHeight = 0;
        maxContentHeight = getMaxContentHeight(currentPage.container);
        contentEl.appendChild(child);
        childHeight = child.getBoundingClientRect().height;
      }

      usedHeight += childHeight;
    });

    // Set page numbers
    pages.forEach(function(page, i) {
      page.footer.textContent = ATTRIBUTION + '  ' + (i + 1) + ' / ' + pages.length;
    });
  }

  function getMaxContentHeight(container) {
    var style = getComputedStyle(container);
    var paddingTop = parseFloat(style.paddingTop) || 0;
    var paddingBottom = parseFloat(style.paddingBottom) || 0;
    var footerReserve = 50;

    // Account for site-header on first page
    var header = container.querySelector('.site-header');
    var headerSpace = 0;
    if (header) {
      var hs = getComputedStyle(header);
      headerSpace = header.getBoundingClientRect().height
        + parseFloat(hs.marginBottom) || 0;
    }

    return A4_HEIGHT - paddingTop - paddingBottom - footerReserve - headerSpace;
  }

  function createPage(index, headerHTML) {
    var container = document.createElement('div');
    container.className = 'paper';

    if (index === 0 && headerHTML) {
      var headerWrap = document.createElement('div');
      headerWrap.innerHTML = headerHTML;
      container.appendChild(headerWrap.firstElementChild);
    }

    var content = document.createElement('div');
    content.className = 'page-content';
    container.appendChild(content);

    var footer = document.createElement('div');
    footer.className = 'page-footer';
    container.appendChild(footer);

    return { container: container, content: content, footer: footer };
  }

  window.A4Paginate = paginate;
})();
