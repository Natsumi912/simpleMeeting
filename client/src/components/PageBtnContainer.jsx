import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import { useAllEventsContext } from "../pages/AllEvents";
import Wrapper from "../assets/wrappers/PageBtnContainer";

// ページボタン設定
const PageBtnContainer = () => {
  const {
    // ページ数とページの総数が対象
    data: { numOfPages, currentPage },
  } = useAllEventsContext();
  // 現在のURL情報から、クエリパラメーターを search、パス名を pathname という名前で取得
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  // ページ番号変更時のURL更新とナビゲーション処理
  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };
  // ページ番号に対応するボタンを生成し、クリック時にhandlePageChangeを呼び出し
  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      // activeClassの正誤によってボタンのスタイルが変化、onClickでページ遷移
      <button className={`btn page-btn ${activeClass && "active"}`} key={pageNumber} onClick={() => handlePageChange(pageNumber)}>
        {pageNumber}
      </button>
    );
  };
  // ページボタンを表示
  const renderPageButtons = () => {
    const pageButtons = [];
    // 最初のページ
    pageButtons.push(addPageButton({ pageNumber: 1, activeClass: currentPage === 1 }));
    // 3ページ以上はドットで表示
    if (currentPage > 3) {
      pageButtons.push(
        <span className="page-btn dots" key="dots-1">
          ...
        </span>
      );
    }
    // 1つ戻る
    if (currentPage !== 1 && currentPage !== 2) {
      pageButtons.push(addPageButton({ pageNumber: currentPage - 1, activeClass: false }));
    }
    // 現在のページを表示するボタン
    if (currentPage !== 1 && currentPage !== numOfPages) {
      pageButtons.push(addPageButton({ pageNumber: currentPage, activeClass: true }));
    }
    // 1つ次のページ
    if (currentPage !== numOfPages && currentPage !== numOfPages - 1) {
      pageButtons.push(addPageButton({ pageNumber: currentPage + 1, activeClass: false }));
    }
    if (currentPage < numOfPages - 2) {
      pageButtons.push(
        <span className=" page-btn dots" key="dots+1">
          ...
        </span>
      );
    }
    // 最後のページボタン
    pageButtons.push(
      addPageButton({
        pageNumber: numOfPages,
        activeClass: currentPage === numOfPages,
      })
    );
    return pageButtons;
  };
  // ボタンレイアウト
  return (
    <Wrapper>
      <button
        className="prev-btn"
        onClick={() => {
          let prevPage = currentPage - 1;
          if (prevPage < 1) prevPage = numOfPages;
          handlePageChange(prevPage);
        }}
      >
        <HiChevronDoubleLeft />
        前へ
      </button>
      <div className="btn-container">{renderPageButtons()}</div>
      <button
        className="btn next-btn"
        onClick={() => {
          let nextPage = currentPage + 1;
          if (nextPage > numOfPages) nextPage = 1;
          handlePageChange(nextPage);
        }}
      >
        次へ
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
