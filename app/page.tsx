import { PageContainer } from "@/components/shared/PageContainer";
import { SavedCitiesSection } from "@/components/city-cards/SavedCitiesSection";

export default function Home() {
  return (
    <PageContainer className="py-24">
      <SavedCitiesSection />
    </PageContainer>
  );
}
