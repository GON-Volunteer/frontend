export const convertDateFormat = (originalDateString) => {
  // 원본 날짜 문자열을 JavaScript Date 객체로 변환
  const originalDate = new Date(originalDateString);

  // Date 객체가 유효한지 확인
  if (isNaN(originalDate.getTime())) {
    console.error("Invalid date string");
    return null;
  }

  // 원하는 형식으로 날짜를 조합
  const year = originalDate.getFullYear();
  const month = (originalDate.getMonth() + 1).toString().padStart(2, "0");
  const day = originalDate.getDate().toString().padStart(2, "0");
  const hours = originalDate.getHours().toString().padStart(2, "0");
  const minutes = originalDate.getMinutes().toString().padStart(2, "0");
  const seconds = originalDate.getSeconds().toString().padStart(2, "0");

  const convertedDateString = `${year}-${month}-${day}`;
  return convertedDateString;
};
export const convertTimeFormat = (originalDateString) => {
  // 원본 날짜 문자열을 JavaScript Date 객체로 변환
  const originalDate = new Date(originalDateString);

  if (isNaN(originalDate.getTime())) {
    console.error("Invalid date string");
    return null;
  }

  const hours = originalDate.getHours().toString().padStart(2, "0");
  const minutes = originalDate.getMinutes().toString().padStart(2, "0");
  const seconds = originalDate.getSeconds().toString().padStart(2, "0");

  const convertedDateString = `T${hours}:${minutes}:${seconds}`;
  return convertedDateString;
};
