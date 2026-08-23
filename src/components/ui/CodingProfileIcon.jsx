import BrandIcon from "./BrandIcon";

const platformKeys = {
  LeetCode: "leetcode",
  GeeksforGeeks: "gfg",
  HackerRank: "hackerrank",
};

export default function CodingProfileIcon({ platform, size = "lg" }) {
  const key = platformKeys[platform];
  return <BrandIcon brand={key} size={size} />;
}
