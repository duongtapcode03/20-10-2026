/**
 * Story System - He thong ke chuyen "Nhat Ky 20/10"
 * Beautiful book-flip style storytelling with animated pages
 * 6 chapters: Intro, Mom, Sister, Friends, Strength, Wishes
 */

const STORY_CHAPTERS = [
  {
    id: 'intro', chapterNum: 'I',
    title: 'Thang Muoi Ve...',
    subtitle: 'Khoi dau cua mot cau chuyen yeu thuong',
    theme: 'dawn', emoji: '🌅',
    bgGradient: 'linear-gradient(135deg, #1a0533 0%, #3d0b2f 40%, #7b1f3a 80%, #c84b5a 100%)',
    accentColor: '#ff6b8a',
    paragraphs: [
      'Thang Muoi ve tren nhung canh hoa hong ruc ro...',
      'Co mot ngay rat dac biet trong nam, khi ca dat nuoc Viet Nam cung huong trai tim ve nhung nguoi phu nu yeu dau.',
      'Ngay 20 thang 10 — khong chi la mot ngay trong lich, ma la ngay cua nhung nu cuoi, nhung canh hoa, nhung loi noi tu tan day long.',
      'Hay cung nhau lat tung trang cua cau chuyen yeu thuong nay...'
    ],
    quote: '"Phu nu la nhung bong hoa dep nhat trong vuon cuoc doi."',
    stickers: ['🌹','🌸','✨','💫'],
    floatingElements: ['🌹','🌺','🌸','💮','🌷','✨','💖','🎀'],
    isFinal: false
  },
  {
    id: 'mom', chapterNum: 'II',
    title: 'Nguoi Me Kinh Yeu',
    subtitle: 'Suoi nguon cua moi yeu thuong',
    theme: 'warm', emoji: '🌹',
    bgGradient: 'linear-gradient(135deg, #1c0a00 0%, #3d1a00 35%, #7a3500 70%, #c4621e 100%)',
    accentColor: '#ff9a45',
    paragraphs: [
      'Trong muon van yeu thuong tren doi, tinh me la dieu thieng lieng nhat...',
      'Me — nguoi da thuc trang ben noi, nguoi da danh doi nhung giac ngu ngon de con duoc yen giac.',
      'Me — nguoi da che cho con qua bao giong to, la ben do binh yen nhat trong cuoc doi con.',
      'Cam on me vi da trao cho con tat ca ma khong doi hoi bat cu dieu gi...',
      'Hom nay va mai mai, con yeu me — nguoi phu nu vi dai nhat trong cuoc doi con!'
    ],
    quote: '"Co me la co tat ca. Khong co me, the gioi nay tro nen trong rong."',
    stickers: ['🌹','💝','🤱','👩‍👧'],
    floatingElements: ['🌹','💝','🧡','🌻','💛','🌼','✨','🕯️'],
    isFinal: false
  },
  {
    id: 'sister', chapterNum: 'III',
    title: 'Chi & Em Gai',
    subtitle: 'Nang am cua nhung ngay tho au',
    theme: 'blossom', emoji: '🌸',
    bgGradient: 'linear-gradient(135deg, #0d001f 0%, #2a0840 40%, #5c1a6e 75%, #9b2d9b 100%)',
    accentColor: '#e879f9',
    paragraphs: [
      'Chi va em — hai tam hon gan ket boi dong mau va muon ngan ky niem...',
      'La nguoi ban dau tien trong cuoc doi, la nguoi giu gin bi mat ngot ngao nhat, la nguoi cung chia se nhung buon vui.',
      'Nhung buoi chieu choi dua, nhung dem thi tham truoc gio ngu, nhung nu cuoi va doi khi ca nhung giot nuoc mat...',
      'Tat ca deu la nhung trang ky uc vang son ma khong thu gi co the xoa nhoa.',
      'Chuc chi/em mai rang ro, mai la nhung doa hoa xinh dep nhat!'
    ],
    quote: '"Chi em la doi canh nang nhau vuot qua moi bau troi."',
    stickers: ['🌸','🎀','💜','🦋'],
    floatingElements: ['🌸','🎀','💜','🦋','🌺','💗','✨','🌙'],
    isFinal: false
  },
  {
    id: 'friends', chapterNum: 'IV',
    title: 'Nguoi Phu Nu Trong Doi Toi',
    subtitle: 'Moi nguoi la mot ngoi sao sang',
    theme: 'stars', emoji: '⭐',
    bgGradient: 'linear-gradient(135deg, #000d1a 0%, #001f3d 40%, #003366 75%, #0066cc 100%)',
    accentColor: '#60c4ff',
    paragraphs: [
      'Trong hanh trinh cuoc song, toi may man duoc gap go biet bao nhieu nguoi phu nu tuyet voi...',
      'Nguoi co giao da thap sang ngon den tri thuc, nguoi ban da dong hanh qua bao kho khan.',
      'Nguoi dong nghiep tan tam, nguoi hang xom tot bung — moi nguoi la mot manh ghep ky dieu.',
      'Du chi mot nu cuoi, mot loi dong vien hay mot cu chi quan tam nho be...',
      'Tat ca deu da in dau an khong the xoa nhoa trong trai tim toi. Xin cam on tat ca!'
    ],
    quote: '"Moi nguoi phu nu buoc vao doi toi deu mang den mot dieu ky dieu."',
    stickers: ['⭐','💙','🤝','🌟'],
    floatingElements: ['⭐','💫','🌟','✨','💙','🔵','🌊','☁️'],
    isFinal: false
  },
  {
    id: 'strength', chapterNum: 'V',
    title: 'Suc Manh Dieu Ky',
    subtitle: 'Phu nu — nhung anh hung tham lang',
    theme: 'gold', emoji: '👑',
    bgGradient: 'linear-gradient(135deg, #1a1000 0%, #3d2e00 35%, #7a5c00 70%, #c49a00 100%)',
    accentColor: '#ffd700',
    paragraphs: [
      'Nguoi phu nu khong chi la ve dep, ma con la suc manh phi thuong...',
      'Ho can bang giua vai tro nguoi me, nguoi vo, nguoi con, va nguoi phu nu doc lap trong xa hoi.',
      'Ho vuot qua nhung gioi han tuong chung khong the vuot, ho chay len tu nhung tro tan.',
      'Phu nu khong can ai bao ve — ho tu xay dung the gioi cua minh bang doi tay kien cuong.',
      'Hay tu hao ve ban than minh, vi ban chinh la suc manh dieu ky cua the gioi nay!'
    ],
    quote: '"Mot nguoi phu nu manh me khong can ai hoan thanh co ay — co ay hoan thien chinh minh."',
    stickers: ['👑','💪','🔥','🏆'],
    floatingElements: ['👑','✨','💛','🌟','🔥','💎','⭐','🏆'],
    isFinal: false
  },
  {
    id: 'wish', chapterNum: 'VI',
    title: 'Ngan Loi Chuc Yeu Thuong',
    subtitle: 'Ket thuc dep cho mot cau chuyen vo tan',
    theme: 'celebration', emoji: '🎊',
    bgGradient: 'linear-gradient(135deg, #1f0030 0%, #4a0050 30%, #8b0060 60%, #cc0070 85%, #ff2d75 100%)',
    accentColor: '#ff6bb5',
    paragraphs: [
      'Va cu the, cau chuyen ve nhung nguoi phu nu tuyet voi khong co hoi ket...',
      'Moi ngay la mot trang moi, moi khoanh khac la mot doa hoa no ro.',
      'Hom nay, ngay 20 thang 10, chung ta cung nhau viet them mot trang that dep.',
      'Chuc tat ca nhung nguoi phu nu yeu dau: Luon khoe manh, hanh phuc, ruc ro va duoc yeu thuong moi ngay!',
      'Ngay 20/10, mai mai la ngay cua cac ban — nhung nguoi phu nu lam cho the gioi nay dep hon! 🌸✨'
    ],
    quote: '"Chuc ban luon la phien ban tuyet voi nhat cua chinh minh!"',
    stickers: ['🎊','💖','🎉','🌹'],
    floatingElements: ['🎊','🎉','💖','🌹','🎀','✨','💫','🌸'],
    isFinal: true
  }
];

class StorySystem {
  constructor() {
    this.currentPage = 0;
    this.totalPages = STORY_CHAPTERS.length;
    this.isAnimating = false;
    this.isOpen = false;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.autoPlayTimer = null;
    this.overlay = null;
    this.pages = [];
    this.particles = [];
    this.particleCtx = null;
    this.init();
  }

  init() {
    this.createStoryOverlay();
    this.attachListeners();
  }

  createStoryOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'storyOverlay';
    overlay.className = 'story-overlay hidden';
    overlay.innerHTML = [
      '<canvas id="storyParticleCanvas" class="story-particle-canvas"></canvas>',
      '<div class="story-floating-layer" id="storyFloatingLayer"></div>',
      '<button class="story-close-btn" id="storyCloseBtn" title="Dong cau chuyen">',
        '<i class="fa-solid fa-xmark"></i>',
      '</button>',
      '<div class="story-progress-bar">',
        '<div class="story-progress-segments" id="storyProgressSegments"></div>',
        '<div class="story-chapter-label" id="storyChapterLabel">Chuong I / VI</div>',
      '</div>',
      '<div class="story-book-container" id="storyBookContainer">',
        '<div class="story-book" id="storyBook"></div>',
      '</div>',
      '<button class="story-nav-btn story-nav-prev" id="storyPrevBtn" title="Trang truoc">',
        '<i class="fa-solid fa-chevron-left"></i>',
      '</button>',
      '<button class="story-nav-btn story-nav-next" id="storyNextBtn" title="Trang sau">',
        '<i class="fa-solid fa-chevron-right"></i>',
      '</button>',
      '<div class="story-dots" id="storyDots"></div>',
      '<div class="story-hint-bar" id="storyHintBar">',
        '<i class="fa-solid fa-hand-point-right"></i>',
        '<span>Vuot hoac nhan mui ten de lat trang</span>',
      '</div>'
    ].join('');
    document.body.appendChild(overlay);
    this.overlay = overlay;
    this.buildPages();
    this.buildProgressSegments();
    this.buildDots();
    this.setupParticleCanvas();
  }

  buildPages() {
    const book = document.getElementById('storyBook');
    STORY_CHAPTERS.forEach(function(chapter, i) {
      var page = document.createElement('div');
      page.className = 'story-page story-page--' + chapter.theme + (i === 0 ? ' active' : '');
      page.dataset.index = i;
      page.style.setProperty('--page-bg', chapter.bgGradient);
      page.style.setProperty('--page-accent', chapter.accentColor);

      var paraHtml = '';
      for (var pi = 0; pi < chapter.paragraphs.length; pi++) {
        paraHtml += '<p class="story-paragraph">' + chapter.paragraphs[pi] + '</p>';
      }
      var stickerHtml = '';
      for (var si = 0; si < chapter.stickers.length; si++) {
        stickerHtml += '<div class="story-sticker sticker-pos-' + si + '"><span>' + chapter.stickers[si] + '</span></div>';
      }

      var footerHtml = '';
      if (chapter.isFinal) {
        footerHtml = [
          '<div class="final-page-actions">',
            '<button class="story-action-btn fireworks-story-btn" id="storyFireworksBtn">',
              '<i class="fa-solid fa-wand-magic-sparkles"></i> Ban Phao Hoa!',
            '</button>',
            '<button class="story-action-btn close-story-btn" id="storyFinishBtn">',
              '<i class="fa-solid fa-heart"></i> Quay Ve Trang Chu',
            '</button>',
          '</div>'
        ].join('');
      } else {
        var nextTitle = (i + 1 < STORY_CHAPTERS.length) ? STORY_CHAPTERS[i + 1].title : '';
        footerHtml = [
          '<div class="page-next-teaser">',
            '<span class="teaser-label">Trang tiep:</span>',
            '<span class="teaser-title">' + nextTitle + '</span>',
            '<i class="fa-solid fa-arrow-right"></i>',
          '</div>'
        ].join('');
      }

      page.innerHTML = [
        '<div class="page-bg-pattern"></div>',
        '<div class="page-ornament-top">',
          '<div class="ornament-line left"></div>',
          '<div class="ornament-center"><span class="chapter-emoji">' + chapter.emoji + '</span></div>',
          '<div class="ornament-line right"></div>',
        '</div>',
        '<div class="page-chapter-badge"><span class="badge-roman">Chuong ' + chapter.chapterNum + '</span></div>',
        '<div class="page-content-body">',
          '<div class="page-title-section">',
            '<h2 class="page-main-title">' + chapter.title + '</h2>',
            '<p class="page-subtitle">' + chapter.subtitle + '</p>',
          '</div>',
          '<div class="page-divider"><span class="divider-flower">🌸</span></div>',
          '<div class="page-paragraphs">' + paraHtml + '</div>',
          '<div class="page-quote-box">',
            '<div class="quote-inner">',
              '<i class="fa-solid fa-quote-left quote-icon-left"></i>',
              '<p class="quote-text">' + chapter.quote + '</p>',
              '<i class="fa-solid fa-quote-right quote-icon-right"></i>',
            '</div>',
          '</div>',
        '</div>',
        '<div class="page-stickers">' + stickerHtml + '</div>',
        '<div class="page-ornament-bottom">',
          '<div class="ornament-line left"></div>',
          '<span class="bottom-ornament-text">20 · 10 · 2026</span>',
          '<div class="ornament-line right"></div>',
        '</div>',
        '<div class="page-number-badge">' + (i + 1) + ' / ' + STORY_CHAPTERS.length + '</div>',
        footerHtml
      ].join('');

      book.appendChild(page);
      this.pages.push(page);
    }.bind(this));
  }

  buildProgressSegments() {
    var container = document.getElementById('storyProgressSegments');
    STORY_CHAPTERS.forEach(function(ch, i) {
      var seg = document.createElement('div');
      seg.className = 'progress-segment' + (i === 0 ? ' active filled' : '');
      seg.dataset.index = i;
      seg.title = 'Chuong ' + ch.chapterNum + ': ' + ch.title;
      container.appendChild(seg);
    });
  }

  buildDots() {
    var container = document.getElementById('storyDots');
    STORY_CHAPTERS.forEach(function(ch, i) {
      var dot = document.createElement('button');
      dot.className = 'story-dot' + (i === 0 ? ' active' : '');
      dot.dataset.index = i;
      dot.title = ch.title;
      dot.setAttribute('aria-label', 'Chuong ' + ch.chapterNum);
      container.appendChild(dot);
      dot.addEventListener('click', function() {
        if (!this.isAnimating) this.goToPage(i);
      }.bind(this));
    }.bind(this));
  }

  setupParticleCanvas() {
    var canvas = document.getElementById('storyParticleCanvas');
    this.particleCtx = canvas.getContext('2d');
    this.resizeParticleCanvas();
    window.addEventListener('resize', this.resizeParticleCanvas.bind(this));
    this.startParticleLoop();
  }

  resizeParticleCanvas() {
    var canvas = document.getElementById('storyParticleCanvas');
    if (canvas) { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  }

  startParticleLoop() {
    var self = this;
    function animate() {
      var canvas = document.getElementById('storyParticleCanvas');
      if (!canvas) { requestAnimationFrame(animate); return; }
      var ctx = self.particleCtx;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (self.isOpen && Math.random() < 0.3) {
        var chapter = STORY_CHAPTERS[self.currentPage];
        self.particles.push({
          x: Math.random() * canvas.width,
          y: canvas.height + 20,
          size: Math.random() * 4 + 1,
          speedY: -(Math.random() * 1.5 + 0.5),
          speedX: (Math.random() - 0.5) * 0.8,
          opacity: Math.random() * 0.6 + 0.2,
          color: chapter.accentColor,
          life: 1,
          decay: Math.random() * 0.005 + 0.003
        });
      }
      self.particles = self.particles.filter(function(p) { return p.life > 0; });
      self.particles.forEach(function(p) {
        p.x += p.speedX; p.y += p.speedY; p.life -= p.decay;
        ctx.save();
        ctx.globalAlpha = p.life * p.opacity;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8; ctx.shadowColor = p.color;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      });
      requestAnimationFrame(animate);
    }
    animate();
  }

  spawnFloatingElements(chapter) {
    var layer = document.getElementById('storyFloatingLayer');
    if (!layer) return;
    layer.innerHTML = '';
    chapter.floatingElements.forEach(function(emoji, i) {
      var el = document.createElement('div');
      el.className = 'floating-emoji';
      el.textContent = emoji;
      el.style.left = Math.random() * 100 + '%';
      el.style.animationDelay = (i * 0.4) + 's';
      el.style.animationDuration = (4 + Math.random() * 4) + 's';
      el.style.fontSize = (1 + Math.random() * 1.5) + 'rem';
      layer.appendChild(el);
    });
  }

  open(startPage) {
    if (startPage === undefined) startPage = 0;
    this.isOpen = true;
    this.currentPage = startPage;
    this.overlay.classList.remove('hidden');
    var self = this;
    requestAnimationFrame(function() {
      self.overlay.classList.add('visible');
      self.activatePage(startPage);
      self.spawnFloatingElements(STORY_CHAPTERS[startPage]);
    });
    setTimeout(function() { self.animatePageContent(); }, 400);
  }

  close() {
    this.overlay.classList.remove('visible');
    var self = this;
    setTimeout(function() {
      self.overlay.classList.add('hidden');
      self.isOpen = false;
    }, 500);
    if (this.autoPlayTimer) { clearTimeout(this.autoPlayTimer); this.autoPlayTimer = null; }
  }

  goToPage(targetIndex, direction) {
    if (this.isAnimating || targetIndex === this.currentPage) return;
    if (targetIndex < 0 || targetIndex >= this.totalPages) return;
    var dir = direction || (targetIndex > this.currentPage ? 'next' : 'prev');
    this.isAnimating = true;
    var currentPageEl = this.pages[this.currentPage];
    var targetPageEl = this.pages[targetIndex];
    currentPageEl.classList.add(dir === 'next' ? 'exit-left' : 'exit-right');
    targetPageEl.classList.add(dir === 'next' ? 'enter-right' : 'enter-left');
    var self = this;
    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        currentPageEl.classList.add('animating');
        targetPageEl.classList.add('animating', 'active');
        self.overlay.style.setProperty('--current-accent', STORY_CHAPTERS[targetIndex].accentColor);
        setTimeout(function() {
          currentPageEl.classList.remove('active', 'exit-left', 'exit-right', 'animating');
          targetPageEl.classList.remove('enter-right', 'enter-left', 'animating');
          self.currentPage = targetIndex;
          self.isAnimating = false;
          self.updateUI();
          self.spawnFloatingElements(STORY_CHAPTERS[targetIndex]);
          self.animatePageContent();
        }, 650);
      });
    });
    this.updateProgress(targetIndex);
  }

  activatePage(index) {
    this.pages.forEach(function(p, i) { p.classList.toggle('active', i === index); });
    this.overlay.style.setProperty('--current-accent', STORY_CHAPTERS[index].accentColor);
    this.updateProgress(index);
    this.updateUI();
  }

  animatePageContent() {
    var activePage = this.pages[this.currentPage];
    var paragraphs = activePage.querySelectorAll('.story-paragraph');
    var quoteBox = activePage.querySelector('.page-quote-box');
    var titleSection = activePage.querySelector('.page-title-section');
    var stickers = activePage.querySelectorAll('.story-sticker');

    paragraphs.forEach(function(p) { p.style.opacity = '0'; p.style.transform = 'translateY(20px)'; });
    if (quoteBox) { quoteBox.style.opacity = '0'; quoteBox.style.transform = 'translateY(20px)'; }
    if (titleSection) { titleSection.style.opacity = '0'; titleSection.style.transform = 'translateY(-10px)'; }

    if (titleSection) {
      setTimeout(function() {
        titleSection.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        titleSection.style.opacity = '1'; titleSection.style.transform = 'translateY(0)';
      }, 100);
    }
    paragraphs.forEach(function(p, i) {
      setTimeout(function() {
        p.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        p.style.opacity = '1'; p.style.transform = 'translateY(0)';
      }, 300 + i * 200);
    });
    if (quoteBox) {
      setTimeout(function() {
        quoteBox.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        quoteBox.style.opacity = '1'; quoteBox.style.transform = 'translateY(0)';
      }, 300 + paragraphs.length * 200 + 100);
    }
    stickers.forEach(function(s, i) {
      s.style.opacity = '0'; s.style.transform = 'scale(0) rotate(-15deg)';
      setTimeout(function() {
        s.style.transition = 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
        s.style.opacity = '1'; s.style.transform = 'scale(1) rotate(0deg)';
      }, 500 + i * 150);
    });
  }

  updateProgress(index) {
    document.querySelectorAll('.progress-segment').forEach(function(seg, i) {
      seg.classList.toggle('filled', i <= index);
      seg.classList.toggle('active', i === index);
    });
    var label = document.getElementById('storyChapterLabel');
    if (label) label.textContent = 'Chuong ' + STORY_CHAPTERS[index].chapterNum + ' / VI';
  }

  updateUI() {
    var self = this;
    document.querySelectorAll('.story-dot').forEach(function(dot, i) {
      dot.classList.toggle('active', i === self.currentPage);
    });
    var prevBtn = document.getElementById('storyPrevBtn');
    var nextBtn = document.getElementById('storyNextBtn');
    if (prevBtn) prevBtn.style.opacity = this.currentPage === 0 ? '0.3' : '1';
    if (nextBtn) nextBtn.style.opacity = this.currentPage === this.totalPages - 1 ? '0.3' : '1';
    var hint = document.getElementById('storyHintBar');
    if (hint) {
      if (this.currentPage === this.totalPages - 1) {
        hint.innerHTML = '<i class="fa-solid fa-heart"></i><span>Cam on ban da doc cau chuyen! 💖</span>';
      } else {
        hint.innerHTML = '<i class="fa-solid fa-hand-point-right"></i><span>Vuot hoac nhan mui ten de lat trang</span>';
      }
    }
  }

  burstParticles(x, y, color) {
    for (var i = 0; i < 20; i++) {
      var angle = (Math.PI * 2 * i) / 20;
      var speed = Math.random() * 3 + 2;
      this.particles.push({
        x: x, y: y, size: Math.random() * 5 + 2,
        speedX: Math.cos(angle) * speed, speedY: Math.sin(angle) * speed,
        opacity: 1, color: color, life: 1, decay: Math.random() * 0.02 + 0.01
      });
    }
  }

  attachListeners() {
    var self = this;

    // Open Story Button - listen globally since button added to DOM later
    document.addEventListener('click', function(e) {
      if (e.target.closest && e.target.closest('#openStoryBtn')) self.open(0);
    });

    document.getElementById('storyCloseBtn').addEventListener('click', function() { self.close(); });
    document.getElementById('storyPrevBtn').addEventListener('click', function() { self.goToPage(self.currentPage - 1, 'prev'); });
    document.getElementById('storyNextBtn').addEventListener('click', function() { self.goToPage(self.currentPage + 1, 'next'); });

    document.addEventListener('keydown', function(e) {
      if (!self.isOpen) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') self.goToPage(self.currentPage + 1, 'next');
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') self.goToPage(self.currentPage - 1, 'prev');
      if (e.key === 'Escape') self.close();
    });

    this.overlay.addEventListener('touchstart', function(e) {
      self.touchStartX = e.touches[0].clientX;
      self.touchStartY = e.touches[0].clientY;
    }, { passive: true });

    this.overlay.addEventListener('touchend', function(e) {
      var dx = e.changedTouches[0].clientX - self.touchStartX;
      var dy = e.changedTouches[0].clientY - self.touchStartY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
        if (dx < 0) self.goToPage(self.currentPage + 1, 'next');
        else self.goToPage(self.currentPage - 1, 'prev');
      }
    }, { passive: true });

    this.overlay.addEventListener('click', function(e) {
      var sticker = e.target.closest && e.target.closest('.story-sticker');
      if (sticker) {
        sticker.classList.add('sticker-bounce');
        setTimeout(function() { sticker.classList.remove('sticker-bounce'); }, 600);
        self.burstParticles(e.clientX, e.clientY, STORY_CHAPTERS[self.currentPage].accentColor);
      }
      if (e.target.closest && e.target.closest('#storyFireworksBtn')) {
        if (window.appController) window.appController.triggerFireworksShow();
        self.close();
      }
      if (e.target.closest && e.target.closest('#storyFinishBtn')) self.close();
    });
  }
}

// Initialize story system after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    window.storySystem = new StorySystem();
  });
} else {
  window.storySystem = new StorySystem();
}
