import React from 'react'

const Pagination = (props:any) => {
    const { itemsCount, pageSize, currentPage, onPageChange, onStartEndChange, start, end } = props;

    const pageCount = Math.ceil(itemsCount / pageSize); // 몇 페이지가 필요한지 계산
    if (pageCount === 1) return null; // 1페이지 뿐이라면 페이지 수를 보여주지 않음

    const pages = [];
    for (var i=1; i < pageCount+1; i++) {
        pages.push(i)
    }
    // const pages = _.range(1, pageCount + 1); // 마지막 페이지에 보여줄 컨텐츠를 위해 +1, https://lodash.com/docs/#range 참고
    const target = pages.slice(start,end)

    return (
        <>
            <nav> {/* VSCode 입력: nav>ul.pagination>li.page-item>a.page-link */}
                <ul className="pagination">
                    <li className="page-item">
                        <button
                            className="page-button"
                            onClick={() => {
                                onPageChange(1);
                            }}
                        >
                            처음
                        </button>
                    </li>
                    <li className="page-item">
                        <button
                            className="page-button"
                            onClick={() => {
                                if (currentPage === 1) return alert('첫 번째 페이지입니다.')
                                if (currentPage % 10 === 1){
                                    const s = start - 10;
                                    const e = end - 10;
                                    onStartEndChange(s,e);
                                }
                                onPageChange(currentPage - 1);
                            }}
                        >
                            이전
                        </button>
                    </li>
                    {target.map(page => (
                    <li
                        key={page} 
                        style={{ cursor: "pointer" }}>
                        <button className={page === currentPage ? "page-button-active" : "page-button"} onClick={() => onPageChange(page)}>{page}</button> 
                    </li>
                    ))}
                    <li>
                        <button
                            className="page-button"
                            onClick={() => {
                                if (currentPage === pageCount) return alert('마지막 페이지입니다.')
                                if (currentPage % 10 === 0){
                                    const s = start + 10;
                                    const e = end + 10;
                                    onStartEndChange(s,e);
                                }
                                onPageChange(currentPage + 1);
                            }}
                        >
                            다음
                        </button>
                    </li>
                    <li>
                        <button
                            className="page-button"
                            onClick={() => {
                                onPageChange(pageCount);
                            }}
                        >
                            끝
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    )
}
export default Pagination