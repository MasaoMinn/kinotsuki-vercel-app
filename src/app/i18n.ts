// i18n.ts
"use client";
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'zh', 'jp'],
    debug: false,
    detection: {
      order: ['cookie', 'navigator'],
      caches: ['cookie'],
    },
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          intro: {
            iam: "I'm ",
            name: "Sunny_Tangetsu",
            college: "By now a college junior from SCUT, major in software engineering.",
            cpp: "I fell in love with C++ programming in high school, that's why I chose this major.",
            react: "I'm studying React.js (Next.js) full-stack framework, this page is my first React product.",
            language: "I'm studying English for TOEFL and Japanese for JLPT N2. I watch Family Guy and Big Bang to improve my English accumulation.",
            japan: "I'm planning to take further education in Tokyo, Japan, where I took a trip and it was amazing.",
            hobby: "In my free time, I write minigames or useful tools on WEB. I enjoy the sense of achievement after completing a small project.",
            pokemon: "I like Pokemons. The monster on the left is an abstract kemono-styled blue fox which I regard as a virtual figure of mine.",
            motto: "My motto: Be motivated without pressure, stay tense without anxiety, and act quickly without confusion ,"
          },
          lang: 'Language',
          toast: {
            like_title: 'Thank You For Your Like !',
            like_message: 'Please do not click it too many times.',
            dislike_title: 'I`m So Sad QAQ',
            dislike_message: 'Please let me know if you have any suggestions.',
          },
          error: {
            cookie_title: 'Cookie Access Error',
            cookie_message: 'Please allow cookie access to vote.',
            vote_limit_title: 'Vote Limit',
            vote_limit_message: 'You can only vote once every 24 hours.',
            request_failed_title: 'Request Failed',
            request_failed_message: 'Network or server error, please try again later.',
          },
          mainpage: {
            title: 'Sunny_Tangetsu - Portfolio',
            dropdown: 'More',
            about: 'About',
            seeme: 'See me on Github',
            theme: 'Theme',
            minigame: {
              title: 'Minigame',
              description: 'H5 games written in JS .',
              bwite: 'Black-White Iteration',
              color: 'My Sense Of Color Is Amazing',
              light: 'Light On The Lights(Two-player Battle)',
            },
            tools: {
              title: 'Tools',
              description: 'Useful tools',
              tobe: 'Stay Tuned',
              furry: 'Contact Me'
            },
            bubbles: {
              furry: 'Furry',
              cpp: 'C++',
              react: 'React.js',
              pingpong: 'Table Tennis',
              mbti: 'INTP',

            },
            oi: {
              label: 'OI-ACM',
              title: 'My OI-ACM Career (2020/9-2025/9)',
              timeline: [
                "2020/9 Started learning Informatics Olympiad for NOIP(National Olympiad in Informatics in Provinces)",
                "2021/5 Won the 2nd place in Anshun Informatics Competition",
                "2021/8/21 Registered on Luogu",
                "2021/11/20 NOIP2021 Provincial Second Prize(The highest prize I got during my high school)",
                "2022/2/7 Solved 100 problems!",
                "2022/5 Won the1st place in Anshun Informatics Competition",
                "2022/6/1 Solved first blue problem! P1972 [SDOI2009] HH's Necklace",
                "2022/8/2 Solved 200 problems!",
                "2022/11 Ended high school OI journey with NOIP2022 WA0 (forgot to initialize array)",
                "2023/7 Admitted to SCUT, preparing for ACM competitions",
                "2023/10/11 Solved 300 problems! The 300th problem :",
                "2024/4/6 Participated in GDUT ACM contest, solved only one problem",
                "2024/4/7 Solved first purple problem! (CDQ divide and conquer ,an amazing algorithm)",
                "2024/4/13 Blue Bridge Cup Guangdong Provincial First Prize",
                "2024/4/14 School team contest, solved two problems, ranked 31/50",
                "2024/4/15~5/31 Slacking off",
                "2024/6/2 Blue Bridge Cup National Excellent Award",
                "2024/6/4 Unlocked Java language",
                "2024/6/4 Solved 400 problems!",
                "2024/6/5~8/5 Slacking off again",
                "2024/9/8 CCPC Online, solved 3 problems, last place in school",
                "2024/9/21 ICPC Online Prelim, solved 5 problems, still not ideal ranking",
                "2024/11/3, 11/10 School freshman contest, mediocre performance",
                "2025/1/11~1/18 Winter training",
                "2025/3/20 Time to work hard for ACM contests !",
                "2025/7/14~8/19 Nowcoder Summer training ,in school",
                "2025/7/24~8/2 Attended 'Code Sourse' Summer Camp in Guiyang ,met the one of the goats in algorithm competetion--Jiangly ,Du Yuhao and Shi Hanyuan.Their remarkable talent really impressed me",
                "2025/9/7 ICPC Online Contest ,solved 3 problems",
                "2025/9/14 ICPC Online Contest II ,solved 1 problem",
                "2025/9/20 CCPC Online Contest ,solved 3 problems.Finally ,I failed to get a good rank to participate in the next competitions.My Algorithm Competition career comes to an end.",
              ]
            },
            developper: {
              label: 'Developper',
              title: "My Growth As A Developper (2023/9~now)",
              timeline: [
                "2023/9 I entered SCUT, major in software engineering.",
                "2024/3~2024/5 I developped a game called 'My Sense of Color is Amazing' in C++,EasyX. That was before AI became widespread thus I coded all by myself. Repository :",
                "2024/10 Started to study HTML,CSS and JavaScript",
                "2024/12/1 Depolyed my first website on Github Pages ,it's a simple static website in pure HTML,CSS and JavaScript.",
                "2025/1/1 Started to study TypeScript,Bootstrap,TailwindCSS,HTTP,Ajax and used them to refine my website",
                "2025/3 Started to study React.js (Next.js) full-stack framework.",
                "2025/4/14 Reconstructed my first website using React.js (Next.js).",
                "2025/5~2025/6 Software Development Training. I participated in the development of a Mail System as a front-end developer.This project uses Next.js,TypeScript for its front-end and Springboot,MySQL for its back-end. I really learned a lot about group collaboration and solving problems. Repository :",
                "2025/7~now Started to study back-end development with Next.js,Prisma,PostgreSQL,Redis.",
              ]
            },
            language: {
              label: 'Language',
              title: "Fun facts Abouts my Foreign Languages Learning (2013/9~now)",
              timeline: [
                "2013/9 My third grade in primary school, started to learn English.But during the first two years ,my English was a disaster.I often fail English words dictation.",
                "2015 The first semester of my fifth grade.School English word dictation contest, I and my 3 teammates got the 1st place.It was a team competition,Each team has 6 members.When there were only 2 teams left,my team had 4 members but another team had 6 menbers.However ,their team members were eliminated one after another, but our team held on until the end.",
                "2016 The second semester of fifth grade.Endlish Stort Telling Contest.I recited a story about the Three Pigs.It was a big challenge for me to recite a story containing past tense expressions that I had never seen before.Finally, I got the third prize.",
                "2016 The first semester of sixth grade.English Sons Singing Contest.I sang 'Lemon Tree' and got the second prize.",
                "2019 English Song Singing Contest ,again.And I sang 'Lemon Tree' again.This time ,I won the first prize",
                "2020 Studied a little Japanese.Recited kana orders and some basic words.",
                "Neither my English nor my Japanese were significantly improved during 2020 to 2023/10",
                "2023/10 Started to study Japanese systematically.",
                "2024/7 Finished JLPT N3 with a score of 104.Head for JLPT N1.",
                "2024/12 Failed JLPT N1 with a score of 54.Damn so hard ,I couldn't recognize most of the words.And I only got 9 points in the listening test.",
                "2025/7->now Finished JLPT N2 with a score of 106.Now head for JLPT N1.",
              ]
            }
          },
          furry: {
            intro: "Hello! This is Kino Tsuki, a blue furry fox, living in Guangzhou China.I'm excited to connect with you here! Feel free to reach out to add me as a friend. Looking forward to chatting and sharing our furry interests!"
          }

        },
      },
      zh: {
        translation: {
          intro: {
            iam: "我是 ",
            name: "Sunny_湛月",
            college: "目前是华南理工大学软件工程专业的大二学生。",
            cpp: "高中时爱上了C++编程，这也是我选择这个专业的原因。",
            react: "正在学习React.js（Next.js）全栈框架，这个页面是我的第一个React作品。",
            language: "正在为托福学习英语，为JLPT N2学习日语。通过看Family Guy和Big Bang提升英语积累。",
            japan: "计划去日本东京深造，之前去过一次，感觉非常棒。",
            hobby: "空闲时间会在网页上写小游戏或实用工具，完成小项目后很有成就感。",
            pokemon: "喜欢宝可梦。左边的怪兽是一个抽象的兽设蓝狐，是我虚拟形象的代表。",
            motto: "我的座右铭：有动力而无压力，紧张而不焦虑，迅速而不慌乱。"
          },
          lang: '语言',
          toast: {
            like_title: '感谢您的点赞 !',
            like_message: '请不要重复点击点赞按钮。',
            dislike_title: '我很抱歉',
            dislike_message: '请让我知道您有什么建议。',
          },
          mainpage: {
            title: 'Sunny_湛月 - 个人网站',
            dropdown: '更多',
            about: '关于',
            seeme: '我的 Github',
            theme: '主题',
            minigame: {
              title: '小游戏',
              description: '这里是我写的一些H5小游戏。',
              bwite: '黑白迭代',
              color: '我色感贼6',
              light: '点灯新世界(双人游戏)'
            },
            tools: {
              title: '工具',
              description: '这里是我写的一些工具。',
              tobe: '敬请期待',
              furry: 'LXFS'
            },
            bubbles: {
              furry: '福瑞控',
              cpp: 'C++',
              react: 'React.js',
              pingpong: '乒乓球',
              mbti: 'INTP',
            },
            oi: {
              label: 'OI-ACM',
              title: "OI-ACM生涯 (2020/9-2025/9)",
              timeline: [
                "2020/9 开始学习信息学奥赛，目标NOIP",
                "2021/5 安顺市信息学强基竞赛全市第二名",
                "2021/8/21 注册洛谷账号",
                "2021/11/20 NOIP2021省级二等奖（高中阶段我得到的最高奖项了）",
                "2022/2/7 通过100道题！",
                "2022/5 安顺市信息学强基竞赛全市第一名",
                "2022/6/1 通过第一道蓝色题！",
                "2022/8/2 通过200道题！",
                "2022/11 高中OI生涯以NOIP2022 WA0遗憾告终（数组未初始化）",
                "2023/7 考入华南理工大学，准备参加ACM竞赛",
                "2023/10/11 通过300道题！第300题：",
                "2024/4/6 参加广东工业大学ACM校赛，只过了一题",
                "2024/4/7 通过第一道紫色题！（CDQ分治，很厉害的算法）",
                "2024/4/13 蓝桥杯广东省一等奖",
                "2024/4/14 校队赛，过了两题，排名31/50",
                "2024/4/15~5/31 摆烂阶段",
                "2024/6/2 蓝桥杯国赛优秀奖（大学阶段我得到的最高的奖项了）",
                "2024/6/4 解锁Java语言",
                "2024/6/4 通过400道题！",
                "2024/6/5~8/5 再次摆烂",
                "2024/9/8 CCPC网络赛，过了3题，校内排名末位",
                "2024/9/21 ICPC网络预选赛，过了5题，排名仍不理想",
                "2024/11/3, 11/10 新生赛，表现一般",
                "2025/1/11~1/18 寒假集训",
                "2025/3/20 决定冲刺ACM竞赛！",
                "2025/7/14~8/19 牛客暑期训练营，校内参与",
                "2025/7/24~8/2 参加Code Sourse夏令营，见到了算法竞赛大神蒋凌宇、杜瑜皓、施韩原，他们的才华横溢令人敬佩",
                "2025/9/7 ICPC网络赛，过了3题",
                "2025/9/14 ICPC网络赛II，过了1题",
                "2025/9/20 CCPC网络赛，过了3题。最终未能获得晋级资格，算法竞赛生涯宣告结束。"
              ]
            },
            developper: {
              label: '开发学习',
              title: "我的开发者成长之路 (2023/9~至今)",
              timeline: [
                "2023/9 我进入华南理工大学，主修软件工程。",
                "2024/3~2024/5 我用 C++、EasyX 开发了一款叫做《我的色感超强》的游戏。那时 AI 还没有普及，所以完全由我独立完成。仓库：",
                "2024/10 开始学习 HTML、CSS 和 JavaScript。",
                "2024/12/1 我在 Github Pages 部署了我的第一个网站，这是一个用纯 HTML、CSS 和 JavaScript 写的简单静态网站。",
                "2025/1/1 我开始学习 TypeScript、Bootstrap、TailwindCSS、HTTP、Ajax，并用它们优化了我的网站。",
                "2025/3 我开始学习 React.js (Next.js) 全栈框架。",
                "2025/4/14 我使用 React.js (Next.js) 重构了我的第一个网站。",
                "2025/5~2025/6 软件开发实训。我作为前端开发人员参与了一个邮件系统的开发。该项目前端使用 Next.js、TypeScript，后端使用 Springboot、MySQL。在这个过程中我学到了很多关于团队协作和解决问题的经验。仓库：",
                "2025/7~至今 开始学习使用 Next.js、Prisma、PostgreSQL、Redis 进行后端开发。",
              ]
            },
            language: {
              label: '语言学习',
              title: "关于我外语学习的一些趣事 (2013/9~至今)",
              timeline: [
                "2013/9 小学三年级开始学习英语。但前两年英语学得一塌糊涂，单词听写经常不及格。",
                "2015 五年级上学期。学校英语单词听写比赛，我和三位队友获得了第一名。这是团队赛，每队 6 人。当只剩 2 支队伍时，我队剩 4 人，对方还剩 6 人。但对方队员一个接一个被淘汰，我们坚持到了最后。",
                "2016 五年级下学期。英语故事讲述比赛。我背诵了《三只小猪》的故事。这对我来说是一个大挑战，因为里面有很多我从未见过的过去时表达。最终我获得了三等奖。",
                "2016 六年级上学期。英语歌曲演唱比赛。我唱了《Lemon Tree》，获得二等奖。",
                "2019 英语歌曲演唱比赛，再次演唱《Lemon Tree》。这次我获得了一等奖。",
                "2020 学了一点日语，背了五十音和一些基础词汇。",
                "2020 到 2023/10 期间，我的英语和日语都没有明显提升。",
                "2023/10 我开始系统学习日语。",
                "2024/7 我通过了 JLPT N3，得分 104 分。目标 JLPT N1。",
                "2024/12 我参加了 JLPT N1 考试，但失败了，得分 54 分。太难了，我几乎认不出大部分单词，听力只得了 9 分。",
                "2025/7~至今 我通过了 JLPT N2，得分 106 分。现在继续朝 JLPT N1 努力。",
              ]
            }
          },
          furry: {
            intro: "你好！我是湛月，一只生活在中国广州的蓝色兽设狐狸。很高兴能在这里与你联系！欢迎随时联系我加为好友。期待与你聊天并分享furry的乐趣！"
          }
        },
      },
      jp: {
        translation: {
          intro: {
            iam: "私は ",
            name: "Sunny_湛月",
            college: "今はSCUTの大学2年生で、専攻はソフトウェア工学です。",
            cpp: "高校時代にC++プログラミングに夢中になり、この専攻を選びました。",
            react: "React.js（Next.js）フルスタックフレームワークを勉強中で、このページは初めてのReact作品です。",
            language: "TOEFLのために英語、JLPT N2のために日本語を勉強しています。Family GuyやBig Bangを見て英語力を高めています。",
            japan: "将来は日本の東京でさらに教育を受ける予定です。旅行で訪れたことがあり、とても素晴らしかったです。",
            hobby: "暇な時はWEBでミニゲームや便利なツールを作ります。小さなプロジェクトを完成させた時の達成感が好きです。",
            pokemon: "ポケモンが好きです。左のモンスターは抽象的なケモノ風の青い狐で、私の仮想キャラクターです。",
            motto: "私のモットー：プレッシャーなくやる気を持ち、不安感なく緊張し、慌てることなく速やかに行動する。"
          },
          lang: '言語',
          toast: {
            like_title: 'ありがとうございました。！',
            like_message: 'バトンをぐっと押さないでください。',
            dislike_title: '私には改善の余地があります。',
            dislike_message: '改善の余地がある場合は、メッセージを送ってください。',
          },
          mainpage: {
            title: 'Sunny_湛月 - ポートフォリオ',
            dropdown: 'そのうえ',
            about: '私について',
            seeme: 'Github',
            theme: '色気',
            minigame: {
              title: 'ゲーム',
              description: 'ここは私が書いたゲームです。',
              bwite: '黒白の交替',
              color: '私の色感覚が最高だ',
              light: '電気をつける挑戦(二人のゲーム)',
            },
            tools: {
              title: '工具',
              description: '役に立つ工具',
              tobe: '乞うご期待',
              furry: '連絡先'
            },
            bubbles: {
              furry: 'ケモノ好き',
              cpp: 'C++',
              react: 'React.js',
              pingpong: '卓球',
              mbti: 'INTP',
            },
            oi: {
              label: 'アルゴリズムコンテストについて',
              title: "OI-ACMキャリア (2020/9-2025/9)",
              timeline: [
                "2020/9 情報オリンピックを学び始め、NOIPを目指す",
                "2021/5 安順市情報学コンテスト市内2位",
                "2021/8/21 Luoguに登録",
                "2021/11/20 NOIP2021省レベル2等賞（高校時代最高賞）",
                "2022/2/7 100問突破！",
                "2022/5 安順市情報学コンテスト市内1位",
                "2022/6/1 初めて青色問題突破！P1972 [SDOI2009] HHのネックレス",
                "2022/8/2 200問突破！",
                "2022/11 高校OIキャリアはNOIP2022 WA0で終了（配列初期化忘れ）",
                "2023/7 華南理工大学に入学、ACMコンテストに挑戦予定",
                "2023/10/11 300問突破！第300問：",
                "2024/4/6 広東工業大学ACM校内大会に参加、1問のみ突破",
                "2024/4/7 初めて紫色問題突破！（CDQ分割統治、素晴らしいアルゴリズム）",
                "2024/4/13 ブルーブリッジカップ広東省1等賞",
                "2024/4/14 学校チーム大会、2問突破、31/50位",
                "2024/4/15~5/31 サボり期間",
                "2024/6/2 ブルーブリッジカップ全国優秀賞",
                "2024/6/4 Java言語習得",
                "2024/6/4 400問突破！",
                "2024/6/5~8/5 再びサボり期間",
                "2024/9/8 CCPCオンライン、3問突破、学校最下位",
                "2024/9/21 ICPCオンライン予選、5問突破、順位は依然として不理想",
                "2024/11/3, 11/10 学校新入生大会、成績はまあまあ",
                "2025/1/11~1/18 冬季合宿",
                "2025/3/20 ACMコンテストに本気で挑戦する時が来た！",
                "2025/7/14~8/19 Nowcoder夏季トレーニング、学校で参加",
                "2025/7/24~8/2 Code Sourseサマーキャンプに参加、アルゴリズム競技の神Jiangly、Du Yuhao、Shi Hanyuanに会い、その才能に感銘を受けた",
                "2025/9/7 ICPCオンラインコンテスト、3問突破",
                "2025/9/14 ICPCオンラインコンテストII、1問突破",
                "2025/9/20 CCPCオンラインコンテスト、3問突破。最終的に次の大会への出場権を得られず、アルゴリズム競技のキャリアは終わりを迎えた。"
              ]
            },
            developper: {
              label: 'ソフトウエア開発のついて',
              title: "開発者としての成長 (2023/9~現在)",
              timeline: [
                "2023/9 華南理工大学に入学し、ソフトウェア工学を専攻しました。",
                "2024/3~2024/5 C++ と EasyX を使って『私の色彩感覚はすごい』というゲームを開発しました。当時は AI がまだ普及していなかったので、すべて自分一人でコードを書きました。リポジトリ：",
                "2024/10 HTML、CSS、JavaScript の学習を開始しました。",
                "2024/12/1 Github Pages に初めてウェブサイトをデプロイしました。これは純粋な HTML、CSS、JavaScript で書いたシンプルな静的サイトでした。",
                "2025/1/1 TypeScript、Bootstrap、TailwindCSS、HTTP、Ajax を学び、それらを使って自分のウェブサイトを改良しました。",
                "2025/3 React.js (Next.js) フルスタックフレームワークの学習を始めました。",
                "2025/4/14 React.js (Next.js) を使って最初のウェブサイトを再構築しました。",
                "2025/5~2025/6 ソフトウェア開発実習。フロントエンド開発者としてメールシステムの開発に参加しました。フロントエンドは Next.js と TypeScript、バックエンドは Springboot と MySQL を使用しました。チームでの協力や問題解決について多くを学びました。リポジトリ：",
                "2025/7~現在 Next.js、Prisma、PostgreSQL、Redis を使ったバックエンド開発を学び始めました。",
              ]
            },
            language: {
              label: '外国語学習について',
              title: "外国語学習に関する面白いエピソード (2013/9~現在)",
              timeline: [
                "2013/9 小学校3年生から英語を学び始めました。しかし最初の2年間は英語が全然ダメで、単語の書き取りテストはよく不合格でした。",
                "2015 小学5年の1学期。学校の英語単語書き取りコンテストで、私と3人のチームメイトが1位を取りました。これは6人1組の団体戦で、最後に残った2チームのうち、私のチームは4人しか残っていなかったのに対し、相手チームは6人残っていました。しかし相手は次々に脱落し、私たちは最後まで勝ち残りました。",
                "2016 小学5年の2学期。英語の物語暗唱コンテストで『三匹の子ぶた』の話を暗唱しました。過去形の表現が多く含まれていて、私にとって大きな挑戦でした。結果は3位でした。",
                "2016 小学6年の1学期。英語の歌コンテストで『Lemon Tree』を歌い、2位を取りました。",
                "2019 英語の歌コンテストに再び参加し、再び『Lemon Tree』を歌いました。今回は1位を獲得しました。",
                "2020 少しだけ日本語を勉強し、五十音といくつかの基本単語を覚えました。",
                "2020〜2023/10 の間、英語も日本語も大きな進歩はありませんでした。",
                "2023/10 日本語を体系的に学び始めました。",
                "2024/7 JLPT N3 に合格し、104点を取りました。次は JLPT N1 を目指します。",
                "2024/12 JLPT N1 を受けましたが、不合格で54点でした。とても難しく、単語のほとんどを認識できず、リスニングはわずか9点でした。",
                "2025/7~現在 JLPT N2 に合格し、106点を取りました。現在は JLPT N1 に向けて勉強を続けています。",
              ]
            }
          },
          furry: {
            intro: "こんにちは！私はキノツキ、広州に住む青いケモノの狐です。ここであなたとつながることができてうれしいです！友達追加のためにいつでも連絡してください。お話ししたり、ケモノの興味を共有したりするのを楽しみにしています！"
          }
        },
      }
    }
  })
export default i18n
