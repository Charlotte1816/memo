// このスクリプトを save して、ターミナルで "node generateCities.js" を実行してください。

const fs = require('fs');
const path = require('path');

// 各都道府県の名称（表示名）とその市の一覧を定義
const data = {
    "iwate": {
        prefectureName: "iwate",
        prefectureNameEn: "iwate",
        cities: ["morioka", "miyako", "ofunato", "kuji", "rikuzentakata", "kamaishi", "hanamaki", "kitakami", "ninohe", "hachimantai", "tono", "ichinoseki", "oshu", "takizawa"]
    },
    "miyagi": {
        prefectureName: "miyagi",
        prefectureNameEn: "miyagi",
        cities: ["sendai", "ishinomaki", "shiogama", "kesennuma", "shiroishi", "natori", "kakuda", "tagajo", "iwanuma", "tome", "kurihara", "higashimatsushima", "osaki", "tomiya"]
    },
    "yamagata": {
        prefectureName: "yamagata",
        prefectureNameEn: "yamagata",
        cities: ["yamagatashi", "tsuruoka", "sakata", "shinjo", "yonezawa", "tendo", "murayama", "nagai", "obanazawa", "sagae", "nanyo", "higashine", "kaminoyama"]
    },
    "fukushima": {
        prefectureName: "fukushima",
        prefectureNameEn: "fukushima",
        cities: ["fukushimashi", "koriyama", "iwaki", "aizuwakamatsu", "shirakawa", "sukagawa", "kitakata", "nihonmatsu", "tamura", "minamisoma", "date", "soma", "motomiya"]
    },
    "ibaraki": {
        prefectureName: "ibaraki",
        prefectureNameEn: "ibaraki",
        cities: ["mito", "hitachi", "tsuchiura", "tsukuba", "hitachinaka", "kashima", "ryugasaki", "toride", "itako", "yuki", "koga", "bando", "hokota", "shimotsuma", "kasama", "hitachiota", "joso", "kamisu", "namegata", "chikusei", "sakuragawa", "omitama", "takahagi", "kitaibaraki", "inan", "nasu", "moriyama", "ogawa", "chiyoda", "mihara", "kawakami", "yamato"]
    },
    "tochigi": {
        prefectureName: "tochigi",
        prefectureNameEn: "tochigi",
        cities: ["utsunomiya", "ashikaga", "tochigishi", "sano", "kanuma", "nikko", "oyama", "mooka", "otawara", "yaita", "nasushiobara", "sakura", "nasukarasuyama", "shimotsuke"]
    },
    "gunma": {
        prefectureName: "gunma",
        prefectureNameEn: "gunma",
        cities: ["maebashi", "takasaki", "ota", "isessaki", "kiryu", "shibukawa", "fujioka", "tomigusuku", "numata", "annaka", "tomioka", "midori"]
    },
    "tokyo": {
        prefectureName: "tokyo",
        prefectureNameEn: "tokyo",
        cities: ["hachioji", "tachikawa", "musashino", "mitaka", "ome", "fuchu", "akishima", "chofu", "machida", "koganei", "kodaira", "hino", "higashimurayama", "kokubunji", "kunitachi", "fussa", "komae", "higashiyamato", "kiyose", "higashikurume", "musashimurayama", "tama", "inagi", "hamura", "akiruno", "nishitokyo"]
    },
    "kanagawa": {
        prefectureName: "kanagawa",
        prefectureNameEn: "kanagawa",
        cities: ["yokohama", "kawasaki", "sagamihara", "yokosuka", "hiratsuka", "kamakura", "fujisawa", "odawara", "chigasaki", "zushi", "miura", "hadano", "atsugi", "yamato", "isehara", "ebina", "zama", "ayase", "minamiashigara"]
    },
    "niigata": {
        prefectureName: "niigata",
        prefectureNameEn: "niigata",
        cities: ["niigatashi", "nagaoka", "joetsu", "sanjo", "kashiwazaki", "shibata", "tokamachi", "mitsuke", "murakami", "tsubame", "gosen", "oajiya", "agano", "uonuma", "minamiuonuma", "sado", "kamo", "myoko", "itoigawa", "seiro"]
    },
    "toyama": {
        prefectureName: "toyama",
        prefectureNameEn: "toyama",
        cities: ["toyamashi", "takaoka", "uotoyama", "imizu", "nanto", "tonami", "oyabe", "himi", "kurobe", "namerikawa"]
    },
    "ishikawa": {
        prefectureName: "ishikawa",
        prefectureNameEn: "ishikawa",
        cities: ["kanazawa", "nanao", "komatsu", "wajima", "suzu", "kaga", "hakui", "kahoku", "hakusan", "nonoichi", "nonoichi"]
    },
    "fukui": {
        prefectureName: "fukui",
        prefectureNameEn: "fukui",
        cities: ["fukuishi", "tsuruga", "sabae", "obama", "ono", "katsuyama", "awara", "echizen", "minamiechizen"]
    },
    "yamanashi": {
        prefectureName: "yamanashi",
        prefectureNameEn: "yamanashi",
        cities: ["kofu", "fujiyoshida", "tsuru", "uenohara", "nirasaki", "minamiarupusu", "hokuto", "koshu", "chuo", "fuefuki", "yamanashishi", "kai"]
    },
    "nagano": {
        prefectureName: "nagano",
        prefectureNameEn: "nagano",
        cities: ["naganoshi", "matsumoto", "ueda", "okaya", "suwa", "chikuma", "komoro", "saku", "shiojiri", "iida", "azumino", "omachi", "ina", "komagane", "iiyama", "chino", "tomi", "nagano", "nagano"]
    },
    "gifu": {
        prefectureName: "gifu",
        prefectureNameEn: "gifu",
        cities: ["gifushi", "ogaki", "takayama", "kakamigahara", "minokamo", "kani", "mizunami", "ena", "soki", "tajimi", "gujo", "hida", "mizuho", "hashima", "motosu", "nakatsugawa", "seki", "yamagata", "kaizu", "godo", "yoro"]
    },
    "shizuoka": {
        prefectureName: "shizuoka",
        prefectureNameEn: "shizuoka",
        cities: ["shizuokashi", "hamamatsu", "numazu", "fuji", "fujinomiya", "mishima", "ito", "atami", "gotemba", "fukuroi", "iwata", "kikugawa", "kosai", "makinohara", "shimoda", "susono", "yaizu", "kakegawa", "omaezaki", "iwata", "shimada", "yaizu", "shimoda"]
    },
    "mie": {
        prefectureName: "mie",
        prefectureNameEn: "mie",
        cities: ["tsu", "yokkaichi", "iseshi", "matsusaka", "kameyama", "kuwana", "iga", "inabe", "owase", "kumano", "toba", "shiroko", "suzuka", "shingu"]
    },
    "shiga": {
        prefectureName: "shiga",
        prefectureNameEn: "shiga",
        cities: ["otsu", "hikone", "nagahama", "omihachiman", "kusatsu", "moriyama", "ritto", "yasu", "konan", "koka", "higashiomi", "takashima", "maibara"]
    },
    "kyoto": {
        prefectureName: "kyoto",
        prefectureNameEn: "kyoto",
        cities: ["kyotoshi", "fukuchiyama", "maizuru", "ayabe", "kameoka", "miyazu", "muko", "nagaokakyo", "yawata", "uji", "joetsu", "kyotango", "nantei", "ide", "seika"]
    },
    "osaka": {
        prefectureName: "osaka",
        prefectureNameEn: "osaka",
        cities: ["osakashi", "sakai", "ibaraki", "takatsuki", "moriguchi", "hirakata", "neyagawa", "katano", "settsu", "suita", "toyonaka", "ikeda", "matsubara", "daito", "kashiwara", "kadoma", "fujiidera", "habikino", "higashiosaka", "kishiwada", "kaizuka", "izumisano", "izumi", "takaishi", "sennan", "osakasayama", "tondabayashi", "kawachinagano", "minoh", "shijonawate", "taishi", "yoshinogawa", "yamatotakada"]
    },
    "hyogo": {
        prefectureName: "hyogo",
        prefectureNameEn: "hyogo",
        cities: ["kobe", "himeji", "akash", "amagasaki", "nishinomiya", "ashiya", "akashi", "sumoto", "kakogawa", "takarazuka", "miki", "ono", "nishiwaki", "tanba", "kasai", "sasayama", "fukusaki", "aioi", "sanda", "tatsuno", "ako", "toyooka", "asago", "yabu", "shiso", "minamiawaji", "awaji", "kami", "shinonsen"]
    },
    "nara": {
        prefectureName: "nara",
        prefectureNameEn: "nara",
        cities: ["narashi", "ikoma", "tenri", "kashihara", "yamatokoriyama", "yamatotakada", "sakurai", "gojo", "gose", "kashiba", "ikoma", "uda"]
    },
    "wakayama": {
        prefectureName: "wakayama",
        prefectureNameEn: "wakayama",
        cities: ["wakayamashi", "shingu", "tanabe", "gobo", "arida", "iwade", "hashimoto", "kinokawa", "kainan"]
    },
    "tottori": {
        prefectureName: "tottori",
        prefectureNameEn: "tottori",
        cities: ["tottorishi", "yonago", "kurayoshi", "sakaiminato"]
    },
    "shimane": {
        prefectureName: "shimane",
        prefectureNameEn: "shimane",
        cities: ["matsue", "izumo", "hamada", "masuda", "gotsu", "unnan", "oda"]
    },
    "okayama": {
        prefectureName: "okayama",
        prefectureNameEn: "okayama",
        cities: ["okayamashi", "kurashiki", "tsuyama", "tamano", "soja", "setouchi", "bizen", "niimi", "ibara", "asakuchi", "takahashi", "maniwa", "kasaoka", "akasaka", "mimasaka"]
    },
    "hiroshima": {
        prefectureName: "hiroshima",
        prefectureNameEn: "hiroshima",
        cities: ["hiroshimashi", "kure", "fukuyama", "onomichi", "mihara", "higashihiroshima", "shobara", "otake", "takehara", "fuchu", "miyoshi", "etajima", "akita", "kitahiroshima"]
    },
    "yamaguchi": {
        prefectureName: "yamaguchi",
        prefectureNameEn: "yamaguchi",
        cities: ["yamaguchishi", "shimonoseki", "ube", "hagi", "iwakuni", "hikari", "nagato", "yanai", "mine", "shunan", "hofu", "sanyo-onoda", "kudamatsu"]
    },
    "tokushima": {
        prefectureName: "tokushima",
        prefectureNameEn: "tokushima",
        cities: ["tokushimashi", "komatsushima", "an'an", "yoshinogawa", "awa", "mima", "miyoshi", "naruto"]
    },
    "kagawa": {
        prefectureName: "kagawa",
        prefectureNameEn: "kagawa",
        cities: ["takamatsu", "marugame", "sakaide", "kanonji", "zentsuji", "sanuki", "mitoyo", "higashikagawa"]
    },
    "ehime": {
        prefectureName: "ehime",
        prefectureNameEn: "ehime",
        cities: ["matsuyama", "imabari", "uwajima", "yawaragi", "niihama", "saijo", "ozu", "seiyo", "toon", "kumakogen", "shikokuchuo"]
    },
    "kochi": {
        prefectureName: "kochi",
        prefectureNameEn: "kochi",
        cities: ["kochishi", "nankoku", "konan", "shimanto", "tosashimizu", "sukumo", "muroto", "susaki"]
    },
    "fukuoka": {
        prefectureName: "fukuoka",
        prefectureNameEn: "fukuoka",
        cities: ["fukuokashi", "kitakyushu", "kurume", "omuta", "itagawa", "iizuka", "kasuga", "kurate", "asakura", "yame", "ukiha", "munakata"]
    },
    "saga": {
        prefectureName: "saga",
        prefectureNameEn: "saga",
        cities: ["sagashi", "karatsu", "taku", "kanzaki", "tosu", "ogi"]
    },
    "nagasaki": {
        prefectureName: "nagasaki",
        prefectureNameEn: "nagasaki",
        cities: ["nagasakishi", "sasebo", "shimabara", "isahaya", "omura", "hirado", "saikai", "goto", "unzen", "tsushima", "minamishimabara", "nishisonogi", "matsuura"]
    },
    "kumamoto": {
        prefectureName: "kumamoto",
        prefectureNameEn: "kumamoto",
        cities: ["kumamotoshi", "arao", "tamana", "gyokuto", "koshi", "minamata", "amaki", "yamaga", "kikuchi", "kosa", "mashiki", "higo", "uki", "yamaga"]
    },
    "oita": {
        prefectureName: "oita",
        prefectureNameEn: "oita",
        cities: ["oitashishi", "beppu", "usuki", "nakatsu", "hita", "kitsuki", "saiki", "bungotakada", "yufu"]
    },
    "miyazaki": {
        prefectureName: "miyazaki",
        prefectureNameEn: "miyazaki",
        cities: ["miyazakishi", "nobeoka", "miyakonojo", "kobayashi", "takanabe", "nichinan", "hyuga"]
    },
    "kagoshima": {
        prefectureName: "kagoshima",
        prefectureNameEn: "kagoshima",
        cities: ["kagoshimashi", "kanoya", "ichikikushikino", "satsumasendai", "tarumizu", "makurazaki", "izumi", "isa", "hioki", "minamisatsuma", "kawanabe", "kouyama", "naze", "ama"]
    },
    "okinawa": {
        prefectureName: "okinawa",
        prefectureNameEn: "okinawa",
        cities: ["naha", "okinawashi", "uruma", "gushikawa", "ishigaki", "nago", "ginowan", "tomigusuku", "miyakojima", "yaese", "itoman"]
    }
};

// ベースフォルダー（全体のルートフォルダー）
const baseFolder = "c:\\Users\\integ\\Desktop\\memo\\japan";

// 【都道府県トップページ】のテンプレート
const topTemplate = (pref) => `<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="このページは，${pref.prefectureName}に関する地理情報をまとめたものである．">
    <meta name="keywords" content="${pref.prefectureName}, 地理, 文化, 歴史, 自然環境">
    <meta name="author" content="Charlotte">
    <meta name="robots" content="index, follow">
    <meta name="googlebot" content="index, follow">
    <title>${pref.prefectureName}</title>
    <link rel="stylesheet" href="/style.css">
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
    <link rel="apple-touch-icon" href="/stained_glass.png">
  </head>
  <body>
    <div class="container" id="top">
      <h1>${pref.prefectureName}</h1>
      <p>更新日: <script>document.write(new Date(document.lastModified).toLocaleDateString('ja-JP'));</script></p>
      <hr>
      <nav>
         <ul>
           <li><a href="/index.html">HOME</a></li>
         </ul>
         <ul>
           <li><a href="#top">TOP</a></li>
         </ul>
      </nav>
      <hr>
      <h2>目次</h2>
      <ul>
${pref.cities.map(city => `        <li><a href="${city}.html">${city}</a></li>`).join('\n')}
      </ul>
      <hr>
      <footer>
         <p style="font-size: small;">
           &copy; <script>document.write(new Date().getFullYear());</script> Charlotte. All Rights Reserved.
         </p>
      </footer>
    </div>
  </body>
</html>`;

// 【市のHTML】のテンプレート
const cityTemplate = (prefName, city) => `<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="このページは，${city}市に関する地理情報をまとめたものである．">
    <meta name="keywords" content="${city}市, 地理, 文化, 歴史, 自然環境">
    <meta name="author" content="Charlotte">
    <meta name="robots" content="index, follow">
    <meta name="googlebot" content="index, follow">
    <title>${city}市</title>
    <link rel="stylesheet" href="/style.css">
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
    <link rel="apple-touch-icon" href="/stained_glass.png">
  </head>
  <body>
    <div class="container" id="top">
      <h1>${city}市</h1>
      <p>更新日: <script>document.write(new Date(document.lastModified).toLocaleDateString('ja-JP'));</script></p>
      <nav>
         <ul>
           <li><a href="/index.html">HOME</a></li>
         </ul>
         <ul>
           <li><a href="${prefName}.html">${prefName}</a></li>
         </ul>
         <ul>
           <li><a href="#top">TOP</a></li>
         </ul>
      </nav>
      <hr>
      <h2>概要</h2>
      <p>${city}市は、...（概要を記載）</p>
      <hr>
      <h2>目次</h2>
      <ul>
         <li><a href="#section1">主要スポット</a></li>
         <li><a href="#section2">文化・歴史</a></li>
         <li><a href="#section3">自然環境</a></li>
      </ul>
      <hr>
      <h2 id="section1">主要スポット</h2>
      <p>${city}市内の注目スポットを紹介します。</p>
      <figure>
         <img src="${city}-spots.png" alt="${city}市の主要スポット" style="width:100%; max-width:600px;">
         <figcaption>主要スポット（画像は後で差し替え）</figcaption>
      </figure>
      <hr>
      <h2 id="section2">文化・歴史</h2>
      <p>${city}市の歴史や文化施設についてまとめています。</p>
      <figure>
         <img src="${city}-culture.png" alt="${city}市の文化と歴史" style="width:100%; max-width:600px;">
         <figcaption>文化・歴史（画像は後で差し替え）</figcaption>
      </figure>
      <hr>
      <h2 id="section3">自然環境</h2>
      <p>${city}市内の自然環境や公園をご紹介します。</p>
      <figure>
         <img src="${city}-nature.png" alt="${city}市の自然" style="width:100%; max-width:600px;">
         <figcaption>自然環境（画像は後で差し替え）</figcaption>
      </figure>
      <hr>
      <footer>
         <p style="font-size: small;">
           &copy; <script>document.write(new Date().getFullYear());</script> Charlotte. All Rights Reserved.
         </p>
      </footer>
    </div>
  </body>
</html>`;

// 各都道府県ごとにフォルダーを作成し、トップページと市のHTMLファイルを生成
Object.keys(data).forEach(prefKey => {
  const prefData = data[prefKey];
  // 都道府県ごとのフォルダーを作成（例: c:\Users\integ\Desktop\memo\japan\aichi）
  const prefFolder = path.join(baseFolder, prefKey);
  if (!fs.existsSync(prefFolder)) {
    fs.mkdirSync(prefFolder, { recursive: true });
  }
  
  // 都道府県トップページ (prefKey.html) を作成
  const topPagePath = path.join(prefFolder, `${prefKey}.html`);
  fs.writeFileSync(topPagePath, topTemplate(prefData), 'utf8');
  console.log(`${prefKey}.html (トップページ) 作成済み`);
  
  // 全ての市のHTMLファイルを作成
  prefData.cities.forEach(city => {
    const cityPath = path.join(prefFolder, `${city}.html`);
    fs.writeFileSync(cityPath, cityTemplate(prefData.prefectureName, city), 'utf8');
    console.log(`${city}.html 作成済み in ${prefKey}`);
  });
});