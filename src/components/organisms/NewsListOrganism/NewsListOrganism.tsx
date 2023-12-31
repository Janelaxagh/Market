import { useEffect, useState } from "react";
import CommonController from "../../../controllers/CommonController";
import {SkeletonCombine, TitleText, displayErrorToast, ViewAllButton} from "../../atoms";
import { NewsListMolesules } from "../../molecules/";
import { INews } from "../../molecules/NewsListMolesules/NewsListMolesules";

export const NewsListOrganism = () => {
  const [newsData, setNewsData] = useState<INews[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const newsResponse = await CommonController.getNews();
        setNewsData(newsResponse);
        setLoading(false);
      } catch (error) {
        // console.error("Error fetching news:", error);
        displayErrorToast("Error fetching news :(");
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  return (
    <div className="w-11/12 max-w-screen-2xl m-auto">
      <TitleText color="white">Наши новости</TitleText>
      {loading ? (
        <SkeletonCombine quantity={4} />
      ) : newsData.length === 0 ? (
        <SkeletonCombine quantity={4} />
      ) : (
        <NewsListMolesules newsData={newsData} />
      )}
      <ViewAllButton to="/news" color="white" />
    </div>
  );
};
