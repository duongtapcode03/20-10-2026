/**
 * 20-10 Celebration Application Logic & Interactive Controller
 * Features:
 * - Universal 20-10 Opening Greeting for ALL Women & Life Companions
 * - Typewriter Progressive Character Reveal Animation with Click-to-Skip
 * - Cinematic Film Mode ("Thước Phim Chúc Mừng 20-10") with 3D choreography & narration
 * - Cute Animated Mascot & Cartoon Characters (Flying Fairy, Dancing Bear, Playful Cat, Bunny)
 * - 3D Card Perspective Tilt, Canvas HD PNG Export & Procedural Web Audio
 */

// Universal Opening Greeting for ALL Women when website is first opened
const UNIVERSAL_OPENING_WISH = {
  to: "Mẹ - Bà - Em - những người phụ nữ trong gia đình me - Tất Cả Những Người Phụ Nữ Tuyệt Vời",
  msg: "Nhân ngày Phụ nữ Việt Nam 20/10, xin gửi trọn vẹn sự yêu thương, trân trọng và lòng biết ơn sâu sắc nhất tới mẹ, bà, em gái và tất cả những người phụ nữ tuyệt vời đã xuất hiện trong cuộc đời tôi. Cảm ơn mọi người vì sự dịu dàng, nụ cười, tình yêu thương và những khoảnh khắc ấm áp vô giá đã làm cho thế giới này luôn tươi đẹp. Chúc mọi người luôn rạng rỡ, bình an, hạnh phúc và luôn được yêu thương mỗi ngày!",
  from: "Giấu tên:3"
};

// Comprehensive Database of Heartfelt Vietnamese 20-10 Wishes
const WISHES_DATABASE = {
  women_in_life: [
    {
      to: "Những Người Phụ Nữ Xuất Hiện Trong Đời Tôi",
      msg: "Cảm ơn từng người phụ nữ tuyệt vời đã và đang xuất hiện trong cuộc đời tôi. Dù là người thân, bạn bè hay người chỉ thoáng gặp trên đường đời — cảm ơn các bạn vì sự dịu dàng, nụ cười, nguồn cảm hứng và những khoảnh khắc ấm áp vô giá đã làm cuộc sống này thêm tươi đẹp!",
      from: "Giấu tên:3"
    },
    {
      to: "Gửi Những Người Phụ Nữ Tuyệt Vời Quanh Tôi",
      msg: "Nhân ngày 20/10, xin gửi lời tri ân chân thành nhất tới những người phụ nữ đã đồng hành, sẻ chia và mang đến cho tôi những bài học cùng sự ấm áp. Chúc bạn luôn rạng rỡ, bình an, tự tin tỏa sáng và nhận được trọn vẹn tình yêu thương!",
      from: "Giấu tên:3"
    },
    {
      to: "Một Nửa Dịu Dàng Của Thế Giới",
      msg: "Cảm ơn sự xuất hiện của các bạn – những người đã thắp sáng những ngày bình dị bằng sự ân cần, nhẫn nại và nụ cười rạng rỡ. Chúc tất cả những người phụ nữ trong cuộc đời tôi một ngày 20/10 thật nhiều niềm vui, may mắn và hạnh phúc!",
      from: "Giấu tên:3"
    },
    {
      to: "Người Phụ Nữ Đáng Quý",
      msg: "Mỗi người phụ nữ bước qua đời tôi đều là một mảnh ghép kỳ diệu mang đến niềm tin và năng lượng tích cực. Cảm ơn bạn vì đã hiện diện. Chúc bạn một ngày 20/10 ngập tràn hoa tươi, quà đẹp và luôn an yên trong tâm hồn!",
      from: "Giấu tên:3"
    }
  ],
  mom: [
    {
      to: "Mama Yêu Dấu",
      msg: "Nhân ngày 20/10, con xin gửi tới mẹ ngàn lời chúc bình an và sức khỏe. Cảm ơn mẹ vì cả một đời tảo tần, hy sinh thầm lặng để cho con khôn lớn. Chúc người phụ nữ vĩ đại nhất đời con luôn mỉm cười hạnh phúc mỗi ngày!",
      from: "Con của Mẹ"
    },
  ],
  sister: [
    {
      to: "Em Gái",
      msg: "Chúc cô em gái ngày 20/10 luôn tràn đầy năng lượng tích cực, luôn rạng rỡ, học tập tốt và theo đuổi trọn vẹn ước mơ của mình. Hãy nhớ gia đình luôn là điểm tựa ấm áp nhất của em nhé!",
      from: "Giấu tên:3"
    }
  ]
};

// Cinematic Movie Chapters ("Thước Phim Tri Ân 20-10")
const CINEMATIC_CHAPTERS = [
  {
    badge: "Chương I: Lời Mở Đầu - Bình Minh Yêu Thương",
    subtitle: "Tháng Mười về mang theo những ngọn gió dịu ngọt, và ngày 20/10 là dịp để cả đất nước cùng hướng về một nửa thế giới...",
    shotRadius: 13,
    shotHeight: 2.2,
    mode: 'gift',
    duration: 8
  },
  {
    badge: "Chương II: Mẹ Kính Yêu - Suối Nguồn Ấm Áp",
    subtitle: "Cảm ơn Mẹ vì cả một đời tảo tần, hy sinh thầm lặng, là bến đỗ bình yên nhất chở che cho con qua bao bão giông cuộc đời...",
    shotRadius: 9,
    shotHeight: 1.8,
    mode: 'gift',
    openBox: true,
    duration: 9
  },
  {
    badge: "Chương III: Chị & Em Gái - Nắng Ấm Tuổi Thơ",
    subtitle: "Cảm ơn những nụ cười, sự sẻ chia và niềm vui ngọt ngào mà chị và em gái đã mang đến trong từng bước đường khôn lớn...",
    shotRadius: 10,
    shotHeight: 2.5,
    mode: 'heart',
    duration: 9
  },
  {
    badge: "Chương IV: Tri Ân Những Người Phụ Nữ Trong Đời Tôi",
    subtitle: "Cảm ơn từng người phụ nữ tuyệt vời đã xuất hiện trong đời tôi — dù gắn bó hay chỉ thoáng qua, mỗi nụ cười và sự dịu dàng của bạn đều đã thắp sáng cuộc đời này...",
    shotRadius: 11,
    shotHeight: 3.0,
    mode: 'rose',
    duration: 10
  },
  {
    badge: "Chương V: Ngàn Lời Chúc Rực Rỡ & Đại Tiệc Pháo Hoa",
    subtitle: "Chúc một nửa thế giới một ngày 20/10 ngập tràn niềm vui, vạn sự an nhiên và luôn xinh đẹp tỏa sáng như những đóa hoa rạng ngời!",
    shotRadius: 12,
    shotHeight: 2.2,
    mode: 'gift',
    fireworks: true,
    duration: 10
  }
];

// Cute Mascot Dialogue Quotes
const MASCOT_QUOTES = [
  "Cảm ơn bạn đã xuất hiện và làm cuộc đời này thật ấm áp! 💖",
  "Chúc bạn ngày 20/10 ngập tràn niềm vui, hoa và nụ cười nha! 🌸",
  "Hôm nay bạn cười trông cực kỳ xinh xắn và đáng yêu luôn đó! 🧸",
  "Tớ gửi tặng bạn ngàn đóa hoa hồng thắm nè! 🌹✨",
  "Mãi vui tươi, an nhiên và luôn tự tin tỏa sáng nha! 🌷",
  "Một ngày 20/10 vạn sự như ý, luôn được nâng niu và yêu quý! 🎀"
];

class AppController {
  constructor() {
    this.scene3D = null;
    this.currentCategory = 'all';
    this.currentWishIndex = 0;
    this.activeWishesList = [];

    // Typewriter State
    this.typewriterTimer = null;
    this.isTyping = false;
    this.currentFullMessage = '';

    // Cinematic Film Mode State
    this.isFilmMode = false;
    this.filmPlaying = false;
    this.currentChapterIndex = 0;
    this.filmTimer = null;
    this.filmElapsed = 0;
    this.filmTotalDuration = CINEMATIC_CHAPTERS.reduce((acc, ch) => acc + ch.duration, 0);

    // DOM Elements
    this.preloader = document.getElementById('preloader');
    this.loaderProgress = document.getElementById('loaderProgress');
    this.unopenedHint = document.getElementById('unopenedHint');
    this.greetingCardOverlay = document.getElementById('greetingCardOverlay');
    this.mainLuxuryCard = document.getElementById('mainLuxuryCard');
    this.card3dWrapper = document.getElementById('card3dWrapper');
    this.displayRecipientName = document.getElementById('displayRecipientName');
    this.displayCardMessage = document.getElementById('displayCardMessage');
    this.displaySenderName = document.getElementById('displaySenderName');
    this.typewriterText = document.getElementById('typewriterText');
    this.typewriterCursor = document.getElementById('typewriterCursor');
    this.messageQuoteBox = document.getElementById('messageQuoteBox');

    // Buttons
    this.heroOpenGiftBtn = document.getElementById('heroOpenGiftBtn');
    this.closeCardBtn = document.getElementById('closeCardBtn');
    this.nextWishBtn = document.getElementById('nextWishBtn');
    this.copyWishBtn = document.getElementById('copyWishBtn');
    this.customizeThisCardBtn = document.getElementById('customizeThisCardBtn');
    this.captureCardBtn = document.getElementById('captureCardBtn');
    this.openCustomizerBtn = document.getElementById('openCustomizerBtn');
    this.fireworksBtn = document.getElementById('fireworksBtn');
    this.musicToggleBtn = document.getElementById('musicToggleBtn');
    this.themeToggleBtn = document.getElementById('themeToggleBtn');
    this.themeMenu = document.getElementById('themeMenu');
    this.filmModeBtn = document.getElementById('filmModeBtn');

    // Cinematic Elements
    this.cinematicFilmOverlay = document.getElementById('cinematicFilmOverlay');
    this.movieChapterBadge = document.getElementById('movieChapterBadge');
    this.movieSubtitlesText = document.getElementById('movieSubtitlesText');
    this.filmPlayPauseBtn = document.getElementById('filmPlayPauseBtn');
    this.filmProgressBar = document.getElementById('filmProgressBar');
    this.filmTimeLabel = document.getElementById('filmTimeLabel');
    this.exitFilmBtn = document.getElementById('exitFilmBtn');

    // Mascot & Animated Cartoon Characters
    this.mascotCompanion = document.getElementById('mascotCompanion');
    this.mascotBody = document.getElementById('mascotBody');
    this.mascotBubbleText = document.getElementById('mascotBubbleText');
    this.cuteStickersLayer = document.getElementById('cuteStickersLayer');
    this.flyingFairy = document.getElementById('flyingFairy');
    this.dancingBear = document.getElementById('dancingBear');
    this.playfulCat = document.getElementById('playfulCat');
    this.gardenHedgehog = document.getElementById('gardenHedgehog');

    // Modal
    this.customizerModal = document.getElementById('customizerModal');
    this.closeModalBtn = document.getElementById('closeModalBtn');
    this.inputRecipient = document.getElementById('inputRecipient');
    this.inputMessage = document.getElementById('inputMessage');
    this.inputSender = document.getElementById('inputSender');
    this.quickTemplates = document.getElementById('quickTemplates');
    this.applyCardBtn = document.getElementById('applyCardBtn');
    this.resetFormBtn = document.getElementById('resetFormBtn');
    this.miniPreview = document.getElementById('miniPreview');
    this.previewTo = document.getElementById('previewTo');
    this.previewText = document.getElementById('previewText');
    this.previewFrom = document.getElementById('previewFrom');

    // Toast
    this.toastNotification = document.getElementById('toastNotification');
    this.toastMessage = document.getElementById('toastMessage');

    this.init();
  }

  init() {
    // 1. Initialize 3D Engine
    this.scene3D = new Scene3DManager();
    this.scene3D.onGiftOpen = this.handleGiftOpened.bind(this);

    // 2. Aggregate Wishes (Starts with the Universal Greeting for all women)
    this.updateWishesPool('all');

    // 3. Setup Preloader
    this.runPreloader();

    // 4. Attach Event Listeners
    this.bindEvents();

    // 5. Setup Cursor Trail Canvas
    this.initCursorFX();

    // 6. Populate Quick Templates in Modal
    this.populateModalTemplates();

    // 7. Setup 3D Tilt for luxury card
    this.setupCardTilt();

    // 8. Setup Mascot & Animated Characters Interaction
    this.initMascotAndStickers();
  }

  // Smooth Preloader Progress
  runPreloader() {
    let progress = 15;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 20) + 10;
      if (progress >= 100) {
        progress = 100;
        this.loaderProgress.style.width = '100%';
        clearInterval(interval);
        setTimeout(() => {
          this.preloader.classList.add('fade-out');
        }, 500);
      } else {
        this.loaderProgress.style.width = progress + '%';
      }
    }, 120);
  }

  // Update Available Wishes according to category
  updateWishesPool(category) {
    this.currentCategory = category;
    if (category === 'all') {
      // Top wish is the Universal Greeting for ALL women
      this.activeWishesList = [
        UNIVERSAL_OPENING_WISH,
        ...WISHES_DATABASE.women_in_life,
        ...WISHES_DATABASE.mom,
        ...WISHES_DATABASE.sister
      ];
    } else if (WISHES_DATABASE[category]) {
      this.activeWishesList = [...WISHES_DATABASE[category]];
    }
    this.currentWishIndex = 0;
  }

  // Progressive Typewriter reveal for wish message
  displayCurrentWish(animate = true) {
    if (this.activeWishesList.length === 0) return;
    const item = this.activeWishesList[this.currentWishIndex];

    // Clear any active typing interval
    if (this.typewriterTimer) {
      clearInterval(this.typewriterTimer);
      this.typewriterTimer = null;
    }

    this.displayRecipientName.textContent = item.to;
    this.displaySenderName.textContent = item.from;

    const fullMsg = `"${item.msg}"`;
    this.currentFullMessage = fullMsg;

    if (!animate) {
      if (this.typewriterText) this.typewriterText.textContent = fullMsg;
      if (this.typewriterCursor) this.typewriterCursor.style.display = 'none';
      return;
    }

    // Gradual Progressive Character Typing Animation
    if (this.typewriterText) this.typewriterText.textContent = '';
    if (this.typewriterCursor) this.typewriterCursor.style.display = 'inline-block';

    let charIdx = 0;
    this.isTyping = true;
    const speed = 25; // 25ms per character for silky smooth reveal

    this.typewriterTimer = setInterval(() => {
      if (charIdx < fullMsg.length) {
        if (this.typewriterText) {
          this.typewriterText.textContent += fullMsg[charIdx];
        }
        charIdx++;
        // Very soft subtle typing sound feedback
        if (charIdx % 18 === 0 && window.soundEngine && !window.soundEngine.isMuted) {
          window.soundEngine.playTapSound();
        }
      } else {
        clearInterval(this.typewriterTimer);
        this.typewriterTimer = null;
        this.isTyping = false;
        setTimeout(() => {
          if (this.typewriterCursor) this.typewriterCursor.style.display = 'none';
        }, 1200);
      }
    }, speed);
  }

  // Instantly finish typing when user clicks on message box
  skipTypewriter() {
    if (this.isTyping && this.currentFullMessage) {
      if (this.typewriterTimer) {
        clearInterval(this.typewriterTimer);
        this.typewriterTimer = null;
      }
      if (this.typewriterText) this.typewriterText.textContent = this.currentFullMessage;
      this.isTyping = false;
      if (this.typewriterCursor) this.typewriterCursor.style.display = 'none';
      if (window.soundEngine) window.soundEngine.playTapSound();
    }
  }

  nextWish() {
    if (window.soundEngine) window.soundEngine.playTapSound();
    this.currentWishIndex = (this.currentWishIndex + 1) % this.activeWishesList.length;
    this.displayCurrentWish(true);
  }

  handleGiftOpened() {
    // Hide floating CTA banner
    this.unopenedHint.classList.add('hidden');

    // Reveal 3D Greeting Card with a lovely slight delay
    setTimeout(() => {
      this.displayCurrentWish(true); // Triggers progressive typewriter reveal
      if (!this.isFilmMode) {
        this.greetingCardOverlay.classList.remove('hidden');
      }
    }, 600);
  }

  showToast(message) {
    this.toastMessage.textContent = message;
    this.toastNotification.classList.remove('hidden');
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      this.toastNotification.classList.add('hidden');
    }, 3200);
  }

  copyWishText() {
    const msg = this.currentFullMessage || (this.typewriterText ? this.typewriterText.textContent : '');
    const text = `${this.displayRecipientName.textContent}\n\n${msg}\n\n- ${this.displaySenderName.textContent} -\n(Thiệp Chúc Mừng 20-10)`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        this.showToast("Đã sao chép lời chúc vào bộ nhớ tạm! 📋");
      }).catch(() => {
        this.fallbackCopy(text);
      });
    } else {
      this.fallbackCopy(text);
    }
  }

  fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    this.showToast("Đã sao chép lời chúc vào bộ nhớ tạm! 📋");
  }

  // Luxury Card 3D Perspective Tilt on Mouse Movement
  setupCardTilt() {
    const card = this.mainLuxuryCard;
    if (!card) return;

    window.addEventListener('mousemove', (e) => {
      if (this.greetingCardOverlay.classList.contains('hidden')) return;

      const rect = card.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - cardCenterX) / (window.innerWidth / 2);
      const deltaY = (e.clientY - cardCenterY) / (window.innerHeight / 2);

      const rotateY = deltaX * 12; // degrees
      const rotateX = -deltaY * 12;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    // Reset on mouse leave
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
  }

  // Populate Quick Templates in Modal
  populateModalTemplates() {
    this.quickTemplates.innerHTML = '';
    const sampleKeys = ['women_in_life', 'mom', 'sister'];
    sampleKeys.forEach(cat => {
      const wish = WISHES_DATABASE[cat][0];
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'template-chip';
      chip.textContent = wish.to;
      chip.addEventListener('click', () => {
        this.inputRecipient.value = wish.to;
        this.inputMessage.value = wish.msg;
        this.inputSender.value = wish.from;
        this.updateMiniPreview();
        if (window.soundEngine) window.soundEngine.playTapSound();
      });
      this.quickTemplates.appendChild(chip);
    });

    // Set initial customizer values
    const firstWish = WISHES_DATABASE.women_in_life[0];
    this.inputRecipient.value = firstWish.to;
    this.inputMessage.value = firstWish.msg;
    this.inputSender.value = firstWish.from;
    this.updateMiniPreview();

    // Bind real-time input change
    [this.inputRecipient, this.inputMessage, this.inputSender].forEach(input => {
      input.addEventListener('input', () => this.updateMiniPreview());
    });
  }

  updateMiniPreview() {
    this.previewTo.textContent = `Gửi: ${this.inputRecipient.value || 'Người nhận'}`;
    this.previewText.textContent = `"${this.inputMessage.value || '...'}"`;
    this.previewFrom.textContent = `Từ: ${this.inputSender.value || 'Người gửi'}`;
  }

  applyCustomCard() {
    const to = this.inputRecipient.value.trim() || 'Người Phụ Nữ Tuyệt Vời';
    const msg = this.inputMessage.value.trim() || 'Chúc mừng ngày 20/10 ngập tràn niềm vui!';
    const from = this.inputSender.value.trim() || 'Người luôn yêu mến bạn';

    // Update active custom wish
    this.activeWishesList.unshift({ to, msg, from });
    this.currentWishIndex = 0;
    this.displayCurrentWish(true);

    // Close modal
    this.customizerModal.classList.add('hidden');
    // Open 3D Card
    this.greetingCardOverlay.classList.remove('hidden');

    this.showToast("Đã cập nhật thiệp cá nhân thành công! ✨");
    if (window.soundEngine) window.soundEngine.playSparkleSound();
  }

  // Export High-Resolution Card to Downloadable Image (1080x1350 Instagram / HD Portrait Format)
  exportCardImage() {
    const canvas = document.getElementById('exportCanvas');
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    // 1. Storybook Sky & Meadow Background
    const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
    skyGrad.addColorStop(0, '#bfe3f2');
    skyGrad.addColorStop(0.55, '#e4f2ec');
    skyGrad.addColorStop(1, '#fdf0dc');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h);

    // Soft sun & rolling hills
    ctx.fillStyle = 'rgba(255, 224, 138, 0.55)';
    ctx.beginPath();
    ctx.arc(170, 150, 110, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffe08a';
    ctx.beginPath();
    ctx.arc(170, 150, 70, 0, Math.PI * 2);
    ctx.fill();

    const drawHill = (color, y, amp) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.bezierCurveTo(w * 0.3, y - amp, w * 0.6, y + amp, w, y - amp * 0.4);
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fill();
    };
    drawHill('#c4dfb6', h - 300, 70);
    drawHill('#a5cf95', h - 210, 60);
    drawHill('#86bb79', h - 120, 40);

    // 2. Paper Card with dashed stitch border
    ctx.fillStyle = '#fffaf1';
    ctx.shadowColor = 'rgba(112, 78, 58, 0.22)';
    ctx.shadowBlur = 40;
    ctx.shadowOffsetY = 14;
    ctx.beginPath();
    ctx.roundRect(80, 90, w - 160, h - 230, 48);
    ctx.fill();
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    ctx.strokeStyle = '#f0d6c6';
    ctx.lineWidth = 3;
    ctx.setLineDash([14, 10]);
    ctx.beginPath();
    ctx.roundRect(104, 114, w - 208, h - 278, 34);
    ctx.stroke();
    ctx.setLineDash([]);

    // 3. Corner Rose & Leaf Decor
    const drawCornerRose = (cx, cy) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.fillStyle = '#6fa566';
      ctx.beginPath();
      ctx.ellipse(-20, 14, 22, 10, -0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(20, 14, 22, 10, 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#e8657f';
      ctx.beginPath();
      ctx.arc(0, 0, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#f6a9b9';
      ctx.beginPath();
      ctx.arc(-3, -4, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    drawCornerRose(150, 160);
    drawCornerRose(w - 150, 160);
    drawCornerRose(150, h - 200);
    drawCornerRose(w - 150, h - 200);

    // Rose bushes on the meadow
    [[60, h - 40], [150, h - 20], [w - 60, h - 40], [w - 150, h - 20]].forEach(([x, y]) => drawCornerRose(x, y));

    // 4. Header Badge
    ctx.fillStyle = '#e3f0da';
    ctx.beginPath();
    ctx.roundRect(w / 2 - 150, 150, 300, 50, 25);
    ctx.fill();

    ctx.fillStyle = '#6fa566';
    ctx.font = 'bold 22px "Be Vietnam Pro", sans-serif';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '3px';
    ctx.fillText('20 THÁNG 10', w / 2, 183);
    ctx.letterSpacing = '0px';

    // 5. Tulip Decor
    ctx.font = '44px serif';
    ctx.fillText('🌷', w / 2, 262);

    // 6. Main Headline
    ctx.font = 'bold 48px "Playfair Display", serif';
    ctx.fillStyle = '#5b3c36';
    ctx.fillText('Chúc Mừng Ngày Phụ Nữ Việt Nam', w / 2, 340);

    // 7. Recipient
    ctx.font = 'italic 28px "Be Vietnam Pro", sans-serif';
    ctx.fillStyle = '#8f6f66';
    ctx.fillText('Kính gửi:', w / 2, 410);

    ctx.font = 'bold 56px "Dancing Script", cursive, "Playfair Display", serif';
    ctx.fillStyle = '#e26a85';
    ctx.fillText(this.displayRecipientName.textContent, w / 2, 478);

    // 8. Wish Message Body (Word Wrapping)
    ctx.font = 'italic 34px "Be Vietnam Pro", sans-serif';
    ctx.fillStyle = '#5b3c36';
    const rawMsg = (this.currentFullMessage || (this.typewriterText ? this.typewriterText.textContent : '')).replace(/^"|"$/g, '');
    const words = rawMsg.split(' ');
    let line = '';
    let currentY = 580;
    const maxLineWidth = w - 260;

    ctx.save();
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxLineWidth && n > 0) {
        ctx.fillText(line, w / 2, currentY);
        line = words[n] + ' ';
        currentY += 56;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, w / 2, currentY);
    ctx.restore();

    // 9. Sender Signature
    ctx.font = '26px "Be Vietnam Pro", sans-serif';
    ctx.fillStyle = '#8f6f66';
    ctx.textAlign = 'right';
    ctx.fillText('Gửi trọn yêu thương từ:', w - 180, h - 270);

    ctx.font = 'bold 50px "Great Vibes", cursive, "Playfair Display", serif';
    ctx.fillStyle = '#e26a85';
    ctx.fillText(this.displaySenderName.textContent, w - 180, h - 205);

    // 10. Trigger Download
    const link = document.createElement('a');
    link.download = `Thiep-Chuc-Mung-20-10-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    this.showToast("Đã tải ảnh thiệp chúc mừng chất lượng cao! 🖼️");
  }

  // Canvas Cursor Particle Trails (Soft Sparkles & Petal Dust)
  initCursorFX() {
    const canvas = document.getElementById('cursorFxCanvas');
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = [];

    window.addEventListener('mousemove', (e) => {
      // Spawn 2-3 sparkle dots per move
      for (let i = 0; i < 2; i++) {
        particles.push({
          x: e.clientX + (Math.random() - 0.5) * 12,
          y: e.clientY + (Math.random() - 0.5) * 12,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 0.5,
          radius: 1.5 + Math.random() * 2.5,
          color: Math.random() > 0.4 ? '#f39db1' : (Math.random() > 0.5 ? '#ffe08a' : '#a9d39b'),
          life: 1.0,
          decay: 0.025 + Math.random() * 0.02
        });
      }
    });

    const renderLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      requestAnimationFrame(renderLoop);
    };

    renderLoop();
  }

  // ================= 9. CUTE MASCOT & ANIMATED CARTOON CHARACTERS =================
  initMascotAndStickers() {
    // 1. Mascot Bunny Companion
    if (this.mascotBody) {
      let quoteIdx = 0;
      this.mascotBody.addEventListener('click', (e) => {
        e.stopPropagation();
        this.mascotBody.classList.remove('mascot-jump');
        void this.mascotBody.offsetWidth; // trigger reflow
        this.mascotBody.classList.add('mascot-jump');

        quoteIdx = (quoteIdx + 1) % MASCOT_QUOTES.length;
        this.mascotBubbleText.textContent = MASCOT_QUOTES[quoteIdx];

        if (window.soundEngine) window.soundEngine.playSparkleSound();
        this.spawnMascotHearts(e.clientX, e.clientY);
      });
    }

    // 2. Flying Chibi Fairy Girl
    if (this.flyingFairy) {
      this.flyingFairy.addEventListener('click', (e) => {
        e.stopPropagation();
        this.flyingFairy.classList.add('fairy-spin');
        setTimeout(() => this.flyingFairy.classList.remove('fairy-spin'), 800);

        if (window.soundEngine) window.soundEngine.playSparkleSound();
        this.spawnMascotHearts(e.clientX, e.clientY);
        this.showToast("Bé Tiên Hoa: Chúc bạn luôn rạng rỡ và ngát hương như hoa! 🌸✨");
      });
    }

    // 3. Dancing Teddy Bear on Cloud
    if (this.dancingBear) {
      this.dancingBear.addEventListener('click', (e) => {
        e.stopPropagation();
        this.dancingBear.classList.add('bear-bounce');
        setTimeout(() => this.dancingBear.classList.remove('bear-bounce'), 600);

        if (window.soundEngine) window.soundEngine.playTapSound();
        this.spawnMascotHearts(e.clientX, e.clientY);
        this.showToast("Gấu Nâu: Chúc bạn ngày 20/10 vạn sự như ý và ngọt ngào! 🧸🌷");
      });
    }

    // 4. Playful Cute Kitty Cat
    if (this.playfulCat) {
      this.playfulCat.addEventListener('click', (e) => {
        e.stopPropagation();
        this.playfulCat.classList.add('cat-meow');
        setTimeout(() => this.playfulCat.classList.remove('cat-meow'), 600);

        if (window.soundEngine) window.soundEngine.playTapSound();
        this.spawnMascotHearts(e.clientX, e.clientY);
        this.showToast("Mèo Con: Meow~ Chúc bạn một ngày tràn ngập niềm vui! 🐾🌹");
      });
    }

    // 5. Garden Hedgehog Carrying a Rose
    if (this.gardenHedgehog) {
      this.gardenHedgehog.addEventListener('click', (e) => {
        e.stopPropagation();
        this.gardenHedgehog.classList.add('hedgehog-hop');
        setTimeout(() => this.gardenHedgehog.classList.remove('hedgehog-hop'), 700);

        if (window.soundEngine) window.soundEngine.playTapSound();
        this.spawnMascotHearts(e.clientX, e.clientY);
        this.showToast("Bé Nhím: Tặng bạn đóa hồng nhỏ, chúc bạn 20/10 bình yên và dịu dàng! 🦔🌹");
      });
    }

    // 6. Floating Stickers Click: Bounce & Sparkle
    const stickers = document.querySelectorAll('.cute-sticker');
    stickers.forEach(sticker => {
      sticker.addEventListener('click', (e) => {
        e.stopPropagation();
        sticker.classList.add('sticker-pop');
        setTimeout(() => sticker.classList.remove('sticker-pop'), 600);

        if (window.soundEngine) window.soundEngine.playTapSound();
        const rect = sticker.getBoundingClientRect();
        this.spawnMascotHearts(rect.left + rect.width / 2, rect.top + rect.height / 2);
      });
    });
  }

  spawnMascotHearts(x, y) {
    const emojis = ['💖', '🌸', '✨', '🧸', '🌷', '🎀'];
    for (let i = 0; i < 5; i++) {
      const el = document.createElement('div');
      el.className = 'burst-heart-particle';
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.left = `${x + (Math.random() - 0.5) * 50}px`;
      el.style.top = `${y + (Math.random() - 0.5) * 50}px`;
      el.style.setProperty('--rnd', Math.random());
      document.body.appendChild(el);

      setTimeout(() => el.remove(), 1200);
    }
  }

  // ================= 10. CINEMATIC FILM MODE CONTROLLER =================
  startFilmMode() {
    this.isFilmMode = true;
    this.filmPlaying = true;
    this.currentChapterIndex = 0;
    this.filmElapsed = 0;

    // Hide any open greeting card or modal
    this.greetingCardOverlay.classList.add('hidden');
    this.customizerModal.classList.add('hidden');
    this.unopenedHint.classList.add('hidden');

    // Show Cinematic Film Overlay
    this.cinematicFilmOverlay.classList.remove('hidden');

    // Start background music automatically for movie atmosphere
    if (window.soundEngine && !window.soundEngine.isPlayingMusic) {
      window.soundEngine.toggleBackgroundMusic();
      this.musicToggleBtn.classList.add('music-playing');
      document.getElementById('musicLabel').textContent = "Đang Phát";
    }

    // Start 3D camera choreography
    this.scene3D.startCinematicFilm();

    // Play first chapter
    this.playFilmChapter(0);

    // Update Play/Pause icon
    this.filmPlayPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    this.showToast("Mở trang sách câu chuyện 20-10 📖");
  }

  playFilmChapter(index) {
    if (index >= CINEMATIC_CHAPTERS.length) {
      // Film ended, reveal luxury card and celebrate!
      this.finishFilm();
      return;
    }

    this.currentChapterIndex = index;
    const chapter = CINEMATIC_CHAPTERS[index];

    // Update Narration & Subtitle
    this.movieChapterBadge.textContent = chapter.badge;
    this.movieSubtitlesText.style.opacity = '0';
    setTimeout(() => {
      this.movieSubtitlesText.textContent = `"${chapter.subtitle}"`;
      this.movieSubtitlesText.style.opacity = '1';
    }, 300);

    // Choreograph 3D Scene
    if (chapter.mode) {
      this.scene3D.setMode(chapter.mode);
    }
    this.scene3D.setCinematicShot(chapter.shotRadius, chapter.shotHeight);

    if (chapter.openBox && !this.scene3D.isBoxOpened) {
      setTimeout(() => {
        this.scene3D.openGiftBox();
      }, 1000);
    }

    if (chapter.fireworks) {
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          this.scene3D.spawnFirework();
        }, i * 600);
      }
    }

    // Schedule next chapter
    clearTimeout(this.filmTimer);
    if (this.filmPlaying) {
      this.filmTimer = setTimeout(() => {
        this.playFilmChapter(index + 1);
      }, chapter.duration * 1000);
    }

    this.updateFilmUI();
  }

  updateFilmUI() {
    let completedSeconds = 0;
    for (let i = 0; i < this.currentChapterIndex; i++) {
      completedSeconds += CINEMATIC_CHAPTERS[i].duration;
    }

    const progressPct = (completedSeconds / this.filmTotalDuration) * 100;
    this.filmProgressBar.style.width = `${progressPct}%`;

    const formatTime = (sec) => {
      const m = Math.floor(sec / 60).toString().padStart(2, '0');
      const s = Math.floor(sec % 60).toString().padStart(2, '0');
      return `${m}:${s}`;
    };

    this.filmTimeLabel.textContent = `${formatTime(completedSeconds)} / ${formatTime(this.filmTotalDuration)}`;
  }

  toggleFilmPlayPause() {
    if (this.filmPlaying) {
      this.filmPlaying = false;
      clearTimeout(this.filmTimer);
      this.filmPlayPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
      this.showToast("Đã tạm dừng thước phim");
    } else {
      this.filmPlaying = true;
      this.filmPlayPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
      this.playFilmChapter(this.currentChapterIndex);
      this.showToast("Tiếp tục thước phim");
    }
  }

  finishFilm() {
    this.exitFilmMode();
    this.displayCurrentWish(true);
    setTimeout(() => {
      this.greetingCardOverlay.classList.remove('hidden');
    }, 400);
    this.showToast("Kết thúc thước phim chúc mừng! 💐");
  }

  exitFilmMode() {
    this.isFilmMode = false;
    this.filmPlaying = false;
    clearTimeout(this.filmTimer);
    this.cinematicFilmOverlay.classList.add('hidden');
    this.scene3D.stopCinematicFilm();
  }

  // Bind All UI Events
  bindEvents() {
    // Open Gift Box
    this.heroOpenGiftBtn.addEventListener('click', () => {
      this.scene3D.openGiftBox();
    });

    // Close / Minimize Card
    this.closeCardBtn.addEventListener('click', () => {
      this.greetingCardOverlay.classList.add('hidden');
    });

    // Card Backdrop click to minimize
    this.greetingCardOverlay.querySelector('.card-backdrop').addEventListener('click', () => {
      this.greetingCardOverlay.classList.add('hidden');
    });

    // Click on quote box to instantly complete typewriter animation
    if (this.messageQuoteBox) {
      this.messageQuoteBox.addEventListener('click', () => {
        this.skipTypewriter();
      });
    }

    // Shuffle / Next Wish
    this.nextWishBtn.addEventListener('click', () => {
      this.nextWish();
    });

    // Copy Wish
    this.copyWishBtn.addEventListener('click', () => {
      this.copyWishText();
    });

    // Open Customizer Modal
    this.customizeThisCardBtn.addEventListener('click', () => {
      this.customizerModal.classList.remove('hidden');
    });
    this.openCustomizerBtn.addEventListener('click', () => {
      this.customizerModal.classList.remove('hidden');
    });

    // Close Modal
    this.closeModalBtn.addEventListener('click', () => {
      this.customizerModal.classList.add('hidden');
    });
    this.customizerModal.addEventListener('click', (e) => {
      if (e.target === this.customizerModal) {
        this.customizerModal.classList.add('hidden');
      }
    });

    // Reset Form
    this.resetFormBtn.addEventListener('click', () => {
      const first = WISHES_DATABASE.women_in_life[0];
      this.inputRecipient.value = first.to;
      this.inputMessage.value = first.msg;
      this.inputSender.value = first.from;
      this.updateMiniPreview();
    });

    // Apply Custom Card
    this.applyCardBtn.addEventListener('click', () => {
      this.applyCustomCard();
    });

    // Download Card Image
    this.captureCardBtn.addEventListener('click', () => {
      this.exportCardImage();
    });

    // Cinematic Film Mode Triggers
    this.filmModeBtn.addEventListener('click', () => {
      this.startFilmMode();
    });

    this.exitFilmBtn.addEventListener('click', () => {
      this.exitFilmMode();
    });

    this.filmPlayPauseBtn.addEventListener('click', () => {
      this.toggleFilmPlayPause();
    });

    // Trigger Fireworks
    this.fireworksBtn.addEventListener('click', () => {
      if (window.soundEngine) window.soundEngine.playSparkleSound();
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          this.scene3D.spawnFirework();
        }, i * 150);
      }
    });

    // Music Toggle
    this.musicToggleBtn.addEventListener('click', () => {
      if (window.soundEngine) {
        const isPlaying = window.soundEngine.toggleBackgroundMusic();
        if (isPlaying) {
          this.musicToggleBtn.classList.add('music-playing');
          document.getElementById('musicLabel').textContent = "Đang Phát";
          this.showToast("Đã bật giai điệu du dương 🎵");
        } else {
          this.musicToggleBtn.classList.remove('music-playing');
          document.getElementById('musicLabel').textContent = "Nhạc Nền";
          this.showToast("Đã tắt nhạc nền");
        }
      }
    });

    // Theme Toggle Menu
    this.themeToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.themeMenu.classList.toggle('show');
    });

    window.addEventListener('click', () => {
      this.themeMenu.classList.remove('show');
    });

    // Theme Options
    document.querySelectorAll('.theme-option').forEach(option => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        const theme = option.getAttribute('data-theme');
        document.body.className = `theme-${theme}`;

        document.querySelectorAll('.theme-option').forEach(o => o.classList.remove('active'));
        option.classList.add('active');

        this.scene3D.setTheme(theme);
        this.themeMenu.classList.remove('show');
        this.showToast(`Đã chuyển sang khung cảnh: ${option.textContent.trim()}`);
      });
    });

    // 3D Scene Mode HUD buttons
    const modeButtons = document.querySelectorAll('.mode-btn');
    modeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        modeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const mode = btn.getAttribute('data-mode');
        this.scene3D.setMode(mode);
        if (window.soundEngine) window.soundEngine.playTapSound();
      });
    });

  }
}

// Start application when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  window.app = new AppController();
});
