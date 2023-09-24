import { FC } from "react"
import {
  CategorySelectOrganism,
  ContactUsOrganism,
  DiscountProductsOrganisms,
  FeaturedProductsOrganism,
  NewsListOrganism,
  SearchWithBannerOrgamism,
  UsefulArticlesOrganism,
  PartnersOrganism,
} from "../../components/organisms"

export const MainPage: FC = () => {
  return (
    <div className="my-10">
      <CategorySelectOrganism />
      <SearchWithBannerOrgamism />
      <DiscountProductsOrganisms />
      <div className="bg-[#47535F] rounded-t-2xl">
        <FeaturedProductsOrganism />
        <NewsListOrganism />
      </div>
      <UsefulArticlesOrganism />
      <PartnersOrganism />
      <ContactUsOrganism />
    </div>
  )
}
