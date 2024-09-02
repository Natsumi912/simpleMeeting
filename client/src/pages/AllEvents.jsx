import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { EventsContainer, SearchContainer } from "../components";

// 会議情報データを取得
export const loader = async ({ request }) => {
  const params = Object.fromEntries([...new URL(request.url).searchParams.entries()]);
  try {
    const { data } = await customFetch.get("/events", { params });
    return { data, searchValues: { ...params } };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
// コンテクスト作成
const AllEventsContext = createContext();

// 会議情報一覧画面
const AllEvents = () => {
  const { data, searchValues } = useLoaderData();
  return (
    <AllEventsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <EventsContainer />
    </AllEventsContext.Provider>
  );
};
// 作成したコンテクストをエキスポート
export const useAllEventsContext = () => useContext(AllEventsContext);

export default AllEvents;
