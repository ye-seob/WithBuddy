export const getMajorName = (code: string): string => {
  switch (code) {
    case "216":
      return "💻 소프트웨어학과";
    case "218":
      return "🔌 전자컴퓨터공학과";
    case "222":
      return "🏗️ 토목건축공학과";
    case "217":
      return "💹 금융정보공학과";
    case "220":
      return "🚚 물류시스템공학과";
    case "221":
      return "🌆 도시공학과";
    case "219":
      return "🔬 나노화학생명공학과";
    case "355":
      return "📺 광고홍보영상학과";
    case "302":
      return "🏛️ 아크앤테크놀로지학과";
    default:
      return "🔍 기타";
  }
};
