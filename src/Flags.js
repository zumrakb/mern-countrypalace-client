import portugal from "./assets/portugal.svg";
import india from "./assets/india.svg";
import greece from "./assets/greece.svg";
import japan from "./assets/japan.svg";
import korea from "./assets/korea.svg";
import macedonia from "./assets/macedonia.svg";
import palestine from "./assets/palestine.svg";
import spain from "./assets/spain.svg";
import turkey from "./assets/turkey.svg";
import uk from "./assets/uk.svg";

import portugalBanner from "./assets/beauties/portugal.jpg";
import indiaBanner from "./assets/beauties/india.jpg";
import greeceBanner from "./assets/beauties/greece.jpg";
import japanBanner from "./assets/beauties/japan.jpg";
import koreaBanner from "./assets/beauties/korea.jpg";
import macedoniaBanner from "./assets/beauties/macedonia.jpg";
import palestineBanner from "./assets/beauties/palestine.jpg";
import spainBanner from "./assets/beauties/barcelona.jpg";
import turkeyBanner from "./assets/beauties/turkey.jpg";
import ukBanner from "./assets/beauties/uk.jpg";


import avatarOne from "./assets/avatarOne.png"
import avatarTwo from "./assets/avatarTwo.png"
import avatarThree from "./assets/avatarThree.png"
import avatarFour from "./assets/avatarFour.png"
import avatarFive from "./assets/avatarFive.png"
import avatarWomen from "./assets/avatarwomen.png"

const flags = [
  {
    link: india,
    banner: indiaBanner,
    name: "India",
  },
  {
    link: portugal,
    banner: portugalBanner,
    name: "Portugal",
  },
  {
    link: greece,
    banner: greeceBanner,
    name: "Greece",
  },
  {
    link: japan,
    banner: japanBanner,
    name: "Japan",
  },
  {
    link: korea,
    banner: koreaBanner,
    name: "Korea",
  },
  {
    link: macedonia,
    banner: macedoniaBanner,
    name: "Macedonia",
  },
  {
    link: palestine,
    banner: palestineBanner,
    name: "Palestine",
  },
  {
    link: spain,
    banner: spainBanner,
    name: "Spain",
  },
  {
    link: turkey,
    banner: turkeyBanner,
    name: "Turkey",
  },
  {
    link: uk,
    banner: ukBanner,
    name: "United Kingdom",
  },
];

function getCountryBanner(link) {
  return flags.find(f => f.link === link).banner;
}


const avatars = [
  avatarOne,
  avatarWomen,
  avatarTwo,
  avatarThree,
  avatarFive,
  avatarFour,
  avatarOne,
  avatarWomen,
  avatarTwo,
  avatarThree,
  avatarFive,
  avatarFour,
  avatarOne,
  avatarWomen,
  avatarTwo,
  avatarThree,
  avatarFive,
  avatarFour,
  avatarOne,
  avatarWomen,
  avatarTwo,
  avatarThree,
  avatarFive,
  avatarFour,
  avatarOne,
  avatarWomen,
  avatarTwo,
  avatarThree,
  avatarFive,
  avatarFour,
  avatarOne,
  avatarWomen,
  avatarTwo,
  avatarThree,
  avatarFive,
  avatarFour,
  avatarOne,
  avatarWomen,
  avatarTwo,
  avatarThree,
  avatarFive,
  avatarFour,
  avatarOne,
  avatarWomen,
  avatarTwo,
  avatarThree,
  avatarFive,
  avatarFour,
  avatarOne,
  avatarWomen,
  avatarTwo,
  avatarThree,
  avatarFive,
  avatarFour,
  avatarOne,
  avatarWomen,
  avatarTwo,
  avatarThree,
  avatarFive,
  avatarFour,
  avatarOne,
  avatarWomen,
  avatarTwo,
  avatarThree,
  avatarFive,
  avatarFour,
  avatarOne,
  avatarWomen,
  avatarTwo,
  avatarThree,
  avatarFive,
  avatarFour,
  avatarOne,
  avatarWomen,
  avatarTwo,
  avatarThree,
  avatarFive,
  avatarFour,
  avatarOne,
  avatarWomen,
  avatarTwo,
  avatarThree,
  avatarFive,
  avatarFour,
  avatarOne,
  avatarWomen,
  avatarTwo,
  avatarThree,
  avatarFive,
  avatarFour,
  avatarOne,
  avatarWomen,
  avatarTwo,
  avatarThree,
  avatarFive,
  avatarFour,
  avatarOne,
  avatarWomen,
  avatarTwo,
  avatarThree,
  avatarFive,
  avatarFour,
  avatarOne,
  avatarWomen,
  avatarTwo,
  avatarThree,
  avatarFive,
  avatarFour,
  avatarOne,
  avatarWomen,
  avatarTwo,
  avatarThree,
  avatarFive,
  avatarFour,
  avatarOne,
  avatarWomen,
  avatarTwo,
  avatarThree,
  avatarFive,
  avatarFour,
  avatarOne,
  avatarWomen,
  avatarTwo,
  avatarThree,
  avatarFive,
  avatarFour,
  avatarOne,
  avatarWomen,
  avatarTwo,
  avatarThree,
  avatarFive,
  avatarFour,
]


function getAvatarByID(id) {
  const index = Math.floor((1/id) * avatars.length);
  console.log(index)
  return avatars[index];
}

function getRandomAvatar() {
  return avatars[Math.floor(Math.random() * avatars.length)];
}

function sumAsciiFromString(str) {
  let sum = 0;

  for (let i = 0; i < str.length; i++) {
    sum += str.charCodeAt(i);
  }

  return sum;
}

function getLoginUserAvatar(token) {
  const index = sumAsciiFromString(token);
  return getAvatarByID(index);
}

export { getCountryBanner, flags, getAvatarByID, getRandomAvatar, getLoginUserAvatar }