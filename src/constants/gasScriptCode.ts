import { GuestbookEntry, PastelColorConfig, PastelColorId } from '../types';

export const PASTEL_THEMES: Record<PastelColorId, PastelColorConfig> = {
  peach: {
    id: 'peach',
    name: '피치 코랄',
    bg: 'bg-[#FFF7F2]',
    border: 'border-[#FFE3D6]',
    text: 'text-[#843E2B]',
    subtext: 'text-[#A96350]',
    accent: '#E07A5F',
    chipBg: 'bg-[#FFE8DC]',
    chipActiveBorder: 'ring-[#E07A5F]',
    shadow: 'shadow-[0_8px_24px_-6px_rgba(224,122,95,0.12)]',
  },
  mint: {
    id: 'mint',
    name: '민트 애플',
    bg: 'bg-[#F2FAF6]',
    border: 'border-[#D4F2E4]',
    text: 'text-[#205C3F]',
    subtext: 'text-[#488265]',
    accent: '#38A169',
    chipBg: 'bg-[#DBF6E9]',
    chipActiveBorder: 'ring-[#38A169]',
    shadow: 'shadow-[0_8px_24px_-6px_rgba(56,161,105,0.12)]',
  },
  lavender: {
    id: 'lavender',
    name: '스위트 라벤더',
    bg: 'bg-[#F7F4FD]',
    border: 'border-[#EAE1FB]',
    text: 'text-[#583E82]',
    subtext: 'text-[#7D64A5]',
    accent: '#8B5CF6',
    chipBg: 'bg-[#EFE9FE]',
    chipActiveBorder: 'ring-[#8B5CF6]',
    shadow: 'shadow-[0_8px_24px_-6px_rgba(139,92,246,0.12)]',
  },
  sky: {
    id: 'sky',
    name: '소프트 스카이',
    bg: 'bg-[#F2F8FE]',
    border: 'border-[#D6E9FD]',
    text: 'text-[#23507B]',
    subtext: 'text-[#49749F]',
    accent: '#3B82F6',
    chipBg: 'bg-[#E1EFFF]',
    chipActiveBorder: 'ring-[#3B82F6]',
    shadow: 'shadow-[0_8px_24px_-6px_rgba(59,130,246,0.12)]',
  },
  lemon: {
    id: 'lemon',
    name: '버터 레몬',
    bg: 'bg-[#FEFDF2]',
    border: 'border-[#FDF4C7]',
    text: 'text-[#715919]',
    subtext: 'text-[#927A3A]',
    accent: '#D97706',
    chipBg: 'bg-[#FEF8D3]',
    chipActiveBorder: 'ring-[#D97706]',
    shadow: 'shadow-[0_8px_24px_-6px_rgba(217,119,6,0.12)]',
  },
  rose: {
    id: 'rose',
    name: '베이비 로즈',
    bg: 'bg-[#FFF4F7]',
    border: 'border-[#FCD7E3]',
    text: 'text-[#82294C]',
    subtext: 'text-[#A64E72]',
    accent: '#EC4899',
    chipBg: 'bg-[#FDE2EC]',
    chipActiveBorder: 'ring-[#EC4899]',
    shadow: 'shadow-[0_8px_24px_-6px_rgba(236,72,153,0.12)]',
  },
};

export const MOOD_EMOJIS = [
  { emoji: '✨', label: '반짝이는 응원' },
  { emoji: '🍀', label: '행운 가득' },
  { emoji: '🌸', label: '따뜻한 봄날' },
  { emoji: '☕', label: '여유로운 쉼' },
  { emoji: '🎉', label: '축하와 기쁨' },
  { emoji: '💌', label: '소중한 마음' },
  { emoji: '☀️', label: '밝은 에너지' },
  { emoji: '🍰', label: '달콤한 하루' },
];

export const CUTE_NICKNAMES = [
  '행복한 쿼카',
  '따스한 햇살',
  '달콤한 마카롱',
  '구름 위 몽실이',
  '퐁당퐁당 버터',
  '용기 백배 토끼',
  '반짝이는 별가루',
  '다정한 민트초코',
  '살랑살랑 봄바람',
  '미소천사 다람쥐',
  '따스한 라떼 한잔',
  '소원 요정',
];

export const INITIAL_DEMO_ENTRIES: GuestbookEntry[] = [
  {
    id: 'demo-1',
    timestamp: '2026-09-30 22:45',
    name: '따스한 햇살',
    message: '오늘 하루도 정말 고생 많으셨어요! 언제나 당신의 꿈과 내일을 응원합니다 💛',
    color: 'peach',
    mood: '✨',
    likes: 12,
  },
  {
    id: 'demo-2',
    timestamp: '2026-09-30 21:10',
    name: '행복한 쿼카',
    message: '지치고 힘들 땐 잠시 시원한 바람을 쐬며 쉬어가도 괜찮아요. 행운이 가득하길!',
    color: 'mint',
    mood: '🍀',
    likes: 8,
  },
  {
    id: 'demo-3',
    timestamp: '2026-09-30 19:35',
    name: '구름 위 몽실이',
    message: '구글 스프레드시트랑 이렇게 연결되다니 너무 신기해요! 파스텔 디자인도 너무 예뻐요 🌸',
    color: 'lavender',
    mood: '🌸',
    likes: 15,
  },
  {
    id: 'demo-4',
    timestamp: '2026-09-30 18:02',
    name: '다정한 민트초코',
    message: '새로운 도전을 시작하는 모든 분들께 힘찬 응원의 박수를 보냅니다! 화이팅!',
    color: 'sky',
    mood: '🎉',
    likes: 6,
  },
  {
    id: 'demo-5',
    timestamp: '2026-09-30 16:20',
    name: '달콤한 마카롱',
    message: '오늘 마신 따뜻한 차 한 잔처럼 마음 포근한 저녁 시간 되세요 ☕',
    color: 'lemon',
    mood: '☕',
    likes: 9,
  },
  {
    id: 'demo-6',
    timestamp: '2026-09-30 14:15',
    name: '살랑살랑 봄바람',
    message: '작은 발걸음이 모여 커다란 기적이 된대요. 오늘도 빛나는 당신 최고예요 💖',
    color: 'rose',
    mood: '💌',
    likes: 19,
  },
];

export const GOOGLE_APPS_SCRIPT_CODE = `/**
 * ========================================================
 * 🌸 [파스텔 방명록] Google Apps Script (구글 시트 연동 API)
 * ========================================================
 * 
 * 구글 스프레드시트를 데이터베이스로 활용하여
 * 방명록 목록을 읽고(GET), 새로운 글을 시트에 추가(POST)합니다.
 * 
 * [배포 설정 주의사항]
 * - 다음 사용자로 실행: "나(내 계정)"
 * - 액세스 권한이 있는 사용자: 반드시 "모든 사용자(Anyone)" 로 설정!
 */

// 1. GET 요청: 구글 시트의 모든 방명록 글 목록 조회
function doGet(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    initSheetIfNeeded(sheet);
    
    const rows = sheet.getDataRange().getValues();
    if (rows.length <= 1) {
      return jsonResponse({ status: "success", count: 0, data: [] });
    }
    
    const data = [];
    // 2번째 행(데이터 행)부터 읽기
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (!row[1] && !row[2]) continue; // 작성자와 메시지가 둘 다 비어있으면 건너뜀
      
      let dateStr = row[0];
      if (row[0] instanceof Date) {
        dateStr = Utilities.formatDate(row[0], "Asia/Seoul", "yyyy-MM-dd HH:mm");
      }
      
      data.push({
        id: "sheet-" + i,
        timestamp: String(dateStr || ""),
        name: String(row[1] || "익명"),
        message: String(row[2] || ""),
        color: String(row[3] || "peach"),
        mood: String(row[4] || "✨")
      });
    }
    
    // 최신 글이 위로 오도록 역순 정렬
    data.reverse();
    
    return jsonResponse({
      status: "success",
      count: data.length,
      data: data
    });
  } catch (err) {
    return jsonResponse({
      status: "error",
      message: err.toString()
    });
  }
}

// 2. POST 요청: 새로운 방명록 글을 구글 시트 새 행에 추가
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    initSheetIfNeeded(sheet);
    
    let payload = {};
    if (e.postData && e.postData.contents) {
      try {
        payload = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        payload = e.parameter || {};
      }
    } else if (e.parameter) {
      payload = e.parameter;
    }
    
    const name = String(payload.name || "익명").trim();
    const message = String(payload.message || "").trim();
    const color = String(payload.color || "peach");
    const mood = String(payload.mood || "✨");
    
    if (!message) {
      return jsonResponse({
        status: "error",
        message: "응원 메시지를 입력해주세요."
      });
    }
    
    const now = new Date();
    const dateStr = Utilities.formatDate(now, "Asia/Seoul", "yyyy-MM-dd HH:mm");
    
    // 시트 마지막 행에 데이터 추가 [등록일시, 작성자, 응원 한마디, 카드색상, 이모지]
    sheet.appendRow([dateStr, name, message, color, mood]);
    
    return jsonResponse({
      status: "success",
      message: "방명록이 구글 시트에 성공적으로 저장되었습니다!",
      entry: {
        timestamp: dateStr,
        name: name,
        message: message,
        color: color,
        mood: mood
      }
    });
  } catch (err) {
    return jsonResponse({
      status: "error",
      message: err.toString()
    });
  }
}

// 시트가 비어있을 때 헤더 열을 자동으로 초기화하고 서식을 꾸며줍니다
function initSheetIfNeeded(sheet) {
  if (sheet.getLastRow() === 0) {
    const headers = ["등록일시", "작성자", "응원 한마디", "카드색상", "이모지"];
    sheet.appendRow(headers);
    const range = sheet.getRange(1, 1, 1, headers.length);
    range.setFontWeight("bold");
    range.setBackground("#FFF2E6"); // 파스텔 피치 배경
    range.setFontColor("#7A3E2D");
    range.setHorizontalAlignment("center");
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 160);
    sheet.setColumnWidth(2, 120);
    sheet.setColumnWidth(3, 340);
    sheet.setColumnWidth(4, 90);
    sheet.setColumnWidth(5, 70);
  }
}

// 웹 브라우저에서 안전하게 읽을 수 있도록 JSON 출력 객체 반환
function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
`;
