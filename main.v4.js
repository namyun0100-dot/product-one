const APP_VERSION = "2026-01-31-1";

function migrateLocalState() {
    const storedVersion = localStorage.getItem('appVersion');
    if (storedVersion && storedVersion !== APP_VERSION) {
        // Clear only volatile UI cache to avoid "stuck" states across releases.
        localStorage.removeItem('fortuneData');
        localStorage.removeItem('lastFortuneDate');
    }
    localStorage.setItem('appVersion', APP_VERSION);
}

window.safeResetSiteState = function() {
    localStorage.removeItem('fortuneData');
    localStorage.removeItem('lastFortuneDate');
    location.reload();
};

function showRecoveryBanner(reason) {
    if (document.getElementById('recovery-banner')) return;
    const banner = document.createElement('div');
    banner.id = 'recovery-banner';
    banner.className = 'recovery-banner';
    banner.innerHTML = `
        <div class="recovery-text">문제가 감지되었습니다. 캐시를 정리하고 새로고침할까요?</div>
        <button type="button" class="recovery-btn">문제 발생 시 복구</button>
    `;
    banner.querySelector('.recovery-btn').addEventListener('click', () => {
        window.safeResetSiteState();
    });
    if (reason) {
        banner.setAttribute('data-reason', reason);
    }
    document.body.appendChild(banner);
}

function isThirdPartyError(event, reason) {
    const msg = (event && event.message) ? String(event.message) : '';
    const src = (event && event.filename) ? String(event.filename) : '';
    const reasonText = (reason !== undefined && reason !== null) ? String(reason) : '';
    const combined = `${msg} ${src} ${reasonText}`.toLowerCase();
    return (
        combined.includes('googlesyndication') ||
        combined.includes('doubleclick') ||
        combined.includes('adsbygoogle') ||
        combined.includes('gpt.js') ||
        combined.includes('google-analytics') ||
        combined.includes('googletagmanager') ||
        combined.includes('disqus')
    );
}

window.addEventListener('error', (event) => {
    if (event && event.message && !isThirdPartyError(event)) {
        showRecoveryBanner('error');
    }
});

window.addEventListener('unhandledrejection', (event) => {
    if (!isThirdPartyError(null, event && event.reason)) {
        showRecoveryBanner('unhandledrejection');
    }
});

// Global Translations Data
const translations = {
    en: {
        title: "Today's Cosmic Fortune",
        wealth: "Wealth",
        bonds: "Bonds",
        btnReveal: "Reveal Fortune",
        btnRevealed: "Fortune Revealed",
        msgWait: "Press the button to see your forecast.",
        msgFinancial: "Press the button to see your financial forecast.",
        msgRelationship: "Press the button to see your relationship forecast.",
        homeCtaText: "Want a message from your pet? Try the Pet Tarot.",
        homeCtaPet: "Go to Pet Tarot",
        fortunes: {
            81: "🌟 <strong>Cosmic alignment!</strong> A universe of opportunities awaits!",
            61: "✨ <strong>Starlight favor!</strong> Good vibes are flowing your way.",
            41: "☀️ <strong>Neutral space.</strong> Your path is your own to forge.",
            21: "☁️ <strong>Minor nebula.</strong> Navigate with care and intention.",
            0: "☄️ <strong>Asteroid field!</strong> Keep your head up and stay positive."
        },
        contactTitle: "Cosmic Collaboration Inquiry",
        labelName: "Your Name:",
        labelEmail: "Your Email:",
        labelMessage: "Your Message:",
        btnSendSignal: "Send Signal",
        formInstructions: "We usually respond to cosmic signals within 24 light-hours.",
        footerPrivacy: "Privacy Policy",
        footerTerms: "Terms of Service",
        footerGeo: "Operating region: Republic of Korea · Base city: Seoul",
        disqusTitle: "Cosmic Discussions",
        navInsight: "Cosmic Insight",
        navPsychology: "Mystic Psychology",
        navAncient: "Ancient Wisdom",
        navBlogLink: "Blog Home",
        homeWisdom1Title: "🌌 2026 Astrology Trends",
        homeWisdom1Desc: "Pluto in Aquarius marks a new era of spiritual technology. Discover what 2026 holds for your zodiac sign.",
        homeWisdom2Title: "🧠 MBTI & The 4 Elements",
        homeWisdom2Desc: "Did you know NF types align with Fire signs? Explore the hidden connection between modern psychology and ancient elements.",
        homeWisdom3Title: "🐶 Pet Zodiac & Physiology",
        homeWisdom3Desc: "Why does your dog act like that? It might be their star sign. Decode your pet's cosmic personality.",
        readMore: "Read More Stories →",
        navDailyFortune: "Daily Fortune",
        navZodiac: "Zodiac",
        navChemistry: "Chemistry",
        navPetTarot: "Pet Tarot",
        navBlog: "Blog",
        petTarotTitle: "Cosmic Pet Tarot",
        petTarotSubtitle: "What does your pet want to tell you today?",
        btnDrawTarot: "Draw a Card",
        btnShareTarot: "Share Result",
        btnCopyTarot: "Copy Result",
        btnShareCopy: "Copy Link",
        btnShareImage: "Save Image",
        btnShareReddit: "Reddit",
        tarotLuckyLabel: "Lucky Treat:",
        tabPersonality: "Personality",
        tabMonthly: "Monthly Forecast",
        blackHoleTitle: "🌌 Cosmic Worry Disposal",
        worryPlaceholder: "Throw your worries into the black hole... (Anonymous)",
        btnThrowWorry: "Release to Space",
        blogPageTitle: "Cosmic Blog - Unlock the Universe",
        blogPageDescription: "Explore deep cosmic wisdom, astrology insights, and spiritual guides. Your journey to understanding the stars starts here.",
        navHome: "Home",
        blogHeaderTitle: "Cosmic Wisdom",
        blogHeaderSubtitle: "Universe, Stars, and You. Exploring the hidden connections.",
        sectionInsight: "🌌 Cosmic Insight",
        sectionPsychology: "🔮 Mystic Psychology",
        sectionAncient: "✋ Ancient Wisdom",
        article1: {
            title: "🌟 2026: The Year of Spiritual Awakening?",
            meta: "January 31, 2026 | Astrology Trend",
            p1: "Welcome to 2026. As Pluto settles deeply into Aquarius, we are witnessing a massive shift in how humanity connects. It's no longer just about technology; it's about 'Spiritual Technology.'",
            h3_1: "Why 2026 is Special",
            p2: "This year, the alignment of Jupiter and Neptune suggests a surge in collective empathy. You might find yourself feeling more connected to nature, the stars, and even strangers. It's not a coincidence; it's the cosmic weather.",
            h3_2: "Key Dates to Watch",
            p3: "Keep an eye on the Solar Eclipse in August. It will be a powerful time for setting intentions related to your career and public image. Don't be afraid to dream big."
        },
        article2: {
            title: "🧠 MBTI & The 4 Elements: Are They Connected?",
            meta: "January 28, 2026 | Psychology & Stars",
            p1: "We love MBTI. We love Zodiac signs. But did you know they share a common root in ancient elemental theory? Let's break down the 4 Elements (Fire, Earth, Air, Water) and how they map to modern personality types.",
            linkText: "📖 Read Full Analysis (Click Here) →",
            linkUrl: "blog_posts/mbti-zodiac-en.html"
        },
        article3: {
            title: "✋ Palmistry 101: The Heart Line",
            meta: "January 15, 2026 | Ancient Arts",
            p1: "Look at your dominant hand. See the top horizontal line running from under your pinky finger towards your index finger? That's your Heart Line. It reveals your emotional style, not just your romantic future.",
            h3_1: "Long & Curved?",
            p2: "If it curves up towards your index finger, you are a romantic at heart. You express feelings openly and love deeply.",
            h3_2: "Straight & Short?",
            p3: "If it ends under the middle finger, you might be more practical or even a bit selfish in love. You need your freedom.",
            h3_3: "Broken Line?",
            p4: "Don't worry, it doesn't mean a broken heart forever. It often indicates a major emotional stress or change that you have overcome."
        },
        article4: {
            title: "🧠 Palmistry 102: The Head Line",
            meta: "January 31, 2026 | Ancient Arts",
            p1: "Located just below the Heart Line, the Head Line represents your intellect, mentality, and how you process information. It's not about how smart you are, but *how* you think.",
            h3_1: "Long & Deep?",
            p2: "You have a clear focus and good concentration. You tend to think things through thoroughly before acting. A true strategist.",
            h3_2: "Curved Downwards?",
            p3: "A curve towards the wrist indicates a creative and imaginative mind. You might be an artist, writer, or dreamer who relies on intuition.",
            h3_3: "Straight Across?",
            p4: "A straight line suggests a practical, logical, and analytical approach. You prefer facts over feelings and excel in math, science, or business."
        },
        article5: {
            title: "✋ Palmistry 103: The Life Line",
            meta: "January 31, 2026 | Ancient Arts",
            p1: "Perhaps the most famous of all palm lines, the Life Line curves around the base of your thumb. Despite popular belief, its length doesn't predict how long you'll live, but rather your vitality, enthusiasm for life, and major life changes.",
            h3_1: "Long & Deep?",
            p2: "A prominent, well-defined Life Line indicates strong vitality, good health, and a robust constitution. You likely have abundant energy and can bounce back quickly from challenges.",
            h3_2: "Short or Faint?",
            p3: "A shorter or fainter line doesn't mean a short life! It can suggest less physical energy or a need to be more mindful of your health and well-being. It might also indicate a more sedentary lifestyle.",
            h3_3: "Broken or Chained?",
            p4: "Breaks or chains in the Life Line often signify periods of significant change, stress, or health transitions. These aren't necessarily negative, but mark points where you've had to adapt or overcome difficulties."
        },
        article6: {
            title: "🐾 Pet Zodiac Encyclopedia: Why is My Pet Like This?",
            meta: "January 30, 2026 | Pet Astrology",
            p1: "Have you ever wondered why your furry friend acts the way they do? Just like humans, pets are influenced by the stars! Knowing their zodiac sign can unlock the secrets to their unique personality.",
            p2: "We have prepared a comprehensive guide covering all zodiac signs for your dogs and cats.",
            linkText: "📖 Read Full Encyclopedia (Click Here) →",
            linkUrl: "blog_posts/pet-zodiac-en.html"
        },
        article7: {
            title: "🐾 Pet Zodiac Encyclopedia (Part 2): Deeper into the Stars",
            meta: "January 31, 2026 | Pet Astrology",
            p1: "Let’s continue our pet zodiac story. Each sign has a unique rhythm, and knowing it helps you care and connect better.",
            h3_1: "Cancer Pet (June 21 - July 22): The Gentle Guardian",
            p2: "Cancer pets are sensitive and protective. They bond deeply and seek a safe, cozy space. Soft voices and steady routines calm them.",
            h3_2: "Leo Pet (July 23 - August 22): The Proud Performer",
            p3: "Leo pets love attention and praise. They are confident and expressive, often acting like the star of the house. Playful applause goes a long way.",
            h3_3: "Virgo Pet (August 23 - September 22): The Neat Observer",
            p4: "Virgo pets are observant and a bit picky. They notice small changes and prefer clean, orderly spaces. Gentle consistency makes them shine."
        },
        article9: {
            title: "✋ Palm Reading Master Guide (2026 Edition)",
            meta: "February 2, 2026 | Ancient Arts",
            p1: "Unlock the secrets of your hands. A comprehensive guide to the Life Line, Heart Line, Head Line, and Fate Line. Discover what your palms say about your destiny.",
            linkText: "📖 Read Full Guide (Click Here) →",
            linkUrl: "blog_posts/palm-reading-en.html"
        },
        backHomeLink: "← Back to Cosmic Fortune"
    },
    ko: {
        title: "오늘의 우주 운세",
        wealth: "금전운",
        bonds: "인연운",
        btnReveal: "운세 확인하기",
        btnRevealed: "운세 확인 완료",
        msgWait: "버튼을 눌러 오늘의 운세를 확인하세요.",
        msgFinancial: "버튼을 눌러 금전운을 확인하세요.",
        msgRelationship: "버튼을 눌러 인연운을 확인하세요.",
        homeCtaText: "지금 펫 타로로 우리 아이의 메시지를 확인해보세요.",
        homeCtaPet: "펫 타로 보러가기",
        fortunes: {
            81: "🌟 <strong>우주의 축복!</strong> 엄청난 기회가 기다리고 있어요!",
            61: "✨ <strong>별빛의 가호!</strong> 좋은 기운이 흐르고 있네요!",
            41: "☀️ <strong>고요한 우주.</strong> 당신이 길을 개척할 시간입니다.",
            21: "☁️ <strong>작은 성운.</strong> 신중하게 나아가는 게 좋겠어요.",
            0: "☄️ <strong>소행성 주의!</strong> 긍정적인 마음을 잃지 마세요!"
        },
        contactTitle: "우주 협력 문의",
        labelName: "이름:",
        labelEmail: "이메일:",
        labelMessage: "메시지:",
        btnSendSignal: "신호 보내기",
        formInstructions: "우주 신호는 보통 24광시(시간) 내에 응답해 드립니다.",
        footerPrivacy: "개인정보처리방침",
        footerTerms: "이용약관",
        footerGeo: "운영 지역: 대한민국 · 기준 도시: 서울",
        disqusTitle: "우주 토론",
        navInsight: "우주의 통찰",
        navPsychology: "신비 심리학",
        navAncient: "고대의 지혜",
        navBlogLink: "블로그 홈",
        homeWisdom1Title: "🌌 2026 별자리 행운 가이드",
        homeWisdom1Desc: "2026년, 당신의 별자리는 어떤 기운을 받을까요? 목성과 토성의 이동이 당신의 재물운과 연애운에 미치는 영향을 분석해 드립니다.",
        homeWisdom2Title: "🧠 MBTI와 별자리의 연결고리",
        homeWisdom2Desc: "ENFP와 쌍둥이자리, INFJ와 물고기자리... 과연 과학적인 근거가 있을까요? 점성술의 4원소와 MBTI의 4가지 지표를 비교 분석합니다.",
        homeWisdom3Title: "🐶 관상학으로 보는 동물상",
        homeWisdom3Desc: "강아지상, 고양이상, 공룡상... 단순히 귀여운 것이 아닙니다. 관상학적으로 '강아지상'은 사람을 끌어당기는 도화살을 상징합니다.",
        readMore: "더 많은 이야기 읽기 →",
        navDailyFortune: "오늘의 운세",
        navZodiac: "별자리",
        navChemistry: "궁합",
        navPetTarot: "펫 타로",
        navBlog: "블로그",
        petTarotTitle: "우주 펫 타로",
        petTarotSubtitle: "오늘 우리 아이가 하고 싶은 말은?",
        btnDrawTarot: "카드 뽑기",
        btnShareTarot: "결과 공유하기",
        btnCopyTarot: "결과 복사",
        btnShareCopy: "링크 복사",
        btnShareImage: "이미지 저장",
        btnShareReddit: "레딧",
        tarotLuckyLabel: "행운의 간식:",
        tabPersonality: "성격 분석",
        tabMonthly: "이달의 운세",
        blackHoleTitle: "🌌 우주 고민 처리장",
        worryPlaceholder: "고민을 블랙홀에 던져버리세요... (익명 보장)",
        btnThrowWorry: "우주로 방출하기",
        blogPageTitle: "코스믹 블로그 - 우주를 탐험하다",
        blogPageDescription: "깊은 우주의 지혜, 점성술 인사이트, 영적 가이드를 탐험해보세요. 별을 이해하는 당신의 여정이 여기에서 시작됩니다.",
        navHome: "홈",
        blogHeaderTitle: "코스믹 지혜",
        blogHeaderSubtitle: "우주, 별, 그리고 당신. 숨겨진 연결고리를 탐험하세요.",
        sectionInsight: "🌌 우주의 통찰",
        sectionPsychology: "🔮 신비 심리학",
        sectionAncient: "✋ 고대의 지혜",
        navInsight: "우주의 통찰",
        navPsychology: "신비 심리학",
        navAncient: "고대의 지혜",
        article1: {
            title: "🌟 2026: 영적 각성의 해가 될까?",
            meta: "2026년 1월 31일 | 점성술 트렌드",
            p1: "2026년에 오신 것을 환영합니다. 명왕성이 물병자리에서 깊이 자리 잡으면서, 우리는 인류가 연결되는 방식에 엄청난 변화를 목격하고 있습니다. 더 이상 기술만이 아니라 '영적인 기술'에 관한 것입니다.",
            h3_1: "왜 2026년이 특별할까요?",
            p2: "올해 목성과 해왕성의 정렬은 집단적 공감의 급증을 암시합니다. 당신은 자연, 별, 심지어 낯선 사람들과도 더 연결되어 있다고 느낄 수 있습니다. 이것은 우연이 아닙니다. 우주의 날씨입니다.",
            h3_2: "주목해야 할 주요 날짜",
            p3: "8월의 일식에 주목하세요. 이는 당신의 경력과 대중적 이미지와 관련된 의도를 설정하는 데 강력한 시간이 될 것입니다. 크게 꿈꾸는 것을 두려워하지 마세요."
        },
        article2: {
            title: "🧠 MBTI와 별자리의 소름 돋는 평행이론",
            meta: "2026년 2월 2일 | 심리학 & 별",
            p1: "MBTI와 별자리, 과연 과학적인 근거가 있을까요? 고대 원소 이론(불, 흙, 공기, 물)과 현대 심리학이 만나는 놀라운 지점을 탐험해 봅니다.",
            linkText: "📖 전체 분석 읽기 (클릭) →",
            linkUrl: "blog_posts/mbti-zodiac.html"
        },
        article3: {
            title: "✋ 손금 101: 감정선",
            meta: "2026년 1월 15일 | 고대 예술",
            p1: "지배적인 손을 보세요. 새끼손가락 아래에서 집게손가락 쪽으로 이어지는 맨 위 가로선을 보세요? 그것이 바로 감정선입니다. 이것은 당신의 감정적인 스타일을 나타내며, 단지 당신의 로맨틱한 미래만을 나타내는 것은 아닙니다.",
            h3_1: "길고 구부러져 있나요?",
            p2: "만약 감정선이 집게손가락 쪽으로 구부러져 있다면, 당신은 타고난 로맨티스트입니다. 감정을 솔직하게 표현하고 깊이 사랑합니다.",
            h3_2: "직선이고 짧나요?",
            p3: "만약 중지 아래에서 끝난다면, 당신은 사랑에 있어서 더 실용적이거나 심지어 이기적일 수 있습니다. 당신은 자유가 필요합니다.",
            h3_3: "끊어진 선인가요?",
            p4: "걱정하지 마세요. 영원히 깨진 마음을 의미하는 것은 아닙니다. 종종 당신이 극복한 주요한 감정적 스트레스나 변화를 나타냅니다."
        },
        article4: {
            title: "🧠 손금 102: 두뇌선",
            meta: "2026년 1월 31일 | 고대 예술",
            p1: "감정선 바로 아래에 위치한 두뇌선은 당신의 지성, 사고방식, 정보 처리 능력을 나타냅니다. 머리가 얼마나 좋은지가 아니라, *어떻게* 생각하는지를 보여줍니다.",
            h3_1: "길고 깊은 선?",
            p2: "명확한 집중력과 사고력을 가졌습니다. 행동하기 전에 깊이 생각하는 전략가 타입입니다.",
            h3_2: "아래로 휜 선?",
            p3: "손목 쪽으로 휘어진다면 창의적이고 상상력이 풍부합니다. 직관을 중시하는 예술가나 작가 기질이 있습니다.",
            h3_3: "일자로 뻗은 선?",
            p4: "실용적이고 논리적인 분석가입니다. 감정보다는 사실을 중시하며 수학, 과학, 비즈니스 분야에 강점이 있습니다."
        },
        article5: {
            title: "✋ 손금 103: 생명선",
            meta: "2026년 1월 31일 | 고대 예술",
            p1: "아마도 가장 유명한 손금인 생명선은 엄지손가락 밑부분을 따라 굽어 흐릅니다. 흔히 알려진 것과 달리, 생명선의 길이는 수명을 예측하는 것이 아니라 당신의 활력, 삶에 대한 열정, 그리고 주요한 삶의 변화를 나타냅니다.",
            h3_1: "길고 깊은 선?",
            p2: "뚜렷하고 깊은 생명선은 강한 활력, 좋은 건강, 그리고 튼튼한 체질을 의미합니다. 당신은 풍부한 에너지를 가지고 있으며 어려움으로부터 빠르게 회복할 수 있습니다.",
            h3_2: "짧거나 희미한 선?",
            p3: "짧거나 희미한 선이 짧은 수명을 의미하는 것은 아닙니다! 이는 신체 에너지가 적거나 건강과 웰빙에 더 주의를 기울일 필요가 있음을 시사할 수 있습니다. 또한 좀 더 정적인 생활 방식을 나타낼 수도 있습니다.",
            h3_3: "끊어지거나 사슬 모양?",
            p4: "생명선의 끊어짐이나 사슬 모양은 종종 중요한 변화, 스트레스 또는 건강상의 전환기를 의미합니다. 이는 반드시 부정적인 것은 아니지만, 당신이 적응하거나 어려움을 극복해야 했던 시점을 나타냅니다."
        },
        article6: {
            title: "🐾 반려동물 별자리 백과: 우리 아이는 왜 그럴까?",
            meta: "2026년 2월 2일 | 반려동물 점성",
            p1: "우리 아이가 왜 그렇게 행동하는지 궁금했던 적 있나요? 사람처럼 반려동물도 별의 영향을 받아요. 별자리를 알면 성격의 비밀이 풀릴지도 몰라요.",
            p2: "강아지와 고양이의 모든 별자리 성격을 다룬 완벽 가이드를 준비했습니다.",
            linkText: "📖 전체 백과사전 읽기 (클릭) →",
            linkUrl: "blog_posts/pet-zodiac.html"
        },
        article7: {
            title: "🐾 반려동물 별자리 백과 (2): 더 깊은 별의 이야기",
            meta: "2026년 1월 31일 | 반려동물 점성",
            p1: "반려동물 별자리 이야기를 이어가 볼까요? 성향을 알면 돌봄도 한결 쉬워져요.",
            h3_1: "게자리 펫 (6/21 - 7/22): 다정한 수호자",
            p2: "게자리 펫은 예민하고 보호본능이 강해요. 깊게 유대하고 안정적인 공간을 원합니다. 부드러운 말투와 일정한 루틴이 큰 힘이 돼요.",
            h3_2: "사자자리 펫 (7/23 - 8/22): 당당한 스타",
            p3: "사자자리 펫은 관심과 칭찬을 좋아합니다. 자신감이 넘치고 표현도 풍부해요. 멋지게 놀아주면 더 반짝입니다.",
            h3_3: "처녀자리 펫 (8/23 - 9/22): 섬세한 관찰자",
            p4: "처녀자리 펫은 관찰력이 뛰어나고 조금 까다로운 면이 있어요. 작은 변화도 잘 느끼고, 깔끔하고 정돈된 환경을 좋아합니다."
        },
        article8: {
            title: "✋ 손금 104: 운명선",
            meta: "2026년 1월 31일 | 고대 예술",
            p1: "운명선은 삶의 방향, 책임감, 전환점을 어떻게 받아들이는지를 보여주는 선입니다. 모든 사람에게 뚜렷하지는 않지만, 보인다면 의미가 큽니다.",
            h3_1: "굵고 길게 이어진 선?",
            p2: "자기 주도적이고 목적 의식이 분명한 타입입니다. 목표를 향해 꾸준히 나아가는 힘이 있어요.",
            h3_2: "끊기거나 방향이 바뀌는 선?",
            p3: "중요한 전환점이나 진로 변화가 있었음을 암시합니다. 변화는 불안이 아니라 성장의 신호일 수 있어요.",
            h3_3: "희미하거나 짧은 선?",
            p4: "자유롭게 흐름을 택하는 성향일 수 있습니다. 고정된 길보다는 다양한 경험에서 의미를 찾는 타입이에요."
        },
        article9: {
            title: "✋ 손바닥 안의 소우주: 별의 언덕과 운명의 지도",
            meta: "2026년 2월 2일 | 고대 예술",
            p1: "당신의 손바닥 안에 작은 우주가 있다는 사실을 아시나요? 고대인들은 손의 언덕을 행성의 이름으로 불렀습니다. 내 손안의 우주 지도를 읽는 법을 소개합니다.",
            linkText: "📖 전체 가이드 읽기 (클릭) →",
            linkUrl: "blog_posts/palm-reading.html"
        },
        backHomeLink: "← 코스믹 포춘으로 돌아가기"
    }
};

const quotes = {
    en: [
        "\"The universe is under no obligation to make sense to you.\" - Neil deGrasse Tyson",
        "\"Somewhere, something incredible is waiting to be known.\" - Carl Sagan",
        "\"We are all in the gutter, but some of us are looking at the stars.\" - Oscar Wilde",
        "\"Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.\" - Albert Einstein",
        "\"Look up at the stars and not down at your feet.\" - Stephen Hawking",
        "\"For my part I know nothing with any certainty, but the sight of the stars makes me dream.\" - Vincent Van Gogh",
        "\"We are made of starstuff.\" - Carl Sagan",
        "\"Astronomy compels the soul to look upwards and leads us from this world to another.\" - Plato",
        "\"Turn your face to the sun and the shadows fall behind you.\" - Ralph Waldo Emerson",
        "\"Earth is the cradle of humanity, but one cannot live in a cradle forever.\" - Konstantin Tsiolkovsky"
    ],
    ko: [
        "\"우주는 당신을 이해시킬 의무가 없습니다.\" - 닐 타이슨",
        "\"어딘가에 믿을 수 없는 무언가가 알려지길 기다리고 있습니다.\" - 칼 세이건",
        "\"우리는 모두 시궁창에 살고 있지만, 우리 중 누군가는 별을 바라보고 있습니다.\" - 오스카 와일드",
        "\"무한한 것은 두 가지입니다. 우주와 인간의 어리석음. 우주는 확실하지 않네요.\" - 아인슈타인",
        "\"고개를 숙여 발을 보지 말고 고개를 들어 별을 바라보세요.\" - 스티븐 호킹",
        "\"나는 아무것도 확실히 알지 못하지만, 별을 바라보면 꿈을 꾸게 된다.\" - 빈센트 반 고흐",
        "\"우리는 별의 물질로 이루어져 있습니다.\" - 칼 세이건",
        "\"천문학은 영혼을 위로 보게 하고, 우리를 이 세상에서 다른 세상으로 인도한다.\" - 플라톤",
        "\"태양을 향해 얼굴을 돌려라. 그리하면 그림자는 당신 뒤로 떨어질 것이다.\" - 랄프 왈도 에머슨",
        "\"지구는 인류의 요람이지만, 영원히 요람에서 살 수는 없다.\" - 콘스탄틴 치올코프스키"
    ]
};

const monthlyPhrases = {
    general: {
        ko: [
            "새로운 시작을 위한 에너지가 가득합니다. 망설이던 일이 있다면 지금이 기회입니다.",
            "잠시 멈춰 서서 재충전하는 시간이 필요합니다. 무리한 질주는 독이 될 수 있습니다.",
            "예상치 못한 변화가 찾아옵니다. 유연하게 대처하면 오히려 큰 기회가 됩니다.",
            "주변 사람들과의 협력이 중요한 시기입니다. 혼자 짊어지려 하지 마세요.",
            "과거의 노력이 결실을 맺는 달입니다. 자신을 믿고 즐기세요.",
            "작은 실수들이 반복될 수 있습니다. 꼼꼼하게 점검하는 습관이 필요합니다.",
            "창의력이 폭발하는 시기입니다. 예술적인 활동이나 새로운 취미를 시작해보세요.",
            "인내심이 시험받는 일이 생길 수 있습니다. 감정보다는 이성을 앞세우세요.",
            "여행이나 이동수가 보입니다. 낯선 곳에서 행운을 만날 수 있습니다.",
            "건강 관리에 유의해야 합니다. 규칙적인 생활 패턴을 되찾으세요."
        ],
        en: [
            "Energy for new beginnings is high. If you've been hesitating, now is the time.",
            "It's time to pause and recharge. Pushing too hard could be toxic.",
            "Unexpected changes are coming. Be flexible, and they will turn into opportunities.",
            "Collaboration is key this month. Don't try to carry everything alone.",
            "Past efforts are coming to fruition. Believe in yourself and enjoy.",
            "Small mistakes may occur repeatedly. Double-check everything.",
            "Creativity is exploding. Start an artistic activity or a new hobby.",
            "Your patience may be tested. Prioritize reason over emotion.",
            "Travel or movement is in the stars. You may find luck in strange places.",
            "Watch your health. Regain a regular lifestyle pattern."
        ]
    },
    love: {
        ko: [
            "새로운 인연이 다가오고 있습니다. 마음의 문을 열어두세요.",
            "기존의 관계가 더욱 깊어지는 시기입니다. 진솔한 대화를 나눠보세요.",
            "사소한 오해로 다툼이 생길 수 있습니다. 자존심을 조금만 내려놓으세요.",
            "매력이 상승하여 주변의 시선을 한 몸에 받습니다. 자신감을 가지세요.",
            "혼자만의 시간이 필요할 수도 있습니다. 나 자신을 먼저 사랑해주세요.",
            "과거의 연인이 연락 올 수 있습니다. 현명한 판단이 필요합니다.",
            "친구에서 연인으로 발전할 가능성이 있습니다. 주변을 잘 살펴보세요.",
            "너무 상대방에게 맞추려 하지 마세요. 자신의 주관을 지키는 것이 매력입니다.",
            "함께 여행을 떠나면 관계가 급진전될 수 있습니다.",
            "소개팅이나 모임 제안이 들어오면 거절하지 마세요."
        ],
        en: [
            "A new connection is approaching. Keep your heart open.",
            "Existing relationships deepen. Have honest conversations.",
            "Minor misunderstandings may cause conflict. Let go of your pride a bit.",
            "Your charm is rising, attracting attention. Be confident.",
            "You might need some alone time. Love yourself first.",
            "An ex-lover might contact you. Wise judgment is needed.",
            "A friend could turn into a lover. Look around you.",
            "Don't try too hard to please others. Your independence is attractive.",
            "Traveling together could fast-track your relationship.",
            "Don't say no to blind dates or party invitations."
        ]
    },
    wealth: {
        ko: [
            "뜻밖의 용돈이나 수익이 생길 수 있습니다. 하지만 지출도 늘어나니 주의하세요.",
            "투자에 신중해야 할 시기입니다. 남의 말만 믿고 움직이지 마세요.",
            "성실함이 최고의 무기입니다. 꾸준히 저축하면 큰 보상이 따릅니다.",
            "새로운 부업이나 수익원을 찾을 수 있는 아이디어가 떠오릅니다.",
            "충동구매 욕구가 강해집니다. 지갑을 열기 전에 세 번 생각하세요.",
            "빌려준 돈을 받거나 잊고 있던 돈을 찾을 수 있습니다.",
            "자기 계발에 투자하는 것이 가장 큰 수익으로 돌아옵니다.",
            "계약이나 문서 관련 운이 좋습니다. 꼼꼼히 살펴보면 이득을 봅니다.",
            "주변 사람들에게 베푸는 것이 나중에 더 큰 복으로 돌아옵니다.",
            "지금은 현금을 확보하고 관망하는 것이 유리합니다."
        ],
        en: [
            "Unexpected income is likely, but spending may also increase. Be careful.",
            "Be cautious with investments. Don't just follow others' words.",
            "Diligence is your weapon. Steady saving brings big rewards.",
            "Ideas for a new side hustle or income source will emerge.",
            "Impulse buying urges are strong. Think three times before opening your wallet.",
            "You might receive money back or find forgotten funds.",
            "Investing in self-development brings the biggest returns.",
            "Luck with contracts or documents is good. Review carefully for profit.",
            "Generosity to others will return as greater blessings later.",
            "It is advantageous to secure cash and wait and see for now."
        ]
    }
};

function getMonthlyFortune(signId, month, year, lang) {
    const safeLang = monthlyPhrases.general[lang] ? lang : 'en';
    const seedBase = `${signId}-${month}-${year}`;
    let hash = 0;
    for (let i = 0; i < seedBase.length; i++) {
        hash = (hash * 31 + seedBase.charCodeAt(i)) >>> 0;
    }
    const pick = (list, offset) => list[(hash + offset) % list.length];
    return {
        general: pick(monthlyPhrases.general[safeLang], 0),
        love: pick(monthlyPhrases.love[safeLang], 7),
        wealth: pick(monthlyPhrases.wealth[safeLang], 13)
    };
}

class CosmicOracle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.lang = localStorage.getItem('lang') || 'ko'; 
    this._setupUI();
    this.themeToggle.addEventListener('change', () => this._toggleTheme());
    this.langBtn.addEventListener('click', () => this._toggleLang());
    this.fortuneButton.addEventListener('click', () => this.getFortune());
    this._applyInitialTheme();
    this._updateText(); 
    this.checkFortuneAvailability();
  }
  _setupUI() {
    const style = document.createElement('style');
    style.textContent = `
      :host {
        --font-main: 'Orbitron', sans-serif;
        --text-color-dark: #edf2f7;
        --card-bg-dark: rgba(26, 32, 44, 0.7);
        --primary-glow-dark: #f04a75;
        --text-color-light: #1a202c;
        --card-bg-light: rgba(255, 255, 255, 0.6);
        --primary-glow-light: #667eea;
        --card-bg: var(--card-bg-dark);
        --text-color: var(--text-color-dark);
        --glow-color: var(--primary-glow-dark);
        --border-color: rgba(139, 148, 191, 0.3);
      }
      :host([data-theme='light']) {
        --card-bg: var(--card-bg-light);
        --text-color: var(--text-color-light);
        --glow-color: var(--primary-glow-light);
        --border-color: rgba(56, 66, 138, 0.2);
      }
      * { box-sizing: border-box; }
      .fortune-card {
        background: var(--card-bg);
        color: var(--text-color);
        padding: 2rem 2.5rem;
        border-radius: 20px;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid var(--border-color);
        box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37), 0 0 12px var(--glow-color);
        text-align: center;
        transition: all 0.5s ease;
        width: 100%;
        max-width: 500px;
        position: relative;
      }
      @media (max-width: 600px) {
        .fortune-card { padding: 1.2rem 1rem; border-radius: 15px; }
        h1 { font-size: 1.5rem !important; margin-bottom: 1rem !important; }
        .score-value { font-size: 2rem !important; }
        .scores-container { flex-direction: column; gap: 0.8rem !important; margin: 1rem 0 !important; }
        .score-section { padding: 1rem !important; min-width: auto; width: 100%; }
        .score-section h2 { font-size: 1.2rem !important; margin-bottom: 0.5rem !important; }
        button { padding: 0.8rem 2rem !important; font-size: 1rem !important; margin-top: 0.5rem !important; }
      }
      h1 {
        font-family: var(--font-main); font-size: 2.2rem; font-weight: 700;
        text-shadow: 0 0 5px var(--glow-color), 0 0 10px var(--glow-color);
        margin-bottom: 1.5rem; margin-top: 0.5rem;
      }
      .scores-container { display: flex; justify-content: space-around; gap: 1.5rem; margin: 2rem 0; flex-wrap: wrap; }
      .score-section { flex: 1; min-width: 150px; padding: 1.5rem; border: 1px solid var(--border-color); border-radius: 15px; transition: all 0.3s ease; }
      .score-section h2 { font-family: var(--font-main); font-size: 1.5rem; font-weight: 400; display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; margin-top: 0; margin-bottom: 1rem; color: var(--text-color); white-space: nowrap; }
      .score-value { font-family: var(--font-main); font-size: 3.5rem; font-weight: 700; margin: 0; color: var(--glow-color); text-shadow: 0 0 8px var(--glow-color); }
      .score-message { margin-top: 1rem; min-height: 2.5em; font-size: 0.9rem; opacity: 0.8; }
      button { background: linear-gradient(45deg, var(--glow-color), #4e54c8); color: white; padding: 0.95rem 1.6rem; min-height: 48px; min-width: 220px; border: none; border-radius: 999px; cursor: pointer; font-family: var(--font-main); font-size: 1.05rem; font-weight: 800; transition: all 0.3s ease; box-shadow: 0 0 10px var(--glow-color); margin-top: 1rem; }
      button:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 0 15px var(--glow-color); }
      button:disabled { background: #555; cursor: not-allowed; box-shadow: none; opacity: 0.6; }
      .controls-container { display: flex; justify-content: flex-end; align-items: center; gap: 10px; width: 100%; margin-bottom: 0.5rem; position: relative; }
      @media (max-width: 600px) { .controls-container { justify-content: center; margin-bottom: 1rem; } }
      .lang-btn { background: transparent; border: 1px solid var(--text-color); color: var(--text-color); padding: 4px 8px; border-radius: 5px; cursor: pointer; font-family: var(--font-main); font-size: 0.8rem; transition: all 0.3s ease; }
      .lang-btn:hover { background: var(--glow-color); border-color: var(--glow-color); color: white; }
      .theme-switch { display: inline-block; height: 28px; position: relative; width: 55px; }
      .theme-switch input { display:none; }
      .slider { background-color: #3e445b; bottom: 0; cursor: pointer; left: 0; position: absolute; right: 0; top: 0; transition: .4s; border-radius: 28px; }
      .slider:before { background-color: #fff; bottom: 4px; content: "☀️"; height: 20px; width: 20px; left: 4px; line-height:20px; font-size:12px; text-align:center; position: absolute; transition: .4s; border-radius: 50%; }
      input:checked + .slider { background: linear-gradient(45deg, var(--glow-color), #4e54c8); }
      input:checked + .slider:before { transform: translateX(27px); content: "🌙"; }
    `;
    const wrapper = document.createElement('div');
    wrapper.className = 'fortune-card';
    wrapper.innerHTML = `
      <div class="controls-container">
        <button id="lang-btn" class="lang-btn">KO</button>
        <label class="theme-switch">
          <input type="checkbox" id="theme-toggle">
          <span class="slider"></span>
        </label>
      </div>
      <h1 id="title"></h1>
      <div class="scores-container">
        <div class="score-section">
          <h2><span role="img" aria-label="money">💰</span> <span id="label-wealth"></span></h2>
          <p class="score-value" id="financial-score">--</p>
          <p class="score-message" id="financial-message"></p>
        </div>
        <div class="score-section">
          <h2><span role="img" aria-label="people">🤝</span> <span id="label-bonds"></span></h2>
          <p class="score-value" id="relationship-score">--</p>
          <p class="score-message" id="relationship-message"></p>
        </div>
      </div>
      <button id="fortune-button"></button>
    `;
    this.shadowRoot.append(style, wrapper);
    this.themeToggle = this.shadowRoot.getElementById('theme-toggle');
    this.langBtn = this.shadowRoot.getElementById('lang-btn');
    this.fortuneButton = this.shadowRoot.getElementById('fortune-button');
    this.titleDisplay = this.shadowRoot.getElementById('title');
    this.labelWealth = this.shadowRoot.getElementById('label-wealth');
    this.labelBonds = this.shadowRoot.getElementById('label-bonds');
    this.financialScoreDisplay = this.shadowRoot.getElementById('financial-score');
    this.relationshipScoreDisplay = this.shadowRoot.getElementById('relationship-score');
    this.financialMessageDisplay = this.shadowRoot.getElementById('financial-message');
    this.relationshipMessageDisplay = this.shadowRoot.getElementById('relationship-message');
  }
  _applyInitialTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.dataset.theme = savedTheme;
    this.dataset.theme = savedTheme;
    this.themeToggle.checked = savedTheme === 'dark';
  }
  _toggleTheme() {
    const newTheme = this.themeToggle.checked ? 'dark' : 'light';
    document.body.dataset.theme = newTheme;
    this.dataset.theme = newTheme;
    localStorage.setItem('theme', newTheme);
    if (typeof DISQUS !== 'undefined') {
        setTimeout(() => {
            DISQUS.reset({
                reload: true,
                config: function () {
                    this.page.url = window.location.href;
                    this.page.identifier = 'cosmic-fortune-page';
                }
            });
        }, 200);
    }
  }
  _toggleLang() {
      this.lang = this.lang === 'en' ? 'ko' : 'en';
      localStorage.setItem('lang', this.lang);
      this._updateText();
      updateGlobalText(this.lang);
      updateQuote(this.lang);
  }
  _updateText() {
      const t = translations[this.lang];
      this.langBtn.textContent = this.lang === 'en' ? '한국어' : 'English';
      this.titleDisplay.textContent = t.title;
      this.labelWealth.textContent = t.wealth;
      this.labelBonds.textContent = t.bonds;
      this.checkFortuneAvailability();
  }
  getFortune() {
    if (!this.checkFortuneAvailability(false)) return;
    const financialScore = Math.floor(Math.random() * 100) + 1;
    const relationshipScore = Math.floor(Math.random() * 100) + 1;
    const fortuneData = { financialScore, relationshipScore };
    localStorage.setItem('fortuneData', JSON.stringify(fortuneData));
    localStorage.setItem('lastFortuneDate', new Date().toDateString());
    this._animateScore(this.financialScoreDisplay, financialScore);
    this._animateScore(this.relationshipScoreDisplay, relationshipScore);
    setTimeout(() => { this.checkFortuneAvailability(true); }, 1500);
    this.checkFortuneAvailability(true);
  }
  _animateScore(element, finalScore) {
    let currentScore = 0;
    const duration = 1500;
    const stepTime = Math.max(1, Math.floor(duration / finalScore));
    const timer = setInterval(() => {
      currentScore++;
      element.textContent = currentScore;
      if (currentScore >= finalScore) { clearInterval(timer); }
    }, stepTime);
  }
  getFortuneMessage(score) {
    const t = translations[this.lang].fortunes;
    if (score >= 81) return t[81];
    if (score >= 61) return t[61];
    if (score >= 41) return t[41];
    if (score >= 21) return t[21];
    return t[0];
  }
  checkFortuneAvailability(isAfterClick = false) {
    const today = new Date().toDateString();
    const lastFortuneDate = localStorage.getItem('lastFortuneDate');
    const t = translations[this.lang];
    if (lastFortuneDate === today) {
      this.fortuneButton.disabled = true;
      this.fortuneButton.textContent = t.btnRevealed;
      const savedFortune = localStorage.getItem('fortuneData');
      if (savedFortune) {
            try {
                const data = JSON.parse(savedFortune);
                this.financialScoreDisplay.textContent = data.financialScore;
                this.relationshipScoreDisplay.textContent = data.relationshipScore;
                this.financialMessageDisplay.innerHTML = this.getFortuneMessage(data.financialScore);
                this.relationshipMessageDisplay.innerHTML = this.getFortuneMessage(data.relationshipScore);
            } catch (e) {
                localStorage.removeItem('fortuneData');
                localStorage.removeItem('lastFortuneDate');
            }
      }
      return false;
    } else {
      this.fortuneButton.disabled = false;
      this.fortuneButton.textContent = t.btnReveal;
      if (!isAfterClick) {
        this.financialScoreDisplay.textContent = '--';
        this.relationshipScoreDisplay.textContent = '--';
        this.financialMessageDisplay.textContent = t.msgFinancial;
        this.relationshipMessageDisplay.textContent = t.msgRelationship;
      }
      return true;
    }
  }
}
customElements.define('cosmic-oracle', CosmicOracle);

const zodiacData = {
    aries: { id: 'aries', icon: "♈", date: "03.21 - 04.19", rulingPlanet: "Mars", ko: { name: "양자리", catchphrase: "\"나를 따르라! 멈추지 않는 불꽃 엔진\"", desc: "순수한 열정과 에너지가 넘치는 개척자입니다. 원하는 것이 있으면 뒤도 돌아보지 않고 돌진하는 실행력이 엄청나죠. 솔직하고 뒤끝이 없는 쿨한 성격의 소유자입니다.", shadow: "성격이 너무 급해서 컵라면 익기 10초 전에 뚜껑을 엽니다. 화를 불같이 내지만 금방 까먹어서 주변 사람만 당황하게 만들기도 해요.", love: "금방 사랑에 빠지고(금사빠), 좋아하면 직진입니다. 밀당? 그게 뭐죠?", match: "사자자리, 사수자리", lucky: "빨간색, 모자" }, en: { name: "Aries", catchphrase: "\"I am the first! The Unstoppable Engine\"", desc: "A bold pioneer full of pure passion and energy. When you want something, you charge forward without looking back. You are honest, direct, and hold no grudges.", shadow: "You're too impatient to wait for the microwave to beep. You get angry like a volcano but forget why 5 minutes later, confusing everyone.", love: "You fall in love fast and chase hard. Playing hard to get? You don't know her.", match: "Leo, Sagittarius", lucky: "Red, Hats" } },
    taurus: { id: 'taurus', icon: "♉", date: "04.20 - 05.20", rulingPlanet: "Venus", ko: { name: "황소자리", catchphrase: "\"내 거 건드리지 마 (평화주의자)\"", desc: "안정과 평화를 사랑하는 우아한 쾌락주의자입니다. 맛있는 음식, 좋은 향기, 부드러운 감촉을 즐길 줄 알며, 한 번 마음먹은 일은 끝까지 해내는 뚝심이 있습니다.", shadow: "고집이 세상을 멸망시킬 수준입니다. 한 번 삐치면 동굴 속으로 들어가서 3박 4일 동안 안 나옵니다.", love: "천천히 스며드는 사랑을 합니다. 하지만 내 사람이다 싶으면 엄청난 소유욕을 보이죠.", match: "처녀자리, 염소자리", lucky: "초록색, 맛집 쿠폰" }, en: { name: "Taurus", catchphrase: "\"Don't touch my food (Peace Lover)\"", desc: "An elegant hedonist who loves stability. You appreciate good food, nice scents, and comfort. Once you decide on something, you stick to it with immense persistence.", shadow: "Your stubbornness could rival a brick wall. If you get sulky, you retreat into a cave and won't come out for days.", love: "Slow burn love. But once committed, your possessiveness kicks in big time.", match: "Virgo, Capricorn", lucky: "Green, Restaurant Coupons" } },
    gemini: { id: 'gemini', icon: "♊", date: "05.21 - 06.21", rulingPlanet: "Mercury", ko: { name: "쌍둥이자리", catchphrase: "\"근데 그거 들었어? (정보 수집가)\"", desc: "호기심 천국! 세상의 모든 재미있는 뉴스에 귀를 기울이는 정보통입니다. 재치 있는 말솜씨로 주변을 즐겁게 하며, 동시에 두 가지 일을 처리하는 멀티태스킹의 귀재입니다.", shadow: "싫증을 너무 빨리 냅니다. 기분이 롤러코스터처럼 변해서 '너 이중인격이야?'라는 소리를 자주 듣습니다.", love: "대화가 통하는 게 1순위! 지루한 사람은 딱 질색입니다.", match: "천칭자리, 물병자리", lucky: "노란색, 스마트폰" }, en: { name: "Gemini", catchphrase: "\"Wait, did you hear that? (Info Collector)\"", desc: "Curiosity heaven! You are the news hub who knows everything. Witty and quick-minded, you are a master of multitasking and keeping things fun.", shadow: "You get bored faster than light speed. Your mood swings make people ask if you're two different people.", love: "Communication is key! Boring people are your worst nightmare.", match: "Libra, Aquarius", lucky: "Yellow, Smartphone" } },
    cancer: { id: 'cancer', icon: "♋", date: "06.22 - 07.22", rulingPlanet: "Moon", ko: { name: "게자리", catchphrase: "\"내 사람들은 내가 지켜 (감성 보호자)\"", desc: "따뜻한 모성애/부성애를 가진 감성적인 수호자입니다. 공감 능력이 뛰어나 남의 아픔을 내 것처럼 느끼며, 내 사람이라고 생각하면 간도 쓸개도 빼줍니다.", shadow: "감정 기복이 파도처럼 심합니다. 과거의 서운한 일을 엑셀 파일로 정리해서 기억하고 있다가 싸울 때 꺼냅니다.", love: "헌신적인 사랑꾼. 하지만 상처받으면 단단한 껍질 속으로 숨어버립니다.", match: "전갈자리, 물고기자리", lucky: "진주색, 푹신한 베개" }, en: { name: "Cancer", catchphrase: "\"I protect my own (Emotional Guardian)\"", desc: "A warm, emotional guardian with great empathy. You feel others' pain as your own and would do anything for the people you consider 'yours'.", shadow: "Your mood swings are like tidal waves. You remember every slight from 10 years ago and bring it up during arguments.", love: "Devoted lover. But if hurt, you retreat into your hard shell immediately.", match: "Scorpio, Pisces", lucky: "Pearl, Fluffy Pillow" } },
    leo: { id: 'leo', icon: "♌", date: "07.23 - 08.22", rulingPlanet: "Sun", ko: { name: "사자자리", catchphrase: "\"주인공은 나야 나 (무대 체질)\"", desc: "태양처럼 빛나는 존재감! 어디서나 주목받기를 즐기는 타고난 스타입니다. 자신감이 넘치고 화끈하며, 리더로서 주변 사람들을 이끄는 카리스마가 있습니다.", shadow: "칭찬을 안 해주면 시들해집니다. 허세가 좀 있어서 지갑을 너무 잘 엽니다. (이번 달 카드값 주의)", love: "화려하고 드라마틱한 로맨스를 꿈꿉니다. 나를 왕/여왕처럼 대접해줘!", match: "양자리, 사수자리", lucky: "금색(Gold), 거울" }, en: { name: "Leo", catchphrase: "\"All eyes on me (Born Star)\"", desc: "Shining like the Sun! You are a natural-born star who loves the spotlight. Confident and charismatic, you lead others with warmth and boldness.", shadow: "You wither without compliments. Your desire to show off makes you spend too much money. (Watch your credit card!)", love: "You want a dramatic, movie-like romance. Treat me like Royalty!", match: "Aries, Sagittarius", lucky: "Gold, Mirror" } },
    virgo: { id: 'virgo', icon: "♍", date: "08.23 - 09.23", rulingPlanet: "Mercury", ko: { name: "처녀자리", catchphrase: "\"이거, 1mm 비뚤어졌는데요? (완벽주의자)\"", desc: "섬세하고 분석적인 완벽주의자입니다. 남들이 놓치는 디테일을 잡아내는 능력이 탁월하며, 현실적이고 실용적인 해결책을 제시하는 든든한 참모입니다.", shadow: "잔소리가 랩(Rap) 수준입니다. 본인에게도 너무 엄격해서 스트레스를 사서 받습니다.", love: "까다로운 눈높이. 하지만 한 번 마음을 열면 섬세하게 챙겨주는 츤데레.", match: "황소자리, 염소자리", lucky: "네이비, 다이어리" }, en: { name: "Virgo", catchphrase: "\"It's 1mm off-center (Perfectionist)\"", desc: "A delicate and analytical perfectionist. You spot details everyone else misses and offer practical solutions. A reliable strategist.", shadow: "Your nagging skills are rap-god level. You are too strict with yourself and buy unnecessary stress.", love: "High standards. But once you open up, you are a caring 'Tsundere'.", match: "Taurus, Capricorn", lucky: "Navy, Planner" } },
    libra: { id: 'libra', icon: "♎", date: "09.24 - 10.22", rulingPlanet: "Venus", ko: { name: "천칭자리", catchphrase: "\"아, 못 고르겠어... (결정장애?)\"", desc: "조화와 균형을 중시하는 평화주의자입니다. 뛰어난 미적 감각과 사교성을 지녀 누구와도 잘 어울리며, 우아하고 세련된 매너로 인기가 많습니다.", shadow: "점심 메뉴 고르는 데 1시간 걸립니다. 갈등을 피하려고 무조건 '좋아'라고 하다가 나중에 힘들어합니다.", love: "로맨틱하고 우아한 연애를 선호합니다. 외모(스타일)를 좀 많이 봅니다.", match: "쌍둥이자리, 물병자리", lucky: "파스텔 핑크, 향수" }, en: { name: "Libra", catchphrase: "\"I can't decide... (Indecisive)\"", desc: "A peace lover who values harmony and balance. With great aesthetic sense and social skills, you are popular and elegant.", shadow: "It takes you an hour to pick a lunch menu. You say 'yes' to everything to avoid conflict and suffer later.", love: "Prefers romantic and elegant dates. Looks (style) matter to you.", match: "Gemini, Aquarius", lucky: "Pastel Pink, Perfume" } },
    scorpio: { id: 'scorpio', icon: "♏", date: "10.23 - 11.22", rulingPlanet: "Pluto", ko: { name: "전갈자리", catchphrase: "\"진실을 말해. 다 알고 있으니까. (통찰력)\"", desc: "강렬한 눈빛과 신비로운 매력을 지닌 승부사입니다. 겉으로는 조용해 보이지만 내면에는 뜨거운 열정을 품고 있으며, 본질을 꿰뚫어 보는 무서운 통찰력이 있습니다.", shadow: "질투와 집착의 화신입니다. 한 번 배신당하면 지구 끝까지 쫓아가서 복수할지도 모릅니다.", love: "영혼까지 결합되는 깊고 진한 사랑을 원합니다. 바람피우면... 아시죠?", match: "게자리, 물고기자리", lucky: "버건디, 선글라스" }, en: { name: "Scorpio", catchphrase: "\"Tell the truth. I already know. (Insight)\"", desc: "Mysterious charm with intense eyes. Quiet on the outside but burning with passion inside. You see through lies instantly.", shadow: "The avatar of jealousy and obsession. Betray a Scorpio, and they might chase you to the ends of the earth.", love: "Deep, soul-binding love. If you cheat... run.", match: "Cancer, Pisces", lucky: "Burgundy, Sunglasses" } },
    sagittarius: { id: 'sagittarius', icon: "♐", date: "11.23 - 12.24", rulingPlanet: "Jupiter", ko: { name: "사수자리", catchphrase: "\"일단 가보자! 어떻게든 되겠지 (자유로운 영혼)\"", desc: "낙천적이고 자유로운 영혼의 모험가입니다. 새로운 세상, 철학, 여행을 사랑하며 긍정적인 에너지를 전파합니다. 얽매이는 것을 가장 싫어합니다.", shadow: "너무 솔직해서 남에게 상처를 줍니다(악의는 없음). 마무리가 약해서 벌려놓은 일만 100개입니다.", love: "친구 같은 편안한 연애, 구속하지 않는 연애를 추구합니다.", match: "양자리, 사자자리", lucky: "보라색, 여행 가방" }, en: { name: "Sagittarius", catchphrase: "\"Let's just go! It'll work out (Free Spirit)\"", desc: "Optimistic adventurer. You love travel, philosophy, and new worlds. You spread positive vibes and hate being tied down.", shadow: "Too blunt that it hurts others (no malice intended). You start 100 things but finish 0.", love: "Prefers a friend-like relationship without restrictions.", match: "Aries, Leo", lucky: "Purple, Travel Bag" } },
    capricorn: { id: 'capricorn', icon: "♑", date: "12.25 - 01.19", rulingPlanet: "Saturn", ko: { name: "염소자리", catchphrase: "\"그래서, 결론이 뭡니까? (야망가)\"", desc: "성실하고 책임감 강한 야망가입니다. 목표를 향해 꾸준히 노력하며, 결국에는 정상에 오르는 대기만성형 리더입니다. 시간을 낭비하는 것을 싫어합니다.", shadow: "일 중독자(Workaholic)입니다. 너무 진지해서 농담을 다큐로 받아들여 분위기를 싸하게 만듭니다.", love: "조건과 현실을 고려하는 신중한 연애. 하지만 책임감은 최고입니다.", match: "황소자리, 처녀자리", lucky: "검정색, 시계" }, en: { name: "Capricorn", catchphrase: "\"So, what's the bottom line? (Ambitious)\"", desc: "Diligent and responsible. You climb the mountain of success slowly but surely. You hate wasting time.", shadow: "Workaholic. You take jokes too seriously and kill the vibe.", love: "Cautious love considering reality. But incredibly responsible.", match: "Taurus, Virgo", lucky: "Black, Watch" } },
    aquarius: { id: 'aquarius', icon: "♒", date: "01.20 - 02.18", rulingPlanet: "Uranus", ko: { name: "물병자리", catchphrase: "\"난 남들과 달라 (4차원 천재)\"", desc: "독창적이고 혁신적인 아이디어 뱅크입니다. 편견이 없고 논리적이며, 인류애가 넘치는 박애주의자입니다. 남들이 '예'라고 할 때 '아니오'라고 할 수 있는 용기가 있습니다.", shadow: "너무 쿨해서 냉동인간 같습니다. 가끔 외계인어(혼자만의 논리)를 사용해서 소통이 안 됩니다.", love: "지적 호기심을 자극하는 사람에게 끌립니다. 집착하면 도망갑니다.", match: "쌍둥이자리, 천칭자리", lucky: "하늘색, 최신 기기" }, en: { name: "Aquarius", catchphrase: "\"I am different (Eccentric Genius)\"", desc: "Original and innovative idea bank. Unbiased, logical, and humanitarian. You have the courage to say 'No' when everyone says 'Yes'.", shadow: "So cool you seem like a frozen statue. Sometimes you speak 'Alien' (your own logic) and no one understands.", love: "Attracted to intelligence. If someone clings, you run away.", match: "Gemini, Libra", lucky: "Sky Blue, Latest Gadget" } },
    pisces: { id: 'pisces', icon: "♓", date: "02.19 - 03.20", rulingPlanet: "Neptune", ko: { name: "물고기자리", catchphrase: "\"꿈속에서 만나요 (로맨틱 몽상가)\"", desc: "풍부한 감수성과 예술적 영감을 지닌 몽상가입니다. 마음이 여리고 동정심이 많아 힘든 사람을 그냥 지나치지 못합니다. 상상력이 우주 최강입니다.", shadow: "현실 감각이 제로에 가깝습니다. 분위기에 잘 휩쓸려서 거절을 못 하고 이용당하기 쉽습니다.", love: "동화 같은 사랑을 꿈꿉니다. 낭만 없이는 못 살아!", match: "게자리, 전갈자리", lucky: "민트색, 음악" }, en: { name: "Pisces", catchphrase: "\"See you in my dreams (Romantic Dreamer)\"", desc: "A dreamer with artistic inspiration. Gentle and compassionate, you can't ignore those in need. Your imagination is boundless.", shadow: "Zero reality sense. You get swept away by atmosphere and can't say 'No'.", love: "Dreams of a fairytale romance. Can't live without romance!", match: "Cancer, Scorpio", lucky: "Mint, Music" } }
};

const zodiacElements = {
    aries: 'fire', leo: 'fire', sagittarius: 'fire',
    taurus: 'earth', virgo: 'earth', capricorn: 'earth',
    gemini: 'air', libra: 'air', aquarius: 'air',
    cancer: 'water', scorpio: 'water', pisces: 'water'
};

const compatibilityData = {
    "fire-fire": { score: 95, ko: { title: "폭발하는 에너지! 열정의 도가니", desc: "두 분이 만나면 핵폭발급 에너지가 발생합니다! 서로의 열정을 누구보다 잘 이해하고, 함께하면 두려울 게 없는 천하무적 파트너가 됩니다.", tip: "싸울 때도 불같이 싸우니 조심하세요. 자존심 대결만 피하면 완벽합니다." }, en: { title: "Explosive Energy!", desc: "Nuclear energy! You understand each other's passion perfectly.", tip: "You fight like fire. Avoid ego battles." } },
    "fire-air": { score: 90, ko: { title: "불길을 더 키워주는 바람", desc: "환상의 짝꿍입니다! 공기(바람)가 불을 더 크게 타오르게 하듯, 상대방은 당신의 열정에 영감을 불어넣어 줍니다.", tip: "너무 들떠서 현실적인 문제를 놓칠 수 있습니다." }, en: { title: "Wind Fanning the Flames", desc: "Fantastic match! Wind fuels fire.", tip: "Don't get too carried away." } },
    "fire-earth": { score: 50, ko: { title: "달리는 스포츠카와 과속방지턱", desc: "불은 앞만 보고 달리려 하고, 흙은 멈춰서 다지려 합니다. 흙의 안정감이 불의 무모함을 막아줍니다.", tip: "상대방의 신중함을 '느리다'고 비난하지 마세요." }, en: { title: "Sports Car vs Speed Bump", desc: "Fire runs, Earth builds. Stable but can be frustrating.", tip: "Don't blame their caution." } },
    "fire-water": { score: 30, ko: { title: "앗, 뜨거! 물과 기름의 만남", desc: "서로 너무 다릅니다. 하지만 그 '다름'이 강렬한 끌림을 만들기도 합니다.", tip: "논리적으로 따지기보다 감정을 먼저 읽어주세요." }, en: { title: "Ouch, Hot!", desc: "Very different. But opposites attract.", tip: "Validate feelings first." } },
    "earth-earth": { score: 95, ko: { title: "흔들리지 않는 편안함", desc: "말하지 않아도 통하는 사이입니다. 갈등 없이 신뢰를 쌓아갑니다.", tip: "너무 안정적이라 지루해질 수 있습니다. 여행을 떠나보세요." }, en: { title: "Unshakable Comfort", desc: "Telepathic stability. Great trust.", tip: "Try a spontaneous trip." } },
    "earth-water": { score: 90, ko: { title: "비 온 뒤 굳어지는 단단한 땅", desc: "흙은 물을 담아주고, 물은 흙을 촉촉하게 해줍니다. 힐링 관계입니다.", tip: "서로의 독립성을 존중해주세요." }, en: { title: "Nourishing Rain", desc: "Earth holds Water. A healing relationship.", tip: "Respect independence." } },
    "earth-fire": { score: 50, ko: { title: "화산 폭발 직전의 땅", desc: "불 같은 상대방은 너무 무모해 보일 수 있지만, 당신을 더 높은 곳으로 이끌어 줄 수 있습니다.", tip: "잔소리는 조금만 줄이세요." }, en: { title: "Volcanic Ground", desc: "Reckless vs Realistic. Stimulating.", tip: "Nag less." } },
    "earth-air": { score: 50, ko: { title: "모래바람 날리는 사막", desc: "서로의 라이프스타일이 달라서 이해하기 힘들 수 있습니다.", tip: "상대방을 가두려 하지 마세요." }, en: { title: "Dust in the Wind", desc: "Different lifestyles. Hard to understand.", tip: "Don't cage them." } },
    "air-air": { score: 95, ko: { title: "밤새도록 수다 떠는 소울메이트", desc: "지적 호기심과 코드가 완벽하게 맞아서, 연인이자 가장 친한 친구가 될 수 있습니다.", tip: "말만 하다가 끝날 수 있습니다. 실천하세요." }, en: { title: "Chatty Soulmates", desc: "Intellectual match. Best friends.", tip: "Action matters." } },
    "air-fire": { score: 90, ko: { title: "열기구 타고 날아가는 모험", desc: "당신의 아이디어에 상대방이 불을 붙여 실행에 옮깁니다.", tip: "둘 다 참을성이 좀 부족합니다." }, en: { title: "Hot Air Balloon", desc: "Ideas meet action. Fun daily.", tip: "Take a break when angry." } },
    "air-water": { score: 60, ko: { title: "호수 위의 안개", desc: "신비롭고 몽환적인 분위기입니다. '차갑다'는 오해를 받을 수 있습니다.", tip: "논리적으로 이기려 들지 마세요." }, en: { title: "Mist on the Lake", desc: "Mysterious. Logic vs Emotion.", tip: "Don't win with logic." } },
    "air-earth": { score: 50, ko: { title: "땅에 묶인 연", desc: "당신은 자유롭게 날고 싶은데, 상대방은 줄을 잡고 현실로 끌어당깁니다.", tip: "상대방의 현실적인 조언을 무시하지 마세요." }, en: { title: "Kite on a String", desc: "Flying vs Grounding. Frustrating but safe.", tip: "Listen to advice." } },
    "water-water": { score: 95, ko: { title: "말없이 흐르는 깊은 강물", desc: "눈빛만 봐도 기분을 아는 텔레파시 커플입니다.", tip: "서로의 감정 쓰레기통이 되지 않도록 주의하세요." }, en: { title: "Deep Silent River", desc: "Telepathic emotional bond.", tip: "Don't be emotional dumpsters." } },
    "water-earth": { score: 90, ko: { title: "꽃을 피우는 단비와 옥토", desc: "당신의 사랑과 배려가 상대방을 성장시킵니다. 결혼 상대로 이상적입니다.", tip: "재촉하지 마세요." }, en: { title: "Blooming Flowers", desc: "Love grows. Ideal for marriage.", tip: "Be patient." } },
    "water-fire": { score: 30, ko: { title: "끓어 넘치는 냄비", desc: "상대방의 열정이 매력적이지만, 가끔은 당신을 지치게 만듭니다.", tip: "직설적인 말에 상처받지 마세요." }, en: { title: "Boiling Pot", desc: "Attractive but exhausting.", tip: "Don't take words personally." } },
    "water-air": { score: 60, ko: { title: "파도를 일으키는 바람", desc: "상대방의 말 한마디에 당신의 마음이 요동칩니다. 지적으로는 즐겁습니다.", tip: "깊은 감정적 공감을 기대하지 마세요." }, en: { title: "Wind and Waves", desc: "Words stir emotions. Intellectually fun.", tip: "Don't expect deep empathy." } }
};

const ZodiacManager = {
    init() {
        this.grid = document.getElementById('zodiac-grid');
        this.modal = document.getElementById('zodiac-modal');
        this.modalBody = document.getElementById('modal-body');
        this.closeBtn = document.querySelector('.close-modal');
        this.currentSignId = null; 
        this.currentTab = 'personality'; 
        if (!this.grid || !this.modal) return;
        this.renderGrid();
        this.bindEvents();
    },
    renderGrid() {
        this.grid.innerHTML = ''; 
        const lang = localStorage.getItem('lang') || 'ko';
        Object.values(zodiacData).forEach(sign => {
            const card = document.createElement('div');
            card.className = 'zodiac-card';
            card.dataset.id = sign.id;
            const name = sign[lang].name;
            card.innerHTML = `<div class="zodiac-icon">${sign.icon}</div><div class="zodiac-name">${name}</div><div class="zodiac-date">${sign.date}</div>`;
            card.addEventListener('click', () => this.openModal(sign.id));
            this.grid.appendChild(card);
        });
    },
    openModal(signId) {
        this.currentSignId = signId;
        this.currentTab = 'personality';
        this.updateModalContent();
        this.modal.classList.add('active');
        this.modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; 
    },
    closeModal() {
        this.modal.classList.remove('active');
        this.currentSignId = null;
        setTimeout(() => {
            this.modal.classList.add('hidden');
            document.body.style.overflow = ''; 
        }, 300); 
    },
    switchTab(tab) {
        this.currentTab = tab;
        this.updateModalContent();
    },
    updateModalContent() {
        if (!this.currentSignId) return;
        const lang = localStorage.getItem('lang') || 'ko';
        const data = zodiacData[this.currentSignId];
        const content = data[lang];
        const t = translations[lang];
        const tabsHtml = `<div class="modal-tabs"><button class="tab-btn ${this.currentTab === 'personality' ? 'active' : ''}" onclick="ZodiacManager.switchTab('personality')">${t.tabPersonality}</button><button class="tab-btn ${this.currentTab === 'monthly' ? 'active' : ''}" onclick="ZodiacManager.switchTab('monthly')">${t.tabMonthly}</button></div>`;
        let contentHtml = '';
        if (this.currentTab === 'personality') {
            const labels = { en: { personality: "Cosmic Personality", shadow: "Shadow Side", love: "Love Style", match: "Best Match", lucky: "Lucky Item" }, ko: { personality: "기본 성격", shadow: "숨겨진 단점 (팩폭)", love: "연애 스타일", match: "베스트 궁합", lucky: "행운 아이템" } };
            const label = labels[lang];
            contentHtml = `<div class="zodiac-detail-catchphrase">${content.catchphrase}</div><div class="zodiac-info-block"><div class="zodiac-info-label">✨ ${label.personality}</div><div class="zodiac-info-text">${content.desc}</div></div><div class="zodiac-info-block"><div class="zodiac-info-label">🌑 ${label.shadow}</div><div class="zodiac-info-text">${content.shadow}</div></div><div class="zodiac-info-block"><div class="zodiac-info-label">💘 ${label.love}</div><div class="zodiac-info-text">${content.love}</div></div><div class="zodiac-info-block"><div class="zodiac-info-label">💞 ${label.match}</div><div class="zodiac-info-text">${content.match}</div></div><div class="zodiac-info-block"><div class="zodiac-info-label">🍀 ${label.lucky}</div><div class="zodiac-info-text">${content.lucky}</div></div>`;
        } else {
            const date = new Date();
            const month = date.getMonth(); 
            const year = date.getFullYear();
            const monthNames = { ko: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"], en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] };
            const currentMonthName = monthNames[lang][month];
            const fortune = getMonthlyFortune(this.currentSignId, month, year, lang);
            const labels = { en: { general: "Monthly Vibe", love: "Love Luck", wealth: "Wealth Luck" }, ko: { general: "이번 달의 기운", love: "연애운", wealth: "재물운" } };
            const label = labels[lang];
            contentHtml = `<div class="zodiac-detail-catchphrase" style="margin-bottom: 2rem;">📅 ${currentMonthName} ${year}</div><div class="zodiac-info-block"><div class="zodiac-info-label">🌌 ${label.general}</div><div class="zodiac-info-text">${fortune.general}</div></div><div class="zodiac-info-block"><div class="zodiac-info-label">💖 ${label.love}</div><div class="zodiac-info-text">${fortune.love}</div></div><div class="zodiac-info-block"><div class="zodiac-info-label">💰 ${label.wealth}</div><div class="zodiac-info-text">${fortune.wealth}</div></div>`;
        }
        this.modalBody.innerHTML = `<div class="zodiac-detail-header"><div class="zodiac-detail-icon">${data.icon}</div><div class="zodiac-detail-title"><h3>${content.name}</h3><div class="zodiac-detail-date">${data.date}</div></div></div>${tabsHtml}${contentHtml}`;
    },
    bindEvents() {
        this.closeBtn.addEventListener('click', () => this.closeModal());
        this.modal.addEventListener('click', (e) => { if (e.target === this.modal) { this.closeModal(); } });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && this.modal.classList.contains('active')) { this.closeModal(); } });
    },
    updateUI() {
        this.renderGrid();
        if (this.modal.classList.contains('active')) { this.updateModalContent(); }
    }
};

const ChemistryManager = {
    init() {
        this.select1 = document.getElementById('sign-1');
        this.select2 = document.getElementById('sign-2');
        this.btnCalc = document.getElementById('btn-check-chemistry');
        this.resultDiv = document.getElementById('chemistry-result');
        if (!this.select1 || !this.select2) return;
        this.populateSelects();
        this.btnCalc.addEventListener('click', () => this.calculate());
    },
    populateSelects() {
        const lang = localStorage.getItem('lang') || 'ko';
        const placeholder = lang === 'en' ? "Select Sign" : "별자리 선택";
        const val1 = this.select1.value;
        const val2 = this.select2.value;
        let optionsHtml = `<option value="" disabled selected>${placeholder}</option>`;
        Object.values(zodiacData).forEach(sign => { optionsHtml += `<option value="${sign.id}">${sign.icon} ${sign[lang].name}</option>`; });
        this.select1.innerHTML = optionsHtml;
        this.select2.innerHTML = optionsHtml;
        if (val1) this.select1.value = val1;
        if (val2) this.select2.value = val2;
    },
    calculate() {
        const sign1 = this.select1.value;
        const sign2 = this.select2.value;
        if (!sign1 || !sign2) {
            const lang = localStorage.getItem('lang') || 'ko';
            alert(lang === 'en' ? "Please select both signs!" : "두 별자리를 모두 선택해주세요!");
            return;
        }
        const lang = localStorage.getItem('lang') || 'ko';
        const s1Data = zodiacData[sign1];
        const s2Data = zodiacData[sign2];
        const el1 = zodiacElements[sign1];
        const el2 = zodiacElements[sign2];
        const key = `${el1}-${el2}`;
        const data = compatibilityData[key];
        const variance = Math.floor(Math.random() * 11) - 5; 
        const finalScore = Math.min(100, Math.max(0, data.score + variance));
        const content = data[lang];
        this.resultDiv.innerHTML = `<div class="score-display">${finalScore}%</div><h3 class="comp-title">\"${content.title}\"</h3><div class="comp-detail-box"><p class="comp-desc">${content.desc}</p><div class="comp-tip"><strong>💡 Cosmic Tip:</strong> ${content.tip}</div></div><div class="score-detail">${s1Data.icon} ${s1Data[lang].name} (${el1}) <span style="margin:0 10px">❤️</span> ${s2Data.icon} ${s2Data[lang].name} (${el2})</div>`;
        this.resultDiv.classList.remove('hidden');
        this.resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    },
    updateText() {
        this.populateSelects();
        this.resultDiv.innerHTML = ''; 
        this.resultDiv.classList.add('hidden');
    }
};

const DogFaceManager = {
    URL: "https://teachablemachine.withgoogle.com/models/1pr_o9L33/",
    model: null,
    dogData: {
        retriever: { ko: { name: "태양의 수호자 골든 리트리버", desc: "당신은 따뜻하고 긍정적인 에너지로 주변을 밝히는 '인간 태양'입니다. 친화력이 좋고 멍뭉미가 넘쳐서 어디서나 사랑받는 인기쟁이시군요!" }, en: { name: "Guardian of the Sun: Golden Retriever", desc: "You are a 'Human Sun' brightening the world with warmth and positivity. Friendly and full of puppy-like charm, you are loved everywhere!" } },
        chihuahua: { ko: { name: "작은 거인 치와와", desc: "작지만 강한 존재감! 눈치가 빠르고 야무진 당신은 은하계의 똑쟁이입니다. 내 사람에게는 애교가 넘치지만, 선을 넘는 사람에겐 참지 않죠." }, en: { name: "Little Giant: Chihuahua", desc: "Small but mighty! Sharp and smart, you are the galaxy's cleverest. Sweet to your own people, but you don't tolerate nonsense." } },
        husky: { ko: { name: "얼음 행성의 늑대 시베리안 허스키", desc: "차가운 도시의 늑대 같지만 알고 보면 엉뚱한 매력이 있는 당신! 카리스마 넘치는 외모 뒤에 숨겨진 반전 매력(허당기)이 치명적입니다." }, en: { name: "Wolf of the Ice Planet: Siberian Husky", desc: "Cool on the outside, goofy on the inside! Your fatal charm lies in the contrast between your charismatic look and your silly side." } },
        maltese: { ko: { name: "구름 위의 천사 말티즈", desc: "하얗고 소중한 솜뭉치! 사랑스러움 그 자체인 당신은 보기만 해도 힐링이 되는 존재입니다. 하지만 참지 않는 성격도 숨겨져 있죠." }, en: { name: "Angel on Clouds: Maltese", desc: "A precious ball of fluff! Pure loveliness, you are a healing presence. But you also have a sassy side that won't hold back." } },
        bulldog: { ko: { name: "지구 방위대장 불독", desc: "묵직하고 듬직한 매력! 겉모습은 강해 보이지만 속마음은 누구보다 여리고 따뜻한 '겉바속촉'의 정석입니다. 억울한 표정이 포인트!" }, en: { name: "Earth Defender: Bulldog", desc: "Solid and reliable! Tough on the outside, soft on the inside. Your slightly 'unjust' expression is your charm point." } },
        shiba: { ko: { name: "행운의 여우 시바견", desc: "볼살이 매력적인 당신! 독립적이고 마이웨이 성향이 강하지만, 한 번 마음을 주면 충성하는 츤데레 매력의 소유자입니다." }, en: { name: "Lucky Fox: Shiba Inu", desc: "Charming cheeks! Independent and doing things your way, but a loyal 'Tsundere' once you open your heart." } }
    },
    init() {
        this.uploadArea = document.getElementById('dog-upload-area');
        this.fileInput = document.getElementById('dog-image-upload');
        this.previewImg = document.getElementById('dog-preview-image');
        this.placeholder = document.getElementById('upload-placeholder');
        this.loading = document.getElementById('dog-loading');
        this.btnAnalyze = document.getElementById('btn-analyze-dog');
        this.resultDiv = document.getElementById('dog-result');
        if (!this.uploadArea) return;
        this.loadModel();
        this.uploadArea.addEventListener('click', () => this.fileInput.click());
        this.fileInput.addEventListener('change', (e) => this.handleImageUpload(e));
        this.btnAnalyze.addEventListener('click', () => this.predict());
    },
    async loadModel() {
        try {
            const modelURL = this.URL + "model.json";
            const metadataURL = this.URL + "metadata.json";
            this.model = await tmImage.load(modelURL, metadataURL);
            console.log("Model Loaded");
        } catch (e) { console.error("Model Load Failed:", e); }
    },
    handleImageUpload(e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            this.previewImg.src = e.target.result;
            this.previewImg.classList.remove('hidden');
            this.placeholder.classList.add('hidden');
            this.btnAnalyze.classList.remove('hidden');
            this.resultDiv.classList.add('hidden'); 
        };
        reader.readAsDataURL(file);
    },
    async predict() {
        if (!this.model) {
            alert("AI is still waking up... Please wait a moment. / AI가 아직 로딩 중입니다. 잠시만 기다려주세요.");
            return;
        }
        this.loading.classList.remove('hidden');
        this.previewImg.classList.add('opacity-50'); 
        this.btnAnalyze.disabled = true;
        try {
            const prediction = await this.model.predict(this.previewImg);
            prediction.sort((a, b) => b.probability - a.probability);
            const topClass = prediction[0].className.toLowerCase();
            this.showResult(topClass, prediction);
        } catch (e) {
            console.error(e);
            alert("Analysis failed. / 분석에 실패했습니다.");
        } finally {
            this.loading.classList.add('hidden');
            this.previewImg.classList.remove('opacity-50');
            this.btnAnalyze.disabled = false;
        }
    },
    showResult(className, allPredictions) {
        const lang = localStorage.getItem('lang') || 'ko';
        let key = 'retriever'; 
        if (className.includes('retriever')) key = 'retriever';
        else if (className.includes('chihuahua')) key = 'chihuahua';
        else if (className.includes('husky')) key = 'husky';
        else if (className.includes('maltese') || className.includes('bichon')) key = 'maltese';
        else if (className.includes('bulldog') || className.includes('pug')) key = 'bulldog';
        else if (className.includes('shiba') || className.includes('jindo')) key = 'shiba';
        const data = this.dogData[key];
        const content = data[lang];
        let barsHtml = '';
        allPredictions.slice(0, 3).forEach(p => { 
            const percent = (p.probability * 100).toFixed(1);
            barsHtml += `<div class="bar-label"><span>${p.className}</span><span>${percent}%</span></div><div class="bar-container"><div class="bar-fill" style="width: ${percent}%"></div></div>`;
        });
        this.resultDiv.innerHTML = `<h3 class="dog-name">${content.name}</h3><p class="dog-desc">${content.desc}</p><div class="dog-stats">${barsHtml}</div>`;
        this.resultDiv.classList.remove('hidden');
        this.resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
};

const PetTarotManager = {
    cards: [
        { id: 0, name: "The Fool", ko: "바보 (The Fool)", desc: { en: "I'm going on an adventure! Don't know where, don't care!", ko: "난 모험을 떠날 거야! 어디로 가는지는 몰라, 신경 안 써!" }, lucky: { en: "New Toy", ko: "새 장난감" }, image: "assets/images/tarot-00.jpg" },
        { id: 1, name: "The Magician", ko: "마법사 (The Magician)", desc: { en: "I can make treats appear with my mind. Watch me!", ko: "난 생각만으로 간식을 만들어낼 수 있어. 잘 봐!" }, lucky: { en: "Training Clicker", ko: "훈련용 클리커" }, image: "assets/images/tarot-01.jpg" },
        { id: 2, name: "The High Priestess", ko: "여사제 (The High Priestess)", desc: { en: "I know you're hiding snacks. My intuition is never wrong.", ko: "네가 간식 숨긴 거 다 알아. 내 직감은 틀리지 않지." }, lucky: { en: "Hidden Snack", ko: "숨겨진 간식" }, image: "assets/images/tarot-02.jpg" },
        { id: 3, name: "The Empress", ko: "여황제 (The Empress)", desc: { en: "Pamper me. I deserve the best cushion in the house.", ko: "나를 모셔라. 난 이 집에서 제일 좋은 쿠션을 가질 자격이 있어." }, lucky: { en: "Soft Blanket", ko: "부드러운 담요" }, image: "assets/images/tarot-03.jpg" },
        { id: 4, name: "The Emperor", ko: "황제 (The Emperor)", desc: { en: "I am the boss here. My territory, my rules.", ko: "여긴 내 구역이야. 내 규칙을 따르라." }, lucky: { en: "Big Bone", ko: "왕 뼈다귀" }, image: "assets/images/tarot-04.jpg" },
        { id: 5, name: "The Hierophant", ko: "교황 (The Hierophant)", desc: { en: "I follow the routine strictly. Dinner at 6 PM sharp!", ko: "난 규칙을 준수해. 저녁 6시 정각에 밥 줘!" }, lucky: { en: "Clock", ko: "시계 (칼퇴근)" }, image: "assets/images/tarot-05.jpg" },
        { id: 6, name: "The Lovers", ko: "연인 (The Lovers)", desc: { en: "I love you so much! Let's cuddle forever.", ko: "너를 너무 사랑해! 평생 껴안고 있을래." }, lucky: { en: "Hug", ko: "포옹" }, image: "assets/images/tarot-06.jpg" },
        { id: 7, name: "The Chariot", ko: "전차 (The Chariot)", desc: { en: "Zoomies! Out of my way!", ko: "우다다 타임! 다 비켜!" }, lucky: { en: "Running Shoes", ko: "러닝화" }, image: "assets/images/tarot-07.jpg" },
        { id: 8, name: "Strength", ko: "힘 (Strength)", desc: { en: "I am gentle but mighty. I can resist the urge to steal food (maybe).", ko: "난 부드럽지만 강해. 음식 훔쳐 먹고 싶은 충동을 참을 수 있어 (아마도)." }, lucky: { en: "Chew Toy", ko: "개껌" }, image: "assets/images/tarot-08.jpg" },
        { id: 9, name: "The Hermit", ko: "은둔자 (The Hermit)", desc: { en: "Leave me alone. I need my me-time in my crate.", ko: "혼자 있고 싶어. 내 집에서 사색할 시간이 필요해." }, lucky: { en: "Quiet Corner", ko: "조용한 구석" }, image: "assets/images/tarot-09.jpg" },
        { id: 10, name: "Wheel of Fortune", ko: "운명의 수레바퀴", desc: { en: "Anything can happen! Maybe a walk? Maybe a bath? (Hope not bath)", ko: "무슨 일이든 일어날 수 있어! 산책일까? 목욕일까? (목욕은 제발)" }, lucky: { en: "Random Treat", ko: "랜덤 간식" }, image: "assets/images/tarot-10.jpg" },
        { id: 11, name: "Justice", ko: "정의 (Justice)", desc: { en: "I judge fairly. Treats for all good boys and girls!", ko: "난 공정하게 판단해. 착한 강아지들에겐 간식을!" }, lucky: { en: "Balanced Meal", ko: "균형 잡힌 식사" }, image: "assets/images/tarot-11.jpg" },
        { id: 12, name: "The Hanged Man", ko: "매달린 사람 (The Hanged Man)", desc: { en: "Sometimes I just chill upside down. Perspective is everything.", ko: "가끔은 그냥 거꾸로 매달려 쉬는 게 좋아. 관점이 중요하거든." }, lucky: { en: "Comfy Hammock", ko: "편안한 해먹" }, image: "assets/images/tarot-12.jpg" },
        { id: 13, name: "Death", ko: "죽음 (Death)", desc: { en: "Don't be scared! It's just a new beginning. Maybe a new flavor of food?", ko: "무서워 마! 새로운 시작일 뿐이야. 혹시 새로운 맛 간식?" }, lucky: { en: "New Food Bag", ko: "새 사료 봉투" }, image: "assets/images/tarot-13.jpg" },
        { id: 14, name: "Temperance", ko: "절제 (Temperance)", desc: { en: "I am perfectly balanced. Not too much zoomies, not too little naps.", ko: "난 완벽하게 균형 잡혀 있어. 과한 우다다도, 부족한 낮잠도 없어." }, lucky: { en: "Calm Environment", ko: "평온한 환경" }, image: "assets/images/tarot-14.jpg" },
        { id: 15, name: "The Devil", ko: "악마 (The Devil)", desc: { en: "Those forbidden treats... they call to me! I must resist!", ko: "저 금지된 간식들... 날 유혹해! 저항해야 해!" }, lucky: { en: "Willpower", ko: "강한 의지" }, image: "assets/images/tarot-15.jpg" },
        { id: 16, name: "The Tower", ko: "탑 (The Tower)", desc: { en: "Oh no! The cat pushed over my toy tower! Time for a new one?", ko: "이런! 고양이가 내 장난감 탑을 밀쳤어! 새 거 살 시간?" }, lucky: { en: "Durable Toy", ko: "튼튼한 장난감" }, image: "assets/images/tarot-16.jpg" },
        { id: 17, name: "The Star", ko: "별 (The Star)", desc: { en: "Wishing upon a star for endless belly rubs and treats!", ko: "끝없는 배 만져주기와 간식을 위해 별에 소원을 빌어!" }, lucky: { en: "Lucky Charm", ko: "행운의 부적" }, image: "assets/images/tarot-17.jpg" },
        { id: 18, name: "The Moon", ko: "달 (The Moon)", desc: { en: "Mysteries lurk in the shadows... Is that a treat monster under the bed?", ko: "그림자 속에 미스터리가 숨어 있어... 침대 밑에 간식 괴물인가?" }, lucky: { en: "Night Light", ko: "수면등" }, image: "assets/images/tarot-18.jpg" },
        {
            id: 19,
            name: "The Sun",
            ko: "태양 (The Sun)",
            desc: {
              en: "It's a beautiful day for zoomies and sunbathing!",
              ko: "우다다와 일광욕하기에 정말 아름다운 날이야!"
            },
            lucky: {
              en: "Sunny Spot",
              ko: "햇볕 드는 자리"
            },
            image: "assets/images/tarot-19.jpg"
          },
          
        { id: 20, name: "Judgement", ko: "심판 (Judgement)", desc: { en: "Have I been a good boy/girl? I think so! Time for rewards!", ko: "난 착한 강아지였을까? 물론이지! 보상받을 시간이야!" }, lucky: { en: "Praise & Hugs", ko: "칭찬과 포옹" }, image: "assets/images/tarot-20.jpg" },
        { id: 21, name: "The World", ko: "세계 (The World)", desc: { en: "I've explored every corner of the house! What's next?", ko: "집안 모든 구석을 탐험했어! 다음은 어디지?" }, lucky: { en: "New Adventure", ko: "새로운 모험" }, image: "assets/images/tarot-21.jpg" }
    ],
    init() {
        this.card = document.getElementById('tarot-card');
        this.btnDraw = document.getElementById('btn-draw-tarot');
        this.resultBox = document.getElementById('tarot-result');
        this.imagePlaceholder = document.getElementById('tarot-image');
        this.cardName = document.getElementById('tarot-card-name');
        this.resultTitle = document.getElementById('tarot-result-title');
        this.resultDesc = document.getElementById('tarot-result-desc');
        this.luckyLabel = document.getElementById('tarot-lucky-label');
        this.luckyValue = document.getElementById('tarot-lucky-value');
        this.shareBtn = document.getElementById('btn-share-tarot');
        this.copyBtn = document.getElementById('btn-share-copy');
        this.shareImage = document.getElementById('btn-share-image');
        this.shareReddit = document.getElementById('btn-share-reddit');

        if(this.btnDraw) {
            this.btnDraw.addEventListener('click', () => this.drawCard());
        }
        if (this.shareBtn) {
            this.shareBtn.addEventListener('click', () => this.shareResult());
        }
        if (this.copyBtn) {
            this.copyBtn.addEventListener('click', () => this.copyResult());
        }
        if (this.shareImage) {
            this.shareImage.addEventListener('click', () => this.shareImageResult());
        }
        if (this.shareReddit) {
            this.shareReddit.addEventListener('click', () => this.shareTo('reddit'));
        }
    },
    drawCard() {
        if(this.card.classList.contains('flipped')) return;
        
        // Animation
        this.card.classList.add('flipped');
        this.btnDraw.disabled = true;
        this.btnDraw.textContent = "...";

        const randomCard = this.cards[Math.floor(Math.random() * this.cards.length)]; // randomCard를 setTimeout 밖으로 이동
        this.imagePlaceholder.src = randomCard.image; // 이미지를 카드가 뒤집히는 즉시 로드

        setTimeout(() => {
            const lang = localStorage.getItem('lang') || 'ko';
            
            this.cardName.textContent = lang === 'en' ? randomCard.name : randomCard.ko;
            
            this.resultDesc.textContent = randomCard.desc[lang];
            this.luckyValue.textContent = randomCard.lucky[lang];
            
            this.resultBox.classList.remove('hidden');
            this.btnDraw.textContent = lang === 'en' ? "Draw Again" : "다시 뽑기";
            this.btnDraw.disabled = false;
            
            // Allow reset
            this.btnDraw.onclick = () => this.resetCard();
        }, 600);
    },
    resetCard() {
        this.card.classList.remove('flipped');
        this.resultBox.classList.add('hidden');
        this.btnDraw.onclick = () => this.drawCard();
        const lang = localStorage.getItem('lang') || 'ko';
        this.btnDraw.textContent = lang === 'en' ? "Draw a Card" : "카드 뽑기";
    }
    ,
    shareResult() {
        const lang = localStorage.getItem('lang') || 'ko';
        const cardTitle = this.cardName.textContent || (lang === 'en' ? "Pet Tarot" : "펫 타로");
        const message = this.resultDesc.textContent || "";
        const lucky = `${this.luckyLabel.textContent} ${this.luckyValue.textContent}`;
        const text = `${cardTitle}\\n${message}\\n${lucky}`.trim();
        const url = window.location.href;
        if (navigator.share) {
            navigator.share({ title: cardTitle, text, url }).catch(() => {});
            return;
        }
        this.copyResult(true);
    },
    copyResult(includeUrl = false) {
        const lang = localStorage.getItem('lang') || 'ko';
        const cardTitle = this.cardName.textContent || (lang === 'en' ? "Pet Tarot" : "펫 타로");
        const message = this.resultDesc.textContent || "";
        const lucky = `${this.luckyLabel.textContent} ${this.luckyValue.textContent}`;
        const url = window.location.href;
        const text = includeUrl
            ? `${cardTitle}\\n${message}\\n${lucky}\\n${url}`.trim()
            : `${cardTitle}\\n${message}\\n${lucky}`.trim();
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text).then(() => {
                alert(lang === 'en' ? "Copied to clipboard!" : "클립보드에 복사했어요!");
            }).catch(() => {
                alert(lang === 'en' ? "Copy failed." : "복사에 실패했어요.");
            });
        } else {
            alert(lang === 'en' ? "Copy not supported here." : "이 브라우저에서는 복사를 지원하지 않아요.");
        }
    },
    shareTo(platform) {
        const lang = localStorage.getItem('lang') || 'ko';
        const cardTitle = this.cardName.textContent || (lang === 'en' ? "Pet Tarot" : "펫 타로");
        const message = this.resultDesc.textContent || "";
        const lucky = `${this.luckyLabel.textContent} ${this.luckyValue.textContent}`;
        const url = window.location.href;
        const text = `${cardTitle} - ${message} (${lucky})`;
        if (platform === 'reddit') {
            const shareUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`;
            window.open(shareUrl, '_blank', 'noopener,noreferrer');
            return;
        }
    }
    ,
    async shareImageResult() {
        const lang = localStorage.getItem('lang') || 'ko';
        const cardTitle = this.cardName.textContent || (lang === 'en' ? "Pet Tarot" : "펫 타로");
        if (!this.imagePlaceholder || !this.imagePlaceholder.src) {
            alert(lang === 'en' ? 'Draw a card first.' : '먼저 카드를 뽑아주세요.');
            return;
        }
        try {
            const { blob } = await this.renderShareImage();
            const file = new File([blob], 'pet-tarot.png', { type: 'image/png' });
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({ files: [file], title: cardTitle });
                return;
            }
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'pet-tarot.png';
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        } catch (e) {
            console.error(e);
            alert(lang === 'en' ? 'Image export failed.' : '이미지 저장에 실패했어요.');
        }
    },
    renderShareImage() {
        const lang = localStorage.getItem('lang') || 'ko';
        const cardTitle = this.cardName.textContent || (lang === 'en' ? "Pet Tarot" : "펫 타로");
        const message = this.resultDesc.textContent || "";
        const lucky = `${this.luckyLabel.textContent} ${this.luckyValue.textContent}`;
        const imgSrc = this.imagePlaceholder.src;

        return new Promise((resolve, reject) => {
            const canvas = document.createElement('canvas');
            const size = 1080;
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');

            const grad = ctx.createLinearGradient(0, 0, size, size);
            grad.addColorStop(0, '#0b1020');
            grad.addColorStop(1, '#2b0f3a');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, size, size);

            ctx.fillStyle = 'rgba(255,255,255,0.08)';
            ctx.fillRect(60, 60, size - 120, size - 120);

            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => {
                const imgSize = 520;
                ctx.drawImage(img, (size - imgSize) / 2, 140, imgSize, imgSize);

                ctx.fillStyle = '#fff';
                ctx.font = 'bold 48px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(cardTitle, size / 2, 80);

                ctx.font = '28px sans-serif';
                wrapText(ctx, message, size / 2, 720, 840, 38);

                ctx.font = 'bold 30px sans-serif';
                ctx.fillStyle = '#a78bfa';
                ctx.fillText(lucky, size / 2, 980);

                canvas.toBlob((blob) => {
                    if (!blob) return reject(new Error('No blob'));
                    resolve({ blob });
                }, 'image/png');
            };
            img.onerror = reject;
            img.src = imgSrc;
        });
    }
};

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && i > 0) {
            ctx.fillText(line.trim(), x, y);
            line = words[i] + ' ';
            y += lineHeight;
        } else {
            line = testLine;
        }
    }
    if (line.trim()) ctx.fillText(line.trim(), x, y);
}

const BlackHoleManager = {
    init() {
        this.btnThrow = document.getElementById('btn-throw-worry');
        this.input = document.getElementById('worry-input');
        this.blackhole = document.querySelector('.blackhole');
        this.toast = document.getElementById('toast');
        
        if(this.btnThrow) {
            this.btnThrow.addEventListener('click', () => this.throwWorry());
        }
    },
    showToast(message) {
        if (!this.toast) return;
        this.toast.textContent = message;
        this.toast.classList.remove('hidden');
        this.toast.classList.add('show');
        clearTimeout(this.toastTimer);
        this.toastTimer = setTimeout(() => {
            this.toast.classList.remove('show');
            this.toast.classList.add('hidden');
        }, 2200);
    },
    throwWorry() {
        const text = this.input.value;
        if(!text.trim()) return;

        // Create a floating text element
        const floater = document.createElement('div');
        floater.textContent = text;
        floater.style.position = 'absolute';
        floater.style.left = '50%';
        floater.style.top = '50%';
        floater.style.transform = 'translate(-50%, -50%)';
        floater.style.color = '#fff';
        floater.style.transition = 'all 1s ease-in';
        floater.style.pointerEvents = 'none';
        
        document.querySelector('.blackhole-container').appendChild(floater);
        
        // Animate into blackhole
        requestAnimationFrame(() => {
            floater.style.transform = 'translate(-50%, -50%) scale(0.1) rotate(720deg)';
            floater.style.opacity = '0';
        });

        // Clear input
        this.input.value = '';
        
        setTimeout(() => {
            floater.remove();
            const lang = localStorage.getItem('lang') || 'ko';
            const msg = lang === 'en'
                ? "Your worry is safely drifting away. Good things are on their way."
                : "고민은 우주로 흘러갔어요. 좋은 일들이 찾아올 거예요.";
            this.showToast(msg);
        }, 1000);
    }
};

window.updateBlogText = function(lang) {
    const t = translations[lang];
    if (!t) return;
    const blogPageTitle = document.getElementById('blog-page-title');
    if (blogPageTitle) blogPageTitle.textContent = t.blogPageTitle;
    const blogPageDescription = document.getElementById('blog-page-description');
    if (blogPageDescription) blogPageDescription.content = t.blogPageDescription;
    const navHome = document.getElementById('nav-home');
    if (navHome) navHome.textContent = t.navHome;
    const navFortuneBlog = document.getElementById('nav-fortune');
    if (navFortuneBlog) navFortuneBlog.textContent = t.navDailyFortune;
    const navInsight = document.getElementById('nav-insight');
    if (navInsight) navInsight.textContent = t.navInsight;
    const navPsychology = document.getElementById('nav-psychology');
    if (navPsychology) navPsychology.textContent = t.navPsychology;
    const navAncient = document.getElementById('nav-ancient');
    if (navAncient) navAncient.textContent = t.navAncient;
    const blogHeaderTitle = document.getElementById('blog-header-title');
    if (blogHeaderTitle) blogHeaderTitle.textContent = t.blogHeaderTitle;
    const blogHeaderSubtitle = document.getElementById('blog-header-subtitle');
    if (blogHeaderSubtitle) blogHeaderSubtitle.textContent = t.blogHeaderSubtitle;
    const sectionInsight = document.getElementById('section-title-insight');
    if (sectionInsight) sectionInsight.textContent = t.sectionInsight;
    const sectionPsychology = document.getElementById('section-title-psychology');
    if (sectionPsychology) sectionPsychology.textContent = t.sectionPsychology;
    const sectionAncient = document.getElementById('section-title-ancient');
    if (sectionAncient) sectionAncient.textContent = t.sectionAncient;
    const updateArticle = (prefix, data) => {
        if (!data) return;
        const titleEl = document.getElementById(`${prefix}-title`);
        const metaEl = document.getElementById(`${prefix}-meta`);
        const contentEl = document.getElementById(`${prefix}-content`);
        if (titleEl) titleEl.innerHTML = data.title;
        if (metaEl) metaEl.textContent = data.meta;
        if (contentEl) {
            let html = '';
            if (data.p1) html += `<p>${data.p1}</p>`;
            if (data.h3_1) html += `<h3 id="${prefix}-h3-1">${data.h3_1}</h3>`;
            if (data.p2) html += `<p>${data.p2}</p>`;
            if (data.h3_2) html += `<h3 id="${prefix}-h3-2">${data.h3_2}</h3>`;
            if (data.p3) html += `<p>${data.p3}</p>`;
            if (data.h3_3) html += `<h3 id="${prefix}-h3-3">${data.h3_3}</h3>`;
            if (data.p4) html += `<p>${data.p4}</p>`;
            if (data.h3_4) html += `<h3 id="${prefix}-h3-4">${data.h3_4}</h3>`;
            if (data.p5) html += `<p>${data.p5}</p>`;
            if (data.linkText && data.linkUrl) {
                html += `<div style="margin-top: 15px;"><a href="${data.linkUrl}" style="color: var(--neon-blue); text-decoration: none; font-weight: bold; font-size: 1.1rem;">${data.linkText}</a></div>`;
            }
            contentEl.innerHTML = html;
        }
    };
    updateArticle('article1', t.article1);
    updateArticle('article2', t.article2);
    updateArticle('article3', t.article3);
    updateArticle('article4', t.article4);
    updateArticle('article5', t.article5);
    updateArticle('article6', t.article6);
    updateArticle('article7', t.article7);
    updateArticle('article8', t.article8);
    updateArticle('article9', t.article9);
    const backHomeLink = document.getElementById('back-home-link');
    if (backHomeLink) backHomeLink.textContent = t.backHomeLink;
}

window.updateGlobalText = function(lang) {
    document.documentElement.lang = lang;
    const t = translations[lang];
    const contactTitle = document.getElementById('contact-title');
    if (contactTitle) contactTitle.textContent = t.contactTitle;
    const labelName = document.getElementById('label-name');
    if (labelName) labelName.textContent = t.labelName;
    const labelEmail = document.getElementById('label-email');
    if (labelEmail) labelEmail.textContent = t.labelEmail;
    const labelMessage = document.getElementById('label-message');
    if (labelMessage) labelMessage.textContent = t.labelMessage;
    const btnSend = document.getElementById('form-submit-btn');
    if (btnSend) btnSend.textContent = t.btnSendSignal;
    const inst = document.getElementById('form-instructions-text');
    if (inst) inst.textContent = t.formInstructions;
    const disqusTitle = document.getElementById('disqus-title');
    if (disqusTitle) disqusTitle.textContent = t.disqusTitle;
    const footerPrivacy = document.getElementById('footer-privacy');
    const footerTerms = document.getElementById('footer-terms');
    const footerGeo = document.getElementById('footer-geo');
    if (footerPrivacy) footerPrivacy.textContent = t.footerPrivacy;
    if (footerTerms) footerTerms.textContent = t.footerTerms;
    if (footerGeo) footerGeo.textContent = t.footerGeo;
    const navDailyFortune = document.getElementById('nav-fortune');
    const navZodiac = document.getElementById('nav-zodiac');
    const navChemistry = document.getElementById('nav-chemistry');
    const navPetTarot = document.getElementById('nav-pet-tarot');
    const navBlog = document.getElementById('nav-blog');
    if (navDailyFortune) navDailyFortune.textContent = t.navDailyFortune;
    if (navZodiac) navZodiac.textContent = t.navZodiac;
    if (navChemistry) navChemistry.textContent = t.navChemistry;
    if (navPetTarot) navPetTarot.textContent = t.navPetTarot;
    if (navBlog) navBlog.textContent = t.navBlog;
    const homeCtaText = document.getElementById('home-cta-text');
    const homeCtaPet = document.getElementById('home-cta-pet');
    if (homeCtaText) homeCtaText.textContent = t.homeCtaText;
    if (homeCtaPet) homeCtaPet.textContent = t.homeCtaPet;
    const h1t = document.getElementById('home-wisdom-1-title');
    const h1d = document.getElementById('home-wisdom-1-desc');
    const h2t = document.getElementById('home-wisdom-2-title');
    const h2d = document.getElementById('home-wisdom-2-desc');
    const h3t = document.getElementById('home-wisdom-3-title');
    const h3d = document.getElementById('home-wisdom-3-desc');
    const btnReadMore = document.getElementById('btn-read-more');
    if (h1t) h1t.textContent = t.homeWisdom1Title;
    if (h1d) h1d.textContent = t.homeWisdom1Desc;
    if (h2t) h2t.textContent = t.homeWisdom2Title;
    if (h2d) h2d.textContent = t.homeWisdom2Desc;
    if (h3t) h3t.textContent = t.homeWisdom3Title;
    if (h3d) h3d.textContent = t.homeWisdom3Desc;
    if (btnReadMore) btnReadMore.textContent = t.readMore;
    const zodiacTitles = { en: { title: "Cosmic Constellations", subtitle: "Discover the secrets of the stars" }, ko: { title: "우주의 별자리", subtitle: "당신의 별이 속삭이는 비밀을 들어보세요" } };
    const zTitle = document.getElementById('zodiac-title');
    const zSubtitle = document.getElementById('zodiac-subtitle');
    if (zTitle) zTitle.textContent = zodiacTitles[lang].title;
    if (zSubtitle) zSubtitle.textContent = zodiacTitles[lang].subtitle;
    const chemTitles = { en: { title: "Cosmic Chemistry", subtitle: "Do your stars align?", me: "Me", partner: "Partner", btn: "Calculate Compatibility" }, ko: { title: "우주 궁합", subtitle: "우리의 별들은 얼마나 잘 맞을까요?", me: "나", partner: "상대방", btn: "궁합 확인하기" } };
    const cTitle = document.getElementById('chemistry-title');
    const cSubtitle = document.getElementById('chemistry-subtitle');
    const lSign1 = document.getElementById('label-sign-1');
    const lSign2 = document.getElementById('label-sign-2');
    const btnCalc = document.getElementById('btn-check-chemistry');
    if (cTitle) cTitle.textContent = chemTitles[lang].title;
    if (cSubtitle) cSubtitle.textContent = chemTitles[lang].subtitle;
    if (lSign1) lSign1.textContent = chemTitles[lang].me;
    if (lSign2) lSign2.textContent = chemTitles[lang].partner;
    if (btnCalc) btnCalc.textContent = chemTitles[lang].btn;
    
    // Pet Tarot Update
    const ptTitle = document.getElementById('pet-tarot-title');
    const ptSubtitle = document.getElementById('pet-tarot-subtitle');
    const ptBtn = document.getElementById('btn-draw-tarot');
    const ptShareBtn = document.getElementById('btn-share-tarot');
    const ptCopyBtn = document.getElementById('btn-share-copy');
    const ptShareImage = document.getElementById('btn-share-image');
    const ptShareCopy = document.getElementById('btn-share-copy');
    const ptShareReddit = document.getElementById('btn-share-reddit');
    const ptLuckyLabel = document.getElementById('tarot-lucky-label');
    if (ptTitle) ptTitle.textContent = t.petTarotTitle;
    if (ptSubtitle) ptSubtitle.textContent = t.petTarotSubtitle;
    if (ptBtn) ptBtn.textContent = t.btnDrawTarot;
    if (ptShareBtn) ptShareBtn.textContent = t.btnShareTarot;
    if (ptCopyBtn) ptCopyBtn.textContent = t.btnShareCopy;
    if (ptShareReddit) ptShareReddit.textContent = t.btnShareReddit;
    if (ptShareImage) ptShareImage.textContent = t.btnShareImage;
    if (ptShareCopy) ptShareCopy.textContent = t.btnShareCopy;
    if (ptLuckyLabel) ptLuckyLabel.textContent = t.tarotLuckyLabel;

    // Black Hole Update
    const bhTitle = document.querySelector('#section-blackhole h2');
    const bhInput = document.getElementById('worry-input');
    const bhBtn = document.getElementById('btn-throw-worry');
    if (bhTitle) bhTitle.textContent = t.blackHoleTitle;
    if (bhInput) bhInput.placeholder = t.worryPlaceholder;
    if (bhBtn) bhBtn.textContent = t.btnThrowWorry;

    if (document.getElementById('zodiac-grid')) { ZodiacManager.updateUI(); }
    if (document.getElementById('sign-1')) { ChemistryManager.updateText(); }
    updateBlogText(lang);
}

window.showSection = function(sectionId) {
    // Hide all content sections
    document.querySelectorAll('#main-content .content-section').forEach(el => {
        el.classList.add('hidden');
    });
    
    // Show the target section
    const target = document.getElementById('section-' + sectionId);
    if (target) {
        target.classList.remove('hidden');
    }
    
    // Ensure main-content is visible as well
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        mainContent.classList.remove('hidden');
    }

    // Scroll smoothly to the section
    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};

window.updateQuote = function(lang) {
    const list = quotes[lang] || quotes['en'];
    const quoteElement = document.getElementById('quote-of-the-day');
    if (quoteElement) {
        const randomQuote = list[Math.floor(Math.random() * list.length)];
        quoteElement.textContent = randomQuote;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    migrateLocalState();
    const lang = localStorage.getItem('lang') || 'ko';
    ZodiacManager.init();
    ChemistryManager.init();
    PetTarotManager.init();
    BlackHoleManager.init();
    updateGlobalText(lang);
    updateQuote(lang);
    
    // Initialize View (Default to Fortune)
    window.showSection('fortune');

    const globalThemeToggle = document.getElementById('theme-toggle');
    const globalLangBtn = document.getElementById('lang-btn');
    const resetDisqus = (langOverride) => {
        if (typeof DISQUS === 'undefined') return;
        const lang = langOverride || (localStorage.getItem('lang') || 'ko');
        setTimeout(() => {
            DISQUS.reset({
                reload: true,
                config: function () {
                    this.page.url = window.location.href;
                    this.page.identifier = 'cosmic-fortune-page';
                    this.language = lang === 'en' ? 'en' : 'ko';
                }
            });
        }, 200);
    };

    if (globalThemeToggle) {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.body.dataset.theme = savedTheme;
        globalThemeToggle.checked = savedTheme === 'dark'; 
        globalThemeToggle.addEventListener('change', () => {
            const newTheme = globalThemeToggle.checked ? 'dark' : 'light';
            document.body.dataset.theme = newTheme;
            localStorage.setItem('theme', newTheme);
            resetDisqus();
        });
    }
    if (globalLangBtn) {
        globalLangBtn.textContent = lang === 'en' ? '한국어' : 'English';
        globalLangBtn.addEventListener('click', () => {
            const currentLang = localStorage.getItem('lang') || 'ko';
            const newLang = currentLang === 'en' ? 'ko' : 'en';
            localStorage.setItem('lang', newLang);
            globalLangBtn.textContent = newLang === 'en' ? '한국어' : 'English';
            updateGlobalText(newLang);
            updateQuote(newLang);
            resetDisqus(newLang);
        });
    }
});
