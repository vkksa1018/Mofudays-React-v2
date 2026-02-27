export const DIET_STAGE_LABEL = Object.freeze({
  PUPPY: "幼犬",
  ADULT: "成犬",
  SENIOR: "老犬",
});

export const SIZE_LABEL = Object.freeze({
  S: "小型",
  M: "中型",
  L: "大型",
});

export const PLAY_STYLE_LABEL = Object.freeze({
  IQ: "腦力激盪",
  BITE: "愛玩愛咬",
  WALK: "出門走走",
});

export const INGREDIENT_LABEL = Object.freeze({
  CHICKEN: "雞肉",
  BEEF: "牛肉",
  PORK: "豬肉",
  SHEEP: "羊肉",
  FISH: "魚肉",
  EGG: "蛋",
  DAIRY: "乳製品",
  WHEAT: "小麥",
  SOY: "黃豆",
});

export const TEXTURE_LABEL = Object.freeze({
  SOFT: "偏軟",
  NORMAL: "一般",
  HARD: "偏硬",
});

export const HEALTH_CARE_LABEL = Object.freeze({
  BONES: "骨骼關節",
  DIGEST: "腸胃消化",
  SKIN: "皮膚毛髮",
  TEETH: "口腔潔牙",
  WEIGHT: "體重管理",
});

export const HOUSEHOLD_CATEGORY_LABEL = Object.freeze({
  cleaning: "清潔用品",
  outdoor: "外出用品",
  grooming: "美容梳理",
  bedding: "寢具用品",
  feeding: "餵食用品",
});

export const HOUSEHOLD_TAG_LABEL = Object.freeze({
  daily: "日常",
  outdoor: "外出",
  walk: "散步",
  travel: "旅行",
  home: "居家",
  washable: "可清洗",
  hair: "除毛",
  seasonal: "換毛季",
  care: "保養護理",
  feeding: "進食",
});

export function joinText(arr, sep = "、", empty = "—") {
  return Array.isArray(arr) && arr.length ? arr.join(sep) : empty;
}

export function joinLabels(list, dict, sep = "、", empty = "—") {
  if (!Array.isArray(list) || list.length === 0) return empty;

  const labels = list
    .map((item) => {
      const code = typeof item === "string" ? item : item?.code;
      const labelFromObj =
        typeof item === "object" && item?.label ? item.label : null;

      if (!code) return null;
      return dict?.[code] ?? labelFromObj ?? code;
    })
    .filter(Boolean);

  return labels.length ? labels.join(sep) : empty;
}