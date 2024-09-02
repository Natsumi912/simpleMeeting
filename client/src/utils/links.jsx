import { CgAddR } from "react-icons/cg";
import { CgAlbum } from "react-icons/cg";
import { ImProfile } from "react-icons/im";
import { MdAdminPanelSettings } from "react-icons/md";

// リンク設定
const links = [
  { text: "会議を追加", path: ".", icon: <CgAddR /> },
  { text: "会議予定検索", path: "all-events", icon: <CgAlbum /> },
  { text: "プロフィール", path: "profile", icon: <ImProfile /> },
  { text: "管理者情報", path: "admin", icon: <MdAdminPanelSettings /> },
];

export default links;
