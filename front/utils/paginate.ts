export function paginate(items:any[], pageNumber:number, pageSize:number) {
  const startIndex = (pageNumber - 1) * pageSize; // 자를 배열의 시작점
  const array = items.slice(startIndex,startIndex+pageSize);
  return array;
}